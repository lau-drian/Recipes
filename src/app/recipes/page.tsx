import Link from "next/link"
import { recipes } from "@/data/recipes"

export default function RecipesPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 p-6 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            All recipes
          </h1>
          <p className="text-neutral-600">
            Tap a recipe to open it.
          </p>
        </header>

        <ul className="space-y-3">
          {recipes.map((recipe) => (
            <li key={recipe.slug}>
              <Link
                href={`/recipes/${recipe.slug}`}
                className="block rounded-xl border border-neutral-200 p-4 hover:border-neutral-300 active:scale-[0.99] transition"
              >
                <div className="text-lg font-semibold">
                  {recipe.title}
                </div>
                <div className="text-sm text-neutral-600 mt-1">
                  {recipe.ingredients.length} ingredients · {recipe.steps.length} steps
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}