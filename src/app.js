import {div, button} from '@cycle/dom';
import isolate from '@cycle/isolate';

import {Observable} from 'rx';

const slides = [
  require('./slides/00-intro').default,
  require('./slides/01-feedback-loop').default,
  require('./slides/02-hot-reloading').default,
  require('./slides/03-cycle-restart').default
];

function view (slide, slideIndex) {
  return (
    div('.slides', [
      div('.slide', slide.DOM),

      div('.controls', [
        button('.previous', {disabled: slideIndex === 0}, 'Back'),
        `${slideIndex + 1} / ${slides.length}`,
        button('.next', {disabled: slideIndex === slides.length - 1}, 'Forward')
      ])
    ])
  );
}

const cachedSlides = {};

function slide (slideIndex, {DOM}) {
  if (slideIndex in cachedSlides) {
    return cachedSlides[slideIndex];
  }

  const fetchedSlide = isolate(slides[slideIndex])({DOM});

  cachedSlides[slideIndex] = fetchedSlide;

  return fetchedSlide;
}

function limit (result, boundingArray) {
  const min = 0;
  const max = boundingArray.length - 1;

  if (result < min) {
    return min;
  }

  if (result > max) {
    return max;
  }

  return result;
}

export default function App ({DOM, Keys}) {
  const clickNext$ = DOM
    .select('.next')
    .events('click')

  const pressRight$ = Keys
    .pressed('Right');

  const pressSpace$ = Keys
    .pressed('Space');

  const next$ = Observable.merge(
    clickNext$,
    pressRight$,
    pressSpace$
  ).map(ev => +1);

  const pressLeft$ = Keys
    .pressed('Left');

  const clickBack$ = DOM
    .select('.previous')
    .events('click');

  const previous$ = Observable.merge(
    clickBack$,
    pressLeft$
  ).map(ev => -1);

  const slideIndex$ = next$.merge(previous$)
    .startWith(0)
    .scan((total, change) => limit(total + change, slides));

  const slide$ = slideIndex$
    .map(slideIndex => slide(slideIndex, {DOM}));

  return {
    DOM: slide$.withLatestFrom(slideIndex$, view)
  };
}
