import React from 'react'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
function TextArea (props) {
  return (
    <div className='col-xl-12 col-lg-12 col-md-12 col-12' key={props._key}>
      <div
        className={`field-form textarea ${
          props.hadnleClassName(props.data).className
        } ${
          handleCheckText(props.state[props.data.value]) ||
          props.state.foucs === `${props.data.value}`
            ? 'active'
            : ''
        }`}
      >
        <div className='col p-0'>
          <label className='textarea'>
            {props.data.name}
            {props.handleRequire(props.data)}
          </label>
          <textarea
            className={props.hadnleClassName(props.data).textAlign}
            name={`${props.data.value}`}
            onChange={!props.data.disabled && props.handleChange}
            onFocus={e => !props.data.disabled && props.OnFocus(e.target.name)}
            onBlur={!props.data.disabled && props.OnBlur}
            disabled={props.data.disabled}
            readOnly={props.data.disabled}
            value={handleString(props.state[props.data.value])}
          ></textarea>
        </div>
      </div>
    </div>
  )
}
export default TextArea
