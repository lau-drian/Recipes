export type Recipe = {
    title: string
    slug: string
    ingredients: string[]
    steps: string[]
  }
  
  export const recipes: Recipe[] = [
    {
      title: "Baked oats",
      slug: "baked-oats",
      ingredients: [
        "1 cup almond milk",
        "2 Tbspflaxseeds + 6 Tbsplukewarm water",
        "1 ½ banana",
        "½ cup blueberries / raspberries",
        "1 cup strawberries",
        "3 Tbspmelted coconut oil",
        "2 cups rolled oats",
        "⅓ cup almonds",
        "⅓ cup hemp seeds",
        "⅔ cup coconut flakes",
        "2 tsp cinnamon",
        "1 tsp cardamom",
        "1 tsp baking powder",
        "1 tsp vanilla"
      ],
      steps: [
        "Preheat oven to 175 degrees.",
        "Mix flax seeds mix, milk and coconut oil.",
        "Add banana and strawberries to the bottom of a greased pie pan.",
        "Reserve 2 tbsp of the almonds, hemp seeds and coconut flakes.",
        "Combine oats, remaining almonds, hemp seeds, coconut flakes, baking powder, cinnamon, brown sugar and salt.",
        "Combine almond milk, maple syrup and coconut oil; stir in flaxseed mixture.",
        "Pour wet into dry and stir to combine.",
        "Layer bananas and strawberries in the baking dish and spread oat mixture on top.",
        "Bake for 40-50 minutes or until the top is crisp and the middle is set.",
        "Let cool for 10 min before serving."
      ]
    },
    {
      title: "Banana bread",
      slug: "banana-bread",
      ingredients: [
        "Ripe bananas",
        "Flour",
        "Eggs",
        "Butter",
        "Sugar",
        "Baking soda",
        "Salt"
      ],
      steps: [
        "Mash bananas and mix with wet ingredients.",
        "Combine dry ingredients and fold into banana mixture.",
        "Pour into loaf pan and bake until set.",
        "Cool before slicing."
      ]
    }
  ]