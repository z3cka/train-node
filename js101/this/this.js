/**
 * @fileoverview examples of this.
 * who's on first.
 */

/**
 * A simple object with a property and one function.
 */
function Unicorn() {
  this.horns = 0;
}

/**
 * Updates the horns property and prints a message about whether
 * or not this is in fact a unicorn.
 */
Unicorn.prototype.addHorn = function(horns) {
  this.horns = horns;

  /**
   * Checks that the unicorn has at least one horn
   * (we won't judge if there's more) and print
   * a message.
   */
  setTimeout(function countHorns() {
    if (this.horns > 0) {
      console.log("I'm a unicorn!");
    }
    else {
      console.log('I have 0 horns.');
      console.log("I'm either a horse or the scope of 'this' isn't what you thought it was!");
    }
    console.log('=============================');
  }, 1);
};

var unicorn = new Unicorn();
unicorn.addHorn(1);


/**
 * Update the Unicorn prototype to be aware of the scope of 'this'.
 */
Unicorn.prototype.addHorn = function(horns) {
  // Assign the local variable 'self' to the value of 'this' so we can still
  // access 'this' in other scopes.
  var self = this;
  self.horns = horns;

  /**
   * Checks that the unicorn has at least one horn (we won't judge
   * if there's more).
   */
  setTimeout(function countHorns() {
    if (self.horns > 0) {
      console.log("I'm a unicorn!");
    }
    else {
      console.log("I have 0 horns. I must be a horse!");
    }
  }, 1);
};

var unicorn2 = new Unicorn();
unicorn2.addHorn(2);

