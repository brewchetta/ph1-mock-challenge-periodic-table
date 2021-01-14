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

  static fetchElements() {
    fetch(URL).then(parseJSON)
    // I've chosen to sort the data as it comes in so I won't have to worry about it later
    .then(data => {
      data
      .sort(sortById)
      .forEach(el => new AtomicElement(el))
    })
  }

  static filterByCategory(category) {
    this.all.forEach(el => {
      // it would also be easy to make this a ternary, I'm just using an if / else for clarity
      if (el.category === category || category === "all") {
        el.html.style.display = "block"
      } else {
        el.html.style.display = "none"
      }
    })
  }

  // CONSTRUCTOR //

  constructor(obj) {
    // There's a way to do mass assignment however I've chosen this solution for clarity
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
    atomicElementsContainer.append(this.html)

    // by binding the callback, we're able to directly reference the class object
    this.html.addEventListener("mouseenter", this.handleMouseEnter.bind(this))
  }

  // EVENT HANDLERS //

  handleMouseEnter(event) {
    // normally `this` would be the element that triggered the object but we've bound it to the class object instead
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

// Once our class has been created, we fetch the elements and add an event listener to the category selector
AtomicElement.fetchElements()
categorySelector.addEventListener("change", event => AtomicElement.filterByCategory(event.target.value))
