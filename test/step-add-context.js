'use strict';
/* global define, it, describe, before */
const expect = require('chai').expect;
const exec = require('child_process').exec;
const rimraf = require('rimraf');
const fs = require('fs');

describe('Generate piscosour add-context tests', function() {
  this.timeout(5000);
  it('Should \'recipe::add-context\' works', (done) => {
    let testFolder = 'test/recipe-context/';
    rimraf(`${testFolder}/contexts/foo-context-name`, {}, function() {
      fs.mkdir(testFolder, function() {
        exec('node ../.. recipe::add-context --paramsFile ../step-add-context-params/simple.json', { cwd: testFolder }, function(error, stdout, stderr) {
          expect(`${testFolder}/contexts/foo-context-name`)
            .to.be.a.directory()
            .and.have.files(['config.json', 'index.js', 'info.md']);

          expect(`${testFolder}/contexts/foo-context-name/config.json`)
            .to.be.a.file().with.json
            .with.contents.that.match(/\"name\": \"foo-context-name\"/)
            .with.contents.that.match(/\"description\": \"foo-context-name description testing\"/);

          expect(`${testFolder}/contexts/foo-context-name/index.js`)
            .to.be.a.file()
            .with.contents.that.match(/check/);

          expect(`${testFolder}/contexts/foo-context-name/info.md`)
            .to.be.a.file()
            .with.contents.that.match(/foo-context-name/)
            .with.contents.that.match(/foo-context-name description testing/);

          done();
        });
      });
    });
  });
});