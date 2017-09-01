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
      <div class="mdc-card">
        <section class="mdc-card__primary">
          <h1 class="mdc-card__title mdc-card__title--large">${test.test}</h1>
          ${JSON.stringify(test.results)}
        </section>
      </div>
    `
    this.results.innerHTML += panel
  }
}
