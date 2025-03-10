import React, { Component } from 'react'
import Menu from '../layout/menu'
import Sidebar from '../layout/sidebar'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import DatePicker from 'react-datepicker2'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import VisibilityIcon from '@material-ui/icons/VisibilityRounded'
import DateRangeIcon from '@material-ui/icons/DateRange'
import moment from 'moment-jalaali'
import ProgressbarTime from './ProgressbarTime'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
export default class Entermetting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      token: Cookies.get('token'),
      foucs: '',
      subjectMeeting: '',
      redirect: false,
      date: undefined,
      keywords: [],
      attendees: [],
      meetingOrders: [],
      signatories: [],
      wbsSelected: '',
      attendeesSelected: [],
      approvedBy: {
        first_name: 'علی',
        last_name: 'کیان'
      },
      disabled: false,
      sum: 0
    }
  }
  async componentDidMount () {
    document.title = `${StaticData.Title} - ورو به جلسه`
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    if (id) {
      await this.setState({ id: id })
      await setTimeout(async () => {
        await this.checkCookies()
      }, 500)
      await this.fetchData(id)
    }
  }
  checkCookies = () => {
    if (Cookies.get(`metting_${this.state.id}`)) {
      const detalMetting = JSON.parse(Cookies.get(`metting_${this.state.id}`))
      this.setState(detalMetting)
    }
  }
  fetchData = id => {
    if (this.state.token) {
      axios
        .get(`${StaticData.domainIp}/meeting/getDetailForComplete/${id}`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.setState(response.data.content)
            this.SumDuration()
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  SumDuration = () => {
    const sum = Object.keys(this.state.meetingOrders)
      .map(_ => {
        return parseInt(this.state.meetingOrders[_].duration)
      })
      .reduce((a, b) => a + b, 0)
    this.setState({
      sum: sum
    })
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChangeList = e => {
    let list = this.state.meetingOrders
    let key = parseInt(e.target.name.split('__')[1])
    let name = e.target.name.split('__')[0]
    let obj = list[key]
    obj[name] = handleString(e.target.value)
    this.setState({ meetingOrders: list })
    this.SaveInCookies()
  }
  SaveInCookies = () => {
    let state = JSON.stringify(this.state)
    Cookies.set(`metting_${this.state.id}`, state, { expires: 1 })
  }
  getDateList = (key, name, date) => {
    let list = this.state.meetingOrders
    let obj = list[key]
    obj[name] = this.getCustomFormat(date, false)
    this.setState({ meetingOrders: list })
    this.SaveInCookies()
  }
  handleCheck = e => {
    this.setState({
      [e.target.name]: e.target.checked
    })
    this.SaveInCookies()
  }
  Convertor = obj => {
    let data = []
    for (let value in obj) {
      data.push(obj[value])
    }
    return data
  }
  getCustomFormat (inputValue, isGregorian) {
    if (!inputValue) return ''
    const inputFormat = isGregorian ? 'YYYY/M/D' : 'jYYYY/jM/jD'
    return isGregorian
      ? inputValue.locale('es').format(inputFormat)
      : inputValue.locale('fa').format(inputFormat)
  }
  handleDate = date => {
    if (date === null) {
      return undefined
    } else {
      return moment(`${date}`, 'jYYYY/jM/jD')
    }
  }
  handleSubmit = async () => {
    let check = false,
      i = 0
    let attendees = [],
      signatories = [],
      meetingOrders = this.state.meetingOrders,
      meetings = {}
    while (i < meetingOrders.length) {
      check =
        meetingOrders[i].acting !== null &&
        meetingOrders[i].acting !== '' &&
        meetingOrders[i].acting_date !== null &&
        meetingOrders[i].acting_date !== ''
      i++
      if (!check) {
        break
      }
    }
    for (let value in this.state) {
      if (value.includes('attendees_')) {
        if (this.state[value]) {
          attendees.push(value.split('_')[1])
        }
      }
      if (value.includes('signatories_')) {
        if (this.state[value]) {
          signatories.push(value.split('_')[1])
        }
      }
    }
    if (check && attendees.length > 0 && signatories.length > 0) {
      this.setState({ loading: 'submit', disabled: true })
      meetings = Object.assign({}, meetingOrders)
      let datareg = new FormData()
      datareg.append('id', this.state.id)
      datareg.append('signatories', signatories.join(','))
      datareg.append('attendees', attendees.join(','))
      datareg.append('meetingOrders', JSON.stringify(meetings))
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/meeting/completeSecondPart/${this.state.id}`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            Cookies.remove(`metting_${this.state.id}`)
            Notification.notify(Message.text(906), 'success')
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
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      if (this.state.redirect) {
        return <Redirect to='/index-metting' />
      } else
        return (
          <div className='main'>
            <div className='col-12 p-0'>
              <div className='row m-0'>
                <Sidebar
                  handleState={(name, value) =>
                    this.setState({ [name]: value })
                  }
                />
                <div
                  className={`${
                    this.state._close
                      ? 'mainSideClose'
                      : 'col-xl-10 col-lg-10 p-0'
                  } dashboard`}
                >
                  <Menu nameRole='Home' nameUrl={this.props.nameUrl} />
                  <div className='w-100 row m-0 main-box-dashboard'>
                    <div className='boxes-dashboard row m-0 p-0'>
                      <div className='main-form row mr-0 ml-0'>
                        <div className='title-from'>
                          <h2>مدیریت جلسه و صورتجلسه نهایی</h2>
                        </div>
                        <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                          <div className='form row justify-content-start'>
                            <div className='title-password col-12'>
                              <h2 className='IranSans_Bold'>حاضرین جلسه</h2>
                              <div className='line'></div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12 row m-0'>
                              {this.state.attendees.map((data, key) => (
                                <div
                                  className='disiplin-checkbox col-xl-3 col-lg-3 col-md-4 col-6 w-auto mt-3 mb-3'
                                  key={key}
                                >
                                  <div className='checkbox m-0'>
                                    <input
                                      className='d-none'
                                      id={`attendees_${data.value}`}
                                      name={`attendees_${data.value}`}
                                      type='checkbox'
                                      onChange={e => this.handleCheck(e)}
                                      checked={
                                        this.state[`attendees_${data.value}`]
                                          ? true
                                          : false
                                      }
                                    />
                                    <label
                                      className='full'
                                      htmlFor={`attendees_${data.value}`}
                                    >
                                      {this.state[`attendees_${data.value}`] ? (
                                        <CheckBoxRoundedIcon />
                                      ) : (
                                        <CheckBoxOutlineBlankRoundedIcon />
                                      )}
                                      {data.label}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {this.state.meetingOrders.map((meeting, key1) => (
                              <div
                                className='w-100 row mr-0 ml-0 mt-2 mb-2'
                                key={key1}
                              >
                                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian textarea ${
                                      handleCheckText(meeting.description)
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <div className='col p-0'>
                                      <label className='textarea'>
                                        دستور جلسه
                                      </label>
                                      <textarea
                                        className='w-100'
                                        type='text'
                                        name='description'
                                        value={handleString(meeting.description)}
                                        readOnly={true}
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                  <div className={`field-form persian`}>
                                    <label>پیوست ها</label>
                                    <div className='pl-1 allName col row m-0 justify-content-end'>
                                      {this.Convertor(meeting.attachment).map(
                                        (link, ind) => (
                                          <a
                                            href={link}
                                            target='_blank'
                                            rel='noreferrer'
                                            key={ind}
                                          >
                                            <span>
                                              {`پیوست ${ind + 1}`}
                                              <VisibilityIcon className='ml-1' />
                                            </span>
                                          </a>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian ${
                                      meeting.responsible &&
                                      meeting.responsible !== ''
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <label>
                                      مطرح کننده
                                      <span className='star IranSans_Bold'>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      readOnly={true}
                                      value={meeting.responsible}
                                    />
                                  </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian field-clock ${
                                      handleCheckText(meeting.duration)
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <div className='icon-field'>
                                      <DateRangeIcon />
                                    </div>
                                    <div className='col p-0'>
                                      <label>
                                        زمان تقریبی
                                        <span className='star IranSans_Bold'>
                                          *
                                        </span>
                                      </label>
                                      <input
                                        readOnly={true}
                                        value={handleString(meeting.duration)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian textarea ${
                                      this.state.foucs ===
                                        `agreement_description__${key1}` ||
                                      handleCheckText(meeting.agreement_description)
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <div className='col p-0'>
                                      <label className='textarea'>
                                        شرح توافقات
                                      </label>
                                      <textarea
                                        className='w-100'
                                        type='text'
                                        name={`agreement_description__${key1}`}
                                        value={
                                          handleString(meeting.agreement_description)
                                        }
                                        onFocus={e =>
                                          this.OnFocus(e.target.name)
                                        }
                                        onBlur={this.OnBlur}
                                        onChange={this.handleChangeList}
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian ${
                                      this.state.foucs === `acting__${key1}` ||
                                      (meeting.acting && meeting.acting !== '')
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <label>
                                      اقدام کننده
                                      <span className='star IranSans_Bold'>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      readOnly={false}
                                      name={`acting__${key1}`}
                                      value={meeting.acting}
                                      onFocus={e => this.OnFocus(e.target.name)}
                                      onBlur={this.OnBlur}
                                      onChange={this.handleChangeList}
                                    />
                                  </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian field-clock ${
                                      this.state.foucs === `acting_date` ||
                                      (meeting.acting_date &&
                                        meeting.acting_date !== '')
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <div className='icon-field'>
                                      <DateRangeIcon />
                                    </div>
                                    <div className='col p-0'>
                                      <label>
                                        موعد انجام
                                        <span className='star IranSans_Bold'>
                                          *
                                        </span>
                                      </label>
                                      <DatePicker
                                        persianDigits={true}
                                        isGregorian={false}
                                        timePicker={false}
                                        onChange={date =>
                                          this.getDateList(
                                            key1,
                                            'acting_date',
                                            date
                                          )
                                        }
                                        value={this.handleDate(
                                          meeting.acting_date
                                        )}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='col-12'>
                                  <div className='line'>
                                    <hr />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <div className='title-password col-12'>
                              <h2 className='IranSans_Bold'>
                                حق امضا حاضرین جلسه
                              </h2>
                              <div className='line'></div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12 row m-0'>
                              {this.state.signatories.map((data1, index) => (
                                <div
                                  className='disiplin-checkbox col-xl-3 col-lg-3 col-md-4 col-6 w-auto mt-3 mb-3'
                                  key={index}
                                >
                                  <div className='checkbox m-0'>
                                    <input
                                      className='d-none'
                                      id={`signatories_${data1.value}`}
                                      name={`signatories_${data1.value}`}
                                      type='checkbox'
                                      onChange={e => this.handleCheck(e)}
                                      checked={
                                        this.state[`signatories_${data1.value}`]
                                          ? true
                                          : false
                                      }
                                    />
                                    <label
                                      className='full'
                                      htmlFor={`signatories_${data1.value}`}
                                    >
                                      {this.state[
                                        `signatories_${data1.value}`
                                      ] ? (
                                        <CheckBoxRoundedIcon />
                                      ) : (
                                        <CheckBoxOutlineBlankRoundedIcon />
                                      )}
                                      {data1.label}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>

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
                                اتمام جلسه
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='col-4 justify-content-center d-flex'>
                          <ProgressbarTime
                            sum={this.state.sum}
                            id={this.state.id}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }
}
