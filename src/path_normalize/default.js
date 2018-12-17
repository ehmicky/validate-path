'use strict'

// Add `opts.defaultValue`
const addDefault = function(path, { defaultValue }) {
  if (path === undefined) {
    return defaultValue
  }

  return path
}

module.exports = {
  addDefault,
}
