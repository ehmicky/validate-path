'use strict'

const { validate } = require('jest-validate')

const { omitBy } = require('./utils')
const { getDefaultBase } = require('./base')
const { getDefaultPlatform } = require('./platform')
const { normalizeFilters, EXAMPLE_FILTER, isFilterOption } = require('./filter')

// Validate options and assign default options
const getOptions = function({ opts = {} }) {
  const optsA = normalizeFilters({ opts })

  validate(optsA, { exampleConfig: EXAMPLE_OPTS, condition })

  const optsB = omitBy(optsA, value => value === undefined)
  const optsC = { ...DEFAULT_OPTS, ...optsB }
  return optsC
}

const DEFAULT_OPTS = {
  base: getDefaultBase(),
  platform: getDefaultPlatform(),
  lowercase: false,
}

const EXAMPLE_OPTS = {
  ...DEFAULT_OPTS,
  defaultValue: '/home/user/exampleDir/',
  inside: true,
  filenameFilter: EXAMPLE_FILTER,
  pathFilter: EXAMPLE_FILTER,
}

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
