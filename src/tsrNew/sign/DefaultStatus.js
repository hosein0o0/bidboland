import React from 'react'
import Loading from '../../layout/loading'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import handleString from '../../handleString'
import PopUpReject from './PopUpReject'
// import handleCheckText from '../../handleCheckText'
const DefaultStatus = props => {
  function CheckPermission () {
    let result = props.state[props.data.permission] ? true : false
    return result
  }
  function handleVerify (status) {
    const { handleState, handleVerify } = props.props
    let { value } = props.data
    if (CheckPermission()) {
      handleState({ loading: `${value}_loadA`, disabled: true })
      handleVerify(status, props.data)
    }
  }
  function handleName () {
    let { firstName, lastName } = props.data
    let Fname = props.state[firstName],
      Lname = props.state[lastName]
    let fullName = `${handleString(Fname)} ${handleString(Lname)}`
    return fullName
  }
  function handleReject () {
    const { handleState } = props.props

    if (CheckPermission()) {
      handleState({ rejectSelect: props.data })
    }
  }
  const { loading, disabled } = props.props.state
  function CheckOpenReject () {
    let state1 = props.state.rejectSelect
    let state2 = props.props.state.rejectSelect
    let result = state1 || state2
    return result
  }
  return (
    <div className='col-xl-6 col-lg-6 col-md-6 col-12 my-3' key={props._key}>
      <div className='item-sign-tsr'>
        <div className='title-password col-12 mt-3 mb-2 px-1'>
          <h2 className='IranSans_Bold'>{handleString(props.data.name)}</h2>
          <div className='line'></div>
        </div>
        <div className='w-100 d-flex mt-3'>
          <div className='col-6 px-1'>
            <button
              className={`btn-sign-tst pointer confirmation white-space-nowrap`}
              disabled={!CheckPermission() || disabled}
              onClick={() => handleVerify('accepted')}
            >
              {loading === `${props.data.value}_loadA` ? (
                <Loading className='form-loader mr-0 ml-2' />
              ) : (
                <CheckIcon className='ml-1 mt-1 mb-1' />
              )}
              مورد تائید می‌باشد
            </button>
          </div>
          {!props.data.cantReject && (
            <div className='col-6 px-1'>
              <button
                className='btn-sign-tst pointer reject white-space-nowrap'
                disabled={!CheckPermission() || disabled}
                onClick={handleReject}
              >
                <CloseIcon className='ml-1 mt-1 mb-1' />
                مورد تائید نمی‌باشد
              </button>
            </div>
          )}
        </div>
        <span key={props._key} className={`_nameSign`}>
          {handleName()}
        </span>
      </div>
      {CheckOpenReject() && <PopUpReject {...props} />}
    </div>
  )
}
export default DefaultStatus
