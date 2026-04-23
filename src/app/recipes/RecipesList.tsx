"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { AppLocale } from "lib/locale"
import { getUi } from "lib/ui-strings"
import WaveDivider from "@/app/components/WaveDivider"

type RecipeMeta = {
  title: string
  slug: string
  category?: string
  tags?: string[]
  servings?: string | number
  prepTime?: string | number
}

function matchesQuery(recipe: RecipeMeta, q: string): boolean {
  if (recipe.title.toLowerCase().includes(q)) return true
  if (recipe.category && recipe.category.toLowerCase().includes(q)) return true
  if (
    Array.isArray(recipe.tags) &&
    recipe.tags.some((tag) => tag.toLowerCase().includes(q))
  )
    return true
  return false
}

export function RecipesList({
  recipes,
  locale,
}: {
  recipes: RecipeMeta[]
  locale: AppLocale
}) {
  const t = getUi(locale)
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return recipes
    return recipes.filter((recipe) => matchesQuery(recipe, q))
  }, [query, recipes])

  return (
    <>
      <div className="mb-6 relative">
        <label htmlFor="search" className="sr-only">
          {t.searchLabel}
        </label>
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--color-text-subtle)]" aria-hidden>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </span>
        <input
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full rounded-full border pl-11 pr-4 py-3
          bg-[color:var(--color-surface)]
          text-[color:var(--color-text-default)]
          border-[color:var(--color-border-default)]
          placeholder:text-[color:var(--color-text-subtle)]
          focus-visible:outline-none focus-visible:ring-0"
        />
      </div>

      <div className="mb-6">
        <WaveDivider />
      </div>

      <ul className="space-y-0">
        {filtered.map((recipe) => (
          <li key={recipe.slug}>
            <Link
              href={`/recipes/${recipe.slug}`}
              className="block rounded-xl border-bottom-dashed bg-surface p-4 hover:border-border-default active:scale-[0.99] transition"            >
              <div className="text-xl font-semibold">
                {recipe.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-subtle mt-6">{t.noRecipesFound}</p>
      )}
    </>
  )
}
