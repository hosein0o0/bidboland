import React from 'react'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import DatePicker from 'react-datepicker2'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import moment from 'moment-jalaali'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'

function Difficulties (props) {
  function CheckType (date) {
    if (typeof date === 'string') {
      return moment(date, 'jYYYY/jM/jD')
    } else return null
  }
  return (
    <div className='w-100 row mr-0 ml-0'>
      <div className='title-password list-counter col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>{props._key + 1}</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div
          className={`field-form persian textarea ${
            props.state.foucs === `${props.name}__description__${props._key}` ||
            handleCheckText(props.data.description)
              ? 'active'
              : ''
          }`}
        >
          <div className='col p-0'>
            <label className='textarea'>شرح اشکال</label>
            <textarea
              className='w-100'
              type='text'
              name={`${props.name}__description__${props._key}`}
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
              value={handleString(props.data.description)}
              readOnly={props.handleDisabled()}
              disabled={props.handleDisabled()}
            ></textarea>
          </div>
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian pl-1 
                ${
                  props.state.foucs ===
                    `${props.name}__FollowUp__${props._key}` ||
                  props.data.FollowUp !== ''
                    ? 'active'
                    : ''
                }
                `}
        >
          <label>پیگیری کننده</label>
          <input
            name={`${props.name}__FollowUp__${props._key}`}
            value={props.data.FollowUp}
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
            props.data.actionDate ? 'active' : ''
          }`}
        >
          <div className='icon-field'>
            <DateRangeRoundedIcon />
          </div>
          <div className='col p-0'>
            <label>مهلت اقدام</label>
            {props.handleDisabled() ? (
              <input
                name='actionDate'
                value={props.data.actionDate}
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
                    'actionDate'
                  )
                }
                value={CheckType(props.data.actionDate)}
              />
            )}
          </div>
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian pl-1 
                ${
                  props.state.foucs ===
                    `${props.name}__confirmation__${props._key}` ||
                  props.data.confirmation !== ''
                    ? 'active'
                    : ''
                }
                `}
        >
          <label>تایید کننده</label>
          <input
            name={`${props.name}__confirmation__${props._key}`}
            value={props.data.confirmation}
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
export default Difficulties
