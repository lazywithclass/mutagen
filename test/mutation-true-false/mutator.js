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

fs.copySync('source.js', 'source.js.original');
fs.writeFileSync('source.js', mutant, 'utf8');

var Mocha = require('mocha');
new Mocha({
  reporter: path.resolve(__dirname, 'reporter')
}).addFile('./test').run()
  .on('end', function() {
    fs.move('source.js.original', 'source.js', { clobber: true }, function() {});
  });
