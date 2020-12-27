
const stringToArray = (ingredients) => {
  const [...ingredientesArray] = ingredients.split(',')
  return ingredientesArray.map(item => item.trim())
}
class RecipeTransformer {
  input (data) {
    if (!Array.isArray(data)) {
      throw new Error('The data should be an array')
    }

    this.data = data
    return this
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
