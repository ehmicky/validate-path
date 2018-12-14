'use strict'

const assert = require('assert')

const { omitBy } = require('../utils')

const parseConfig = function({ yargs }) {
  const {
    // eslint-disable-next-line id-length
    _: [path, ...extra],
    ...config
  } = yargs.parse()
  const configA = { ...config, path }

  assert(extra.length === 0, `Too many arguments: ${extra.join(' ')}`)

  const configB = omitBy(configA, isInternalKey)
  return configB
}

// Remove `yargs`-specific options, shortcuts and dash-cased
const isInternalKey = function(key) {
  return INTERNAL_KEYS.includes(key) || key.length === 1 || key.includes('-')
}

const INTERNAL_KEYS = ['help', 'version', '_', '$0']

module.exports = {
  parseConfig,
}
