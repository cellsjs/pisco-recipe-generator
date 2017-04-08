'use strict';

/* global define, it, describe, before */
const exec = require('child_process').exec;
const rimraf = require('rimraf').sync;
const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;

describe('recipe::add-plugin validation', function() {
  this.timeout(5000);

  it('Should \'recipe::add-plugin\' works', function(done) {
    let testFolder = 'test/recipe-context';
    rimraf(`${testFolder}/plugins/foo-plugin-name`);

    exec('node ../.. recipe::add-plugin --paramsFile ../step-add-plugin-params/simple.json', { cwd: testFolder }, function(error, stdout, stderr) {
      expect(`${testFolder}/plugins/foo-plugin-name`)
        .to.be.a.directory()
        .and.have.files(['config.json', 'info.md', 'index.js']);

      expect(`${testFolder}/plugins/foo-plugin-name/config.json`)
        .to.be.a.file().with.json
        .with.contents.that.match(/\"name\": \"foo-plugin-name\"/)
        .with.contents.that.match(/\"description\": \"foo-plugin-name description testing\"/);

      expect(`${testFolder}/plugins/foo-plugin-name/index.js`)
        .to.be.a.file()
        .with.contents.that.match(/check: function/)
        .with.contents.that.match(/config: function/)
        .with.contents.that.match(/run: function/)
        .with.contents.that.match(/prove: function/)
        .with.contents.that.match(/notify: function/)
        .with.contents.that.match(/emit: function/)
        .with.contents.that.match(/addons: {/);

      expect(`${testFolder}/plugins/foo-plugin-name/info.md`)
        .to.be.a.file()
        .with.contents.that.match(/plugin-name/)
        .with.contents.that.match(/foo-plugin-name description testing/)
        .with.contents.that.match(/check\(\) hook/)
        .with.contents.that.match(/config\(\) hook/)
        .with.contents.that.match(/run\(\) hook/)
        .with.contents.that.match(/prove\(\) hook/)
        .with.contents.that.match(/notify\(\) hook/)
        .with.contents.that.match(/emit\(\) hook/)
        .with.contents.that.match(/testAddon\(\) addon/);

      done();
    });
  });
});
