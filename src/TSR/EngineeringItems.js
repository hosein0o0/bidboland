import React from 'react'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import DatePicker from 'react-datepicker2'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import moment from 'moment-jalaali'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
function EngineeringItems (props) {
  function CheckType (date) {
    if (typeof date === 'string') {
      return moment(date, 'jYYYY/jM/jD')
    } else return null
  }
  return (
    <div className='w-100 mr-0 ml-0 row'>
      <div className='title-password list-counter col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>{props._key + 1}</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian pl-1 
                ${
                  props.state.foucs === `${props.name}__group__${props._key}` ||
                  handleCheckText(props.data.group)
                    ? 'active'
                    : ''
                }
                `}
        >
          <label>گروه</label>
          <input
            type='text'
            name={`${props.name}__group__${props._key}`}
            value={handleString(props.data.group)}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={e =>
              props.handleChangeList(
                props.name,
                e.target.name.split('__')[1],
                e.target.value,
                props._key
              )
            }
            readOnly={props.handleDisabled()}
            disabled={props.handleDisabled()}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs ===
              `${props.name}__instructionNumber__${props._key}` ||
            handleCheckText(props.data.instructionNumber)
              ? 'active'
              : ''
          }`}
        >
          <label>شماره دستور العمل</label>
          <input
            type='text'
            name={`${props.name}__instructionNumber__${props._key}`}
            value={handleString(props.data.instructionNumber)}
            readOnly={true}
            disabled={true}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            handleCheckText(props.data.dateIssuanceInstructions) ? 'active' : ''
          }`}
        >
          <div className='icon-field'>
            <DateRangeRoundedIcon />
          </div>
          <div className='col p-0'>
            <label>تاریخ صدور دستور العمل</label>
            <input
              name='dateIssuanceInstructions'
              value={handleString(props.data.dateIssuanceInstructions)}
              readOnly={true}
              disabled={true}
            />
          </div>
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs === `${props.name}__wO__${props._key}` ||
            handleCheckText(props.data.wO)
              ? 'active'
              : ''
          }`}
        >
          <label>W.O</label>
          <input
            type='text'
            name={`${props.name}__wO__${props._key}`}
            value={handleString(props.data.wO)}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={e =>
              props.handleChangeList(
                props.name,
                e.target.name.split('__')[1],
                e.target.value,
                props._key
              )
            }
            readOnly={props.handleDisabled()}
            disabled={props.handleDisabled()}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${props.data.wODate ? 'active' : ''}`}
        >
          <div className='icon-field'>
            <DateRangeRoundedIcon />
          </div>
          <div className='col p-0'>
            <label>تاریخ صدور W.O</label>
            {props.handleDisabled() ? (
              <input
                name='wODate'
                value={props.data.wODate}
                readOnly={true}
                disabled={true}
              />
            ) : (
              <DatePicker
                persianDigits={true}
                isGregorian={false}
                timePicker={false}
                onChange={date =>
                  props.ChangeDateList(date, props._key, props.name, 'wODate')
                }
                value={CheckType(props.data.wODate)}
              />
            )}
          </div>
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.data.startDate ? 'active' : ''
          }`}
        >
          <div className='icon-field'>
            <DateRangeRoundedIcon />
          </div>
          <div className='col p-0'>
            <label>تاریخ شروع کار</label>
            {props.handleDisabled() ? (
              <input
                name='startDate'
                value={handleString(props.data.startDate)}
                readOnly={true}
                disabled={true}
              />
            ) : (
              <DatePicker
                persianDigits={true}
                isGregorian={false}
                timePicker={false}
                onChange={date =>
                  props.ChangeDateList(
                    date,
                    props._key,
                    props.name,
                    'startDate'
                  )
                }
                value={CheckType(props.data.startDate)}
              />
            )}
          </div>
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${props.data.endDate ? 'active' : ''}`}
        >
          <div className='icon-field'>
            <DateRangeRoundedIcon />
          </div>
          <div className='col p-0'>
            <label>تاریخ پایان کار</label>
            {props.handleDisabled() ? (
              <input
                name='endDate'
                value={handleString(props.data.endDate)}
                readOnly={true}
                disabled={true}
              />
            ) : (
              <DatePicker
                persianDigits={true}
                isGregorian={false}
                timePicker={false}
                onChange={newValue =>
                  props.ChangeDateList(
                    newValue,
                    props._key,
                    props.name,
                    'endDate'
                  )
                }
                value={CheckType(props.data.endDate)}
              />
            )}
          </div>
        </div>
      </div>
      {props.length > 1 && !props.handleDisabled() && (
        <div className='button-add col-12 row mr-0 ml-0'>
          <button
            className='remove'
            onClick={() => props.handleDelete(props.name, props._key)}
          >
            <DeleteRoundedIcon />
            حذف
          </button>
        </div>
      )}
    </div>
  )
}
export default EngineeringItems
