import {div, button} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

const text = `
So how do we optimize the loop?
===

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

So how do we go faster?

Simple: remove the slow bits.
`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(md(text))
  };
}
