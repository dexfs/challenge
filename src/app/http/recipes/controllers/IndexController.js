const ListRecipesAction = require('@app/actions/ListRecipesAction')
const { GifServiceFactory, RecipeServiceFactory } = require('@app/factories')
class IndexController {
  static async index (request, response) {
    const recipeService = RecipeServiceFactory.create('recipePuppy')
    const gifService = GifServiceFactory.create('giphy')
    const action = new ListRecipesAction({ recipeService, gifService })
    const actionResult = await action.execute(request.query)
    return response.json(actionResult)
  }
}

module.exports = IndexController
