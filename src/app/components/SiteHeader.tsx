"use client"

import Link from "next/link"
import type { AppLocale } from "lib/locale"
import { getUi } from "lib/ui-strings"
import LanguageToggle from "@/app/components/LanguageToggle"
import ThemeToggle from "@/app/components/ThemeToggle"

export default function SiteHeader({ locale }: { locale: AppLocale }) {
  const t = getUi(locale)
  return (
    <header
      className="site-header fixed left-0 right-0 top-0 z-50 bg-[color:var(--color-surface-elevated)]"
      role="banner"
    >
      <div className="mx-auto flex max-w-[680px] items-center justify-between px-5 py-3 sm:px-8 shadow-xxs">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tighter text-[color:var(--color-text-default)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus)]"
        >
          {t.siteTitle}
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <LanguageToggle locale={locale} />
          <ThemeToggle
            labels={{
              lightMode: t.lightMode,
              darkMode: t.darkMode,
            }}
          />
        </div>
      </div>
    </header>
  )
}
