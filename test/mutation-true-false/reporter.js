function MutationReporter(runner, options) {
  runner
    .on('pass', function(test) {
      console.log('mutant survived');
    })
    .on('fail', function(test, err) {
      console.log('mutant killed');
    });
}

module.exports = MutationReporter;
