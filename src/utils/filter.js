export const validateFilterFunc = function ({ filter, value, name, path }) {
  const message = filter(value)

  if (typeof message === 'string') {
    throw new TypeError(`${message}: ${path}`)
  }

  if (!message) {
    throw new Error(`Path must match ${name}: ${path}`)
  }
}

export const validateFilterRegExp = function ({ filter, value, name, path }) {
  if (!filter.test(value)) {
    throw new Error(`Path must match ${name} '${filter.source}': ${path}`)
  }
}
