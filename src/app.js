import {div, button} from '@cycle/dom';
import isolate from '@cycle/isolate';

import {Observable} from 'rx';

const slides = [
  function ({DOM}) {
    return {
      DOM: Observable.just(div('.hello', 'Hello world!'))
    };
  },

  function ({DOM}) {
    return {
      DOM: Observable.just(div('.hello', 'Wow such'))
    };
  }
];

function view (slide, slideIndex) {
  return (
    div('.slides', [
      div('.controls', [
        button('.previous', {disabled: slideIndex === 0}, 'Back'),
        slideIndex.toString(),
        button('.next', {disabled: slideIndex === slides.length - 1}, 'Forward')
      ]),

      slide.DOM
    ])
  );
}

export default function App ({DOM}) {
  const next$ = DOM
    .select('.next')
    .events('click')
    .map(ev => +1);

  const previous$ = DOM
    .select('.previous')
    .events('click')
    .map(ev => -1);

  const slideIndex$ = next$.merge(previous$)
    .startWith(0)
    .scan((total, change) => total + change);

  const slide$ = slideIndex$
    .map(slideIndex => isolate(slides[slideIndex])({DOM}));

  return {
    DOM: slide$.withLatestFrom(slideIndex$, view)
  };
}
