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

  constructor(obj) {
    // There's a way to do mass assignment however I've chosen to assign each property individually for clarity
    this.id = obj.id
    this.name = obj.name
    this.symbol = obj.symbol
    this.atomicWeight = obj.atomicWeight
    this.electronsPerShell = obj.electronsPerShell
    this.category = obj.category
    // next we build the HTML element
    this.createHTMLElement()
  }

  createHTMLElement() {
    this.htmlElement = document.createElement('div')
    this.htmlElement.className = "atomic-element-card"
    const pID = document.createElement('p')
    pID.innerText = this.atomicNumber
    const pSymbol = document.createElement('p')
    pSymbol.innerText = this.symbol
    this.htmlElement.append(pID, pSymbol)
    atomicElementsContainer.append(this.htmlElement)
  }

  // Adding alternate getter for atomic number
  get atomicNumber() {
    return this.id
  }

}

AtomicElement.fetchElements()
