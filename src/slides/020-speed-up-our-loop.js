import {div, button} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

const text = `
How can we speed our loop up?
===
So how do we go faster? Simple: remove the slow bits.

Instead of reloading the browser, we can use **hot reloading** to update the code automagically!

                          +-------------+
                          |             |
          +-------------->+ Change code |
          |               |             |
          |               +-------------+
          |                      |
    +-------------+              |
    |             |              |
    | See results |              |
    |             |              |
    +-------------+              |
          ^                      v
          |              +--------------+
          |              |              |
          +--------------+ Test changes |
                         |              |
                         +--------------+

`;

export default function slide ({DOM}) {
  return {
    DOM: Observable.just(md(text))
  }
};

