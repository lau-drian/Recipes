import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import { getAppLocale } from "lib/locale-server";
import { getUi } from "lib/ui-strings";
import { Karla, Source_Serif_4, JetBrains_Mono } from "next/font/google"

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getAppLocale();
  const t = getUi(locale);
  return {
    title: {
      default: t.siteTitle,
      template: `%s · ${t.metaTitleSuffix}`,
    },
    description: t.metaDefaultDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getAppLocale();
  const t = getUi(locale);
  const htmlLang = locale === "es" ? "es" : "en";
  return (
    <html lang={htmlLang} className={`${karla.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} antialiased`}>
<body
  suppressHydrationWarning
  style={{
    background: "var(--color-background)",
    color: "var(--color-text-default)",
  }}
  className="flex min-h-screen flex-col antialiased"
>
  <SiteHeader locale={locale} />
  <div className="site-header-spacer" aria-hidden />
  <main className="mx-auto w-full max-w-[680px] flex-1 px-5 py-6 sm:px-8 sm:py-10">
    {children}
  </main>
  <footer
    className="mx-auto mt-auto w-full max-w-[680px] px-5 py-6 text-center text-sm text-[color:var(--color-text-subtle)] sm:px-8 sm:py-8"
    role="contentinfo"
  >
    {t.siteFooter}
  </footer>
      </body>
    </html>
  );
}
