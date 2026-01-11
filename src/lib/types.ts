// Food item types
export interface FoodItem {
  id: string;
  name: string;
  emoji?: string;
}

export interface BreadItem extends FoodItem {
  filling: string;
}

// Days of the week
export type DayOfWeek =
  | "Lunes"
  | "Martes"
  | "Miércoles"
  | "Jueves"
  | "Viernes"
  | "Sábado"
  | "Domingo";

// Meal structure for a single day
export interface DayMeal {
  day: DayOfWeek;
  breakfast: {
    drink: FoodItem;
    bread: BreadItem;
    fruit: FoodItem;
  };
  lunch: FoodItem;
}

// Weekly meal plan
export interface WeeklyMealPlan {
  id: string;
  weekNumber: number;
  year: number;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  createdAt: string; // ISO timestamp
  meals: DayMeal[];
}

// History structure
export interface MealPlanHistory {
  currentWeek: WeeklyMealPlan | null;
  previousWeeks: WeeklyMealPlan[];
}

// Server Action response types
export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}
