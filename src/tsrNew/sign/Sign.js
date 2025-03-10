import React from 'react'
import DefaultStatus from './DefaultStatus'
import Accepted from './Accepted'
import Rejected from './Rejected'
const Sign = props => {
  let objSign = props.props.ListSign.ListMandatory || {}
  const parentState = props.props.state
  let select = parentState.select || ''
  // let page = parentState.page || ''
  let { multiTab } = props
  let numberSelect = multiTab ? `${select}_${multiTab}` : select || 1
  let array = objSign[`tsr${numberSelect}`] || []
  function handleCheckShow(data) {
    const { _can_sign, edit, select, status } = parentState
    const permision = props.state[data.permission] ? true : false
    const verify = data.hold ? CheckSign(data.hold) : true
    const statusParent = props.status
    const check_sign = statusParent === 'sign' || statusParent === 'reject' || edit === '0'
    const _sign = _can_sign === 'yes'
    // const check_page = page === select
    const statusRevName = `rev_show_${select}`
    const status_check = status !== statusRevName
    const check = verify && permision && check_sign && _sign && status_check
    return check
  }
  function CheckSign(hold) {
    let _data = props.state[hold] || null
    const result = _data === '1' || _data === '0'
    return result
  }
  function handleShow(data, key) {
    let value = props.state[data.state]
    switch (value) {
      case '1':
        return <Accepted {...props} key={key} data={data} _key={key} />
      case '0':
        return <Rejected {...props} key={key} data={data} _key={key} />
      default:
        return (
          handleCheckShow(data) && (
            <DefaultStatus {...props} key={key} data={data} _key={key} />
          )
        )
    }
  }
  return (
    <div className='col-12 p-0'>
      <div className='row mx-0 main-sign-tsr'>
        {array.map((data, key) => handleShow(data, key))}
      </div>
    </div>
  )
}
export default Sign
