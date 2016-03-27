import {div, button} from '@cycle/dom';
import isolate from '@cycle/isolate';

import {Observable} from 'rx';

const slides = [
  require('./slides/00-intro.js').default,
  require('./slides/01-feedback-loop.js').default,
  require('./slides/02-hot-reloading').default
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

function slide(slideIndex, {DOM}) {
  if (slideIndex in cachedSlides) {
    console.log('cache hit for', slideIndex);
    return cachedSlides[slideIndex];
  }

  console.log('cache miss for', slideIndex);
  const fetchedSlide = isolate(slides[slideIndex])({DOM});

  cachedSlides[slideIndex] = fetchedSlide;

  return fetchedSlide;
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
    .map(slideIndex => slide(slideIndex, {DOM}));

  return {
    DOM: slide$.withLatestFrom(slideIndex$, view)
  };
}
