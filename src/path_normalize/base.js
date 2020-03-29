import { resolve } from 'path'
import { cwd } from 'process'

// Resolve relative paths according to `opts.base`
export const resolveBase = function (path, { base }) {
  return resolve(base, path)
}

export const getDefaultBase = cwd
