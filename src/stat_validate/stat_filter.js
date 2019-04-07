const { validateFilterFunc } = require('../utils')

// Validate a file `stat` according to `opts.statFilter` function
const validateStatFilter = function(path, stat, { statFilter }) {
  if (stat === undefined || statFilter === undefined) {
    return
  }

  validateFilterFunc({
    filter: statFilter,
    value: stat,
    name: 'statFilter',
    path,
  })
}

module.exports = {
  validateStatFilter,
}
