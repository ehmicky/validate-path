'use strict'

const { omitBy } = require('../utils')

const parseConfig = function({ yargs }) {
  const {
    // eslint-disable-next-line id-length
    _: [range],
    ...config
  } = yargs.parse()
  const configA = addRange({ config, range })

  const configB = omitBy(configA, isInternalKey)
  return configB
}

const addRange = function({ config, range }) {
  if (range === undefined) {
    return config
  }

  return { ...config, range: String(range) }
}

// Remove `yargs`-specific options and shortcuts
const isInternalKey = function(key) {
  return INTERNAL_KEYS.includes(key) || key.length === 1
}

const INTERNAL_KEYS = ['help', 'version', '_', '$0']

module.exports = {
  parseConfig,
}
