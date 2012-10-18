define([
  // Application.
  'app',
  './modules/stories'
],

function(app) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    index: function() {
      app.useLayout('main');
      app.layout.render();
    },

    initialize: function() {
      this.stories = new Stories.Collection();
      this.storiesList = new Stories.Views.List({
        collection: this.stories
      });

      app.useLayout('main');
      app.layout.setViews({
        '.stories': this.storiesList
      });
    }
  });

  return Router;

});
