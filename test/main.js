import test from 'ava'
// eslint-disable-next-line import/no-unresolved, node/no-missing-import
import validatePath from 'validate-path'

test('Dummy test', (t) => {
  t.is(typeof validatePath, 'function')
  t.is(typeof validatePath.sync, 'function')
})
