// Add `opts.defaultValue`
export const addDefault = function (path, { defaultValue }) {
  if (path === undefined) {
    return defaultValue
  }

  return path
}
