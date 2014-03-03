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


  // Native Trellis
  module('Trellis', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('throws an error when the element passed in is not a string', function(){
    expect(1);

    throws(function(){
      Trellis();
    }, /Element must be a valid css selector as a string./, 'error thrown.');
  });

  test('throws an error when the element passed in is not found in the DOM', function(){
    expect(1);

    throws(function(){
      Trellis('#notInDOM');
    }, /The element passed in was not found in the DOM./, 'error thrown.');
  });


}(jQuery));
