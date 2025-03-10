import React from 'react'
import ItemListProblems from './ItemListProblems'
import AddIcon from '@material-ui/icons/Add'

const ListProblems = props => {
  let {
    ValueTable,
    handleDisabledElmAPI,
    handleAddAPI,
    // handleCheckUpdate,
    handlCreate,
    handleDisabled_Update
  } = props.API
  let name = ValueTable()
  let nameList = `${name}_executed_problems`
  let list = props.state[nameList] || []
  let length = list.length
  const check_disabled = handleDisabledElmAPI()
  const canCreate = handlCreate(10)
  const state1 = handleDisabled_Update(1)
  const state2 = handleDisabled_Update(2)
  const state3 = handleDisabled_Update(3)
  const state4 = handleDisabled_Update(4)
  function handleDisabledPlus() {
    let result = false
    if (canCreate) {
      result = check_disabled ? false : true
    } else if (state1) {
      result = true
    } else if (state2) {
      result = true
    } else if (state4) {
      result = true
    } else if (state3) {
      result = false
    }
    return result
  }
  const show_plus = handleDisabledPlus()
  return (
    <div className='w-100 row mx-0'>
      <div className='title-password col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>لیست مشکلات کار انجام شده</h2>
        <div className='line'></div>
      </div>
      {list.map((data, key) => (
        <ItemListProblems
          data={data || {}}
          key={key}
          _key={key}
          {...props}
          length={length}
          nameList={nameList}
          check_disabled={check_disabled}
        />
      ))}
      {show_plus && (
        <div className='button-add col-12'>
          <button onClick={() => handleAddAPI(nameList)}>
            <AddIcon />
            افزودن مورد جدید
          </button>
        </div>
      )}
    </div>
  )
}
export default ListProblems
