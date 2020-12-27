const { Joi } = require('express-validation')

module.exports = {
  query: Joi.object({
    i: Joi.string().required()
  })
}
