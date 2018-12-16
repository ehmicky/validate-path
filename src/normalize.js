'use strict'

const { stringifyPath } = require('./stringify')
const { normalizeFileUrl } = require('./url')
const { resolveBase } = require('./base')
const { normalizePlatform } = require('./platform')
const { stripSlash } = require('./slash')

// Normalize file path.
// File path might point to non-existing file.
const normalize = function(path, opts) {
  return NORMALIZERS.reduce(
    (pathA, normalizer) => normalizer(pathA, opts),
    path,
  )
}

const NORMALIZERS = [
  stringifyPath,
  normalizeFileUrl,
  resolveBase,
  normalizePlatform,
  stripSlash,
]

module.exports = {
  normalize,
}
