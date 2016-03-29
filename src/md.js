import {Observable} from 'rx';
import marked from 'marked';
import {div} from '@cycle/dom';
import {highlight} from 'highlight.js';

marked.setOptions({
  highlight: (code, lang) => lang && highlight(lang, code).value
});

export default function md (markdown) {
  return div('.markdown', {innerHTML: marked(markdown)});
}
