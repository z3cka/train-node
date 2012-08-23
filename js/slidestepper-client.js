var stepper = {};

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

stepper.emitKeyboardEvent = function(type, e) {
  var command = {
    type: type,
    vars: {
      altKey: e.altKey,
      char: e.char,
      charCode: e.charCode,
      ctrlKey: e.ctrlKey,
      key: e.key,
      keyCode: e.keyCode,
      locale: e.locale,
      location: e.location,
      metaKey: e.metaKey,
      repeat: e.repeat,
      shiftKey: e.shiftKey,
      which: e.which
    }
  };
  this.socket.emit('navigateTo', command);
};

stepper.attachListeners = function() {
  var self = this;
  document.addEventListener('keydown', function(e) {
    self.emitKeyboardEvent('keydown', e);
  }, false);
  document.addEventListener('keyup', function(e) {
    self.emitKeyboardEvent('keyup', e);
  }, false);
  document.addEventListener('keypress', function(e) {
    self.emitKeyboardEvent('keypress', e);
  }, false);
};

stepper.navigateTo = function(command) {
  if (command.type === 'keydown' || command.type === 'keyup' || command.type === 'keypress') {
    var e = null;
    if (document.createEvent) {
      e = document.createEvent('KeyboardEvent');
      if (e.initKeyboardEvent) {  // WebKit.
        e.initKeyboardEvent(command.type,
          true, true, window, command.vars.key, 0, command.vars.ctrlKey,
          command.vars.altKey, command.vars.shiftKey, command.vars.metaKey
        );

        e.charCode = command.vars.charCode;
        if (command.type == 'keypress') {
          e.keyCode = command.vars.charCode;
        }
        else {
          e.keyCode = command.vars.keyCode;
        }

        // Nasty hack to deal with a Webkit bug that doesn't allow us to modify
        // the keyCode value.
        // @see https://bugs.webkit.org/show_bug.cgi?id=16735
        try {
          Object.defineProperty(e, 'keyCode', { get: function() { return command.vars.keyCode; } });
        } catch (ex) {
          // TODO
        }
      }
      else if (e.initKeyEvent) {  // FF.
        e.initKeyEvent(command.type,
          true, true, window, command.vars.ctrlKey, command.vars.altKey, command.vars.shiftKey,
          command.vars.metaKey, command.vars.keyCode, command.vars.charCode
        );
        e.keyIdentifier = command.vars.key;
      }
    }
    else if (document.createEventObject) {
      e = document.createEventObject();
      e.ctrlKey = command.vars.ctrlKey;
      e.altKey = command.vars.altKey;
      e.shiftKey = command.vars.shiftKey;
      e.metaKey = command.vars.metaKey;
      e.keyCode = command.vars.charCode;  // Emulate IE charcode-in-the-keycode onkeypress.
      e.keyIdentifier = command.vars.key;
    }

    if (e) {
      document.body.dispatchEvent(e);
    }
  }
};

