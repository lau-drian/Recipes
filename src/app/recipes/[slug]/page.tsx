// Route: /recipes/[slug] — single recipe detail
import { notFound } from "next/navigation"
import { getRecipeBySlug } from "../../../../lib/recipes"
import WaveDivider from "@/app/components/WaveDivider"
import Tag from "@/app/components/Tag"
import CookingModeRecipe from "@/app/components/CookingModeRecipe"

type RecipeMeta = {
  title?: string
  intro?: string
  content: string
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
        <h1>{recipe.title}</h1>
  {recipe.intro ? (
    <p className="mb-3 text-[color:var(--color-text-subtle)]">    
    {recipe.intro}
  </p>
) 
: null}

        <section className="mb-10">
        <p className="text-sm text-[color:var(--color-text-subtle)]">
  <span className="font-semibold text-[color:var(--color-text-subtle)]">Prep time:</span>{" "}
  {recipe.prepTime}{" "}
  <span className="mx-1">|</span>
  <span className="font-semibold text-[color:var(--color-text-subtle)]">Cook time:</span>{" "}
  {recipe.cookTime}{" "}
  <span className="mx-1">|</span>
  <span className="font-semibold text-[color:var(--color-text-subtle)]">Serves:</span>{" "}
  {recipe.servings}
</p>

<div className="flex flex-wrap items-center gap-3 mb-6 pt-6">
<Tag>{recipe.category}</Tag>
{recipe.tags?.map((t) => (
  <Tag key={t}>{t}</Tag>
))}
</div>
  
<WaveDivider/>

</section>

        <CookingModeRecipe content={recipe.content} slug={slug} showCookingMode={false} />
      </div>
    </main>
  )
}