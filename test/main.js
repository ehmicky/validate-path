'use strict'

const test = require('ava')

const { validatePath, checkPath } = require('../localpack')

test('Dummy test', t => {
  t.is(typeof validatePath, 'function')
  t.is(typeof checkPath, 'function')
})
