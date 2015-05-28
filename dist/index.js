'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _wolfy87Eventemitter = require('wolfy87-eventemitter');

var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var Resize = (function (_eventEmitter) {
  function Resize() {
    _classCallCheck(this, Resize);

    _get(Object.getPrototypeOf(Resize.prototype), 'constructor', this).call(this);

    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('orientationchange', this.onResize.bind(this));
  }

  _inherits(Resize, _eventEmitter);

  _createClass(Resize, [{
    key: 'onResize',
    value: function onResize() {
      if (!this.started) {
        this.started = true;
        this.times = 0;

        this.emitEvent('resize:start');
      }

      if (this.handle !== undefined) {
        this.times = 0;

        _raf2['default'].cancel(this.handle);
      }

      this.handle = (0, _raf2['default'])((function tick() {
        if (++this.times === 10) {
          this.handle = undefined;
          this.started = false;
          this.times = 0;

          this.emitEvent('resize:end');
        } else {
          this.handle = (0, _raf2['default'])(tick.bind(this));
        }
      }).bind(this));
    }
  }]);

  return Resize;
})(_wolfy87Eventemitter2['default']);

exports['default'] = Resize;
module.exports = exports['default'];
