import Link from "next/link"
import { recipes } from "@/data/recipes"

type PageProps = {
  params: { slug: string }
}

export default function RecipeDetailPage({ params }: PageProps) {
  const recipe = recipes.find((r) => r.slug === params.slug)

  if (!recipe) {
    return (
      <main className="min-h-screen bg-white text-neutral-900 p-6 sm:p-8">
        <div className="max-w-2xl mx-auto">
          <p className="mb-6 text-neutral-600">
            La receta no existe amiguito.
          </p>
          <Link href="/recipes" className="underline">
            Back to recipes
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900 p-6 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/recipes" className="inline-block underline mb-6">
          Back to recipes
        </Link>

        <h1 className="text-3xl font-bold tracking-tight mb-6">
          {recipe.title}
        </h1>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">
            Ingredients
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            {recipe.ingredients.map((item) => (
              <li key={item} className="text-neutral-800">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">
            Steps
          </h2>
          <ol className="list-decimal pl-5 space-y-3">
            {recipe.steps.map((step) => (
              <li key={step} className="text-neutral-800 leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  )
}
