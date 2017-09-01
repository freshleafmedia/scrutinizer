import request from './utils.js'

export default class AppController {

  constructor() {
    this.entry = document.querySelector('#entry')
    this.results = document.querySelector('#results')
    this.initEvents();
  }

  initEvents() {
    this.entry.addEventListener('keypress', this.handleSubmit.bind(this))
  }

  handleSubmit(event) {
    if (event.keyCode !== 13) {
      return
    }

    this.clearResults()

    request.post({ url: 'tests/sitemap', form: { url: this.entry.value } }, (err, response, body) => {
      if (err || response.statusCode !== 200) {
        return
      }
      this.addPanel(JSON.parse(body))
    })
  }

  clearResults() {
    this.results.innerHTML = ''
  }

  addPanel(test) {
    const panel = `
      <div class="mdc-card test-result-card">
        <section class="mdc-card__primary">
          <div class="test-result-card__status"></div>
          <h1 class="mdc-card__title">${test.test}</h1>
          <h2 class="mdc-card__subtitle">${JSON.stringify(test.results)}</h2>
        </section>
      </div>
    `
    this.results.innerHTML += panel
  }
}
