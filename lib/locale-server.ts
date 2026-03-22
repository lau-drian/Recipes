import { cookies } from "next/headers"
import type { AppLocale } from "lib/locale"
import { LOCALE_COOKIE } from "lib/locale"

export async function getAppLocale(): Promise<AppLocale> {
  const c = (await cookies()).get(LOCALE_COOKIE)?.value
  return c === "es" ? "es" : "en"
}
