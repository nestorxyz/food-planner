'use client';

import { useTransition } from 'react';
import { WeeklyMealPlan } from '@/lib/types';
import { selectVariation } from '@/app/actions/meal-plan';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatWeekRange } from '@/lib/generator';
import { Sparkles } from 'lucide-react';

interface VariationsSidebarProps {
  currentWeek: WeeklyMealPlan;
}

export function VariationsSidebar({ currentWeek }: VariationsSidebarProps) {
  const [, startTransition] = useTransition();

  // If no variations, don't render
  if (!currentWeek.variations || currentWeek.variations.length === 0) {
    return null;
  }

  const handleSelectVariation = (variationId: string) => {
    startTransition(async () => {
      await selectVariation(variationId);
    });
  };

  const selectedVariationId = currentWeek.selectedVariationId || currentWeek.id;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
      <div className="flex flex-col gap-2 max-h-[80vh] overflow-y-auto py-2">
        {/* Original plan card */}
        <div className="px-3">
          <Card
            className={cn(
              'w-36 p-3 cursor-pointer transition-all duration-200',
              'hover:shadow-lg hover:scale-105 border-2',
              selectedVariationId === currentWeek.id
                ? 'ring-2 ring-gray-900 bg-gray-50 border-gray-900'
                : 'bg-white border-gray-300 hover:border-gray-400'
            )}
            onClick={() => handleSelectVariation(currentWeek.id)}
          >
            <div className="flex flex-col items-center gap-1.5">
              <div className="text-xs font-semibold text-gray-900">
                Original
              </div>
              <div className="text-[10px] text-gray-500 text-center leading-tight">
                {formatWeekRange(currentWeek.startDate, currentWeek.endDate)}
              </div>
            </div>
          </Card>
        </div>

        {/* Variation cards */}
        {currentWeek.variations.map((variation, index) => (
          <div key={variation.id} className="px-3">
            <Card
              className={cn(
                'w-36 p-3 cursor-pointer transition-all duration-200',
                'hover:shadow-lg hover:scale-105 border-2',
                selectedVariationId === variation.id
                  ? 'ring-2 ring-gray-900 bg-gray-50 border-gray-900'
                  : 'bg-white border-gray-300 hover:border-gray-400'
              )}
              onClick={() => handleSelectVariation(variation.id)}
            >
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-gray-700" />
                  <span className="text-xs font-semibold text-gray-900">
                    Var. {index + 1}
                  </span>
                </div>
                <div className="text-[10px] text-gray-500 text-center leading-tight">
                  {formatWeekRange(variation.startDate, variation.endDate)}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
