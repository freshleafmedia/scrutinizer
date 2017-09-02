import request from './utils.js'

export default class TestRunnerController {

  constructor() {
    this.results = document.querySelector('#results')
    this.siteUrl = ''
    this.tests = [
      'tests/sitemap'
    ]
  }

  clearResults() {
    this.results.innerHTML = ''
  }

  runTests(siteUrl) {
    this.siteUrl = siteUrl
    for (const testKey in this.tests) {
      const endpoint = this.tests[testKey]
      request.post({ url: endpoint, form: { url: this.siteUrl } }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return
        }
        this.addPanel(JSON.parse(body))
      })
    }
  }

  addPanel(test) {
    this.results.innerHTML += `
      <div class="mdc-card test-result-card">
        <section class="mdc-card__primary">
          <div class="test-result-card__status"></div>
          <h1 class="mdc-card__title">${test.test}</h1>
          <h2 class="mdc-card__subtitle">${JSON.stringify(test.results)}</h2>
        </section>
      </div>
    `
  }
}