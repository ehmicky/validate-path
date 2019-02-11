'use strict'

const test = require('ava')

const validatePath = require('..')

test('Dummy test', t => {
  t.is(typeof validatePath, 'function')
  t.is(typeof validatePath.sync, 'function')
})
