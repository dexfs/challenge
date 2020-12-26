const { NotFound, GeneralError } = require('@app/exceptions/errors')

class RecipePuppy {
  constructor (http) {
    this.http = http
    this.endpoint = 'http://www.recipepuppy.com/api/'
  }

  async getRecipesByIngredients (query) {
    try {
      const { data } = await this.http.get(`${this.endpoint}?i=${query.ingredients}`)
      return { recipes: data.results }
    } catch (error) {
      console.log({ error })
      const { status, data } = error.response
      if (status === 404) {
        throw new NotFound(data)
      }

      throw new GeneralError('Error')
    }
  }
}

module.exports = RecipePuppy
