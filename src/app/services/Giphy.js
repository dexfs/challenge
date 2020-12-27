const { NotFound, GeneralError, NetworkError, Forbidden } = require('@app/exceptions/errors')

class Giphy {
  constructor ({ http, config }) {
    this.http = http
    this.endpoint = config.apiGiphyEndpoint
    this.apiKey = config.apiGiphyKey
  }

  async getGifByRecipeTitle (title) {
    try {
      const { data } = await this.http.get(`${this.endpoint}`, {
        params: {
          api_key: this.apiKey,
          q: title
        }
      })
      return { gif: data.data[0]?.images?.original?.url || null }
    } catch (error) {
      if (error.message === 'Network Error') {
        throw new NetworkError()
      }
      const { status, data } = error.response
      if (status === 403) {
        throw new Forbidden('Forbidden: verify your token API')
      }

      if (status === 404) {
        throw new NotFound(data)
      }

      throw new GeneralError('Error')
    }
  }
}

module.exports = Giphy
