/**
 * @fileoverview closure examples.
 */

var bar = 'pony';

var foo = function(bar, callback) {
  bar = 'unicorn';
  callback(bar);
};

var foo2 = function() {
  return "I'm a " + bar;
};

console.log(foo2());
foo(bar, function closure(baz) {
  console.log("I'm a " + baz);
});

console.log('=============================');

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

