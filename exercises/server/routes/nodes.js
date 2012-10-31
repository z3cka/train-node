var request = require('superagent');

/**
 * Get Nodes function
 *
 */
module.exports  = function nodes (url, fn) {
  request.get(url)
    .end(function (res) {
      if (res.body) {
        return fn(null, res.body);
      }
    });
};