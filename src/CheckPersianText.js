import handleString from './handleString'

const FoundEnChar = txt => {
  // var english = /^[A-Za-z0-9]*$/
  var p = /^[\u0600-\u06FF\s]+$/
  let length = txt.length
  let check = false
  let i = 0
  while (i < length) {
    let char = txt[i]
    if (p.test(char)) {
      check = true
      break
    }
    i++
  }
  return check
}
const CheckPersianText = str => {
  const check = typeof str === 'string'
  let result = false
  if (check) {
    let text = handleString(str)
    var p = /^[\u0600-\u06FF\s]+$/
    // var english = /^[A-Za-z0-9]*$/
    if (p.test(text)) result = true
    else result = FoundEnChar(text)
  }
  return result
}
export default CheckPersianText
