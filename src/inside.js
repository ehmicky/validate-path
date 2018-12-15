'use strict'

const assert = require('assert')
const { relative } = require('path')

const checkInside = function(path, { inside, base }) {
  if (inside === undefined) {
    return
  }

  const pathToBase = relative(base, path)
  const isOutside = pathToBase.startsWith('..')

  assert(
    inside !== isOutside,
    `Path must be ${INSIDE[inside]} its base directory '${base}': ${path}`,
  )
}

const INSIDE = {
  true: 'inside',
  false: 'outside',
}

module.exports = {
  checkInside,
}
