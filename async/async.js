/**
 * @fileoverview demonstrates asynchronous libraries.
 */
var fs = require('fs');

var syncContents = '';
var asyncContents = '';

console.log("I'm going to read a file synchronously.");

/**
 * The script will block until readFileSync completes.
 */
syncContents = fs.readFileSync(__filename);

console.log("I'm done reading the file synchronously.");
console.log('I read ' + syncContents.length + ' characters.');
console.log("Now I'm ready to do the next thing.");

console.log('=============================');

console.log("I'm going to read a file asynchronously.");

/**
 * The script will be allowed to continue while the file is read
 * in, when it's completed the callback will be executed.
 */
fs.readFile(__filename, function readFile(err, data) {
  asyncContents = data;
  console.log("I'm done reading the file asynchronously.");
  console.log('I read ' + asyncContents.length + ' characters.');
});
console.log("Now I'm ready to do the next thing.");

