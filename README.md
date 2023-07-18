# Pair Programming Challenge - Periodic Table of Elements

Your task today is to complete a digital periodic table of elements. Some code has already been constructed however the table itself is blank and needs to be filled in with data. Notably, you and your partner(s) will be using OOJS and class syntax to track and fill in each atomic element.

The idea is you'll use a class that automatically tracks a corresponding html element and manipulates it as need be. Since this is the case, handle as much of the DOM manipulation through the class itself as you can.

## Getting Started

Fork and clone the repository. Take some time to look through and understand the code that's already been written. Once you're ready, start a new server with `json-server --watch db.json` and open the `index.html` file with your favorite browser.

## Display All Elements

First, fetch the data from `db.json` which should return an array of objects. For each of these objects, you should:

- Creates a new `div` with a class of `atomic-element-card`. This card displays the element's `id` number (technically it's atomic number) and its `symbol` in a pair of `p` tags nested inside the `div`. This `div` gets appended to the `atomic-elements-container`.

- Example of the above:

```
<div class="atomic-element-card">
  <p>1</p>
  <p>H</p>
</div>
```

## Hover Over Element

When someone hovers their mouse over an `atomic-element-card`, it shows all the details for that element in the `div#atomic-element-details`. For `electrons per shell` it's alright to change the array to a string and just display that (don't overthink it).

## BONUS - Filter Elements By Type

When someone selects a category in the `#category-select` dropdown, all elements that aren't part of the category are hidden and only elements of the category are shown (so for example if `alkali-metals` is selected then only elements that are `alkali-metals` get shown).

If `all` is selected, show all the elements.

HINT: To make this work, you can change a card's style to `display: none` rather than deleting the card itself! There are also other ways to do this.

## BONUS - Sort Elements

When the element cards are created, find a way to sort the elements on the DOM so that they're in order of their atomic number (id).
