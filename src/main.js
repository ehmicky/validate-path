// eslint-disable-next-line filenames/match-exported
'use strict'

const { getOptions } = require('./options')
const { addDefault } = require('./default')
const { stringifyPath } = require('./stringify')
const { normalizeFileUrl } = require('./url')
const { validateInside } = require('./inside')
const { resolveBase } = require('./base')
const { normalizePlatform } = require('./platform')
const { stripSlash } = require('./slash')
const { validateLowerCase } = require('./lowercase')
const { validateFilters } = require('./filter')
const { getStat, validateExist } = require('./stat')
const { validateDir } = require('./dir')
const { validateSpecial } = require('./special')
// eslint-disable-next-line import/max-dependencies
const { validatePermissions } = require('./permissions')

// eslint-disable-next-line max-statements
const validatePath = async function(path, opts) {
  const optsA = getOptions({ opts })

  const pathA = addDefault(path, optsA)

  if (pathA === undefined) {
    return
  }

  const pathB = stringifyPath(pathA)
  const pathC = normalizeFileUrl(pathB)
  const pathD = resolveBase(pathC, optsA)
  validateInside(pathD, optsA)
  const pathE = normalizePlatform(pathD, optsA)
  const pathF = stripSlash(pathE)
  validateLowerCase(pathF, optsA)
  validateFilters(pathF, optsA)

  const stat = await getStat(pathF)
  validateExist(pathF, stat, optsA)
  validateDir(pathF, stat, optsA)
  validateSpecial(pathF, stat, optsA)
  await validatePermissions(pathF, stat, optsA)
  return pathF
}

module.exports = validatePath
