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
  // Hint: every response needs at least a HTTP header (res.writeHead())
  // and a call to res.end().
  // @see http://nodejs.org/docs/latest/api/http.html#http_class_http_serverresponse
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // TODO (bonus) - inspect the request object with console.log to find
  // client headers that got sent.
}).listen(); // TODO - add your port number here.
console.log('Server running.');

