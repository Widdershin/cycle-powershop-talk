import {div, button} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

const text = `
Today, we'll be talking about optimizing loops.
---
`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(
      md(text)
    )
  };
}
