module.exports = (router) => {
  router.get('/recipes', (req, res) => {
    return res.json('ok')
  })
}
