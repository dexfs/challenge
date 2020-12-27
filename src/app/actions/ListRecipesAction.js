class ListRecipesAction {
  constructor ({ recipeService, gifService }) {
    this.recipeService = recipeService
    this.gifService = gifService
  }

  async execute (input) {
    const { recipes } = await this.recipeService.getRecipesByIngredients({ ingredients: input.i })
    const recipesWithItsGifs = await this.getRecipeGifByTitle(recipes)
    return {
      keywords: this.getKeywords(input.i),
      recipes: recipesWithItsGifs
    }
  }

  getKeywords (input) {
    return input.split(',')
  }

  async getRecipeGifByTitle (recipes) {
    const promises = recipes.map(async recipe => {
      const { gif } = await this.gifService.getGifByRecipeTitle(recipe.title)
      return {
        ...recipe,
        gif
      }
    })

    return Promise.all(promises)
  }
}

module.exports = ListRecipesAction
