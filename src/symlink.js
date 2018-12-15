'use strict'

const { pRealpath } = require('./fs')

const followSymlink = async function(path, stat, { followSymlinks }) {
  if (stat === undefined || !followSymlinks) {
    return path
  }

  const pathA = await pRealpath(path, 'utf-8')
  return pathA
}

module.exports = {
  followSymlink,
}
