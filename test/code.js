describe('code', function() {

  var lib = require('../lib/code'),
      expect = require('chai').expect;

  describe('asAst', function() {

    it('returns the AST of code passed as String', function() {
      var fixture = require('./fixtures/answer42.json');
      var ast = lib.asAst(fixture.string);
      expect(ast).to.deep.equal(fixture.ast);
    });

  });

  describe('asString', function() {

    it('returns the String representation of an AST', function() {
      var fixture = require('./fixtures/answer42.json');
      var string = lib.asString(fixture.ast);
      expect(string).to.deep.equal(fixture.string);
    });

  });

});
