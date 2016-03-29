import {div, button} from '@cycle/dom';
import {Observable} from 'rx';
import _ from 'lodash';

import md from '../md.js';

function record (stream, time$) {
  return stream
    .withLatestFrom(time$, (value, timestamp) => ({value, timestamp}))
    .startWith([])
    .scan((events, event) => [...events, event]);
}

function logAnimation (time, log) {
  const width = 50;
  const chars = _.times(width).map(() => '-');

  log.forEach(entry => {
    const timeAgo = time - entry.timestamp;

    const logDisplayPosition = Math.ceil(width - 1 - timeAgo * 0.005);

    if (logDisplayPosition >= 0) {
      chars[logDisplayPosition] = 'x';
    }
  });

  return chars.join('');
};

function view (time, count, addLog, subtractLog, domLog) {
  const text = `
  An example.
  ===

  Cycle.js apps are built on top of Observables (aka streams).

  An Observable represents a stream of future values. For example, events generated by clicking on a button can be considered a stream. Or changes to the DOM over time.

                              <-- time -->
    Add:      ${logAnimation(time, addLog)}
    Subtract: ${logAnimation(time, subtractLog)}
                    V
                    |       +---------------+
             Events +-----> |               |
            (sources)       |               |
                            | main function |
                            |               |
                            |               | +-----+ DOM updates
                            +---------------+       |   (sinks)
                                                    V
    DOM:      ${logAnimation(time, domLog)}
  `;

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


export default function Counter ({DOM, Animation}) {
  const time$ = Animation
    .pluck('timestamp');

  const add$ = DOM
    .select('.add')
    .events('click')
    .map(() => +1);

  const subtract$ = DOM
    .select('.subtract')
    .events('click')
    .map(() => -1);

  const addLog$ = record(add$, time$);
  const subtractLog$ = record(subtract$, time$);

  const count$ = add$.merge(subtract$)
    .startWith(0)
    .scan((total, change) => total + change);

  const domLog$ = record(count$, time$);

  return {
    DOM: time$.withLatestFrom(count$, addLog$, subtractLog$, domLog$, view)
  };
}
