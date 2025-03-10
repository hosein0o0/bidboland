import React from 'react'
import FirstReject from './FirstReject'
import CloseIcon from '@material-ui/icons/Close'
import axios from 'axios'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import SecondReject from './SecondReject'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
const Report = props => {
  async function handleData(status) {
    const { arp_id, token } = props.state
    const datareg = new FormData()
    datareg.append('arp_id', arp_id)
    datareg.append('status', status)
    const url = `${StaticData.domainIp}/arp/getStatusDetail`
    props.handleState({
      disabled: true,
      loading: status
    })
    await axios({
      method: 'post',
      url: url,
      data: datareg,
      headers: {
        Authorization: token ? `Bearer ${token}` : null
      }
    })
      .then(async response => {
        const { content } = response.data
        if (response.status === 200) {
          let _array = content
          if (_array) {
            let _list = []
            _array.forEach(value => {
              let list = value.split('/')
              let responsible = list[0] ? list[0] : ''
              let action = list[1] ? list[1] : []
              _list.push({
                responsible: responsible,
                action: action
              })
            })
            props.handleState({
              _list: _list,
              _part: 'second'
            })
          }
          props.handleState({
            loading: '',
            disabled: false
          })
        } else {
          props.handleState({
            disabled: false
          })
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        props.handleState({
          disabled: false,
          loading: ''
        })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  return (
    <div className='backGroundPopup'>
      <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
        <div className='box-wellcome'>
          <div className='row mx-0 mb-2'>
            <div className='close d-flex'>
              <CloseIcon
                onClick={() =>
                  props.handleState({
                    popup: false,
                    status: [],
                    arp_id: '',
                    _list: [],
                    _part: 'first'
                  })
                }
              />
            </div>
            {props.state._part === 'second' ? (
              <div className='_handle-level'>
                <span
                  className='align-items-center d-flex pointer'
                  onClick={() => {
                    props.handleState({
                      _list: [],
                      _part: 'first'
                    })
                  }}
                >
                  مرحله قبل
                  <ChevronLeftIcon />
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
          {props.state._part === 'first' ? (
            <FirstReject {...props} handleData={handleData} />
          ) : (
            <SecondReject {...props} />
          )}
        </div>
      </div>
    </div>
  )
}
export default Report
