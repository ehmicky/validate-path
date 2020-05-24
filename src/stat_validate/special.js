// Validate that the file is not a special file if `opts.allowSpecial` `false`
// (default).
export const validateSpecial = function (path, stat, { allowSpecial }) {
  // If the file does not exist, we skip the check
  if (stat === undefined || allowSpecial) {
    return
  }

  SPECIAL_TYPES.forEach(({ func, name }) => {
    validateSpecialType({ func, name, stat, path })
  })
}

const validateSpecialType = function ({ func, name, stat, path }) {
  if (stat[func]()) {
    throw new Error(`Path must not be a ${name}: ${path}`)
  }
}

const SPECIAL_TYPES = [
  { func: 'isBlockDevice', name: 'block device' },
  { func: 'isCharacterDevice', name: 'character device' },
  { func: 'isFIFO', name: 'FIFO' },
  { func: 'isSocket', name: 'socket' },
]
