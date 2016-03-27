import {Observable} from 'rx';
import marked from 'marked';
import {div} from '@cycle/dom';

export default function md (markdown) {
  return div('.markdown', {innerHTML: marked(markdown)});
}
