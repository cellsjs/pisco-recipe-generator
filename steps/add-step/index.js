'use strict';
const path = require('path');
const fs = require('fs');

module.exports = {
  run: function(ok, ko) {
    let p =
      this.njkRender(
        './', //root where scaffold is created
        path.join(__dirname, 'scaffold'), //from
        path.join('steps', this.params.stepName), //to where scaffold is created
        this.params //vars
      )
      .then(() => {
        fs.renameSync(`steps/${this.params.stepName}/config.json.njk`, `steps/${this.params.stepName}/config.json`);
      })
      .then(ok, ko);

    return p;
  }
};

