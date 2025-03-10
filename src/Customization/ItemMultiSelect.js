import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import handleString from '../handleString'
// import { ContactSupportOutlined } from '@material-ui/icons';
function ItemMultiSelect (props) {
  async function handleClick (e, itemList, index) {
    let data = await props.data
    let array = await []
    await props.props.handleState(`${props.props.name}_list`, array)
    const checked = await e.target.checked
    if (checked) {
      await array.push(itemList)
      props.handleState('select', `${itemList.value}_${data.title}_${index}`)
    } else {
      props.handleState('select', ``)
      array = await []
    }
    // await props.props.handleState(`${itemList.value}_${data.title}_${index}`, checked)
    await props.props.handleState(`${props.props.name}_list`, array)
  }
  function handleShowItem (itemList, index) {
    return (
      <li className='item-multiselectbox' key={index}>
        <input
          className='d-none'
          type='checkbox'
          id={`${itemList.value}_${props.data.title}_${index}`}
          name={`${itemList.value}_${props.data.title}_${index}`}
          // onChange={(e) => props.props.handleState(`${itemList.value}_${props.data.title}_${index}`, e.target.checked)}
          onChange={e => handleClick(e, itemList, index)}
        />
        <label
          className='m-0 row align-items-center'
          htmlFor={`${itemList.value}_${props.data.title}_${index}`}
        >
          {props.state.select ===
          `${itemList.value}_${props.data.title}_${index}` ? (
            <CheckBoxRoundedIcon />
          ) : (
            <CheckBoxOutlineBlankRoundedIcon />
          )}
          {handleString(itemList.label)}
        </label>
      </li>
    )
  }
  return (
    <div className='col-xl-4 col-lg-4 col-md-12 col-12'>
      <div className='main-item-multiselectbox'>
        <span className='title-multiselectbox'>{props.data.title}</span>
        <ul className='listitem-multiselectbox'>
          {props.data.list.map((itemList, index) =>
            handleShowItem(itemList, index)
          )}
        </ul>
      </div>
    </div>
  )
}
export default ItemMultiSelect
