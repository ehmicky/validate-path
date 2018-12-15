'use strict'

const { stat, access } = require('fs')

const promisify = require('util.promisify')

const pAccess = promisify(access)
const pStat = promisify(stat)

module.exports = {
  pAccess,
  pStat,
}
