import {div, button} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

const text = `
Determinism
===



`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(md(text))
  };
}
