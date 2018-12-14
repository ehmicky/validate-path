// eslint-disable-next-line filenames/match-exported
'use strict'

const { getOptions } = require('./options')
const { addDefault } = require('./default')
const { normalizeType } = require('./type')
const { normalizeFileUrl } = require('./url')

const validatePath = function(path, opts) {
  const optsA = getOptions({ opts })

  const pathA = addDefault(path, optsA)

  if (pathA === undefined) {
    return
  }

  const pathB = normalizeType(pathA)
  const pathC = normalizeFileUrl(pathB)
  return pathC
}

module.exports = validatePath
