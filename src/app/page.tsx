import { getAllRecipes } from "../../lib/recipes"
import { RecipesList } from "@/app/recipes/RecipesList"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  let recipes
  try {
    recipes = getAllRecipes()
  } catch (err) {
    console.error("[HomePage] getAllRecipes failed:", err)
    return (
      <main className="min-h-screen bg-background text-default p-6 sm:p-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-red-600">Unable to load recipes. Check the terminal for errors.</p>
        </div>
      </main>
    )
  }
  return (
    <main className="min-h-screen bg-background text-default p-6 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Recipes
          </h1>
          <p className="text-subtle">
            Search by title, category or tags.
          </p>
        </header>

        <RecipesList recipes={recipes} />
      </div>
    </main>
  )
}
