import React from 'react'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
function BasicData (props) {
  return (
    <div className='row m-0 w-100'>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs === 'tableTitle' ||
            handleCheckText(props.state.tableTitle)
              ? 'active'
              : ''
          }`}
        >
          <label>
            عنوان جدول
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            name='tableTitle'
            value={handleString(props.state.tableTitle)}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={e => props.handleChange(e)}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs === 'fileName' ||
            handleCheckText(props.state.fileName)
              ? 'active'
              : ''
          }`}
        >
          <label>
            نام فایل مربوطه
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            name='fileName'
            value={handleString(props.state.fileName)}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={e => props.handleChange(e)}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian ${
            props.state.foucs === 'lineNumberStarted' ||
            handleCheckText(props.state.lineNumberStarted)
              ? 'active'
              : ''
          }`}
        >
          <label>
            شماره سطر شروع داده
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            name='lineNumberStarted'
            value={handleString(props.state.lineNumberStarted)}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={e => props.handleChange(e)}
          />
        </div>
      </div>
    </div>
  )
}
export default BasicData
