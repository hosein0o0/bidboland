import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import ListRejectReasons from '../../../tsrNew/tsr2/ListRejectReasons'
import ItemReject from './ItemReject'
const RejectReasons = props => {
  const { issued_status } = props.data
  const { handleCheckOther } = props.API
  let list = ListRejectReasons.array || []
  return (
    <div className='border'>
      <div className='padRk pt-1mm'>
        <span className='_tikbox'>
          {issued_status === '1' || issued_status === null ? (
            <CheckBoxRoundedIcon />
          ) : (
            <CheckBoxOutlineBlankRoundedIcon />
          )}
        </span>
        درخواست ارایه شده با روش اجرایی درخواست هاي خدمات فنی تطابق دارد.
      </div>
      <div className='padRk pt-1mm'>
        <span className='_tikbox'>
          {issued_status === '0' ? (
            <CheckBoxRoundedIcon />
          ) : (
            <CheckBoxOutlineBlankRoundedIcon />
          )}
        </span>
        به دليل عدم تطابق با روش اجرایی درخواست هاي خدمات فنی عودت داده می شود:
      </div>
      {list.map(
        (data, key) =>
          data.value !== 'سایر موارد' && (
            <ItemReject {...props} dataItem={data} key={key} _key={key} />
          )
      )}
      <div className='padR'>
        <span className='_tikbox'>
          {handleCheckOther(list) ? (
            <CheckBoxRoundedIcon />
          ) : (
            <CheckBoxOutlineBlankRoundedIcon />
          )}
        </span>
        <p className='d-inline-block'>سایر</p>
      </div>
    </div>
  )
}
export default RejectReasons
