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
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337);
console.log('Server running');
