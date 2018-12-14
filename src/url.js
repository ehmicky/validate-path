'use strict'

// We do not use the global variable to make it work on Node 7-9
// eslint-disable-next-line node/prefer-global/url, no-shadow
const { URL } = require('url')

// Check input is a `file://` URL
const isFileUrl = function(url) {
  return supportsUrl() && url instanceof URL && url.protocol === FILE_PROTOCOL
}

// Normalize `file://` string to a path
const normalizeFileUrl = function(path) {
  if (!path.startsWith(FILE_PROTOCOL) || !supportsUrl()) {
    return path
  }

  try {
    const { pathname } = new URL(path)
    return decodeURI(pathname)
  } catch (error) {
    throw new Error(`Invalid '${FILE_PROTOCOL}//' URL: ${error.message}`)
  }
}

const FILE_PROTOCOL = 'file:'

// Node 6 does not support `URL`
// TODO: use core-js `url` once Babel upgrade to core-js 3
const supportsUrl = function() {
  return URL !== undefined
}

module.exports = {
  isFileUrl,
  normalizeFileUrl,
  FILE_PROTOCOL,
}
