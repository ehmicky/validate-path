'use strict'

const {
  constants: { F_OK, R_OK, W_OK, X_OK },
} = require('fs')
const { umask: getUmask } = require('process')
const { dirname } = require('path')

const { pAccess, pStat } = require('../utils')

const checkPermissions = async function(path, flags) {
  const flagsA = flags.replace('c', '')

  const exists = await checkAccess(path, 'e')

  if (exists) {
    return checkAccess(path, flagsA)
  }

  if (flags === flagsA) {
    return false
  }

  const results = await Promise.all([
    canCreatePath(path),
    checkUmask(path, flagsA),
  ])
  return results.every(Boolean)
}

// Validate a file's permission
const checkAccess = async function(path, flags) {
  if (flags === '') {
    return true
  }

  const constants = getConstants(flags, ACCESS_CONSTANTS)

  try {
    await pAccess(path, constants)
    return true
  } catch (error) {
    return false
  }
}

// Checks if files created by current process can be executed, written or read
// by this process
const checkUmask = function(path, flags) {
  const constants = getConstants(flags, UMASK_CONSTANTS)

  const umask = getUmask()
  // eslint-disable-next-line no-bitwise
  return (umask & ~constants) === umask
}

const getConstants = function(flags, constants) {
  return flags
    .split('')
    .map(flag => constants[flag])
    .reduce(orConstants, 0)
}

const orConstants = function(constants, constant) {
  // eslint-disable-next-line no-bitwise
  return constants | constant
}

// eslint-disable-next-line id-length
const ACCESS_CONSTANTS = { e: F_OK, r: R_OK, w: W_OK, x: X_OK }

// eslint-disable-next-line id-length
const UMASK_CONSTANTS = { r: 0o400, w: 0o200, x: 0o100 }

const canCreatePath = async function(path) {
  const { parentStat, parentPath, isDirectParent } = await findParent(path)

  return (
    hasParentDir({ parentStat }) &&
    canCreateFile({ parentPath, isDirectParent })
  )
}

const hasParentDir = function({ parentStat }) {
  return parentStat !== undefined && parentStat.isDirectory()
}

const canCreateFile = function({ parentPath, isDirectParent }) {
  return (
    (isDirectParent || checkUmask(parentPath, 'wx')) &&
    checkAccess(parentPath, 'wx')
  )
}

const findParent = async function(path, isDirectParent = true) {
  const parentPath = dirname(path)

  // E.g. when pointing to a wrong root device on Windows
  if (parentPath === path) {
    return {}
  }

  try {
    const parentStat = await pStat(parentPath)
    return { parentStat, parentPath, isDirectParent }
  } catch (error) {
    return findParent(parentPath, false)
  }
}

module.exports = {
  checkPermissions,
}
