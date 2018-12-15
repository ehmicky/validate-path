// eslint-disable-next-line filenames/match-exported
'use strict'

const { getOptions } = require('./options')
const { addDefault } = require('./default')
const { stringifyPath } = require('./stringify')
const { normalizeFileUrl } = require('./url')
const { resolveBase } = require('./base')
const { normalizePlatform } = require('./platform')
const { stripSlash } = require('./slash')
const { checkInside } = require('./inside')
const { checkLowerCase } = require('./lowercase')
const { checkFilters } = require('./filter')
const { getStat, validateExist } = require('./stat')
const { validateDir } = require('./dir')
const { validateSpecial } = require('./special')
const { validatePermissions } = require('./permissions')
const { validateStatFilter } = require('./stat_filter')
// eslint-disable-next-line import/max-dependencies
const { followSymlink } = require('./symlink')

const validatePath = async function(path, opts) {
  const optsA = getOptions({ opts })

  const pathA = normalize(path, optsA)

  if (pathA === undefined) {
    return
  }

  doCheck(pathA, optsA)

  const stat = await getStat(pathA)

  await doValidate(pathA, stat, optsA)

  const pathB = await followSymlink(pathA, stat, optsA)
  return pathB
}

const normalize = function(path, opts) {
  const pathA = addDefault(path, opts)

  if (pathA === undefined) {
    return
  }

  return NORMALIZE.reduce((pathB, normalizer) => normalizer(pathB, opts), pathA)
}

const NORMALIZE = [
  stringifyPath,
  normalizeFileUrl,
  resolveBase,
  normalizePlatform,
  stripSlash,
]

const doCheck = function(path, opts) {
  CHECK.forEach(check => check(path, opts))
}

const CHECK = [checkInside, checkLowerCase, checkFilters]

const doValidate = async function(path, stat, opts) {
  VALIDATE.forEach(validate => validate(path, stat, opts))

  await Promise.all(ASYNC_VALIDATE.map(validate => validate(path, stat, opts)))
}

const VALIDATE = [
  validateExist,
  validateDir,
  validateSpecial,
  validateStatFilter,
]

const ASYNC_VALIDATE = [validatePermissions]

module.exports = validatePath
