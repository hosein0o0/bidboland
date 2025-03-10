import React, { Component } from 'react'
import Cookies from 'js-cookie'
import Menu from '../layout/menu'
import Sidebar from '../layout/sidebar'
import StaticData from '../staticData'
import { Redirect } from 'react-router-dom'
import MailIcon from '@material-ui/icons/Mail'
import CallRoundedIcon from '@material-ui/icons/CallRounded'
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import Loading from '../layout/loading'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import DoneIcon from '@material-ui/icons/Done'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'

export default class UploadFile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      email: '',
      phoneNumber: '',
      state: '',
      address: '',
      peyvastName: [],
      peyvast: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title}- بارگزاری اسناد و ثبت اطلاعات تماس`
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
  deleteFile = (num, files, names) => {
    let data = this.state[`${files}`],
      data2 = this.state[`${names}`]
    data.splice(num, 1)
    data2.splice(num, 1)
    this.setState({ [files]: data, [names]: data2 })
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
      url: `${StaticData.domainIp}/uploadFile/RFQ-upload`,
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
  render () {
    if (!this.state.token) {
      return <Redirect to='/Login' />
    } else {
      return (
        <div className='main'>
          <div className='col-12 p-0'>
            <div className='row m-0'>
              <Sidebar
                handleState={(name, value) => this.setState({ [name]: value })}
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
                        <h2>بارگزاری اسناد و ثبت اطلاعات تماس</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row justify-content-start'>
                          <div className='title-password col-12 mt-3 mb-2'>
                            <h2 className='IranSans_Bold'>
                              اطلاعات تماس شرکت/مدیر پروژه
                            </h2>
                            <div className='line'></div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state.foucs === `email` ||
                                handleCheckText(this.state.email)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <div className='icon-field'>
                                <MailIcon />
                              </div>
                              <div className='col p-0'>
                                <label>
                                  ایمیل
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  type='email'
                                  name='email'
                                  value={handleString(this.state.email)}
                                  onChange={this.handleChange}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state.foucs === `phoneNumber` ||
                                handleCheckText(this.state.phoneNumber)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <div className='icon-field'>
                                <CallRoundedIcon />
                              </div>
                              <div className='col p-0'>
                                <label>
                                  شماره تماس
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  type='number'
                                  name='phoneNumber'
                                  value={handleString(this.state.phoneNumber)}
                                  onChange={this.handleChange}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian pl-1 ${
                                this.state.foucs === `state` ||
                                handleCheckText(this.state.state)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <label>
                                استان
                                <span className='star IranSans_Bold'>*</span>
                              </label>
                              <select
                                name={`state`}
                                onFocus={e => this.OnFocus(e.target.name)}
                                onBlur={this.OnBlur}
                                onChange={this.handleChange}
                                value={handleString(this.state.state)}
                              >
                                <option className='d-none'></option>
                                <option value={1}>استان یک</option>
                                <option value={2}>استان دو</option>
                                <option value={3}>استان سه</option>
                              </select>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state.foucs === `address` ||
                                handleCheckText(this.state.address)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <div className='icon-field'>
                                <LocationOnRoundedIcon />
                              </div>
                              <div className='col p-0'>
                                <label>
                                  آدرس
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  type='text'
                                  name='address'
                                  value={handleString(this.state.address)}
                                  onChange={this.handleChange}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='w-100'>
                            <div className='title-password col-12 mt-3 mb-2'>
                              <h2 className='IranSans_Bold'>پیوست مدارک</h2>
                              <div className='line'></div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div className={`field-form persian`}>
                                <label>پیوست نامه</label>
                                <div className='allName col row m-0 justify-content-end'>
                                  {this.state.peyvastName.map((name, key) => (
                                    <span key={key}>
                                      <CloseRoundedIcon
                                        onClick={() =>
                                          this.deleteFile(
                                            key,
                                            'peyvast',
                                            'peyvastName'
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
                                  id='upload-peyvast'
                                  multiple
                                  onChange={e =>
                                    this.handleUpload(
                                      e,
                                      'peyvast',
                                      'peyvastName'
                                    )
                                  }
                                />
                                <label
                                  className='upload-label'
                                  htmlFor='upload-peyvast'
                                >
                                  {this.state.loading === 'peyvast' ? (
                                    <Loading className='form-loader w-auto' />
                                  ) : (
                                    <AttachFileIcon />
                                  )}
                                  آپلود فایل
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className='submit-form col-12 mt-5'>
                            <button disabled={this.state.disabled}>
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
