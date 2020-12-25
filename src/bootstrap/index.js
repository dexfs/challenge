const express = require('express')
const app = express()

const setupMiddlewares = require('./middlewares')
const setupRoutes = require('./routes')
const setupHandlerErrors = require('./errors')

setupMiddlewares(app)
setupRoutes(app)
setupHandlerErrors(app)

module.exports = { app }
