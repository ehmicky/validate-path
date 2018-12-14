'use strict'

const assert = require('assert')

// If `opts.lowercase` `true`, validate that path is lowercase.
// Reason: Mac OS X is case-insensitive.
const validateLowerCase = function(path, { lowercase }) {
  if (!lowercase) {
    return
  }

  assert(isLowerCase(path), `Path should be lowercase: ${path}`)
}

const isLowerCase = function(string) {
  return string.toLowerCase() === string
}

module.exports = {
  validateLowerCase,
}
