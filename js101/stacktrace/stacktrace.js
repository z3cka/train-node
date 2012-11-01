/**
 *  Why is naming functions important?
 */

/**
 * Define a function to be executed after the timeout.
 * Note the stack trace:
 *  at Object.func...
 */
var func = function() {
  console.trace("I'm a function.");
  console.log('==========================');
};

setTimeout(func, 1000);

/**
 * Execute a named function after the timeout.
 * Note the stack trace:
 *   at Object.named [as _onTimeout]...
 */
setTimeout(function named() {
  console.trace("I'm named, somebody loves me.");
  console.log('==========================');
}, 2000);

/**
 * Execute an anonymous function after the timeout.
 * Note the stack trace:
 *   at Object._onTimeout...
 */
setTimeout(function() {
  console.trace("I'm anonymous, see?");
  console.log('==========================');
}, 3000);


/**
 *  Why is this important?
 *  Using functions as callbacks is fundumental to how
 *  we write ansyncrous code.
 *
 *  It's the pattern we see all the time.
 *
 */
console.log('This runs before all of the above!');

/**
 * Uncomment the below to see examples of how stack traces work.
 */
/* //uncomment
var mistake = function() {
  consol.log("I'm fixed.");
  console.log('==========================');
};
mistake();

setTimeout(function() {
  consol.log("I'm fixed too.");
}, 1);
*/ //uncomment