import {div, button} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

const text = `
Programming is all about feedback loops
---

This entire talk is about one simple idea:
The faster you can learn from your actions the more quickly you can improve.

Your everyday development cycle for the browser might look something like this:


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
