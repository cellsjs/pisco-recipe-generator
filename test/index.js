'use strict';

/* global define, it, describe, before */
//const chai = require('chai');
const exec = require('child_process').exec;
const rimraf = require('rimraf');
const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;

describe('pisco-recipe-create tests', function() {
  this.timeout(5000);
  chai.use(require('chai-fs'));

  it('Should \'recipe::create\' works', function(done) {
    let testFolder = 'test/test1';

    rimraf(testFolder, {}, function() {
      fs.mkdir(testFolder, function() {
        exec('node ../.. recipe::create --paramsFile ../recipe-create.json', { cwd: testFolder }, function(error, stdout, stderr) {
          expect(error).to.equal(null);
          expect(stderr).to.equal('');
          expect(stdout).contain('./         PISCOSOUR        ./', 'Piscosour image has not been logged in the console');

          expect(`${testFolder}/foo-app-name/`)
            .to.be.a.directory()
            .and.have.files(['package.json', 'piscosour.json', 'README.md', '.gitignore']);

          expect(`${testFolder}/foo-app-name/`)
            .to.be.a.directory()
            .and.not.have.files([ 'Jenkinsfile' ]);

          expect(`${testFolder}/foo-app-name/package.json`)
            .to.be.a.file().with.json
            .with.contents.that.match(/\"name\": \"foo-app-name\"/)
            .with.contents.that.match(/\"description\": \"foo-app-name testing\"/)
            .with.contents.that.match(/\"foo-app\": \"bin\/pisco\.js\"/)
            .with.contents.that.match(/\"foo-app\": \"bin\/pisco\.js\"/)
            .with.contents.that.match(/\"version\": \"0\.1\.0\"/);

          expect(`${testFolder}/foo-app-name/piscosour.json`)
            .to.be.a.file().with.json
            .with.contents.that.match(/\"cmd\" : \"foo-app\"/)
            .with.contents.that.match(/\"defaultContext\": \"\"/);

          expect(`${testFolder}/foo-app-name/README.md`)
            .to.be.a.file()
            .with.contents.that.match(/foo-app-name/)
            .with.contents.that.match(/foo-app-name testing/);

          expect(`${testFolder}/foo-app-name/.gitignore`)
            .to.be.a.file()
            .with.contents.that.match(/scullion\.json/);

          expect(`${testFolder}/foo-app-name/bin/pisco.js`)
            .to.be.a.file()
            .with.contents.that.match(/piscosour/);

          done();
        });
      });
    });
  });

  it('Should \'recipe::create\' creates a Jenkinsfile', function(done) {
    let testFolder = 'test/test2';

    rimraf(testFolder, {}, function() {
      fs.mkdir(testFolder, function() {
        exec('node ../.. recipe::create --b-recipeHasJenkinsfile --paramsFile ../recipe-create.json', { cwd: testFolder }, function(error, stdout, stderr) {
          expect(error).to.equal(null);
          expect(stderr).to.equal('');
          expect(stdout).contain('./         PISCOSOUR        ./', 'Piscosour image has not been logged in the console');

          expect(`${testFolder}/foo-app-name/`)
            .to.be.a.directory()
            .and.have.files(['package.json', 'piscosour.json', 'README.md', '.gitignore', 'Jenkinsfile']);

          done();
        });
      });
    });
  });

  it('Should \'recipe::create\' creates a right test', function(done) {
    this.timeout(90000);
    let testFolder = 'test/test3';

    rimraf(testFolder, {}, function() {
      fs.mkdir(testFolder, function() {
        exec('node ../.. recipe::create --b-recipeHasJenkinsfile --paramsFile ../recipe-create.json', { cwd: testFolder }, function(error, stdout, stderr) {
          expect(`${testFolder}/foo-app-name/test`)
            .to.be.a.directory()
            .and.have.files([ 'index.js' ]);

          expect(`${testFolder}/foo-app-name/test/index.js`)
            .to.be.a.file()
            .with.contents.that.match(/Generate piscosour foo-app-name tests/);

          exec('npm install && npm test', { cwd: `${testFolder}/foo-app-name/test/` }, function(error2, stdout2, stderr2) {
            expect(stdout2).to.match(/✓ Should .*weather.* works/);
            done();
          });
        });
      });
    });
  });
});