window.addEventListener('load', onReady)

function onReady() {
  const entry = document.querySelector('#entry')
  const results = document.querySelector('#results')

  entry.addEventListener('keypress', event => {
    if (event.keyCode === 13) {
      request('/run', handleResponse)
    }
  })

  function request(url, callback) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.addEventListener('load', callback)
    xhr.send()
  }

  function handleResponse() {
    addBox(this.response)
  }

  function addBox(content) {
    const box = `
      <div class="mdc-card">
        <section class="mdc-card__primary">
          <h1 class="mdc-card__title mdc-card__title--large">${content}</h1>
        </section>
      </div>
    `
    results.innerHTML += box
  }
}
