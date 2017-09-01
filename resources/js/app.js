"use strict"
import { MDCTextfield } from '@material/textfield'
import ApplicationController from './ApplicationController.js'

window.addEventListener('load', event => {
  initComponents()
  new ApplicationController()
})

function initComponents() {
  new MDCTextfield(document.querySelector('.mdc-textfield'))
}
