"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark"

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem("theme", theme)
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
      className="rounded-full border px-3 py-1 text-sm"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode"}
    </button>
  )
}