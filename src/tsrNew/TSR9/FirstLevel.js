import React from 'react'
import StaticList from './StaticList'
import AddIcon from '@material-ui/icons/Add'
import ItemFirstLevel from './ItemFirstLevel'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import EditReqFirst from './EditReqFirst'
import ButtonSubmitFirst from './ButtonSubmitFirst'
import EditIcon from '@material-ui/icons/Edit'
const FirstLevel = props => {
  const list = StaticList.list
  const { handleCanAddItem } = props.API
  let { all_groups, update_allow } = props.state
  let array = all_groups || []
  let length = array.length
  function handleAdd() {
    const { handleCheckList } = props.API
    const check = handleCheckList()
    if (check) {
      let obj = { priority: length + 1, group: [] }
      props.handleState({
        all_groups: [...array, obj]
      })
    } else {
      Notification.notify(Message.text(932), 'error')
    }
  }
  function handleList() {
    let arrayTwo = []
    array.forEach(item => {
      let obj = item || {}
      let group = obj.group || []
      arrayTwo = arrayTwo.concat(group)
    })
    const results = list.filter(
      ({ value: id1 }) => !arrayTwo.some(({ value: id2 }) => id2 === id1)
    )
    return results
  }
  // const { page, level } = parentState
  function handleDisabled() {
    let { fill_priority_allow } = props.state
    let state1 = fill_priority_allow ? true : false
    let state2 = update_allow ? true : false
    const result_state = state1 || state2
    // const equality = page === level
    // console.log(page , level)
    // const result = result_state && equality
    return result_state ? false : true
  }
  let listItem = handleList()
  const checkDis = handleDisabled()
  const { can_open_edit } = props.state
  const can_add = handleCanAddItem(checkDis, listItem)
  const showEditBtn = () => {
    const parentState = props.props.state || {}
    const { status, select } = parentState
    let state1 = can_open_edit ? true : false
    let name_rev = `rev_show_${select}`
    let state2 = name_rev !== status
    let result = state1 && state2
    return result
  }
  // const show_edit = level === page && can_open_edit
  const show_editBtn = showEditBtn()
  return (
    <div className='w-100 row mx-0'>
      <div className='title-password col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold d-flex align-items-center'>
          تخصیص گروه‌ها و اولویت‌ها
          <span className='font-medium mx-1'>
            (توسط رئیس برنامه ریزی تعیرات تکمیل می‌گردد)
          </span>
          {update_allow &&
            <span className='edit-icon d-flex align-items-center justify-content-center mr-1'>
              <EditIcon className='w-100 h-100' />
            </span>
          }
        </h2>
        <div className='line'></div>
      </div>
      {array.map((data, key) => (
        <ItemFirstLevel
          dataSend={data}
          key={key}
          _key={key}
          {...props}
          length={length}
          handleList={handleList}
          checkDis={checkDis}
        />
      ))}
      <div className='title-password col-12 mt-3 mb-2'>
        <div className='line'></div>
      </div>
      {can_add && (
        <div className='button-add col-12'>
          <button onClick={handleAdd}>
            <AddIcon />
            افزودن مورد جدید
          </button>
        </div>
      )}
      {show_editBtn && <EditReqFirst {...props} />}
      {!checkDis && <ButtonSubmitFirst {...props} />}
    </div>
  )
}
export default FirstLevel
