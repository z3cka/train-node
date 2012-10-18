define(['app', 'lodash', 'backbone'], function(app, _, Backbone) {
  var Stories = app.module();

  Stories.Model = Backbone.Model.extend({
    defaults: {
      link: 'http://localhost',
      title: '',
      description: ''
    }
  });

  Stories.Collection = Backbone.Collection.extend({
    model: Stories.Model,
  });

  Stories.Views.Item = Backbone.View.extend({
    template: 'story',
    serialize: function() {
      return this.model.toJSON();
    }
  });

  Stories.Views.List = Backbone.View.extend({
    tagName: 'div',
    className: 'stories-list',
    beforeRender: function() {
      this.$el.children().remove();
      this.collection.each(function(story) {
        this.insertView(new Stories.Views.Item({ model: story }));
      }, this);
    },
    initialize: function() {
      this.collection.on('reset', this.render, this);

      this.collection.on('add', this.add, this);

      app.on('newStories', _.bind(this.newStories, this));
      app.on('refresh', _.bind(this.refresh, this));
    },
    add: function(story) {
      var Story = new Stories.Model(story);
      this.insertView(new Stories.Views.Item({ model: Story }));
    },
    newStories: function(stories) {
      this.collections.add(stories);
    },
    refresh: function(stories) {
      this.collections.reset(stories);
    }
  });

  return Stories;
});
