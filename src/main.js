// eslint-disable-next-line filenames/match-exported
'use strict'

const { getOptions } = require('./options')
const { addDefault } = require('./default')
const { normalizeType } = require('./type')
const { normalizeFileUrl } = require('./url')
const { resolveBase } = require('./base')

const validatePath = function(path, opts) {
  const optsA = getOptions({ opts })

  const pathA = addDefault(path, optsA)

  if (pathA === undefined) {
    return
  }

  const pathB = normalizeType(pathA)
  const pathC = normalizeFileUrl(pathB)
  const pathD = resolveBase(pathC, optsA)
  return pathD
}

module.exports = validatePath
