import React from 'react'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import DatePicker from 'react-datepicker2'
import moment from 'moment-jalaali'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
const ItemPurchaseRequests = props => {
  function handleClassName (name) {
    let { foucs } = props.state
    let state1 = foucs === `${props.name}__${name}__${props._key}`
    let state2 = handleCheckText(props.data[name])
    let result = state1 || state2
    return result ? 'active' : ''
  }
  function handleFocus (e) {
    const { name } = e.target
    let valueFocus = `${props.name}__${name}__${props._key}`
    props.OnFocus(valueFocus)
  }
  function handleChange (e) {
    const { name, value } = e.target
    props.handleChangeList(props.name, name, value, props._key)
  }
  function handleChangeDate (name, value) {
    props.handleChangeList(props.name, name, value, props._key)
  }
  function CheckType (date) {
    if (date) {
      if (typeof date === 'string') {
        if (moment(`${date}`, 'jYYYY/jM/jD')) {
          return moment(`${date}`, 'jYYYY/jM/jD')
        } else return date
      } else return date
    } else return null
  }
  function handleDelete () {
    props.handleDelete(props.name, props._key)
  }
  return (
    <div className='w-100 mr-0 ml-0 row'>
      <div className='title-password list-counter col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>{props._key + 1}</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div className={`field-form persian pl-1 ${handleClassName('number')}`}>
          <label>شماره تقاضا</label>
          <input
            type='text'
            name='number'
            value={handleString(props.data.number)}
            onFocus={handleFocus}
            onBlur={props.OnBlur}
            onChange={handleChange}
            readOnly={props.check_disabled}
            disabled={props.check_disabled}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${props.data.date ? 'active' : ''}`}
        >
          <div className='icon-field'>
            <DateRangeRoundedIcon />
          </div>
          <div className='col p-0'>
            <label>تاریخ تامین کالا</label>
            {props.canCreate ? (
              <DatePicker
                persianDigits={true}
                isGregorian={false}
                timePicker={false}
                value={CheckType(props.data.date)}
                onChange={data => handleChangeDate('date', data)}
              />
            ) : (
              <input
                name='date'
                value={props.data.date}
                disabled={true}
                readOnly={true}
              />
            )}
          </div>
        </div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div
          className={`field-form persian textarea ${handleClassName(
            'description'
          )}`}
        >
          <div className='col p-0'>
            <label className='textarea'>خلاصه شرح</label>
            <textarea
              className='w-100'
              type='text'
              name='description'
              value={handleString(props.data.description)}
              onFocus={handleFocus}
              onBlur={props.OnBlur}
              onChange={handleChange}
              readOnly={props.check_disabled}
              disabled={props.check_disabled}
            ></textarea>
          </div>
        </div>
      </div>
      {props.canCreate && props.length > 1 && (
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
export default ItemPurchaseRequests
