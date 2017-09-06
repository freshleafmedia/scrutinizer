import config from '../../config.js'

function request(url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.open('get', config.apiHost + url)
  xhr.addEventListener('load', function() {
    callback.call(this, null, { statusCode: this.status }, this.responseText)
  })
  xhr.send()
}

request.post = function(url, data, callback) {
  const xhr = new XMLHttpRequest()
  xhr.open('post', config.apiHost + url)
  xhr.addEventListener('load', function() {
    callback.call(this, null, { statusCode: this.status }, this.responseText)
  })
  xhr.send({ form: data })
}

export { request }

export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}