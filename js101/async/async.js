var fs = require('fs');

var syncContents = '';
var asyncContents = '';

console.log("I'm going to read a file synchronously.");

// TODO - use system path separator.
syncContents = fs.readFileSync(__dirname . '/closures.js');

console.log("I'm done reading the file synchronously.");
console.log("Now I'm ready to do the next thing.");

console.log("I'm going to read a file asynchronously.");
fs.readFile(__dirname . '/closures.js', function(err, data) {
  asyncContents = data;
  console.log("I'm done reading the file asynchronously.");
});
console.log("Now I'm ready to do the next thing.");

