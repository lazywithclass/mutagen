var lib = {},
    acorn = require('acorn'),
    escodegen = require('escodegen');

lib.asAst = (codeAsString) => {
  return acorn.parse(codeAsString, { ranges: true });
};

lib.asString = (ast) => {
  return escodegen.generate(ast);
};

module.exports = lib;
