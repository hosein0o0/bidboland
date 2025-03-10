import React, { Fragment, useEffect } from 'react'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import ListRecovery from './listRecovery'
const TypeRecovery = props => {
  useEffect(() => {
    let { canUpdate } = props.props
    if (props.handleDisabled() || canUpdate) {
      TrueCheck()
    }
  }, [])
  function TrueCheck () {
    let improvement_type = props.state.improvement_type || ''
    let _list = improvement_type.split(' , ')
    _list.forEach(_value => {
      let _data = `_improvement_${_value}`
      props.handleState({ [_data]: true })
    })
  }
  function handleCheck (e) {
    const { name, checked } = e.target
    props.handleState({ [name]: checked })
  }
  const _array = ListRecovery.list
  return (
    <Fragment>
      <div className='title-password col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>نوع بهبود</h2>
        <div className='line'></div>
      </div>
      {_array.map((data, key) => (
        <div
          className='disiplin-checkbox col-xl-6 col-lg-6 col-md-4 col-6 w-auto mt-3 mb-3'
          key={key}
        >
          <div className='checkbox m-0'>
            {!props.handleDisabled() && (
              <input
                className='d-none'
                id={`_improvement_${data.value}`}
                name={`_improvement_${data.value}`}
                type='checkbox'
                onChange={handleCheck}
                checked={
                  props.state[`_improvement_${data.value}`] ? true : false
                }
              />
            )}
            <label
              className={`full ${props.handleDisabled() ? 'disabled' : ''}`}
              htmlFor={`_improvement_${data.value}`}
            >
              {props.state[`_improvement_${data.value}`] ? (
                <CheckBoxRoundedIcon />
              ) : (
                <CheckBoxOutlineBlankRoundedIcon />
              )}
              {data.label}
            </label>
          </div>
        </div>
      ))}
    </Fragment>
  )
}
export default TypeRecovery
