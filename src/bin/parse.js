import { omitBy } from '../utils.js'

const parseConfig = function({ yargs }) {
  // eslint-disable-next-line id-length
  const { _: paths, ...config } = yargs.parse()

  if (paths.length === 0) {
    throw new Error('Missing path argument')
  }

  const configA = { ...config, paths }

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
