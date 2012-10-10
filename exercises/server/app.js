
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var poll = require('./lib/poll');

var config = require('./config');

var app = express();

app.configure(function() {
  app.set('port', config.port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('/', express.static(__dirname + '/client'));
app.get('/app', express.static(__dirname + '/client/app'));
app.get('/assets/css', express.static(__dirname + '/client/assets/css'));
app.get('/assets/js', express.static(__dirname + '/client/assets/js'));

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
