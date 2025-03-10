import React, { useState } from 'react'
import ArchiveIcon from '@material-ui/icons/Archive'
import { Link } from 'react-router-dom'
import MessagesNote from './MessagesNote'
import EventsNote from './Events'
import axios from 'axios'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
function Bulletin (props) {
  const [tab, SetTab] = useState(2)
  const [select, SetSelect] = useState('')
  function handleShow () {
    if (tab === 1) {
      return <MessagesNote />
    } else if (tab === 2) {
      return (
        <EventsNote
          event={props.state.event}
          handleClick={hadnleOpenSingle}
          select={select}
        />
      )
    }
  }
  async function hadnleOpenSingle (data, key) {
    await SetSelect(select === data.id ? '' : data.id)
    const datareg = new FormData()
    datareg.append('id', data.id)
    let list = props.state.event
    let obj = list[key]
    if (obj.seen === '0') {
      props.handleState(
        'unreadMessageNumber',
        props.state.unreadMessageNumber - 1
      )
    }
    props.handleState('swapNumber', props.state.swapNumber - 1)

    obj.seen = '1'
    props.handleState('event', list)
    await axios({
      method: 'post',
      url: `${StaticData.domainIp}/notification/openSingle`,
      data: datareg,
      headers: {
        Authorization: `Bearer ${props.state.token ? props.state.token : null}`
      }
    })
      .then(response => {
        if (response.status !== 200) {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  return (
    <div className='box-notification'>
      <div className='box-notification-head'>
        <div className='box-notification-head-title'>
          <div className='archive-notication'>
            <Link to='/index-notification'>
              <ArchiveIcon />
            </Link>
          </div>
          <div className='w-auto'>
            <h4 className='title-text'>تابلو اعلانات</h4>
            <div className='w-100 text-center mt-3'>
              {props.state.unreadMessageNumber > 0 && (
                <span className='new-message IranSans_Medium_FA'>
                  {props.state.unreadMessageNumber} پیام جدید
                </span>
              )}
            </div>
          </div>
        </div>
        <div className='box-notification-head-tab'>
          <div
            className={`item-tab ${tab === 1 ? 'active' : ''}`}
            onClick={() => SetTab(1)}
          >
            <span>رویدادها</span>
          </div>
          <div
            className={`item-tab ${tab === 2 ? 'active' : ''}`}
            onClick={() => SetTab(2)}
          >
            <span>پیام‌ها</span>
          </div>
          <div className='border-bottom-active'>
            <span
              className={`line-active ${tab === 1 ? 'right' : 'left'}`}
            ></span>
          </div>
        </div>
      </div>
      <div className='box-notification-detail'>{handleShow()}</div>
    </div>
  )
}
export default Bulletin
