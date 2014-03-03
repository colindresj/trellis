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

  var defaults, opts, container,
      containerWidth, colWidth, numCols,
      colsArray = [];

  defaults = {
    colSelector: '.trellis-col',
    margin: 10
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

    containerWidth = container.clientWidth;
    colWidth = document.querySelector(opts.colSelector).offsetWidth;

    numCols = Math.floor(containerWidth / colWidth);

    // Create placeholders in the colsArray
    for (i = numCols - 1; i >= 0; i--) {
      colsArray.push(opts.margin);
    }
  }

  function createCols(){
    var i, j, current, shortest,
        cols = document.querySelectorAll(opts.colSelector);

    for (i = 0; i < cols.length; i++) {
      current = cols[i];
      shortest = colsArray.min();
      j = colsArray.indexOf(shortest);

      current.style.left = j * (colWidth + opts.margin) + 'px';
      current.style.top = shortest + 'px';

      colsArray[j] += opts.margin + current.offsetHeight;
    }
  }

  function init(){
    setPlaceholders();
    createCols();
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

  Array.prototype.min = function() {
    return Math.min.apply(Math, this);
  };

  // Start the plugin
  init();

  return container;
}
