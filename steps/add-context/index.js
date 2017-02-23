'use strict';
const path = require('path');
const fs = require('fs');

module.exports = {
  run: function(ok, ko) {
    let p =
      this.njkRender(
        './', //root where scaffold is created
        path.join(__dirname, 'scaffold'), //from
        path.join('contexts', this.params.contextName), //to where scaffold is created
        this.params //vars
      )
      .then(() => {
        fs.renameSync(`contexts/${this.params.contextName}/config.json.njk`, `contexts/${this.params.contextName}/config.json`);
      })
      .then(ok, ko);

    return p;
  }
};

