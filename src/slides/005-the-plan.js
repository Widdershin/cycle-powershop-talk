import {div, button} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

const text = `
The plan.
===

Today, we'll be talking about optimizing loops.
`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(
      div('.title-slide', md(text))
    )
  };
}
