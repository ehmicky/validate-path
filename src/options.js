'use strict'

const { cwd } = require('process')

const { validate } = require('jest-validate')

const { omitBy } = require('./utils')

// Validate options and assign default options
const getOptions = function({ opts = {} }) {
  validate(opts, { exampleConfig: EXAMPLE_OPTS })

  const optsA = omitBy(opts, value => value === undefined)
  const optsB = { ...DEFAULT_OPTS, ...optsA }
  return optsB
}

const DEFAULT_OPTS = {
  base: cwd(),
}

const EXAMPLE_OPTS = {
  ...DEFAULT_OPTS,
  defaultValue: '/home/user/exampleDir/',
}

module.exports = {
  getOptions,
}
