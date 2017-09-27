import TestGroupController from './TestGroupController.js'

export default class TestRunnerController {

  constructor() {
    this.siteUrl = ''
    this.results = document.querySelector('#results')
    this.testGroups = [
      'seo',
      'performance',
      'security',
      'appearance'
    ]
    this.testGroupControllers = []
  }

  clearResults() {
    this.siteUrl = ''
    this.results.innerHTML = ''
    this.testGroupControllers = []
  }

  runTests(siteUrl) {
    for (const testGroup of this.testGroups) {
      this.testGroupControllers.push(new TestGroupController(testGroup, siteUrl))
    }
  }
}