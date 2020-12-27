const HttpAxiosAdapter = require('@app/adapters/httpAxiosAdapter')
const GiphyService = require('@app/services/Giphy')
const config = require('@config')()
class GifServiceFactory {
  static create (type) {
    switch (type) {
      case 'giphy':
      {
        const httpAdapter = new HttpAxiosAdapter()
        return new GiphyService({ http: httpAdapter, config })
      }
      default:
        throw new Error('Unknown GifService type')
    }
  }
}

module.exports = GifServiceFactory
