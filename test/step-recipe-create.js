'use strict';

/* global define, it, describe, before */
const exec = require('child_process').exec;
const rimraf = require('rimraf').sync;
const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;

describe('recipe::recipe-create validation', function() {
  this.timeout(5000);
  chai.use(require('chai-fs'));

  it('Should \'recipe::recipe-create\' works', function(done) {
    let testFolder = 'test/test1';

    rimraf(testFolder);
    fs.mkdir(testFolder);
    exec('node ../.. recipe::recipe-create --recipeCIFile none --paramsFile ../step-recipe-create-params/simple.json', { cwd: testFolder }, function(error, stdout, stderr) {
      expect(error).to.equal(null);
      expect(stderr).to.equal('');
      expect(stdout).contain('./         PISCOSOUR        ./', 'Piscosour image has not been logged in the console');

      expect(`${testFolder}/foo-app-name/`)
        .to.be.a.directory()
        .and.have.files(['package.json', 'piscosour.json', 'README.md', '.gitignore']);

      expect(`${testFolder}/foo-app-name/`)
        .to.be.a.directory()
        .and.not.have.files(['Jenkinsfile', '.travis.yml']);

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

  it('Should \'recipe::recipe-create\' creates a Jenkinsfile', function(done) {
    let testFolder = 'test/test2';

    rimraf(testFolder);
    fs.mkdir(testFolder);
    exec('node ../.. recipe::recipe-create --recipeCIFile Jenkinsfile --paramsFile ../step-recipe-create-params/simple.json', { cwd: testFolder }, function(error, stdout, stderr) {
      expect(error).to.equal(null);
      expect(stderr).to.equal('');
      expect(stdout).contain('./         PISCOSOUR        ./', 'Piscosour image has not been logged in the console');

      expect(`${testFolder}/foo-app-name/`)
        .to.be.a.directory()
        .and.have.files(['package.json', 'piscosour.json', 'README.md', '.gitignore', 'Jenkinsfile']);

      done();
    });
  });

  it('Should \'recipe::recipe-create\' creates a .travis.yml', function(done) {
    let testFolder = 'test/test3';

    rimraf(testFolder);
    fs.mkdir(testFolder);
    exec('node ../.. recipe::recipe-create --recipeCIFile .travis.yml --paramsFile ../step-recipe-create-params/simple.json', { cwd: testFolder }, function(error, stdout, stderr) {
      expect(error).to.equal(null);
      expect(stderr).to.equal('');
      expect(stdout).contain('./         PISCOSOUR        ./', 'Piscosour image has not been logged in the console');

      expect(`${testFolder}/foo-app-name/`)
        .to.be.a.directory()
        .and.have.files(['package.json', 'piscosour.json', 'README.md', '.gitignore', '.travis.yml']);

      done();
    });
  });

  it('Should \'recipe::recipe-create\' creates a right test', function(done) {
    this.timeout(120000);
    let testFolder = 'test/test4';

    rimraf(testFolder);
    fs.mkdir(testFolder);
    exec('node ../.. recipe::recipe-create --recipeCIFile none --paramsFile ../step-recipe-create-params/simple.json', { cwd: testFolder }, function(error, stdout, stderr) {
      expect(`${testFolder}/foo-app-name/test`)
        .to.be.a.directory()
        .and.have.files([ 'index.js' ]);

      expect(`${testFolder}/foo-app-name/test/index.js`)
        .to.be.a.file()
        .with.contents.that.match(/recipe foo-app-name validation/);

      exec('npm install && npm test', { cwd: `${testFolder}/foo-app-name/test/` }, function(error2, stdout2, stderr2) {
        expect(stdout2).to.match(/✓ Should .*weather.* works/);
        done();
      });
    });
  });
});
