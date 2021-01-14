// Global Constants //

const PORT = 3000
const URL = `http://localhost:${PORT}/elements`
const parseJSON = res => res.json()

// HTML Elements

const atomicElementDetails = document.querySelector('#atomic-element-details')
const atomicElementsContainer = document.querySelector('#atomic-elements-container')

// Atomic Element Class //

class AtomicElement {

  static all = []

  static fetchElements() {
    fetch(URL).then(parseJSON)
    .then(data => data.forEach(el => new AtomicElement(el)))
  }

  constructor(elementObject) {
    console.log(elementObject)
  }

}

AtomicElement.fetchElements()
