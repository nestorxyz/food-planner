'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  BREAKFAST_BREADS,
  BREAKFAST_FRUITS,
  BREAKFAST_DRINKS,
  LUNCHES,
} from '@/config/food-data';

const categories = [
  {
    name: 'Panes',
    emoji: '🍞',
    items: BREAKFAST_BREADS,
    color: 'bg-amber-50 text-amber-700',
  },
  {
    name: 'Frutas',
    emoji: '🍎',
    items: BREAKFAST_FRUITS,
    color: 'bg-green-50 text-green-700',
  },
  {
    name: 'Bebidas',
    emoji: '🥤',
    items: BREAKFAST_DRINKS,
    color: 'bg-blue-50 text-blue-700',
  },
  {
    name: 'Almuerzos',
    emoji: '🍲',
    items: LUNCHES,
    color: 'bg-purple-50 text-purple-700',
  },
];

export function FoodOptions() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="mt-8 border-t border-gray-100 pt-8 overflow-hidden">
      {/* Section Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'w-full flex items-center justify-between',
          'py-4 px-1 text-left',
          'hover:bg-gray-50 rounded-lg transition-colors'
        )}
      >
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-medium text-gray-900">
            Opciones de Comida
          </h2>
          <span className="text-sm text-gray-500">
            (
            {BREAKFAST_BREADS.length +
              BREAKFAST_FRUITS.length +
              BREAKFAST_DRINKS.length +
              LUNCHES.length}{' '}
            opciones)
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="space-y-4 mt-4 w-full max-w-full">
          {categories.map((category) => (
            <div
              key={category.name}
              className="p-4 rounded-xl bg-gray-50 border border-gray-100 w-full max-w-full"
            >
              <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <span>{category.emoji}</span>
                {category.name}
                <span className="text-xs text-gray-400 font-normal">
                  ({category.items.length})
                </span>
              </h3>
              <div className="w-full max-w-full" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {category.items.map((item) => (
                  <span
                    key={item.id}
                    className={cn(
                      'px-2.5 py-1.5 rounded-lg text-xs font-medium',
                      'inline-flex items-center gap-1.5',
                      category.color
                    )}
                  >
                    {item.emoji && <span>{item.emoji}</span>}
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
