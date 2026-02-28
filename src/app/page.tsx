// Route: / (homepage)
import { getAllRecipes } from "../../lib/recipes"
import { RecipesList } from "@/app/recipes/RecipesList"
import WaveDivider from "@/app/components/WaveDivider"

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
        <header className="mb-7 text-center">
        <h1>Lovely recipes</h1>          <WaveDivider />
        </header>

        <RecipesList recipes={recipes} />
      </div>
    </main>
  )
}
