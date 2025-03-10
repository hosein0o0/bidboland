import React from 'react'
import Row from './Row'
const ItemBody = props => {
  let index = props._key
  let { _active, header, role, objFiltered } = props.state
  header = header || []
  let data = props.data
  function handleObjLink(data) {
    let obj = props.objLink || {}
    let result = {}
    for (let value in obj) {
      let nameData = obj[value]
      result[value] = data[nameData] || ''
    }
    return result
  }
  return (
    <tr className={_active === index ? '_active' : ''} key={index}>
      <Row
        _active={_active}
        _index={index}
        handleState={(name, value) => props.handleState({ [name]: value })}
        data={data}
        row={Object.keys(header).map(_ => {
          return header[_].value
        })}
        handleFilter={props.handleFilter}
        header={header}
        objLink={handleObjLink(data)}
        permision={props.Permision.handlePermision(role, props.nameDownload)}
        objFiltered={objFiltered}
      />
      {props.action && props.action(data, index)}
    </tr>
  )
}
export default ItemBody
