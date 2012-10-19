var events = require('events');
var http = require('http');
var _ = require('lodash');
var url = require('url');
var util = require('util');

function Poll(feed) {
  this.guids = [];
  this.feed = feed;
  this.poller = setInterval(_.bind(this.poll, this), 1000);
};
util.inherits(Poll, events.EventEmitter);

Poll.prototype.getStories = function(callback) {
  var options = url.parse(this.feed);
  var req = http.get(options, function polledFeed(res) {
    var data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      if (res.statusCode !== 200) {
        callback(res.statusCode, null);
        return;
      }
      callback(null, JSON.parse(data));
    });
  });
  req.on('error', function() {
    callback(500, null);
  });
};

Poll.prototype.poll = function() {
  var self = this;
  this.getStories(function(err, data) {
    if (err) {
      self.emit('fed', err, null);
      return;
    }

    var newStories = [];

    data.forEach(function(story) {
      if (self.guids.indexOf(story.guid) === -1) {
        self.guids.push(story.guid);
        newStories.push(story);
      }
    });

    if (newStories.length) {
      self.emit('fed', null, data);
    }
  });
};

exports.Poll = Poll;
