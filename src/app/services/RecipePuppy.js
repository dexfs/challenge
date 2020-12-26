const { NotFound, GeneralError, NetworkError } = require('@app/exceptions/errors')
const config = require('@config')()
class RecipePuppy {
  constructor (http) {
    this.http = http
    this.endpoint = config.apiRecipePuppyEndpoint
  }

  async getRecipesByIngredients (query) {
    try {
      const { data } = await this.http.get(`${this.endpoint}?i=${query.ingredients}`)
      return { recipes: data.results }
    } catch (error) {
      if (error.message === 'Network Error') {
        throw new NetworkError(error.message)
      }

      const { status, data } = error.response
      if (status === 404) {
        throw new NotFound(data)
      }

      throw new GeneralError('Error')
    }
  }
}

module.exports = RecipePuppy
