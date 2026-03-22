// Route: /recipes (recipes index)
import { getAllRecipes } from "../../../lib/recipes"
import { getAppLocale } from "lib/locale-server"
import { getUi } from "lib/ui-strings"
import { RecipesList } from "@/app/recipes/RecipesList"

export const dynamic = "force-dynamic"

export default async function RecipesPage() {
  const locale = await getAppLocale()
  const t = getUi(locale)
  let recipes
  try {
    recipes = getAllRecipes(locale)
  } catch (err) {
    console.error("[RecipesPage] getAllRecipes failed:", err)
    return (
      <main className="min-h-screen bg-background [color:var(--color-text-subtle)] p-6 sm:p-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-red-600">{t.recipesLoadError}</p>
        </div>
      </main>
    )
  }
  return (
    <main className="min-h-screen bg-surface text-subtle p-6 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1>{t.recipesIndexTitle}</h1>
          <p className="text-subtle">{t.recipesIndexSubtitle}</p>
        </header>

        <RecipesList recipes={recipes} locale={locale} />
      </div>
    </main>
  )
}
