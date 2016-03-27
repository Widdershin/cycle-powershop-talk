import {div, button} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

const text = `
Back to the Future
===

Hot reloading and Time Travel with Cycle.js
---
`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(
      md(text)
    )
  };
}
