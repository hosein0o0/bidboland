import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import handleString from '../handleString'
// import handleCheckText from '../handleCheckText'
function CheckBox (props) {
  let data = props.data || {}
  function handleClassName () {
    let state1 = props.state[data.value] ? true : false
    let state2 = props.state.foucs === data.value
    let result = state1 || state2
    return `${props.hadnleClassName(data).className} ${result ? 'active' : ''}`
  }
  function handleChange (e) {
    let { checked } = e.target
    if (data.objState) {
      props.handleState({ [data.value]: checked })
    } else {
      props.handleState(data.value, checked)
    }
  }
  const checkBox = props.state[data.value] ? true : false
  let className = `disiplin-checkbox col-xl-6 col-lg-6 col-md-4 col-6 w-auto mt-3 mb-3 ${handleClassName()}`
  return (
    <div className='col-12'>
      <div className={className.trim()} key={props._key}>
        <div className='checkbox m-0'>
          {!data.disabled && (
            <input
              className='d-none'
              name={data.value}
              id={data.value}
              onChange={handleChange}
              type='checkbox'
              checked={checkBox ? true : false}
            />
          )}
          <label className='full' htmlFor={data.value}>
            {checkBox ? (
              <CheckBoxRoundedIcon />
            ) : (
              <CheckBoxOutlineBlankRoundedIcon />
            )}
            {handleString(data.name)}
          </label>
        </div>
      </div>
    </div>
  )
}
export default CheckBox
