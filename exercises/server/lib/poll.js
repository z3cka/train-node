var events = require('events');
var http = require('http');
var _ = require('underscore');
var url = require('url');
var util = require('util');

function Poll(feed) {
  this.guids = [];
  this.feed = feed;
  this.poller = setInterval(_.bind(this.poll, this), 1000);
};
util.inherits(Poll, events.EventEmitter);

Poll.prototype.poll = function() {
  var self = this;
  var options = url.parse(self.feed);
  http.get(options, function polledFeed(res) {
    var data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      if (res.statusCode !== 200) {
        this.emit('fed', res.statusCode, null);
        return;
      }

      var newStories = [];

      data = JSON.parse(data);
      data.forEach(function(story) {
        if (self.guids.indexOf(story.guid) === -1) {
          self.guids.push(story.guid);
          newStories.push(story);
        }
      });

      if (newStories.length) {
        this.emit('fed', null, data);
      }
    });
  });
};

exports.Poll = Poll;
