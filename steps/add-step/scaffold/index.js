'use strict';

module.exports = {
  check: function() {
    this.logger.info('#blue', 'Check if all you need to execute this step exists');
  },

  config: function() {
    this.logger.info('#purple', 'Config the step to run');
  },

  run: function(ok, ko) {
    this.sh('echo Run main execution of the step');
  },

  prove: function() {
    this.logger.info('#green', 'Check if the step has run ok');
  },

  notify: function() {
    this.logger.info('#grey', 'Notify the end of the shot to someone or something');
  },

  emit: function() {
    this.logger.info('#white', 'Emit the result of the step to other steps. Allow communication between steps');
    return { message: 'emit a message' };
  }
};
