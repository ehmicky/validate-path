'use strict'

const assert = require('assert')

const { pAccess, pStat } = require('./fs')

// Retrieve file information
const getStat = async function(path) {
  try {
    await pAccess(path)
    // Non-existing files have an `undefined` `stat`.
  } catch (error) {
    return
  }

  // Other errors should not happen, i.e. signals a bug in this library (it
  // should handle those error types too).
  const stat = await pStat(path)
  return stat
}

// Validate a file exists or not according to `opts.exist`, which can be
// `undefined` (default), `true` or `false`
const validateExist = function(path, stat, { exist }) {
  if (exist === undefined) {
    return
  }

  assert(!exist || stat !== undefined, `File does not exist: ${path}`)
  assert(exist || stat === undefined, `File already exists: ${path}`)
}

module.exports = {
  getStat,
  validateExist,
}
