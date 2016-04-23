import {div} from '@cycle/dom';
import md from '../md';
import {Observable} from 'rx';

const text = `
Presented by Nick Johnstone
===

Github: Widdershin  
Twitter: @widdnz

![dinosaw](https://avatars2.githubusercontent.com/u/398365?v=3&s=250)
`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(div('.about-me', md(text)))
  };
}
