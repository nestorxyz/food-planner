import { FoodItem, BreadItem, DayOfWeek } from '@/lib/types';

// Breakfast Breads with Fillings
export const BREAKFAST_BREADS: BreadItem[] = [
  { id: 'bread-1', name: 'Pan con Palta', filling: 'Palta', emoji: '🥑' },
  {
    id: 'bread-2',
    name: 'Pan con Huevo',
    filling: 'Huevo Revuelto',
    emoji: '🍳',
  },
  {
    id: 'bread-3',
    name: 'Pan con Jamón y Queso',
    filling: 'Jamón y Queso',
    emoji: '🥪',
  },
  {
    id: 'bread-4',
    name: 'Pan con Mantequilla',
    filling: 'Mantequilla',
    emoji: '🧈',
  },
  {
    id: 'bread-5',
    name: 'Pan con Mermelada',
    filling: 'Mermelada',
    emoji: '🍓',
  },
  { id: 'bread-6', name: 'Pan con Aceituna', filling: 'Aceituna', emoji: '🫒' },
  {
    id: 'bread-7',
    name: 'Pan con Pollo',
    filling: 'Pollo Deshilachado',
    emoji: '🍗',
  },
];

// Breakfast Fruits
export const BREAKFAST_FRUITS: FoodItem[] = [
  { id: 'fruit-1', name: 'Papaya picada', emoji: '🍈' },
  { id: 'fruit-2', name: 'Plátano', emoji: '🍌' },
  { id: 'fruit-3', name: 'Manzana', emoji: '🍎' },
  { id: 'fruit-4', name: 'Sandía', emoji: '🍉' },
  { id: 'fruit-5', name: 'Piña', emoji: '🍍' },
  { id: 'fruit-6', name: 'Uvas', emoji: '🍇' },
  { id: 'fruit-7', name: 'Mandarina', emoji: '🍊' },
  { id: 'fruit-8', name: 'Fresas', emoji: '🍓' },
];

// Breakfast Drinks
// Note: Café appears 3x for higher probability
export const BREAKFAST_DRINKS: FoodItem[] = [
  { id: 'drink-1', name: 'Café', emoji: '☕' },
  { id: 'drink-1b', name: 'Café', emoji: '☕' },
  { id: 'drink-1c', name: 'Café', emoji: '☕' },
  { id: 'drink-2', name: 'Jugo de Naranja', emoji: '🍊' },
  { id: 'drink-3', name: 'Avena', emoji: '🥣' },
  { id: 'drink-4', name: 'Leche', emoji: '🥛' },
  { id: 'drink-5', name: 'Café con Leche', emoji: '☕' },
  { id: 'drink-6', name: 'Té', emoji: '🍵' },
  { id: 'drink-7', name: 'Jugo de Piña', emoji: '🍍' },
  { id: 'drink-8', name: 'Smoothie de Frutas', emoji: '🥤' },
  { id: 'drink-9', name: 'Chocolate Caliente', emoji: '🍫' },
];

// Lunch Dishes
export const LUNCHES: FoodItem[] = [
  { id: 'lunch-1', name: 'Lentejas', emoji: '🍲' },
  { id: 'lunch-2', name: 'Ají de Gallina', emoji: '🍛' },
  { id: 'lunch-3', name: 'Arroz con Pollo', emoji: '🍗' },
  { id: 'lunch-4', name: 'Ceviche', emoji: '🐟' },
  { id: 'lunch-5', name: 'Lomo Saltado', emoji: '🥩' },
  { id: 'lunch-6', name: 'Tallarines Verdes', emoji: '🍝' },
  { id: 'lunch-7', name: 'Seco de Res', emoji: '🥘' },
  { id: 'lunch-8', name: 'Causa Limeña', emoji: '🥔' },
  { id: 'lunch-9', name: 'Pollo a la Brasa', emoji: '🍗' },
  { id: 'lunch-10', name: 'Pescado Frito', emoji: '🐠' },
  { id: 'lunch-11', name: 'Estofado de Pollo', emoji: '🍲' },
  { id: 'lunch-12', name: 'Tacu Tacu', emoji: '🍚' },
  { id: 'lunch-13', name: 'Milanesa con Puré', emoji: '🥩' },
  { id: 'lunch-14', name: 'Sopa de Pollo', emoji: '🍜' },
];

// Days of the week in order
export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

// Configuration constants
export const MAX_HISTORY_WEEKS = 4;
