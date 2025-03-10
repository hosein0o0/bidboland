import React, { useState, useEffect } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import EmailIcon from '@material-ui/icons/Email'
import moment from 'moment'
import { CheckEmail } from '../../CheckEmail'
import handleString from '../../handleString'
const AddEmail = props => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [status, setStatus] = useState('Email')
  return (
    <div className='backGroundPopup'>
      <div className='col-xl-4 col-lg-5 col-md-6 col-12'>
        <div className='box-wellcome'>
          <div className='title-wellcome'>
            <h3 className='title-add-email mb-0 col px-0'>افزودن ایمیل جدید</h3>
            <CloseIcon onClick={() => props.handleState('addEmail', false)} />
          </div>
          {status === 'Email' ? (
            <EnterEmail
              setEmail={value => setEmail(value)}
              email={email}
              setStatus={value => setStatus(value)}
            />
          ) : (
            <EnterCode
              email={email}
              code={code}
              setCode={value => setCode(value)}
              setStatus={value => setStatus(value)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
const EnterEmail = props => {
  return (
    <div className='main-add-email-form'>
      <div className='title-form-add-email'>
        <span>لطفا ایمیل خود را در باکس زیر وارد نمائید</span>
      </div>
      <div className='field-form-add-email mt-3 mb-5 ltr'>
        <div className='icon'>
          <EmailIcon />
        </div>
        <div className='col p-0'>
          <input
            className='input-field-form-add-email text-left'
            placeholder='example@gmail.com'
            value={handleString(props.email)}
            onChange={e => props.setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className='submit'>
        <button
          className='pointer'
          onClick={() =>
            CheckEmail(props.email) ? props.setStatus('code') : ''
          }
        >
          ارسال کد تائید
        </button>
      </div>
    </div>
  )
}
const EnterCode = props => {
  const [time, setTime] = useState('')
  useEffect(handleTime, [])
  function handleTime () {
    const dateTime = moment('02:00', 'mm:ss')
    let result = ''
    const check = setInterval(() => {
      dateTime.subtract(1, 'seconds')
      result = dateTime.format('mm:ss')
      if (result === '00:00') {
        clearInterval(check)
      }
      setTime(result)
    }, 1000)
  }
  return (
    <div className='main-add-email-form'>
      <div className='title-form-add-email'>
        <span>
          {`کد تائید ارسال شده به ایمیل 
          ${props.email}
           را وارد نمائید`}
        </span>
      </div>
      <div className='field-form-add-email mt-3 mb-3 rtl'>
        <div className='col p-0'>
          <input
            className='input-field-form-add-email'
            placeholder='کد تائید'
            value={handleString(props.code)}
            onChange={e => props.setCode(e.target.value)}
            type='number'
          />
        </div>
      </div>
      <div className='timer-code'>
        <span>{time} تا ارسال مجدد کد تایید</span>
      </div>
      <div className='submit row mx-0'>
        <div className='col-8 pr-0 pl-1'>
          <button className='pointer'>ثبت ایمیل</button>
        </div>
        <div className='col-4 pr-1 pl-0'>
          <button
            className='pointer edit'
            onClick={() => props.setStatus('Email')}
          >
            ویرایش ایمیل
          </button>
        </div>
      </div>
    </div>
  )
}
export default AddEmail
