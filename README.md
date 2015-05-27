# throttled-resize

ES6 throttled browser resize event dispatcher based on requestAnimationFrame.

```js
import Resize from 'throttled-resize';

let resize = new Resize();

resize.on('resize:start', fn);

resize.on('resize:end', fn);

```

# Browser Support

[![Browser Support](http://ci.testling.com/ehtb/throttled-resize.png)](http://ci.testling.com/ehtb/throttled-resize)
