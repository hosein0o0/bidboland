const handleCheckText = text => {
  const checkType = typeof text === 'string' && text !== 'null' && text !== 'undefined'
  let result = false
  if (checkType) {
    // text = handleString(text)
    if (text) {
      let trim = text.trim()
      if (trim) {
        let length = trim.length
        if (length) {
          result = true
        }
      }
    }
  }
  return result
}
const handleFilter = (textSearch, search, url) => {
  let result
  if (handleCheckText(textSearch) && handleCheckText(search)) {
    result = `${url}?searchInAll=${search}&searchByFields=${textSearch}`
  } else if (handleCheckText(textSearch)) {
    result = `${url}?searchByFields=${textSearch}`
  } else if (handleCheckText(search)) {
    result = `${url}?searchInAll=${search}`
  } else result = url
  return result
}
module.exports = { handleFilter }
