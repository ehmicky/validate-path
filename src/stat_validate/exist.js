'use strict'

const assert = require('assert')

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
  validateExist,
}
