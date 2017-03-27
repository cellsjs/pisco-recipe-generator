'use strict';
const path = require('path');
const fs = require('fs');

module.exports = {
  run: function(ok, ko) {
    let p =
      this.njkRender(
        './', //root where scaffold is created
        path.join(__dirname, 'scaffold'), //from
        path.join('plugins', this.params.pluginName), //to where scaffold is created
        this.params //vars
      )
      .then(() => {
        fs.renameSync(`plugins/${this.params.pluginName}/config.json.njk`, `plugins/${this.params.pluginName}/config.json`);
      })
      .then(ok, ko);

    return p;
  }
};

