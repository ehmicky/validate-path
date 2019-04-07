const test = require('ava')

const validatePath = require('../src')

test('Dummy test', t => {
  t.is(typeof validatePath, 'function')
  t.is(typeof validatePath.sync, 'function')
})
