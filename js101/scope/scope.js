/**
 * @fileoverview scope deomonstration
 */

/**
 * EXAMPLE 1: global variable scope.
 */
console.log('=============================');

var pet = 'kitteh';

/**
 * This function alters the 'pet' variable that was
 * previously defined in the global scope.
 */
var example = function() {
  pet = 'doggie';
};

console.log('Example 1: My pet is a ' + pet);
example();
console.log('Now my pet is a ' + pet);

console.log("\n");

/**
 * EXAMPLE 2: local variable scope.
 */
console.log('=============================');

/**
 * This function defines its own 'pet' variable that
 * will not alter the one defined in the global scope.
 */
var example2 = function() {
  var pet = 'chupacabra';
  console.log("My pet is a " + pet);
};

console.log('Example 2: My pet is a ' + pet);
example2();
console.log('Now my pet is a ' + pet);

console.log("\n");

/**
 * EXAMPLE 3: hoisting.
 */
console.log('=============================');

/**
 * This function attempts to access a variable before
 * it is defined and illustrates hoisting.
 *
 * NOTE: if 'fictionalPet' had not been defined within this scope,
 * attempting to access it would have thrown a fatal error.
 */
var example3 = function() {
  console.log('I wish I had a ' + fictionalPet);
  var fictionalPet = 'unicorn';
  console.log('No really, I wish I had a ' + fictionalPet);
};

console.log('Example 3: hoisting');
example3();

