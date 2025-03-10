const ConvertNumber = string => {
  if (string && typeof string === 'string') {
    return string
      .replace(/[\u0660-\u0669]/g, function (c) {
        return c.charCodeAt(0) - 0x0660
      })
      .replace(/[\u06f0-\u06f9]/g, function (c) {
        return c.charCodeAt(0) - 0x06f0
      })
  }
}
// module.exports = { ConvertNumber }
export default ConvertNumber
