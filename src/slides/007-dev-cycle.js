
import {div, button} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

const text = `
A different kind of loop.
===

The process of creating software is a loop.

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

We write software in incremental steps. The faster we take each step the faster we can move.

`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(
      md(text)
    )
  };
}
