var http = require('http');

/**
 * Creates an HTTP server with one response handler.
 *
 * @param {object} req
 *   The HTTP request object.
 * @param {object} res
 *   The HTTP response object.
 */
http.createServer(function hello(req, res) {
  // TODO - respond with a message using the res object.

  // TODO (bonus) - inspect the request object with console.log to find
  // client headers that got sent.
}).listen(); // TODO - add your port number here.
console.log('Server running.');

