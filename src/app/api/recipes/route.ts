import { NextResponse } from "next/server"
import { getAllRecipes } from "lib/recipes"
import { getAppLocale } from "lib/locale-server"

export async function GET() {
  const locale = await getAppLocale()
  const recipes = getAllRecipes(locale)
  return NextResponse.json(recipes)
}
