/*
 * Trellis
 *
 *
 * Copyright (c) 2014 JC
 * Licensed under the MIT license.
 */

/*jshint unused: false */
function Trellis(element, config){
  'use strict';

  var defaults, opts, container, containerWidth,
      spaceLeft, colWidth, numCols, colsArray;

  defaults = {
    colSelector: '.trellis-col',
    gutter: 10,
    keepCentered: true
  };

  opts = _extend({}, defaults, config || {});

  // Quit early if no element passed in
  // or element passed in incorrectly
  if ( !element || typeof element !== 'string' ) throw new Error('Element must be a valid css selector as a string.');

  // Quit early if no DOM element present
  if ( !document.querySelector(element) ) throw new Error('The element passed in was not found in the DOM.');

  container = document.querySelector(element);

  function setPlaceholders(){
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

  function createCols(){
    var i, j, current, shortest,
        cols = document.querySelectorAll(opts.colSelector);

    // Add the appropriate left position according to
    // the num of items in colsArray and top position
    // according to the shortest available column
    for (i = cols.length -1; i >=0; i--) {
      current = cols[i];
      shortest = colsArray.min();
      j = colsArray.indexOf(shortest);

      current.style.top = shortest + 'px';
      current.style.left = opts.keepCentered ?
                           ( j * (colWidth + opts.gutter) ) + spaceLeft + 'px' :
                           j * (colWidth + opts.gutter) + 'px';

      colsArray[j] += opts.gutter + current.offsetHeight;
    }
  }

  function init(){
    setPlaceholders();
    createCols();

    window.addEventListener('resize', function(){
      setPlaceholders();
      createCols();
    });
  }

  function _extend() {
    var args, target, i, key, current;

    args = Array.prototype.slice.call(arguments, 0);
    target = args.shift();

    for (i = args.length - 1; i >= 0; i--) {
      current = args[i];
      for (key in current) {
        if ( current.hasOwnProperty(key) ) {
          target[key] = current[key];
        }
      }
    }
    return target;
  }

  Array.prototype.indexOf = Array.prototype.indexOf || function(searchEl, fromIndex){
    var length = this.length,
        i = (typeof fromIndex === "undefined" ? 0 : (fromIndex < 0 ? length + fromIndex : fromIndex)),
        foundIndex = -1;

    for (i; i < length; ++i) {
      if (this[i] === searchEl) {
        foundIndex = i;
        break;
      }
    }

    return foundIndex;
  };

  Array.prototype.min = function() {
    return Math.min.apply(Math, this);
  };

  // Start the plugin
  init();

  return container;
}
