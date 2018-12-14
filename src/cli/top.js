'use strict'

const yargs = require('yargs')

const defineCli = function() {
  return yargs
    .options(CONFIG)
    .usage(USAGE)
    .example(MAIN_EXAMPLE, 'Validate and normalize a file path')
    .help()
    .version()
    .strict()
}

const CONFIG = {
  'default-value': {
    string: true,
    alias: 'd',
    describe: 'Path default value',
  },
  base: {
    string: true,
    alias: 'b',
    describe: 'Base directory to resolve relative paths',
  },
}

const USAGE = `$0 [OPTS] PATH

File path validation and normalization.`

const MAIN_EXAMPLE = '$0'

module.exports = {
  defineCli,
}
