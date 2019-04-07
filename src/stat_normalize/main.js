import { followSymlink } from './symlink.js'

// Normalize file path.
// Use `stat` information, i.e. from the actual file.
const statNormalize = function(path, stat, opts) {
  return ASYNC_STAT_NORMALIZERS.reduce(
    (pathA, normalizer) =>
      statNormalizeReduce({ path: pathA, normalizer, stat, opts }),
    path,
  )
}

const statNormalizeReduce = async function({ path, normalizer, stat, opts }) {
  const pathA = await path
  return normalizer(pathA, stat, opts)
}

const ASYNC_STAT_NORMALIZERS = [followSymlink]

module.exports = {
  statNormalize,
}
