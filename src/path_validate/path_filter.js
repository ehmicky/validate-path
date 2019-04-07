// We make sure Unix paths are passed to filters, even on Windows
const {
  posix: { basename, normalize },
} = require('path')

const { validateFilterFunc, validateFilterRegExp } = require('../utils')

// Normalize string `opts.*Filter` to RegExps
const normalizeFilters = function({ opts }) {
  const filterOpts = FILTER_OPTS.map(name => normalizeFilter({ name, opts }))
  const filterOptsA = Object.assign({}, ...filterOpts)
  return { ...opts, ...filterOptsA }
}

const normalizeFilter = function({ name, opts }) {
  const filterOpt = opts[name]
  const filterOptA = normalizeRegExpString({ filterOpt, name })
  return { [name]: filterOptA }
}

const normalizeRegExpString = function({ filterOpt, name }) {
  if (typeof filterOpt !== 'string') {
    return filterOpt
  }

  try {
    return new RegExp(filterOpt, 'u')
  } catch (error) {
    throw new Error(
      `Option '${name}' is an invalid regular expression: ${filterOpt}`,
    )
  }
}

// `opts.*Filter` options validation
const isFilterOption = function(option, validOption) {
  return validOption === EXAMPLE_FILTER && isFilter(option)
}

const isFilter = function(filter) {
  return filter instanceof RegExp || typeof filter === 'function'
}

const EXAMPLE_FILTER = '[a-z]'

// Validate a filename or path against `opts.filenameFilter|pathFilter`
// They can either:
//   - a RegExp
//   - a function returning `true`, `false` or a error message string
const validateFilters = function(path, opts) {
  FILTER_OPTS.forEach(name => validateFilter(path, name, opts))
}

const validateFilter = function(path, name, { [name]: filter }) {
  if (filter === undefined) {
    return
  }

  const value = getFilterValue[name](path)

  if (typeof filter === 'function') {
    return validateFilterFunc({ filter, value, name, path })
  }

  validateFilterRegExp({ filter, value, name, path })
}

// Retrieve the filename of path
const getFilterValue = {
  filenameFilter: path => basename(path),
  pathFilter: path => normalize(path),
}

// All available filter options
const FILTER_OPTS = Object.keys(getFilterValue)

module.exports = {
  isFilterOption,
  normalizeFilters,
  EXAMPLE_FILTER,
  validateFilters,
}
