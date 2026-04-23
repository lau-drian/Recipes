import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import matter from "gray-matter"
import type { AppLocale } from "lib/locale"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fromLib = path.join(__dirname, "..", "content", "recipes")
const fromCwd = path.join(process.cwd(), "content", "recipes")
const recipesDirectory = fs.existsSync(fromLib) ? fromLib : fromCwd

function localizedPath(slug: string, locale: AppLocale): string {
  if (locale === "es") {
    const esFile = path.join(recipesDirectory, "es", `${slug}.md`)
    if (fs.existsSync(esFile)) return esFile
  }
  return path.join(recipesDirectory, `${slug}.md`)
}

export type RecipeMeta = {
  title: string
  slug: string
  category?: string
  tags?: string[]
  servings?: string | number
  prepTime?: string | number
}

export function getAllRecipes(locale: AppLocale = "en"): RecipeMeta[] {
  const dir = recipesDirectory
  if (!fs.existsSync(dir)) {
    return []
  }
  const allNames = fs.readdirSync(dir)
  const files = allNames.filter(
    (f) => f.endsWith(".md") && !f.startsWith(".")
  )
  const recipes: RecipeMeta[] = []

  for (const file of files) {
    const slugFromFile = path.basename(file, ".md")
    const fullPath = localizedPath(slugFromFile, locale)
    try {
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(fileContents)
      const slug =
        typeof data.slug === "string" && data.slug
          ? data.slug
          : slugFromFile
      const title =
        typeof data.title === "string" && data.title ? data.title : slug
      recipes.push({
        title,
        slug,
        ...(data.category != null && { category: String(data.category) }),
        ...(Array.isArray(data.tags) && { tags: data.tags.map(String) }),
        ...(data.servings != null && { servings: data.servings }),
        ...(data.prepTime != null && { prepTime: data.prepTime }),
      })
    } catch (err) {
      console.warn(`[getAllRecipes] Skipped ${file}:`, err)
    }
  }

  return recipes.sort((a, b) => a.title.localeCompare(b.title))
}

export async function getRecipeBySlug(
  slug: string,
  locale: AppLocale = "en"
) {
  const enPath = path.join(recipesDirectory, `${slug}.md`)
  if (!fs.existsSync(enPath)) {
    return null
  }
  const fullPath = localizedPath(slug, locale)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const { data, content } = matter(fileContents)

  return {
    ...data,
    content,
  }
}