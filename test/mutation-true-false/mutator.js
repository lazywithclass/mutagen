/*
*******
RUN ME WITH mocha mutator.js
*******
*/


var fs = require('fs-extra'),
    path = require('path'),
    acorn = require('acorn'),
    escodegen = require('escodegen'),
    esrecurse = require('esrecurse');

function parse(o) { return acorn.parse(o, { ranges: true }); }
function unparse(o) { return escodegen.generate(o); }

function mutateTrue(ast) {
  esrecurse.visit(ast, {
    Literal: function(node) {
      node.value = false;
    }
  });
}

var contents = fs.readFileSync('./source.js', 'utf8');
var ast = parse(contents);
mutateTrue(ast);
var mutant = unparse(ast);

var vm = require('vm');
var code = [
  fs.readFileSync('test.js', 'utf8'),
  'var Mocha = require(\'mocha\');',
  'new Mocha({',
  '  reporter: path.resolve(__dirname, \'reporter\')',
  '}).addFile(\'./test\').run()'
].join('\n');

var mock = require('mock-require');
mock('./source', eval(mutant));

global.module = module;
global.require = require;
global.path = path;
global.__dirname = __dirname;
new vm.Script(code).runInThisContext();
