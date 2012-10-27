
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var config = require('./config');

/**
 * Server and socket.io definition.
 */
var app = express();

// Set some configuration.
app.configure(function(){
  app.set('port', config.port);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'client')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Initialize the express server.
var server = http.createServer(app);

// Attach socket.io to the express server.
var io = require('socket.io').listen(server);

// Start listening for HTTP requests.
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

/**
 * Routes
 *
 * The default routes that the client is aware of have been defined
 * here. It's up to you to fill them out or expand upon them!
 */

/**
 * Returns a list of stories to be used on page load.
 *
 * @param {object} req
 *   The HTTP request object.
 * @param {object} res
 *   The HTTP response object.
 */
app.get('/stories', function getStories(req, res) {
  var stories = [{
    title: 'Stories placeholder',
    description: 'Foodie orci fusce ut arcu justo maecenas congue food truck nibh a congue donec tellus non ligula artisan. Justo sodales leo ultricies non ultricies curabitur keytar sem ipsum mattis odio bibendum undefined tempus tofu. Nulla nibh integer non commodo metus mauris beard mauris orci molestie duis urna in et tattoo quisque molestie.',
    link: 'http://fourkitchens.com'
  }];

  // TODO (bonus) - if you have saved new stories somewhere, serve those
  // instead of the default one above.

  res.json(stories);
});

/**
 * Handles a new message being posted from a client.
 *
 * @param {object} req
 *   The HTTP request object.
 * @param {objet} res
 *   The HTTP response object.
 */
app.post('/message', function postMessage(req, res) {
  res.writeHead(204);
  res.end();

  // TODO - notify other sockets of the new message.

  // TODO (bonus) - save the message locally so new clients can fetch
  // history when they connect.
});

/**
 * Returns a list of messages to be used on page load.
 *
 * Note: you won't need to fill out this endpoint unless you
 * are going to allow fetching message history.
 *
 * @param: {object} req
 *   The HTTP request object.
 * @param: {object} res
 *   The HTTP response object.
 */
app.get('/messages', function getMessages(req, res) {
  var messages = [];

  // TODO (bonus) - if you have saved new messages somewhere, serve those
  // instead of this empty list.

  res.json(messages);
});

/**
 * Returns a list of images to be used on page load.
 *
 * @param {object} req
 *   The HTTP request object.
 * @param {object} res
 *   The HTTP response object.
 */
app.get('/images', function getImages(req, res) {
  var images = [
    {
      link: 'http://fourkitchens.com',
      picture: 'http://ebmedia.eventbrite.com/s3-s3/eventlogos/37230180/3991456554-2.png'
    },
    {
      link: 'http://fourkitchens.com',
      picture: 'http://i.imgur.com/Knaxq.png'
    }
  ];

  // TODO (bonus) - if you have saved new images somewhere, serve those instead
  // of these defaults.

  res.json(images);
});

/**
 * Socket behaviors.
 *
 * Our client knows about three data entities:
 *
 * story:
 *   {
 *     title: 'Story title',
 *     description: 'Story body text',
 *     link: 'URL to the story'
 *   }
 *
 * message:
 *   {
 *     name: 'Message Author',
 *     message: 'Message body text!',
 *     time: new Date()
 *   }
 *
 * image:
 *   {
 *     picture: 'URL to the image',
 *     link: 'URL to where the image should be linked to'
 *   }
 *
 * There are two socket events that the client is aware of
 * for each entity, new<EntityTypes> and refresh<EntityTypes>:
 *   * newStories
 *   * refreshStories
 *   * newMessages
 *   * refreshStories
 *   * newImages
 *   * refreshImages
 *
 * Each event accepts an array of the appropriate entity as defined
 * above.
 *
 * The new<EntityTypes> event will append the entities in the
 * array to the entity's region on the client side.
 *
 * The refresh<EntityTypes> event will replace the entities on the client
 * side with those in the array.
 */
io.sockets.on('connection', function(socket) {
  // TODO - add a custom welcome message when a user connects!
  var messages = [];

  socket.emit('newMessages', messages);
});

/**
 * Content behaviors.
 *
 * You can set up loops to fill out content on the client by
 * creating random data or polling RSS feeds, external APIs, etc.
 */

/**
 * Notifies the client of new stories.
 */
setInterval(function newStories() {
  // TODO - create some story content to send to the client.

  // TODO (bonus) - fetch story content from a feed or external API and send
  // the results to the client.
  // Hint: check out the rsj node module for parsing RSS to JSON automagically.

  // TODO (bonus) - save the stories so new clients can load history when the
  // connect.
}, conf.pollInterval || 10000);

/**
 * Notifies the client of new images.
 */
setInterval(function newStories() {
  // TODO - fetch images from flickr or other feeds and refresh the client
  // with the fetched content.
  // Hint: check out the rsj node module for parsing RSS to JSON automagically.
}, conf.pollInterval || 10000);

