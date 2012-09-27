/**
 * This example illustrates blocking code. Note that while
 * the callbacks are executed asynchronously, the first blocks
 * the second until it compeltes (node.js is single threaded!).
 */

var start = Date.now();

setTimeout(function timeout1() {
  console.log('We started execution ' + (Date.now() - start) + 'ms ago.');

  for (var x = 0; x < 3999999999; x++) {}

  console.log('Done with timeout1().');
}, 1000);

setTimeout(function timeout2() {
  console.log('We started execution ' + (Date.now() - start) + 'ms ago.');
  console.log('Done with timeout2().');
}, 2000);

