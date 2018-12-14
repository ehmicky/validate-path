'use strict'

const { cwd } = require('process')
const { resolve } = require('path')

// Resolve relative paths according to `opts.base`
const resolveBase = function(path, { base }) {
  return resolve(base, path)
}

const getDefaultBase = cwd

module.exports = {
  resolveBase,
  getDefaultBase,
}
