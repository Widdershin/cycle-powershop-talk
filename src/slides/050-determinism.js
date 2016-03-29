import {div, button} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

const text = `
Does that just work?
===

> It depends.

 *Michael Fowler, 2016*

What does it depend upon?

It depends upon your application returning the same output when provided with the same input.

Put technically, your application needs to work **deterministically**.


\`\`\`js
// deterministic
add(3, 4) // => 7
add(3, 4) // => 7

// non-deterministic
Math.random() // => 0.5743365696544249
Math.random() // => 0.7899047162464619
\`\`\`
`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(div('.title-slide', md(text)))
  };
}
