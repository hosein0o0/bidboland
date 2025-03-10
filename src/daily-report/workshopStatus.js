import React from 'react'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
function WorkshopStatus (props) {
  return (
    <div className='form row'>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12 d-flex align-items-center'>
        <div className='field-radio rtl w-100'>
          <label>
            شرایط جوی
            <span className='star IranSans_Bold'>*</span>
          </label>
          <div className='main-radio'>
            <div className='radio-button'>
              <input
                className='d-none'
                type='radio'
                id='sunny'
                onClick={() => props.handleChangeRadion('atmospheric', 'sunny')}
              />
              <label htmlFor='sunny'>
                {props.state.atmospheric === 'sunny' ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                آفتابی
              </label>
            </div>
            <div className='radio-button'>
              <input
                className='d-none'
                type='radio'
                id='cloudy'
                onClick={() =>
                  props.handleChangeRadion('atmospheric', 'cloudy')
                }
              />
              <label htmlFor='cloudy'>
                {props.state.atmospheric === 'cloudy' ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                ابری
              </label>
            </div>
            <div className='radio-button'>
              <input
                className='d-none'
                type='radio'
                id='rainy'
                onClick={() => props.handleChangeRadion('atmospheric', 'rainy')}
              />
              <label htmlFor='rainy'>
                {props.state.atmospheric === 'rainy' ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                بارانی
              </label>
            </div>
            <div className='radio-button'>
              <input
                className='d-none'
                type='radio'
                id='runningSand'
                onClick={() =>
                  props.handleChangeRadion('atmospheric', 'runningSand')
                }
              />
              <label htmlFor='runningSand'>
                {props.state.atmospheric === 'runningSand' ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                شن روان
              </label>
            </div>
            <div className='radio-button'>
              <input
                className='d-none'
                type='radio'
                id='snowy'
                onClick={() => props.handleChangeRadion('atmospheric', 'snowy')}
              />
              <label htmlFor='snowy'>
                {props.state.atmospheric === 'snowy' ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                برفی
              </label>
            </div>
            <div className='radio-button'>
              <input
                className='d-none'
                type='radio'
                id='storm'
                onClick={() => props.handleChangeRadion('atmospheric', 'storm')}
              />
              <label htmlFor='storm'>
                {props.state.atmospheric === 'storm' ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                طوفانی
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className='title-password col-12 mt-3 mb-3'>
        <h2 className='IranSans_Bold'>درجه حرارت (سانتی گراد)</h2>
        <div className='line'></div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian rtl ${
            props.state.foucs === 'maximumTemperature' ||
            handleCheckText(props.state.maximumTemperature)
              ? 'active'
              : ''
          }`}
        >
          <label>
            حداکثر دما
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            readOnly={false}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={props.handleChange}
            name='maximumTemperature'
            value={handleString(props.state.maximumTemperature)}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian rtl ${
            props.state.foucs === 'minimumTemperature' ||
            handleCheckText(props.state.minimumTemperature)
              ? 'active'
              : ''
          }`}
        >
          <label>
            حداقل دما
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            readOnly={false}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={props.handleChange}
            name='minimumTemperature'
            value={handleString(props.state.minimumTemperature)}
          />
        </div>
      </div>
      <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
        <div
          className={`field-form persian rtl ${
            props.state.foucs === 'humidity' ||
            handleCheckText(props.state.humidity)
              ? 'active'
              : ''
          }`}
        >
          <label>
            حداقل دما
            <span className='star IranSans_Bold'>*</span>
          </label>
          <input
            readOnly={false}
            onFocus={e => props.OnFocus(e.target.name)}
            onBlur={props.OnBlur}
            onChange={props.handleChange}
            name='humidity'
            value={handleString(props.state.humidity)}
          />
        </div>
      </div>
      <div className='col-xl-12 col-lg-12 col-md-12 col-12 d-flex align-items-center'>
        <div className='field-radio rtl w-100'>
          <label>وضعیت کارگاه</label>
          <div className='main-radio'>
            <div className='radio-button'>
              <input
                className='d-none'
                type='radio'
                id='active'
                onClick={e =>
                  props.handleChangeRadion('workshopStatus', 'active')
                }
              />
              <label htmlFor='active'>
                {props.state.workshopStatus === 'active' ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                فعال
              </label>
            </div>
            <div className='radio-button'>
              <input
                className='d-none'
                type='radio'
                id='semi-active'
                onClick={() => {
                  props.handleChangeRadion('workshopStatus', 'semi-active')
                  props.resetStatus('inactiveCause')
                }}
              />
              <label htmlFor='semi-active'>
                {props.state.workshopStatus === 'semi-active' ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                نیمه فعال
              </label>
            </div>
            <div className='radio-button'>
              <input
                className='d-none'
                type='radio'
                id='inactive'
                onClick={() => {
                  props.handleChangeRadion('workshopStatus', 'inactive')
                  props.resetStatus('inactiveCause')
                }}
              />
              <label htmlFor='inactive'>
                {props.state.workshopStatus === 'inactive' ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                غیر فعال
              </label>
            </div>
          </div>
        </div>
      </div>
      {props.state.workshopStatus === 'semi-active' ||
      props.state.workshopStatus === 'inactive' ? (
        <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
          <div
            className={`field-form persian rtl ${
              props.state.foucs === 'inactiveCause' ||
              handleCheckText(props.state.inactiveCause)
                ? 'active'
                : ''
            }`}
          >
            <label>
              {`علت 
                        ${
                          props.state.workshopStatus === 'semi-active'
                            ? 'نیمه فعال'
                            : ' غیر فعال '
                        }
                        بودن
                        کارگاه`}
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              readOnly={false}
              onFocus={e => props.OnFocus(e.target.name)}
              onBlur={props.OnBlur}
              onChange={props.handleChange}
              name='inactiveCause'
              value={handleString(props.state.inactiveCause)}
            />
          </div>
        </div>
      ) : (
        ''
      )}
      <div className='submit-form col-12 justify-content-start mt-4'>
        <button
          className='level justify-content-end w-auto'
          onClick={() => this.props.changeLevel(1)}
        >
          مرحله بعد
          <ArrowBackIosIcon />
        </button>
      </div>
    </div>
  )
}
export default WorkshopStatus
