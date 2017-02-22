'use strict';

/* global define, it, describe, before */
const exec = require('child_process').exec;
const rimraf = require('rimraf');
const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;

describe('recipe::add-flow validation', function() {
  this.timeout(5000);

  it('Should \'recipe::add-flow\' works', function(done) {
    let testFolder = 'test/recipe-context/';
    rimraf(`${testFolder}/flows/foo-flow-name`, {}, function() {
      fs.mkdir(testFolder, function() {
        exec('node ../.. recipe::add-flow --paramsFile ../step-add-flow-params/multiple-steps.json', { cwd: testFolder }, function(error, stdout, stderr) {
          expect(`${testFolder}/flows/foo-flow-name`)
            .to.be.a.directory()
            .and.have.files(['config.json', 'info.md']);

          expect(`${testFolder}/flows/foo-flow-name/config.json`)
            .to.be.a.file().with.json
            .with.contents.that.match(/\"name\": \"foo-flow-name\"/)
            .with.contents.that.match(/\"description\": \"foo-flow-name description testing\"/)
            .with.contents.that.match(/(step-one)|(step-two)|(step-three)/);

          expect(`${testFolder}/flows/foo-flow-name/info.md`)
            .to.be.a.file()
            .with.contents.that.match(/foo-flow-name/)
            .with.contents.that.match(/foo-flow-name description testing/);

          done();
        });
      });
    });
  });

  it('Should \'recipe::add-flow\' works with one step', function(done) {
    let testFolder = 'test/recipe-context';
    rimraf(`${testFolder}/flows/foo-flow-name-one-step`, {}, function() {
      fs.mkdir(testFolder, function() {
        exec('node ../.. recipe::add-flow --paramsFile ../step-add-flow-params/one-step.json', { cwd: testFolder }, function(error, stdout, stderr) {
          expect(`${testFolder}/flows/foo-flow-name-one-step`)
            .to.be.a.directory()
            .and.have.files(['config.json', 'info.md']);

          expect(`${testFolder}/flows/foo-flow-name-one-step/config.json`)
            .to.be.a.file().with.json
            .with.contents.that.match(/\"name\": \"foo-flow-name-one-step\"/)
            .with.contents.that.match(/\"description\": \"foo-flow-name description testing\"/)
            .with.not.contents.that.match(/(step-one)|(step-two)|(step-three)/);

          expect(`${testFolder}/flows/foo-flow-name-one-step/info.md`)
            .to.be.a.file()
            .with.contents.that.match(/foo-flow-name/)
            .with.contents.that.match(/foo-flow-name description testing/);

          done();
        });
      });
    });
  });
});
