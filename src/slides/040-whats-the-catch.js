import {Observable} from 'rx';

import md from '../md.js';

const text = `
How does it work?
===

@staltz once asked "what if the user was a function?".

                    +---------------+
     Events +-----> |               |
    (sources)       |               |
                    | main function |
                    |               |
                    |               | +-----> DOM updates
                    +---------------+           (sinks)

**cycle-restart** works by recording the input to your \`main\` function.

When **hot-reloading** updates the code, **cycle-restart** is called and the recorded events are replayed with the new code.

`;

export default function ({DOM}) {
  return {
    DOM: Observable.just(md(text))
  };
}
