(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('Trellis', {
    // This will run before each test in this module.
    setup: function() {
      this.el = $('#qunit-fixture').children();
    }
  });

  test('throws an error when the element selector passed in is not a string', function(){
    expect(1);

    throws(function(){
      Trellis();
    }, /Element must be a valid css selector as a string./, 'should throw error.');
  });

  test('throws an error when the element passed in is not found in the DOM', function(){
    expect(1);

    throws(function(){
      Trellis('#notInDOM');
    }, /The element passed in was not found in the DOM./, 'should throw error.');
  });

  test('is chainable', function() {
    expect(1);

    strictEqual( Trellis('.' + this.el.attr('class') ), this.el[0], 'should be chainable');
  });

  module('Trellis#createCols', {
    setup: function() {
      this.el = $('#qunit-fixture').children();
      Trellis( '.' + this.el.attr('class') );
    }
  });

  test('sets a top and left style to each column item', function(){
    expect(3);

    ok(!!$('.trellis-col').attr('style'), 'should set an inline style');
    strictEqual( $('.trellis-col')[0].style.top, '10px', 'should set a top style' );
    strictEqual( $('.trellis-col')[0].style.left, '0px', 'should set a left style' );
  });


}(jQuery));
