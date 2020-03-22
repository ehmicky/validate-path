import { pathNormalize } from './path_normalize/main.js'
import { addDefault } from './path_normalize/default.js'
import { pathValidate } from './path_validate/main.js'
import { getStat } from './stat.js'
import { statValidate } from './stat_validate/main.js'
import { statNormalize } from './stat_normalize/main.js'

// Validation/normalization that does not use `stat`
export const handleSync = function (path, opts) {
  const pathA = addDefault(path, opts)

  // If path was `undefined` and no `opts.defaultValue` was defined,
  // we return `undefined`.
  // Works if several paths were passed as input (object or array), but not if
  // a single path was passed.
  if (pathA === undefined) {
    return
  }

  const pathB = pathNormalize(pathA, opts)

  pathValidate(pathB, opts)

  return pathB
}

// Validation/normalization that use `stat`
export const handleAsync = async function (path, opts) {
  const pathA = handleSync(path, opts)

  if (pathA === undefined) {
    return
  }

  const stat = await getStat(pathA)

  statValidate(pathA, stat, opts)

  const pathB = await statNormalize(pathA, stat, opts)
  return pathB
}
