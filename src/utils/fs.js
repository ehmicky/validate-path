import { promisify } from 'util'
import { stat, realpath } from 'fs'

const pStat = promisify(stat)
const pRealpath = promisify(realpath)

module.exports = {
  pStat,
  pRealpath,
}
