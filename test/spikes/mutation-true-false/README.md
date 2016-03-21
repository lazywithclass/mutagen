# mutation true -> false

Mutate a single `true` into a `false`

### What's this?

This is a spike that uses a simple true -> false mutation, it
uses Mocha as test framework.

The challenge is to run the modified test in memory without writing
to disk, so that we don't precious time. I did that by leveraging
the `vm` module and injecting Mocha's globals into the context.
