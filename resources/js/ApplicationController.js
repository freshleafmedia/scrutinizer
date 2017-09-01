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

    request.post({ url: 'tests/sitemap', form: { url: this.entry.value } }, (err, response, body) => {
      if (err || response.statusCode !== 200) {
        return
      }
      this.addPanel(body)
    })
  }

  addPanel(content) {
    const panel = `
      <div class="mdc-card">
        <section class="mdc-card__primary">
          <h1 class="mdc-card__title mdc-card__title--large">${content}</h1>
        </section>
      </div>
    `
    this.results.innerHTML += panel
  }
}
