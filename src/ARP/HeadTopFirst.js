import React, { Component } from 'react'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import Clock from '../clock/clock'
// import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
// import { ConvertNumber } from '../ConvertNumber'
export default class HeadTopFirst extends Component {
  constructor(props) {
    super(props)
    this.event_hourOpen = null
    this.state = {}
  }
  componentDidMount() {
    this.setState(this.props.state)
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState(this.props.state)
    }
  }
  CheckData = async () => {
    const { insertData } = await this.props
    const { _event_date, _event_hour } = await this.state
    const check = _event_date === undefined && _event_hour === undefined
    if (insertData && check) {
      let now = await moment().format('jYYYY/jMM/jDD')
      let nowTime = await new Date()
      let hour = nowTime.getHours()
      let minute = nowTime.getMinutes()
      let Time = `${hour}:${minute}`
      let FinalTime = await `${now} ${Time}`
      await this.props.handleState({
        _event_date: now,
        _event_hour: Time
      })
      await this.setState({ _created_at: FinalTime })
    }
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  handleClickOutside = event => {
    const check =
      this.refs.event_hourOpen &&
      !this.refs.event_hourOpen.contains(event.target) &&
      this.event_hourOpen
    if (check) {
      this.event_hourOpen(false)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.setState(this.props.state)
      const { _event_date, _event_hour } = this.state
      const check = _event_date === undefined && _event_hour === undefined
      if (check) {
        this.CheckData()
      }
    }
  }
  handleDate = date => {
    if (date) {
      if (this.props.insertData) {
        return date
      } else {
        const currentDate = moment(date).format('jYYYY/jMM/jDD HH:MM')
        return currentDate
      }
    } else {
      return ''
    }
  }
  handleValue = () => {
    let data = ''
    const { insertData } = this.props
    if (insertData) {
      data = this.handleDate(this.state._created_at)
    } else {
      const { created_at_date, created_at_hour } = this.props.state
      let result = `${created_at_hour ? created_at_hour : ''} - ${created_at_date ? created_at_date : ''}`
      data = result
    }
    return data
  }
  handleValueDate = date => {
    let result = this.state[date]
    const check = result ? true : false
    let resultDate = null
    if (check) {
      if (typeof result === 'object') {
        resultDate = moment(result).format('jYYYY/jMM/jDD')
      } else resultDate = result
    }
    return check ? resultDate : ''
  }
  render() {
    return (
      <div className='w-100 row mx-0'>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${this.state.arp_no ? 'active' : ''
              }`}
          >
            <label>شماره APR</label>
            <input
              type='text'
              name='arp_no'
              value={handleString(this.state.arp_no)}
              disabled={true}
              readOnly={true}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${this.state[
              this.props.insertData ? '_created_at' : 'created_at_date'
            ]
              ? 'active'
              : ''
              }`}
          >
            <div className='icon-field'>
              <DateRangeRoundedIcon />
            </div>
            <div className='col p-0'>
              <label>تاریخ تکمیل فرم</label>
              <input
                className='IranSans_Medium_FA'
                value={handleString(this.handleValue())}
                disabled={true}
                readOnly={true}
              />
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${this.state.foucs === 'subject' || handleCheckText(this.state.subject) ? 'active' : ''
              }`}
          >
            <label>موضوع
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              type='text'
              name='subject'
              onChange={this.props.handleChange}
              value={handleString(this.state.subject)}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              disabled={this.props.disabled ? true : false}
              readOnly={this.props.disabled ? true : false}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${this.state.foucs === 'area' || handleCheckText(this.state.area) ? 'active' : ''
              }`}
          >
            <label>
              ناحیه
              <span className='star IranSans_Bold'>*</span>
            </label>
            <select
              name='area'
              value={handleString(this.state.area)}
              onChange={this.props.handleChange}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              readOnly={this.props.disabled}
              disabled={this.props.disabled}
            >
              <option className='d-none'></option>
              <option value={'Amine'}>Amine</option>
              <option value={'NF'}>NF</option>
              <option value={'UT'}>UT</option>
              <option value={'CP'}>CP</option>
              <option value={'Package C'}>Package C</option>
            </select>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${this.state.foucs === 'unit' || handleCheckText(this.state.unit) ? 'active' : ''
              }`}
          >
            <label>
              واحد
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              name='unit'
              value={handleString(this.state.unit)}
              onChange={this.props.handleChange}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              readOnly={this.props.disabled}
              disabled={this.props.disabled}
            />
          </div>
        </div>
        {!this.props.dontShow && (
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${this.state.foucs === 'event_type' || handleCheckText(this.state.event_type)
                ? 'active'
                : ''
                }`}
            >
              <label>
                نوع حادثه
                <span className='star IranSans_Bold'>*</span>
              </label>
              <select
                name='event_type'
                value={handleString(this.state.event_type)}
                onChange={this.props.handleChange}
                onFocus={e => this.props.OnFocus(e.target.name)}
                onBlur={this.props.OnBlur}
                readOnly={this.props.disabled}
                disabled={this.props.disabled}
              >
                <option className='d-none'></option>
                <option value={'انسانی'}>انسانی</option>
                <option value={'خسارت به تجهیزات'}>خسارت به تجهیزات</option>
                <option value={'Total S/D'}>Total S/D</option>
                <option value={'زیست محیطی'}>زیست محیطی</option>
                <option value={'نشتی مواد'}>نشتی مواد</option>
                <option value={'آتش سوزی'}>آتش سوزی</option>
                <option value={'other'}>سایر</option>
              </select>
            </div>
          </div>
        )}
        {this.state.event_type === 'other' && (
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${this.state.foucs === 'other_event_type' ||
                handleCheckText(this.state.other_event_type)
                ? 'active'
                : ''
                }`}
            >
              <label>
                نوع حادثه
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                name='other_event_type'
                value={handleString(this.state.other_event_type)}
                onChange={this.props.handleChange}
                onFocus={e => this.props.OnFocus(e.target.name)}
                onBlur={this.props.OnBlur}
                readOnly={this.props.disabled}
                disabled={this.props.disabled}
              />
            </div>
          </div>
        )}
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form ltr ${this.state.foucs === 'tag_number' || handleCheckText(this.state.tag_number)
              ? 'active'
              : ''
              }`}
          >
            <label>
              Tag No.
              <span className='star IranSans_Bold'>*</span>
            </label>
            <input
              className='text-left ltr'
              type='text'
              name='tag_number'
              value={handleString(this.state.tag_number)}
              onChange={this.props.handleChange}
              onFocus={e => this.props.OnFocus(e.target.name)}
              onBlur={this.props.OnBlur}
              readOnly={this.props.disabled}
              disabled={this.props.disabled}
            />
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form persian ${this.state.event_date ? 'active' : ''
              }`}
          >
            <div className='icon-field'>
              <DateRangeRoundedIcon />
            </div>
            <div className='col p-0'>
              <label className='IranSans_Medium_FA'>
                تاریخ حادثه
                <span className='star IranSans_Bold'>*</span>
              </label>
              {this.props.disabled ? (
                <input
                  className='IranSans_Medium_FA'
                  value={handleString(this.handleValueDate('event_date'))}
                  name='event_date'
                  readOnly={true}
                  disabled={true}
                />
              ) : (
                <DatePicker
                  min={moment().subtract(3, 'days')}
                  max={moment()}
                  persianDigits={true}
                  isGregorian={false}
                  timePicker={false}
                  onChange={event_date =>
                    this.props.handleState({ event_date: event_date })
                  }
                  value={this.state.event_date}
                />
              )}
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
          <div
            className={`field-form clock persian ${this.state.foucs === `event_hour` ||
              handleCheckText(this.state.event_hour)
              ? 'active'
              : ''
              }`}
            ref='event_hourOpen'
          >
            <div className='icon-field'>
              <QueryBuilderIcon />
            </div>
            <div className='col p-0 ltr'>
              <label>
                ساعت حادثه
                <span className='star IranSans_Bold'>*</span>
              </label>
              {this.props.disabled ? (
                <input
                  value={handleString(this.state.event_hour)}
                  readOnly={true}
                  disabled={true}
                  name='event_hour'
                />
              ) : (
                <Clock
                  getTime={(name, time) => {
                    // setTimeout(() => {
                    this.props.handleState({ [name]: time })
                    // }, 200)
                  }}
                  name='event_hour'
                  value={handleString(this.state.event_hour)}
                  getFocus={e => (this.event_hourOpen = e)}
                />
              )}
            </div>
          </div>
        </div>
        {!this.props.dontShow && (
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${this.state.foucs === 'unit_conditions' ||
                handleCheckText(this.state.unit_conditions)
                ? 'active'
                : ''
                }`}
            >
              <label>
                شرایط واحد در زمان حادثه
                <span className='star IranSans_Bold'>*</span>
              </label>
              <select
                name='unit_conditions'
                value={handleString(this.state.unit_conditions)}
                onChange={this.props.handleChange}
                onFocus={e => this.props.OnFocus(e.target.name)}
                onBlur={this.props.OnBlur}
                readOnly={this.props.disabled}
                disabled={this.props.disabled}
              >
                <option className='d-none'></option>
                <option value={'بهره برداری'}>بهره برداری</option>
                <option value={'تعمیرات'}>تعمیرات</option>
                <option value={'تعمیرات اساسی'}>تعمیرات اساسی</option>
                <option value={'Shut Down'}>Shut Down</option>
                <option value={'راه اندازی'}>راه اندازی</option>
              </select>
            </div>
          </div>
        )}
      </div>
    )
  }
}
