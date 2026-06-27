import type { AppLocale } from "lib/locale"
import { getCategoryLabel, normalizeCategory } from "lib/categories"

export type RecipeSearchItem = {
  title: string
  slug: string
  category?: string
  tags?: string[]
}

export function matchesRecipeQuery(
  recipe: RecipeSearchItem,
  query: string,
  locale: AppLocale = "en"
): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  if (recipe.title.toLowerCase().includes(q)) return true

  if (recipe.category) {
    const raw = recipe.category.toLowerCase()
    if (raw.includes(q)) return true

    const normalized = normalizeCategory(recipe.category)
    if (normalized?.includes(q)) return true

    for (const loc of ["en", "es"] as const) {
      const label = getCategoryLabel(recipe.category, loc).toLowerCase()
      if (label.includes(q)) return true
    }
  }

  if (
    Array.isArray(recipe.tags) &&
    recipe.tags.some((tag) => tag.toLowerCase().includes(q))
  )
    return true
  return false
}
