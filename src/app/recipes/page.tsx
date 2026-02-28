// Route: /recipes (recipes index)
import { getAllRecipes } from "../../../lib/recipes"
import { RecipesList } from "@/app/recipes/RecipesList"

export const dynamic = "force-dynamic"

export default async function RecipesPage() {
  let recipes
  try {
    recipes = getAllRecipes()
  } catch (err) {
    console.error("[RecipesPage] getAllRecipes failed:", err)
    return (
      <main className="min-h-screen bg-background [color:var(--color-text-subtle)] p-6 sm:p-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-red-600">Unable to load recipes. Check the terminal for errors.</p>
        </div>
      </main>
    )
  }
  return (
    <main className="min-h-screen bg-surface text-subtle p-6 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1>Recipes</h1>
          <p className="text-subtle">
            Tap a recipe to open it.
          </p>
        </header>

        <RecipesList recipes={recipes} />
      </div>
    </main>
  )
}
