"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { WeeklyMealPlan, ActionResult } from "@/lib/types";
import { cn } from "@/lib/utils";

interface GenerateButtonProps {
  action: () => Promise<ActionResult<WeeklyMealPlan>>;
  hasExistingPlan: boolean;
}

export function GenerateButton({
  action,
  hasExistingPlan,
}: GenerateButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (!result.success) {
        setError(result.error || "Error desconocido");
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handleClick}
        disabled={isPending}
        size="lg"
        className={cn(
          "h-12 px-8 text-base font-medium",
          "bg-gray-900 hover:bg-gray-800",
          "shadow-lg shadow-gray-900/20",
          "transition-all duration-200",
          "hover:shadow-xl hover:shadow-gray-900/30",
          "hover:-translate-y-0.5"
        )}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generando...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            {hasExistingPlan ? "Generar Nueva Semana" : "Generar Plan Semanal"}
          </>
        )}
      </Button>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
