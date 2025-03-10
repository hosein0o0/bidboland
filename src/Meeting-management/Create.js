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
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import Clock from '../clock/clock'
import PeopleIcon from '@material-ui/icons/People'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import AddIcon from '@material-ui/icons/Add'
import CreatableSelect from 'react-select/creatable'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import DateRangeIcon from '@material-ui/icons/DateRange'
import moment from 'moment-jalaali'
import getCustomFormat from '../getCustomFormat'
import MaskedInput from '../maskInput/Masktedinput'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
export default class CreateMeeting extends Component {
  constructor (props) {
    super(props)
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.startHourOpen = null
    this.endHourOpen = null
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      startHour: '',
      endHour: '',
      subjectMeeting: '',
      redirect: false,
      date: undefined,
      keywords: [],
      keywordsSelected: [],
      wbs: [],
      wbsSelected: '',
      userDetail: {
        first_name: '',
        last_name: '',
        sign: ''
      },
      address: [],
      addressSelected: '',
      attendees: [],
      attendeesSelected: [],
      meetingType: [],
      meetingTypeSelected: '',
      leader: [],
      leaderSelected: '',
      meetingOrders: [
        {
          description: '',
          attachment: [],
          attachmentName: [],
          responsible: '',
          duration: ''
        }
      ],
      popUp: false,
      disabled: false,
      periodTime: '',
      linkAdress: '',
      sumTime: '',
      subjectSuggestion: [],
      yesteday: moment().subtract(1, 'day')
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ایجاد جلسه`
    this.fetchData()
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  handleClickOutside = event => {
    if (
      this.refs.startHourOpen &&
      !this.refs.startHourOpen.contains(event.target)
    ) {
      if (this.startHourOpen) {
        this.startHourOpen(false)
      }
    }
    if (
      this.refs.endHourOpen &&
      !this.refs.endHourOpen.contains(event.target)
    ) {
      if (this.endHourOpen) {
        this.endHourOpen(false)
      }
    }
  }
  fetchData = () => {
    if (this.state.token) {
      axios
        .get(`${StaticData.domainIp}/meeting/getFirstDetail`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(async response => {
          if (response.status === 200) {
            response.data.content['userDetail'] = response.data.userDetail
            await this.setState(response.data.content)
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
  OnBlur = e => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: handleString(e.target.value) })
  }
  GetTime = async (name, time) => {
    await this.setState({ [name]: time })
    if (name === 'startHour') {
      this.setState({ endHour: '', periodTime: '' })
    } else if (name === 'endHour') {
      let beginningTime = moment(this.state.startHour, 'h:mma')
      let endTime = moment(this.state.endHour, 'h:mma')
      if (!beginningTime.isBefore(endTime)) {
        this.setState({
          startHour: '',
          endHour: '',
          periodTime: ''
        })
        this.ResetAllMasked()
        Notification.notify(Message.text(911), 'warning')
      } else {
        let first = moment.duration(this.state.startHour)
        let end = moment.duration(this.state.endHour)
        let b = end.subtract(first)
        this.setState({
          periodTime: moment.utc(b.as('milliseconds')).format('HH:mm')
        })
      }
    }
  }
  AddOrder = () => {
    let obj = {
      description: '',
      attachment: [],
      attachmentName: [],
      responsible: '',
      duration: ''
    }
    this.setState({
      meetingOrders: [...this.state.meetingOrders, obj]
    })
  }
  handleChangeList = e => {
    let array = this.state.meetingOrders
    let key = parseInt(e.target.name.split('_')[1])
    let name = e.target.name.split('_')[0]
    let obj = array[key]
    obj[name] = handleString(e.target.value)
    if (name === 'duration') {
      this.MaskedInputBlur()
    }
    this.setState({ meetingOrders: array })
  }
  MaskedInputBlur = () => {
    this.setState({ foucs: '' })
    const any = Object.keys(this.state.meetingOrders).map(_ => {
      return parseInt(this.state.meetingOrders[_].duration)
    })
    const sum = any.reduce((a, b) => a + b)
    if (sum) {
      let time = moment.duration(sum, 'minutes')
      let beginningTime = moment(
        `${time._data.hours}:${time._data.minutes}`,
        'h:mma'
      )
      this.setState({
        sumTime: `${time._data.hours}:${time._data.minutes}`
      })
      let endTime = moment(this.state.periodTime, 'h:mma')
      if (!beginningTime.isBefore(endTime)) {
        this.ResetAllMasked()
        Notification.notify(Message.text(913), 'warning')
      }
    }
  }
  ResetAllMasked = () => {
    let newList = Object.keys(this.state.meetingOrders).map(_ => {
      this.state.meetingOrders[_].duration = ''
      return this.state.meetingOrders[_]
    })
    this.setState({ meetingOrders: newList, foucs: '', sumTime: '' })
  }
  deleteFile = async (key, num, files, names) => {
    let Document = await this.state.meetingOrders
    let obj = await Document[key]
    let data1 = await obj[files]
    let data2 = await obj[names]
    await data1.splice(num, 1)
    await data2.splice(num, 1)
    await this.setState({ meetingOrders: Document })
  }
  handleUpload = async (e, files, names) => {
    await e.preventDefault()
    await this.setState({ loading: files })
    names = await names.split('_')[0]
    let key = await parseInt(files.split('_')[1])
    files = await files.split('_')[0]
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = await new FileReader()
      await reader.readAsDataURL(e.target.files[i])
      await this.GetLink(
        files,
        e.target.files[i],
        names,
        e.target.files.length,
        key,
        i
      )
    }
  }
  GetLink = (nameState, file, names, length, key, i) => {
    let datareg = new FormData()
    let array = this.state.meetingOrders[key][nameState],
      arrayName = this.state.meetingOrders[key][names]
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/meeting`,
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
          await array.push(response.data.content)
          await arrayName.push(file.name)
          let Document = await this.state.meetingOrders
          let obj = await Document[key]
          obj[nameState] = await array
          obj[names] = await arrayName
          await this.setState({ meetingOrders: Document })
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
  handleDate = date => {
    if (date === undefined || date === null) {
      return undefined
    } else {
      return moment(`${date}`, 'jYYYY/jM/jD')
    }
  }
  getDateList = (key, name, date) => {
    let list = this.state.meetingOrders
    let obj = list[key]
    obj[name] = getCustomFormat(date, false)
    this.setState({ meetingOrders: list })
  }
  handleSubmit = async () => {
    const meetingType =
      this.state.meetingTypeSelected === 'مجازی'
        ? true
        : this.state.addressSelected !== '' &&
          this.state.meetingTypeSelected !== ''
    const check =
      this.state.subjectMeeting !== '' &&
      this.state.date &&
      meetingType === true &&
      this.state.attendeesSelected.length > 0 &&
      this.state.startHour !== '' &&
      this.state.endHour !== '' &&
      this.state.leaderSelected !== ''
    let meetingOrders = this.state.meetingOrders
    let i = 0
    let order = false
    while (i < meetingOrders.length) {
      order =
        meetingOrders[i].description !== '' &&
        meetingOrders[i].responsible !== '' &&
        meetingOrders[i].duration !== ''
      if (!order) {
        break
      }
      i++
    }
    if (check && order) {
      let result = Object.assign(
        {},
        Object.keys(meetingOrders).map(_ => {
          meetingOrders[_].attachment = Object.assign(
            {},
            meetingOrders[_].attachment
          )
          return meetingOrders[_]
        })
      )
      const attendeesSelected = Object.keys(this.state.attendeesSelected).map(
        data => {
          return this.state.attendeesSelected[data].value
        }
      )
      const keywordsSelected = Object.keys(this.state.keywordsSelected).map(
        data => {
          return this.state.keywordsSelected[data].value
        }
      )
      this.setState({ loading: 'submit', disabled: true })
      let datareg = new FormData()
      datareg.append('subject', this.state.subjectMeeting.value)
      datareg.append(
        'holdingTime',
        getCustomFormat(this.state.date, false)
          ? getCustomFormat(this.state.date, false)
          : ''
      )
      datareg.append('startHour', this.state.startHour)
      datareg.append('endHour', this.state.endHour)
      datareg.append('leader', this.state.leaderSelected)
      datareg.append('meetingType', this.state.meetingTypeSelected)
      datareg.append('attendees', attendeesSelected.join(','))
      datareg.append(
        'address',
        this.state.meetingTypeSelected === 'مجازی'
          ? this.state.linkAdress
          : this.state.addressSelected
      )
      datareg.append('meetingOrders', JSON.stringify(result))
      datareg.append('keywords', keywordsSelected.join(','))
      datareg.append(
        'wbs',
        this.state.wbsSelected.value ? this.state.wbsSelected.value : ''
      )
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/meeting/insert`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            Notification.notify(Message.text(905), 'success')
            setTimeout(async () => {
              await this.setState({
                redirect: true,
                disabled: false
              })
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
                  <Menu nameRole='' nameUrl={this.props.nameUrl} />
                  <div className='w-100 row m-0 main-box-dashboard'>
                    <div className='boxes-dashboard row m-0 p-0'>
                      <div className='main-form'>
                        <div className='title-from'>
                          <h2>ایجاد جلسه</h2>
                        </div>
                        <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                          <div className='form row justify-content-start'>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div className='field-form selectBox'>
                                <CreatableSelect
                                  value={this.state.subjectMeeting}
                                  onChange={newValue =>
                                    this.setState({ subjectMeeting: newValue })
                                  }
                                  options={this.state.subjectSuggestion}
                                  placeholder={
                                    <label>
                                      موضوع جلسه
                                      <span className='star IranSans_Bold'>
                                        *
                                      </span>
                                    </label>
                                  }
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  this.state.foucs === `date` ||
                                  (this.state.date && this.state.date !== '')
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <div className='icon-field'>
                                  <DateRangeRoundedIcon />
                                </div>
                                <div className='col p-0'>
                                  <label>
                                    زمان برگزاری
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                  <DatePicker
                                    persianDigits={true}
                                    isGregorian={false}
                                    timePicker={false}
                                    onChange={date => this.setState({ date })}
                                    value={this.state.date}
                                    min={this.state.yesteday}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form clock persian ${
                                  this.state.foucs === `startHour` ||
                                  (this.state.startHour &&
                                    this.state.startHour !== '')
                                    ? 'active'
                                    : ''
                                }`}
                                ref='startHourOpen'
                              >
                                <div className='icon-field'>
                                  <QueryBuilderIcon />
                                </div>
                                <div className='col p-0 ltr'>
                                  <label>ساعت شروع</label>
                                  <Clock
                                    getTime={(name, time) =>
                                      this.GetTime(name, time)
                                    }
                                    name='startHour'
                                    value={this.state.startHour}
                                    getFocus={e => (this.startHourOpen = e)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form clock persian ${
                                  this.state.foucs === `endHour` ||
                                  (this.state.endHour &&
                                    this.state.endHour !== '')
                                    ? 'active'
                                    : ''
                                }`}
                                ref='endHourOpen'
                              >
                                <div className='icon-field'>
                                  <QueryBuilderIcon />
                                </div>
                                <div className='col p-0 ltr'>
                                  <label>ساعت خاتمه</label>
                                  {this.state.startHour !== '' && (
                                    <Clock
                                      getTime={(name, time) =>
                                        this.GetTime(name, time)
                                      }
                                      name='endHour'
                                      value={this.state.endHour}
                                      getFocus={e => (this.endHourOpen = e)}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian pl-1 ${
                                  this.state.foucs === `leaderSelected` ||
                                  this.state.leaderSelected !== ''
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  دبیر جلسه
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <select
                                  name={`leaderSelected`}
                                  value={this.state.leaderSelected}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                >
                                  <option className='d-none'></option>
                                  {this.state.leader.map((data3, index2) => (
                                    <option key={index2} value={data3.value}>
                                      {data3.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian pl-1 ${
                                  this.state.foucs === `meetingTypeSelected` ||
                                  this.state.meetingTypeSelected !== ''
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  نحوه برگزاری
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <select
                                  name={`meetingTypeSelected`}
                                  value={this.state.meetingTypeSelected}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={e => {
                                    this.handleChange(e)
                                    this.setState({
                                      addressSelected: '',
                                      linkAdress: '',
                                      foucs: ''
                                    })
                                  }}
                                >
                                  <option className='d-none'></option>
                                  {this.state.meetingType.map(
                                    (data2, index1) => (
                                      <option key={index1} value={data2.value}>
                                        {data2.label}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div className='field-form selectBox'>
                                <div className='icon-field'>
                                  <PeopleIcon />
                                </div>
                                <div className='col p-0'>
                                  <CreatableSelect
                                    value={this.state.attendeesSelected}
                                    onChange={newValue => {
                                      this.setState({
                                        attendeesSelected: newValue
                                      })
                                    }}
                                    isMulti
                                    options={this.state.attendees}
                                    placeholder={
                                      <label>
                                        حاضرین
                                        <span className='star IranSans_Bold'>
                                          *
                                        </span>
                                      </label>
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div
                                className={`field-form persian pl-1 ${
                                  this.state.foucs === `addressSelected` ||
                                  this.state.foucs === 'linkAdress' ||
                                  this.state.addressSelected !== '' ||
                                  this.state.linkAdress !== ''
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <div className='icon-field'>
                                  <LocationOnIcon />
                                </div>
                                <div className='col p-0'>
                                  <label>
                                    آدرس
                                    {this.state.meetingTypeSelected ===
                                    'مجازی' ? (
                                      ''
                                    ) : (
                                      <span className='star IranSans_Bold'>
                                        *
                                      </span>
                                    )}
                                  </label>
                                  {this.state.meetingTypeSelected ===
                                  'مجازی' ? (
                                    <input
                                      className='text-right'
                                      name='linkAdress'
                                      value={handleString(
                                        this.state.linkAdress
                                      )}
                                      readOnly={false}
                                      onChange={this.handleChange}
                                      onFocus={e => this.OnFocus(e.target.name)}
                                      onBlur={this.OnBlur}
                                    />
                                  ) : (
                                    <select
                                      name={`addressSelected`}
                                      value={this.state.addressSelected}
                                      onFocus={e => this.OnFocus(e.target.name)}
                                      onBlur={this.OnBlur}
                                      onChange={this.handleChange}
                                    >
                                      <option className='d-none'></option>
                                      {this.state.address.map((data, key) => (
                                        <option key={key} value={data.value}>
                                          {data.label}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className='title-password col-12'>
                              <h2 className='IranSans_Bold'>دستورات جلسه</h2>
                              <div className='line'></div>
                            </div>
                            {this.state.meetingOrders.map((metting, _index) => (
                              <div className='w-100 row m-0' key={_index}>
                                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian textarea ${
                                      this.state.foucs ===
                                        `description_${_index}` ||
                                      handleCheckText(metting.description)
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <div className='col p-0'>
                                      <label className='textarea'>
                                        دستور جلسه
                                        <span className='star IranSans_Bold'>
                                          *
                                        </span>
                                      </label>
                                      <textarea
                                        className='w-100'
                                        type='text'
                                        name={`description_${_index}`}
                                        onFocus={e =>
                                          this.OnFocus(e.target.name)
                                        }
                                        onBlur={this.OnBlur}
                                        onChange={this.handleChangeList}
                                        value={handleString(
                                          metting.description
                                        )}
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                  <div className={`field-form persian`}>
                                    <label>تصویر پیوست</label>
                                    <div className='allName col row m-0 justify-content-end'>
                                      {metting.attachmentName.map(
                                        (name, key) => (
                                          <span key={key}>
                                            <CloseRoundedIcon
                                              onClick={() =>
                                                this.deleteFile(
                                                  _index,
                                                  key,
                                                  `attachment`,
                                                  `attachmentName`
                                                )
                                              }
                                            />
                                            {handleString(name)}
                                          </span>
                                        )
                                      )}
                                    </div>
                                    <input
                                      className='d-none'
                                      type='file'
                                      id={`attachment_${_index}`}
                                      multiple
                                      onChange={e =>
                                        this.handleUpload(
                                          e,
                                          `attachment_${_index}`,
                                          `attachmentName_${_index}`
                                        )
                                      }
                                    />
                                    <label
                                      className='upload-label'
                                      htmlFor={`attachment_${_index}`}
                                    >
                                      {this.state.loading ===
                                      `attachment_${_index}` ? (
                                        <Loading className='form-loader w-auto' />
                                      ) : (
                                        <AttachFileIcon />
                                      )}
                                      فایل پیوست
                                    </label>
                                  </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian ${
                                      this.state.foucs ===
                                        `responsible_${_index}` ||
                                      handleCheckText(metting.responsible)
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
                                    <select
                                      name={`responsible_${_index}`}
                                      value={handleString(metting.responsible)}
                                      onFocus={e => this.OnFocus(e.target.name)}
                                      onBlur={this.OnBlur}
                                      onChange={this.handleChangeList}
                                    >
                                      <option className='d-none'></option>
                                      <option value='کارفرما'>کارفرما</option>
                                      <option value='مشارکت'>مشارکت</option>
                                      <option value='مشاور'>مشاور</option>
                                      <option value='سازنده'>سازنده</option>
                                      <option value='شخص ثالث'>شخص ثالث</option>
                                      <option value='پیمانکار فرعی'>
                                        پیمانکار فرعی
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian field-clock ${
                                      this.state.foucs ===
                                        `duration_${_index}` ||
                                      (metting.duration &&
                                        metting.duration !== '')
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <div className='icon-field'>
                                      <DateRangeIcon />
                                    </div>
                                    <div className='col p-0'>
                                      <label>
                                        زمان تقریبی (بر حسب دقیقه)
                                        <span className='star IranSans_Bold'>
                                          *
                                        </span>
                                      </label>
                                      {this.state.periodTime !== '' && (
                                        <MaskedInput
                                          mask='999'
                                          name={`duration_${_index}`}
                                          value={metting.duration}
                                          onFocus={e =>
                                            this.OnFocus(e.target.name)
                                          }
                                          onBlur={() => this.MaskedInputBlur()}
                                          onChange={this.handleChangeList}
                                          maskChar=' '
                                          _index={_index}
                                        />
                                      )}
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
                            <div className='button-add col-12'>
                              <button onClick={this.AddOrder}>
                                <AddIcon />
                                افزودن دستور جلسه بیشتر
                              </button>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div className='field-form selectBox'>
                                <CreatableSelect
                                  isMulti
                                  onChange={newValue =>
                                    this.setState({
                                      keywordsSelected: newValue
                                    })
                                  }
                                  options={this.state.keywords}
                                  value={this.state.keywordsSelected}
                                  placeholder='تخصیص تگ'
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian pl-1 ${
                                  this.state.foucs === `wbsSelected` ||
                                  this.state.wbsSelected !== ''
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>تخصیص سطح WBS</label>
                                <select
                                  name={`wbsSelected`}
                                  value={
                                    this.state.wbsSelected.value
                                      ? this.state.wbsSelected.value
                                      : ''
                                  }
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                >
                                  <option className='d-none'></option>
                                  {this.state.wbs.map((data, key) => (
                                    <option key={key} value={data.value}>
                                      {data.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div className={`field-form persian`}>
                                <label>{`${this.state.userDetail.first_name}  ${this.state.userDetail.last_name}`}</label>
                                <label
                                  className='upload-label'
                                  onClick={() => this.setState({ popUp: true })}
                                >
                                  امضا
                                  <AttachFileIcon className='ml-0 mr-1' />
                                </label>
                              </div>
                            </div>
                            {this.state.sumTime !== '' ? (
                              <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                <div
                                  className={`field-form value-span persian`}
                                >
                                  <label>زمان تقریبی جلسه :</label>
                                  <span>{this.state.sumTime}</span>
                                </div>
                              </div>
                            ) : (
                              ''
                            )}
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.state.popUp ? (
              <Sign
                close={e => this.setState({ popUp: e })}
                pictureShow={this.state.userDetail.sign}
              />
            ) : (
              ''
            )}
          </div>
        )
    }
  }
}
class Sign extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div className='backGroundPopup' onClick={() => this.props.close(false)}>
        <div className='col-xl-6 col-lg-10 col-12'>
          <img src={this.props.pictureShow} alt='sign' />
        </div>
      </div>
    )
  }
}
