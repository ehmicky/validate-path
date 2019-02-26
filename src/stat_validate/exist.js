'use strict'

// Validate a file exists or not according to `opts.exist`, which can be
// `undefined` (default), `true` or `false`
const validateExist = function(path, stat, { exist }) {
  if (exist === undefined) {
    return
  }

  checkFile({ exist, stat, path })
  checkNonFile({ exist, stat, path })
}

const checkFile = function({ exist, stat, path }) {
  if (exist && stat === undefined) {
    throw new Error(`File does not exist: ${path}`)
  }
}

const checkNonFile = function({ exist, stat, path }) {
  if (!exist && stat !== undefined) {
    throw new Error(`File already exists: ${path}`)
  }
}

module.exports = {
  validateExist,
}
