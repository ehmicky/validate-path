const { stringifyPath } = require('./stringify')
const { normalizeFileUrl } = require('./url')
const { resolveBase } = require('./base')
const { normalizePlatform } = require('./platform')
const { stripSlash } = require('./slash')

// Normalize file path.
// Only normalize the path string, i.e. does not check if file exists.
const pathNormalize = function(path, opts) {
  return PATH_NORMALIZERS.reduce(
    (pathA, normalizer) => normalizer(pathA, opts),
    path,
  )
}

const PATH_NORMALIZERS = [
  stringifyPath,
  normalizeFileUrl,
  resolveBase,
  normalizePlatform,
  stripSlash,
]

module.exports = {
  pathNormalize,
}
