
const stringToArray = (ingredients) => {
  const [...ingredientesArray] = ingredients.split(',')
  return ingredientesArray.map(item => item.trim())
}
class RecipeTransformer {
  constructor (data) {
    this.data = data
  }

  get () {
    return this.data.map(recipe => ({
      title: recipe.title,
      links: recipe.href,
      ingredients: this.transformAndSortIngredients(recipe.ingredients)
    }))
  }

  transformAndSortIngredients (ingredients) {
    if (!ingredients.length) return []

    return stringToArray(ingredients).sort()
  }
}

module.exports = RecipeTransformer
