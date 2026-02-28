"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import WaveDivider from "@/app/components/WaveDivider"

type RecipeMeta = {
  title: string
  slug: string
  category?: string
  tags?: string[]
  servings?: string | number
  prepTime?: string | number
  cookTime?: string | number
}

function recipeSubline(recipe: RecipeMeta): string {
  const parts: string[] = []
  if (recipe.category) parts.push(recipe.category)
  if (Array.isArray(recipe.tags) && recipe.tags.length > 0) {
    parts.push(recipe.tags.join(", "))
  }
  if (parts.length === 0) return "View recipe"
  return parts.join(" · ")
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
<WaveDivider/>
export function RecipesList({ recipes }: { recipes: RecipeMeta[] }) {
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
          Search recipes
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
          placeholder="Search delicious breakfast"
          className="w-full rounded-full border pl-11 pr-4 py-3
          bg-[color:var(--color-surface-elevated)]
          text-[color:var(--color-text-default)]
          border-[color:var(--color-border-default)]
          placeholder:text-[color:var(--color-text-subtle)]
          focus-visible:outline-none focus-visible:ring-0"
        />
      </div>

      <ul className="space-y-3">
        {filtered.map((recipe) => (
          <li key={recipe.slug}>
            <Link
              href={`/recipes/${recipe.slug}`}
              className="block rounded-xl border border-border-default bg-surface p-4 hover:border-border-default active:scale-[0.99] transition"
            >
              <div className="text-lg font-semibold">
                {recipe.title}
              </div>
              <div className="mt-1 text-sm text-subtle">
  {recipe.category && <span>{recipe.category}</span>}

  {recipe.category && recipe.tags?.length ? <span> · </span> : null}

  {recipe.tags?.length ? (
    <span className="text-[color:var(--color-text-tag)]">
      {recipe.tags.join(", ")}
    </span>
  ) : null}
</div>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-subtle mt-6">
          No recipes found.
        </p>
      )}
    </>
  )
}
