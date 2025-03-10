import React, { useState } from 'react'
import Loading from '../../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import ThumbDownAltRoundedIcon from '@material-ui/icons/ThumbDownAltRounded'
import CloseIcon from '@material-ui/icons/Close'
import axios from 'axios'
import StaticData from '../../staticData'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import EditIcon from '@material-ui/icons/Edit'
const ConfirmReject = props => {
  const [value, setValue] = useState('')
  async function handleSubmit (status) {
    const { handleVerfy } = props.FetchApi
    handleVerfy(status, value)
  }
  const { loading, disabled } = props.state
  return (
    <div className='backGroundPopup'>
      <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
        <div className='box-wellcome'>
          <div className='title-wellcome'>
            <span className='col p-0'>بررسی اولیه درخواست خدمات فنی</span>
            <CloseIcon onClick={() => props.handleState({ IdSelected: '' })} />
          </div>
          <div className='w-100'>
            <div className='main-textarea'>
              <textarea
                className='rtl'
                onChange={e => setValue(handleString(e.target.value).slice(0, 300))}
                placeholder='لطفا دلیل خود را جهت رد کردن وارد کنید(اجباری)'
                value={handleString(value)}
              ></textarea>
            </div>
            <div className='buttons-wellcome justify-content-center'>
              <button
                className='_accept_ pt-0 pb-0'
                onClick={() => handleSubmit('accepted')}
                disabled={disabled}
              >
                {loading === 'accepted' ? (
                  <Loading className='form-loader mr-0 ml-2' />
                ) : (
                  <DoneIcon className='ml-2 mt-2 mb-2' />
                )}
                تائید
              </button>
              <button
                className='pt-0 pb-0 reject'
                onClick={() => handleSubmit('reject')}
                disabled={disabled}
              >
                {loading === 'reject' ? (
                  <Loading className='form-loader mr-0 ml-2' />
                ) : (
                  <CloseIcon className='ml-2 mt-2 mb-2' />
                )}
                رد
              </button>
              <button
                className='pt-0 pb-0 comment'
                onClick={() => handleSubmit('comment')}
                disabled={disabled}
              >
                {loading === 'comment' ? (
                  <Loading className='form-loader mr-0 ml-2' />
                ) : (
                  <EditIcon className='ml-2 mt-2 mb-2' />
                )}
                اصلاحیه
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ConfirmReject
