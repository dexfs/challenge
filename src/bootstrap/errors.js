const handleErrors = require('@app/middlewares/handleErrors')

module.exports = app => {
  app.use(handleErrors)
}
