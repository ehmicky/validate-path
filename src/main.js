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

// eslint-disable-next-line max-statements
const validatePath = async function(path, opts) {
  const optsA = getOptions({ opts })

  const pathA = addDefault(path, optsA)

  if (pathA === undefined) {
    return
  }

  const pathC = NORMALIZE.reduce(
    (pathB, normalizer) => normalizer(pathB, optsA),
    pathA,
  )

  CHECK.forEach(check => check(pathC, optsA))

  const stat = await getStat(pathC)

  VALIDATE.forEach(validate => validate(pathC, stat, optsA))

  await Promise.all(
    ASYNC_VALIDATE.map(validate => validate(pathC, stat, optsA)),
  )

  const pathG = await followSymlink(pathC, stat, optsA)
  return pathG
}

const NORMALIZE = [
  stringifyPath,
  normalizeFileUrl,
  resolveBase,
  normalizePlatform,
  stripSlash,
]

const CHECK = [checkInside, checkLowerCase, checkFilters]

const VALIDATE = [
  validateExist,
  validateDir,
  validateSpecial,
  validateStatFilter,
]

const ASYNC_VALIDATE = [validatePermissions]

module.exports = validatePath
