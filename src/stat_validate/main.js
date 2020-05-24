import { validateDir } from './dir.js'
import { validateExist } from './exist.js'
import { validateSpecial } from './special.js'
import { validateStatFilter } from './stat_filter.js'

// Validate file path.
// Use `stat` information, i.e. from the actual file.
export const statValidate = function (path, stat, opts) {
  STAT_VALIDATORS.forEach((validator) => {
    validator(path, stat, opts)
  })
}

const STAT_VALIDATORS = [
  validateExist,
  validateDir,
  validateSpecial,
  validateStatFilter,
]
