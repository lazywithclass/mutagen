describe('true-to-false', function() {

  var lib = require('../../lib/mutators/true-to-false'),
      code = require('../../lib/code'),
      expect = require('chai').expect;

  describe('mutants', function() {

    it('returns [] if true is not present', function() {
      var ast = code.asAst('var string = "string"');
      expect(lib.mutants(ast)).to.deep.equal([]);
    });

    it('returns [mutant] if true is present', function() {
      var fixture = require('../fixtures/truthy.json');
      var mutants = lib.mutants(fixture.ast);
      expect(mutants).to.deep.equal(fixture.mutants);
    });

    it('doesnt get fooled by "true"', function() {
      var ast = code.asAst('var string = "true"');
      expect(lib.mutants(ast)).to.deep.equal([]);
    });

  });

  describe('mutate', function() {

    it('given a node mutates it', function() {
      var astNode = {
        type: 'Literal',
        start: 13,
        end: 17,
        range: [ 13, 17 ],
        value: true,
        raw: 'true'
      };
      lib.mutate(astNode);
      expect(astNode.value).to.equal(false);
      expect(astNode.raw).to.equal('false');
    });

  });

});
