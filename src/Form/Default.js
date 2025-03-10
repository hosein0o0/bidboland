import React from 'react'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
function Default(props) {
  const _data = props.data || {}
  const _state = props.state || {}
  function handleCHange(e) {
    if (!_data.disabled) {
      let fn = props.handleChange
      fn(e)
    }
  }
  function handleFocus(e) {
    if (!_data.disabled) {
      const { name } = e.target
      props.OnFocus(name)
    }
  }
  function handleBlur() {
    if (!_data.disabled) {
      props.OnBlur()
    }
  }
  const Active = (value) => handleCheckText(_state[value]) || _state.foucs === value
  return (
    <div
      className={`col-xl-${_data.fullSize ? 12 : 6} col-lg-${_data.fullSize ? 12 : 6
        } col-md-12 col-12`}
      key={props._key}
    >
      <div
        className={`field-form ${props.hadnleClassName(_data).className} ${Active(_data.value) ? 'active' : ''}`}
      >
        <label>
          {_data.name}
          {props.handleRequire(_data)}
        </label>
        <input
          className={props.hadnleClassName(_data).textAlign}
          name={`${_data.value}`}
          onChange={handleCHange}
          onFocus={e => handleFocus(e)}
          onBlur={handleBlur}
          disabled={_data.disabled}
          readOnly={_data.disabled}
          value={handleString(_state[_data.value])}
          type={_data.type || 'text'}
          maxLength={_data.maxLength || ''}
          minLength={_data.minLength || 0}
          placeholder={Active(_data.value) ? handleString(_data.placeholder) : ''}
        />
      </div>
    </div>
  )
}
export default Default
