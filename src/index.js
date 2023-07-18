// Global Constants //

const PORT = 3000
const URL = `http://localhost:${PORT}/elements`

const atomicElementDetails = document.querySelector('#atomic-element-details')
const atomicElementsContainer = document.querySelector('#atomic-elements-container')
const categorySelector = document.querySelector('#category-select')


function createCards( elementsArray ) {
  console.log( elementsArray )
  elementsArray.forEach( elementObject => createElementCard(elementObject) )
}


function createElementCard( elementObject ) {
  const card = document.createElement( 'div' )
  // card.className = 'atomic-element-card' <--- this will just add the normal class name
  card.className = `atomic-element-card ${elementObject.category}` // <--- for the SUPER BONUS

  const idParagraph = document.createElement( 'p' )
  idParagraph.textContent = elementObject.id

  const symbolParagraph = document.createElement( 'p' )
  symbolParagraph.textContent = elementObject.symbol

  card.append( idParagraph, symbolParagraph )
  atomicElementsContainer.append( card )

  card.addEventListener('mouseover', () => displayElementDetails( elementObject ))
}


function displayElementDetails( elementObject ) {
  const numberP = atomicElementDetails.children[1]
  numberP.textContent = elementObject.id
  const nameP = atomicElementDetails.children[2]
  nameP.textContent = elementObject.name
  const symbolP = atomicElementDetails.children[3]
  symbolP.textContent = elementObject.symbol
  const categoryP = atomicElementDetails.children[4]
  categoryP.textContent = elementObject.category
  const atomicWeightP = atomicElementDetails.children[5]
  atomicWeightP.textContent = elementObject.atomicWeight
  const electronsP = atomicElementDetails.children[6]
  electronsP.textContent = elementObject.electronsPerShell
}


fetch(URL)
  .then( res => res.json() )
  .then( data => {
    data.sort( (a,b) => a.id - b.id ) // <--- all we need for the BONUS
    createCards(data)
  })


// SUPER BONUS //

function handleChangeCategory() {
  const cards = document.querySelectorAll( '.atomic-element-card' ) // <--- get all cards

  const category = categorySelector.value // <--- get category value as a string

  cards.forEach( cardElement => {
    if ( category === 'all' || cardElement.className.includes(category) ) {
      cardElement.style.display = '' // <--- this resets its style to default
    } else {
      cardElement.style.display = 'none'
    }
  })
}

categorySelector.addEventListener( 'change', handleChangeCategory )
