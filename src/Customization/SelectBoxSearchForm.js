import React from 'react'
import handleString from '../handleString'
import Loading from '../layout/loading'
function SelectBoxSearchForm (props) {
  function SelectData (value) {
    let nameParent = props.nameParent
    let name = props.name
    let key = props.index
    let list = props.state[nameParent]
    let obj = list[key]
    obj['select'] = true
    obj[name] = value
    props.handleState(nameParent, list)
    props.props.SelctDocumentMdl(value, props)
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
              onClick={() => (props.multi ? SelectData(data.value) : '')}
            >
              <span>{handleString(data.label)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default SelectBoxSearchForm
