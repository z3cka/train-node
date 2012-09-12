/**
 * @fileoverview scope deomonstration
 */

var foo = 'kitteh';

var example = function() {
  foo = 'doggie';
};

console.log('=============================');
console.log('Example 1: foo = ' + foo);
example();
console.log('Now foo = ' + foo);

console.log("\n");

var example2 = function() {
  var foo = 'chupacabra';
  console.log("My foo = " + foo);
};

console.log('=============================');
console.log('Example 2: foo = ' + foo);
example2();
console.log('Now foo = ' + foo);

console.log("\n");

// TODO - decide if we need this.
var example3 = function() {
  for (var i = 0; i < 5; i++) {
    var x = 0;
    console.log(x);
    x++;
  }
  console.log(x);
};

var example3a = function() {
  var x, i;
  for (i = 0; i < 5; i++) {
    x = 0;
    console.log(x);
    x++;
  }
  console.log(x);
};

console.log('=============================');
console.log('Example 3: no block scope');
example3();
example3a();

var example4 = function() {
  console.log(a);
  var a = 1;
  console.log(a);
};

console.log('=============================');
console.log('Example 4: hoisting');
example4();

