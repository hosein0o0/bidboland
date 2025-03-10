import React, { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'
const TOCC = props => {
  const [num, setNum] = useState(0)
  useEffect(() => {
    const { listSign } = props.state
    if (listSign) {
      if (listSign.length) {
        setNum(listSign.length)
      }
    }
  }, [props])
  function handleChangeSelect (name, newValue) {
    let filter = newValue ? newValue.filter(data => !data.__isNew__) : []
    const check = name === 'notification_to' ? filter.length <= num : true
    if (check) {
      props.handleState(name, filter)
    }
  }
  function handleNameSign () {
    let { listSign } = props.state
    listSign = listSign ? listSign : []
    let names = Object.keys(listSign).map(data => {
      return listSign[data].name
    })
    let result = names.join('، ')
    return result
  }
  return (
    <div className='w-100 row mx-0'>
      <div className='title-password col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>تخصیص شخص بررسی کننده</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div className='field-form selectBox'>
          <CreatableSelect
            isMulti
            onChange={newValue =>
              handleChangeSelect('notification_to', newValue)
            }
            options={props.state.user_list}
            value={props.state.notification_to}
            placeholder={
              <label className='ltr'>
                <span className='star IranSans_Bold'>*</span>
                TO ({num} نفر)
              </label>
            }
          />
        </div>
        <div className='col-12 px-0'>
          <div className='box-note'>
            <p className='m-0'>
              جهت ارسال فرم به منظور دریافت امضاهای بعدی از بخش TO استفاده
              نمائید. ({handleNameSign()})
            </p>
          </div>
        </div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div className='field-form selectBox'>
          <CreatableSelect
            isMulti
            onChange={newValue =>
              handleChangeSelect('notification_cc', newValue)
            }
            options={props.state.user_list}
            value={props.state.notification_cc}
            placeholder={<label>CC</label>}
          />
        </div>
      </div>
    </div>
  )
}
export default TOCC
