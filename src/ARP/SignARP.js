import React, { useState } from 'react'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import PopUpReject from './PopUpReject'
import Loading from '../layout/loading'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
import moment from 'moment-jalaali'
function SignARP(props) {
  const [key, setKey] = useState('')
  const parentState = props.props.state || {}
  async function Accept(data, key) {
    if (!parentState.disabledRev) {
      await props.props.handleState({
        rejectSelect: data,
        notShow: true,
        loading: `${data.value}_${key}`,
        disabled: `${data.value}_${key}`
      })
      await props.props.handleVerify(true)
    }
  }
  function SecondState(data) {
    if (data.secondState) {
      let i = 0,
        check = false
      while (i < data.secondState.length) {
        check = props.state[data.secondState[i]] === null
        i++
        if (!check) {
          break
        }
      }
      return check
    } else {
      return true
    }
  }
  function CheckDisabled(data, key) {
    const check1 =
      parentState.disabled === `${data.value}_${key}` || parentState.disabledRev
    const check2 = props.props.CheckCanSign()
    const check3 = props.state[`${data.value}_allow`]
    const check4 = data.check ? CheckSign(data.check) : true
    const checkResult = (check2 && check1) || !check3 || !check4
    return checkResult
  }
  function FirstState(data) {
    if (props.state[data.state] === undefined) {
      return true
    } else return props.state[data.state] === null
  }
  const handleTime = (data) => {
    let nameDate = `${data.state}_at`
    const date = props.state[nameDate]
    let result = ''
    if (date) {
      result = moment(date, 'YYYY-MM-DD HH:mm')
        .locale('fa')
        .format('(HH:mm jYYYY/jMM/jDD)')
    }
    return result
  }
  function handleName(data, key, signed = false) {
    let nameValue = `${data.value}_info`
    let _data = props.state[nameValue] || {}
    let { first_name, last_name } = _data
    let array = []
    let date = handleTime(data)
    if (_data) {
      const check = handleCheckText(first_name) && handleCheckText(last_name)
      if (check) {
        array.push(
          <span key={key} className={`_nameSign ${signed ? '_signed' : ''} IranSans_Medium_FA`}>
            {handleString(`${first_name} ${last_name}`)} {date}
          </span>
        )
      }
    }
    return array
  }
  function handleShow(data, key) {
    if (FirstState(data) && SecondState(data)) {
      if (parentState.disabledRev) {
        return (
          <div className='col-xl-6 col-lg-6 col-md-6 col-12' key={key}>
            <div className='item-sign-tsr'>
              <div className='title-password col-12 mt-3 mb-2 px-1'>
                <h2 className='IranSans_Bold'>{handleString(data.name)}</h2>
                <div className='line'></div>
              </div>
              <div className='signed mt-3'>
                <span className='NotChecked'>
                  <CloseIcon />
                  مورد بررسی قرار نگرفته است
                </span>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className='col-xl-6 col-lg-6 col-md-6 col-12' key={key}>
            <div className='item-sign-tsr'>
              <div className='title-password col-12 mt-3 mb-2 px-1'>
                <h2 className='IranSans_Bold'>{handleString(data.name)}</h2>
                <div className='line'></div>
              </div>
              <div className='w-100 d-flex mt-3'>
                {/* {!data.notCanAccept && (
                    )} */}
                <div className='col-6 px-1'>
                  <button
                    className={`btn-sign-tst pointer confirmation ${parentState.disabled === `${data.value}_${key}`
                      ? 'disabled'
                      : ''
                      }`}
                    onClick={() => Accept(data, key)}
                    disabled={CheckDisabled(data, key)}
                  >
                    {parentState.loading === `${data.value}_${key}` ? (
                      <Loading className='form-loader mr-0 ml-2' />
                    ) : (
                      <CheckIcon className='ml-2 mt-2 mb-2' />
                    )}
                    مورد تائید می‌باشد
                  </button>
                  {handleName(data, key)}
                </div>
              </div>
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className='col-xl-6 col-lg-6 col-md-6 col-12' key={key}>
          <div className='item-sign-tsr'>
            <div className='title-password col-12 mt-3 mb-2 px-1'>
              <h2 className='IranSans_Bold'>{data.name}</h2>
              <div className='line'></div>
            </div>
            <div className='signed mt-3'>
              {handleSign(props.state[data.state])}
              {handleName(data, key, true)}
            </div>
          </div>
        </div>
      )
    }
  }
  function handleSign(status) {
    if (status === '0') {
      return (
        <span className='reject_text'>
          <CloseIcon />
          مورد تائید قرار نگرفت
        </span>
      )
    } else if (status === '1' || status.length === 5) {
      return (
        <span className='accept_text '>
          <CheckIcon />
          مورد تائید قرار گرفت
        </span>
      )
    } else return ''
  }
  function CheckHold(data) {
    return data.hold ? CheckSign(data.hold) : true
  }
  function CheckSign(hold) {
    let _data = props.state[hold] ? props.state[hold] : null
    const result = _data === '1' || _data === '0'
    return result
  }
  const { state } = props.props
  const _check = state.select <= state.level
  if (_check) {
    return (
      <div className='col-12 p-0'>
        <div className='row mx-0 main-sign-tsr'>
          {state.listSign &&
            state.listSign.map((data, key) =>
              CheckHold(data) ? handleShow(data, key) : ''
            )}
        </div>
        {state.rejectSelect && !state.notShow && (
          <PopUpReject {...props} setKey={key => setKey(key)} _key={key} />
        )}
      </div>
    )
  } else return ''
}
export default SignARP
