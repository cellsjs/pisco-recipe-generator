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
        this.njkRender(
          './', //root where scaffold is created
          path.join(__dirname, 'scaffold-with-test'), //from
          'test', //to where scaffold is created
          this.params //vars
        )
        .then(() => {
          fs.renameSync('test/step-rename.js', `test/step-${this.params.stepName}.js`);
        })
        .then(ok, ko);
      })
      .catch(ko);

    return p;
  }
};

