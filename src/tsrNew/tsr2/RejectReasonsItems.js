import React from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import handleString from '../../handleString'
const RejectReasonsItems = props => {
  let reject_reasons = props.state.reject_reasons || []
  function handleChange (e) {
    let { name, checked } = e.target
    props.handleState({ [name]: checked, other: false })
  }
  const _disabled = props.disabled
  const { other } = props.state
  function handleOther () {
    const { handleOtherCheck } = props.API
    handleOtherCheck()
  }
  return (
    <div className='col-12'>
      {reject_reasons.map((data, key) => (
        <div
          className='disiplin-checkbox col-12 w-auto mb-3 mt-2 pr-4'
          key={key}
        >
          <div className='checkbox m-0'>
            {!_disabled && (
              <input
                className='d-none'
                id={`improvement_${data.value}`}
                name={`improvement_${data.value}`}
                type='checkbox'
                onChange={handleChange}
                checked={
                  props.state[`improvement_${data.value}`] ? true : false
                }
              />
            )}
            <label className='full' htmlFor={`improvement_${data.value}`}>
              {props.state[`improvement_${data.value}`] ? (
                <CheckBoxRoundedIcon />
              ) : (
                <CheckBoxOutlineBlankRoundedIcon />
              )}
              {handleString(data.label)}
            </label>
          </div>
        </div>
      ))}
      <div className='disiplin-checkbox col-12 w-auto mb-3 mt-2 pr-4'>
        <div className='checkbox m-0'>
          {!_disabled && (
            <input
              className='d-none'
              id='other'
              name='other'
              type='checkbox'
              onChange={handleOther}
            />
          )}
          <label className='full' htmlFor='other'>
            {other ? (
              <CheckBoxRoundedIcon />
            ) : (
              <CheckBoxOutlineBlankRoundedIcon />
            )}
            سایر
          </label>
        </div>
      </div>
    </div>
  )
}
export default RejectReasonsItems
