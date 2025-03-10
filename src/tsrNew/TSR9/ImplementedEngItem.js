import React from 'react'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import DatePicker from 'react-datepicker2'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import moment from 'moment-jalaali'
const ImplementedEngItem = props => {
  let { state, data, length } = props
  const { ValueTab, handleDisabledElmAPI, ValueTabPersian } = props.API
  let tab_value = ValueTab()
  // const disabled1 = handleShowStatusUpdate(1)
  // const disabled2 = handleShowStatusUpdate(2)
  function handleClassName(name) {
    let { foucs } = state
    let state1 = foucs === `${tab_value}__${name}__${props._key}`
    let state2 = handleCheckText(data[name])
    let result = state1 || state2
    let className = result ? 'active' : ''
    return className
  }
  function handleChange(e) {
    const { handleChangeList } = props.API
    handleChangeList(e)
  }
  function handleChangeDateList(date, name) {
    const { handleChangeDateListAPI } = props.API
    handleChangeDateListAPI(date, tab_value, name, props._key)
  }
  function handleClassNameDate(name) {
    let value = data[name]
    let result = value ? 'active' : ''
    return result
  }
  function CheckType(date) {
    if (typeof date === 'string') {
      return moment(date, 'jYYYY/jM/jD')
    } else return date || null
  }
  function handleDelete() {
    const { handleDeleteAPI } = props.API
    let name = `${tab_value}_instruction`
    handleDeleteAPI(props._key, name)
  }
  function ConvertDate(date) {
    const check = typeof date === 'object'
    const checkString = typeof date === 'string'
    let result = ''
    if (check) {
      date = date || {}
      if (date._isValid) {
        result = moment(date)
          .local('fa')
          .format('jYYYY/jMM/jDD')
      }
    } else if (checkString) {
      result = date
    }
    return result
  }
  let checkDisabled = handleDisabledElmAPI()
  function handleShowRemove() {
    let state1 = checkDisabled ? false : true
    let state2 = length > 1
    let result = state1 && state2
    return result
  }
  const show_remove = handleShowRemove()
  data.group = ValueTabPersian()
  const parent_state = props.props.state
  const { tsr_no } = parent_state
  data['instructionNumber'] = handleString(tsr_no)
  const { end_date } = state
  const end = handleString(end_date) !== 'Invalid date' ? handleString(end_date) : ''
  data.dateIssuanceInstructions = end
  const handleMin = (date) => {
    const check = typeof date === 'object'
    let result
    if (check) {
      date = date || {}
      if (date._isValid) {
        result = moment(date).subtract(1, 'd')
      }
    }
    return result
  }
  return (
    <div className='w-100 mr-0 ml-0 row'>
      <div className='title-password list-counter col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold_FA'>{props._key + 1}</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div className={`field-form persian pl-1 active`}>
          <label>
            گروه
            <span class='star IranSans_Bold'>*</span>
          </label>
          <input
            className='IranSans_Medium_FA'
            type='text'
            disabled={true}
            readOnly={true}
            value={handleString(data['group'])}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian pl-1 ${handleClassName(
            'instructionNumber'
          )}`}
        >
          <label>
            شماره دستورالعمل
            <span class='star IranSans_Bold'>*</span>
          </label>
          <input
            type='text'
            className='ltr IranSans_Medium_FA'
            name={`${tab_value}__instructionNumber__${props._key}`}
            value={handleString(data['instructionNumber'])}
            disabled={true}
            readOnly={true}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${handleClassNameDate(
            'dateIssuanceInstructions'
          )}`}
        >
          <div className='icon-field'>
            <DateRangeRoundedIcon />
          </div>
          <div className='col p-0'>
            <label>
              تاریخ صدور دستور العمل
              <span class='star IranSans_Bold'>*</span>
            </label>
            <input
              className='IranSans_Medium_FA'
              disabled={true}
              readOnly={true}
              value={data.dateIssuanceInstructions}
            />
          </div>
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div className={`field-form ltr pl-1 ${handleClassName('wo')}`}>
          <label>
            W.O No
            <span class='star IranSans_Bold'>*</span>
          </label>
          <input
            type='text'
            className='text-left ltr IranSans_Medium_FA'
            name={`${tab_value}__wo__${props._key}`}
            value={handleString(data['wo'])}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            disabled={checkDisabled}
            readOnly={checkDisabled}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div className={`field-form persian ${handleClassNameDate('wODate')}`}>
          <div className='icon-field'>
            <DateRangeRoundedIcon />
          </div>
          <div className='col p-0'>
            <label>
              تاریخ صدور W.O
              <span class='star IranSans_Bold'>*</span>
            </label>
            {checkDisabled ? (
              <input
                className='IranSans_Medium_FA'
                disabled={true}
                readOnly={true}
                value={ConvertDate(data.wODate)}
              />
            ) : (
              <DatePicker
                persianDigits={true}
                isGregorian={false}
                timePicker={false}
                onChange={date => handleChangeDateList(date, 'wODate')}
                value={CheckType(data.wODate)}
              />
            )}
          </div>
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${handleClassNameDate('startDate')}`}
        >
          <div className='icon-field'>
            <DateRangeRoundedIcon />
          </div>
          <div className='col p-0'>
            <label>
              تاریخ شروع کار
              <span class='star IranSans_Bold'>*</span>
            </label>
            {checkDisabled ? (
              <input
                className='IranSans_Medium_FA'
                disabled={true}
                readOnly={true}
                value={ConvertDate(data.startDate)}
              />
            ) : (
              <DatePicker
                persianDigits={true}
                isGregorian={false}
                timePicker={false}
                onChange={date => handleChangeDateList(date, 'startDate')}
                value={CheckType(data.startDate)}
                max={CheckType(data.endDate)}
              />
            )}
          </div>
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div className={`field-form persian ${handleClassNameDate('endDate')}`}>
          <div className='icon-field'>
            <DateRangeRoundedIcon />
          </div>
          <div className='col p-0'>
            <label>
              تاریخ پایان کار
              <span class='star IranSans_Bold'>*</span>
            </label>
            {checkDisabled ? (
              <input
                className='IranSans_Medium_FA'
                disabled={true}
                readOnly={true}
                value={ConvertDate(data.endDate)}
              />
            ) : (
              <DatePicker
                persianDigits={true}
                isGregorian={false}
                timePicker={false}
                onChange={date => handleChangeDateList(date, 'endDate')}
                value={CheckType(data.endDate)}
                min={handleMin(data.startDate)}
                disabled={data.startDate ? false : true}
              />
            )}
          </div>
        </div>
      </div>
      {show_remove && (
        <div className='button-add col-12 row mr-0 ml-0'>
          <button className='remove' onClick={handleDelete}>
            <DeleteRoundedIcon />
            حذف
          </button>
        </div>
      )}
    </div>
  )
}
export default ImplementedEngItem
