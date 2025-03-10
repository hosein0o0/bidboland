import React from 'react'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import Loading from '../../layout/loading'
const BoxResultDocument = props => {
  let parentState = props.props.state || {}
  let { loading, listData } = parentState
  listData = listData || []
  async function handleSelect (data) {
    let { _key, list, handleState, nameParent } = await props.props
    let array = (await list) || []
    let _obj = await array[_key]
    let obj2 = props.props.handleLink(data)
    _obj['documentNumber'] = await data.value
    _obj['degreeTitle'] = await data.label
    _obj['_selected'] = await true
    _obj['revision'] = await data.revision
    _obj['transmitallNumber'] = await data.transmitallNumber
    _obj['check'] = await obj2.check
    _obj['link'] = await obj2.link
    await handleState({
      [nameParent]: array,
      // , listData: []
      loading: ''
    })
    await props.handleState({ open: '' })
  }
  const checkEmpty =
    listData.length === 0 &&
    handleCheckText(props.value) &&
    loading !== 'document'
  return (
    <div className='main-selectBox-search'>
      <div className='selectBox-search ltr'>
        {loading === 'document' && (
          <Loading className='table d-flex justify-content-center mt-3 mb-3' />
        )}
        {checkEmpty ? (
          <div className='item-selectBox-search text-center p-3'>
            <span className='IranSans_Bold_FA'>اطلاعات مورد نظر یافت نشد</span>
          </div>
        ) : (
          loading !== 'document' &&
          listData.map((data, key) => (
            <div
              className={`item-selectBox-search pointer ${
                loading === 'document' ? 'disabled' : ''
              }`}
              key={key}
              onClick={() => (loading !== 'document' ? handleSelect(data) : '')}
            >
              <span>{handleString(data.value)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
export default BoxResultDocument
