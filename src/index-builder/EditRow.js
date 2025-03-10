import React, { useEffect, useState } from 'react'
import DoneIcon from '@material-ui/icons/Done'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import handleString from '../handleString'
function EditRow (props) {
  const [tagName, setNameTag] = useState('')
  const [title, setDemoTitle] = useState('')
  const [dataType, setDataType] = useState('')
  // const [dataBaseTitle, setTitleDatabase] = useState('')
  const [values, setValues] = useState([])
  const [notnull, setNotNull] = useState(false)
  const [checkDefault, setDefault] = useState(false)
  const [textDefault, setTextDefault] = useState('')
  const [currenttimestamp, setCurrenttimestamp] = useState(false)
  useEffect(() => {
    setNameTag(props.item.tagName)
    setDemoTitle(props.item.title)
    setDataType(props.item.dataType)
    // setTitleDatabase(props.item.dataBaseTitle)
    if (props.item.notnull === undefined) {
      setNotNull(true)
    }
    if (props.item.values) {
      setValues(props.item.values)
    }
    if (props.item.default) {
      setDefault(true)
      setTextDefault(props.item.default)
    }
    if (props.item.current_timestamp) {
      setCurrenttimestamp(props.item.current_timestamp)
    }
  }, [props])
  function handleSubmit () {
    let obj = {
      tagName: tagName,
      title: title,
      dataType: dataType
      // dataBaseTitle: dataBaseTitle
    }
    if (dataType === 'enum') {
      obj['values'] = values
    }
    if (!notnull) {
      obj['notnull'] = true
    }
    if (checkDefault) {
      obj['default'] = textDefault
    }
    if (currenttimestamp) {
      obj['current_timestamp'] = currenttimestamp
    }
    const Check =
      dataType === 'enum'
        ? title &&
          dataType &&
          values.length > 0 &&
          (checkDefault ? textDefault !== '' : true)
        : title && dataType && (checkDefault ? textDefault !== '' : true)
    // const definedColumnsList = props.that.props.state.definedColumnsList
    // let ListDataBaseTitle = Object.keys(definedColumnsList).map((data) => { return definedColumnsList[data].dataBaseTitle })
    // let checkRepeat = !ListDataBaseTitle.includes(obj.dataBaseTitle)
    if (Check) {
      // if (checkRepeat) {
      props.that.props.handleUpdata(obj, props.index)
      // } else {
      //     Notification.notify(Message.text(922), 'warning');
      // }
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  // function handleChange(e) {
  //     let value = e.target.value.trim()
  //     if (props.that.props.just_english(value)) {
  //         if (value.length === 1) {
  //             value = value.replace(/[^A-Za-z]/ig, '')
  //         }
  //         // setTitleDatabase(value)
  //     }
  // }
  function handleEnum (data) {
    let findDuplicates = data =>
      data.filter((item, index) => data.indexOf(item) !== index)
    if (findDuplicates(data).length > 0) {
      Notification.notify(Message.text(923), 'warning')
    }
    let unique = [...new Set(data)]
    setValues(unique)
  }
  return (
    <td className='edit-item-definedColumns'>
      <div className='row m-0 w-100'>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian
                     ${
                       props.that.props.state.foucs ===
                         `tagName_${props.index}` || tagName
                         ? 'active'
                         : ''
                     }
                     `}
          >
            <label>نام تگ</label>
            <input
              name={`tagName_${props.index}`}
              value={handleString(tagName)}
              onFocus={e => props.that.props.OnFocus(e.target.name)}
              onBlur={props.that.props.OnBlur}
              onChange={e => setNameTag(handleString(e.target.value))}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian
                     ${
                       props.that.props.state.foucs ===
                         `title_${props.index}` || title
                         ? 'active'
                         : ''
                     }
                     `}
          >
            <label>
              عنوان نمایشی
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              name={`title_${props.index}`}
              value={handleString(title)}
              onFocus={e => props.that.props.OnFocus(e.target.name)}
              onBlur={props.that.props.OnBlur}
              onChange={e => setDemoTitle(handleString(e.target.value))}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${
              props.that.props.state.foucs === `dataType_${props.index}` ||
              dataType
                ? 'active'
                : ''
            }`}
          >
            <label>
              نوع داده
              <span className='star IranSans_Bold'>*</span>
            </label>
            <select
              name={`dataType_${props.index}`}
              value={dataType}
              onFocus={e => props.that.props.OnFocus(e.target.name)}
              onBlur={props.that.props.OnBlur}
              onChange={e => setDataType(handleString(e.target.value))}
            >
              <option className='d-none'></option>
              {props.that.props.state.listDataType.map((data, key) => (
                <option value={data.value} key={key}>
                  {data.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div className={`field-form
                     ${props.that.props.state.foucs === `dataBaseTitle_${props.index}` || dataBaseTitle ? 'active' : ''}
                     `}>
                        <label className='label-persian rtl'>
                            عنوان در دیتابیس
                            <span className='star IranSans_Bold'>*</span>
                        </label>
                        <input
                            className='text-left ltr'
                            name={`dataBaseTitle_${props.index}`}
                            value={dataBaseTitle}
                            onFocus={(e) => props.that.props.OnFocus(e.target.name)}
                            onBlur={props.that.props.OnBlur}
                            // onChange={(e) => setTitleDatabase(e.target.value)}
                            onChange={handleChange}
                        />
                    </div>
                </div> */}
        {dataType === 'enum' && (
          <div className='col-12 mt-3 mb-3'>
            <TagsInput
              inputProps={{
                className: 'react-tagsinput-input tagsInput',
                placeholder: 'جدا سازی با Enter'
              }}
              value={values}
              onChange={values => handleEnum(values)}
            />
          </div>
        )}
        <div className='col-xl-6 col-lg-6 col-md-12 col-12 disiplin-checkbox'>
          <div className='checkbox mt-1 mb-1 col-6 mr-0 ml-0'>
            <input
              className='d-none'
              id={`notnull_${props.index}`}
              name={`notnull_${props.index}`}
              type='checkbox'
              onChange={e => setNotNull(e.target.checked)}
              checked={notnull ? true : false}
            />
            <label className='w-auto' htmlFor={`notnull_${props.index}`}>
              {notnull ? (
                <CheckBoxRoundedIcon />
              ) : (
                <CheckBoxOutlineBlankRoundedIcon />
              )}
              می‌تواند خالی باشد
            </label>
          </div>
          <div className='checkbox mt-1 mb-1 col-6 mr-0 ml-0'>
            <input
              className='d-none'
              id={`checkDefault_${props.index}`}
              name={`checkDefault_${props.index}`}
              type='checkbox'
              onChange={e => setDefault(e.target.checked)}
              checked={checkDefault ? true : false}
            />
            <label className='w-auto' htmlFor={`checkDefault_${props.index}`}>
              {checkDefault ? (
                <CheckBoxRoundedIcon />
              ) : (
                <CheckBoxOutlineBlankRoundedIcon />
              )}
              مقدار پیش فرض
            </label>
          </div>
          {dataType === 'timestamp' && (
            <div className='checkbox mt-1 mb-1 col-6 mr-0 ml-0'>
              <input
                className='d-none'
                id={`Currenttimestamp_${props.index}`}
                name={`Currenttimestamp_${props.index}`}
                type='checkbox'
                onChange={e => setCurrenttimestamp(e.target.checked)}
                checked={currenttimestamp ? true : false}
              />
              <label
                className='w-auto'
                htmlFor={`Currenttimestamp_${props.index}`}
              >
                {currenttimestamp ? (
                  <CheckBoxRoundedIcon />
                ) : (
                  <CheckBoxOutlineBlankRoundedIcon />
                )}
                current_timestamp
              </label>
            </div>
          )}
        </div>
        {checkDefault && (
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                props.that.props.state.foucs === 'default' || textDefault
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                مقدار پیش فرض
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                name='default'
                value={handleString(textDefault)}
                onFocus={e => props.that.props.OnFocus(e.target.name)}
                onBlur={props.that.props.OnBlur}
                onChange={e => setTextDefault(handleString(e.target.value))}
              />
            </div>
          </div>
        )}
        <div className='submit-form col-12 mt-1'>
          <button className='edit' onClick={handleSubmit}>
            <DoneIcon className='ml-1' />
            اعمال تغییرات
          </button>
        </div>
      </div>
    </td>
  )
}
export default EditRow
