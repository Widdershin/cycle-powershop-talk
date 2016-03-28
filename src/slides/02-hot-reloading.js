import {div, button} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

const text = `
How can we speed our loop up?
---

Instead of reloading the browser, we can use **hot reloading** to update the code automagically!

Hot reloading runs on the server, watches for code changes, and then emits updates to the browser via websocket.

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

