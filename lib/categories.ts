import type { AppLocale } from "lib/locale"

// Canonical display order for the category filter cards.
export const CATEGORY_ORDER = [
  "breakfast",
  "pancakes",
  "granola",
  "main",
  "soup",
  "salad",
  "sides",
  "snack",
  "sweet-tooth",
  "compotes",
  "drinks",
  "dressings",
  "sauce",
  "dip",
] as const

// Map legacy/alias category values onto canonical ones.
const CATEGORY_ALIASES: Record<string, string> = {
  lunch: "main",
  cookies: "sweet-tooth",
  dessert: "sweet-tooth",
  bread: "sweet-tooth",
}

// Categories intentionally not surfaced as filter cards (recipes still appear
// under "All" and via search). Trimmed back to keep the index page focused.
export const HIDDEN_CATEGORIES: ReadonlySet<string> = new Set([
  "granola",
  "dressings",
  "compotes",
  "snack",
  "drinks",
  "sauce",
  "dip",
])

export function normalizeCategory(category?: string | null): string | undefined {
  if (!category) return undefined
  const c = category.trim().toLowerCase()
  if (!c) return undefined
  return CATEGORY_ALIASES[c] ?? c
}

const CATEGORY_LABELS: Record<AppLocale, Record<string, string>> = {
  en: {
    breakfast: "Breakfast",
    pancakes: "Pancakes",
    bread: "Bread",
    granola: "Granola",
    main: "Mains",
    soup: "Soups",
    salad: "Salads",
    sides: "Sides",
    snack: "Snacks",
    "sweet-tooth": "Sweet tooth",
    compotes: "Compotes & jams",
    drinks: "Drinks",
    dressings: "Dressings",
    sauce: "Sauces",
    dip: "Dips",
  },
  es: {
    breakfast: "Desayuno",
    pancakes: "Hotcakes",
    bread: "Pan",
    granola: "Granola",
    main: "Platillos",
    soup: "Sopas",
    salad: "Ensaladas",
    sides: "Guarniciones",
    snack: "Snacks",
    "sweet-tooth": "Postres",
    compotes: "Compotas y mermeladas",
    drinks: "Bebidas",
    dressings: "Aderezos",
    sauce: "Salsas",
    dip: "Dips",
  },
}

export function getCategoryLabel(category: string, locale: AppLocale): string {
  const c = normalizeCategory(category) ?? category
  return CATEGORY_LABELS[locale][c] ?? category
}
