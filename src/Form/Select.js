import React from 'react'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
// import CheckPersianText from '../CheckPersianText'

function Select (props) {
  // const LtrRtl = value => {
  //   let result = CheckPersianText(value)
  //   return result ? 'rtl' : 'ltr'
  // }
  const data = props.data || {}
  const state = props.state || {}
  // const ref = useRef(data.value)
  function handleChange (e) {
    if (!data.disabled) {
      props.handleChange(e)
    }
  }
  function handleFocused (name) {
    if (!data.disabled) {
      props.OnFocus(name)
    }
  }
  function handleBlur () {
    if (!data.disabled) {
      props.OnBlur()
    }
  }
  const ManageClassName = data => {
    const result_class = props.hadnleClassName(data)
    return result_class || {}
  }
  const ManageActive = value => {
    const state1 = handleCheckText(state[value])
    const state2 = state.foucs === value
    const result_active = state1 || state2
    return result_active ? 'active' : ''
  }
  return (
    <div className='col-xl-6 col-lg-6 col-md-12 col-12' key={props._key}>
      <div
        className={`field-form pl-1 ${
          ManageClassName(data).className
        } ${ManageActive(data.value)}`}
      >
        <label className='textarea'>
          {data.name}
          {props.handleRequire(data)}
        </label>
        <select
          className={ManageClassName(data).textAlign}
          name={`${data.value}`}
          onChange={handleChange}
          onFocus={() => handleFocused(data.value)}
          onBlur={handleBlur}
          disabled={data.disabled}
          readOnly={data.disabled}
          // onSelect={handleChange}
          value={state[data.value]}
          // ref={ref}
        >
          <option className='d-none'></option>
          {data.listItem.map((item, _key) => (
            <option
              // className={LtrRtl(item.value)}
              key={_key}
              value={item.value}
            >
              {handleString(item.label)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export default Select
