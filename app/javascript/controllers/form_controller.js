import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "editor", "cancel", "submit" ]

  initialize() {
    this.observer = this.application.resize_observer
  }
  
  editorTargetConnected(element) {
    element.setAttribute("data-action", "input->form#layout blur->form#stopEditing")
    
    this.dirty = false
    this.observer.observe(element)
  
    const l = element.textContent.length
    if (l) {
      element.setSelectionRange(l, l)
      element.focus()
    }
  }

  layout(event) {
    this.dirty = true
    this.observer.layout(event.target)
  }

  stopEditing(event) { // saves changes unless cancelled
    if (this.hasCancelTarget) {
      (this.cancelTarget.matches(':hover') || !this.dirty ? this.cancelTarget : this.submitTarget).click()
    }
  }

  editorTargetDisconnected(element) {
    this.observer.unobserve(element)
  }
}
