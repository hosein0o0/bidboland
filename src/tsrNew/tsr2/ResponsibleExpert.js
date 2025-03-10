import React from 'react'
import ItemResponsibleExpert from './ItemResponsibleExpert'
import AddIcon from '@material-ui/icons/Add'
import handleCheckText from '../../handleCheckText'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
const ResponsibleExpert = props => {
  let array = props.state[props.name] || []
  function handleAdd () {
    let _obj = { user_unit: '', value: '', user_role: '' }
    let endObj = array[array.length - 1]
    const check =
      handleCheckText(endObj.user_unit) &&
      handleCheckText(endObj.value) &&
      handleCheckText(endObj.user_role)
    if (check) {
      array.push(_obj)
      props.handleState({
        [props.name]: array
      })
    } else Notification.notify(Message.text(932), 'error')
  }
  const _disabled = props.disabled
  return (
    <div className='w-100'>
      {props.name === 'responsible' && props.checkShowBoxText && (
        <div className='col-12 my-2'>
          <div className='box-note'>
            <p className='m-0'>
              در صورت تطابق درخواست با شرایط صدور TSR، مسئول آن انتخاب گردد.
            </p>
          </div>
        </div>
      )}
      {array.map((data, key) => (
        <ItemResponsibleExpert
          {...props}
          data={data}
          key={key}
          _key={key}
          length={array.length}
        />
      ))}
      {!_disabled && (
        <div className='button-add col-12'>
          <button onClick={handleAdd}>
            <AddIcon />
            افزودن مورد جدید
          </button>
        </div>
      )}
    </div>
  )
}
export default ResponsibleExpert
