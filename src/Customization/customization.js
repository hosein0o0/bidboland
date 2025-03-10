import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import handleString from '../handleString'
function Customization (props) {
  return (
    <div className='box-customization'>
      {props.state.header.map((data, key) => (
        <div className='field-box' key={key}>
          <label htmlFor={`${key}__${data.name}`}>
            <input
              type='checkbox'
              className='d-none'
              id={`${key}__${data.name}`}
              onChange={e =>
                props.handleSelect(e.target.checked, `_header_${data.name}`)
              }
              checked={props.state[`_header_${data.name}`] ? true : false}
            />
            {props.state[`_header_${data.name}`] ? (
              <CheckBoxRoundedIcon />
            ) : (
              <CheckBoxOutlineBlankRoundedIcon />
            )}
            <span className='px-1'>{handleString(data.name)}</span>
          </label>
        </div>
      ))}
    </div>
  )
}
export default Customization
