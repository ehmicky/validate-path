import { pStat } from './utils/fs.js'

// Retrieve file information
export const getStat = async function(path) {
  // Other errors should not happen, i.e. signals a bug in this library (it
  // should handle those error types too).
  try {
    const stat = await pStat(path)
    return stat
  } catch (error) {
    eGetStat({ error })
  }
}

const eGetStat = function({ error, error: { type } }) {
  // Non-existing files have an `undefined` `stat`.
  if (type === 'ENOENT') {
    return
  }

  throw error
}
