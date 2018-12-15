'use strict'

const { constants, access } = require('fs')
const assert = require('assert')

const promisify = require('util.promisify')

const pAccess = promisify(access)

// Validate file permissions according to `opts.canRead|canWrite|canExecute`
// `undefined`, `true` or `false`
const validatePermissions = async function(path, stat, opts) {
  if (stat === undefined) {
    return
  }

  const promises = PERMISSIONS.map(permission =>
    validatePermission({ ...permission, path, opts }),
  )
  await Promise.all(promises)
}

const PERMISSIONS = [
  { optName: 'canRead', constant: 'R_OK', name: 'readable' },
  { optName: 'canWrite', constant: 'W_OK', name: 'writable' },
  { optName: 'canExecute', constant: 'X_OK', name: 'executable' },
]

const validatePermission = async function({
  optName,
  constant,
  name,
  path,
  opts: { [optName]: opt },
}) {
  if (opt === undefined) {
    return
  }

  const permission = await checkPermission({ path, constant })
  assert(!opt || permission, `File must be ${name}: ${path}`)
  assert(opt || !permission, `File must not be ${name}: ${path}`)
}

const checkPermission = async function({ path, constant }) {
  try {
    await pAccess(path, constants[constant])
    return true
  } catch (error) {
    return false
  }
}

module.exports = {
  validatePermissions,
}
