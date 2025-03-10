import React from 'react'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import DatePicker from 'react-datepicker2'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import moment from 'moment-jalaali'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
function RequestBuy (props) {
  function CheckType (date) {
    if (date) {
      if (typeof date === 'string') {
        if (moment(`${date}`, 'jYYYY/jM/jD')) {
          return moment(`${date}`, 'jYYYY/jM/jD')
        } else return date
      } else return date
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
                  props.state.foucs ===
                    `${props.name}__number__${props._key}` ||
                  handleCheckText(props.data.number)
                    ? 'active'
                    : ''
                }
                `}
        >
          <label>
            شماره تقاضا
            {/* <span className='star IranSans_Bold'>*</span> */}
          </label>
          <input
            type='text'
            name={`${props.name}__number__${props._key}`}
            value={handleString(props.data.number)}
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
            readOnly={!props.canCreate}
            disabled={!props.canCreate}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian pl-1 
                ${
                  props.state.foucs ===
                    `${props.name}__description__${props._key}` ||
                  handleCheckText(props.data.description)
                    ? 'active'
                    : ''
                }
                `}
        >
          <label>
            خلاصه شرح
            {/* <span className='star IranSans_Bold'>*</span> */}
          </label>
          <input
            type='text'
            name={`${props.name}__description__${props._key}`}
            value={handleString(props.data.description)}
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
            readOnly={!props.canCreate}
            disabled={!props.canCreate}
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
                onChange={date =>
                  props.ChangeDateList(date, props._key, props.name, 'date')
                }
                value={CheckType(props.data.date)}
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
      {props.length > 1 &&
        props.canCreate(
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
export default RequestBuy
