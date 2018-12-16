'use strict'

const { getOptions } = require('./options')
const { addDefault } = require('./default')
const { normalize } = require('./normalize')
const { checkInside } = require('./inside')
const { checkLowerCase } = require('./lowercase')
const { checkFilters } = require('./filter')
const { getStat, validateExist } = require('./stat')
const { validateDir } = require('./dir')
const { validateSpecial } = require('./special')
const { validatePermissions } = require('./permissions')
const { validateStatFilter } = require('./stat_filter')
const { followSymlink } = require('./symlink')

const validatePath = async function(path, opts) {
  const optsA = getOptions({ opts })

  const pathA = check(path, optsA)

  if (pathA === undefined) {
    return
  }

  const stat = await getStat(pathA)

  await doValidators(pathA, stat, optsA)

  const pathB = await followSymlink(pathA, stat, optsA)
  return pathB
}

const checkPath = function(path, opts) {
  const optsA = getOptions({ opts })
  const pathA = check(path, optsA)
  return pathA
}

const check = function(path, opts) {
  const pathA = addDefault(path, opts)

  if (pathA === undefined) {
    return
  }

  const pathB = normalize(pathA, opts)

  doCheckers(pathB, opts)

  return pathB
}

const doCheckers = function(path, opts) {
  CHECKERS.forEach(checker => checker(path, opts))
}

const CHECKERS = [checkInside, checkLowerCase, checkFilters]

const doValidators = async function(path, stat, opts) {
  VALIDATORS.forEach(validator => validator(path, stat, opts))

  await Promise.all(
    ASYNC_VALIDATORS.map(validate => validate(path, stat, opts)),
  )
}

const VALIDATORS = [
  validateExist,
  validateDir,
  validateSpecial,
  validateStatFilter,
]

const ASYNC_VALIDATORS = [validatePermissions]

module.exports = {
  validatePath,
  checkPath,
}
