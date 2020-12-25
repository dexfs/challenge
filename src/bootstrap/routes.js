const { Router } = require('express')
const fg = require('fast-glob')

module.exports = (app) => {
  const router = Router()
  app.use('/', router)
  const entries = fg.sync('**/src/routes/**route.js')
  entries.map(file => require(`./../../${file}`)(router))
}
