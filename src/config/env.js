const enviroments = {
  production: {
    apiGiphyKey: process.env.GIPHY_API_KEY,
    port: process.env.PORT || 3000
  },
  development: {
    apiGiphyKey: process.env.GIPHY_API_KEY,
    port: process.env.PORT || 3000
  },
  test: {
    apiGiphyKey: '__TEST__',
    port: process.env.PORT || 3000
  }
}
module.exports = (environment) => enviroments[environment]
