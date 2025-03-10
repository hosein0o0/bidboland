import React from 'react'
import CreatableSelect from 'react-select/creatable'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../../layout/loading'
import SupervisorName from './SupervisorName'
// import handleString from '../../handleString'
const SupervisorAssignment = props => {
  let { state, API, handleState } = props
  const { disabled, loading } = state
  const { ListUserSuperVisor, ValueTable, handleSubmitAPI1 } = API
  let value_table = ValueTable()
  let name = `${value_table}_supervisor_id`
  let nameValue = `${value_table}_supervisor`
  function handleList() {
    let result = ListUserSuperVisor()
    return result
  }
  function handleChange(newValue) {
    if (!newValue.__isNew__) {
      let { value } = newValue
      handleState({
        [name]: value,
        [nameValue]: newValue
      })
    }
  }
  function handleSubmit() {
    handleSubmitAPI1()
  }
  let nameShow = `${value_table}_allocation_allow`
  const parentState = props.props.state || {}
  const { page } = parentState
  let checkShow = props.state[nameShow] ? true : false
  const showSubmit = page === 10
  if (checkShow) {
    return (
      <div className='w-100 row mx-0'>
        <div className='title-password col-12 mt-3 mb-2'>
          <h2 className='IranSans_Bold'>تخصیص سرپرست</h2>
          <div className='line'></div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-6 col-12'>
          <div className='field-form selectBox rtl'>
            <CreatableSelect
              onChange={handleChange}
              value={state[nameValue]}
              isDisabled={!showSubmit}
              options={handleList()}
              placeholder={
                <label>
                  <span className='star IranSans_Bold'>*</span>
                  سرپرست
                </label>
              }
            />
          </div>
        </div>
        {showSubmit &&
          <div className='submit-form col-12 mb-2'>
            <button
              className='continue'
              disabled={disabled}
              onClick={() => handleSubmit()}
            >
              {loading === name ? (
                <Loading className='form-loader' />
              ) : (
                <DoneIcon />
              )}
              ثبت اطلاعات
            </button>
          </div>
        }
      </div>
    )
  } else return <SupervisorName {...props} />
}
export default SupervisorAssignment
