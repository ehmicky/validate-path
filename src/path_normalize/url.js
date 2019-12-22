// Check input is a `file://` URL
export const isFileUrl = function(url) {
  return url instanceof URL && url.protocol === FILE_PROTOCOL
}

// Normalize `file://` string to a path
export const normalizeFileUrl = function(path) {
  if (!path.startsWith(FILE_PROTOCOL)) {
    return path
  }

  try {
    const { pathname } = new URL(path)
    return decodeURI(pathname)
  } catch (error) {
    throw new Error(`Invalid '${FILE_PROTOCOL}//' URL: ${error.message}`)
  }
}

export const FILE_PROTOCOL = 'file:'
