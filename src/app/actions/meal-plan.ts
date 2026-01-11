"use server";

import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { MealPlanHistory, WeeklyMealPlan, ActionResult } from "@/lib/types";
import { generateWeeklyMealPlan } from "@/lib/generator";
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
 * - Moves current week to previous weeks
 * - Generates new plan for current week
 * - Maintains max 4 weeks in history
 */
export async function generateNewMealPlan(): Promise<
  ActionResult<WeeklyMealPlan>
> {
  try {
    const history = await readHistory();

    // If there's a current week, move it to previous weeks
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
  } catch (error) {
    console.error("Error generating meal plan:", error);
    return {
      success: false,
      error: "No se pudo generar el plan de comidas.",
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
