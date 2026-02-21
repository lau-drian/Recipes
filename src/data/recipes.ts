export type Recipe = {
    title: string
    slug: string
    ingredients: string[]
    steps: string[]
  }
  
  export const recipes: Recipe[] = [
    {
      title: "Simple Tomato Pasta",
      slug: "simple-tomato-pasta",
      ingredients: [
        "200g pasta",
        "1 onion",
        "2 garlic cloves",
        "400g chopped tomatoes",
        "Olive oil",
        "Salt"
      ],
      steps: [
        "Boil the pasta according to the packet instructions.",
        "Heat olive oil in a pan and cook the onion until soft.",
        "Add garlic and cook for 30 seconds.",
        "Add chopped tomatoes and simmer for 10 minutes.",
        "Drain pasta and mix with sauce."
      ]
    },
    {
      title: "Avocado Toast",
      slug: "avocado-toast",
      ingredients: [
        "2 slices sourdough bread",
        "1 ripe avocado",
        "Salt",
        "Chilli flakes"
      ],
      steps: [
        "Toast the bread.",
        "Mash the avocado with salt.",
        "Spread over toast.",
        "Top with chilli flakes."
      ]
    }
  ]