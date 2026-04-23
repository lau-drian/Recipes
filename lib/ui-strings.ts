import type { AppLocale } from "lib/locale"

export type UiCopy = {
  siteTitle: string
  homeTitle: string
  recipesIndexTitle: string
  recipesIndexSubtitle: string
  recipesLoadError: string
  searchLabel: string
  searchPlaceholder: string
  noRecipesFound: string
  prepTime: string
  serves: string
  lightMode: string
  darkMode: string
  languageToggleAria: string
  switchToEnglish: string
  switchToSpanish: string
  cookingModeEnter: string
  cookingModeExit: string
  cookingModeButtonCooking: string
  cookingModeButtonRecipe: string
  markDone: string
  markIncomplete: string
  metaTitleSuffix: string
  metaHomeTabTitle: string
  metaDefaultDescription: string
  metaRecipesIndexDescription: string
  notFoundTitle: string
  notFoundDescription: string
  notFoundHomeLink: string
}

const en: UiCopy = {
  siteTitle: "Recipes",
  homeTitle: "What are we eating?",
  recipesIndexTitle: "Recipes",
  recipesIndexSubtitle: "Tap a recipe to open it.",
  recipesLoadError:
    "Unable to load recipes. Check the terminal for errors.",
  searchLabel: "Search recipes",
  searchPlaceholder: "Search something yummy 😋",
  noRecipesFound: "No recipes found.",
  prepTime: "Prep time",
  serves: "Serves",
  lightMode: "Light mode",
  darkMode: "Dark mode",
  languageToggleAria: "Switch language",
  switchToEnglish: "English",
  switchToSpanish: "Español",
  cookingModeEnter: "Enter cooking mode",
  cookingModeExit: "Exit cooking mode",
  cookingModeButtonCooking: "Recipe mode",
  cookingModeButtonRecipe: "Cooking mode",
  markDone: "Mark as done",
  markIncomplete: "Mark as incomplete",
  metaTitleSuffix: "Lau & Adrian",
  metaHomeTabTitle: "What are we eating? · Lau & Adrian",
  metaDefaultDescription:
    "Our shared recipe collection — meals we cook and return to.",
  metaRecipesIndexDescription: "Browse every recipe in our collection.",
  notFoundTitle: "This page isn’t on the menu",
  notFoundDescription:
    "The link may be wrong, or we moved the recipe. Try the home page or search from there.",
  notFoundHomeLink: "Back to recipes",
}

const es: UiCopy = {
  siteTitle: "Recetas",
  homeTitle: "¿Qué vamos a comer?",
  recipesIndexTitle: "Recetas",
  recipesIndexSubtitle: "Toca una receta para abrirla.",
  recipesLoadError:
    "No se pudieron cargar las recetas. Revisa la terminal por si hay errores.",
  searchLabel: "Buscar recetas",
  searchPlaceholder: "Busca algo rico 😋",
  noRecipesFound: "No se encontraron recetas.",
  prepTime: "Preparación",
  serves: "Porciones",
  lightMode: "Modo claro",
  darkMode: "Modo oscuro",
  languageToggleAria: "Cambiar idioma",
  switchToEnglish: "English",
  switchToSpanish: "Español",
  cookingModeEnter: "Entrar al modo cocina",
  cookingModeExit: "Salir del modo cocina",
  cookingModeButtonCooking: "Modo receta",
  cookingModeButtonRecipe: "Modo cocina",
  markDone: "Marcar como hecho",
  markIncomplete: "Marcar como pendiente",
  metaTitleSuffix: "Lau y Adrian",
  metaHomeTabTitle: "¿Qué vamos a comer? · Lau y Adrian",
  metaDefaultDescription:
    "Nuestra colección de recetas — platos que cocinamos una y otra vez.",
  metaRecipesIndexDescription: "Todas las recetas de nuestra colección.",
  notFoundTitle: "Esta página no está en el menú",
  notFoundDescription:
    "El enlace puede estar mal o movimos la receta. Prueba volver al inicio y buscar desde ahí.",
  notFoundHomeLink: "Volver a las recetas",
}

export const uiStrings: Record<AppLocale, UiCopy> = { en, es }

export function getUi(locale: AppLocale): UiCopy {
  return uiStrings[locale]
}
