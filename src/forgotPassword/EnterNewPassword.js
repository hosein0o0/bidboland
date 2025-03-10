import React, { useState } from 'react'
import Loading from '../layout/loading'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffRounded'
import VisibilityIcon from '@material-ui/icons/VisibilityRounded'
import axios from 'axios'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import Cookies from 'js-cookie'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
function GetEmail (props) {
  const [password, setPassword] = useState('')
  const [Disabled, setDisabled] = useState(false)
  const [loading, setloading] = useState(false)
  const [check, setCheck] = useState(false)
  const [RepeatPassword, setRepeatPassword] = useState('')
  function handleSubmit () {
    if (
      handleCheckText(password) &&
      handleCheckText(RepeatPassword) &&
      RepeatPassword === password
    ) {
      setDisabled(true)
      setloading(true)
      let datareg = new FormData()
      datareg.append('email', props.email)
      datareg.append('code', props.code)
      datareg.append('password', password)
      axios({
        method: 'post',
        url: `${StaticData.domainIp}/forget/changePassword`,
        data: datareg,
        config: {
          headers: {
            Authorization: `Bearer ${props.token ? props.token : null}`
          },
          processData: false,
          contentType: 'application/json',
          mimeType: 'multipart/form-data'
        }
      })
        .then(response => {
          if (response.status === 200) {
            Notification.notify(Message.text(918), 'success')
            setTimeout(() => {
              props.handleState('redirect', true)
              setloading(false)
              setDisabled(false)
              Cookies.remove('Level')
              Cookies.remove('email')
              Cookies.remove('code')
              Cookies.remove('password')
              Cookies.remove('token')
            }, 5000)
          } else {
            setDisabled(false)
            setloading(false)
            if (response.status === 320) {
              Notification.notify(Message.text(916), 'error')
            } else if (response.status === 214) {
              Notification.notify(Message.text(917), 'error')
            } else {
              Notification.notify(Message.text(response.status), 'error')
            }
          }
        })
        .catch(err => {
          setDisabled(false)
          setloading(false)
          if (err.response) {
            if (err.response.status === 320) {
              Notification.notify(Message.text(916), 'error')
            } else if (err.response.status === 214) {
              Notification.notify(Message.text(917), 'error')
            } else {
              Notification.notify(Message.text(err.response.status), 'error')
            }
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  return (
    <div className='box-login'>
      <div className='title-login'>
        <h3 className='IranSans_Bold'>لطفا رمز عبور جدید خود را وارد نمایید</h3>
      </div>
      <div className='form-login'>
        <div className='field-form'>
          <label className='d-flex'>رمز عبور</label>
          <div className='w-100 position-relative d-flex align-items-center'>
            <div className='show-hidden' onClick={() => setCheck(!check)}>
              {check ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div>
            <input
              className='pr-5 ltr'
              type={`${check ? 'text' : 'password'}`}
              onChange={e => setPassword(handleString(e.target.value))}
              tabIndex={2}
              value={handleString(password)}
            />
          </div>
        </div>
        <div className='field-form'>
          <label className='d-flex'>تکرار رمز عبور</label>
          <div className='w-100 position-relative d-flex align-items-center'>
            <div className='show-hidden' onClick={() => setCheck(!check)}></div>
            <input
              className='pr-5 ltr'
              type={`${check ? 'text' : 'password'}`}
              onChange={e => setRepeatPassword(handleString(e.target.value))}
              tabIndex={2}
              value={handleString(RepeatPassword)}
            />
          </div>
        </div>
        <div className='submit-form'>
          <button
            type='submit'
            onClick={handleSubmit}
            tabIndex={3}
            disabled={Disabled}
          >
            ثبت رمز عبور
            {loading ? <Loading /> : ''}
          </button>
        </div>
      </div>
    </div>
  )
}
export default GetEmail
