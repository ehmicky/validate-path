'use strict'

// Validate that the file is a directory or not according to `opts.dir`,
// which defaults to `undefined` (i.e. no validation)
const validateDir = function(path, stat, { dir }) {
  // If the file does not exist, we skip the check
  if (stat === undefined || dir === undefined) {
    return
  }

  const isDirectory = stat.isDirectory()
  checkDir({ dir, isDirectory, path })
  checkNonDir({ dir, isDirectory, path })
}

const checkDir = function({ dir, isDirectory, path }) {
  if (dir && !isDirectory) {
    throw new Error(`Path must be a directory: ${path}`)
  }
}

const checkNonDir = function({ dir, isDirectory, path }) {
  if (!dir && isDirectory) {
    throw new Error(`Path must not be a directory: ${path}`)
  }
}

module.exports = {
  validateDir,
}
