"use server";

import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { MealPlanHistory, WeeklyMealPlan, ActionResult } from "@/lib/types";
import { generateWeeklyMealPlan, generateVariation } from "@/lib/generator";
import { MAX_HISTORY_WEEKS } from "@/config/food-data";

const DATA_DIR = path.join(process.cwd(), "data");
const HISTORY_FILE = path.join(DATA_DIR, "history.json");

/**
 * Ensure data directory exists
 */
async function ensureDataDir(): Promise<void> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

/**
 * Read history from JSON file
 */
async function readHistory(): Promise<MealPlanHistory> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(HISTORY_FILE, "utf-8");
    return JSON.parse(data) as MealPlanHistory;
  } catch {
    // Return empty history if file doesn't exist
    return {
      currentWeek: null,
      previousWeeks: [],
    };
  }
}

/**
 * Write history to JSON file
 */
async function writeHistory(history: MealPlanHistory): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2), "utf-8");
}

/**
 * Get current meal plan history
 */
export async function getMealPlanHistory(): Promise<
  ActionResult<MealPlanHistory>
> {
  try {
    const history = await readHistory();
    return { success: true, data: history };
  } catch (error) {
    console.error("Error reading meal plan history:", error);
    return {
      success: false,
      error: "No se pudo cargar el historial de comidas.",
    };
  }
}

/**
 * Generate a new weekly meal plan
 * - If same week: creates a variation instead of replacing
 * - If new week: moves current week to previous weeks and generates new plan
 * - Maintains max 4 weeks in history
 */
export async function generateNewMealPlan(): Promise<
  ActionResult<WeeklyMealPlan>
> {
  try {
    const history = await readHistory();
    const now = new Date();
    const currentWeekNumber = getWeekNumber(now);
    const currentYear = now.getFullYear();

    // Check if we're still in the same week
    const isSameWeek =
      history.currentWeek &&
      history.currentWeek.weekNumber === currentWeekNumber &&
      history.currentWeek.year === currentYear;

    if (isSameWeek && history.currentWeek) {
      // Create a variation for the same week (using same dates)
      const variation = generateVariation(history.currentWeek);
      
      // Ensure variations array exists
      if (!history.currentWeek.variations) {
        history.currentWeek.variations = [];
      }
      
      // Add the variation
      history.currentWeek.variations.push(variation);
      
      // Set the new variation as selected
      history.currentWeek.selectedVariationId = variation.id;
      
      // Save to file
      await writeHistory(history);
      
      // Revalidate the page to show new data
      revalidatePath("/");
      
      return { success: true, data: variation };
    } else {
      // New week: move current week to previous weeks
      if (history.currentWeek) {
        history.previousWeeks.unshift(history.currentWeek);

        // Keep only the last MAX_HISTORY_WEEKS weeks
        if (history.previousWeeks.length > MAX_HISTORY_WEEKS) {
          history.previousWeeks = history.previousWeeks.slice(
            0,
            MAX_HISTORY_WEEKS
          );
        }
      }

      // Generate new meal plan
      const newPlan = generateWeeklyMealPlan();
      history.currentWeek = newPlan;

      // Save to file
      await writeHistory(history);

      // Revalidate the page to show new data
      revalidatePath("/");

      return { success: true, data: newPlan };
    }
  } catch (error) {
    console.error("Error generating meal plan:", error);
    return {
      success: false,
      error: "No se pudo generar el plan de comidas.",
    };
  }
}

/**
 * Helper function to get week number (same as in generator.ts)
 */
function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * Select a variation of the current week (or the original plan)
 */
export async function selectVariation(
  variationId: string
): Promise<ActionResult<WeeklyMealPlan>> {
  try {
    const history = await readHistory();

    if (!history.currentWeek) {
      return {
        success: false,
        error: "No hay un plan de comidas actual.",
      };
    }

    // If selecting the original plan
    if (variationId === history.currentWeek.id) {
      history.currentWeek.selectedVariationId = variationId;
      await writeHistory(history);
      revalidatePath("/");
      return { success: true, data: history.currentWeek };
    }

    // If selecting a variation
    if (!history.currentWeek.variations) {
      return {
        success: false,
        error: "No hay variaciones disponibles.",
      };
    }

    const variation = history.currentWeek.variations.find(
      (v) => v.id === variationId
    );

    if (!variation) {
      return {
        success: false,
        error: "Variación no encontrada.",
      };
    }

    // Set the selected variation
    history.currentWeek.selectedVariationId = variationId;

    // Save to file
    await writeHistory(history);

    // Revalidate the page to show new data
    revalidatePath("/");

    return { success: true, data: variation };
  } catch (error) {
    console.error("Error selecting variation:", error);
    return {
      success: false,
      error: "No se pudo seleccionar la variación.",
    };
  }
}

/**
 * Clear all history (optional utility)
 */
export async function clearHistory(): Promise<ActionResult> {
  try {
    const emptyHistory: MealPlanHistory = {
      currentWeek: null,
      previousWeeks: [],
    };
    await writeHistory(emptyHistory);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error clearing history:", error);
    return {
      success: false,
      error: "No se pudo limpiar el historial.",
    };
  }
}
