import { notFound } from "next/navigation"
import { getRecipeBySlug } from "../../../../lib/recipes"
import WaveDivider from "@/app/components/WaveDivider"

type RecipeMeta = {
  title?: string
  intro?: string
  contentHtml: string
  category?: string
  tags?: string[]
  prepTime?: string | number
  cookTime?: string | number
  servings?: string | number
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const recipe = (await getRecipeBySlug(slug)) as RecipeMeta | null
  if (!recipe) notFound()

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-[680px] mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          {recipe.title}
        </h1>
  {recipe.intro ? (
    <p className="mb-6 text-[color:var(--color-text-subtle)]">    
    {recipe.intro}
  </p>
) 
: null}
        <section className="mb-6">
  <div className="flex flex-wrap items-center gap-2 mb-4">
    {recipe.category ? (
      <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
        {recipe.category}
      </span>
    ) : null}

    {Array.isArray(recipe.tags) &&
      recipe.tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-full border px-3 py-1 text-sm"
        >
          {tag}
        </span>
      ))}
  </div>

  <p className="text-sm text-[color:var(--color-text-subtle)]">
  <span className="font-semibold text-[color:var(--color-text-subtle)]">Prep time:</span>{" "}
  {recipe.prepTime}{" "}
  <span className="mx-2">·</span>
  <span className="font-semibold text-[color:var(--color-text-subtle)]">Cook time:</span>{" "}
  {recipe.cookTime}{" "}
  <span className="mx-2">·</span>
  <span className="font-semibold text-[color:var(--color-text-subtle)]">Serves:</span>{" "}
  {recipe.servings}
</p>
  <WaveDivider />
</section>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: recipe.contentHtml }}
        />
      </div>
    </main>
  )
}