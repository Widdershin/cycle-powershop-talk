import {div, span, button, input} from '@cycle/dom';
import {Observable} from 'rx';

import md from '../md.js';

import {record, logAnimation, sparkle} from '../visualization';

import _ from 'lodash';

function linkify (githubRepo) {
  return `[${githubRepo}](https://github.com/${githubRepo})`;
}

function resultText (result) {
  return `| ★ ${_.padEnd(result.stargazers_count, 5, ' ')} | ${_.padEnd(linkify(result.full_name), 30)} |`;
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
              Events +----> | *   *   *  *  |
           HTTP responses   | main function |
             (sources)      |   *   *   *   | +-----+ DOM updates
                            +---------------+       | HTTP requests
                                                    |  (sinks)
                                                    V
    DOM:        ${logAnimation(time, resultsLog)}
    HTTP (req): ${logAnimation(time, searchLog)}
  `;

  const resultsText = `
    ${results.error}

  | Stars | Repo |
  |-------|------|
  ${results.items.map(resultText).join('\n')}
  `;

  return (
    div('.wrapper', [
      md(sparkle(text, time, inputLog, responseLog)),

      span([
        `Search Github: `,
        input('.search-github'),
      ]),

      md(resultsText, 'counter-diagram')
    ])
  );
}

function searchGithub (query) {
  return `https://api.github.com/search/repositories?q=${query}`;
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
    .map(() => ({items: [], error: ''}));

  const search$ = inputSearch$
    .filter(query => query !== '')
    .debounce(500)

  const response$ = HTTP
    .flatMap((response$) =>
      response$
        .map(response => ({items: response.body.items.slice(0, 5), error: ''}))
        .catch(() => Observable.just({error: 'Rate limit exceeded', items: []}))
    );

  const searchResult$ = response$
    .startWith({items: [], error: ''})
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
