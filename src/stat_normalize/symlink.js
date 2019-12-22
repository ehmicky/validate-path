import { promises } from 'fs'

export const followSymlink = async function(path, stat, { followSymlinks }) {
  if (stat === undefined || !followSymlinks) {
    return path
  }

  const pathA = await promises.realpath(path, 'utf8')
  return pathA
}
