var fs = require('fs'),
    acorn = require('acorn'),
    escodegen = require('escodegen');

function parse(o) { return acorn.parse(o, { ranges: true }); }
function unparse(o) { return escodegen.generate(o); }

var contents = fs.readFileSync('./source.js', 'utf8');
var parsed = parse(contents);
var unparsed = unparse(parsed);

var diff = require('diff');
require('colors');

diff.diffLines(contents, unparsed).forEach(function(part) {
  var color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
  console.log(part.value[color]);
});
