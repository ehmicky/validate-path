import { validate } from 'jest-validate'

import { handleSync } from './handle.js'
import { getDefaultBase } from './path_normalize/base.js'
import { getDefaultPlatform } from './path_normalize/platform.js'
import {
  normalizeFilters,
  EXAMPLE_FILTER,
  isFilterOption,
} from './path_validate/path_filter.js'
import { omitBy, isObject, mapValues } from './utils/functional.js'

// Validate options and assign default options
// `validatePath.sync()` can only use sync options.
// `validatePath()` can use sync or async options.
export const getOptions = function({ opts = {}, type }) {
  assertOpts({ opts })

  const optsA = normalizeFilters({ opts })

  validate(optsA, { exampleConfig: EXAMPLE_OPTS[type], condition })

  const optsB = omitBy(optsA, value => value === undefined)
  const optsC = { ...DEFAULT_OPTS[type], ...optsB }

  const optsD = handleOpts({ opts: optsC })
  return optsD
}

export const assertOpts = function({ opts }) {
  if (!isObject(opts)) {
    throw new Error(`Options argument must be an object: ${opts}`)
  }
}

// Used for validation + example + defaults
const SYNC_DEFAULT_OPTS = {
  base: getDefaultBase(),
  platform: getDefaultPlatform(),
}

const ASYNC_DEFAULT_OPTS = {
  ...SYNC_DEFAULT_OPTS,
  followSymlinks: false,
  allowSpecial: false,
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

// Some options are paths themselves, i.e. need to be recursively validated
// by this library itself.
// We use `handleSync()` not `handleAsync()` so it works for sync as well.
const handleOpts = function({ opts }) {
  const optsOpts = mapValues(OPTS_OPTS, (optOpts, name) =>
    handleOpt({ opts, optOpts, name }),
  )
  return { ...opts, ...optsOpts }
}

const handleOpt = function({ opts, optOpts, name }) {
  try {
    return handleSync(opts[name], optOpts)
  } catch (error) {
    throw new Error(`Invalid option '${name}': ${error.message}`)
  }
}

const OPTS_OPTS = { base: {}, defaultValue: {} }
