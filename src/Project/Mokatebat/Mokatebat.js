import React, { Component } from 'react'
import Menu from '../../layout/menu'
import Sidebar from '../../layout/sidebar'
import StaticData from '../../staticData'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import DatePicker from 'react-datepicker2'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import CreatableSelect from 'react-select/creatable'
import Loading from '../../layout/loading'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import EmailIcon from '@material-ui/icons/Email'
import DoneIcon from '@material-ui/icons/Done'
import axios from 'axios'
import Select from 'react-select'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import getCustomFormat from '../../getCustomFormat'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
export default class Mokatebat extends Component {
  constructor (props) {
    super(props)
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      projectCode: '',
      letterNumber: '',
      recordDate: '',
      Type: 'in',
      Sender: '',
      pictureFile: [],
      pictureFileName: [],
      lettreFile: [],
      lettreFileName: [],
      peygiri: '',
      externalReciever: 'no',
      externalRecieverEmail: [],
      contacts: [],
      contactsSelected: '',
      receivers: [],
      receiversSelected: [],
      Copies: [],
      CopiesSelected: [],
      keywords: [],
      keywordsSelected: [],
      wbsSelected: '',
      subject: '',
      date: null,
      wbs: [],
      permissions: [],
      permissionsSlected: [],
      contactsSelectedValue: '',
      receiversValue: '',
      CopiesValue: '',
      redirect: false,
      disabled: false
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title}- ایجاد مکاتبات`
    this.fetchData()
  }
  fetchData = () => {
    if (this.state.token) {
      axios
        .get(`${StaticData.domainIp}/correspondence/getFirstDetail`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.setState({
              recordDate: response.data.content.date,
              contacts: response.data.content.contacts,
              keywords: response.data.content.keywords,
              projectCode: response.data.content.projectCode,
              wbs: response.data.content.wbs,
              permissions: response.data.content.permissions
            })
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
  GetSender = async newValue => {
    await this.setState({
      contactsSelected: newValue.value
    })
    await axios
      .get(
        `${StaticData.domainIp}/correspondence/getReceivers?sender=${newValue.value}`,
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        }
      )
      .then(response => {
        if (response.status === 200) {
          this.setState({ receivers: response.data.content })
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
  GetCopies = async () => {
    if (this.state.receiversSelected.length > 0) {
      let datareg = new FormData()
      datareg.append('sender', this.state.contactsSelected)
      datareg.append('receiver', this.state.receiversSelected.join(','))
      axios({
        method: 'post',
        url: `${StaticData.domainIp}/correspondence/getCopies`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          if (response.status === 200) {
            await this.setState({
              Copies: response.data.content
            })
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
    this.setState({ [e.target.name]: e.target.value })
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
      url: `${StaticData.domainIp}/uploadFile/correspondence`,
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
  getLabel = (name, newValue) => {
    this.setState({ [name]: [] })
    let array = []
    if (newValue && newValue.length > 0) {
      newValue.forEach(data => {
        array.push(data.value)
        this.setState({ [name]: array })
      })
    }
  }
  deleteFile = (num, files, names) => {
    let data = this.state[`${files}`],
      data2 = this.state[`${names}`]
    data.splice(num, 1)
    data2.splice(num, 1)
    this.setState({ [files]: data, [names]: data2 })
  }
  handleSubmit = async () => {
    if (
      this.state.letterNumber !== '' &&
      this.state.date &&
      this.state.Type &&
      this.state.contactsSelected !== '' &&
      this.state.subject !== '' &&
      this.state.receiversSelected.length > 0 &&
      this.state.pictureFile.length > 0 &&
      this.state.permissionsSlected.length > 0
    ) {
      await this.setState({ loading: 'submit', disabled: true })
      let resultFile = await Object.assign({}, this.state.pictureFile)
      let resultlettreFile = await Object.assign({}, this.state.lettreFile)
      let datareg = await new FormData()
      await datareg.append('letterNumber', this.state.letterNumber)
      await datareg.append('date', getCustomFormat(this.state.date, false))
      await datareg.append('type', this.state.Type)
      await datareg.append('subject', this.state.subject)
      await datareg.append('sender', this.state.contactsSelected)
      await datareg.append(
        'permissions',
        this.state.permissionsSlected.join(',')
      )
      await datareg.append('receivers', this.state.receiversSelected.join(','))
      await datareg.append('copies', this.state.CopiesSelected.join(','))
      await datareg.append('pictures', JSON.stringify(resultFile))
      await datareg.append('attachments', JSON.stringify(resultlettreFile))
      await datareg.append('followUp', this.state.peygiri)
      await datareg.append('keywords', this.state.keywordsSelected.join(','))
      await datareg.append('wbs', this.state.wbsSelected)
      await datareg.append('externalReciever', this.state.externalReciever)
      await datareg.append(
        'externalRecieverEmail',
        this.state.externalRecieverEmail.join(',')
      )
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/correspondence/create`,
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
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      if (this.state.redirect) {
        return <Redirect to='correspondence' />
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
                  <Menu
                    nameRole='correspondence_create'
                    nameUrl={this.props.nameUrl}
                  />
                  <div className='w-100 row m-0 main-box-dashboard'>
                    <div className='boxes-dashboard row m-0 p-0'>
                      <div className='main-form'>
                        <div className='title-from'>
                          <h2>مدیریت مکاتبات</h2>
                        </div>
                        <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                          <div className='form row justify-content-start'>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  this.state.foucs === `projectCode` ||
                                  handleCheckText(this.state.projectCode)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  کد پروژه
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='text-right'
                                  name='projectCode'
                                  value={handleString(this.state.projectCode)}
                                  readOnly={true}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  this.state.foucs === `letterNumber` ||
                                  handleCheckText(this.state.letterNumber)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  شماره نامه
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='text-right'
                                  name='letterNumber'
                                  value={handleString(this.state.letterNumber)}
                                  onChange={this.handleChange}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
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
                                    تاریخ نامه
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
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  this.state.foucs === `recordDate` ||
                                  handleCheckText(this.state.recordDate)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <div className='icon-field'>
                                  <DateRangeRoundedIcon />
                                </div>
                                <div className='col p-0'>
                                  <label>
                                    تاریخ ثبت نامه
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                  <input
                                    readOnly={true}
                                    name='recordDate'
                                    value={handleString(this.state.recordDate)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
                              <div className='field-radio w-100'>
                                <label>
                                  نوع نامه :
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <div className='main-radio'>
                                  <div className='radio-button'>
                                    <input
                                      className='d-none'
                                      type='radio'
                                      id='sadere'
                                      onClick={() =>
                                        this.setState({ Type: 'out' })
                                      }
                                    />
                                    <label htmlFor='sadere'>
                                      {this.state.Type === 'out' ? (
                                        <RadioButtonCheckedIcon />
                                      ) : (
                                        <RadioButtonUncheckedIcon />
                                      )}
                                      صادره
                                    </label>
                                  </div>
                                  <div className='radio-button'>
                                    <input
                                      className='d-none'
                                      type='radio'
                                      id='varede'
                                      onClick={() =>
                                        this.setState({ Type: 'in' })
                                      }
                                    />
                                    <label htmlFor='varede'>
                                      {this.state.Type === 'in' ? (
                                        <RadioButtonCheckedIcon />
                                      ) : (
                                        <RadioButtonUncheckedIcon />
                                      )}
                                      وارده
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div className='field-form selectBox'>
                                <CreatableSelect
                                  value={this.state.contactsSelectedValue}
                                  onChange={newValue => {
                                    this.GetSender(newValue)
                                    this.setState({
                                      contactsSelectedValue: newValue,
                                      receiversValue: '',
                                      receivers: [],
                                      CopiesValue: '',
                                      Copies: []
                                    })
                                  }}
                                  options={this.state.contacts}
                                  placeholder={
                                    <label>
                                      فرستنده
                                      <span className='star IranSans_Bold'>
                                        *
                                      </span>
                                    </label>
                                  }
                                />
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  this.state.foucs === 'subject' ||
                                  handleCheckText(this.state.subject)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <div className='col p-0'>
                                  <label className='textarea'>
                                    موضوع
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                  <input
                                    className='w-100'
                                    type='text'
                                    name='subject'
                                    value={handleString(this.state.subject)}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div className='field-form selectBox'>
                                <Select
                                  onChange={newValue =>
                                    this.getLabel(
                                      'permissionsSlected',
                                      newValue
                                    )
                                  }
                                  isMulti
                                  name='colors'
                                  options={this.state.permissions}
                                  className='basic-multi-select'
                                  classNamePrefix='select'
                                  placeholder={
                                    <label>
                                      سطح دسترسی
                                      <span className='star IranSans_Bold'>
                                        *
                                      </span>
                                    </label>
                                  }
                                />
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div className='field-form selectBox'>
                                <CreatableSelect
                                  isMulti
                                  value={this.state.receiversValue}
                                  onBlur={() => this.GetCopies()}
                                  onChange={newValue => {
                                    this.getLabel('receiversSelected', newValue)
                                    this.setState({
                                      receiversValue: newValue,
                                      CopiesValue: '',
                                      Copies: []
                                    })
                                  }}
                                  options={this.state.receivers}
                                  placeholder={
                                    <label>
                                      گیرندگان
                                      <span className='star IranSans_Bold'>
                                        *
                                      </span>
                                    </label>
                                  }
                                />
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div className='field-form selectBox'>
                                <CreatableSelect
                                  isMulti
                                  value={this.state.CopiesValue}
                                  onChange={newValue => {
                                    this.getLabel('CopiesSelected', newValue)
                                    this.setState({ CopiesValue: newValue })
                                  }}
                                  options={this.state.Copies}
                                  placeholder={<label>رو نوشت</label>}
                                />
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div className={`field-form persian`}>
                                <label>
                                  تصویر نامه
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <div className='allName col row m-0 justify-content-end'>
                                  {this.state.pictureFileName.map(
                                    (name, key) => (
                                      <span key={key}>
                                        <CloseRoundedIcon
                                          onClick={() =>
                                            this.deleteFile(
                                              key,
                                              'pictureFile',
                                              'pictureFileName'
                                            )
                                          }
                                        />
                                        {name}
                                      </span>
                                    )
                                  )}
                                </div>
                                <input
                                  className='d-none'
                                  type='file'
                                  id='upload-Picture'
                                  multiple
                                  onChange={e =>
                                    this.handleUpload(
                                      e,
                                      'pictureFile',
                                      'pictureFileName'
                                    )
                                  }
                                />
                                <label
                                  className='upload-label'
                                  htmlFor='upload-Picture'
                                >
                                  {this.state.loading === 'pictureFile' ? (
                                    <Loading className='form-loader w-auto' />
                                  ) : (
                                    <AttachFileIcon />
                                  )}
                                  آپلود فایل
                                </label>
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div className={`field-form persian`}>
                                <label>پیوست نامه</label>
                                <div className='allName col row m-0 justify-content-end'>
                                  {this.state.lettreFileName.map(
                                    (name, key) => (
                                      <span key={key}>
                                        <CloseRoundedIcon
                                          onClick={() =>
                                            this.deleteFile(
                                              key,
                                              'lettreFile',
                                              'lettreFileName'
                                            )
                                          }
                                        />
                                        {name}
                                      </span>
                                    )
                                  )}
                                </div>
                                <input
                                  className='d-none'
                                  type='file'
                                  id='upload-peyvast'
                                  multiple
                                  onChange={e =>
                                    this.handleUpload(
                                      e,
                                      'lettreFile',
                                      'lettreFileName'
                                    )
                                  }
                                />
                                <label
                                  className='upload-label'
                                  htmlFor='upload-peyvast'
                                >
                                  {this.state.loading === 'lettreFile' ? (
                                    <Loading className='form-loader w-auto' />
                                  ) : (
                                    <AttachFileIcon />
                                  )}
                                  آپلود فایل
                                </label>
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div
                                className={`field-form persian textarea ${
                                  this.state.foucs === 'peygiri' ||
                                  handleCheckText(this.state.peygiri)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <div className='col p-0'>
                                  <label className='textarea'>پیگیری</label>
                                  <textarea
                                    className='w-100'
                                    type='text'
                                    name='peygiri'
                                    value={handleString(this.state.peygiri)}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div className='field-form selectBox'>
                                <CreatableSelect
                                  isMulti
                                  onChange={newValue =>
                                    this.getLabel('keywordsSelected', newValue)
                                  }
                                  options={this.state.keywords}
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
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
                              <div className='field-radio w-100'>
                                <label>گیرنده خارج از سیستم :</label>
                                <div className='main-radio'>
                                  <div className='radio-button'>
                                    <input
                                      className='d-none'
                                      type='radio'
                                      id='yes'
                                      onClick={() =>
                                        this.setState({
                                          externalReciever: 'yes'
                                        })
                                      }
                                    />
                                    <label htmlFor='yes'>
                                      {this.state.externalReciever === 'yes' ? (
                                        <RadioButtonCheckedIcon />
                                      ) : (
                                        <RadioButtonUncheckedIcon />
                                      )}
                                      دارد
                                    </label>
                                  </div>
                                  <div className='radio-button'>
                                    <input
                                      className='d-none'
                                      type='radio'
                                      id='no'
                                      onClick={() =>
                                        this.setState({
                                          externalReciever: 'no',
                                          externalRecieverEmail: []
                                        })
                                      }
                                    />
                                    <label htmlFor='no'>
                                      {this.state.externalReciever === 'no' ? (
                                        <RadioButtonCheckedIcon />
                                      ) : (
                                        <RadioButtonUncheckedIcon />
                                      )}
                                      ندارد
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {this.state.externalReciever === 'yes' ? (
                              <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${
                                    this.state.foucs ===
                                      `externalRecieverEmail` ||
                                    this.state.externalRecieverEmail.length > 0
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <div className='icon-field'>
                                    <EmailIcon />
                                  </div>
                                  <div className='col p-0 externalRecieverEmail'>
                                    <TagsInput
                                      inputProps={{
                                        className:
                                          'react-tagsinput-input tagsInput col',
                                        placeholder: 'جدا سازی با Enter'
                                      }}
                                      value={this.state.externalRecieverEmail}
                                      onChange={externalRecieverEmail =>
                                        this.setState({ externalRecieverEmail })
                                      }
                                    />
                                  </div>
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
          </div>
        )
    }
  }
}
