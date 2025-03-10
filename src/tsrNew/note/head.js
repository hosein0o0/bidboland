import React from 'react'
import { Close } from '@material-ui/icons'
const Head = props => {
  const { state, stateShow, setOpen, setStateShow, setDataRow } = props
  // const { handleSwitchid } = API
  const Click = status => {
    setStateShow(status)
    setDataRow(null)
  }
  const { select } = state
  // const mySelect = handleSwitchid(select)
  const tsrObj = state[`tsr${select}`] || {}
  const check = tsrObj[`insert_note_allow`] ? true : false
  return (
    <div className='head-note d-flex align-items-center p-2'>
      <span className='col p-0 text-right'>ایجاد یادداشت</span>
      {stateShow === 'list' && check ? (
        <button
          className='action-head pointer'
          onClick={() => Click('create')}
        >
          ایجاد
        </button>
      ) : (
        <button
          className='action-head pointer'
          onClick={() => Click('list')}
        >
          یادداشت‌ها
        </button>
      )}
      <Close className='pointer mr-2' onClick={() => setOpen(false)} />
    </div>
  )
}
export default Head
