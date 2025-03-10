import React, { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import StaticData from '../staticData'
import Loading from '../layout/loading'
import axios from 'axios'
function EditBeforeRequest (props) {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  async function handleEdit () {
    const { select, id, token } = props.state
    const url = `${StaticData.domainIp}/tsr/openUpdate/${id}/page/${select}`
    await setLoading(true)
    await setDisabled(true)
    await axios({
      method: 'post',
      url: url,
      headers: {
        Authorization: token ? `Bearer ${token}` : null
      }
    })
      .then(async response => {
        await setLoading(false)
        if (response.status === 200) {
          await Notification.notify(Message.text(926), 'success')
          setTimeout(async () => {
            setDisabled(false)
            window.location.reload(true)
          }, 5000)
        } else {
          setDisabled(false)
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        setLoading(false)
        setDisabled(false)
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  return (
    <div className='EditBack'>
      <button
        className='pointer'
        onClick={() => handleEdit()}
        disabled={disabled}
      >
        {loading ? (
          <Loading className='form-loader' />
        ) : (
          <EditIcon className='ml-1' />
        )}
        ویرایش فرم
      </button>
    </div>
  )
}
export default EditBeforeRequest
