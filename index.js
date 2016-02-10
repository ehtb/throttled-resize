'use strict';

import eventEmitter from 'wolfy87-eventemitter';

export default class Resize extends eventEmitter {
  constructor() {
    super();

    this.onResizeHandle = this.onResize.bind(this);

    window.addEventListener('resize', this.onResizeHandle);
    window.addEventListener('orientationchange', this.onResizeHandle);
  }

  onResize() {
    if (!this.started) {
      this.started = true;
      this.times = 0;

      this.emitEvent('resize:start');
    }

    if (this.handle != null) {
      this.times = 0;

      window.cancelAnimationFrame(this.handle);
    }

    this.handle = window.requestAnimationFrame(function tick() {
      if (++this.times === 10) {
        this.handle = null;
        this.started = false;
        this.times = 0;

        this.emitEvent('resize:end');
      } else {
        this.handle = window.requestAnimationFrame(
          tick.bind(this)
        );
      }
    }.bind(this));
  }

  destroy() {
    window.removeEventListener('resize', this.onResizeHandle);
    window.removeEventListener('orientationchange', this.onResizeHandle);

    this.removeAllListeners();
  }
}
