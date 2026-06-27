"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { AppLocale } from "lib/locale"
import { getUi } from "lib/ui-strings"
import {
  CATEGORY_ORDER,
  HIDDEN_CATEGORIES,
  getCategoryLabel,
  normalizeCategory,
} from "lib/categories"
import FilterPill from "@/app/components/FilterPill"
import WaveDivider from "@/app/components/WaveDivider"

type RecipeMeta = {
  title: string
  slug: string
  category?: string
  tags?: string[]
  servings?: string | number
  prepTime?: string | number
}

export function RecipesList({
  recipes,
  locale,
}: {
  recipes: RecipeMeta[]
  locale: AppLocale
}) {
  const t = getUi(locale)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = useMemo(() => {
    const present = new Set<string>()
    for (const recipe of recipes) {
      const cat = normalizeCategory(recipe.category)
      if (!cat || HIDDEN_CATEGORIES.has(cat)) continue
      present.add(cat)
    }
    const ordered = CATEGORY_ORDER.filter((c) => present.has(c)).map(
      (c) => c as string
    )
    const extras = [...present]
      .filter((c) => !CATEGORY_ORDER.includes(c as (typeof CATEGORY_ORDER)[number]))
      .sort()
    return [...ordered, ...extras]
  }, [recipes])

  const filtered = useMemo(() => {
    return recipes.filter((recipe) => {
      if (activeCategory && normalizeCategory(recipe.category) !== activeCategory)
        return false
      return true
    })
  }, [activeCategory, recipes])

  return (
    <>
      {categories.length > 0 && (
        <div
          className="mb-6 flex flex-wrap gap-2"
          role="group"
          aria-label={t.categoryFilterLabel}
        >
          <FilterPill
            active={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          >
            {t.allCategories}
          </FilterPill>
          {categories.map((cat) => (
            <FilterPill
              key={cat}
              active={activeCategory === cat}
              onClick={() =>
                setActiveCategory((prev) => (prev === cat ? null : cat))
              }
            >
              {getCategoryLabel(cat, locale)}
            </FilterPill>
          ))}
        </div>
      )}

      <div className="mb-6">
        <WaveDivider />
      </div>

      <ul className="space-y-0">
        {filtered.map((recipe) => (
          <li key={recipe.slug}>
            <Link
              href={`/recipes/${recipe.slug}`}
              className="block rounded-xl border-bottom-dashed bg-surface p-4 hover:border-border-default active:scale-[0.99] transition"
            >
              <div className="text-xl font-semibold">{recipe.title}</div>
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
