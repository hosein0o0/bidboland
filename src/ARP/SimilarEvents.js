import React from 'react'
// import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
// import DatePicker from 'react-datepicker2';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import CreatableSelect from 'react-select/creatable'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
function SimilarEvents (props) {
  return (
    <div className='w-100 row mr-0 ml-0'>
      <div className='title-password col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold'>{props._key + 1}</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div
          className={`field-form persian textarea ${
            props.state.foucs === `action_${props._key}` ||
            handleCheckText(props.data.action)
              ? 'active'
              : ''
          }`}
        >
          <div className='col p-0'>
            <label className='textarea'>اقدام اصلاحی پیشنهادی</label>
            <textarea
              className='w-100'
              type='text'
              name={`action_${props._key}`}
              value={handleString(props.data.action)}
              onFocus={e => props.OnFocus(e.target.name)}
              onBlur={props.OnBlur}
              onChange={e =>
                props.handleChangeList(
                  props.name,
                  e.target.name,
                  handleString(e.target.value)
                )
              }
              readOnly={props.handleDisabled()}
              disabled={props.handleDisabled()}
            ></textarea>
          </div>
        </div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div className='field-form selectBox persian'>
          <CreatableSelect
            isMulti
            onChange={newValue =>
              props.handleChangeList(
                props.name,
                `responsible_${props._key}`,
                newValue
              )
            }
            isDisabled={props.handleDisabled()}
            options={props.state.responsible_list}
            value={props.data.responsible}
            placeholder={
              <label className='ltr'>
                مسئول اقدام و پیگیری
                <span className='star IranSans_Bold'>*</span>
              </label>
            }
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian pl-1 
                ${
                  props.state.foucs === `status_${props._key}` ||
                  handleCheckText(props.data.status)
                    ? 'active'
                    : ''
                }
                `}
        >
          <label>
            وضعیت
            <span className='star IranSans_Bold'>*</span>
          </label>
          <select
            name={`status_${props._key}`}
            value={handleString(props.data.status)}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={e =>
              props.handleChangeList(
                props.name,
                e.target.name,
                handleString(e.target.value)
              )
            }
            readOnly={props.handleDisabled()}
            disabled={props.handleDisabled()}
          >
            <option className='d-none'></option>
            <option value='جاری'>جاری</option>
            <option value='رد شد'>رد شد</option>
            <option value='انجام شد'>انجام شد</option>
          </select>
        </div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div
          className={`field-form persian textarea ${
            props.state.foucs === `description_${props._key}` ||
            handleCheckText(props.data.description)
              ? 'active'
              : ''
          }`}
        >
          <div className='col p-0'>
            <label className='textarea'>توضیحات</label>
            <textarea
              className='w-100'
              type='text'
              name={`description_${props._key}`}
              value={handleString(props.data.description)}
              onFocus={e => props.OnFocus(e.target.name)}
              onBlur={props.OnBlur}
              onChange={e =>
                props.handleChangeList(
                  props.name,
                  e.target.name,
                  handleString(e.target.value)
                )
              }
              readOnly={props.handleDisabled()}
              disabled={props.handleDisabled()}
            ></textarea>
          </div>
        </div>
      </div>
      {props.state[props.name].length > 1 && !props.handleDisabled() ? (
        <div className='button-add col-12 row mr-0 ml-0'>
          <button
            className='remove'
            onClick={() => props.handleDelete(props.name, props._key)}
          >
            <DeleteRoundedIcon />
            حذف
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
export default SimilarEvents
