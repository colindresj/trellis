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

  var defaults, opts, containerWidth, colWidth, numCols, colsArray = [];

  defaults = {
    colSelector: 'trellis-col'
  };

  opts = _extend({}, defaults, config);

  // Quit early if no element passed in
  // or element passed in incorrectly
  if ( !element || typeof element !== 'string' ) throw new Error('Element must be a valid css selector as a string.');

  // Quit early if no DOM element present
  if ( !document.querySelector(element) ) throw new Error('The element passed in was not found in the DOM.');

  function setPlaceholders(){
    var i;

    // Remove any padding that might be on the container
    if (element.style.padding) element.style.padding = '';

    containerWidth = element.clientwidth;
    colWidth = opts.colSelector.offsetWidth;

    numCols = Math.floor(containerWidth / colWidth);

    // Create placeholders in the colsArray
    for (i = numCols - 1; i >= 0; i--) {
      colsArray.push(null);
    }
  }

  function _extend() {
    var args, target, i, key;

    args = Array.prototype.slice.call(arguments, 0);
    target = args.shift();

    for (i = 1; i < args.length; i++) {
      for (key in args[i]) {
        if (args[i].hasOwnProperty(key)) {
          target[key] = args[i][key];
        }
      }
    }

    return target;
  }

}
