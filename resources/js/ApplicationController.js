import TestRunnerController from './TestRunnerController.js'
import { MDCTextfield } from '@material/textfield'
import Vue from 'vue'

export default class AppController {

  constructor() {
    new MDCTextfield(document.querySelector('.mdc-textfield'))
    this.entry = document.querySelector('#entry')
    this.testRunner = new TestRunnerController()
    this.initEvents()
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
