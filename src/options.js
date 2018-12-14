'use strict'

const { validate } = require('jest-validate')

const { omitBy } = require('./utils')
const { getDefaultBase } = require('./base')
const { getDefaultPlatform } = require('./platform')

// Validate options and assign default options
const getOptions = function({ opts = {} }) {
  validate(opts, { exampleConfig: EXAMPLE_OPTS })

  const optsA = omitBy(opts, value => value === undefined)
  const optsB = { ...DEFAULT_OPTS, ...optsA }
  return optsB
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
}

module.exports = {
  getOptions,
}
