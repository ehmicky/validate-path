'use strict'

const { resolve } = require('path')

// Resolve relative paths according to `opts.base`
const resolveBase = function(path, { base }) {
  const pathA = resolve(base, path)
  return pathA
}

module.exports = {
  resolveBase,
}
