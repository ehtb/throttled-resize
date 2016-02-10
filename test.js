'use strict';

import test from 'tape';
import Resize from './index';

const resize = new Resize();

test('resize emits event', function(t) {
  t.plan(1);

  let
    called = 0,
    i = 0;

  resize.on(
    'resize:start', () => {
      called++;
    }
  );

  resize.on(
    'resize:end', () => {
      called++;
    }
  );

  setTimeout(function tick() {
    if (++i < 10) {
      fire();
      setTimeout(tick, 10);
    } else {
      setTimeout(() => {
        t.equal(called, 2);
        t.end();
      }, 500);
    }
  }, 10);
});

test('destroy', function(t) {
  t.plan(0);

  resize.on(
    'resize:end', () => t.fail('resize:end wrongly dispatched')
  );

  resize.destroy();

  fire();

  t.end();
});

function fire() {
  if (document.createEvent) {
    var ev = document.createEvent('Event');
    ev.initEvent('resize', true, true);
    window.dispatchEvent(ev);
  } else {
    document.fireEvent('onresize');
  }
}
