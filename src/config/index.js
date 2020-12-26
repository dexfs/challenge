module.exports = () => {
  const env = require('@config/env')(process.env.NODE_ENV)
  return env
}
