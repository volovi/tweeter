import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "edit" ]

  edit(event){
    if (window.getSelection().isCollapsed) { // No text is selected
      this.editTarget.click()
    }
  }
}
