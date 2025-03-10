import handleCheckText from './handleCheckText'

const CheckText = (str) => {
  let state1 = typeof str === 'string'
  let state2 = handleCheckText(str)
  let state3 = str !== 'null'
  const check = state1 && state2 && state3
  let result = check ? str : ''
  return result
}
const handleString = str => {
  const _str = CheckText(str)
  let result = _str.replace(/&amp;/g, '&').replace(/amp;/g, '').replace(/&quot;/g, '').replace(/quot;/g, '')
  return result
}
export default handleString
