require('dotenv-flow').config()
require('module-alias/register')
require('express-async-errors')
const env = require('@config/env')(process.env.NODE_ENV)

const { app } = require('./bootstrap')

app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
