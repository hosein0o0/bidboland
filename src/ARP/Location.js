import React, { Component } from 'react'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import DatePicker from 'react-datepicker2'
import Clock from '../clock/clock'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import getCustomFormat from '../getCustomFormat'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import handleString from '../handleString'
export default class Location extends Component {
  constructor (props) {
    super(props)
    this.accident_hourOpen = null
    this.state = {}
  }
  componentDidMount () {
    // this.setState(this.props.state)
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  handleClickOutside = event => {
    const check =
      this.refs.accident_hourOpen &&
      !this.refs.accident_hourOpen.contains(event.target) &&
      this.accident_hourOpen
    if (check) {
      this.accident_hourOpen(false)
    }
  }
  handleConvert = date => {
    let result = ''
    const { disabledLocation, tabSelected } = this.props.state
    if (tabSelected !== 'technical') {
      if (date) {
        const check = typeof date === 'string'
        result = check ? date : getCustomFormat(date, false)
      }
    } else if (disabledLocation) {
      result = date
    }
    return result
  }
  handleShow = () => {
    const { tabSelected, loading, disabled } = this.props.state
    let array = []
    const CheckSign = this.props.state[`Show5_${tabSelected}`]
    if (!CheckSign) {
      array.push(
        <div className='submit-form col-12'>
          <button
            onClick={() =>
              this.props.MainFn ? this.props.MainFn.handleSign3() : ''
            }
            disabled={disabled || this.handleDisabled() || CheckSign}
          >
            {loading === `sing3-${tabSelected}` ? (
              <Loading className='form-loader' />
            ) : (
              <DoneIcon />
            )}
            ثبت اطلاعات
          </button>
        </div>
      )
    }
    return array
  }
  handleDisabled = () => {
    const checkTime = this.props.handleTimeOut()
      ? !this.props.handleContinue()
      : false
    const {
      tabSelected,
      disabledLocation,
      secretary_committee_allow
    } = this.props.state
    const checkDis =
      tabSelected !== 'technical' ||
      disabledLocation ||
      !secretary_committee_allow ||
      checkTime
    return checkDis
  }
  render () {
    const {
      meeting_place,
      meeting_date,
      foucs,
      meeting_hour
    } = this.props.state
    return (
      <React.Fragment>
        <div className='col-12'>
          <div className='title-password w-100 mt-4 mb-2'>
            <h2 className='IranSans_Bold'>
              مکان و زمان برگزاری جلسه بررسی حادثه
            </h2>
            <div className='line'></div>
          </div>
        </div>
        <div className='row mx-0 w-100'>
          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
            <div
              className={`field-form textarea persian ${
                this.props.handlecheckValue('meeting_place') ? 'active' : ''
              }`}
            >
              <div className='col p-0'>
                <label className='textarea'>
                  مکان جلسه
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <textarea
                  className='w-100'
                  type='text'
                  name={`meeting_place`}
                  value={handleString(meeting_place)}
                  onChange={e =>
                    this.props.handleState({ meeting_place: handleString(e.target.value) })
                  }
                  onFocus={e =>
                    this.props.handleState({ foucs: e.target.name })
                  }
                  onBlur={() => this.props.handleState({ foucs: '' })}
                  readOnly={this.handleDisabled()}
                  disabled={this.handleDisabled()}
                ></textarea>
              </div>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                meeting_date || foucs === 'meeting_date' ? 'active' : ''
              }`}
            >
              <div className='icon-field'>
                <DateRangeRoundedIcon />
              </div>
              <div className='col p-0'>
                <label>
                  تاریخ جلسه
                  <span className='star IranSans_Bold'>*</span>
                </label>
                {this.handleDisabled() ? (
                  <input
                    className='IranSans_Medium_FA'
                    value={handleString(this.handleConvert(meeting_date))}
                    readOnly={true}
                    disabled={true}
                    name='meeting_date'
                  />
                ) : (
                  <DatePicker
                    persianDigits={true}
                    isGregorian={false}
                    timePicker={false}
                    onChange={meeting_date =>
                      this.props.handleState({ meeting_date })
                    }
                    value={meeting_date}
                  />
                )}
              </div>
            </div>
          </div>

          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form clock persian ${
                this.props.handlecheckValue('meeting_hour') ? 'active' : ''
              }`}
              ref='accident_hourOpen'
            >
              <div className='icon-field'>
                <QueryBuilderIcon />
              </div>
              <div className='col p-0 ltr IranSans_Medium_FA'>
                <label>
                  ساعت جلسه
                  <span className='star IranSans_Bold'>*</span>
                </label>
                {this.handleDisabled() ? (
                  <input
                    value={handleString(meeting_hour)}
                    readOnly={true}
                    disabled={true}
                    name='meeting_hour'
                  />
                ) : (
                  <Clock
                    getTime={(name, time) => {
                      setTimeout(() => {
                        this.props.handleState({ [name]: time })
                      }, 200)
                    }}
                    name='meeting_hour'
                    value={meeting_hour}
                    getFocus={e => (this.accident_hourOpen = e)}
                  />
                )}
              </div>
            </div>
          </div>
          {this.handleShow()}
        </div>
      </React.Fragment>
    )
  }
}
