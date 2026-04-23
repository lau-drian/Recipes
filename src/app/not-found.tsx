import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getAppLocale } from "lib/locale-server"
import { getUi } from "lib/ui-strings"

const headerControlLinkClass =
  "inline-flex rounded-full border border-[color:var(--color-border-default)] bg-[color:var(--color-background)] px-4 py-2 text-sm text-[color:var(--color-text-subtle)] hover:bg-[color:var(--color-surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus)]"

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
      <Image
        src="/images/not-found-polly.png"
        alt=""
        width={320}
        height={320}
        className="mx-auto mb-6 h-auto w-[clamp(150px,38vw,220px)] object-contain"
        sizes="(max-width: 680px) 38vw, 220px"
      />
      <h2 className="recipe-md-h2 mb-4 text-balance">{t.notFoundTitle}</h2>
      <p className="mx-auto mb-10 max-w-md text-pretty text-[color:var(--color-text-subtle)]">
        {t.notFoundDescription}
      </p>
      <Link href="/" className={headerControlLinkClass}>
        {t.notFoundHomeLink}
      </Link>
    </div>
  )
}
