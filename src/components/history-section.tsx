"use client";

import { useState } from "react";
import { WeeklyMealPlan } from "@/lib/types";
import { WeekCard } from "./week-card";
import { ChevronDown, ChevronRight, History } from "lucide-react";
import { cn } from "@/lib/utils";

interface HistorySectionProps {
  weeks: WeeklyMealPlan[];
}

export function HistorySection({ weeks }: HistorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set());

  const toggleWeek = (weekId: string) => {
    const newExpanded = new Set(expandedWeeks);
    if (newExpanded.has(weekId)) {
      newExpanded.delete(weekId);
    } else {
      newExpanded.add(weekId);
    }
    setExpandedWeeks(newExpanded);
  };

  return (
    <section>
      {/* Section Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between",
          "py-4 px-1 text-left",
          "hover:bg-gray-50 rounded-lg transition-colors"
        )}
      >
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-medium text-gray-900">
            Semanas Anteriores
          </h2>
          <span className="text-sm text-gray-500">({weeks.length})</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="space-y-4 mt-4">
          {weeks.map((week) => (
            <div key={week.id}>
              <button
                onClick={() => toggleWeek(week.id)}
                className="w-full text-left"
              >
                <WeekCard
                  plan={week}
                  isCollapsed={!expandedWeeks.has(week.id)}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
