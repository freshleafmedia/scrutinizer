import request from './utils.js'

export default class TestRunnerController {

  constructor() {
    this.results = document.querySelector('#results')
    this.siteUrl = ''
    this.tests = {
      'Sitemap': 'tests/seo/sitemap',
      'Robots.txt': 'tests/seo/robotsText',
      'Response Time': 'tests/performance/responseTime'
    }
  }

  clearResults() {
    this.siteUrl = ''
    this.results.innerHTML = ''
  }

  runTests(siteUrl) {
    this.siteUrl = siteUrl
    for (const [testName, endpoint] of Object.entries(this.tests)) {
      request(endpoint + "?url=" + this.siteUrl, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return
        }
        this.addPanel(testName, JSON.parse(body))
      })
    }
  }

  addPanel(testName, testData) {
    this.results.innerHTML += `
      <div class="mdc-card test-result-card">
        <section class="mdc-card__primary">
          <div class="test-result-card__status"></div>
          <h1 class="mdc-card__title">${testName}</h1>
          <h2 class="mdc-card__subtitle">${JSON.stringify(testData)}</h2>
        </section>
      </div>
    `
  }
}