'use strict'

const { getOptions } = require('./options')
const { pathNormalize, addDefault } = require('./path_normalize')
const { pathValidate } = require('./path_validate')
const { getStat } = require('./stat')
const { statValidate } = require('./stat_validate')
const { statNormalize } = require('./stat_normalize')

// Validate and normalize a path.
// Only checks the path string, i.e. does not check if file exists.
const checkPath = function(path, opts) {
  const { path: pathA } = beforeStat(path, opts)
  return pathA
}

// Validate and normalize a path.
// Also checks if the file exists, its permissions, etc.
const validatePath = async function(path, opts) {
  const { opts: optsA, path: pathA } = beforeStat(path, opts)

  if (pathA === undefined) {
    return
  }

  const pathB = await afterStat(pathA, optsA)
  return pathB
}

// Validation/normalization that does not use `stat`
const beforeStat = function(path, opts) {
  const optsA = getOptions({ opts })

  const pathA = addDefault(path, opts)

  // If path was `undefined` and no `opts.defaultValue` was defined,
  // we return `undefined`
  if (pathA === undefined) {
    return { opts: optsA }
  }

  const pathB = pathNormalize(pathA, opts)

  pathValidate(pathB, opts)

  return { opts: optsA, path: pathB }
}

// Validation/normalization that use `stat`
const afterStat = async function(path, opts) {
  const stat = await getStat(path)

  await statValidate(path, stat, opts)

  const pathA = await statNormalize(path, stat, opts)
  return pathA
}

module.exports = {
  checkPath,
  validatePath,
}
