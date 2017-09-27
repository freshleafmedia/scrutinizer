import { request, camelize, toHumanReadable } from './utils.js'
import domify from 'domify'

export default class TestGroupController {

  constructor(testGroup, siteUrl) {
    this.testGroup = testGroup
    this.siteUrl = siteUrl
    this.results = document.querySelector('#results')
    this.testResults = {}
    this.render()
    this.getAllTests();
  }

  getAllTests() {
    request('tests/' + this.testGroup + '/listAll', (err, response, body) => {
      const testsToRun = JSON.parse(body)
      for (const testName of testsToRun) {
        this.testResults[testName] = {
          name: testName,
          status: 'pending'
        }
        this.runTest(testName, camelize(testName.toLowerCase()))
      }
      this.render()
    })
  }

  runTest(testName, endpoint) {
    request('tests/' + this.testGroup + '/' + endpoint + "?url=" + this.siteUrl, (err, response, body) => {
      if (err || response.statusCode !== 200) {
        this.testResults[testName] = {
          name: testName,
          status: 'error'
        }
        this.render()
        return
      }
      const result = JSON.parse(body)
      this.testResults[testName] = {
        name: testName,
        status: result.problems.length ? 'bad' : 'good',
        result: result
      }
      this.render()
    })
  }

  render() {
    if (!this.el) {
      const title = toHumanReadable(this.testGroup)
      this.el = domify(`
      <div class="mdc-card test-result-card">
        <section class="mdc-card__primary test-result-card__background">
          <h1 class="mdc-card__title mdc-card__title--large">${title}</h1>
          <h2 class="mdc-card__subtitle">Test results</h2>
        </section>
        <section class="test-list"></section>
      </div>
      `)
      this.results.appendChild(this.el)
    }

    const listEl = domify(`<ul class="mdc-list"></ul>`)
    for (const testKey in this.testResults) {
      const test = this.testResults[testKey]
      let message = '', icon = ''
      switch (test.status) {
        case 'pending':
          icon = 'cached'
          break
        case 'bad':
          icon = 'close'
          break
        case 'good':
          icon = 'check'
          break
        case 'error':
        default:
          icon = 'warning'
          break
      }
      if (test.result && test.result.problems && test.result.problems.length) {
        message = test.result.problems.join('<br>')
      }
      const resultEl = document.createElement('li')
      resultEl.classList.add('mdc-list-item')
      resultEl.innerHTML = `
        <span class="test-status-icon ${test.status}">
          <i class="material-icons" aria-hidden="true">${icon}</i>
        </span>
        <span class="mdc-list-item__text">
            ${test.name}
          <span class="mdc-list-item__text__secondary">
            ${message}
          </span>
        </span>
      `
      listEl.appendChild(resultEl)
    }
    this.el.querySelector('.test-list').innerHTML = ''
    this.el.querySelector('.test-list').appendChild(listEl)
  }
}
