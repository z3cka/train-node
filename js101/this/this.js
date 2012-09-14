/**
 * @fileoverview examples of this.
 * who's on first.
 */

var Unicorn = {
  hasHorn: true,

  addHorn: function() {
    this.hasHorn = true;

    var countHorns = function() {
      if (this.hasHorn) {
        return 1;
      }
      return 0;
    };

    console.log('I have ' + countHorns() + ' horns.');
  }
};

Unicorn.addHorn();

var Unicorn2 = {
  hasHorn: true,

  addHorn: function() {
    var self = this;
    self.hasHorn = true;

    var countHorns = function() {
      if (self.hasHorn) {
        return 1;
      }
      return 0;
    };

    console.log('I have ' + countHorns() + ' horns.');
  }
};

Unicorn2.addHorn();

