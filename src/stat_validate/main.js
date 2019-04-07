const { validateExist } = require('./exist')
const { validateDir } = require('./dir')
const { validateSpecial } = require('./special')
const { validateStatFilter } = require('./stat_filter')

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
