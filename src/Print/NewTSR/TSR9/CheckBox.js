import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const CheckBox = props => {
  const { data, label, name_value } = props
  const check = data[name_value] === '1'
  return (
    <span className='b' style={{ marginRight: '6mm' }}>
      <span className='_tikbox'>
        {check ? <CheckBoxRoundedIcon /> : <CheckBoxOutlineBlankRoundedIcon />}
      </span>
      {label}
    </span>
  )
}
export default CheckBox
