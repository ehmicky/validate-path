const { promisify } = require('util')
const { stat, realpath } = require('fs')

const pStat = promisify(stat)
const pRealpath = promisify(realpath)

module.exports = {
  pStat,
  pRealpath,
}
