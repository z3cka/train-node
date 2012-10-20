/**
 * @fileoverview closure examples.
 */

console.log('Example 1:');
/**
 * EXAMPLE 1: Not a Closure.
 */
var foo = function foo(x) {
  var tmp = 3;
  function bar(y) {
    console.log(x + y + (++tmp));
  }
  bar(10);
};
foo(2);
foo(2);
foo(2);

console.log('\n');

console.log('Example 2:');
/**
 * EXAMPLE 2: A Closure
 */

var foo = function foo(x) {
  var tmp = 3;
  return function (y) {
    console.log(x + y + (++tmp));
  };
};
var bar = foo(2); // bar is now a closure.
bar(10);
bar(10);
bar(10);

console.log('\n');
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

