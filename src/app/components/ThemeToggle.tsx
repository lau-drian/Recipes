"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark"

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem("theme", theme)
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    if (saved === "light" || saved === "dark") {
      setTheme(saved)
      applyTheme(saved)
    } else {
      // Default to system preference on first load
      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
      const initial: Theme = prefersDark ? "dark" : "light"
      setTheme(initial)
      applyTheme(initial)
    }
    setReady(true)
  }, [])

  if (!ready) return null

  return (
    <button
      type="button"
      onClick={() => {
        const next: Theme = theme === "dark" ? "light" : "dark"
        setTheme(next)
        applyTheme(next)
      }}
      className="rounded-full border border-[color:var(--color-border-default)] bg-[color:var(--color-background)] px-4 py-2 text-sm text-[color:var(--color-text-default)] hover:bg-[color:var(--color-surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus)]"
      aria-label="Toggle dark mode"
    >
      <span className="flex items-center gap-2">
        {theme === "dark" ? (
          <SunIcon className="size-4 shrink-0" />
        ) : (
          <MoonIcon className="size-4 shrink-0" />
        )}
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </span>
    </button>
  )
}