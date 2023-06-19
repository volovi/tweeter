// Import and register all your controllers from the importmap under controllers/*

import { application } from "controllers/application"

// Eager load all controllers defined in the import map under controllers/**/*_controller
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)
application.resize_observer = new ResizeObserver(
  function(entries) {
  	for (const entry of entries) {
      this.layout(entry.target)
    }
  }
)
application.resize_observer.layout = function(element) {
  const diff = element.offsetHeight-element.clientHeight
  element.style.height = "auto"
  element.style.height = (element.scrollHeight+diff)+"px"
}

// Lazy load controllers as they appear in the DOM (remember not to preload controllers in import map!)
// import { lazyLoadControllersFrom } from "@hotwired/stimulus-loading"
// lazyLoadControllersFrom("controllers", application)
