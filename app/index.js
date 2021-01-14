// Global Constants //

const PORT = 3000
const URL = `http://localhost:${PORT}/elements`
const parseJSON = res => res.json()

// HTML Elements //

const atomicElementDetails = document.querySelector('#atomic-element-details')
const atomicElementsContainer = document.querySelector('#atomic-elements-container')
const categorySelector = document.querySelector('#category-select')

// Helper Functions //

const sortById = (a,b) => a.id - b.id

// Atomic Element Class //

class AtomicElement {

  // STATIC PROPERTIES //

  static all = []

  // I've chosen to sort the data as it comes in so I won't have to worry about it later
  static fetchElements() {
    fetch(URL).then(parseJSON)
    .then(data => {
      data
      .sort(sortById)
      .forEach(el => new AtomicElement(el))
    })
  }

  static filterByCategory(category) {
    this.all.forEach(el => {
      if (el.category === category || category === "all") {
        el.html.style.display = "block"
      } else {
        el.html.style.display = "none"
      }
    })
  }

  // CONSTRUCTOR //

  constructor(obj) {
    // There's a way to do mass assignment however I've chosen to assign each property individually for clarity
    this.id = obj.id
    this.name = obj.name
    this.symbol = obj.symbol
    this.atomicWeight = obj.atomicWeight
    this.electronsPerShell = obj.electronsPerShell
    this.category = obj.category
    this.createHTMLElement()
    this.constructor.all.push(this)
  }

  createHTMLElement() {
    this.html = document.createElement('div')
    this.html.className = "atomic-element-card"
    const pID = document.createElement('p')
    pID.innerText = this.atomicNumber
    const pSymbol = document.createElement('p')
    pSymbol.innerText = this.symbol
    this.html.append(pID, pSymbol)
    // we can append multiple elements at the same time
    this.html.addEventListener("mouseenter", this.handleMouseEnter.bind(this))
    atomicElementsContainer.append(this.html)
  }

  // EVENT HANDLERS //

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

  // GETTERS //

  get atomicNumber() {
    return this.id
  }

}

AtomicElement.fetchElements()
categorySelector.addEventListener("change", event => AtomicElement.filterByCategory(event.target.value))
