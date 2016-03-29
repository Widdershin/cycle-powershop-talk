import {run} from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';
import {makeAnimationDriver} from 'cycle-animation-driver';
import {restart, restartable} from 'cycle-restart';
import isolate from '@cycle/isolate';
import {Observable} from 'rx';
import keycode from 'keycode';
var app = require('./src/app').default;

function makeKeysDriver () {
  const keydown$ = Observable.fromEvent(document, 'keydown');

  function isKey (key) {
    if (typeof key !== 'number') {
      key = keycode(key);
    }

    return (event) => {
      return event.keyCode === key;
    };
  }

  return function keysDriver () {
    return {
      pressed: (key) => keydown$.filter(isKey(key))
    };
  };
}

const drivers = {
  DOM: restartable(makeDOMDriver('.app'), {pauseSinksWhileReplaying: false}),
  Keys: restartable(makeKeysDriver()),
  Animation: restartable(makeAnimationDriver())
};

const {sinks, sources} = run(app, drivers);

if (module.hot) {
  module.hot.accept('./src/app', () => {
    app = require('./src/app').default;

    restart(app, drivers, {sinks, sources}, isolate);
  });
}
