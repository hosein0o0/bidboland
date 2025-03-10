import React from 'react'
import CreatableSelect from 'react-select/creatable'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
const Participants = props => {
  const { loading, tabSelected, user_list, disabled } = props.state
  const meeting_users = props.state[`${tabSelected}_meeting_users`]
    ? props.state[`${tabSelected}_meeting_users`]
    : []
  const _disabled = props.state[`${tabSelected}_dis6`]
    ? props.state[`${tabSelected}_dis6`]
    : false
  const secondDis = !props.state[`${tabSelected}_unit_supervisor_allow`]
  function handleChange (newValue) {
    let nameState = `${tabSelected}_meeting_users`
    let filter = newValue ? newValue.filter(_value => !_value.__isNew__) : []
    props.handleState({
      [nameState]: filter
    })
  }
  function handleDisabled () {
    const checkTime = props.handleTimeOut() ? !props.handleTimeOut() : false
    const result = checkTime || disabled || _disabled || secondDis
    return result
  }
  return (
    <React.Fragment>
      <div className='col-12'>
        <div className='title-password w-100 mt-4 mb-2'>
          <h2 className='IranSans_Bold'>نفرات شرکت کننده در جلسه</h2>
          <div className='line'></div>
        </div>
      </div>
      <div className='col-12'>
        <div className='field-form selectBox'>
          <CreatableSelect
            onChange={newValue => handleChange(newValue)}
            isMulti
            value={meeting_users}
            options={user_list}
            placeholder={
              <label className='rtl'>
                انتخاب نفرات
                <span className='star IranSans_Bold'>*</span>
              </label>
            }
            isDisabled={handleDisabled()}
          />
        </div>
      </div>
      {!_disabled ? (
        <div className='submit-form col-12'>
          <button
            onClick={() => (props.MainFn ? props.MainFn.handleSubmit3() : '')}
            disabled={handleDisabled()}
          >
            {loading === `office-${tabSelected}` ? (
              <Loading className='form-loader' />
            ) : (
              <DoneIcon />
            )}
            ثبت اطلاعات
          </button>
        </div>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}
export default Participants
