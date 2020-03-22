import { win32 as winPath, posix as posixPath } from 'path'
import { platform as osPlatform } from 'process'

const { normalize: normalizeWindows } = winPath
const { normalize: normalizeUnix } = posixPath

// Default `opts.platform`
export const getDefaultPlatform = function () {
  return osPlatform === 'win32' ? 'windows' : 'unix'
}

// Normalize path according to `opts.platform`, e.g. for path delimiters
export const normalizePlatform = function (path, { platform }) {
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
