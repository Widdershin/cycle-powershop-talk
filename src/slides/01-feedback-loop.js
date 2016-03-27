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
          +-------------->+ Change code +--------------+
          |               |             |              |
          |               +-------------+              |
          |                                            |
          |                                            |
          |                                            |
          |                                            v
    +-------------+                            +----------------+
    |             |                            |                |
    | See results |                            | Reload browser |
    |             |                            |                |
    +-------------+                            +----------------+
          ^                                            |
          |                                            |
          |               +--------------+             |
          |               |              |             |
          +---------------+ Test changes +<------------+
                          |              |
                          +--------------+

`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(md(text))
  };
}
