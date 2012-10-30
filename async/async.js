/**
 * @fileoverview demonstrates asynchronous libraries.
 */
var fs = require('fs');

var syncContents = '';
var asyncContents = '';

console.log("I'm going to read a file synchronously.");

syncContents = fs.readFileSync(__filename);

console.log("I'm done reading the file synchronously.");
console.log('I read ' + syncContents.length + ' characters.');
console.log("Now I'm ready to do the next thing.");

console.log('=============================');

console.log("I'm going to read a file asynchronously.");
fs.readFile(__filename, function readFile(err, data) {
  asyncContents = data;
  console.log("I'm done reading the file asynchronously.");
  console.log('I read ' + asyncContents.length + ' characters.');
});
console.log("Now I'm ready to do the next thing.");

