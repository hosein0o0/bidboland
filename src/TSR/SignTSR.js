import React, { useState } from 'react'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import PopUpReject from './PopUpReject'
import Loading from '../layout/loading'
// import Dispatch from './Dispatch'
function SignTSR (props) {
  const stateParent = props.props.state
  const [key, setKey] = useState('')
  // const [canDisapatch, setCanDisapatch] = useState(false)
  // useEffect(() => {
  //   setCanDisapatch(CheckDispatch())
  // }, [props])
  async function Reject (data, key) {
    if (!stateParent.disabledRev) {
      await setKey(key)
      await props.props.handleState('notShow', false)
      await props.props.handleState('rejectSelect', data)
    }
  }
  async function Accept (data, key) {
    if (!stateParent.disabledRev) {
      await props.props.handleState('rejectSelect', data)
      await props.props.handleState('notShow', true)
      await props.props.handleState('loading', `${data.value}_${key}`)
      await props.props.handleState('disabled', `${data.value}_${key}`)
      await props.props.handleVerify(true)
    }
  }
  function handleCheckDisabled (data, key) {
    // const signLevel = props.props.status !== 'sign'
    const check =
      stateParent.disabled === `${data.value}_${key}` || stateParent.disabledRev
    // const secondCheck = props.disabled ? true : false
    // const resultCheck = (check || secondCheck) && signLevel
    return check
  }
  function SecondState (data) {
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
  function FirstState (data) {
    if (props.state[data.state] === undefined) {
      return true
    } else return props.state[data.state] === null
  }
  function handleShow (data, key) {
    if (FirstState(data) && SecondState(data)) {
      if (stateParent.disabledRev) {
        return (
          <div className='col-xl-6 col-lg-6 col-md-6 col-12' key={key}>
            <div className='item-sign-tsr'>
              <div className='title-password col-12 mt-3 mb-2 px-1'>
                <h2 className='IranSans_Bold'>{data.name}</h2>
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
                <h2 className='IranSans_Bold'>{data.name}</h2>
                <div className='line'></div>
              </div>
              <div className='w-100 d-flex mt-3'>
                {!data.notCanAccept && (
                  <div className='col-6 px-1'>
                    <button
                      className={`btn-sign-tst pointer confirmation 
                                  ${
                                    stateParent.disabled ===
                                    `${data.value}_${key}`
                                      ? 'disabled'
                                      : ''
                                  }`}
                      onClick={() => Accept(data, key)}
                      disabled={handleCheckDisabled(data, key)}
                    >
                      {stateParent.loading === `${data.value}_${key}` ? (
                        <Loading className='form-loader mr-0 ml-2' />
                      ) : (
                        <CheckIcon className='ml-2 mt-2 mb-2' />
                      )}
                      مورد تائید می‌باشد
                    </button>
                  </div>
                )}
                <div className='col-6 px-1'>
                  {data.itemReject && (
                    <button
                      className={`btn-sign-tst pointer reject
                                ${
                                  stateParent.disabled ===
                                  `${data.value}_${key}`
                                    ? 'disabled'
                                    : ''
                                }`}
                      onClick={() =>
                        stateParent.disabled !== `${data.value}_${key}` &&
                        Reject(data, key)
                      }
                      disabled={handleCheckDisabled(data, key)}
                    >
                      {stateParent.loading === `reject_${key}` ? (
                        <Loading className='form-loader mr-0 ml-2' />
                      ) : (
                        <CloseIcon className='ml-2 mt-2 mb-2' />
                      )}
                      مورد تائید نمی‌باشد
                    </button>
                  )}
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
            </div>
          </div>
        </div>
      )
    }
  }
  function handleSign (status) {
    if (status === '0') {
      return (
        <span className='reject_text'>
          <CloseIcon />
          مورد تائید قرار نگرفت
        </span>
      )
    } else if (status === '1') {
      return (
        <span className='accept_text '>
          <CheckIcon />
          مورد تائید قرار گرفت
        </span>
      )
    } else return ''
  }
  // function CheckDispatch () {
  //   let check = false
  //   const NotDisabled = !stateParent.disabledRev
  //   const _array = props.state.listSign
  //   let i = 0
  //   while (i < _array.length) {
  //     let _obj = _array[i]
  //     check = FirstState(_obj) && SecondState(_obj) && NotDisabled
  //     if (!check) {
  //       break
  //     }
  //     i++
  //   }
  //   return check
  // }
  function handleCheckShow (data) {
    // const permision = props.Permision.handlePermision(
    //   props.state.role,
    //   data.permission
    // )
    const verify = data.hold ? CheckSign(data.hold) : true
    const check = verify
    return check
  }
  function CheckSign (hold) {
    let _data = props.state[hold] ? props.state[hold] : null
    const result = _data === '1' || _data === '0'
    return result
  }
  const _check = stateParent.select <= stateParent.level
  if (_check) {
    return (
      <div className='col-12 p-0'>
        <div className='row mx-0 main-sign-tsr'>
          {props.state.listSign &&
            props.state.listSign.map((data, key) =>
              handleCheckShow(data) ? handleShow(data, key) : ''
            )}
        </div>
        {stateParent.rejectSelect && !stateParent.notShow && (
          <PopUpReject {...props} setKey={key => setKey(key)} _key={key} />
        )}
      </div>
    )
  } else return ''
}
export default SignTSR
