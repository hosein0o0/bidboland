import ConvertNumber from './ConvertNumber'
const getCustomFormat = (inputValue, isGregorian) => {
  const check = typeof inputValue === 'string'
  if (!inputValue) return ''
  else if (check) return ConvertNumber(inputValue)
  const inputFormat = isGregorian ? 'YYYY/M/D' : 'jYYYY/jM/jD'
  return isGregorian
    ? inputValue.locale('es').format(inputFormat)
    : inputValue.locale('fa').format(inputFormat)
}
// module.exports = { getCustomFormat }
export default getCustomFormat
