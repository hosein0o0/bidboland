import React from 'react'
import CreatableSelect from 'react-select/creatable'
import handleString from '../handleString'
const TOCC = props => {
  let ListMandatory = props.props.ListSign.ListMandatory || {}
  let state = props.create_one ? props.state : props.props.state || {}
  let { select, user_list } = state
  let { multiTab, handleDisabled, nameCC } = props
  let numberSelect = multiTab ? `${select}_${multiTab}` : select || 1
  let array = ListMandatory[`tsr${numberSelect}`] || []
  let fullUser = user_list || []
  let CC = nameCC ? `${nameCC}_notification_cc` : `notification_cc`
  function handleList(name) {
    let list = props.state[name] || []
    return list
  }
  function handleChange(newValue, data) {
    let { __isNew__ } = newValue
    let { select } = data
    if (!__isNew__) {
      props.handleState({ [select]: newValue })
    }
  }
  // function handleName () {
  //   let filter = array.filter(user => !user.notShowDefault)
  //   let _listName = Object.keys(filter).map(_value => {
  //     let _obj = filter[_value] || {}
  //     if (!_obj.notShowDefault) {
  //       return _obj.name
  //     }
  //   })
  //   return _listName.join(' , ')
  // }
  function handleChangeCC(newValue) {
    let _listCC = newValue || []
    let filter = _listCC.filter(item => !item.__isNew__)
    props.handleState({ [CC]: filter })
  }
  function ExceptionCheck(data) {
    let result = data.notShowDefault ? false : true
    return result
  }
  function CheckShow(data) {
    let state1 = handleList(data.value).length > 0
    let { level } = state
    let state2 = level > 1
    const finalState = state1 || state2
    const exception = ExceptionCheck(data)
    let result = finalState && exception
    return result
  }
  function UserList(data) {
    let list = []
    let { level } = state
    let state1 = level === 1
    if (state1) {
      list = handleList(data.value)
    } else if (data.filter && data.filter2) {
      let valueSend = data.system ? props.state[data.filter] : data.filter
      let { filterUser } = props.props.API
      list = filterUser(data.filter2, valueSend)
    }
    return list
  }
  return (
    <div className='w-100 row mx-0'>
      <div className='title-password col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>تخصیص شخص بررسی کننده</h2>
        <div className='line'></div>
      </div>
      {array.map(
        (data, key) =>
          CheckShow(data) && (
            <div className='col-xl-6 col-lg-6 col-md-12 col-12' key={key}>
              <div className='field-form selectBox'>
                <CreatableSelect
                  onChange={newValue => handleChange(newValue, data)}
                  // options={handleList(data.value)}
                  options={UserList(data)}
                  value={props.state[data.select] || null}
                  isDisabled={handleDisabled()}
                  placeholder={
                    <label className='ltr'>
                      <span className='star IranSans_Bold'>*</span>
                      {handleString(data.name)}
                    </label>
                  }
                />
              </div>
            </div>
          )
      )}
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        {/* <div className='col-12 px-0'>
          <div className='box-note'>
            <p className='m-0'>
              جهت ارسال فرم به منظور دریافت امضاهای بعدی از بخش TO استفاده
              نمائید. ({handleName()})
            </p>
          </div>
        </div> */}
        <div className='field-form selectBox'>
          <CreatableSelect
            isMulti
            onChange={newValue => handleChangeCC(newValue)}
            value={props.state[CC]}
            isDisabled={handleDisabled()}
            options={fullUser}
            placeholder={<label>CC</label>}
          />
        </div>
      </div>
    </div>
  )
}
export default TOCC
