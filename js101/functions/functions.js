/**
 * Define a function to be executed after the timeout.
 */
var func = function() {
  console.log("I'm a different kind of named function.");
  console.log('==========================');
};

setTimeout(func, 1000);

/**
 * Execute a named function after the timeout.
 */
setTimeout(function named() {
  console.log("I'm named, somebody loves me.");
  console.log('==========================');
}, 2000);

/**
 * Execute an anonymous function after the timeout.
 */
setTimeout(function() {
  console.log("I'm anonymous, see?");
  console.log('==========================');
}, 3000);


/**
 *  Why is this important?
 *  Using functions as callbacks is fundumental to how
 *  we write ansyncrous code.
 *
 *  It's the pattern we'll use all day.
 *
 */
console.log('This runs before all of the above!');
