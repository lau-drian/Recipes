"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { recipes } from "@/data/recipes"

export default function RecipesPage() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return recipes

    return recipes.filter((recipe) => {
      const inTitle = recipe.title.toLowerCase().includes(q)
      const inIngredients = recipe.ingredients.some((i) =>
        i.toLowerCase().includes(q)
      )
      return inTitle || inIngredients
    })
  }, [query])

  return (
    <main className="min-h-screen bg-white text-neutral-900 p-6 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            All recipes
          </h1>
          <p className="text-neutral-600">
            Search by title or ingredient.
          </p>
        </header>

        <div className="mb-6">
          <label htmlFor="search" className="sr-only">
            Search recipes
          </label>
          <input
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes…"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        <ul className="space-y-3">
          {filtered.map((recipe) => (
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

        {filtered.length === 0 && (
          <p className="text-neutral-600 mt-6">
            No recipes found.
          </p>
        )}
      </div>
    </main>
  )
}