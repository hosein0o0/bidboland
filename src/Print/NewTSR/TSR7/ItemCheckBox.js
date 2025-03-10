import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded'
import ListTab from '../../../tsrNew/TSR7/ListTab'
import handleString from '../../../handleString'
const ItemCheckBox = props => {
  let list = ListTab.List || []
  function handleCheckBox(data) {
    let listChecked = props.listChecked || []
    const result = listChecked.findIndex(item => item.value == data.value)
    const check = result >= 0
    return check
  }
  function CheckBoxShow(data) {
    const check = data.label === props.name
    let result = ''
    const list = props.data.groups || []
    const ch_list = list.includes(handleString(data.value))
    if (ch_list) {
      result = <IndeterminateCheckBoxRoundedIcon className='mr-2 ml-2' />
      if (check) {
        result = <CheckBoxRoundedIcon className='mr-2 ml-2' />
      }
    } else result = <CheckBoxOutlineBlankRoundedIcon className='mr-2 ml-2' />
    return result
  }
  return (
    <td colSpan={2}>
      <span>نوع کار:</span>
      {list.map((data, key) => (
        <span className='mr-2 ml-2 px-2' key={key}>
          <span className='padRight'>{data.label}</span>
          <span className='_tikbox'>
            {CheckBoxShow(data)}
          </span>
        </span>
      ))}
    </td>
  )
}
export default ItemCheckBox
