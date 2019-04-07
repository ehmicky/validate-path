// Strip final slash
export const stripSlash = function(path) {
  if (!path.endsWith('/') || path === '/') {
    return path
  }

  return path.slice(0, -1)
}
