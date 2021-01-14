# Pair Programming Challenge - Periodic Table of Elements

Your task today is to complete a digital periodic table of elements. Some code has already been constructed however the table itself is blank and needs to be filled in with data. Notably, you and your partner(s) will be using OOJS and class syntax to track and fill in each atomic element.

The idea is you'll use a class that automatically tracks a corresponding html element and manipulates it as need be. Since this is the case, handle as much of the DOM manipulation through the class itself as you can.

## Getting Started

Fork and clone the repository. Take some time to look through and understand the code that's already been written. Once you're ready, start a new server with `json-server --watch db.json` and open the `index.html` file with your favorite browser.

## The AtomicElement Class

A class has already been created called `AtomicElement` which is intended to manage all the information for the html elements that'll get added.

First, fetch the data from `db.json` which should return an array of objects. For each of these objects, you should create a new `AtomicElement` passing in the object.

When an `AtomicElement` gets created, the constructor:

- Assigns all the same attributes as the original object (`id`, `name`, `symbol`, etc).

- Creates a new `div` with a class of `atomic-element-card`. This card displays the element's `id` number (technically it's atomic number) and its `symbol` in a pair of `p` tags nested inside the `div`. This `div` gets appended to the `atomic-elements-container`.

- Example of the above:

```
<div class="atomic-element-card">
  <p>1</p>
  <p>H</p>
</div>
```

- The previously created html element gets assigned to the class's `htmlElement` attribute: `this.htmlElement = someNewlyCreatedDivWeJustAppended`

- This `AtomicElement` gets pushed into the `AtomicElement.all` array (more detail below)

## Static Properties & Methods

The class needs a few 'class' or `static` properties. The first is that we need a way to keep track of all the AtomicElements created so we'll use a syntax we're already familiar with from Ruby:

```
static all = []
```

Inside the constructor, push the newly created 'instance' of an element into `all`. Remember that since this is a static property, it'll be `AtomicElements.all`.

Next you'll need a few different static getters for different attributes:

- You'll need a static method that returns the elements in order of their id's (they're currently very out of order). You should be able to call something similar to `AtomicElements.orderedList`.

- You'll need static getters that return the elements for each different category: `nobleGases, alkaliMetals, alkalineEarthMetals, transitionMetals, postTransitionMetals, metalloids, reactiveNonMetals, lanthanoids, actinoids, unknowns`. Ideally you should be able to call `AtomicElements.alkaliMetals` and get an array returned of all the elements that have a category of `alkali metals`.

## Additional Functionality

When someone selects an category in the dropdown, all elements that aren't of the category are hidden and elements of the category are shown. If `all` is selected, show all the elements. It's encouraged that you build this as a method inside the class.

When someone hovers their mouse over an `atomic-element-card`, it shows all the details for that element in the `div#atomic-element-details`. For `electrons per shell` it's alright to change the array to a string and just display that (don't overthink it).

## BONUS

Find a way to sort the elements on the DOM so that they're always in order of their atomic number (id).
