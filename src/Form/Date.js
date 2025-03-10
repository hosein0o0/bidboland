import React from 'react'
import DatePicker from 'react-datepicker2'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
import moment from 'moment-jalaali'
function Date (props) {
  const base_data = props.data || {}
  const {
    disabled,
    name,
    min,
    value,
    objectSetState,
    isGregorian,
    rtl
  } = base_data
  const _value = props.state[value]
  function handleChange (date) {
    if (!disabled) {
      let objSend = { [value]: date }
      props.handleState(objectSetState ? objSend : value, date)
    }
  }
  function ManageActive (_value_) {
    let result = disabled
      ? handleCheckText(_value_)
      : _value_ && typeof _value_ === 'object'
    return result ? true : false
  }
  function handleValue (date) {
    if (typeof date === 'string') {
      const convert = moment(date, 'jYYYY/jMM/jDD')
      const { _isValid } = convert
      return _isValid ? convert : null
    } else return date
  }
  const Manege_classname = () => {
    let result = props.hadnleClassName(base_data) || {}
    return result
  }
  const class_name = Manege_classname()
  return (
    <div className='col-xl-6 col-lg-6 col-md-12 col-12' key={props._key}>
      <div
        className={`field-form ${class_name.className} ${
          ManageActive(_value) ? 'active' : ''
        }`}
      >
        <div className='icon-field'>
          <DateRangeRoundedIcon />
        </div>
        <div className='col p-0'>
          <label>
            {name}
            {props.handleRequire(base_data)}
          </label>
          {disabled ? (
            <input
              className={`class_name.textAlign ${
                rtl ? 'IranSans_Medium_FA' : ''
              }`}
              disabled={true}
              value={handleString(_value)}
              readOnly={true}
            />
          ) : (
            <DatePicker
              className={class_name.textAlign}
              min={min}
              persianDigits={isGregorian ? false : true}
              isGregorian={isGregorian ? true : false}
              timePicker={false}
              onChange={date => handleChange(date)}
              value={handleValue(_value)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default Date
