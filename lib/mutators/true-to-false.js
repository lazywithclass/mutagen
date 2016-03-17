var lib = {},
    esrecurse = require('esrecurse');

// TODO probably I have to abstract away
// esrecurse in a utility module?

lib.mutants = (ast) => {
  var mutants = [];
  esrecurse.visit(ast, {
    Literal: function(node) {
      if (node.value === true) {
        lib.mutate(node);
        mutants.push(ast);
      }
    }
  });

  return mutants;
};

lib.mutate = (astNode) => {
  astNode.value = false;
  astNode.raw = 'false';
};

module.exports = lib;
