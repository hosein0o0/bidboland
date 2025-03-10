import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
function Workforce (props) {
  return (
    <div className='form row'>
      <div className='title-password col-12 mt-3 mb-3'>
        <h2 className='IranSans_Bold'>اطلاعات نیروی کار غیر مستقیم</h2>
        <div className='line'></div>
      </div>
      {props.state.indirectLabor.map((direct, index) => (
        <div className='w-100 row m-0'>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian rtl ${
                props.state.foucs === `InJob_${index}` ||
                handleCheckText(direct.InJob)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                عنوان شغلی
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={false}
                onFocus={e => props.OnFocus(e.target.name)}
                onBlur={props.OnBlur}
                onChange={e => props.handleChangeList(e, 'indirectLabor')}
                name={`InJob_${index}`}
                value={handleString(direct.InJob)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian rtl ${
                props.state.foucs === `InNumberReady_${index}` ||
                handleCheckText(direct.InNumberReady)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                تعداد حاضر به کار امروز
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={false}
                onFocus={e => props.OnFocus(e.target.name)}
                onBlur={props.OnBlur}
                onChange={e => props.handleChangeList(e, 'indirectLabor')}
                name={`InNumberReady_${index}`}
                value={handleString(direct.InNumberReady)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian rtl ${
                props.state.foucs === `InDayConsumption_${index}` ||
                handleCheckText(direct.InDayConsumption)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                نفر - روز مصرف شده تا کنون
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={false}
                onFocus={e => props.OnFocus(e.target.name)}
                onBlur={props.OnBlur}
                onChange={e => props.handleChangeList(e, 'indirectLabor')}
                name={`InDayConsumption_${index}`}
                value={handleString(direct.InDayConsumption)}
              />
            </div>
          </div>
          <div className='col-12'>
            <div className='line'>
              <hr />
            </div>
          </div>
        </div>
      ))}
      <div className='button-add col-12'>
        <button
          onClick={() =>
            props.addData('indirectLabor', {
              InJob: '',
              InNumberReady: '',
              InDayConsumption: ''
            })
          }
        >
          <AddIcon />
          افزودن مورد جدید
        </button>
      </div>
      <div className='title-password col-12 mt-3 mb-3'>
        <h2 className='IranSans_Bold'>اطلاعات نیروی کار مستقیم</h2>
        <div className='line'></div>
      </div>
      {props.state.directLabor.map((direct, index) => (
        <div className='w-100 row m-0'>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian rtl ${
                props.state.foucs === `job_${index}` ||
                handleCheckText(direct.job)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                عنوان شغلی
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={false}
                onFocus={e => props.OnFocus(e.target.name)}
                onBlur={props.OnBlur}
                onChange={e => props.handleChangeList(e, 'directLabor')}
                name={`job_${index}`}
                value={handleString(direct.job)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian rtl ${
                props.state.foucs === `numberReady_${index}` ||
                handleCheckText(direct.numberReady)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                تعداد حاضر به کار امروز
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={false}
                onFocus={e => props.OnFocus(e.target.name)}
                onBlur={props.OnBlur}
                onChange={e => props.handleChangeList(e, 'directLabor')}
                name={`numberReady_${index}`}
                value={handleString(direct.numberReady)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian rtl ${
                props.state.foucs === `dayConsumption_${index}` ||
                handleCheckText(direct.dayConsumption)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                نفر - روز مصرف شده تا کنون
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={false}
                onFocus={e => props.OnFocus(e.target.name)}
                onBlur={props.OnBlur}
                onChange={e => props.handleChangeList(e, 'directLabor')}
                name={`dayConsumption_${index}`}
                value={handleString(direct.dayConsumption)}
              />
            </div>
          </div>
          <div className='col-12'>
            <div className='line'>
              <hr />
            </div>
          </div>
        </div>
      ))}
      <div className='button-add col-12'>
        <button
          onClick={() =>
            props.addData('directLabor', {
              job: '',
              numberReady: '',
              dayConsumption: ''
            })
          }
        >
          <AddIcon />
          افزودن مورد جدید
        </button>
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
export default Workforce
