import {div, button} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

const text = `
Well that's pretty dandy.
===

There's still one problem though. We still have to navigate back through the slides every time we change the code.

This is where **cycle-restart** comes in.

We can use **cycle-restart** to automatically replay the events we've performed when the code changes.

    +-------------+
    |             |
    | See results +--------------+
    |             |              |
    +-------------+              |
          ^                      v
          |              +-------------+
          |              |             |
          +--------------+ Change code |
                         |             |
                         +-------------+
`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(md(text))
  };
}
