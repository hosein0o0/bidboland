import React, { useState } from 'react'
import handleString from '../../handleString'
import ListTab from './ListTab'
import EditBeforeRequest from './EditBeforeRequest'
import NoteTsr from '../note'
import BtnNote from './btnNote'
import AdminEditRequest from './adminEditRequest'
const Title = props => {
  const [open, setOpen] = useState(false)
  // const refElm = useRef()
  let { select, page, status, disabled, note_counts } = props.state
  let list_tab = ListTab.array || []
  const objTab = list_tab[select - 1] || {}
  const { handleSwitchid } = props.API
  let number = handleSwitchid(select)
  const namePermission = `tsr${number}_can_open_edit`
  const state1 = props.state[namePermission] ? true : false
  const state2 = select <= page
  let name_status = `rev_show_${select}`
  const state3 = status !== name_status
  const permission = state1 && state2 && state3
  const nameAdminPermission = `tsr${number}_admin_can_open_edit`
  const stateAdminPermission = props.state[nameAdminPermission] ? true : false
  const adminPermission = stateAdminPermission && state2 && state3
  const arrayNote =  note_counts || []
  let objCount = arrayNote[select - 1] || {},
    count = objCount[`form${select}`] || 0
  return (
    <React.Fragment>
      <div className='title-from d-flex align-items-center py-3'>
        <div className='col px-0 row mx-0'>
          <h2>{handleString(objTab.title)}</h2>
          <span className='virastar-title align-items-center d-flex mr-1'>
            (ویرایش سوم)
          </span>
        </div>
        {permission && <EditBeforeRequest {...props} />}
        {adminPermission && <AdminEditRequest {...props} />}
        <BtnNote count={count} setOpen={setOpen} disabled={disabled} />
      </div>
      {open && <NoteTsr {...props} setOpen={val => setOpen(val)} />}
    </React.Fragment>
  )
}
export default Title
