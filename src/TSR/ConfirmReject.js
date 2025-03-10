import React, { useState } from 'react'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import ThumbDownAltRoundedIcon from '@material-ui/icons/ThumbDownAltRounded'
import CloseIcon from '@material-ui/icons/Close'
import axios from 'axios'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
const ConfirmReject = props => {
  const [value, setValue] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(null)
  async function handleSubmit (status) {
    const { token, IdSelected } = props.state
    const check = status ? true : handleCheckText(value)
    if (check) {
      setDisabled(true)
      setLoading(status ? '_accept_' : 'reject')
      const datareg = await new FormData()
      await datareg.append('tsr_id', IdSelected)
      await datareg.append('verified', status)
      await datareg.append('verify_msg', value)
      const url = await `${StaticData.domainIp}/tsr/verifyTsr`
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          if (response.status === 200) {
            Notification.notify(Message.text(930), 'success')
            setTimeout(() => {
              setDisabled(null)
              setLoading(null)
              props.handleState({ IdSelected: null })
              if (props.props.handleState) {
                props.props.handleState('select', 2)
              }
            }, 5000)
          } else {
            props.handleState({ IdSelected: null })
            setDisabled(null)
            setLoading(null)
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          props.handleState({ IdSelected: null })
          setDisabled(null)
          setLoading(null)
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  return (
    <div className='backGroundPopup'>
      <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
        <div className='box-wellcome'>
          <div className='title-wellcome'>
            <span className='col p-0'>بررسی اولیه TSR</span>
            <CloseIcon onClick={() => props.handleState({ IdSelected: '' })} />
          </div>
          <div className='w-100'>
            <div className='main-textarea'>
              <textarea
                onChange={e => setValue(e.target.value)}
                placeholder='لطفا دلیل خود را جهت رد کردن وارد کنید(اجباری)'
                value={handleString(value)}
              ></textarea>
            </div>
            <div className='buttons-wellcome justify-content-center'>
              <button
                className='_accept_ pt-0 pb-0'
                onClick={() => handleSubmit(true)}
                disabled={disabled}
              >
                {loading === '_accept_' ? (
                  <Loading className='form-loader mr-0 ml-2' />
                ) : (
                  <DoneIcon className='ml-2 mt-2 mb-2' />
                )}
                تائید
              </button>
              <button
                className='pt-0 pb-0 reject'
                onClick={() => handleSubmit(false)}
                disabled={disabled}
              >
                {loading === 'reject' ? (
                  <Loading className='form-loader mr-0 ml-2' />
                ) : (
                  <ThumbDownAltRoundedIcon className='ml-2 mt-2 mb-2' />
                )}
                رد
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ConfirmReject
