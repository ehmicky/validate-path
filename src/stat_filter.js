'use strict'

const { checkFilterFunc } = require('./filter')

// Validate a file `stat` according to `opts.statFilter` function
const validateStatFilter = function(path, stat, { statFilter }) {
  if (stat === undefined || statFilter === undefined) {
    return
  }

  checkFilterFunc({ filter: statFilter, value: stat, name: 'statFilter', path })
}

module.exports = {
  validateStatFilter,
}
