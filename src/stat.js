'use strict'

const { pAccess, pStat } = require('./utils')

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

module.exports = {
  getStat,
}
