import {div, button} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

const text = `
Programming is all about feedback loops
---

A typical development cycle for the browser might look something like this:


                     +-------------+
                     |             |
          +--------->+ Change code +-----------+
          |          |             |           |
          |          +-------------+           |
          |                                    v
    +-------------+                    +----------------+
    |             |                    |                |
    | See results |                    | Reload browser |
    |             |                    |                |
    +-------------+                    +----------------+
          |                                    |
          |          +--------------+          |
          |          |              |          |
          +----------+ Test changes +<---------+
                     |              |
                     +--------------+

`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(md(text))
  };
}
