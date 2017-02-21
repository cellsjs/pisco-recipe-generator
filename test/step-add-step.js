'use strict';

/* global define, it, describe, before */
const exec = require('child_process').exec;
const rimraf = require('rimraf');
const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;

describe('recipe::add-step validation', function() {
  this.timeout(5000);

  it('Should \'recipe::add-step\' works', function(done) {
    let testFolder = 'test/recipe-context';
    rimraf(`${testFolder}/steps/foo-step-name`, {}, function() {
      fs.mkdir(testFolder, function() {
        exec('node ../.. recipe::add-step --paramsFile ../params-add-step.json', { cwd: testFolder }, function(error, stdout, stderr) {
          expect(`${testFolder}/steps/foo-step-name`)
            .to.be.a.directory()
            .and.have.files(['config.json', 'info.md', 'index.js']);

          expect(`${testFolder}/steps/foo-step-name/config.json`)
            .to.be.a.file().with.json
            .with.contents.that.match(/\"name\": \"foo-step-name\"/)
            .with.contents.that.match(/\"description\": \"foo-step-name description testing\"/)
            .with.contents.that.match(/\"isGenerator\": true/)
            .with.contents.that.match(/(context-one)|(context-two)|(context-three)/)
            .with.contents.that.match(/(plugin-one)|(plugin-two)|(plugin-three)/);

          expect(`${testFolder}/steps/foo-step-name/info.md`)
            .to.be.a.file()
            .with.contents.that.match(/step-name/)
            .with.contents.that.match(/foo-step-name description testing/);

          done();
        });
      });
    });
  });

  it('Should \'recipe::add-step\' works without plugins', function(done) {
    let testFolder = 'test/recipe-context';
    rimraf(`${testFolder}/steps/foo-step-name-no-plugins`, {}, function() {
      fs.mkdir(testFolder, function() {
        exec('node ../.. recipe::add-step --paramsFile ../params-add-step-no-plugins.json', { cwd: testFolder }, function(error, stdout, stderr) {
          expect(`${testFolder}/steps/foo-step-name-no-plugins`)
            .to.be.a.directory()
            .and.have.files(['config.json', 'info.md', 'index.js']);

          expect(`${testFolder}/steps/foo-step-name-no-plugins/config.json`)
            .to.be.a.file().with.json
            .with.contents.that.match(/\"name\": \"foo-step-name-no-plugins\"/)
            .with.contents.that.match(/\"description\": \"foo-step-name description testing\"/)
            .with.contents.that.match(/\"isGenerator\": true/)
            .with.contents.that.match(/(context-one)|(context-two)|(context-three)/)
            .with.not.contents.that.match(/(plugin-one)|(plugin-two)|(plugin-three)/);

          done();
        });
      });
    });
  });

  it('Should \'recipe::add-step\' works without contexts', function(done) {
    let testFolder = 'test/recipe-context';
    rimraf(`${testFolder}/steps/foo-step-name-no-contexts`, {}, function() {
      fs.mkdir(testFolder, function() {
        exec('node ../.. recipe::add-step --paramsFile ../params-add-step-no-contexts.json', { cwd: testFolder }, function(error, stdout, stderr) {
          expect(`${testFolder}/steps/foo-step-name-no-contexts`)
            .to.be.a.directory()
            .and.have.files(['config.json', 'info.md', 'index.js']);

          expect(`${testFolder}/steps/foo-step-name-no-contexts/config.json`)
            .to.be.a.file().with.json
            .with.contents.that.match(/\"name\": \"foo-step-name-no-contexts\"/)
            .with.contents.that.match(/\"description\": \"foo-step-name description testing\"/)
            .with.contents.that.match(/\"isGenerator\": true/)
            .with.contents.that.match(/(plugin-one)|(plugin-two)|(plugin-three)/)
            .with.not.contents.that.match(/(context-one)|(context-two)|(context-three)/);

          done();
        });
      });
    });
  });
});
