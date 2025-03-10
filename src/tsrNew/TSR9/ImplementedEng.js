import React from 'react'
import ImplementedEngItem from './ImplementedEngItem'
import AddIcon from '@material-ui/icons/Add'

const ImplementedEng = props => {
  const { ValueTab, handleAddAPI, handleDisabledElmAPI } = props.API
  let tab_value = ValueTab()
  let nameList = `${tab_value}_instruction`
  let list = props.state[nameList] || []
  list = typeof list === 'object' ? list : []
  let length = list.length
  let checkDisabled = handleDisabledElmAPI()
  return (
    <div className='w-100 row mx-0'>
      <div className='title-password col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>دستورالعمل هاي مهندسی اجرا شده</h2>
        <div className='line'></div>
      </div>
      {list.map((data, key) => (
        <ImplementedEngItem
          data={data || {}}
          key={key}
          _key={key}
          {...props}
          length={length}
        />
      ))}
      <div className='title-password col-12 mt-3 mb-2'>
        <div className='line'></div>
      </div>
      {!checkDisabled && (
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
export default ImplementedEng
