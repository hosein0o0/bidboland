import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
// import DatePicker from 'react-datepicker2';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import CloseIcon from '@material-ui/icons/Close'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import handleString from '../handleString'
function AdvanceSearch (props) {
  return (
    <div className='backGroundPopup'>
      <div className='col-xl-4 col-lg-5 col-md-8 col-12 mb-5'>
        <div className='box-wellcome'>
          <div className='main-form'>
            <div className='title-from w-100 d-flex p-2'>
              <div className='text-title col p-0'>
                <h2 className='m-0 d-flex'>
                  <SearchIcon className='ml-1' />
                  جستجوی پیشرفته
                </h2>
              </div>
              <div className='close'>
                <CloseIcon
                  onClick={() => props.handleState('advance', false)}
                />
              </div>
            </div>
            <div className='form row justify-content-start mt-3 mb-3'>
              <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                <div
                  className={`field-form persian ${
                    props.state.foucs === 'publisherSelected' ||
                    props.state.publisherSelected
                      ? 'active'
                      : ''
                  }`}
                >
                  <label>ناشر سند</label>
                  <select
                    name={`publisherSelected`}
                    value={props.state.publisherSelected}
                    onFocus={e => props.OnFocus(e.target.name)}
                    onBlur={props.OnBlur}
                    onChange={props.handleChange}
                  >
                    <option className='d-none'></option>
                    {props.state.publisher.map((_data, _key) => (
                      <option value={_data.value} key={_key}>
                        {_data.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                <div
                  className={`field-form persian ${
                    props.state.foucs === 'edition' || props.state.edition
                      ? 'active'
                      : ''
                  }`}
                >
                  <label>شماره ویرایش سند</label>
                  <input
                    type='text'
                    name='edition'
                    value={handleString(props.state.edition)}
                    onFocus={e => props.OnFocus(e.target.name)}
                    onBlur={props.OnBlur}
                    onChange={props.handleChange}
                  />
                </div>
              </div>

              <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                <div
                  className={`field-form persian ${
                    props.state.year || props.state.foucs === 'year'
                      ? 'active'
                      : ''
                  }`}
                >
                  <div className='icon-field'>
                    <DateRangeRoundedIcon />
                  </div>
                  <div className='col p-0'>
                    <label>سال انتشار</label>
                    <input
                      type='number'
                      name='year'
                      value={handleString(props.state.year)}
                      onFocus={e => props.OnFocus(e.target.name)}
                      onBlur={props.OnBlur}
                      onChange={props.handleChange}
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>

              <div className='col-xl-12 col-lg-12 col-md-12 col-12 d-flex align-items-center'>
                <div className='field-radio w-100 align-items-center'>
                  <label>وضعیت:</label>
                  <div className='main-radio pr-0'>
                    <div className='radio-button small mr-0 ml-0'>
                      <input
                        className='d-none'
                        type='radio'
                        id='ALL'
                        onClick={() => props.handleState('status', 'ALL')}
                      />
                      <label htmlFor='ALL'>
                        {props.state.status === 'ALL' ? (
                          <RadioButtonCheckedIcon />
                        ) : (
                          <RadioButtonUncheckedIcon />
                        )}
                        تمام ویرایش‌ها
                      </label>
                    </div>
                    <div className='radio-button small mr-0 ml-0'>
                      <input
                        className='d-none'
                        type='radio'
                        id='LAST_EDITION'
                        onClick={() =>
                          props.handleState('status', 'LAST_EDITION')
                        }
                      />
                      <label htmlFor='LAST_EDITION'>
                        {props.state.status === 'LAST_EDITION' ? (
                          <RadioButtonCheckedIcon />
                        ) : (
                          <RadioButtonUncheckedIcon />
                        )}
                        آخرین ویرایش‌
                      </label>
                    </div>
                    <div className='radio-button small mr-0 ml-0'>
                      <input
                        className='d-none'
                        type='radio'
                        id='DRAFT'
                        onClick={() => props.handleState('status', 'DRAFT')}
                      />
                      <label htmlFor='DRAFT'>
                        {props.state.status === 'DRAFT' ? (
                          <RadioButtonCheckedIcon />
                        ) : (
                          <RadioButtonUncheckedIcon />
                        )}
                        پیش نویس شده‌
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='submit-form col-12 mt-4'>
                <div className='col-8 pr-0 pl-1'>
                  <button
                    className='w-100 justify-content-center'
                    onClick={props.handleAdvanceSearch}
                    disabled={props.state.disabled}
                  >
                    {props.state.loading === 'submit' ? (
                      <Loading className='form-loader' />
                    ) : (
                      <DoneIcon />
                    )}
                    جستجو
                  </button>
                </div>
                <div className='col-4 pr-1 pl-0'>
                  <button
                    className='closeButton w-100 justify-content-center'
                    onClick={() => props.handleState('advance', false)}
                  >
                    <CloseIcon />
                    بستن
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AdvanceSearch
