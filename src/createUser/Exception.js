import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
const Exception = props => {
  const { Selected, handleState } = props.props

  function handleChange (e) {
    const { name, checked } = e.target
    let obj = Selected
    obj[name] = checked ? 1 : 0
    handleState('Selected', Selected)
  }
  return (
    <div className='w-100 pt-1 pb-1 row m-0'>
      {props.array.map((data, key) => (
        <div className='w-auto mt-1 mb-1 mr-0 ml-0 field-access' key={key}>
          <input
            name={data.name}
            id={data.name}
            type='checkbox'
            className='d-none'
            onChange={e => handleChange(e)}
            checked={Selected[data.name] === 1}
          />
          <label className='full mx-2' htmlFor={data.name}>
            {Selected[data.name] ? (
              <CheckBoxRoundedIcon className='ml-1' />
            ) : (
              <CheckBoxOutlineBlankRoundedIcon className='ml-1' />
            )}
            {data.label}
          </label>
        </div>
      ))}
    </div>
  )
}
export default Exception
