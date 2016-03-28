import {div, button} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

const text = `
Well that's pretty dandy.
---

There's one problem though. We still have to navigate back through the slides every time we change the code.

This is where **cycle-restart** comes in.

**cycle-restart** records all of the actions you perform (say, navigating through a slide deck), and plays them back when your code is reloaded.

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
