const enviroments = {
  production: {
    apiGiphyKey: process.env.GIPHY_API_KEY,
    apiGiphyEndpoint: process.env.GIPHY_API_ENDPOINT,
    apiRecipePuppyEndpoint: process.env.RECIPEPUPPY_ENDPOINT,
    port: process.env.APP_PORT || 3000
  },
  development: {
    apiGiphyKey: process.env.GIPHY_API_KEY,
    apiGiphyEndpoint: process.env.GIPHY_API_ENDPOINT,
    apiRecipePuppyEndpoint: process.env.RECIPEPUPPY_ENDPOINT,
    port: process.env.APP_PORT || 3000
  },
  test: {
    apiGiphyKey: '__TEST__',
    apiGiphyEndpoint: process.env.GIPHY_API_ENDPOINT,
    apiRecipePuppyEndpoint: process.env.RECIPEPUPPY_ENDPOINT,
    port: process.env.APP_PORT || 3000
  }
}
module.exports = (environment) => enviroments[environment]
