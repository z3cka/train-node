/**
 * @fileoverview maintains feed items as resourceful resources
 * and polls feeds for new items.
 */

var rsj = require('rsj');

var Feed = exports.attach = (function() {
  var items = {};

  function pollFeed(feed) {
    rsj.r2j(feed, function(data) {
      if (!data) {
        this.log.error('There was a problem fetching data for ' + feed);
        return;
      }
      data = JSON.parse(data);
      data.forEach(function(item) {
        if (typeof items[item.guid] === 'undefined') {
          items[item.guid] = item;
        }
      });
    });
  };

  return function(options) {
    this.startPolling = function() {
      var self = this;
      this.config.get('feeds').forEach(function(feed) {
        setInterval(pollFeed, self.config.get('pollTimeout'), feed);
      });
    };

    this.getItems = function() {
      // Convert the items object to an array, would be better to
      // not do this on every request, but KISS for now.
      var itemsArray = [];
      for (item in items) {
        itemsArray.push(items[item]);
      }

      // Go ahead and sort the array by date, why not?

      return itemsArray;
    };
  };
}());

Feed.init = function(done) {
  return done();
};

