import TestRunnerController from './TestRunnerController.js'

export default class AppController {

  constructor() {
    this.entry = document.querySelector('#entry')
    this.testRunner = new TestRunnerController()
    this.initEvents();
  }

  initEvents() {
    this.entry.addEventListener('keypress', this.handleSubmit.bind(this))
  }

  handleSubmit(event) {
    if (event.keyCode !== 13) {
      return
    }

    this.testRunner.clearResults()
    this.testRunner.runTests(this.entry.value)
  }
}
