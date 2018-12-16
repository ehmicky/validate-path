'use strict'

const assert = require('assert')

const validateFilterFunc = function({ filter, value, name, path }) {
  const message = filter(value)

  if (typeof message === 'string') {
    throw new TypeError(`${message}: ${path}`)
  }

  assert(Boolean(message), `Path must match ${name}: ${path}`)
}

const validateFilterRegExp = function({ filter, value, name, path }) {
  assert(
    filter.test(value),
    `Path must match ${name} '${filter.source}': ${path}`,
  )
}

module.exports = {
  validateFilterFunc,
  validateFilterRegExp,
}
