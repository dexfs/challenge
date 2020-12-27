const HttpAxiosAdapter = require('@app/adapters/httpAxiosAdapter')
const RecipeTransformer = require('@app/helpers/RecipeTransformer')
const RecipePuppyService = require('@app/services/RecipePuppy')
const config = require('@config')()

class RecipeServiceFactory {
  static create (type) {
    switch (type) {
      case 'recipePuppy':
      {
        const transformer = new RecipeTransformer()
        const httpAdapter = new HttpAxiosAdapter()
        return new RecipePuppyService({ http: httpAdapter, config, transformer })
      }
      default:
        throw new Error('Unknown RecipeService type')
    }
  }
}

module.exports = RecipeServiceFactory
