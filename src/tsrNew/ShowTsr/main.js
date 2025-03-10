import React from 'react'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import Revisions from './Revisions'
import TSR1 from '../tsr1/TechnicalServiceApplication'
import Message from './Message'
import TSR2 from '../tsr2/TSR2'
import Header from './Header'
import TSR3 from '../tsr3/tsr3'
import TSR4 from '../tsr4/TSR4'
import TSR5 from '../tsr5/TSR5'
import TSR6 from '../TSR6/TSR6'
import TSR7 from '../TSR7/TSR7'
import TSR8 from '../TSR8/TSR8'
import TSR9 from '../TSR9/TSR9'
import TSR10 from '../TSR10/TSR10'
import TSR11 from '../TSR11/TSR11'
import TSR12 from '../TSR12/TSR12'
import RejectHistor from './RejectHistor'
// import Dispatch from '../Dispatch/Dispatch'
const Main = props => {
  let { tsr1,  select, status, page, id } = props.state
  tsr1 = tsr1 || {}
  let { reject_reason } = tsr1
  // const checkPermission = props.Permision.handlePermision(role, 'tsr_revisions')
  function CheckMessage() {
    // const { handleGetStatus } = props.API
    const checkText = handleCheckText(reject_reason)
    // let stat = handleGetStatus(handleString(status), select)
    let stat = handleString(status)
    const checkStatus = stat.includes('reject')
    const checkLevel = select === page
    const check = checkText && checkStatus && checkLevel
    return check
  }
  function CheckAllow(name = 'update_allow') {
    const { handleSwitchid } = props.API
    const { edit_admin } = props.state
    let _state = props.state[`tsr${select}`] || {}
    const checkAdmin = parseInt(edit_admin) === 1
    const nameAdminPermission = `tsr${handleSwitchid(select)}admin_update_allow`
    const checkAllowAdmin = props.state[nameAdminPermission] ? true : false
    const checkAllow = checkAdmin ? checkAllowAdmin : _state[name] ? true : false
    return checkAllow
  }
  function hanldeShow() {
    switch (select) {
      case 1:
        return <TSR1 {...props} canUpdate={CheckAllow()} />
      case 2:
        return <TSR2 {...props} CheckAllow={name => CheckAllow(name)} />
      case 3:
        return <TSR3 {...props} CheckAllow={name => CheckAllow(name)} />
      case 4:
        return <TSR4 {...props} CheckAllow={name => CheckAllow(name)} />
      case 5:
        return <TSR5 {...props} CheckAllow={name => CheckAllow(name)} />
      case 6:
        return <TSR6 {...props} CheckAllow={name => CheckAllow(name)} />
      case 7:
        return <TSR7 {...props} CheckAllow={name => CheckAllow(name)} />
      case 8:
        return <TSR8 {...props} CheckAllow={name => CheckAllow(name)} />
      case 9:
        return <TSR9 {...props} CheckAllow={name => CheckAllow(name)} />
      case 10:
        return <TSR10 {...props} CheckAllow={name => CheckAllow(name)} />
      case 11:
        return <TSR11 {...props} CheckAllow={name => CheckAllow(name)} />
      case 12:
        return <TSR12 {...props} CheckAllow={name => CheckAllow(name)} />

      default:
        return ''
    }
  }
  const HandleCompareDate = () => {
    const { HandleCompareDateAPI } = props.API
    const result = HandleCompareDateAPI()
    if (result) return (
      <React.Fragment>
        <Message {...props} />
        <RejectHistor {...props} />
      </React.Fragment>
    )
    else return (
      <React.Fragment>
        <RejectHistor {...props} />
        <Message {...props} />
      </React.Fragment>
    )
  }
  const checkMessage = CheckMessage()
  const ShowMessage = HandleCompareDate()
  return (
    <div className='col-xl-8 col-lg-12 col-md-12 col-12'>
      {ShowMessage}
      {checkMessage && (
        <div className='col-12'>
          <div className='message-error'>
            <label className='strong'>
              <span className='ml-1 IranSans_Medium_FA'>
                درخواست خدمات فنی {handleString(id)}
              </span>
              به دلیل زیر رد شد
            </label>
            <p className='m-0 IranSans_Medium_FA'>{handleString(reject_reason)}</p>
          </div>
        </div>
      )}
      {select > 1 && <Revisions {...props} />}
      {select > 1 && <Header {...props} />}
      {hanldeShow()}
    </div>
  )
}
export default Main
