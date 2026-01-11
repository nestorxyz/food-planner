import { DayMeal } from "@/lib/types";
import { MealBadge } from "./meal-badge";

interface DayCardProps {
  meal: DayMeal;
}

export function DayCard({ meal }: DayCardProps) {
  return (
    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-3">
      {/* Day Header */}
      <h3 className="font-medium text-sm text-gray-900">{meal.day}</h3>

      {/* Breakfast Section */}
      <div className="space-y-1.5">
        <span className="text-xs uppercase tracking-wider text-gray-400">
          Desayuno
        </span>
        <div className="space-y-1">
          <MealBadge item={meal.breakfast.drink} variant="drink" />
          <MealBadge item={meal.breakfast.bread} variant="bread" />
          <MealBadge item={meal.breakfast.fruit} variant="fruit" />
        </div>
      </div>

      {/* Lunch Section */}
      <div className="space-y-1.5 pt-2 border-t border-gray-100">
        <span className="text-xs uppercase tracking-wider text-gray-400">
          Almuerzo
        </span>
        <MealBadge item={meal.lunch} variant="lunch" />
      </div>
    </div>
  );
}
