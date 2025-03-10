const handleCheckText = text => {
  const checkType =
    typeof text === 'string' && text !== 'null' && text !== 'undefined'
  let result = false
  if (checkType) {
    // text = handleString(text)
    if (text) {
      let trim = text.trim()
      if (Boolean(trim)) {
        let length = Boolean(trim.length)
        if (length) {
          result = true
        }
      }
    }
  }
  return result
}
export default handleCheckText
