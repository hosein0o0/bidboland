import React, { Component } from 'react'
import Menu from '../../layout/menu'
import Sidebar from '../../layout/sidebar'
import StaticData from '../../staticData'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import EmailIcon from '@material-ui/icons/Email'
import axios from 'axios'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import { handleFilter } from '../../table/OutputFilter'

export default class MokatebatDisabled extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      projectCode: '',
      letterNumber: '',
      created_at: '',
      type: 'in',
      sender: '',
      pictures: {},
      attachments: {},
      followUp: '',
      externalReciever: 'no',
      externalRecieverEmail: '',
      keywords: '',
      wbs: '',
      subject: '',
      date: '',
      permissions: [],
      redirect: false,
      receivers: [],
      id: '',
      copies: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title}- مشاهده مکاتبات`
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
        .get(`${StaticData.domainIp}/correspondence/get/${id}`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.setState(response.data.content)
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
  handleConvert = object => {
    let allData = []
    for (let value in object) {
      allData.push(object[value])
    }
    return allData
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
                    nameRole='correspondence'
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
                                  readOnly={true}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  handleCheckText(this.state.date)
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
                                  <input
                                    className='text-right'
                                    name='date'
                                    value={handleString(this.state.date)}
                                    readOnly={true}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
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
                                    <label>
                                      {this.state.type === 'out' ? (
                                        <RadioButtonCheckedIcon />
                                      ) : (
                                        <RadioButtonUncheckedIcon />
                                      )}
                                      صادره
                                    </label>
                                  </div>
                                  <div className='radio-button'>
                                    <label>
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
                              <div
                                className={`field-form persian ${
                                  handleCheckText(this.state.sender)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  فرستنده
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  readOnly={true}
                                  value={handleString(this.state.sender)}
                                />
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
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
                                    readOnly={true}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  this.state.permissions.length > 0
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  سطح دسترسی
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='w-100'
                                  value={handleString(
                                    this.state.permissions.join(' - ')
                                  )}
                                  readOnly={true}
                                />
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  this.state.receivers.length > 0
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  گیرندگان
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  value={handleString(
                                    this.state.receivers.join(' - ')
                                  )}
                                  readOnly={true}
                                />
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  this.state.copies.length > 0 ? 'active' : ''
                                }`}
                              >
                                <label>
                                  رو نوشت
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  value={handleString(this.state.copies.join(' - '))}
                                  readOnly={true}
                                />
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div className={`field-form persian`}>
                                <label>
                                  تصویر نامه
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <div className='allName col row m-0 justify-content-end pl-2'>
                                  {this.handleConvert(this.state.pictures).map(
                                    (name, key) => (
                                      <a
                                        href={name}
                                        target='_blank'
                                        rel='noreferrer'
                                      >
                                        <span key={key}>{name}</span>
                                      </a>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div className={`field-form persian`}>
                                <label>پیوست نامه</label>
                                <div className='pl-2 allName col row m-0 justify-content-end'>
                                  {this.handleConvert(
                                    this.state.attachments
                                  ).map((name, key) => (
                                    <a
                                      href={name}
                                      target='_blank'
                                      rel='noreferrer'
                                    >
                                      <span key={key}>{name}</span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div
                                className={`field-form persian textarea ${
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
                                    readOnly={true}
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  handleCheckText(this.state.keywords)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label className='textarea'>تخصیص تگ</label>
                                <input
                                  value={handleString(this.state.keywords)}
                                  readOnly={true}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  handleCheckText(this.state.wbs)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>تخصیص سطح WBS</label>
                                <input value={handleString(this.state.wbs)} readOnly={true} />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
                              <div className='field-radio w-100'>
                                <label>گیرنده خارج از سیستم :</label>
                                <div className='main-radio'>
                                  <div className='radio-button'>
                                    <label>
                                      {this.state.externalReciever === 'yes' ? (
                                        <RadioButtonCheckedIcon />
                                      ) : (
                                        <RadioButtonUncheckedIcon />
                                      )}
                                      دارد
                                    </label>
                                  </div>
                                  <div className='radio-button'>
                                    <label>
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
                                      value={handleString(this.state.externalRecieverEmail)}
                                      readOnly={true}
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ''
                            )}
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
