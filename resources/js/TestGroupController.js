import { request, camelize } from './utils.js'

export default class TestGroupController {

  constructor(testGroup, siteUrl) {
    this.testGroup = testGroup
    this.siteUrl = siteUrl
    this.results = document.querySelector('#results')
    this.testResults = []
    this.render()
    this.getAllTests();
  }

  getAllTests() {
    request('tests/' + this.testGroup + '/listAll', (err, response, body) => {
      const testsToRun = JSON.parse(body)
      for (const testName of testsToRun) {
        this.runTest(testName, camelize(testName))
      }
    })
  }

  runTest(testName, endpoint) {
    request('tests/' + this.testGroup + '/' + endpoint + "?url=" + this.siteUrl, (err, response, body) => {
      if (err || response.statusCode !== 200) {
        return
      }
      const testResult = {
        name: testName,
        result: JSON.parse(body)
      }
      this.testResults.push(testResult)
      this.render()
    })
  }

  render() {
    if (!this.el) {
      this.el = document.createElement('ul')
      this.el.classList.add('mdc-list', 'test-result-card')
      this.results.appendChild(this.el)
    }
    this.el.innerHTML = this.testGroup
    for (const test of this.testResults) {
      const resultEl = document.createElement('li')
      resultEl.innerHTML = `
        <span class="mdc-list-item__text">
            ${test.name}
          <span class="mdc-list-item__text__secondary">
            ${JSON.stringify(test.result)}
          </span>
        </span>
      `
      this.el.appendChild(resultEl)
    }
  }
}
