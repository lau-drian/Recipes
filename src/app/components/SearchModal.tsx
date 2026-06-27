"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { AppLocale } from "lib/locale"
import { getCategoryLabel } from "lib/categories"
import { getUi } from "lib/ui-strings"
import {
  matchesRecipeQuery,
  type RecipeSearchItem,
} from "lib/recipe-search"

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

export default function SearchModal({ locale }: { locale: AppLocale }) {
  const t = getUi(locale)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [recipes, setRecipes] = useState<RecipeSearchItem[]>([])
  const [loaded, setLoaded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const loadRecipes = useCallback(async () => {
    if (loaded) return
    try {
      const res = await fetch("/api/recipes")
      if (!res.ok) return
      const data = (await res.json()) as RecipeSearchItem[]
      setRecipes(data)
      setLoaded(true)
    } catch {
      // ignore fetch errors
    }
  }, [loaded])

  const openSearch = useCallback(() => {
    setOpen(true)
    void loadRecipes()
  }, [loadRecipes])

  const closeSearch = useCallback(() => {
    setOpen(false)
    setQuery("")
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        if (open) closeSearch()
        else openSearch()
      }
      if (e.key === "Escape" && open) closeSearch()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, openSearch, closeSearch])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    const id = window.requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      document.body.style.overflow = ""
      window.cancelAnimationFrame(id)
    }
  }, [open])

  const results = useMemo(() => {
    return recipes.filter((recipe) => matchesRecipeQuery(recipe, query))
  }, [recipes, query])

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-border-default)] bg-[color:var(--color-background)] text-[color:var(--color-text-subtle)] hover:bg-[color:var(--color-surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus)]"
        aria-label={t.openSearchAria}
      >
        <SearchIcon className="size-4 shrink-0" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[min(18vh,140px)]"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeSearch()
          }}
        >
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-md"
            aria-hidden
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.searchLabel}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-elevated)] shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center gap-3 border-b border-[color:var(--color-border-subtle)] px-4 py-3">
              <SearchIcon className="shrink-0 text-[color:var(--color-text-subtle)]" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchLabel}
                className="min-w-0 flex-1 bg-transparent text-lg text-[color:var(--color-text-default)] placeholder:text-[color:var(--color-text-subtle)] focus:outline-none"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={closeSearch}
                className="shrink-0 rounded-full px-2 py-1 text-sm text-[color:var(--color-text-subtle)] hover:text-[color:var(--color-text-default)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus)]"
                aria-label={t.closeSearchAria}
              >
                {t.closeSearchLabel}
              </button>
            </div>

            <ul
              className="max-h-[min(50vh,420px)] overflow-y-auto py-2"
              role="listbox"
              aria-label={t.searchLabel}
            >
              {results.length === 0 ? (
                <li className="px-4 py-8 text-center text-[color:var(--color-text-subtle)]">
                  {loaded ? t.noRecipesFound : t.searchLoading}
                </li>
              ) : (
                results.map((recipe) => (
                  <li key={recipe.slug} role="option">
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      onClick={closeSearch}
                      className="block px-4 py-3 transition hover:bg-[color:var(--color-bg-callout)] focus:outline-none focus-visible:bg-[color:var(--color-bg-callout)]"
                    >
                      <div className="font-medium text-[color:var(--color-text-default)]">
                        {recipe.title}
                      </div>
                      {recipe.category ? (
                        <div className="mt-0.5 text-sm text-[color:var(--color-text-subtle)]">
                          {getCategoryLabel(recipe.category, locale)}
                        </div>
                      ) : null}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
