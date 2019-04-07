import { cwd } from 'process'
import { resolve } from 'path'

// Resolve relative paths according to `opts.base`
const resolveBase = function(path, { base }) {
  return resolve(base, path)
}

const getDefaultBase = cwd

module.exports = {
  resolveBase,
  getDefaultBase,
}
