const { validate } = require('express-validation')
const recipeRequest = require('@app/http/requests/RecipesRequest')
const IndexController = require('@app/http/recipes/controllers/IndexController')
module.exports = (router) => {
  router.get('/recipes',
    validate(recipeRequest, {}, {}),
    IndexController.index
  )
}
