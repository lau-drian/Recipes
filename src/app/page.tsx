// Route: / (homepage)
import { getAllRecipes } from "../../lib/recipes"
import { getAppLocale } from "lib/locale-server"
import { getUi } from "lib/ui-strings"
import { RecipesList } from "@/app/recipes/RecipesList"
import WaveDivider from "@/app/components/WaveDivider"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const locale = await getAppLocale()
  const t = getUi(locale)
  let recipes
  try {
    recipes = getAllRecipes(locale)
  } catch (err) {
    console.error("[HomePage] getAllRecipes failed:", err)
    return (
      <main className="min-h-screen bg-background text-default p-6 sm:p-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-red-600">{t.recipesLoadError}</p>
        </div>
      </main>
    )
  }
  return (
    <main className="min-h-screen bg-background text-default p-6 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-7 text-center">
          <h1>{t.homeTitle}</h1>
          <WaveDivider />
        </header>

        <RecipesList recipes={recipes} locale={locale} />
      </div>
    </main>
  )
}
