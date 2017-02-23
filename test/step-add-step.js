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
        exec('node ../.. recipe::add-step --paramsFile ../step-add-step-params/simple.json', { cwd: testFolder }, function(error, stdout, stderr) {
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
        exec('node ../.. recipe::add-step --paramsFile ../step-add-step-params/no-plugins.json', { cwd: testFolder }, function(error, stdout, stderr) {
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
        exec('node ../.. recipe::add-step --paramsFile ../step-add-step-params/no-contexts.json', { cwd: testFolder }, function(error, stdout, stderr) {
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

  it('Should \'recipe::add-step\' creates a right test', function(done) {
    this.timeout(90000);
    let testFolder = 'test/recipe-context';
    rimraf(`${testFolder}/steps`, {}, function() {
      rimraf(`${testFolder}/test`, {}, function() {
        exec('node ../.. recipe::add-step --paramsFile ../step-add-step-params/test-the-test.json', { cwd: testFolder }, function(error, stdout, stderr) {
          expect(`${testFolder}/steps/foo-step-name`)
            .to.be.a.directory()
            .and.have.files(['config.json', 'info.md', 'index.js']);

          expect(`${testFolder}/steps/foo-step-name/config.json`)
            .to.be.a.file().with.json
            .with.contents.that.match(/\"name\": \"foo-step-name\"/)
            .with.contents.that.match(/\"description\": \"foo-step-name description testing\"/);

          expect(`${testFolder}/steps/foo-step-name/info.md`)
            .to.be.a.file()
            .with.contents.that.match(/step-name/)
            .with.contents.that.match(/foo-step-name description testing/);

          expect(`${testFolder}/test`)
            .to.be.a.directory()
            .and.have.files([ 'step-foo-step-name.js' ]);

          expect(`${testFolder}/test/step-foo-step-name.js`)
            .to.be.a.file()
            .with.contents.that.match(/::foo-step-name validation/);

          exec('npm install && npm test', { cwd: `${testFolder}/test/` }, function(error2, stdout2, stderr2) {
            expect(stdout2).to.match(/✓ Should .*::foo-step-name.* works/);
            done();
          });
        });
      });
    });
  });
});