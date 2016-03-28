import {div, button} from '@cycle/dom';
import {Observable} from 'rx';
import _ from 'lodash';

import md from '../md.js';

const text = `
Let's play.
---
`;

function view (count) {
  return (
    div('.wrapper', [
      md(text),
      div('.counter', [
        div('.count', `Count: ${count}`),
        button('.subtract', 'Subtract'),
        button('.add', 'Add')
      ])
    ])
  );
}

export default function ({DOM}) {
  const add$ = DOM
    .select('.add')
    .events('click')
    .map(() => +1);

  const subtract$ = DOM
    .select('.subtract')
    .events('click')
    .map(() => -1);

  const count$ = add$.merge(subtract$)
    .startWith(0)
    .scan((total, change) => total + change);

  return {
    DOM: count$.map(view)
  };
}
