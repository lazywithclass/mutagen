describe('fn', function() {

  var lib = require('./source'),
      expect = require('chai').expect;

  it('returns true', function() {
    expect(lib.fn()).to.be.true;
  });

});
