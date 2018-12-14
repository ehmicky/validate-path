'use strict'

// Add `opts.defaultValue`
const addDefault = function(path, { defaultValue }) {
  if (path) {
    return path
  }

  return defaultValue
}

module.exports = {
  addDefault,
}
