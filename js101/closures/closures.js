/**
 * @fileoverview closure examples.
 */

/**
 * EXAMPLE 1: basic and anonymous closures.
 */

/**
 * Basic closure that alters a variable and executes a callback.
 *
 * @param {string} thing
 *   The string to alter.
 * @param {function} callback
 *   The function to execute after the string is altered.
 */
var foo = function(thing, callback) {
  thing = 'unicorn';
  callback(bar);
};

/**
 * Basic closure that returns a string.
 *
 * @param {string} thing
 */
var foo2 = function(thing) {
  return "I'm a " + thing;
};

console.log(foo2('pony'));

/**
 * The callback for foo is an anonymous closure that's only
 * accessible when foo executes it.
 */
foo(bar, function closure(baz) {
  console.log(foo2(baz));
});

console.log('=============================');

/**
 * EXAMPLE 2: closure scope.
 */

/**
 * This closure creates an array of closures and executes them one
 * at a time.
 *
 * NOTE: variables values can be different from time of instantiation
 * to time of execution!
 */
var example = function() {
  var funcArray = {};
  var i = 0;

  // Define the functions.
  for (i = 0; i < 3; i++) {
    console.log('Inside: ' + i);
    funcArray[i] = function() {
      console.log('Outside: ' + i);
    };
  }

  // Execute the functions.
  funcArray[0]();
  funcArray[1]();
  funcArray[2]();
};

example();

