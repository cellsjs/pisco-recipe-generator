'use strict';
/* global define, it, describe, before */
const assert = require('chai').assert;
const exec = require('child_process').exec;

describe('Generate piscosour {{ recipeName }} tests', function() {
  this.timeout(5000);
  it('Should \'recipe::weather\' works', (done) => {
    exec('node .. recipe::weather', { cwd: 'test' }, (error, stdout, stderr) => {
      assert.equal(stderr, '', stderr);
      assert.equal(error, null, error);
      done();
    });
  });
});