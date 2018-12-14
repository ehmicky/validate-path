'use strict'

const yargs = require('yargs')

const defineCli = function() {
  return yargs
    .options(CONFIG)
    .usage(USAGE)
    .example(MAIN_EXAMPLE, 'Retrieve versions supported by your package')
    .example(LTS_EXAMPLE, 'Retrieve LTS versions supported by your package')
    .example(
      RANGE_EXAMPLE,
      'Retrieve versions to cover a specific semver range',
    )
    .help()
    .version()
    .strict()
}

const CONFIG = {
  lts: {
    boolean: true,
    alias: 'l',
    describe: 'Only keep LTS versions. Defaults to false.',
  },
  deprecated: {
    boolean: true,
    alias: 'd',
    describe: 'Do not skip deprecated versions. Defaults to false',
  },
  cwd: {
    string: true,
    alias: 'c',
    describe:
      "Current directory. Used to retrieve the current package.json's 'engines.node' field.",
  },
}

const USAGE = `$0 [OPTS] [SEMVER]

Get the Node.js versions supported by your package.
SEMVER defaults to the current package.json's 'engines.node' field.`

const MAIN_EXAMPLE = '$0'
const LTS_EXAMPLE = '$0 --lts'
const RANGE_EXAMPLE = '$0 ">6 <11"'

module.exports = {
  defineCli,
}
