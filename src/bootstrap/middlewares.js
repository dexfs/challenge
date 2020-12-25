const { json } = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

module.exports = (app) => {
  app.disable('x-powered-by')
  app.use(cors())
  app.use(json())
  app.use(helmet())
  app.use(limiter)
}
