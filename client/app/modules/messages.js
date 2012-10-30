define(['app', 'lodash', 'backbone', 'jquery'], function(app, _, Backbone, $) {
  var Messages = app.module();

  Messages.Model = Backbone.Model.extend({
    url: '/message',
    defaults: {
      name: '',
      message: '',
      time: new Date()
    }
  });

  Messages.Collection = Backbone.Collection.extend({
    url: '/messages',
    model: Messages.Model
  });

  Messages.Views.Item = Backbone.View.extend({
    template: 'message',
    serialize: function() {
      return this.model.toJSON();
    },
    append: function(root, child) {
      $(root).prepend(child);
    }
  });

  Messages.Views.List = Backbone.View.extend({
    template: 'messages',
    events: {
      'submit #new-message': 'sendMessage'
    },
    beforeRender: function() {
      $('.messages-list', this.$el).remove();
      this.collection.each(function(message) {
        this.insertView('.messages-list', new Messages.Views.Item({ model: message }));
      }, this);
    },
    initialize: function() {
      this.collection.on('reset', this.render, this);
      this.collection.on('add', this.add, this);

      app.on('newMessages', _.bind(this.newMessages, this));
      app.on('refreshMessages', _.bind(this.refreshMessages, this));
    },
    add: function(message) {
      var messageView = new Messages.Views.Item({ model: message });
      messageView.render();
      $('.messages-list', this.$el).prepend(messageView.$el);
    },
    newMessages: function(messages) {
      _.each(messages, function(message) {
        this.collection.add(message);
      }, this);
    },
    refreshMessages: function(messages) {
      this.collection.reset(messages);
    },
    sendMessage: function(e) {
      e.preventDefault();

      var newMessage = new Messages.Model({
        name: $('#name').val(),
        message: $('#message').val(),
        time: new Date()
      });

      // Reset the form's message.
      $('#message').val('');

      newMessage.save();
    }
  });

  return Messages;
});

