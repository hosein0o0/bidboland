import React from 'react'
import './toggle.css'
const Switch = props => {
  const { data, handleState, hadnleClassName, _key, state } = props
  function toggleButton () {
    return (
      <label class='switch'>
        <input
          type='checkbox'
          className='d-none'
          onChange={e => handleState(data.value, e.target.checked)}
          checked={state[data.value] ? true : false}
        />
        <span class='slider round'></span>
      </label>
    )
  }
  return (
    <div className='col-xl-12 col-lg-12 col-md-12 col-12' key={_key}>
      <div
        className={`field-form _switch d-flex ${
          hadnleClassName(data).className
        }`}
      >
        <span className='ml-1'>{data.name}</span>
        {toggleButton()}
        <span className='mr-1'>{data.name2}</span>
      </div>
    </div>
  )
}
export default Switch
