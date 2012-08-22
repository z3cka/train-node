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
    }

    self.socket.on('authenticated', function() {
      self.isAdmin = true;
      self.attachListeners();
    });

    self.socket.on('navigateTo', function(command) {
      if (!self.isAdmin) {
        self.navigateTo(command);
      }
    });
  };

  stepper.authenticate = function(auth) {
    this.auth = auth || this.auth;
    this.socket.emit('authenticate', this.auth);
  };

  stepper.attachListeners = function() {
    var self = this;
    $(document).keydown(function(e) {
      var command = {
        type: 'keydown',
        which: e.which
      };
      self.socket.emit('navigateTo', command);
    });
  };

  stepper.navigateTo = function(command) {
    if (command.type === 'keydown') {
      var e = $.Event('keydown');
      e.which = command.which;
      $('body').trigger(e);
    }
  };
}(jQuery));
