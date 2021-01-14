// Global Constants //

const PORT = 3000
const URL = `http://localhost:${PORT}/elements`
const parseJSON = res => res.json()

// HTML Elements //

const atomicElementDetails = document.querySelector('#atomic-element-details')
const atomicElementsContainer = document.querySelector('#atomic-elements-container')

// Helper Functions //

const sortById = (a,b) => a.id - b.id

// Atomic Element Class //

class AtomicElement {

  static all = []

  static fetchElements() {
    fetch(URL).then(parseJSON)
    .then(data => data.sort(sortById).forEach(el => new AtomicElement(el)))
    // I've chosen to sort the data as it comes in so I won't have to worry about it later
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
    this.constructor.all.push(this)
  }

  createHTMLElement() {
    this.htmlElement = document.createElement('div')
    this.htmlElement.className = "atomic-element-card"
    const pID = document.createElement('p')
    pID.innerText = this.atomicNumber
    const pSymbol = document.createElement('p')
    pSymbol.innerText = this.symbol
    this.htmlElement.append(pID, pSymbol)
    // we can append multiple elements at the same time
    this.htmlElement.addEventListener("mouseenter", this.handleMouseEnter.bind(this))
    atomicElementsContainer.append(this.htmlElement)
  }

  handleMouseEnter(event) {
    // since we bound the callback to the AtomicElement class object, we can reference it directly here
    const details = atomicElementDetails.querySelectorAll('p')
    details[0].innerText = this.atomicNumber
    details[1].innerText = this.name
    details[2].innerText = this.symbol
    details[3].innerText = this.category
    details[4].innerText = this.atomicWeight
    details[5].innerText = this.electronsPerShell.toString()
  }

  // Adding alternate getter for atomic number
  get atomicNumber() {
    return this.id
  }

}

AtomicElement.fetchElements()
