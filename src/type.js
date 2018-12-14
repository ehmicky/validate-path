'use strict'

const assert = require('assert')
const {
  Buffer: { isBuffer },
} = require('buffer')

const { isFileUrl, FILE_PROTOCOL } = require('./url')

// Normalize path to string. Can be buffer or `file://` URL.
const normalizeType = function(path) {
  if (isBuffer(path)) {
    return path.toString()
  }

  if (isFileUrl(path)) {
    return path.toString()
  }

  assert(
    typeof path === 'string',
    `Path must be a string, a buffer or a '${FILE_PROTOCOL}//' URL: ${path}`,
  )

  return path
}

module.exports = {
  normalizeType,
}
