import {div} from '@cycle/core';
import md from '../md';
import {Observable} from 'rx';

const text = `
Conclusions
===

The tighter your feedback loop is, the faster you learn and the more quickly you develop.

Look for opportunities to tighten the loop!

Write deterministic applications, they're easier to test, debug, and write tools for.

`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(md(text))
  };
}
