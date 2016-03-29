import {div, button, input} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

import {record, logAnimation} from '../visualization';

function resultText (result) {
  return `${result.stargazers_count} * - ${result.full_name}`;
}

function view (time, searchLog, results, responseLog, inputLog, resultsLog) {
  const text = `
  A cooler example
  ===

  What about a more complex example? What about HTTP?

    HTTP (res): ${logAnimation(time, responseLog)}
    Input:      ${logAnimation(time, inputLog)}
                     V
                     |
                     |      +---------------+
              Events +----> |               |
           HTTP responses   | main function |
             (sources)      |               | +-----+ DOM updates
                            +---------------+       | HTTP requests
                                                    |  (sinks)
                                                    V
    DOM:        ${logAnimation(time, resultsLog)}
    HTTP (req): ${logAnimation(time, searchLog)}
  `;

  const resultsText = `
    ${results.map(resultText).join('\n    ')}
  `;

  return (
    div('.wrapper', [
      md(text),

      `Search: `, input('.search-github'),

      md(resultsText)
    ])
  );
}

function searchGithub (query) {
  return `https://api.github.com/search/repositories?q=${query}`;
}

function parseResults (response) {
  return response.items.slice(0, 10);
}

export default function ({DOM, Animation, HTTP}) {
  const time$ = Animation
    .pluck('timestamp');

  const inputSearch$ = DOM
    .select('.search-github')
    .events('input')
    .map((event) => event.target.value);

  const clearResults$ = inputSearch$
    .filter(query => query === '')
    .map(() => []);

  const search$ = inputSearch$
    .filter(query => query !== '')
    .debounce(400);

  const response$ = HTTP
    .flatMap((response$) =>
      response$
        .map(response => response.body)
        .catch(() => Observable.just({error: 'Rate limit exceeded', items: []}))
    );

  const searchResult$ = response$
    .map(parseResults)
    .startWith([])
    .merge(clearResults$);

  const inputLog$ = record(inputSearch$, time$);
  const searchLog$ = record(search$, time$);
  const responseLog$ = record(response$, time$);
  const resultLog$ = record(searchResult$, time$);

  return {
    DOM: time$.withLatestFrom(searchLog$, searchResult$, responseLog$, inputLog$, resultLog$, view),
    HTTP: search$.map(searchGithub)
  };
}
