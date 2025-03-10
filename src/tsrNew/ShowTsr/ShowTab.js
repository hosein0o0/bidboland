import React, { useEffect } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import handleString from '../../handleString'
// import handleCheckText from '../../handleCheckText'

const ShowTab = props => {
  const { level, select, page, edit_form } = props.state
  function hadnleTab () {
    const { select } = props.state
    let listNumber = []
    if (select === 1) {
      listNumber = [1, 2, 3, 4]
    } else if (select > 9) {
      listNumber = [9, 10, 11, 12]
    } else {
      listNumber = [select - 1, select, select + 1, select + 2]
    }
    return listNumber
  }
  function handleShowTab (data) {
    const { _listTab, role } = props.state
    let filter = _listTab.filter(tab => parseInt(tab.id) === data)[0] || {}
    const CheckPermission = props.Permision.handlePermision(
      role,
      filter.permision || ''
    )
    if (CheckPermission) {
      return filter
    } else return ''
  }
  function handleCheckShow (id) {
    const { hasNot, numResult } = props.state
    let result = hasNot ? id <= numResult : true
    return result
  }
  async function ChangeTab (id) {
    await props.handleState({
      select: id,
      // selectRev: '',
      loading: '',
      tab_9: 1,
      tab_10: 1,
      tab_7: 1,
      tab_8: 1,
      tab_6: 1,
      tab_2: 1
    })
  }
  const class_name = data =>
    `item-tab position-relative rtl mr-0 w-100 p-0 col-12 ${
      select === handleShowTab(data).id
        ? 'active IranSans_Bold'
        : page >= data
        ? '_page IranSans_Bold'
        : ''
    }`
  const check_edit = data => {
    let num = handleString(edit_form) || '0'
    let result = ''
    if (num.length === 3) result = `${num.charAt(0)}${num.charAt(1)}`
    else result = num.charAt(0)
    let current_num = parseInt(result) || 0
    return data === current_num
  }
  return (
    select && (
      <div className='tab-form rtl'>
        <div className='col-xl-11 col-lg-11 col-12 row m-0 justify-content-start'>
          {hadnleTab().map(
            (data, key) =>
              handleCheckShow(handleShowTab(data).id) &&
              handleShowTab(data).id <= level && (
                <div
                  className={`col-xl-3 col-lg-3 col-3 mr-0 pr-3 pl-0`}
                  key={key}
                  onClick={() =>
                    handleShowTab(data).id <= level
                      ? ChangeTab(handleShowTab(data).id)
                      : ''
                  }
                >
                  <div className={class_name(data).trim()}>
                    <span>
                      <label
                        className={`${
                          select === handleShowTab(data).id
                            ? 'IranSans_Bold'
                            : ''
                        }`}
                      >
                        {handleShowTab(data).id}.
                      </label>
                      {handleShowTab(data).nameTab}
                    </span>
                    {check_edit(data) && (
                      <EditIcon className='available_tab edit' />
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    )
  )
}
export default ShowTab
