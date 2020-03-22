import { relative } from 'path'

export const validateInside = function (path, { inside, base }) {
  if (inside === undefined) {
    return
  }

  const pathToBase = relative(base, path)
  const isOutside = pathToBase.startsWith('..')

  if (inside === isOutside) {
    throw new Error(
      `Path must be ${INSIDE[inside]} its base directory '${base}': ${path}`,
    )
  }
}

const INSIDE = {
  true: 'inside',
  false: 'outside',
}
