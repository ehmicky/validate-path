import { validateInside } from './inside.js'
import { validateFilters } from './path_filter.js'

// Validate file path.
// Only validate the path string, i.e. does not check if file exists.
const pathValidate = function(path, opts) {
  PATH_VALIDATORS.forEach(validator => validator(path, opts))
}

const PATH_VALIDATORS = [validateInside, validateFilters]

module.exports = {
  pathValidate,
}
