import test from 'ava'

import validatePath from '../src/main.js'

test('Dummy test', (t) => {
  t.is(typeof validatePath, 'function')
  t.is(typeof validatePath.sync, 'function')
})
