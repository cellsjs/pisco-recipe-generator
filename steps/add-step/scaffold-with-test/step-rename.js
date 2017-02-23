'use strict';
/* global define, it, describe, before */
const expect = require('chai').expect;
const exec = require('child_process').exec;

describe('Generate piscosour {{ stepName }} tests', function() {
  this.timeout(5000);
  it('Should \'::{{ stepName }}\' works', (done) => {
    exec('node .. ::{{ stepName }}', { cwd: 'test' }, (error, stdout, stderr) => {
      expect(error).to.equal(null);
      expect(stderr).to.equal('');
      expect(stdout).contain('Run main execution of the step');
      done();
    });
  });
});