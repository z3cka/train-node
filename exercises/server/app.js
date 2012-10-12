
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var poll = require('./lib/poll');

var config = require('./config');

var app = express();

app.configure(function() {
  app.set('port', config.port);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'client')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(app.get('port'), function() {
  console.log("Server listening on port " + app.get('port'));
});

var poller = new poll.Poll(config.feed);

poller.on('fed', function(err, data) {
  if (err) {
    console.error('Error fetching data (' + err + ')');
    return;
  }

  io.sockets.emit('newStories', data);
});
