export type RecipeSearchItem = {
  title: string
  slug: string
  category?: string
  tags?: string[]
}

export function matchesRecipeQuery(
  recipe: RecipeSearchItem,
  query: string
): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  if (recipe.title.toLowerCase().includes(q)) return true
  if (recipe.category && recipe.category.toLowerCase().includes(q)) return true
  if (
    Array.isArray(recipe.tags) &&
    recipe.tags.some((tag) => tag.toLowerCase().includes(q))
  )
    return true
  return false
}
