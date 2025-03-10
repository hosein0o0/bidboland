import React from 'react'
import CreatableSelect from 'react-select/creatable'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
const ExpertSelection = props => {
  const { user_list, tabSelected, disabled, loading } = props.state
  const _disbaled = props.state[`${tabSelected}_dis2`]
    ? props.state[`${tabSelected}_dis2`]
    : false
  const checkAllow = props.state[`${tabSelected}_unit_supervisor_allow`]
  function handleDisable () {
    const result = disabled || _disbaled || !checkAllow || props.handleTimeOut()
    return result
  }
  return (
    <React.Fragment>
      <div className='title-password w-100 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>تخصیص کارشناس رسیدگی به حادثه</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div className='field-form selectBox'>
          <CreatableSelect
            onChange={newValue =>
              props.handleState({
                [`${tabSelected}_event_expert`]: newValue
              })
            }
            value={props.state[`${tabSelected}_event_expert`]}
            options={user_list}
            isDisabled={handleDisable()}
            placeholder={
              <label className='rtl'>
                کارشناس
                <span className='star IranSans_Bold'>*</span>
              </label>
            }
          />
        </div>
      </div>
      {!_disbaled ? (
        <div className='submit-form col-12'>
          <button
            onClick={() =>
              props.MainFn && !handleDisable()
                ? props.MainFn.handleSubmit2()
                : ''
            }
            disabled={handleDisable()}
          >
            {loading === `supervisor-${tabSelected}` ? (
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
export default ExpertSelection
