import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import remarkGfm from "remark-gfm"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fromLib = path.join(__dirname, "..", "content", "recipes")
const fromCwd = path.join(process.cwd(), "content", "recipes")
const recipesDirectory = fs.existsSync(fromLib) ? fromLib : fromCwd

export type RecipeMeta = {
  title: string
  slug: string
  category?: string
  tags?: string[]
  servings?: string | number
  prepTime?: string | number
  cookTime?: string | number
}

export function getAllRecipes(): RecipeMeta[] {
  const dir = recipesDirectory
  if (!fs.existsSync(dir)) {
    return []
  }
  const allNames = fs.readdirSync(dir)
  const files = allNames.filter((f) => f.endsWith(".md"))
  const recipes: RecipeMeta[] = []

  for (const file of files) {
    const fullPath = path.join(dir, file)
    try {
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(fileContents)
      const slug =
        typeof data.slug === "string" && data.slug
          ? data.slug
          : path.basename(file, ".md")
      const title =
        typeof data.title === "string" && data.title ? data.title : slug
      recipes.push({
        title,
        slug,
        ...(data.category != null && { category: String(data.category) }),
        ...(Array.isArray(data.tags) && { tags: data.tags.map(String) }),
        ...(data.servings != null && { servings: data.servings }),
        ...(data.prepTime != null && { prepTime: data.prepTime }),
        ...(data.cookTime != null && { cookTime: data.cookTime }),
      })
    } catch (err) {
      console.warn(`[getAllRecipes] Skipped ${file}:`, err)
    }
  }

  return recipes.sort((a, b) => a.title.localeCompare(b.title))
}

export async function getRecipeBySlug(slug: string) {
  const fullPath = path.join(recipesDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) {
    return null
  }
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(content)

  const contentHtml = processedContent.toString()

  return {
    ...data,
    contentHtml,
  }
}