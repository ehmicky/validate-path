import { handleSync, handleAsync } from './handle.js'
import { getOptions, assertOpts } from './options.js'
import { isObject, mapValues, asyncMapValues } from './utils/functional.js'

// Validate and normalize a path.
// Only checks the path string, i.e. does not check if file exists.
// We are not validating file permissions, because Node.js does not allow
// doing this out-of-the-box on Windows.
const validatePathSync = function (path, opts = {}) {
  assertOpts({ opts })

  if (typeof path === 'string') {
    return validateStringSync(path, opts)
  }

  if (Array.isArray(path)) {
    return validateArraySync(path, opts)
  }

  if (isObject(path)) {
    return validateObjectSync(path, opts)
  }

  wrongPath({ path })
}

// Validate and normalize a path.
// Also checks if the file exists, etc.
const validatePath = function (path, opts = {}) {
  assertOpts({ opts })

  if (typeof path === 'string') {
    return validateStringAsync(path, opts)
  }

  if (Array.isArray(path)) {
    return validateArrayAsync(path, opts)
  }

  if (isObject(path)) {
    return validateObjectAsync(path, opts)
  }

  wrongPath({ path })
}

// eslint-disable-next-line fp/no-mutation
validatePath.sync = validatePathSync

const wrongPath = function ({ path }) {
  throw new Error(
    `Path argument must be a string, an array or an object: ${path}`,
  )
}

// Input paths can have three shapes:
//  - a single `string` path
//  - an array of `string` paths
//  - an object where the values are `string` paths.
//    In that case, the `opts` will be an object where the keys match the paths
//    keys, and the values are specific options for each path.
const validateObjectSync = function (paths, opts) {
  return mapValues(paths, (path, name) => validateStringSync(path, opts[name]))
}

const validateObjectAsync = function (paths, opts) {
  return asyncMapValues(paths, (path, name) =>
    validateStringAsync(path, opts[name]),
  )
}

const validateArraySync = function (paths, opts) {
  const optsA = getOptions({ opts, type: 'sync' })
  const pathsA = paths.map((path) => handleSync(path, optsA))
  return pathsA
}

const validateArrayAsync = async function (paths, opts) {
  const optsA = getOptions({ opts, type: 'async' })
  const pathsA = await Promise.all(
    paths.map((path) => handleAsync(path, optsA)),
  )
  return pathsA
}

const validateStringSync = function (path, opts) {
  const optsA = getOptions({ opts, type: 'sync' })
  const pathA = handleSync(path, optsA)
  return pathA
}

const validateStringAsync = async function (path, opts) {
  const optsA = getOptions({ opts, type: 'async' })
  const pathA = await handleAsync(path, optsA)
  return pathA
}

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = validatePath
