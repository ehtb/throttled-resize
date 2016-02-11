'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wolfy87Eventemitter = require('wolfy87-eventemitter');

var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resize = function (_eventEmitter) {
  _inherits(Resize, _eventEmitter);

  function Resize() {
    _classCallCheck(this, Resize);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Resize).call(this));

    _this.onResizeHandle = _this.onResize.bind(_this);

    window.addEventListener('resize', _this.onResizeHandle);
    window.addEventListener('orientationchange', _this.onResizeHandle);
    return _this;
  }

  _createClass(Resize, [{
    key: 'onResize',
    value: function onResize() {
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
          this.handle = window.requestAnimationFrame(tick.bind(this));
        }
      }.bind(this));
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      window.removeEventListener('resize', this.onResizeHandle);
      window.removeEventListener('orientationchange', this.onResizeHandle);

      this.removeAllListeners();
    }
  }]);

  return Resize;
}(_wolfy87Eventemitter2.default);

exports.default = Resize;
