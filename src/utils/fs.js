import { promisify } from 'util'
import { stat, realpath } from 'fs'

export const pStat = promisify(stat)
export const pRealpath = promisify(realpath)
