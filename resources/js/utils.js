import _request from 'request-promise'
import config from '../../config.js'

function request(url, options, callback) {
  _request(config.apiHost + url, options, callback)
}

request.post = function(options, callback) {
  options.url = config.apiHost + options.url
  _request.post(options, callback)
}

export default request
