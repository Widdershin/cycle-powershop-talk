
import {div, button} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

const text = `
What's the catch?
---

cycle-restart just works for a lot of applications.

Your application needs to be **deterministic**.

What does that mean?

Given the same input, your application should return the same output.
`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(md(text))
  };
}
