import _request from 'request-promise'
import config from './config.js'

function request(url, options, callback) {
  _request(config.apiHost + url, options, callback)
}

request.post = function(url, callback) {
  _request(config.apiHost + url, callback)
}

export default request
