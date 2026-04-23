import type { Metadata } from "next"
import Link from "next/link"
import { getAppLocale } from "lib/locale-server"
import { getUi } from "lib/ui-strings"
import WaveDivider from "@/app/components/WaveDivider"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAppLocale()
  const t = getUi(locale)
  return {
    title: { absolute: `${t.notFoundTitle} · ${t.metaTitleSuffix}` },
    description: t.notFoundDescription,
  }
}

export default async function NotFound() {
  const t = getUi(await getAppLocale())

  return (
    <div className="mx-auto max-w-[680px] px-1 py-10 text-center sm:py-16">
      <p
        className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-subtle)]"
        aria-hidden
      >
        404
      </p>
      <h1 className="mb-4 text-balance">{t.notFoundTitle}</h1>
      <WaveDivider />
      <p className="mx-auto mb-10 max-w-md text-pretty text-[color:var(--color-text-subtle)]">
        {t.notFoundDescription}
      </p>
      <Link
        href="/"
        className="inline-flex rounded-full border border-[color:var(--color-border-default)] bg-[color:var(--color-surface)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text-default)] hover:bg-[color:var(--color-surface-elevated)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus)]"
      >
        {t.notFoundHomeLink}
      </Link>
    </div>
  )
}
