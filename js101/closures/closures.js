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
  console.trace();
  console.log("I'm a " + baz);
});
