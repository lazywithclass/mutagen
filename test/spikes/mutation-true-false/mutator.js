/*
*******
RUN ME WITH mocha mutator.js
*******
*/

var fs = require('fs-extra'),
    path = require('path'),
    acorn = require('acorn'),
    escodegen = require('escodegen'),
    vm = require('vm'),
    mockRequire = require('mock-require'),
    trueToFalse = require('../../../lib/mutators/true-to-false'),
    code = require('../../../lib/code');

var contents = fs.readFileSync('./source.js', 'utf8'),
    ast = code.asAst(contents),
    mutant = code.asString(trueToFalse.mutants(ast)[0]);

mockRequire('./source', eval(mutant));

global.module = module;
global.require = require;
global.path = path;
global.__dirname = __dirname;
new vm.Script([
  fs.readFileSync('test.js', 'utf8'),
  'var Mocha = require(\'mocha\');',
  'new Mocha({',
  '  reporter: path.resolve(__dirname, \'reporter\')',
  '}).addFile(\'./test\').run()'
].join('\n')).runInThisContext();
