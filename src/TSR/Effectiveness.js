import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
// import Sidebar from '../layout/sidebar'
// import Menu from '../layout/menu'
import StaticData from '../staticData'
import DatePicker from 'react-datepicker2'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import ListSign from './ListSign'
import SignTSR from './SignTSR'
import Permision from '../permision/permision'
import getCustomFormat from '../getCustomFormat'
import moment from 'moment-jalaali'
import CancelButton from '../layout/CancelButton'
import Dispatch from './Dispatch'
import TOCC from './TOCC'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
export default class Effectiveness extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.state = {
      token: Cookies.get('token'),
      tsr_no: '',
      created_at: '',
      subject: '',
      disabled: false,
      documentNumber: '',
      minutes_of_the_end_work: undefined,
      operation_start_date: undefined,
      effective: true,
      effective_kind: '',
      suggested_ways: '',
      description: '',
      newNumber: '',
      listSign: [],
      user_list: [],
      notification_to: [],
      notification_cc: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ارزیابی اثر بخشی`
    this.ShowFetch()
    this.props.GetShowFetch(12, this.ShowFetch)
  }
  async componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = await nextProps
      // await this.ShowFetch()
    }
  }
  ShowFetch = async () => {
    let tsr12 = await this.props.state.tsr12,
      obj = {}
    if (tsr12) {
      for (let value in tsr12) {
        let state
        if (value.includes('tsr12_')) {
          state = value.split('tsr12_')[1]
        } else {
          state = value
        }
        if (state === 'effective') {
          if (this.props.show || this.props.canUpdate) {
            obj[state] = tsr12[value] === '1'
          } else {
            obj[state] = true
          }
        } else if (
          state === 'operation_start_date' ||
          state === 'minutes_of_the_end_work'
        ) {
          if (this.props.canUpdate) {
            if (tsr12[value]) {
              obj[state] = moment(`${tsr12[value]}`, 'jYYYY/jM/jD')
            }
          } else {
            obj[state] = tsr12[value]
          }
        } else if (tsr12[value]) {
          obj[state] = tsr12[value]
        }
      }
      let ListMandatory = await ListSign.ListMandatory.tsr12
      let listSign = await this.state.listSign
      ListMandatory.forEach(li => {
        listSign = [...listSign, li]
      })
      listSign = await [...new Set(listSign)]
      obj['listSign'] = await listSign
      obj['role'] = await this.props.state.role
      obj['canCreate'] = await this.Permision.handlePermision(
        this.props.state.role,
        'tsr_create'
      )
      await this.setState(obj)
    }
  }
  OnFocus = name => {
    if (this.state.canCreate && !this.props.show) {
      this.setState({ foucs: name })
    }
  }
  OnBlur = () => {
    if (this.state.canCreate && !this.props.show) {
      this.setState({ foucs: '' })
    }
  }
  handleChange = e => {
    if (this.state.canCreate && !this.props.show) {
      this.setState({ [e.target.name]: e.target.value })
    }
  }
  handleSubmit = async () => {
    let {
      minutes_of_the_end_work,
      operation_start_date,
      effective,
      effective_kind,
      description,
      suggested_ways,
      notification_to,
      notification_cc,
      listSign
    } = this.state
    const CheckTo = notification_to
      ? notification_to.length === listSign.length && notification_to.length > 0
      : false
    const check = effective
      ? effective_kind && effective_kind.trim().length
      : true &&
        minutes_of_the_end_work !== undefined &&
        operation_start_date !== undefined &&
        CheckTo
    if (check) {
      minutes_of_the_end_work = await getCustomFormat(
        minutes_of_the_end_work,
        false
      )
      operation_start_date = await getCustomFormat(operation_start_date, false)
      let To = await Object.keys(notification_to).map(toData => {
        return notification_to[toData].value
      })
      notification_cc = notification_cc ? notification_cc : []
      let CC = await Object.keys(notification_cc).map(toData => {
        return notification_cc[toData].value
      })
      let datareg = await new FormData()
      await datareg.append('tsr_id', this.props.state.id)
      await datareg.append('minutes_of_the_end_work', minutes_of_the_end_work)
      await datareg.append('operation_start_date', operation_start_date)
      await datareg.append('effective', effective)
      await datareg.append('effective_kind', effective_kind)
      await datareg.append('description', description)
      await datareg.append('suggested_ways', suggested_ways)
      await datareg.append('notification_to', To.join(','))
      await datareg.append('notification_cc', CC.join(','))
      await this.setState({ loading: 'submit', disabled: true })
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/tsr/tsr12/insert`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              await this.setState({ redirect: true, disabled: false })
            }, 5000)
          } else {
            this.setState({ disabled: false })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({ loading: '', disabled: false })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  handleState = (name, value) => {
    this.setState({ [name]: value })
  }
  handleShowSubmit (checkExpert) {
    if (!checkExpert) {
      return (
        <React.Fragment>
          {this.props.state.can_do_action && !this.handleDisabled() ? (
            <React.Fragment>
              <TOCC {...this} />
              <Dispatch {...this} />
              <div className='submit-form col-12'>
                <button
                  onClick={this.handleSubmit}
                  disabled={this.state.disabled}
                >
                  {this.state.loading === 'submit' ? (
                    <Loading className='form-loader' />
                  ) : (
                    <DoneIcon />
                  )}
                  ثبت اطلاعات
                </button>
                <CancelButton redirect='index-TSR' />
              </div>
            </React.Fragment>
          ) : (
            <SignTSR
              {...this}
              handleState={(name, value) => this.setState({ [name]: value })}
              permision='tsr12_signs'
              disabled={this.handleDisabled()}
            />
          )}
        </React.Fragment>
      )
    } else return ''
  }
  handleDisabled = () => {
    if (this.props.close) {
      return true
    } else if (this.props.show) {
      return true
    } else if (this.state.canCreate) {
      return false
    } else if (this.props.canUpdate) {
      return false
    } else {
      return true
    }
  }
  render () {
    const checkExpert = !this.props.state.can_do_action && !this.props.show
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/index-TSR`,
            state: { select: 2 }
          }}
        />
      )
    } else
      return (
        <div className='form row justify-content-start'>
          {checkExpert && (
            <div className='col-12'>
              <div className='message-error'>
                <label className='strong my-2'>شما مسئول TSR نمی‌باشید</label>
              </div>
            </div>
          )}
          <React.Fragment>
            <div className='col-12'>
              <div className='box-note'>
                <p className='m-0'>
                  این صفحه توسط واحد متقاضی، یک ماه پس از صورتجلسه‌ی پایان کار،
                  تکمیل می‌گردد.
                </p>
              </div>
            </div>
            <div className='w-100 row justify-content-start m-0'>
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form persian ${
                    handleCheckText(this.state.tsr_no) ? 'active' : ''
                  }`}
                >
                  <label>
                    شماره TSR
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <input
                    type='text'
                    name='tsr_no'
                    value={handleString(this.state.tsr_no)}
                    readOnly={true}
                    disabled={true}
                  />
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form persian ${
                    handleCheckText(this.state.created_at) ? 'active' : ''
                  }`}
                >
                  <div className='icon-field'>
                    <DateRangeRoundedIcon />
                  </div>
                  <div className='col p-0'>
                    <label>
                      تاریخ
                      <span className='star IranSans_Bold'>*</span>
                    </label>
                    <input
                      type='text'
                      name='created_at'
                      value={handleString(this.state.created_at)}
                      readOnly={true}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form persian ${
                    this.state.subject ? 'active' : ''
                  }`}
                >
                  <label>
                    موضوع
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <input
                    type='text'
                    name='subject'
                    value={handleString(this.state.subject)}
                    readOnly={true}
                    disabled={true}
                  />
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form persian ${
                    this.state.minutes_of_the_end_work ? 'active' : ''
                  }`}
                >
                  <div className='icon-field'>
                    <DateRangeRoundedIcon />
                  </div>
                  <div className='col p-0'>
                    <label>
                      تاریخ صورتجلسه تائید پایان کار
                      <span className='star IranSans_Bold'>*</span>
                    </label>
                    {this.handleDisabled() ? (
                      <input
                        value={handleString(this.state.minutes_of_the_end_work)}
                        disabled={true}
                        readOnly={true}
                      />
                    ) : (
                      <DatePicker
                        persianDigits={true}
                        isGregorian={false}
                        timePicker={false}
                        onChange={minutes_of_the_end_work =>
                          this.setState({ minutes_of_the_end_work })
                        }
                        value={this.state.minutes_of_the_end_work}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form persian ${
                    this.state.operation_start_date ? 'active' : ''
                  }`}
                >
                  <div className='icon-field'>
                    <DateRangeRoundedIcon />
                  </div>
                  <div className='col p-0'>
                    <label>
                      تاریخ شروع بهره برداری
                      <span className='star IranSans_Bold'>*</span>
                    </label>
                    {this.handleDisabled() ? (
                      <input
                        readOnly={true}
                        disabled={true}
                        value={handleString(this.state.operation_start_date)}
                      />
                    ) : (
                      <DatePicker
                        persianDigits={true}
                        isGregorian={false}
                        timePicker={false}
                        onChange={operation_start_date =>
                          this.setState({ operation_start_date })
                        }
                        value={this.state.operation_start_date}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className='title-password col-12 mt-3 mb-2'>
                <h2 className='IranSans_Bold'>نتیجه بررسی</h2>
                <div className='line'></div>
              </div>
              <div className='col-xl-12 col-lg-12 col-md-12 col-12 d-flex align-items-center'>
                <div className='field-radio w-100'>
                  <label>
                    آیا TSR اثربخش بوده است؟
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <div className='main-radio pr-0'>
                    <div className='radio-button'>
                      {!this.handleDisabled() && (
                        <input
                          className='d-none'
                          type='radio'
                          id='YES'
                          onClick={() => this.setState({ effective: true })}
                        />
                      )}
                      <label htmlFor='YES'>
                        {this.state.effective ? (
                          <RadioButtonCheckedIcon />
                        ) : (
                          <RadioButtonUncheckedIcon />
                        )}
                        بله
                      </label>
                    </div>
                    <div className='radio-button'>
                      {!this.handleDisabled() && (
                        <input
                          className='d-none'
                          type='radio'
                          id='NO'
                          onClick={() => this.setState({ effective: false })}
                        />
                      )}
                      <label htmlFor='NO'>
                        {!this.state.effective ? (
                          <RadioButtonCheckedIcon />
                        ) : (
                          <RadioButtonUncheckedIcon />
                        )}
                        خیر
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.effective ? (
                <React.Fragment>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                    <div
                      className={`field-form persian textarea ${
                        this.state.foucs === `effective_kind` ||
                        handleCheckText(this.state.effective_kind)
                          ? 'active'
                          : ''
                      }`}
                    >
                      <div className='col p-0'>
                        <label className='textarea'>
                          نوع اثر بخشی
                          <span className='star IranSans_Bold'>*</span>
                        </label>
                        <textarea
                          className='w-100'
                          type='text'
                          name={`effective_kind`}
                          onFocus={e => this.OnFocus(e.target.name)}
                          onBlur={this.OnBlur}
                          onChange={this.handleChange}
                          value={handleString(this.state.effective_kind)}
                          readOnly={this.handleDisabled()}
                          disabled={this.handleDisabled()}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                    <div
                      className={`field-form persian textarea ${
                        this.state.foucs === `description` ||
                        handleCheckText(this.state.description)
                          ? 'active'
                          : ''
                      }`}
                    >
                      <div className='col p-0'>
                        <label className='textarea'>توضیحات</label>
                        <textarea
                          className='w-100'
                          type='text'
                          name={`description`}
                          onFocus={e => this.OnFocus(e.target.name)}
                          onBlur={this.OnBlur}
                          onChange={this.handleChange}
                          value={handleString(this.state.description)}
                          readOnly={this.handleDisabled()}
                          disabled={this.handleDisabled()}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                ''
              )}
              {!this.state.effective ? (
                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                  <div
                    className={`field-form persian textarea ${
                      this.state.foucs === `suggested_ways` ||
                      handleCheckText(this.state.suggested_ways)
                        ? 'active'
                        : ''
                    }`}
                  >
                    <div className='col p-0'>
                      <label className='textarea'>راهکارهای پیشنهادی</label>
                      <textarea
                        className='w-100'
                        type='text'
                        name={`suggested_ways`}
                        onFocus={e => this.OnFocus(e.target.name)}
                        onBlur={this.OnBlur}
                        onChange={this.handleChange}
                        value={handleString(this.state.suggested_ways)}
                        readOnly={this.handleDisabled()}
                        disabled={this.handleDisabled()}
                      ></textarea>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
              {this.props.close ? '' : this.handleShowSubmit(checkExpert)}
            </div>
          </React.Fragment>
        </div>
      )
  }
}
