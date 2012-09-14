/**
 * @fileoverview scope deomonstration
 */

/**
 * EXAMPLE 1: global variable scope.
 */
console.log('=============================');

var foo = 'kitteh';

/**
 * This function alters the 'foo' variable that was
 * previously defined in the global scope.
 */
var example = function() {
  foo = 'doggie';
};

console.log('Example 1: foo = ' + foo);
example();
console.log('Now foo = ' + foo);

console.log("\n");

/**
 * EXAMPLE 2: local variable scope.
 */
console.log('=============================');

/**
 * This function defines its own 'foo' variable that
 * will not alter the one defined in the global scope.
 */
var example2 = function() {
  var foo = 'chupacabra';
  console.log("My foo = " + foo);
};

console.log('Example 2: foo = ' + foo);
example2();
console.log('Now foo = ' + foo);

console.log("\n");

/**
 * EXAMPLE 3: hoisting.
 */
console.log('=============================');

/**
 * This function attempts to access a variable before
 * it is defined and illustrates hoisting.
 *
 * NOTE: if 'a' had not been defined within this scope,
 * attempting to access it would have thrown a fatal error.
 */
var example3 = function() {
  console.log(a);
  var a = 1;
  console.log(a);
};

console.log('Example 3: hoisting');
example3();

