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

    request.post('tests/sitemap', result => {
      console.log(result)
      this.addPanel(result)
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
