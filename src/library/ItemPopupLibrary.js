import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const ItemPopupLibrary = props => {
  const { data } = props
  let key = props._key
  let { listStandardSelected } = props.state
  let obj = listStandardSelected || {}
  function handleChange () {
    const name = data.value
    let _check = obj[name] ? false : true
    obj[name] = _check
    props.handleState({
      listStandardSelected: obj
    })
  }
  const check = obj[data.value] ? true : false
  return (
    <li className='my-1 col-3 px-1 _medium' key={key}>
      <input
        type='checkbox'
        className='d-none'
        id={data.value}
        name={data.value}
        onChange={handleChange}
      />
      <label
        className='align-items-center d-flex ltr mb-0 text-left'
        htmlFor={data.value}
      >
        {check ? (
          <CheckBoxRoundedIcon className='ml-1 mt-1 mr-1' />
        ) : (
          <CheckBoxOutlineBlankRoundedIcon className='ml-1 mt-1 mr-1' />
        )}
        {data.label}
      </label>
    </li>
  )
}
export default ItemPopupLibrary
