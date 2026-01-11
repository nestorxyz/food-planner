import { FoodItem, BreadItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MealBadgeProps {
  item: FoodItem | BreadItem;
  variant: "drink" | "bread" | "fruit" | "lunch";
}

const variantStyles = {
  drink: "bg-blue-50 text-blue-700",
  bread: "bg-amber-50 text-amber-700",
  fruit: "bg-green-50 text-green-700",
  lunch: "bg-purple-50 text-purple-700",
};

export function MealBadge({ item, variant }: MealBadgeProps) {
  return (
    <div
      className={cn(
        "px-2.5 py-1.5 rounded-lg text-xs font-medium",
        "flex items-center gap-1.5",
        variantStyles[variant]
      )}
    >
      {item.emoji && <span>{item.emoji}</span>}
      <span>{item.name}</span>
    </div>
  );
}
