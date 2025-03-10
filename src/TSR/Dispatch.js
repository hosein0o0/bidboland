import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import StaticData from '../staticData'
const Dispatch = props => {
  const [user_list, setUser_list] = useState([])
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [userSelect, setUserSelect] = useState('')
  useEffect(() => {
    let array = props.props.state.user_list
    if (array) {
      setUser_list(array)
    }
  })
  async function handleSubmit () {
    if (props.isMulti) {
      MultiSelectSendback(userSelect)
    } else {
      SendBack(userSelect)
    }
  }
  async function MultiSelectSendback (array) {
    if (array) {
      if (array.length <= props.length) {
        await setLoading(true)
        await array.forEach(async data => {
          setTimeout(() => {
            SendBack(data)
          }, 100)
        })
        setTimeout(async () => {
          await setLoading(false)
        }, 100)
      } else {
        Notification.notify(Message.text(99), 'error')
      }
    }
  }
  async function SendBack (_data) {
    if (_data && _data.value) {
      const url = await `${StaticData.domainIp}/tsr/dispatch`
      const id = await props.props.state.id
      const token = await props.state.token
      await setLoading(true)
      await setDisabled(true)
      const datareg = await new FormData()
      await datareg.append('tsr_id', id)
      await datareg.append('user_id', _data.value)
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          await setLoading(false)
          await setDisabled(false)
          if (response.status === 200) {
            Notification.notify(Message.text(929), 'success')
            setTimeout(() => {
              window.location.reload(true)
            }, 5000)
          } else {
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
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  function handleChange (newValue) {
    if (props.isMulti) {
      let filter = newValue ? newValue.filter(data => !data.__isNew__) : []
      if (props.length >= filter.length) {
        setUserSelect(filter)
      }
    } else {
      const checkNew = newValue.__isNew__ ? true : false
      setUserSelect(checkNew ? '' : newValue)
    }
  }
  // function handleCheckPermission () {
  //   const check = props.Permision.handlePermision(
  //     props.state.role,
  //     'tsr_dispatch'
  //   )
  //   return check
  // }
  // if (handleCheckPermission()) {
  return (
    <div className='w-100'>
      <div className='title-password col-12 mt-3 mb-2 px-1'>
        <h2 className='IranSans_Bold'>دستگردانی</h2>
        <div className='line'></div>
      </div>
      <div className='row mx-0'>
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div className='field-form selectBox'>
            <CreatableSelect
              isMulti={props.isMulti ? true : false}
              value={userSelect}
              onChange={newValue => handleChange(newValue)}
              options={user_list}
              readOnly={props.state.canCreate}
              placeholder={
                <label className='rtl'>
                  تخصیص افراد
                  {props.isMulti ? ` (${props.length} نفر) ` : ''}
                  <span className='star IranSans_Bold'>*</span>
                </label>
              }
            />
          </div>
        </div>
        <div className='submit-form col-12 mb-2'>
          <button
            className='continue'
            disabled={disabled}
            onClick={handleSubmit}
          >
            {loading ? <Loading className='form-loader' /> : <DoneIcon />}
            دستگردانی
          </button>
        </div>

        {/* <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div
            className={`field-form persian textarea ${
              props.state.foucs === `furtherInformation` ||
              props.state.furtherInformation
                ? 'active'
                : ''
            }`}
          >
            <div className='col p-0'>
              <label className='textarea'>اطلاعات تکمیلی (اختیاری)</label>
              <textarea
                className='w-100'
                type='text'
                name={`furtherInformation`}
                onFocus={e => props.OnFocus(e.target.name)}
                onBlur={props.OnBlur}
                onChange={props.handleChange}
                value={
                  props.state.furtherInformation
                    ? props.state.furtherInformation
                    : ''
                }
              ></textarea>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
  // } else return ''
}
export default Dispatch
