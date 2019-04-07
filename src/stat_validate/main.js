import { validateExist } from './exist.js'
import { validateDir } from './dir.js'
import { validateSpecial } from './special.js'
import { validateStatFilter } from './stat_filter.js'

// Validate file path.
// Use `stat` information, i.e. from the actual file.
const statValidate = function(path, stat, opts) {
  STAT_VALIDATORS.forEach(validator => validator(path, stat, opts))
}

const STAT_VALIDATORS = [
  validateExist,
  validateDir,
  validateSpecial,
  validateStatFilter,
]

module.exports = {
  statValidate,
}
