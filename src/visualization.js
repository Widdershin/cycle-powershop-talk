import _ from 'lodash';

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
}

export {record, logAnimation};
