'use strict';

import test from 'tape';
import Resize from './index';

test('resize emits event', function(t) {
  t.plan(2);

  let resize = new Resize(),
      i = 0;

  resize.on('resize:start', () => {
    t.pass('resize:start dispatched');
  });

  resize.on('resize:end', () => {
    t.pass('resize:end dispatched');
  });

  setTimeout(function tick() {
    if (++i < 20) {
      if (document.createEvent) {
        var ev = document.createEvent('Event');
        ev.initEvent('resize', true, true);
        window.dispatchEvent(ev);
      } else {
        document.fireEvent('onresize');
      }

      setTimeout(tick, 10);
    }
  }, 10);
});
