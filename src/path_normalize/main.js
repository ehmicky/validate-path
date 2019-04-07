import { stringifyPath } from './stringify.js'
import { normalizeFileUrl } from './url.js'
import { resolveBase } from './base.js'
import { normalizePlatform } from './platform.js'
import { stripSlash } from './slash.js'

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
