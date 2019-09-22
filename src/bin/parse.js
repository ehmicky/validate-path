import filterObj from 'filter-obj'

export const parseConfig = function({ yargs }) {
  const { _: paths, ...config } = yargs.parse()

  if (paths.length === 0) {
    throw new Error('Missing path argument')
  }

  const configA = { ...config, paths }

  const configB = filterObj(configA, isUserOpt)
  return configB
}

// Remove `yargs`-specific options, shortcuts and dash-cased
const isUserOpt = function(key, value) {
  return (
    value !== undefined &&
    !INTERNAL_KEYS.includes(key) &&
    key.length !== 1 &&
    !key.includes('-')
  )
}

const INTERNAL_KEYS = ['help', 'version', '_', '$0']
