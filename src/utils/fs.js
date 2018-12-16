'use strict'

const { stat, access, realpath } = require('fs')

const promisify = require('util.promisify')

const pAccess = promisify(access)
const pStat = promisify(stat)
const pRealpath = promisify(realpath)

module.exports = {
  pAccess,
  pStat,
  pRealpath,
}
