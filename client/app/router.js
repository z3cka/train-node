define([
  // Application.
  'app',
  './training-config',
  './modules/images',
  './modules/stories',
  './modules/messages'
],

function(app, conf, Images, Stories, Messages) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    index: function() {
      app.useLayout('main');
      app.layout.render();
      this.images.fetch();
      this.stories.fetch();
      this.messages.fetch();
    },

    initialize: function() {
      this.images = new Images.Collection();
      this.imagesList = new Images.Views.List({
        collection: this.images
      });

      this.stories = new Stories.Collection();
      this.storiesList = new Stories.Views.List({
        collection: this.stories
      });

      this.messages = new Messages.Collection();
      this.messagesList = new Messages.Views.List({
        collection: this.messages
      });

      app.useLayout('main');
      app.layout.setViews({
        '.images': this.imagesList,
        '.stories': this.storiesList,
        '.messages': this.messagesList
      });

      var socket = io.connect(conf.url);
      socket.on('newImages', function(images) {
        app.trigger('newImages', images);
      });
      socket.on('refreshImages', function(images) {
        app.trigger('refreshImages', images);
      });
      socket.on('newStories', function(stories) {
        app.trigger('newStories', stories);
      });
      socket.on('refreshStories', function(stories) {
        app.trigger('refreshStories', stories);
      });
      socket.on('newMessages', function(messages) {
        app.trigger('newMessages', messages);
      });
      socket.on('refreshMessages', function(messages) {
        app.trigger('refreshMessages', messages);
      });
    }
  });

  return Router;

});
