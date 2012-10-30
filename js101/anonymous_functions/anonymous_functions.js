/**
 * Execute an anonymous function after the timeout.
 * Note the stack trace:
 *   at Object._onTimeout...
 */
setTimeout(function() {
  console.trace("I'm anonymous, see?");
  console.log('==========================');
}, 1);

/**
 * Execute a named function after the timeout.
 * Note the stack trace:
 *   at Object.named [as _onTimeout]...
 */
setTimeout(function named() {
  console.trace("I'm named, somebody loves me.");
  console.log('==========================');
}, 1000);

/**
 * Define a function to be executed after the timeout.
 * Note the stack trace:
 *  at Object.namedFunc2...
 */
var namedFunc2 = function() {
  console.trace("I'm a different kind of named function.");
  console.log('==========================');
};

setTimeout(namedFunc2, 2000);
