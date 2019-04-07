import { Buffer } from 'buffer'

import { isFileUrl, FILE_PROTOCOL } from './url.js'

const { isBuffer } = Buffer

// Normalize path to string. Can be buffer or `file://` URL.
export const stringifyPath = function(path) {
  if (isBuffer(path)) {
    return path.toString()
  }

  if (isFileUrl(path)) {
    return path.toString()
  }

  validatePath({ path })

  return path
}

const validatePath = function({ path }) {
  if (typeof path !== 'string') {
    throw new TypeError(
      `Path must be a string, a buffer or a '${FILE_PROTOCOL}//' URL: ${path}`,
    )
  }

  if (path.trim() === '') {
    throw new Error('Path must not be empty')
  }
}
