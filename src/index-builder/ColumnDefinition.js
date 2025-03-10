import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
function ColumnDefinition (props) {
  const [tags, setTags] = useState([])
  const [notnull, setNotNull] = useState(false)
  const [checkDefault, setDefault] = useState(false)
  const [textDefault, setTextDefault] = useState('')
  const [currenttimestamp, setCurrenttimestamp] = useState(false)
  function handleChange (e) {
    let obj = props.state.columnDefinition
    if (e.target.name === 'dataBaseTitle') {
      // let value = e.target.value.trim()
      // if (props.just_english(value)) {
      //     if (value.length === 1) {
      //         value = value.replace(/[^A-Za-z]/ig, '')
      //     }
      //     obj[e.target.name] = value
      // }
    } else {
      if (e.target.name === 'dataType') {
        setCurrenttimestamp(false)
        setTags([])
      } else if (e.target.name === 'title') {
        // let value = e.target.value
        // value = value.replace(/[^A-Za-z]/ig, '')
        // obj['dataBaseTitle'] = value
      }
      setDefault(false)
      obj[e.target.name] = handleString(e.target.value)
    }
    props.handleState('columnDefinition', obj)
  }
  async function handleSubmit () {
    const { columnDefinition } = await props.state
    const checkvalue =
      (await props.state.columnDefinition.dataType) === 'enum'
        ? columnDefinition.title &&
          columnDefinition.dataType &&
          tags.length > 0 &&
          (checkDefault ? handleCheckText(textDefault) : true)
        : columnDefinition.title &&
          columnDefinition.dataType &&
          (checkDefault ? handleCheckText(textDefault) : true)

    let obj = await {
      tagName: columnDefinition.tagName,
      title: columnDefinition.title,
      dataType: columnDefinition.dataType
      // dataBaseTitle: columnDefinition.dataBaseTitle
    }
    if (props.state.columnDefinition.dataType === 'enum') {
      if (tags.length > 0) {
        obj['values'] = await tags
      }
    }
    if (!notnull) {
      obj['notnull'] = await true
    }
    if (checkDefault && textDefault) {
      obj['default'] = await textDefault
    }
    if (currenttimestamp) {
      obj['current_timestamp'] = await currenttimestamp
    }
    await props.handleAddRow(obj, checkvalue)
    const check =
      (await props.state.columnDefinition.title) &&
      props.state.columnDefinition.dataType &&
      props.state.columnDefinition.dataBaseTitle
    if (check) {
      await setTags([])
      await setNotNull(false)
      await setDefault(false)
      await setTextDefault('')
      await setCurrenttimestamp(false)
    }
  }
  function handleEnum (data) {
    let findDuplicates = data =>
      data.filter((item, index) => data.indexOf(item) !== index)
    if (findDuplicates(data).length > 0) {
      Notification.notify(Message.text(923), 'warning')
    }
    let unique = [...new Set(data)]
    setTags(unique)
  }
  let { columnDefinition } = props.state
  columnDefinition = columnDefinition ? columnDefinition : {}
  return (
    <div className='row m-0 w-100'>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs === 'tagName' ||
            handleCheckText(columnDefinition.tagName)
              ? 'active'
              : ''
          }`}
        >
          <label>نام تگ</label>
          <input
            name='tagName'
            value={handleString(columnDefinition.tagName)}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs === 'title' ||
            handleCheckText(columnDefinition.title)
              ? 'active'
              : ''
          }`}
        >
          <label>
            عنوان نمایشی
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            name='title'
            value={handleString(columnDefinition.title)}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs === `dataType` ||
            handleCheckText(columnDefinition.dataType)
              ? 'active'
              : ''
          }`}
        >
          <label>
            نوع داده
            <span className='star IranSans_Bold'>*</span>
          </label>
          <select
            name={`dataType`}
            value={handleString(columnDefinition.dataType)}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={handleChange}
          >
            <option className='d-none'></option>
            {props.state.listDataType.map((data, key) => (
              <option value={data.value} key={key}>
                {data.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {columnDefinition.dataType === 'enum' && (
        <div className='col-12 mt-3 mb-3'>
          <TagsInput
            inputProps={{
              className: 'react-tagsinput-input tagsInput',
              placeholder: 'جدا سازی با Enter'
            }}
            value={tags}
            onChange={tags => handleEnum(tags)}
          />
        </div>
      )}
      <div className='col-xl-6 col-lg-6 col-md-12 col-12 disiplin-checkbox'>
        <div className='checkbox mt-1 mb-1 col-6 mr-0 ml-0 pr-0'>
          <input
            className='d-none'
            id={`notnull`}
            name='notnull'
            type='checkbox'
            onChange={e => setNotNull(e.target.checked)}
            checked={notnull ? true : false}
          />
          <label className='w-auto' htmlFor={`notnull`}>
            {notnull ? (
              <CheckBoxRoundedIcon />
            ) : (
              <CheckBoxOutlineBlankRoundedIcon />
            )}
            می‌تواند خالی باشد
          </label>
        </div>
        {columnDefinition.dataType === 'timestamp' ||
        columnDefinition.dataType === 'time' ? (
          ''
        ) : (
          <div className='checkbox mt-1 mb-1 col-6 mr-0 ml-0 pr-0'>
            <input
              className='d-none'
              id={`checkDefault`}
              name='checkDefault'
              type='checkbox'
              onChange={e => setDefault(e.target.checked)}
              checked={checkDefault ? true : false}
            />
            <label className='w-auto' htmlFor={`checkDefault`}>
              {checkDefault ? (
                <CheckBoxRoundedIcon />
              ) : (
                <CheckBoxOutlineBlankRoundedIcon />
              )}
              مقدار پیش فرض
            </label>
          </div>
        )}
        {(columnDefinition.dataType === 'timestamp' ||
          columnDefinition.dataType === 'time') && (
          <div className='checkbox mt-1 mb-1 col-6 mr-0 ml-0 pr-0'>
            <input
              className='d-none'
              id={`Currenttimestamp`}
              name='Currenttimestamp'
              type='checkbox'
              onChange={e => setCurrenttimestamp(e.target.checked)}
              checked={currenttimestamp ? true : false}
            />
            <label className='w-auto' htmlFor={`Currenttimestamp`}>
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
              props.state.foucs === 'default' || handleCheckText(textDefault)
                ? 'active'
                : ''
            }`}
          >
            <label>مقدار پیش فرض</label>
            <input
              name='default'
              value={handleString(textDefault)}
              onFocus={e => props.OnFocus(e.target.name)}
              onBlur={props.OnBlur}
              onChange={e => setTextDefault(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className='button-add col-12'>
        <button className='pr-2 pl-2 w-auto' onClick={handleSubmit}>
          <AddIcon />
          افزودن (Ent)
        </button>
      </div>
    </div>
  )
}
export default ColumnDefinition
