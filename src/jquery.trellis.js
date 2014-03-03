/*
 * jQuery.Trellis
 *
 *
 * Copyright (c) 2014 JC
 * Licensed under the MIT license.
 */

;(function($) {
  'use strict';

  // Collection method.
  $.fn.awesome = function () {
    return this.each(function (i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

}(jQuery));
