'use strict'

const test = require('ava')

const validatePath = require('../localpack')

test('Dummy test', t => {
  t.is(typeof validatePath, 'function')
})
