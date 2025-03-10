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
import momentJalaali from 'moment-jalaali'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
// import { ArrowLeftRounded } from '@material-ui/icons';

export default class EditMokatebat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      projectCode: '',
      letterNumber: '',
      created_at: '',
      sender: '',
      subject: '',
      SenderList: [],
      date: undefined,
      type: 'in',
      permissionsList: [],
      permissions: [],
      receiversList: [],
      receivers: [],
      copiesList: [],
      copies: [],
      pictures: [],
      picturesName: [],
      attachments: [],
      attachmentsName: [],
      followUp: '',
      keywordsList: [],
      keywords: [],
      wbs: [],
      wbsSelected: '',
      externalReciever: 'no',
      externalRecieverEmail: ''
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title}- ایجاد مکاتبات`
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    if (id) {
      this.setState({ id: id })
      this.fetchData(id)
    }
  }
  fetchData = id => {
    if (this.state.token) {
      axios
        .get(`${StaticData.domainIp}/correspondence/getForUpdate/${id}`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(response => {
          if (response.status === 200) {
            response.data.content.contactList.forEach(data1 => {
              if (
                data1.value !== response.data.content.sender.value &&
                data1.label !== response.data.content.sender.label
              ) {
                this.setState({
                  receiversList: [...this.state.receiversList, data1]
                })
              }
            })
            this.setState({
              created_at: response.data.content.created_at,
              projectCode: response.data.content.projectCode,
              subject: response.data.content.subject,
              sender: response.data.content.sender,
              copyList: response.data.content.contactList,
              SenderList: response.data.content.contactList,
              letterNumber: response.data.content.letterNumber,
              date: momentJalaali(response.data.content.date, 'jYYYY/jMM/jDD'),
              type: response.data.content.type,
              permissionsList: response.data.content.permissionsList,
              permissions: response.data.content.permissions,
              receivers: response.data.content.receivers,
              copiesList: response.data.content.contactList,
              copies: response.data.content.copies,
              pictures: Object.keys(response.data.content.pictures).map(
                key => response.data.content.pictures[key]
              ),
              picturesName: Object.keys(response.data.content.pictures).map(
                key => response.data.content.pictures[key]
              ),
              attachments: Object.keys(response.data.content.attachments).map(
                key => response.data.content.attachments[key]
              ),
              attachmentsName: Object.keys(
                response.data.content.attachments
              ).map(key => response.data.content.attachments[key]),
              keywordsList: response.data.content.keywordsList,
              wbs: response.data.content.wbs,
              externalReciever: response.data.content.externalReciever,
              externalRecieverEmail: response.data.content.externalRecieverEmail
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
  Getsender = async newValue => {
    let array = []
    await this.state.copyList.forEach(async data => {
      if (data.value !== newValue.value && data.label !== newValue.label) {
        await array.push(data)
      }
    })
    await this.setState({ sender: newValue, receiversList: array })
  }

  GetCopies = async () => {
    // if(this.state.receiversSelected.length > 0){
    //     let datareg = new FormData()
    //     // datareg.append('sender' , this.state.contactsSelected)
    //     datareg.append('receiver' , this.state.receiversSelected.join(','))
    //     axios({
    //         method: 'post',
    //         url: `${StaticData.domainIp}/correspondence/getCopies`,
    //         data: datareg,
    //         headers: {
    //             'Authorization' : `Bearer ${this.state.token?this.state.token:null}`
    //         },
    //     })
    //  .then(async(response)=>{
    //      if(response.status === 200){
    //          await this.setState({
    //             Copies : response.data.content
    //          })
    //      }else {
    //         Notification.notify(Message.text(response.status), 'error');
    //     }
    //  })
    //  .catch((err)=>{
    //     if(err.response){
    //         Notification.notify(Message.text(err.response.status), 'error');
    //     }
    //  })
    // }
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
  getLabel = (name, value, newValue) => {}
  deleteFile = (num, files, names) => {
    let data = this.state[`${files}`],
      data2 = this.state[`${names}`]
    data.splice(num, 1)
    data2.splice(num, 1)
    this.setState({ [files]: data, [names]: data2 })
  }
  getCustomFormat (inputValue, isGregorian) {
    if (!inputValue) return ''
    const inputFormat = isGregorian ? 'YYYY/M/D' : 'jYYYY/jM/jD'
    return isGregorian
      ? inputValue.locale('es').format(inputFormat)
      : inputValue.locale('fa').format(inputFormat)
  }
  handleSubmit = async () => {
    let array_permissions = [],
      array_receivers = [],
      array_copies = [],
      array_keywords = []
    await this.state.permissions.filter(elm =>
      array_permissions.push(elm.value)
    )
    await this.state.receivers.filter(elm => array_receivers.push(elm.value))
    await this.state.copies.filter(elm => array_copies.push(elm.value))
    await this.state.keywords.filter(elm => array_keywords.push(elm.value))
    const external =
      this.state.externalReciever === 'yes'
        ? this.state.externalRecieverEmail !== ''
        : true
    const check =
      this.state.letterNumber !== '' &&
      this.state.date &&
      this.state.sender.value &&
      this.state.subject !== '' &&
      array_permissions.length > 0 &&
      array_receivers.length > 0 &&
      this.state.pictures.length > 0
    if (check && this.state.id && external) {
      let datareg = await new FormData()
      await datareg.append('id', this.state.id)
      await datareg.append('letterNumber', this.state.letterNumber)
      await datareg.append('date', this.getCustomFormat(this.state.date, false))
      await datareg.append('type', this.state.type)
      await datareg.append('subject', this.state.subject)
      await datareg.append('sender', this.state.sender.value)
      await datareg.append('permissions', array_permissions.join(','))
      await datareg.append('receivers', array_receivers.join(','))
      await datareg.append('copies', array_copies.join(','))
      await datareg.append(
        'pictures',
        JSON.stringify(Object.assign({}, this.state.pictures))
      )
      await datareg.append(
        'attachments',
        JSON.stringify(Object.assign({}, this.state.attachments))
      )
      await datareg.append('followUp', this.state.followUp)
      await datareg.append('keywords', array_keywords.join(','))
      await datareg.append('wbs', this.state.wbsSelected)
      await datareg.append('externalReciever', this.state.externalReciever)
      await datareg.append(
        'externalRecieverEmail',
        this.state.externalRecieverEmail
      )
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/correspondence/update`,
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
              // await this.setState({redirect : true})
            }, 5000)
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
                    nameRole='correspondence_edit'
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
                                  readOnly
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
                                  this.state.foucs === `created_at` ||
                                  handleCheckText(this.state.created_at)
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
                                    name='created_at'
                                    value={handleString(this.state.created_at)}
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
                                        this.setState({ type: 'out' })
                                      }
                                    />
                                    <label htmlFor='sadere'>
                                      {this.state.type === 'out' ? (
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
                                        this.setState({ type: 'in' })
                                      }
                                    />
                                    <label htmlFor='varede'>
                                      {this.state.type === 'in' ? (
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
                                  value={this.state.sender}
                                  onChange={newValue => {
                                    this.Getsender(newValue)
                                    this.setState({
                                      receivers: [],
                                      copies: []
                                    })
                                  }}
                                  options={this.state.SenderList}
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
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    value={handleString(this.state.subject)}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div className='field-form selectBox'>
                                <Select
                                  onChange={newValue =>
                                    this.setState({ permissions: newValue })
                                  }
                                  isMulti
                                  name='colors'
                                  value={this.state.permissions}
                                  options={this.state.permissionsList}
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
                                  value={this.state.receivers}
                                  // onBlur={()=>this.GetCopies()}
                                  onChange={newValue => {
                                    this.setState({
                                      receivers: newValue
                                    })
                                  }}
                                  options={this.state.receiversList}
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
                                  value={this.state.copies}
                                  onChange={newValue => {
                                    this.setState({ copies: newValue })
                                  }}
                                  options={this.state.copiesList}
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
                                  {this.state.picturesName.map((name, key) => (
                                    <span key={key}>
                                      <CloseRoundedIcon
                                        onClick={() =>
                                          this.deleteFile(
                                            key,
                                            'pictures',
                                            'picturesName'
                                          )
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
                                    this.handleUpload(
                                      e,
                                      'pictures',
                                      'picturesName'
                                    )
                                  }
                                />
                                <label
                                  className='upload-label'
                                  htmlFor='upload-Picture'
                                >
                                  {this.state.loading === 'pictures' ? (
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
                                  {this.state.attachmentsName.map(
                                    (name, key) => (
                                      <span key={key}>
                                        <CloseRoundedIcon
                                          onClick={() =>
                                            this.deleteFile(
                                              key,
                                              'attachments',
                                              'attachmentsName'
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
                                      'attachments',
                                      'attachmentsName'
                                    )
                                  }
                                />
                                <label
                                  className='upload-label'
                                  htmlFor='upload-peyvast'
                                >
                                  {this.state.loading === 'attachments' ? (
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
                                  this.state.foucs === 'followUp' ||
                                  handleCheckText(this.state.followUp)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <div className='col p-0'>
                                  <label className='textarea'>پیگیری</label>
                                  <textarea
                                    className='w-100'
                                    type='text'
                                    name='followUp'
                                    value={handleString(this.state.followUp)}
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
                                  value={this.state.keywords}
                                  onChange={newValue =>
                                    this.setState({ keywords: newValue })
                                  }
                                  options={this.state.keywordsList}
                                  placeholder='تخصیص تگ'
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian pl-1 ${
                                  this.state.foucs === `wbsSelected` ||
                                  handleCheckText(this.state.wbsSelected)
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
                                  {handleCheckText(this.state.wbs)
                                    ? this.state.wbs.map((data, key) => (
                                        <option key={key} value={data.value}>
                                          {data.label}
                                        </option>
                                      ))
                                    : ''}
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
                                          externalRecieverEmail: ''
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
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${
                                    this.state.foucs ===
                                      `externalRecieverEmail` ||
                                    handleCheckText(
                                      this.state.externalRecieverEmail
                                    )
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <div className='icon-field'>
                                    <EmailIcon />
                                  </div>
                                  <div className='col p-0'>
                                    <label>
                                      ایمیل گیرنده
                                      <span className='star IranSans_Bold'>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      className='text-right'
                                      name='externalRecieverEmail'
                                      value={handleString(
                                        this.state.externalRecieverEmail
                                      )}
                                      onChange={this.handleChange}
                                      onFocus={e => this.OnFocus(e.target.name)}
                                      onBlur={this.OnBlur}
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ''
                            )}
                            <div className='submit-form col-12'>
                              <button onClick={this.handleSubmit}>
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
