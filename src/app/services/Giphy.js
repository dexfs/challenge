const { NotFound, GeneralError, NetworkError } = require('@app/exceptions/errors')

class Giphy {
  constructor ({ http, config }) {
    this.http = http
    this.endpoint = config.apiGiphyEndpoint
    this.apiKey = config.apiGiphyKey
  }

  async getGifByRecipeTitle (title) {
    try {
      const { data } = await this.http.get(`${this.endpoint}?api_key=${this.apiKey}&q=${title}`)
      return { gif: data.data[0]?.images?.original?.url || null }
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

module.exports = Giphy
