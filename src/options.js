'use strict'

const { validate } = require('jest-validate')

const { omitBy } = require('./utils')
const { getDefaultBase, getDefaultPlatform } = require('./path_normalize')
const {
  normalizeFilters,
  EXAMPLE_FILTER,
  isFilterOption,
} = require('./path_validate')

// Validate options and assign default options
// `validatePath.sync()` can only use sync options.
// `validatePath()` can use sync or async options.
const getOptions = function({ opts = {}, type }) {
  const optsA = normalizeFilters({ opts })

  validate(optsA, { exampleConfig: EXAMPLE_OPTS[type], condition })

  const optsB = omitBy(optsA, value => value === undefined)
  const optsC = { ...DEFAULT_OPTS[type], ...optsB }
  return optsC
}

// Used for validation + example + defaults
const SYNC_DEFAULT_OPTS = {
  base: getDefaultBase(),
  platform: getDefaultPlatform(),
  lowercase: false,
}

const ASYNC_DEFAULT_OPTS = {
  ...SYNC_DEFAULT_OPTS,
  followSymlinks: false,
  allowSpecial: false,
  canRead: true,
}

const DEFAULT_OPTS = { sync: SYNC_DEFAULT_OPTS, async: ASYNC_DEFAULT_OPTS }

// Used for validation + example, but not defaults
const SYNC_EXAMPLE_OPTS = {
  ...SYNC_DEFAULT_OPTS,
  defaultValue: '/home/user/exampleDir/',
  inside: true,
  filenameFilter: EXAMPLE_FILTER,
  pathFilter: EXAMPLE_FILTER,
}

const ASYNC_EXAMPLE_OPTS = {
  ...SYNC_EXAMPLE_OPTS,
  exist: false,
  dir: true,
  canWrite: true,
  canExecute: true,
  statFilter: () => true,
}

const EXAMPLE_OPTS = { sync: SYNC_EXAMPLE_OPTS, async: ASYNC_EXAMPLE_OPTS }

// This is the default `condition` from `jest-validate`, but with customize
// handling for `*Filter` options, because `jest-validate` does not handle
// polymorphism.
const condition = function(option, validOption) {
  return (
    option === null ||
    option === undefined ||
    getType.call(option) === getType.call(validOption) ||
    isFilterOption(option, validOption)
  )
}

const { toString: getType } = Object.prototype

module.exports = {
  getOptions,
}
