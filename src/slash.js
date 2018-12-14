'use strict'

// Strip final slash
const stripSlash = function(path) {
  if (!path.endsWith('/')) {
    return path
  }

  return path.slice(0, -1)
}

module.exports = {
  stripSlash,
}
