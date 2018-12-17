'use strict'

const { validateExist } = require('./exist')
const { validateDir } = require('./dir')
const { validateSpecial } = require('./special')
const { validateStatFilter } = require('./stat_filter')
const { validatePermissions } = require('./permissions')

// Validate file path.
// Use `stat` information, i.e. from the actual file.
const statValidate = async function(path, stat, opts) {
  STAT_VALIDATORS.forEach(validator => validator(path, stat, opts))

  await Promise.all(
    ASYNC_STAT_VALIDATORS.map(validator => validator(path, stat, opts)),
  )
}

const STAT_VALIDATORS = [
  validateExist,
  validateDir,
  validateSpecial,
  validateStatFilter,
]

const ASYNC_STAT_VALIDATORS = [validatePermissions]

module.exports = {
  statValidate,
}
