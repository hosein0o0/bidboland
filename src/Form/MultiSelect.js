import React from 'react'
import Select from 'react-select'
function MultiSelect(props) {
  const data = props.data || {}
  function className() {
    return `${props.hadnleClassName(data).className} ${props.state[data.value] ||
      props.state.foucs === `${data.value}`
      ? 'active'
      : ''
      }`
  }
  return (
    <div className={`col-xl-${data.xl || 12} col-lg-12 col-md-12 col-12`}>
      <div className={`field-form selectBox ${className()}`}>
        <Select
          onChange={newValue => props.handleState(data.value, newValue)}
          isMulti={data.multiselect}
          options={data.list}
          className='basic-multi-select'
          classNamePrefix='select'
          value={
            props.state[data.value] ? props.state[data.value] : []
          }
          placeholder={
            <label>
              {data.name}
              {props.handleRequire(data)}
            </label>
          }
        />
      </div>
    </div>
  )
}
export default MultiSelect
