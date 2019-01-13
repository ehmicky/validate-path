'use strict'

const { stat, realpath } = require('fs')

const promisify = require('util.promisify')

const pStat = promisify(stat)
const pRealpath = promisify(realpath)

module.exports = {
  pStat,
  pRealpath,
}
