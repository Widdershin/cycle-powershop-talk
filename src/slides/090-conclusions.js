import {div} from '@cycle/core';
import md from '../md';
import {Observable} from 'rx';

const text = `
The shorter your feedback loop, the better.
===
`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(md(text))
  };
}
