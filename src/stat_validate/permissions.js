'use strict'

const assert = require('assert')

const { checkPermissions } = require('./permissions_util')

// Validate file permissions according to `opts.canRead|canWrite|canExecute`
// `undefined`, `true` or `false`
const validatePermissions = async function(path, stat, opts) {
  const promises = PERMISSIONS.map(permission =>
    validatePermission({ ...permission, path, stat, opts }),
  )
  await Promise.all(promises)
}

const PERMISSIONS = [
  { optName: 'canCreate', flags: 'c', name: 'creatable' },
  { optName: 'canRead', flags: 'r', name: 'readable' },
  { optName: 'canWrite', flags: 'w', name: 'writable' },
  { optName: 'canExecute', flags: 'x', name: 'executable' },
]

const validatePermission = async function({
  optName,
  flags,
  name,
  path,
  stat,
  opts: { [optName]: opt, canCreate },
}) {
  if (opt === undefined) {
    return
  }

  const flagsA = addCreateFlag({ canCreate, flags, stat })
  const permission = await checkPermissions(path, flagsA)

  assert(!opt || permission, `File must be ${name}: ${path}`)
  assert(opt || !permission, `File must not be ${name}: ${path}`)
}

const addCreateFlag = function({ canCreate, flags, stat }) {
  if (!canCreate || stat !== undefined || flags.includes('c')) {
    return flags
  }

  return `${flags}c`
}

module.exports = {
  validatePermissions,
}
