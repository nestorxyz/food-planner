import { getMealPlanHistory, generateNewMealPlan } from './actions/meal-plan';
import { WeekCard } from '@/components/week-card';
import { HistorySection } from '@/components/history-section';
import { GenerateButton } from '@/components/generate-button';
import { FoodOptions } from '@/components/food-options';
import { VariationsSidebar } from '@/components/variations-sidebar';
import { WeeklyMealPlan } from '@/lib/types';

export default async function HomePage() {
  const result = await getMealPlanHistory();
  const history = result.success ? result.data : null;

  // Get the plan to display (selected variation or original)
  const getDisplayPlan = (): WeeklyMealPlan | null => {
    if (!history?.currentWeek) return null;

    const currentWeek = history.currentWeek;

    // If there's a selected variation, return it
    if (
      currentWeek.selectedVariationId &&
      currentWeek.variations &&
      currentWeek.selectedVariationId !== currentWeek.id
    ) {
      const selectedVariation = currentWeek.variations.find(
        (v) => v.id === currentWeek.selectedVariationId
      );
      if (selectedVariation) {
        return selectedVariation;
      }
    }

    // Otherwise return the original plan
    return currentWeek;
  };

  const displayPlan = getDisplayPlan();

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Variations Sidebar */}
      {history?.currentWeek && (
        <VariationsSidebar currentWeek={history.currentWeek} />
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
            Planificador de Comidas
          </h1>
          <p className="mt-3 text-gray-500 text-lg">
            Tu menú semanal personalizado
          </p>
        </header>

        {/* Generate Button */}
        <div className="flex justify-center mb-12">
          <GenerateButton
            action={generateNewMealPlan}
            hasExistingPlan={!!history?.currentWeek}
          />
        </div>

        {/* Current Week */}
        <section className="mb-16">
          {displayPlan ? (
            <WeekCard plan={displayPlan} isCurrent={true} />
          ) : (
            <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl">
              <p className="text-gray-500 text-lg">
                No hay un plan de comidas generado
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Haz clic en el botón de arriba para generar uno
              </p>
            </div>
          )}
        </section>

        {/* History Section */}
        {history?.previousWeeks && history.previousWeeks.length > 0 && (
          <HistorySection weeks={history.previousWeeks} />
        )}

        {/* Food Options */}
        <FoodOptions />
      </div>
    </main>
  );
}
