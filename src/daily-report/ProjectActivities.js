import React from 'react'
import Loading from '../layout/loading'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import CreatableSelect from 'react-select/creatable'
import RoomIcon from '@material-ui/icons/Room'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
function ProjectActivities (props) {
  return (
    <div className='form row'>
      <div className='title-password col-12 mt-3 mb-3'>
        <h2 className='IranSans_Bold'>اطلاعات پیشرفت فعالیت های پروژه</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian rtl ${
            props.state.foucs === 'activityNumber' ||
            handleCheckText(props.state.activityNumber)
              ? 'active'
              : ''
          }`}
        >
          <label>
            شماره فعالیت یا wbs
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            readOnly={false}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={props.handleChange}
            name='activityNumber'
            value={handleString(props.state.activityNumber)}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian rtl ${
            props.state.foucs === 'activityDescription' ||
            handleCheckText(props.state.activityDescription)
              ? 'active'
              : ''
          }`}
        >
          <label>
            شرح فعالیت
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            readOnly={false}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={props.handleChange}
            name='activityDescription'
            value={handleString(props.state.activityDescription)}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian rtl ${
            props.state.foucs === 'workUnit' ||
            handleCheckText(props.state.workUnit)
              ? 'active'
              : ''
          }`}
        >
          <label>
            واحد کار
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            readOnly={false}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={props.handleChange}
            name='workUnit'
            value={handleString(props.state.workUnit)}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian rtl ${
            props.state.foucs === 'totalWorkload' ||
            handleCheckText(props.state.totalWorkload)
              ? 'active'
              : ''
          }`}
        >
          <label>
            حجم برآوردی کل کار
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            readOnly={false}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={props.handleChange}
            name='totalWorkload'
            value={handleString(props.state.totalWorkload)}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian rtl ${
            props.state.foucs === 'totalWorkloadYesterday' ||
            handleCheckText(props.state.totalWorkloadYesterday)
              ? 'active'
              : ''
          }`}
        >
          <label>
            حجم کل انجام شده تا دیروز
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            readOnly={false}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={props.handleChange}
            name='totalWorkloadYesterday'
            value={handleString(props.state.totalWorkloadYesterday)}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian rtl ${
            props.state.foucs === 'todayWork' ||
            handleCheckText(props.state.todayWork)
              ? 'active'
              : ''
          }`}
        >
          <label>
            مقدار کار امروز
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            readOnly={false}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={props.handleChange}
            name='todayWork'
            value={handleString(props.state.todayWork)}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian rtl ${
            props.state.foucs === 'NowWork' ||
            handleCheckText(props.state.NowWork)
              ? 'active'
              : ''
          }`}
        >
          <label>
            مقدار کار تا کنون
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            readOnly={false}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={props.handleChange}
            name='NowWork'
            value={handleString(props.state.NowWork)}
          />
        </div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div
          className={`field-form persian textarea ${
            props.state.foucs === 'description' ||
            handleCheckText(props.state.description)
              ? 'active'
              : ''
          }`}
        >
          <div className='col p-0'>
            <label className='textarea'>توضیحات</label>
            <textarea
              className='w-100'
              type='text'
              name='description'
              onFocus={e => props.OnFocus(e.target.name)}
              onBlur={props.OnBlur}
              onChange={props.handleChange}
              value={handleString(props.state.description)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className='title-password col-12 mt-3 mb-3'>
        <h2 className='IranSans_Bold'>ارسال تصاویر فعالیت ها</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div className={`field-form persian`}>
          <label>
            آپلود تصویر
            <span className='star IranSans_Bold'>*</span>
          </label>
          <div className='allName col row m-0 justify-content-end'>
            {props.state.pictureFileName.map((name, key) => (
              <span key={key}>
                <CloseRoundedIcon
                  onClick={() =>
                    props.deleteFile(key, 'pictureFile', 'pictureFileName')
                  }
                />
                {name}
              </span>
            ))}
          </div>
          <input
            className='d-none'
            type='file'
            id='upload-Picture'
            multiple
            onChange={e =>
              props.handleUpload(e, 'pictureFile', 'pictureFileName')
            }
          />
          <label className='upload-label' htmlFor='upload-Picture'>
            {props.state.loading === 'pictureFile' ? (
              <Loading className='form-loader w-auto' />
            ) : (
              <AttachFileIcon />
            )}
            آپلود فایل
          </label>
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div className='field-form selectBox'>
          <div className='icon-field labelSelect'>
            <RoomIcon />
          </div>
          <CreatableSelect
            value={props.state.LocationImage}
            onChange={newValue => props.getLocation(newValue, 'LocationImage')}
            options={props.state.location}
            placeholder={
              <label>
                لوکیشن تصاویر
                <span className='star IranSans_Bold'>*</span>
              </label>
            }
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian pl-1 ${
            props.state.foucs === `importanceRreport` ||
            handleCheckText(props.state.importanceRreport)
              ? 'active'
              : ''
          }`}
        >
          <label>میزان اهمیت گزارش تصویر</label>
          <select
            name={`importanceRreport`}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={props.handleChange}
            value={props.state.importanceRreport}
          >
            <option className='d-none'></option>
            <option>test</option>
            <option>test</option>
            <option>test</option>
            <option>test</option>
          </select>
        </div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div
          className={`field-form persian textarea ${
            props.state.foucs === 'lessonsLearned' ||
            handleCheckText(props.state.lessonsLearned)
              ? 'active'
              : ''
          }`}
        >
          <div className='col p-0'>
            <label className='textarea'>درس آموخته</label>
            <textarea
              className='w-100'
              type='text'
              name='lessonsLearned'
              onFocus={e => props.OnFocus(e.target.name)}
              onBlur={props.OnBlur}
              onChange={props.handleChange}
              value={handleString(props.state.lessonsLearned)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
        <div className='field-form selectBox'>
          <CreatableSelect
            isMulti
            onChange={newValue =>
              props.getLocation(newValue, 'keywordsSelected')
            }
            options={props.state.keywords}
            placeholder={
              <label>
                تخصیص تگ (با ENT جدا کنید)
                <span className='star IranSans_Bold'>*</span>
              </label>
            }
          />
        </div>
      </div>
      <div className='submit-form col-12 justify-content-start mt-4'>
        <button className='level justify-content-end w-auto'>
          مرحله بعد
          <ArrowBackIosIcon />
        </button>
      </div>
    </div>
  )
}
export default ProjectActivities
