import {div, button} from '@cycle/dom';
import isolate from '@cycle/isolate';

import {Observable} from 'rx';

const slides = [
  require('./slides/000-intro').default,
  require('./slides/005-the-plan').default,
  require('./slides/007-dev-cycle').default,
  require('./slides/010-feedback-loop').default,
  require('./slides/020-hot-reloading').default,
  require('./slides/030-cycle-restart').default,
  require('./slides/040-whats-the-catch').default,
  require('./slides/045-counter').default,
  require('./slides/050-determinism').default,

  require('./slides/090-conclusions').default,
  require('./slides/099-questions').default
];

function view (slide, slideIndex) {
  return (
    div('.slides', [
      div('.slide', slide.DOM),

      div('.controls', [
        button('.previous', {disabled: slideIndex === 0}, 'Back'),
        `${slideIndex + 1} / ${slides.length}`,
        button('.next', {disabled: slideIndex === slides.length - 1}, 'Next')
      ])
    ])
  );
}

const cachedSlides = {};

function slide (slideIndex, sources) {
  if (slideIndex in cachedSlides) {
    return cachedSlides[slideIndex];
  }

  const fetchedSlide = isolate(slides[slideIndex])(sources);

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

export default function App (sources) {
  const {DOM, Keys} = sources;

  const clickNext$ = DOM
    .select('.next')
    .events('click');

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
    .map(slideIndex => slide(slideIndex, sources));

  return {
    DOM: slide$.withLatestFrom(slideIndex$, view)
  };
}
