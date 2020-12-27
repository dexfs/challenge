const IndexController = require('@app/http/recipes/controllers/IndexController')
module.exports = (router) => {
  router.get('/recipes', IndexController.index)
}
