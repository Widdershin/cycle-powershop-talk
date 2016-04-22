import {div} from '@cycle/core';
import md from '../md';
import {Observable} from 'rx';

const text = `
A more important problem...
===
`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(md(text))
  };
}
