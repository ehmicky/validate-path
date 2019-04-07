// Like lodash _.omitBy()
const omitBy = function(object, condition) {
  const pairs = Object.entries(object)
    .filter(([key, value]) => !condition(key, value))
    .map(([key, value]) => ({ [key]: value }))
  return Object.assign({}, ...pairs)
}

// Like lodash _.mapValues()
const mapValues = function(object, mapper) {
  const pairs = Object.entries(object).map(([key, value]) => ({
    [key]: mapper(value, key, object),
  }))
  return Object.assign({}, ...pairs)
}

// Same with `mapper` being an async function
const asyncMapValues = async function(object, mapper) {
  const pairs = Object.entries(object).map(async ([key, value]) => ({
    [key]: await mapper(value, key, object),
  }))
  const pairsA = await Promise.all(pairs)
  return Object.assign({}, ...pairsA)
}

const isObject = function(value) {
  return typeof value === 'object' && value !== null
}

module.exports = {
  omitBy,
  mapValues,
  asyncMapValues,
  isObject,
}
