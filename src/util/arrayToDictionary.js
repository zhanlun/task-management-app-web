export const arrayToMapReduceFunction = (obj, item) => Object.assign(obj, {
  [item.id]: item
})