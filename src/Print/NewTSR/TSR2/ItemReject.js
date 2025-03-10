import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import handleString from '../../../handleString'
const ItemReject = props => {
  let { label, value } = props.dataItem
  // let { reject_reasons } = props.data
  // let totalText = handleString(reject_reasons)
  const { handleChekboxSelected } = props.API
  return (
    <div className='padR' key={props._key}>
      <span className='_tikbox'>
        {handleChekboxSelected(value) ? (
          <CheckBoxRoundedIcon />
        ) : (
          <CheckBoxOutlineBlankRoundedIcon />
        )}
      </span>
      <p className='d-inline-block'>{handleString(label)}</p>
    </div>
  )
}
export default ItemReject
