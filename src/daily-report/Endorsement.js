import React from 'react'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
function Endorsement (props) {
  return (
    <div className='form row'>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs === 'FullNameKargah' ||
            handleCheckText(props.state.FullNameKargah)
              ? 'active'
              : ''
          }`}
        >
          <div className='col p-0'>
            <label>
              نام و نام خانوادگی
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              disabled={true}
              type='text'
              name='FullNameKargah'
              value={handleString(props.state.FullNameKargah)}
            />
            <div
              className='Signature'
              //  onClick={()=>props.setState({popUp : true})}
            >
              <span>
                <AttachFileIcon className='attach' />
                امضا
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs === 'FullNameKargah' ||
            handleCheckText(props.state.FullNameKargah)
              ? 'active'
              : ''
          }`}
        >
          <div className='col p-0'>
            <label>
              نام و نام خانوادگی
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              disabled={true}
              type='text'
              name='FullNameKargah'
              value={handleString(props.state.FullNameKargah)}
            />
            <div
              className='Signature'
              //  onClick={()=>props.setState({popUp : true})}
            >
              <span>
                <AttachFileIcon className='attach' />
                امضا
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs === 'FullNameKargah' ||
            handleCheckText(props.state.FullNameKargah)
              ? 'active'
              : ''
          }`}
        >
          <div className='col p-0'>
            <label>
              نام و نام خانوادگی
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              disabled
              type='text'
              name='FullNameKargah'
              value={handleString(props.state.FullNameKargah)}
            />
            <div
              className='Signature'
              //  onClick={()=>props.setState({popUp : true})}
            >
              <span>
                <AttachFileIcon className='attach' />
                امضا
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='submit-form col-12'>
        <button>
          {props.state.loading === 'submit' ? (
            <Loading className='form-loader' />
          ) : (
            <DoneIcon />
          )}
          ثبت اطلاعات
        </button>
      </div>
    </div>
  )
}
export default Endorsement
