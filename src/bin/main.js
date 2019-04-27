#!/usr/bin/env node
import { exit } from 'process'

import validatePath from '../main.js'

import { defineCli } from './top.js'
import { parseConfig } from './parse.js'

// Parse CLI arguments then run tasks
const runCli = async function() {
  try {
    const yargs = defineCli()
    const { paths, ...config } = parseConfig({ yargs })
    const pathsA = await validatePath(paths, config)
    console.log(pathsA.join('\n'))
  } catch (error) {
    runCliHandler(error)
  }
}

// If an error is thrown, print error's description, then exit with exit code 1
const runCliHandler = function({ message }) {
  console.error(message)

  exit(1)
}

runCli()
