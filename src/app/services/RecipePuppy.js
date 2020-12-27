const { NotFound, GeneralError, NetworkError } = require('@app/exceptions/errors')

class RecipePuppy {
  constructor ({ http, config, transformer }) {
    this.http = http
    this.endpoint = config.apiRecipePuppyEndpoint
    this.transformer = transformer
  }

  async getRecipesByIngredients (query) {
    try {
      const { data } = await this.http.get(`${this.endpoint}?i=${query.ingredients}`)
      const dataTransformed = this.transformer.input(data.results).get()
      return { recipes: dataTransformed }
    } catch (error) {
      console.error({ error })
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
