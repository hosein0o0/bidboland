import React, { useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../../layout/loading'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import ShowNameDispacht from './ShowNameDispacht'
import History from './History'
import handleCheckText from '../../handleCheckText'
const Dispatch = props => {
  // const [userDetail, setUserDetail] = useState({})
  const parentProps = props.props
  const {
    filterUser,
    handleDispatch,
    handleAccessDispatchName,
    handleRemoveAuthor,
    handleDispatchUpdate,
    handleSwitchid,
    handleNameDispatch
  } = parentProps.API
  let parentState = parentProps.state || {}
  const { disabled, loading, select, dispatch_history, selectRev } = parentState
  let childObj = parentState[`tsr${select}`] || {}
  let nameUpdateDispatchState = handleCheckText(props.nameTab) ? `${props.nameTab}_update_dispatch_state` : 'update_dispatch_state'
  const update_dispatch_state = childObj[nameUpdateDispatchState]
  let nameUpdateAllow = handleCheckText(props.nameTab) ? `${props.nameTab}_update_dispatch_allow` : 'update_dispatch_allow'
  const update_dispatch_allow = childObj[nameUpdateAllow] ? true : false
  const updateCheck = update_dispatch_allow ? true : false
  let nameDispatch = handleAccessDispatchName()
  let dispatch_allow = childObj[nameDispatch] ? true : false
  let name = `dispatch__${select}`
  const nameCheckBox = props.nameDis || `checkBox_${select}`
  const checkBox = props.state[nameCheckBox] ? true : false
  let { dispatch_firstName, dispatch_lastName, dispatch_date } = handleNameDispatch()
  let FName = childObj[dispatch_firstName],
    LName = childObj[dispatch_lastName]
  const checkName = handleCheckText(FName) && handleCheckText(LName)
  const userDetail = {
    name: checkName ? `${FName} ${LName}` : '',
    date: checkName ? childObj[dispatch_date] : ''
  }
  let user_list = handleRemoveAuthor({ total_list: filterUser(props.filter1, props.filter2), nameTab: props.nameTab, userDetail })
  useEffect(() => {
    let filter = user_list.filter(user => user.label === `${FName} ${LName}`)
    const check = filter.length === 1
    if (check) {
      let _obj = filter[0]
      let objSecond = { [name]: _obj }
      parentProps.handleState(objSecond)
    }
    props.handleState({
      [nameCheckBox]: false
    })
    if (!updateCheck)
      ResetChange()
  }, [])
  // useEffect(() => {
  // }, [parentState])
  function handleChange(newValue) {
    const check = newValue.__isNew__ ? false : true
    let objSend = { [name]: check ? newValue : null }
    parentProps.handleState(objSend)
  }
  function ResetChange() {
    let objSend = { [name]: null }
    parentProps.handleState(objSend)
  }
  function handleSubmit() {
    if (updateCheck) handleDispatchUpdate(name)
    else handleDispatch(name)
  }
  function handleDispached() {
    const { handleNameCheckDispatch } = parentProps.API
    let nameCheck = handleNameCheckDispatch()
    let is_dispatch = childObj[nameCheck.trim()]
    let result = is_dispatch === '1'
    return result
  }
  function CheckDisabled() {
    // let result = props.canCreate ? false : true
    let result1 = props.except ? false : true
    let state1 = props.handleDisabled()
    let state2 = handleDispached()
    let result2 = state1 || state2
    let result = result1 ? result2 : result1
    return result
  }
  function ChangeCheckBox(e) {
    let check_active = updateCheck || !CheckDisabled()
    if (check_active) {
      const { checked } = e.target
      let obj = {
        [nameCheckBox]: checked ? true : false
      }
      props.handleState(obj)
    }
  }
  let check_dis = checkBox ? false : true
  const state1_check = CheckDisabled()
  const state2_check = updateCheck ? false : true
  const result_state = state1_check || state2_check
  const _disabled = result_state && check_dis
  const check_dispatched = !handleDispached()
  // const check_page = props.except ? true : select === page
  const check_canCreate = dispatch_allow && check_dispatched
  const checkShow = check_canCreate || updateCheck
  // const checkShow = check_page && except_result
  let switchId = handleSwitchid(select)
  const checkRev = handleCheckText(selectRev)
  let nameObj = checkRev ? `form${switchId}_history` : `form${switchId}`
  let arrayHistory = dispatch_history[nameObj] || []
  const SortHistory = () => {
    let result = arrayHistory.sort(function (a, b) {
      return (parseInt(a.dispatch_level) - parseInt(b.dispatch_level))
    })
    return result
  }
  const list_history = SortHistory()
  const final_disabled = _disabled || !checkBox
  const checkLastName = handleCheckText(userDetail?.name)
  return (
    <div className='w-100 row mx-0'>
      {checkLastName ?
        <ShowNameDispacht userDetail={userDetail} />
        :
        checkShow &&
        <div className='title-password col-12 mt-3 mb-2'>
          <h2 className='IranSans_Bold'>دستگردانی</h2>
          <div className='line'></div>
        </div>
      }
      {list_history.length > 0 && <History list={list_history} />}
      {checkShow &&
        <>
          <div className='disiplin-checkbox col-12'>
            <div className='checkbox mr-0'>
              <input
                id={nameCheckBox}
                name={nameCheckBox}
                type={'checkBox'}
                checked={checkBox}
                className='d-none'
                onChange={ChangeCheckBox}
              />
              <label
                className={checkBox ? 'full' : 'empty'}
                htmlFor={nameCheckBox}
              >
                {checkBox ? (
                  <CheckBoxRoundedIcon />
                ) : (
                  <CheckBoxOutlineBlankRoundedIcon />
                )}
                دستگردانی انجام شود
              </label>
            </div>
          </div>
          {!final_disabled &&
            <>
              <div className='col-xl-6 col-lg-6 col-md-6 col-12'>
                <div className='field-form selectBox rtl'>
                  <CreatableSelect
                    onChange={handleChange}
                    value={parentState[name]}
                    isDisabled={final_disabled}
                    options={user_list}
                    placeholder={
                      <label>
                        <span className='star IranSans_Bold'>*</span>
                        دستگردانی
                      </label>
                    }
                  />
                </div>
              </div>
              <div className='submit-form col-12 mb-2'>
                <button
                  className={`continue ${update_dispatch_state === 1 ? 'edit' : ''}`}
                  disabled={disabled}
                  onClick={handleSubmit}
                >
                  {loading === name ? (
                    <Loading className='form-loader' />
                  ) : (
                    <DoneIcon />
                  )}
                  {update_dispatch_state === 1 ? 'ویرایش دستگردانی' : 'دستگردانی'}
                </button>
              </div>
            </>
          }
        </>
      }
    </div>
  )
}
export default Dispatch
