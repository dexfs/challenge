const axios = require('axios')
class HttpAxiosAdaper {
  get (url, options = {}) {
    return axios.get(url, options)
  }
}

module.exports = HttpAxiosAdaper
