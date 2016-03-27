import {div, button} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

const text = `
Programming is all about feedback loops
---

The faster you can see the results of your actions the faster you can improve.

A normal browser development cycle looks something like this (assuming you're not doing TDD).


                          +-------------+
                          |             |
          +-------------->k+ Change code +-----------------+
          |               |             |                 |
          |               +-------------+                 |
          |                                               |
          |                                               |
          |                                               |
          |                                               v
    +-------------+                               +----------------+
    |             |                               |                |
    | See results |                               | Reload browser |
    |             |                               |                |
    +-------------+                               +----------------+
          ^                                               |
          |                                               |
          |               +--------------+                |
          |               |              |                |
          +---------------+ Test changes +<---------------+
                          |              |
                          +--------------+

`;

function view (count) {
  return (
    div('.counter', [
      div('.count', `Count: ${count}`),
      button('.subtract', 'Subtract'),
      button('.add', 'Add')
    ])
  );
}

export default function ({DOM}) {
  const add$ = DOM
    .select('.add')
    .events('click')
    .map(ev => +1);

  const subtract$ = DOM
    .select('.subtract')
    .events('click')
    .map(ev => -1);

  const count$ = add$.merge(subtract$)
    .startWith(0)
    .scan((total, change) => total + change)

  return {
    DOM: count$.map((count) => (
      div('.wrapper', [
        md(text),
        view(count)
      ])
    ))
  };
}
