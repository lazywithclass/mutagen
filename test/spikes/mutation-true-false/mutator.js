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

addMochaGlobals(global);

global.module = module;
global.require = require;
global.path = path;
global.__dirname = __dirname;
new vm.Script([
  fs.readFileSync('test.js', 'utf8'),
  'mocha.run()'
].join('\n')).runInThisContext();

function addMochaGlobals(global) {
  var Mocha = require('mocha');
  var mocha = new Mocha({ reporter: 'reporter' });
  var mochaContext = {};
  mocha.suite.emit('pre-require', mochaContext, null, mocha);
  Object.keys(mochaContext).forEach(function(key) {
    global[key] = mochaContext[key];
  });
  global.mocha = mocha;
}
