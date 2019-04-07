const {
  win32: { normalize: normalizeWindows },
  posix: { normalize: normalizeUnix },
} = require('path')
const { platform: osPlatform } = require('process')

// Default `opts.platform`
const getDefaultPlatform = function() {
  return osPlatform === 'win32' ? 'windows' : 'unix'
}

// Normalize path according to `opts.platform`, e.g. for path delimiters
const normalizePlatform = function(path, { platform }) {
  // `path.resolve()` already performs normalization
  if (platform === undefined) {
    return path
  }

  if (normalize[platform] === undefined) {
    throw new Error(
      `'platform' option must be 'windows' or 'unix': ${platform}`,
    )
  }

  return normalize[platform](path)
}

const normalize = {
  windows: normalizeWindows,
  unix: normalizeUnix,
}

module.exports = {
  getDefaultPlatform,
  normalizePlatform,
}
