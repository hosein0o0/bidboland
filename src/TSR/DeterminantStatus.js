import React, { useState } from 'react'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import CreatableSelect from 'react-select/creatable'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'

const DeterminantStatus = props => {
  const [deter, setDeter] = useState('')
  const [cause, setCause] = useState('')
  return (
    <div className='backGroundPopup'>
      <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
        <div className='box-wellcome'>
          <div className='col-12'>
            <div className='title-wellcome mb-3'>
              <span className='col p-0'>تعیین وضعیت</span>
              <CloseRoundedIcon
                onClick={() => props.handleState({ determinant: false })}
              />
            </div>
          </div>
          <div className='main-form'>
            <div className='w-100 form my-1'>
              <div className='col-12'>
                <div className='field-form selectBox my-1'>
                  <CreatableSelect
                    value={deter ? deter : ''}
                    onChange={newValue => setDeter(newValue)}
                    options={props.state.deterSuggest}
                    placeholder={
                      <label className='rtl'>
                        تعیین وضعیت
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                    }
                  />
                </div>
              </div>
              <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                <div
                  className={`field-form persian textarea ${
                    props.state.foucs === `cause` || handleCheckText(cause) ? 'active' : ''
                  }`}
                >
                  <div className='col p-0'>
                    <label className='textarea'>دلیل</label>
                    <textarea
                      className='w-100'
                      type='text'
                      name={`cause`}
                      onFocus={e => props.handleState('foucs', e.target.name)}
                      onBlur={() => props.handleState('foucs', '')}
                      onChange={e => setCause(e.target.value)}
                      value={handleString(cause)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className='col-12'>
                <div className='submit-form'>
                  <button
                    className='accept pt-0 pb-0'
                    // onClick={() => Verify()}
                    // disabled={props.props.state.disabled || handleDisabled()}
                    // onClick={() => props.handleVerify(selectRJ)}
                  >
                    {props.state.loading === 'submit-unaccept' ? (
                      <Loading className='form-loader mr-0 ml-2' />
                    ) : (
                      <DoneIcon className='ml-2 mt-2 mb-2' />
                    )}
                    ثبت
                  </button>
                  <button
                    className='pt-0 pb-0 mr-3'
                    onClick={() => props.handleState({ determinant: false })}
                  >
                    <CloseRoundedIcon className='ml-2' />
                    بستن
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DeterminantStatus
