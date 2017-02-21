'use strict';
const path = require('path');
const fs = require('fs');

module.exports = {
  run: function(ok, ko) {
    let p =
      this.njkRender(
        './', //root where scaffold is created
        path.join(__dirname, 'scaffold'), //from
        path.join('flows', this.params.flowName), //to where scaffold is created
        this.params //vars
      )
      .then(() => {
        fs.renameSync(`flows/${this.params.flowName}/config.json.njk`, `flows/${this.params.flowName}/config.json`);
      })
      .then(ok, ko);

    return p;
  }
};

