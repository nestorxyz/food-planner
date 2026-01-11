import { nanoid } from "nanoid";
import {
  BREAKFAST_BREADS,
  BREAKFAST_DRINKS,
  BREAKFAST_FRUITS,
  LUNCHES,
  DAYS_OF_WEEK,
} from "@/config/food-data";
import { DayMeal, WeeklyMealPlan } from "./types";

/**
 * Fisher-Yates shuffle algorithm for randomizing arrays
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get random items for the week, minimizing repetition
 * If array has fewer items than days, items cycle after exhaustion
 */
function getRandomItemsForWeek<T>(array: T[], count: number): T[] {
  const items: T[] = [];
  const shuffled = shuffleArray(array);

  for (let i = 0; i < count; i++) {
    items.push(shuffled[i % shuffled.length]);
  }

  return items;
}

/**
 * Get ISO week number from a date
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
 * Get the Monday of the current week
 */
function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

/**
 * Generate a complete weekly meal plan
 */
export function generateWeeklyMealPlan(): WeeklyMealPlan {
  const now = new Date();
  const monday = getMondayOfWeek(now);
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  // Generate randomized selections for the week
  // Minimizes repetition within the same week
  const weekBreads = getRandomItemsForWeek(BREAKFAST_BREADS, 7);
  const weekFruits = getRandomItemsForWeek(BREAKFAST_FRUITS, 7);
  const weekDrinks = getRandomItemsForWeek(BREAKFAST_DRINKS, 7);
  const weekLunches = getRandomItemsForWeek(LUNCHES, 7);

  const meals: DayMeal[] = DAYS_OF_WEEK.map((day, index) => ({
    day,
    breakfast: {
      drink: weekDrinks[index],
      bread: weekBreads[index],
      fruit: weekFruits[index],
    },
    lunch: weekLunches[index],
  }));

  return {
    id: nanoid(10),
    weekNumber: getWeekNumber(now),
    year: now.getFullYear(),
    startDate: monday.toISOString().split("T")[0],
    endDate: sunday.toISOString().split("T")[0],
    createdAt: now.toISOString(),
    meals,
  };
}

/**
 * Generate a variation of an existing weekly meal plan
 * Uses the same dates and week info as the original plan
 */
export function generateVariation(originalPlan: WeeklyMealPlan): WeeklyMealPlan {
  // Generate randomized selections for the week
  const weekBreads = getRandomItemsForWeek(BREAKFAST_BREADS, 7);
  const weekFruits = getRandomItemsForWeek(BREAKFAST_FRUITS, 7);
  const weekDrinks = getRandomItemsForWeek(BREAKFAST_DRINKS, 7);
  const weekLunches = getRandomItemsForWeek(LUNCHES, 7);

  const meals: DayMeal[] = DAYS_OF_WEEK.map((day, index) => ({
    day,
    breakfast: {
      drink: weekDrinks[index],
      bread: weekBreads[index],
      fruit: weekFruits[index],
    },
    lunch: weekLunches[index],
  }));

  return {
    id: nanoid(10),
    weekNumber: originalPlan.weekNumber,
    year: originalPlan.year,
    startDate: originalPlan.startDate,
    endDate: originalPlan.endDate,
    createdAt: new Date().toISOString(),
    meals,
  };
}

/**
 * Format date for display (e.g., "Ene 6 - Ene 12, 2025")
 */
export function formatWeekRange(startDate: string, endDate: string): string {
  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");

  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const startMonth = months[start.getMonth()];
  const endMonth = months[end.getMonth()];
  const year = end.getFullYear();

  if (startMonth === endMonth) {
    return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${year}`;
  }
  return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${year}`;
}
