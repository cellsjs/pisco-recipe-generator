'use strict';

module.exports = {
  check: function() {
    this.logger.info('#blue', 'running check hook...', 'Check if all you need to execute this step exists');
  },

  config: function() {
    this.logger.info('#yellow', 'running config hook...', 'Config the step to run');
  },

  run: function(ok, ko) {
    this.logger.info('#black', 'running run hook...', 'Run the step');
  },

  prove: function() {
    this.logger.info('#green', 'running proove hook...', 'Check if the step has run ok');
  },

  notify: function() {
    this.logger.info('#grey', 'running notify hook...', 'Notify the end of the shot to someone or something');
  },

  emit: function() {
    this.logger.info('#white', 'running emit hook...', 'Emit the result of the step to other steps. Allow communication between steps');
  },

  addons: {
    testAddon: function(param1) {
      this.logger.info('Test addon executed', param1);
    }
  }
};