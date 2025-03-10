import React from 'react'
import CreatableSelect from 'react-select/creatable'
// import CheckIcon from '@material-ui/icons/Check'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
const SecretaryCommittee = props => {
  const {
    secretary_committee,
    user_list,
    tabSelected,
    loading,
    disabled,
    public_engineer_allow,
    dis_secretary_committee,
    allocation_secretary_committee_allow
  } = props.state
  function handleDisabled () {
    const checkTime = props.handleTimeOut() ? !props.handleContinue() : false
    const check =
      disabled ||
      tabSelected !== 'technical' ||
      !public_engineer_allow ||
      dis_secretary_committee ||
      checkTime ||
      !allocation_secretary_committee_allow
    return check
  }
  function ShowSubmit () {
    let array = []
    if (!dis_secretary_committee) {
      array.push(
        <div className='submit-form col-12'>
          <button
            onClick={() =>
              public_engineer_allow && props.MainFn
                ? props.MainFn.handleSign2()
                : ''
            }
            disabled={handleDisabled()}
          >
            {loading === `sing2-${tabSelected}` ? (
              <Loading className='form-loader' />
            ) : (
              <DoneIcon />
            )}
            ثبت اطلاعات
          </button>
        </div>
      )
    }
    return array
  }
  function handleChange (newValue) {
    if (tabSelected === 'technical') {
      props.handleState({
        secretary_committee: newValue
      })
    }
  }
  return (
    <React.Fragment>
      <div className='col-12'>
        <div className='title-password w-100 mt-4 mb-2'>
          <h2 className='IranSans_Bold'>
            تخصیص نفر به عنوان دبیر کمیته بررسی حادثه
          </h2>
          <div className='line'></div>
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div className='field-form selectBox'>
          <CreatableSelect
            onChange={newValue => handleChange(newValue)}
            value={secretary_committee}
            options={user_list}
            placeholder={
              <label className='rtl'>
                انتخاب دبیر کمیته
                <span className='star IranSans_Bold'>*</span>
              </label>
            }
            isDisabled={handleDisabled()}
          />
        </div>
      </div>
      {ShowSubmit()}
    </React.Fragment>
  )
}
export default SecretaryCommittee
