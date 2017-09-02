import _request from 'request-promise'
import config from '../../config.js'

function request(url, options, callback) {
  _request(config.apiHost + url, options, callback)
}

request.post = function(options, callback) {
  options.url = config.apiHost + options.url
  _request.post(options, callback)
}

export { request }

export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}