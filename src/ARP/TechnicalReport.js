import React, { Component } from 'react'
// import Sidebar from '../layout/sidebar'
// import Menu from '../layout/menu'
import StaticData from '../staticData'
import DatePicker from 'react-datepicker2'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
// import Clock from '../clock/clock'
// import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import Loading from '../layout/loading'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import DoneIcon from '@material-ui/icons/Done'
// import GetCustomFormat from '../getCustomFormat'
import moment from 'moment-jalaali'
import ListSign from './ListSign'
import SignARP from './SignARP'
// import EditIcon from '@material-ui/icons/Edit'
import CancelButton from '../layout/CancelButton'
import Permision from '../permision/permision'
import HeadTopFirst from './HeadTopFirst'
// import CreatableSelect from 'react-select/creatable'
import HanldeToCC from './HanldeToCC'
import handleCheckText from '../handleCheckText'
import getCustomFormat from '../getCustomFormat'
import ConvertNumber from '../ConvertNumber'
import handleString from '../handleString'
export default class TechnicalReport extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.accident_hourOpen = null
    // this.getCustomFormat = GetCustomFormat.getCustomFormat
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      role: null,
      redirect: false,
      listSign: [],
      area: '',
      unit: '',
      event_type: '',
      tag_number: '',
      event_date: moment(),
      event_hour: '',
      unit_conditions: '',
      event_explain: '',
      event_analyze: '',
      event_possibility_reported_before: false,
      event_in_last_six_months: '',
      event_in_last_six_months_date: undefined,
      has_trend: false,
      trend_link: [],
      trend_linkName: [],
      has_log_sheets: false,
      log_sheets_link: [],
      log_sheets_linkName: [],
      unit_boss: null,
      unit_supervisor: null,
      office_boss: null,
      notification_to: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - گزارش فنی حوادث مجتمع`
    if (Cookies.get('userDetail')) {
      this.setState({ userDetail: JSON.parse(Cookies.get('userDetail')) })
    }
    if (this.props.notDisabled) {
      this.fetchData()
    } else {
      this.ShowFetch()
    }
    // document.addEventListener('mousedown', this.handleClickOutside)
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      if (this.props.notDisabled) {
        this.fetchData()
      } else {
        this.ShowFetch()
      }
    }
  }
  // componentWillUnmount () {
  //   // document.removeEventListener('mousedown', this.handleClickOutside)
  // }
  ShowFetch = async () => {
    const { state, canUpdate, notDisabled } = this.props
    const checkDis = !canUpdate || !notDisabled
    for (let value in state) {
      const boolean =
        value === 'event_possibility_reported_before' ||
        value === 'has_log_sheets' ||
        value === 'event_in_last_six_months' ||
        value === 'has_trend'
      const _checkLink = value === 'log_sheets_link' || value === 'trend_link'
      const checkSign =
        value === 'unit_boss' ||
        value === 'office_boss' ||
        value === 'unit_supervisor'
      const checkDate =
        value === 'event_in_last_six_months_date' || value === 'event_date'
      if (checkSign) {
        let _data = state[value]
        let filter = state.user_list.filter(user => user.value === _data)
        state[value] = filter[0]
      } else if (boolean) {
        state[value] = state[value] === '1' || state[value] === true
      } else if (_checkLink) {
        let _data = state[value]
        if (_data) {
          state[`${value}Name`] = _data
          state[value] = _data
        }
      } else if (value === 'event_type') {
        let _data = state[value]
        const checkOther =
          _data !== 'انسانی' &&
          _data !== 'خسارت به تجهیزات' &&
          _data !== 'Total S/D' &&
          _data !== 'زیست محیطی' &&
          _data !== 'نشتی مواد' &&
          _data !== 'آتش سوزی'
        if (checkOther) {
          if (!state['other_event_type']) {
            state[value] = 'other'
            state['other_event_type'] = _data
          }
        }
      } else if (checkDate) {
        if (state[value]) {
          if (typeof state[value] === 'string') {
            if (checkDis) {
              let _date = ConvertNumber(state[value])
              const resultDate = moment(_date, 'jYYYY/jMM/jDD')
              state[value] = resultDate
            }
          }
        } else state[value] = null
      }
    }
    state['canCreate'] = await this.Permision.handlePermision(
      state.role,
      'arp_create'
    )
    let ListMandatory = await ListSign.ListMandatory.arp1
    let listSign = await this.state.listSign
    await ListMandatory.forEach(li => {
      listSign = [...listSign, li]
    })
    listSign = await [...new Set(listSign)]
    state['listSign'] = await listSign
    await this.setState(state)
  }
  fetchData = () => {
    if (this.state.token) {
      axios
        .get(`${StaticData.domainIp}/arp/getFirstDetail`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(async response => {
          if (response.status === 200) {
            let state = await response.data.content
            state['role'] = await response.data.role
            state['canCreate'] = await this.Permision.handlePermision(
              response.data.role,
              'arp_create'
            )
            let ListMandatory = await ListSign.ListMandatory.arp1
            let listSign = await this.state.listSign
            await ListMandatory.forEach(li => {
              listSign = [...listSign, li]
            })
            listSign = await [...new Set(listSign)]
            state['listSign'] = await listSign
            this.setState(state)
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
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: handleString(e.target.value) })
  }
  handleUpload = (e, files, names) => {
    e.preventDefault()
    this.setState({ loading: files })
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[i])
      this.GetLink(files, e.target.files[i], names, e.target.files.length, i)
    }
  }
  GetLink = (nameState, file, names, length, i) => {
    let datareg = new FormData()
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/DocumentCenter/ProcessDocument/Arp/${this.state.id}`,
      data: datareg,
      headers: {
        Authorization: this.state.token ? `Bearer ${this.state.token}` : null
      }
    })
      .then(async response => {
        if (i + 1 === length) {
          this.setState({ loading: '' })
        }
        if (response.status === 200) {
          await this.setState({
            [names]: [...this.state[names], file.name],
            [nameState]: [...this.state[nameState], response.data.content]
          })
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        this.setState({ loading: '' })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  deleteFile = (num, files, names) => {
    let data = this.state[`${files}`],
      data2 = this.state[`${names}`]
    data.splice(num, 1)
    data2.splice(num, 1)
    this.setState({ [files]: data, [names]: data2 })
  }
  handleSubmit = async () => {
    // if (licens) {
    const {
      area,
      unit,
      event_type,
      tag_number,
      event_date,
      event_hour,
      unit_conditions,
      event_explain,
      event_analyze,
      event_possibility_reported_before,
      event_in_last_six_months,
      event_in_last_six_months_date,
      has_trend,
      trend_link,
      has_log_sheets,
      log_sheets_link,
      unit_boss,
      unit_supervisor,
      office_boss,
      notification_to,
      token,
      other_event_type,
      subject
    } = await this.state
    let ListUserId = await Object.keys(notification_to).map(_itm => {
      return notification_to[_itm].value
    })
    const check1 = (await event_in_last_six_months)
      ? event_in_last_six_months_date !== undefined
      : true
    const check2 = (await has_trend) ? trend_link.length > 0 : true
    const check3 = (await has_log_sheets) ? log_sheets_link.length > 0 : true
    const check4 =
      handleCheckText(event_type) && event_type === 'other'
        ? handleCheckText(other_event_type)
        : handleCheckText(event_type)
    const _check =
      handleCheckText(area) &&
      handleCheckText(unit) &&
      handleCheckText(event_type) &&
      handleCheckText(tag_number) &&
      event_date &&
      handleCheckText(event_hour) &&
      handleCheckText(unit_conditions) &&
      handleCheckText(event_explain) &&
      handleCheckText(event_analyze) &&
      handleCheckText(subject) &&
      check1 &&
      check2 &&
      check3 &&
      unit_boss !== null &&
      unit_supervisor !== null &&
      office_boss !== null &&
      check4
    if (_check) {
      const _trend_link = Object.assign({}, trend_link)
      const _log_sheets_link = Object.assign({}, log_sheets_link)
      await this.setState({ loading: 'submit', disabled: true })
      const datareg = await new FormData()
      await datareg.append('area', area)
      await datareg.append('unit', unit)
      await datareg.append(
        'event_type',
        event_type === 'other' ? other_event_type : event_type
      )
      await datareg.append('tag_number', tag_number)
      await datareg.append('event_date', getCustomFormat(event_date, false))
      await datareg.append('event_hour', event_hour)
      await datareg.append('unit_conditions', unit_conditions)
      await datareg.append('event_explain', event_explain)
      await datareg.append('event_analyze', event_analyze)
      await datareg.append('subject', subject)
      await datareg.append(
        'event_possibility_reported_before',
        event_possibility_reported_before
      )
      await datareg.append(
        'event_in_last_six_months',
        event_in_last_six_months ? true : false
      )
      await datareg.append(
        'event_in_last_six_months_date',
        event_in_last_six_months
          ? getCustomFormat(event_in_last_six_months_date, false)
          : ''
      )
      await datareg.append('has_trend', has_trend ? true : false)
      await datareg.append(
        'trend_link',
        has_trend ? JSON.stringify(_trend_link) : ''
      )
      await datareg.append('has_log_sheets', has_log_sheets ? true : false)
      await datareg.append(
        'log_sheets_link',
        has_log_sheets ? JSON.stringify(_log_sheets_link) : ''
      )
      await datareg.append('unit_boss', unit_boss.value)
      await datareg.append('unit_supervisor', unit_supervisor.value)
      await datareg.append('office_boss', office_boss.value)
      await datareg.append(
        'notification_to',
        ListUserId.length > 0 ? ListUserId.join(',') : null
      )
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/arp/insert`,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              await this.setState({ redirect: true, disabled: false })
              // window.location.reload(true)
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
    // }
  }
  handleEdit = async () => {
    const {
      area,
      unit,
      event_type,
      tag_number,
      event_date,
      event_hour,
      unit_conditions,
      event_explain,
      event_analyze,
      event_possibility_reported_before,
      event_in_last_six_months,
      event_in_last_six_months_date,
      has_trend,
      trend_link,
      has_log_sheets,
      log_sheets_link,
      // unit_boss,
      // unit_supervisor,
      // office_boss,
      // notification_to,
      token,
      other_event_type,
      subject,
      id
    } = await this.state
    // let ListUserId = await Object.keys(notification_to).map(_itm => {
    //   return notification_to[_itm].value
    // })
    const check1 = (await event_in_last_six_months)
      ? event_in_last_six_months_date !== undefined
      : true
    const check2 = (await has_trend) ? trend_link.length > 0 : true
    const check3 = (await has_log_sheets) ? log_sheets_link.length > 0 : true
    const check4 =
      handleCheckText(event_type) && event_type === 'other'
        ? handleCheckText(other_event_type)
        : handleCheckText(event_type)
    const _check =
      handleCheckText(area) &&
      handleCheckText(unit) &&
      handleCheckText(event_type) &&
      handleCheckText(tag_number) &&
      event_date &&
      handleCheckText(event_hour) &&
      handleCheckText(unit_conditions) &&
      handleCheckText(event_explain) &&
      handleCheckText(event_analyze) &&
      handleCheckText(subject) &&
      check1 &&
      check2 &&
      check3 &&
      // unit_boss !== null &&
      // unit_boss !== undefined &&
      // unit_supervisor !== null &&
      // unit_supervisor !== undefined &&
      // office_boss !== null &&
      // office_boss !== undefined &&
      check4
    if (_check) {
      const _trend_link = Object.assign({}, trend_link)
      const _log_sheets_link = Object.assign({}, log_sheets_link)
      await this.setState({ loading: 'submit', disabled: true })
      const datareg = await new FormData()
      await datareg.append('area', area)
      await datareg.append('unit', unit)
      await datareg.append(
        'event_type',
        event_type === 'other' ? other_event_type : event_type
      )
      await datareg.append('tag_number', tag_number)
      await datareg.append('event_date', getCustomFormat(event_date, false))
      await datareg.append('event_hour', ConvertNumber(event_hour))
      await datareg.append('unit_conditions', unit_conditions)
      await datareg.append('event_explain', event_explain)
      await datareg.append('subject', subject)
      await datareg.append('event_analyze', event_analyze)
      await datareg.append(
        'event_possibility_reported_before',
        event_possibility_reported_before
      )
      await datareg.append(
        'event_in_last_six_months',
        event_in_last_six_months ? true : false
      )
      await datareg.append(
        'event_in_last_six_months_date',
        event_in_last_six_months
          ? getCustomFormat(event_in_last_six_months_date, false)
          : ''
      )
      await datareg.append('has_trend', has_trend ? true : false)
      await datareg.append(
        'trend_link',
        has_trend ? JSON.stringify(_trend_link) : ''
      )
      await datareg.append('has_log_sheets', has_log_sheets ? true : false)
      await datareg.append(
        'log_sheets_link',
        has_log_sheets ? JSON.stringify(_log_sheets_link) : ''
      )
      // await datareg.append(
      //   'unit_boss',
      //   unit_boss ? unit_boss.value : ''
      // )
      // await datareg.append(
      //   'unit_supervisor',
      //   unit_supervisor ? unit_supervisor.value : ''
      // )
      // await datareg.append('office_boss', office_boss.value)
      // await datareg.append(
      //   'notification_to',
      //   ListUserId.length > 0 ? ListUserId.join(',') : null
      // )
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/arp/updateArp1/${id}`,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              await this.setState({ redirect: false, disabled: false })
              window.location.reload(true)
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
  handleDisabled = () => {
    if (this.props.notDisabled) {
      return false
    } else if (this.props.canUpdate) {
      return false
    } else return true
  }
  handleShowButtonSubmit = () => {
    const { canCreate, disabled, loading } = this.state
    if (!this.props.show && canCreate) {
      return (
        <div className='submit-form col-12'>
          <button
            className='mt-3'
            onClick={this.handleSubmit}
            disabled={disabled}
          >
            {loading === 'submit' ? (
              <Loading className='form-loader' />
            ) : (
              <DoneIcon />
            )}
            ثبت اطلاعات
          </button>
          <CancelButton redirect='index-ARP' />
        </div>
      )
    } else if (this.props.show) {
      return (
        <SignARP
          {...this}
          handleState={(name, value) => this.setState({ [name]: value })}
          permision='arp_signs'
        />
      )
    }
  }
  handleState = obj => {
    this.setState(obj)
  }
  render () {
    const {
      canCreate,
      token,
      redirect,
      foucs,
      event_explain,
      event_analyze,
      event_possibility_reported_before,
      event_in_last_six_months,
      event_in_last_six_months_date,
      has_trend,
      trend_link,
      loading,
      has_log_sheets,
      log_sheets_linkName,
      trend_linkName,
      log_sheets_link,
      disabled,
      id
    } = this.state
    const { canUpdate, show, notDisabled, handleDateWithoutTime } = this.props
    const ShowToCC = !canUpdate && !show && canCreate
    if (!token) {
      return <Redirect to='/Login' />
    } else if (redirect) {
      return <Redirect to='/index-ARP' />
    } else {
      return (
        <div className='form row justify-content-start'>
          <HeadTopFirst
            {...this}
            disabled={this.handleDisabled()}
            insertData={notDisabled}
            subject={true}
          />
          <div className='w-100'>
            <div className='title-password col-12 mt-3 mb-2'>
              <h2 className='IranSans_Bold'>مقدمه و شرح حادثه</h2>
              <div className='line'></div>
            </div>
            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
              <div
                className={`field-form persian textarea ${
                  foucs === `event_explain` || handleCheckText(event_explain)
                    ? 'active'
                    : ''
                }`}
              >
                <div className='col p-0'>
                  <label className='long-label textarea'>
                    چگونگی وقوع حادثه، ساعت شروع و فرآیند گسترش، تجهیزات درگیر،
                    خسارت‌های ایجاد شده، اقدامات فوری به منظور کنترل حادثه و ...
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <textarea
                    className='w-100 pt-3'
                    type='text'
                    name={`event_explain`}
                    onFocus={e => this.OnFocus(e.target.name)}
                    onBlur={this.OnBlur}
                    onChange={this.handleChange}
                    value={handleString(event_explain)}
                    readOnly={this.handleDisabled()}
                    disabled={this.handleDisabled()}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className='title-password col-12 mt-3 mb-2'>
            <h2 className='IranSans_Bold'>تجزیه و تحلیل حادثه</h2>
            <div className='line'></div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
            <div
              className={`field-form persian textarea ${
                foucs === `event_analyze` || handleCheckText(event_analyze)
                  ? 'active'
                  : ''
              }`}
            >
              <div className='col p-0'>
                <label className='long-label textarea'>
                  چه عللی (علل مستقیم، غیر مستقیم، ریشه‌ای و ...) باعث ایجاد
                  حادثه شده است؟ اقدام کنترلی برای جلوگیری از حادثه وجود داشته
                  است؟ دلیل عدم تاثیر اقدامات کنترلی؟
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <textarea
                  className='w-100 pt-3'
                  type='text'
                  name={`event_analyze`}
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                  value={handleString(event_analyze)}
                  readOnly={this.handleDisabled()}
                  disabled={this.handleDisabled()}
                ></textarea>
              </div>
            </div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-12 d-flex align-items-center'>
            <div className='field-radio w-100'>
              <label>
                آیا احتمال وقوع حادثه قبلا گزارش شده است؟
                <span className='star IranSans_Bold'>*</span>
              </label>
              <div className='main-radio pr-0'>
                <div className='radio-button'>
                  {this.handleDisabled() ? (
                    ''
                  ) : (
                    <input
                      className='d-none'
                      type='radio'
                      id='event_possibility_reported_beforeYES'
                      onClick={() =>
                        this.setState({
                          event_possibility_reported_before: true
                        })
                      }
                    />
                  )}
                  <label htmlFor='event_possibility_reported_beforeYES'>
                    {event_possibility_reported_before ? (
                      <RadioButtonCheckedIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                    بله
                  </label>
                </div>
                <div className='radio-button'>
                  {this.handleDisabled() ? (
                    ''
                  ) : (
                    <input
                      className='d-none'
                      type='radio'
                      id='event_possibility_reported_beforeNO'
                      onClick={() =>
                        this.setState({
                          event_possibility_reported_before: false
                        })
                      }
                    />
                  )}
                  <label htmlFor='event_possibility_reported_beforeNO'>
                    {!event_possibility_reported_before ? (
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
          <div className='col-xl-12 col-lg-12 col-md-12 col-12 d-flex align-items-center'>
            <div className='field-radio w-100'>
              <label>
                آیا برای دستگاه مذکور طی شش ماه گذشته حادثه مشابهی رخ داده است؟
                <span className='star IranSans_Bold'>*</span>
              </label>
              <div className='main-radio pr-0'>
                <div className='radio-button'>
                  {this.handleDisabled() ? (
                    ''
                  ) : (
                    <input
                      className='d-none'
                      type='radio'
                      id='event_in_last_six_monthsYES'
                      onClick={() =>
                        this.setState({
                          event_in_last_six_months: true,
                          event_in_last_six_months_date: undefined
                        })
                      }
                    />
                  )}
                  <label htmlFor='event_in_last_six_monthsYES'>
                    {event_in_last_six_months ? (
                      <RadioButtonCheckedIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                    بله
                  </label>
                </div>
                <div className='radio-button'>
                  {this.handleDisabled() ? (
                    ''
                  ) : (
                    <input
                      className='d-none'
                      type='radio'
                      id='event_in_last_six_monthsNO'
                      onClick={() =>
                        this.setState({
                          event_in_last_six_months: false,
                          event_in_last_six_months_date: undefined
                        })
                      }
                    />
                  )}
                  <label htmlFor='event_in_last_six_monthsNO'>
                    {!event_in_last_six_months ? (
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
          {event_in_last_six_months && (
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  event_in_last_six_months_date ? 'active' : ''
                }`}
              >
                <div className='icon-field'>
                  <DateRangeRoundedIcon />
                </div>
                <div className='col p-0'>
                  <label>
                    تاریخ حادثه
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  {this.handleDisabled() ? (
                    <input
                      value={handleDateWithoutTime(
                        event_in_last_six_months_date
                      )}
                      disabled={true}
                      readOnly={true}
                    />
                  ) : (
                    <DatePicker
                      persianDigits={true}
                      isGregorian={false}
                      timePicker={false}
                      onChange={event_in_last_six_months_date =>
                        this.setState({ event_in_last_six_months_date })
                      }
                      value={event_in_last_six_months_date}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          <div className='w-100'>
            <div className='col-xl-12 col-lg-12 col-md-12 col-12 d-flex align-items-center'>
              <div className='field-radio w-100'>
                <label>
                  آیا Trend پارامتری که نشان دهنده نحوه کارکرد دستگاه مذکور باشد
                  وجود دارد؟
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <div className='main-radio pr-0'>
                  <div className='radio-button'>
                    {this.handleDisabled() ? (
                      ''
                    ) : (
                      <input
                        className='d-none'
                        type='radio'
                        id='has_trendYES'
                        onClick={() =>
                          this.setState({
                            has_trend: true,
                            trend_linkName: [],
                            trend_link: []
                          })
                        }
                      />
                    )}
                    <label htmlFor='has_trendYES'>
                      {has_trend ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      بله
                    </label>
                  </div>
                  <div className='radio-button'>
                    <input
                      className='d-none'
                      type='radio'
                      id='has_trendNO'
                      onClick={() =>
                        this.setState({
                          has_trend: false,
                          trend_linkName: [],
                          trend_link: []
                        })
                      }
                    />
                    <label htmlFor='has_trendNO'>
                      {!has_trend ? (
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
            {has_trend && (
              <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                <div className={`field-form persian`}>
                  <label>پیوست فایل Trend</label>
                  <div
                    className={`allName col row m-0 justify-content-end ${
                      this.handleDisabled() ? 'pl-2' : ''
                    }`}
                  >
                    {trend_linkName.map((name, key) => (
                      <span key={key}>
                        {this.handleDisabled() ? (
                          ''
                        ) : (
                          <CloseRoundedIcon
                            onClick={() =>
                              this.deleteFile(
                                key,
                                'trend_link',
                                'trend_linkName'
                              )
                            }
                          />
                        )}
                        <a
                          href={trend_link[key] ? trend_link[key] : '#/'}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {name}
                        </a>
                      </span>
                    ))}
                  </div>
                  {this.handleDisabled() ? (
                    ''
                  ) : (
                    <React.Fragment>
                      <input
                        className='d-none'
                        type='file'
                        id='has_trend-Picture'
                        multiple
                        onChange={e =>
                          this.handleUpload(e, 'trend_link', 'trend_linkName')
                        }
                      />
                      <label
                        className='upload-label'
                        htmlFor='has_trend-Picture'
                      >
                        {loading === 'trend_link' ? (
                          <Loading className='form-loader w-auto' />
                        ) : (
                          <AttachFileIcon />
                        )}
                        آپلود فایل
                      </label>
                    </React.Fragment>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className='w-100'>
            <div className='col-xl-12 col-lg-12 col-md-12 col-12 d-flex align-items-center'>
              <div className='field-radio w-100'>
                <label>
                  آیا برای دستگاه مذکور Log Sheet تکمیل می‌گردد؟
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <div className='main-radio pr-0'>
                  <div className='radio-button'>
                    {this.handleDisabled() ? (
                      ''
                    ) : (
                      <input
                        className='d-none'
                        type='radio'
                        id='has_log_sheetsYES'
                        onClick={() =>
                          this.setState({
                            has_log_sheets: true,
                            log_sheets_link: [],
                            log_sheets_linkName: []
                          })
                        }
                      />
                    )}
                    <label htmlFor='has_log_sheetsYES'>
                      {has_log_sheets ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      بله
                    </label>
                  </div>
                  <div className='radio-button'>
                    {this.handleDisabled() ? (
                      ''
                    ) : (
                      <input
                        className='d-none'
                        type='radio'
                        id='has_log_sheetsNO'
                        onClick={() =>
                          this.setState({
                            has_log_sheets: false,
                            log_sheets_link: [],
                            log_sheets_linkName: []
                          })
                        }
                      />
                    )}
                    <label htmlFor='has_log_sheetsNO'>
                      {!has_log_sheets ? (
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
            {has_log_sheets && (
              <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                <div className={`field-form persian`}>
                  <label>پیوست Log Sheet</label>
                  <div
                    className={`allName col row m-0 justify-content-end ${
                      this.handleDisabled() ? 'pl-2' : ''
                    }`}
                  >
                    {log_sheets_linkName.map((name, key) => (
                      <span key={key}>
                        {this.handleDisabled() ? (
                          ''
                        ) : (
                          <CloseRoundedIcon
                            onClick={() =>
                              this.deleteFile(
                                key,
                                'log_sheets_link',
                                'log_sheets_linkName'
                              )
                            }
                          />
                        )}
                        <a
                          href={
                            log_sheets_link[key] ? log_sheets_link[key] : '#/'
                          }
                          target='_blank'
                          rel='noreferrer'
                        >
                          {name}
                        </a>
                      </span>
                    ))}
                  </div>
                  {this.handleDisabled() ? (
                    ''
                  ) : (
                    <React.Fragment>
                      <input
                        className='d-none'
                        type='file'
                        id='has_log_sheets-upload'
                        multiple
                        onChange={e =>
                          this.handleUpload(
                            e,
                            'log_sheets_link',
                            'log_sheets_linkName'
                          )
                        }
                      />
                      <label
                        className='upload-label'
                        htmlFor='has_log_sheets-upload'
                      >
                        {loading === 'log_sheets_link' ? (
                          <Loading className='form-loader w-auto' />
                        ) : (
                          <AttachFileIcon />
                        )}
                        آپلود فایل
                      </label>
                    </React.Fragment>
                  )}
                </div>
              </div>
            )}
          </div>
          {ShowToCC ? <HanldeToCC {...this} /> : ''}
          {this.handleShowButtonSubmit()}
          {canUpdate ? (
            <div className='submit-form col-12 mt-3'>
              <button
                className='edit'
                onClick={this.handleEdit}
                disabled={disabled}
              >
                {loading === 'submit' ? (
                  <Loading className='form-loader' />
                ) : (
                  <DoneIcon />
                )}
                ویرایش اطلاعات
              </button>
              <CancelButton redirect={`arp-${id}`} />
            </div>
          ) : (
            ''
          )}
        </div>
      )
    }
  }
}
