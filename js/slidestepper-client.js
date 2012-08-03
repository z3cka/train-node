var stepper = {};

(function($) {
  stepper.init = function(server, auth) {
    var self = this;
    self.auth = auth;
    self.isAdmin = false;
    self.socket = io.connect(server);

    if (typeof self.auth !== 'undefined') {
      self.socket.on('connected', function() {
        self.authenticate();
      });
      self.socket.on('authenticated', function() {
        self.isAdmin = true;
        self.attachListeners();
      });
    }

    self.socket.on('navigateTo', function(command) {
      if (!self.isAdmin) {
        self.navigateTo(command);
      }
    });
  };

  stepper.authenticate = function() {
    this.socket.emit('authenticate', this.auth);
  };

  stepper.attachListeners = function() {
    var self = this;
    $(document).bind('keypress', function(e) {
      var command = {
        type: 'keypress',
        charCode: e.keyCode ? e.keyCode : e.which
      };
      self.socket.emit('navigateTo', command);
    });
  };

  stepper.disconnect = function() {
    this.socket.emit('disconnect');
    this.socket = null;
    this.isAdmin = false;
  };

  stepper.navigateTo = function(command) {
    if (command.type === 'keypress') {
      $.event.trigger({ type: 'keypress', which: command.charCode });
    }
  };
}(jQuery));
