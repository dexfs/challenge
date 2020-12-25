class IndexController {
  static async index (request, response) {
    const recipes = []
    return response.json({ recipes })
  }
}

module.exports = IndexController
