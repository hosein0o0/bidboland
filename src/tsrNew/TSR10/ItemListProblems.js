import React from 'react'
// import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import DatePicker from 'react-datepicker2'
import moment from 'moment-jalaali'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import handleCheckText from '../../handleCheckText'
const ItemListProblems = props => {
  const check_disabled = props.check_disabled
  const {
    handleChangeList,
    ValueTable,
    handleDelete,
    handlCreate,
    handleDisabled_Update
  } = props.API
  let name_table = ValueTable()
  const canCreate = handlCreate(10)
  // foucs
  function handleChange(e) {
    let { nameList, _key } = props
    const { name, value } = e.target
    handleChangeList(name, value, nameList, _key)
  }
  function handleChangeDateList(name, value) {
    let { nameList, _key } = props
    handleChangeList(name, value, nameList, _key)
  }
  let data = props.data || {}
  function handleClassName(name) {
    let { foucs } = props.state
    let state1 = foucs === `${name}_${props._key}`
    let state2 = data[name] ? true : false
    let result = state1 || state2
    let className = result ? 'active' : ''
    return className
  }
  function handleClassNameDate(name) {
    let value = data[name]
    let result = value ? 'active' : ''
    return result
  }
  function CheckType(date) {
    let result
    if (typeof date === 'string') {
      if (handleCheckText(date)) {
        result = moment(date, 'jYYYY/jM/jD')
      }
    } else result = date || null
    return result
  }
  function ConvertDate(date) {
    const check = typeof date === 'object'
    const checkString = typeof date === 'string'
    let result = ''
    if (check) {
      date = date || {}
      if (date._isValid) {
        result = moment(date).local('fa').format('jYYYY/jMM/jDD')
      }
    } else if (checkString) {
      result = date
    }
    return result
  }
  function handleRadio(name, value) {
    if (!check_disabled) {
      let { nameList, _key } = props
      handleChangeList(name, value, nameList, _key)
    }
  }
  const state1 = handleDisabled_Update(1)
  const state2 = handleDisabled_Update(2)
  const state3 = handleDisabled_Update(3)
  const state4 = handleDisabled_Update(4)
  function ClickRadio(value) {
    if (state4) {
      if (!data._not_disabled) {
        if (data.PrevConfirmation === 'false') {
          handleRadio('confirmation', value)
        }
      }
    } else if (state2) {
      if (!data._not_disabled) {
        if (data.confirmation === 'false') {
          handleRadio('confirmation', value)
        }
      }
    }
  }
  function handleDisabledDesc() {
    let result = true
    if (canCreate) {
      result = check_disabled
    } else if (state1) {
      if (data.confirmation === 'false') {
        result = false
      }
    } else if (state2 || state4) {
      if (data._not_disabled) {
        result = false
      }
    }else if(state3){
      result = false
    }
    return result
  }
  function handleDisabledDate() {
    let result = true
    if (canCreate) {
      result = check_disabled
    } else if (state1) {
      if (data.confirmation === 'false') {
        result = false
      }
    } else if (state2 || state4) {
      if (data._not_disabled) {
        result = false
      }
    }else if(state3){
      result = false
    }
    return result
  }
  function handleRemoveShow() {
    let check = props.length > 0
    let result = false
    if (check) {
      if (canCreate) {
        result = true
      } else if (state1) {
        if (data.confirmation === 'false') {
          result = true
        }
      } else if (state2 || state4 || state3) {
        if (data._not_disabled) {
          result = true
        }
      }
    }
    return result
  }
  const dis_desc = handleDisabledDesc()
  const dis_date = handleDisabledDate()
  const show_remove = handleRemoveShow()
  return (
    <div className='w-100 mr-0 ml-0 row'>
      <div className='title-password list-counter col-12 mt-3 mb-2'>
        <h2 className='IranSans_Bold_FA'>{props._key + 1}</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div
          className={`field-form persian textarea ${handleClassName(
            'description'
          )}`}
        >
          <div className='col p-0'>
            <label className='textarea'>شرح اشکال</label>
            <textarea
              name='description'
              value={handleString(data.description)}
              onChange={handleChange}
              onFocus={() => props.OnFocus(`description_${props._key}`)}
              onBlur={props.OnBlur}
              disabled={dis_desc}
              readOnly={dis_desc}
            />
          </div>
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div className={`field-form persian ${handleClassName('followUp')}`}>
          <label>پیگیری کننده</label>
          <input disabled={true} readOnly={true} value={data.followUp} />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${handleClassNameDate('actionDate')}`}
        >
          <div className='icon-field'>
            <DateRangeRoundedIcon />
          </div>
          <div className='col p-0'>
            <label>مهلت اقدام</label>
            {dis_date ? (
              <input
                className='IranSans_Medium_FA'
                disabled={true}
                readOnly={true}
                value={ConvertDate(data.actionDate)}
              />
            ) : (
              <DatePicker
                persianDigits={true}
                isGregorian={false}
                timePicker={false}
                onChange={date => handleChangeDateList('actionDate', date)}
                value={CheckType(data.actionDate)}
              />
            )}
          </div>
        </div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12 d-flex align-items-center'>
        <div className='field-radio align-items-center w-100'>
          <label>تائید کننده : </label>
          <div className='main-radio pr-0'>
            <div className='radio-button px-1 m-1'>
              <input
                className='d-none'
                type='radio'
                id={`confirmation_${props._key}`}
              />
              <label
                onClick={() => ClickRadio('true')}
                htmlFor={`confirmation_${props._key}`}
              >
                {data.confirmation === 'true' ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                تائید شده
              </label>
            </div>
            <div className='radio-button px-1 m-1'>
              <input
                className='d-none'
                type='radio'
                id={`confirmation_${props._key}`}
              />
              <label
                onClick={() => ClickRadio('false')}
                htmlFor={`confirmation_${props._key}`}
              >
                {data.confirmation === 'false' ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                تائید نشده
              </label>
            </div>
          </div>
        </div>
      </div>
      {show_remove && (
        <div className='button-add col-12 row mr-0 ml-0'>
          <button
            className='remove'
            onClick={() => handleDelete(props.nameList, props._key)}
          >
            <DeleteRoundedIcon />
            حذف
          </button>
        </div>
      )}
    </div>
  )
}
export default ItemListProblems
