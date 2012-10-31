define(['app', 'lodash', 'backbone', 'jquery'], function(app, _, Backbone, $) {
  var Images = app.module();

  Images.Model = Backbone.Model.extend({
    defaults: {
      link: 'http://localhost',
      picture: 'http://localhost/test.jpg'
    }
  });

  Images.Collection = Backbone.Collection.extend({
    url: '/images',
    model: Images.Model
  });

  Images.Views.Item = Backbone.View.extend({
    tagName: 'li',
    template: 'image',
    serialize: function() {
      return this.model.toJSON();
    },
    append: function(root, child) {
      $(root).prepend(child);
    }
  });

  Images.Views.List = Backbone.View.extend({
    template: 'images',
    afterRender: function() {
      $('.images-list', this.$el).flexslider({
        animation: 'slide',
        start: _.bind(function(slider) {
          this.slider = slider;
        }, this)
      });
    },
    beforeRender: function() {
      $('.images-list .slides', this.$el).children().remove();
      this.collection.each(function(image) {
        this.insertView('.images-list .slides', new Images.Views.Item({ model: image }));
      }, this);
    },
    initialize: function() {
      this.collection.on('reset', this.render, this);
      this.collection.on('add', this.add, this);

      app.on('newImages', _.bind(this.newImages, this));
      app.on('refreshImages', _.bind(this.refreshImages, this));
    },
    add: function(image) {
      var imageView = new Images.Views.Item({ model: image });
      imageView.render();
      if (typeof this.slider !== undefined) {
        this.slider.addSlide(imageView.$el);
      }
    },
    newImages: function(images) {
      _.each(images, function(image) {
        this.collection.add(image);
      }, this);
    },
    refreshImages: function(images) {
      this.collection.reset(images);
    }
  });

  return Images;
});

