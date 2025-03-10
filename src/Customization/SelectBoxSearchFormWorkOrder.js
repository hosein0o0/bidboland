import React from 'react'
import handleString from '../handleString'
import Loading from '../layout/loading'
function SelectBoxSearchFormWorkOrder (props) {
  function SelectData (data) {
    let value = data.value
    let nameParent = props.nameParent
    let name = props.name
    let key = props.index
    let objParent = props.state[props.state.typeWork]
    let list = objParent[nameParent]
    if(list){
      let obj = list[key]
      obj['select'] = true
      obj[name] = value
      props.handleState(props.state.typeWork, objParent)
      props.props.SelctDocumentMdl(value, props, true)
    }
  }
  return (
    <div className='main-selectBox-search'>
      {props.props.state.loading === 'select' ? (
        <Loading className='table d-flex justify-content-center mt-3 mb-3' />
      ) : (
        <div className='selectBox-search ltr'>
          {props.props.state.listData.map((data, key) => (
            <div
              className='item-selectBox-search pointer'
              key={key}
              onClick={() => SelectData(data)}
            >
              <span>{handleString(data.label)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default SelectBoxSearchFormWorkOrder
