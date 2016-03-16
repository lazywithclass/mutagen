# parse unparse parse

This is needed to make sure the tools used are predictable in their usage.

### Idea

#### First step

Take a simple input file, then:

1. parse it
2. unparse it
3. compare the result of step 2 with the original content
4. ensure they are the same


#### Self parse

Take acorn source code and parse that
