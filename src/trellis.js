function Trellis(container, config) {
  'use strict';

  var defaults, opts, containerWidth,
      spaceLeft, colWidth, numCols, colsArray;

  defaults = {
    colSelector: '.trellis-col',
    gutter: 10,
    keepCentered: true,
    afterInit: function() {}
  };

  opts = _extend({}, defaults, config || {});

  // Error if no element or selector passed in or passed incorrectly
  if (!container) throw new Error('No HTML element or selector specified');

  // Allow css selector instead of HTML element,
  // but error if selector passed incorrectly
  if (typeof container === 'string')  {
    if ( !document.querySelector(container) ) throw new Error('No HTML element found using the passed in selector: ' + container);
    container = document.querySelector(container);
  } else {
    if ( !_isElement(container) ) throw new Error(container + ' is not an HTML element');
  }

  function setPlaceholders() {
    var i;

    // Remove any padding that might be on the container
    if (container.style.padding) container.style.padding = '';

    // Reset the colsArray
    colsArray = [];

    containerWidth = container.clientWidth;
    colWidth = document.querySelector(opts.colSelector).offsetWidth;

    numCols = Math.floor(containerWidth / colWidth);

    if (opts.keepCentered) {
      spaceLeft = (containerWidth - ( (colWidth * numCols) + (opts.gutter * (numCols - 1)) )) / 2;
    }

    // Create placeholders in the colsArray
    for (i = numCols - 1; i >= 0; i--) {
      colsArray.push(opts.gutter);
    }
  }

  function createCols() {
    var i, j, current, shortest,
        cols = document.querySelectorAll(opts.colSelector);

    // Add the appropriate left position according to
    // the num of items in colsArray and top position
    // according to the shortest available column
    for (i = cols.length -1; i >=0; i--) {
      current = cols[i];
      shortest = _arrayMin(colsArray);
      j = colsArray.indexOf(shortest);

      current.style.top = shortest + 'px';
      current.style.left = opts.keepCentered ?
                           ( j * (colWidth + opts.gutter) ) + spaceLeft + 'px' :
                           j * (colWidth + opts.gutter) + 'px';

      colsArray[j] += opts.gutter + current.offsetHeight;
    }
  }

  function handleResize() {
    setPlaceholders();
    createCols();
  }

  function init() {
    handleResize();

    window.addEventListener('resize', handleResize);
  }

  function destroy() {
    window.removeEventListener('resize', handleResize);
  }

  function _extend() {
    var args, target, i, key, current;

    args = Array.prototype.slice.call(arguments, 0);
    target = args.shift();

    for (i = 0; i < args.length; i++) {
      current = args[i];
      for (key in current) {
        if ( current[key] && current.hasOwnProperty(key) ) {
          target[key] = current[key];
        }
      }
    }
    return target;
  }

  function _isElement(el) {
    if (typeof HTMLElement === 'object') {
      return el instanceof HTMLElement;
    } else {
      return el && typeof el === 'object' && el !== null && el !== undefined && el.nodeType && el.nodeType === 1;
    }
  }

  function _isFunction(functionToCheck) {
    return functionToCheck && Object.prototype.toString.call(functionToCheck) === '[object Function]';
  }

  function _arrayMin(arr) {
    return Math.min.apply(Math, arr);
  }

  // Start the plugin
  init();

  // Check for an afterInit hook and invoke
  if ( _isFunction(opts.afterInit) ) {
    opts.afterInit.call(window, container, destroy);
  }

  return container;
}

// Make available as jQuery/Zepto plugin
if (window && (window.jQuery || window.Zepto)) {
  (function($) {
    'use strict';
    $.fn.trellis = function(options) {
      return $( new Trellis(this.get(0), options) );
    };
  })(window.jQuery || window.Zepto);
}
