"use client"

import { useRouter } from "next/navigation"
import { LOCALE_COOKIE, type AppLocale } from "lib/locale"
import { getUi } from "lib/ui-strings"

function setLocaleCookie(locale: AppLocale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`
}

export default function LanguageToggle({ locale }: { locale: AppLocale }) {
  const router = useRouter()
  const t = getUi(locale)
  const next: AppLocale = locale === "es" ? "en" : "es"
  const label = locale === "es" ? t.switchToEnglish : t.switchToSpanish

  return (
    <button
      type="button"
      onClick={() => {
        setLocaleCookie(next)
        router.refresh()
      }}
      className="rounded-full border border-[color:var(--color-border-default)] bg-[color:var(--color-background)] px-4 py-2 text-sm text-[color:var(--color-text-subtle)] hover:bg-[color:var(--color-surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus)]"
      aria-label={t.languageToggleAria}
      lang={next === "es" ? "es" : "en"}
    >
      {label}
    </button>
  )
}
