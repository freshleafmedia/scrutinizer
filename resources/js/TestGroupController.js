import { request, camelize } from './utils.js'
import domify from 'domify'

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
        this.runTest(testName, camelize(testName.toLowerCase()))
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
      this.el = domify(`
      <div class="mdc-card test-result-card">
        <section class="mdc-card__primary">
          <div class="test-result-card__icon"></div>
          <h1 class="mdc-card__title mdc-card__title--large">${this.testGroup}</h1>
          <h2 class="mdc-card__subtitle">Test results</h2>
        </section>
        <section class="test-list"></section>
      </div>
      `)
      this.results.appendChild(this.el)
    }

    const listEl = domify(`<ul class="mdc-list"></ul>`)
    for (const test of this.testResults) {
      const errors = test.result.problems.join('<br>')
      const resultEl = document.createElement('li')
      resultEl.classList.add('mdc-list-item')
      resultEl.innerHTML = `
        <span class="test-status-icon">
          <i class="material-icons" aria-hidden="true">folder</i>
        </span>
        <span class="mdc-list-item__text">
            ${test.name}
          <span class="mdc-list-item__text__secondary">
            ${errors}
          </span>
        </span>
      `
      listEl.appendChild(resultEl)
    }
    this.el.querySelector('.test-list').innerHTML = ''
    this.el.querySelector('.test-list').appendChild(listEl)
  }
}
