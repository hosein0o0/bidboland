import React, { useState } from 'react'
import Loading from '../layout/loading'
import axios from 'axios'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import { Link } from 'react-router-dom'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
function GetEmail (props) {
  const [Email, setEmial] = useState('')
  const [Disabled, setDisabled] = useState(false)
  const [loading, setloading] = useState(false)
  function handleSubmit () {
    if (handleCheckText(Email)) {
      setDisabled(true)
      setloading(true)
      let datareg = new FormData()
      datareg.append('email', Email)
      axios({
        method: 'post',
        url: `${StaticData.domainIp}/forgetPassword`,
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
          setDisabled(false)
          setloading(false)
          if (response.status === 200) {
            props.handleState('email', Email)
            props.handleState('Level', 2)
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
        <h3 className='IranSans_Bold'>لطفا ایمیل خود را خود وارد نمایید</h3>
      </div>
      <div className='form-login'>
        <div className='field-form'>
          <label>
            <span className='forgot-link'>
              <Link to='/login'>ورود</Link>
            </span>
          </label>
          <input
            className='ltr'
            type='email'
            onChange={e => setEmial(handleString(e.target.value))}
            tabIndex={1}
            value={handleString(Email)}
            autofocus={true}
          />
        </div>
        <div className='submit-form'>
          <button
            type='submit'
            onClick={handleSubmit}
            tabIndex={3}
            disabled={Disabled}
          >
            بازیابی کلمه عبور
            {loading ? <Loading /> : ''}
          </button>
        </div>
      </div>
    </div>
  )
}
export default GetEmail
