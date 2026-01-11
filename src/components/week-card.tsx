'use client';

import { WeeklyMealPlan } from '@/lib/types';
import { formatWeekRange } from '@/lib/generator';
import { DayCard } from './day-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WeekCardProps {
  plan: WeeklyMealPlan;
  isCurrent?: boolean;
  isCollapsed?: boolean;
}

export function WeekCard({
  plan,
  isCurrent = false,
  isCollapsed = false,
}: WeekCardProps) {
  const dateRange = formatWeekRange(plan.startDate, plan.endDate);

  return (
    <Card
      className={cn(
        'border border-gray-200 shadow-sm',
        isCurrent && 'ring-1 ring-gray-900/5'
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-medium text-gray-900">
            {isCurrent ? 'Esta Semana' : `Semana ${plan.weekNumber}`}
          </CardTitle>
          <span className="text-sm text-gray-500">{dateRange}</span>
        </div>
      </CardHeader>

      {!isCollapsed && (
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {plan.meals.map((dayMeal) => (
              <DayCard key={dayMeal.day} meal={dayMeal} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
