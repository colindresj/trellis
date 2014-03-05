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
      this.$el = $('#qunit-fixture').children();
    }
  });

  test('throws an error when no element or selector is passed in', function(){
    expect(1);

    throws(function(){
      Trellis();
    }, /No HTML element or selector specified/, 'should throw error.');
  });

  test('throws an error when no HTML element found with valid selector passed in', function(){
    expect(1);

    throws(function(){
      Trellis('#notInDOM');
    }, /No HTML element found using the passed in selector/, 'should throw error.');
  });

  test('throws an error when the object passed in is not an HTML element', function(){
    expect(1);

    throws(function(){
      Trellis({});
    }, /is not an HTML element/, 'should throw error.');
  });

  test('is chainable', function() {
    expect(1);

    strictEqual( Trellis( this.$el[0] ), this.$el[0], 'should be chainable');
  });

  module('Trellis#createCols', {
    setup: function() {
      this.$el = $('#qunit-fixture').children();
      Trellis( '.' + this.$el.attr('class') );
    }
  });

  test('sets a top and left style to each column item', function(){
    expect(3);

    ok(!!$('.trellis-col').attr('style'), 'should set an inline style');
    strictEqual( $('.trellis-col')[0].style.top, '10px', 'should set a top style' );
    strictEqual( $('.trellis-col')[0].style.left, '0px', 'should set a left style' );
  });

  module('jQuery.trellis', {
    setup: function() {
      this.$el = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function() {
    expect(1);

    equal( this.$el.trellis()[0], this.$el[0], 'should be chainable' );
  });


}(jQuery));
