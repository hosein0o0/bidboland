import React from 'react'
// import DatePicker from 'react-datepicker2';
// import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
// import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
// import Loading from '../layout/loading'
// import AttachFileIcon from '@material-ui/icons/AttachFile';
// import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Date from './Date'
import TextArea from './TextArea'
import Select from './Select'
import Radio from './Radio'
import Upload from './Upload'
import Default from './Default'
import Location from './Location'
import MultiSelect from './MultiSelect'
import CheckBox from './CheckBox'
import Switch from './Switch'
import handleString from '../handleString'
import CheckPersianText from '../CheckPersianText'
function Form(props) {
  function handleLtrRtl(data) {
    let result = ''
    let value = state[data.value]
    if (typeof value === 'string') {
      let value_current = handleString(value)
      const check = CheckPersianText(value_current)
      result = check ? 'rtl' : 'ltr'
    }
    return result
  }
  function hadnleClassName(data) {
    const lrt_rtl = handleLtrRtl(data)
    if (data.rtl) {
      return {
        className: 'persian rtl',
        textAlign: `text-right ${lrt_rtl}`
      }
    } else {
      return {
        className: 'ltr',
        textAlign: `text-left ${lrt_rtl}`
      }
    }
  }
  function handleRequire(data) {
    if (data.require) {
      return <span className='star IranSans_Bold'>*</span>
    } else return ''
  }
  function handleShow(data, key) {
    if (data.class) {
      if (data.access) {
        return data.html()
      } else return ''
    } else if (data.switch) {
      return (
        <Switch
          {...props}
          data={data}
          _key={key}
          key={key}
          hadnleClassName={hadnleClassName}
        />
      )
    } else if (data.date && props.handleState) {
      if (!data.cantShow) {
        return (
          <Date
            {...props}
            data={data}
            _key={key}
            key={key}
            hadnleClassName={hadnleClassName}
            handleRequire={handleRequire}
          />
        )
      } else return ''
    } else if (data.checkBox && props.handleState) {
      return (
        <CheckBox
          {...props}
          data={data}
          _key={key}
          key={key}
          hadnleClassName={hadnleClassName}
          handleRequire={handleRequire}
        />
      )
    } else if (data.multi && props.handleState) {
      return (
        <MultiSelect
          {...props}
          data={data}
          _key={key}
          key={key}
          hadnleClassName={hadnleClassName}
          handleRequire={handleRequire}
        />
      )
    } else if (data.textArea) {
      if (data.access) {
        return (
          <TextArea
            {...props}
            data={data}
            _key={key}
            key={key}
            hadnleClassName={hadnleClassName}
            handleRequire={handleRequire}
          />
        )
      } else return ''
    } else if (data.select) {
      return (
        <Select
          {...props}
          data={data}
          _key={key}
          key={key}
          hadnleClassName={hadnleClassName}
          handleRequire={handleRequire}
        />
      )
    } else if (data.radio) {
      return (
        <Radio
          {...props}
          data={data}
          _key={key}
          key={key}
          hadnleClassName={hadnleClassName}
          handleRequire={handleRequire}
        />
      )
    } else if (data.upload) {
      return (
        <Upload
          {...props}
          data={data}
          _key={key}
          key={key}
          hadnleClassName={hadnleClassName}
          handleRequire={handleRequire}
        />
      )
    } else if (data.location) {
      return (
        <Location
          {...props}
          data={data}
          _key={key}
          key={key}
          hadnleClassName={hadnleClassName}
          handleRequire={handleRequire}
        />
      )
    } else {
      return (
        <Default
          {...props}
          data={data}
          _key={key}
          key={key}
          hadnleClassName={hadnleClassName}
          handleRequire={handleRequire}
        />
      )
    }
  }
  let state = props.state || {}
  let itemForm = state.itemForm || props.itemForm || []
  return itemForm.map((data, key) => (
    <React.Fragment>
      {data.label ? (
        <div
          className={`title-password col-12 mt-3 mb-2 ${hadnleClassName(data).className}`}
        >
          <h2 className={`IranSans_Bold ${data.rtl ? 'pl-2' : 'pr-2'}`}>
            {data.label}
          </h2>
          <div className='line'></div>
        </div>
      ) : (
        ''
      )}
      {handleShow(data, key)}
    </React.Fragment>
  ))
}
export default Form
