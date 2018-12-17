// eslint-disable-next-line filenames/match-exported
'use strict'

const { getOptions } = require('./options')
const { pathNormalize, addDefault } = require('./path_normalize')
const { pathValidate } = require('./path_validate')
const { getStat } = require('./stat')
const { statValidate } = require('./stat_validate')
const { statNormalize } = require('./stat_normalize')

// Validate and normalize a path.
// Only checks the path string, i.e. does not check if file exists.
const validatePathSync = function(path, opts) {
  const optsA = getOptions({ opts, type: 'sync' })
  const pathA = handlePath(path, optsA)
  return pathA
}

// Validate and normalize a path.
// Also checks if the file exists, its permissions, etc.
const validatePath = async function(path, opts) {
  const optsA = getOptions({ opts, type: 'async' })
  const pathA = handlePath(path, optsA)

  if (pathA === undefined) {
    return
  }

  const pathB = await handleStat(pathA, optsA)
  return pathB
}

// eslint-disable-next-line fp/no-mutation
validatePath.sync = validatePathSync

// Validation/normalization that does not use `stat`
const handlePath = function(path, opts) {
  const pathA = addDefault(path, opts)

  // If path was `undefined` and no `opts.defaultValue` was defined,
  // we return `undefined`
  if (pathA === undefined) {
    return
  }

  const pathB = pathNormalize(pathA, opts)

  pathValidate(pathB, opts)

  return pathB
}

// Validation/normalization that use `stat`
const handleStat = async function(path, opts) {
  const stat = await getStat(path)

  await statValidate(path, stat, opts)

  const pathA = await statNormalize(path, stat, opts)
  return pathA
}

module.exports = validatePath
