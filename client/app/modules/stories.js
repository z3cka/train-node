define(['app', 'lodash', 'backbone', 'jquery'], function(app, _, Backbone, $) {
  var Stories = app.module();

  Stories.Model = Backbone.Model.extend({
    defaults: {
      link: 'http://localhost',
      title: '',
      description: ''
    }
  });

  Stories.Collection = Backbone.Collection.extend({
    url: '/stories',
    model: Stories.Model
  });

  Stories.Views.Item = Backbone.View.extend({
    template: 'story',
    serialize: function() {
      return this.model.toJSON();
    },
    append: function(root, child) {
      $(root).prepend(child);
    }
  });

  Stories.Views.List = Backbone.View.extend({
    template: 'stories',
    beforeRender: function() {
      $('.stories-list', this.$el).children().remove();
      this.collection.each(function(story) {
        this.insertView('.stories-list', new Stories.Views.Item({ model: story }));
      }, this);
    },
    initialize: function() {
      this.collection.on('reset', this.render, this);
      this.collection.on('add', this.add, this);

      app.on('newStories', _.bind(this.newStories, this));
      app.on('refreshStories', _.bind(this.refreshStories, this));
    },
    add: function(story) {
      var storyView = new Stories.Views.Item({ model: story });
      storyView.render();
      $('.stories-list', this.$el).prepend(storyView.$el);
    },
    newStories: function(stories) {
      _.each(stories, function(story) {
        this.collection.add(story);
      }, this);
    },
    refreshStories: function(stories) {
      this.collection.reset(stories);
    }
  });

  return Stories;
});

