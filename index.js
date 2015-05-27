'use strict';

import eventEmitter from 'wolfy87-eventemitter';
import raf from 'raf';

export default class Resize extends eventEmitter {
  handle: int;
  started: boolean;
  times: int;

  constructor() {
    super();

    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('orientationchange', this.onResize.bind(this));
  }

  onResize() {
    if (!this.started) {
      this.started = true;
      this.times = 0;

      this.emitEvent('resize:start');
    }

    if (this.handle !== undefined) {
      this.times = 0;

      raf.cancel(this.handle);
    }

    this.handle = raf(function tick() {
      if (++this.times === 10) {
        this.handle = undefined;
        this.started = false;
        this.times = 0;

        this.emitEvent('resize:end');
      } else {
        this.handle = raf(tick.bind(this));
      }
    }.bind(this));
  }
}
