import React, { Component } from 'react'
import Menu from '../layout/menu'
import Sidebar from '../layout/sidebar'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
// import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Loading from '../layout/loading'
// import AttachFileIcon from '@material-ui/icons/AttachFile';
// import axios from 'axios'
// import Notification from '../notification/notification'
// import Message from '../notification/Message'
import DoneIcon from '@material-ui/icons/Done'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
export default class CommentSheet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      attachment: [],
      attachmentName: [],
      description: '',
      descriptionAnswer: ''
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title}- کامنت شیت`
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
                        <h2>کامنت شیت</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row justify-content-start'>
                          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                            <div className={`field-form persian`}>
                              <label>مدارک پیوست</label>
                              <div className='allName col row m-0 justify-content-end'>
                                {this.state.attachmentName.map(
                                  (name, index) => (
                                    <a
                                      key={index}
                                      href={this.state.attachment[index]}
                                    >
                                      {name}
                                    </a>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                            <div
                              className={`field-form persian textarea ${
                                handleCheckText(this.state.description) ? 'active' : ''
                              }`}
                            >
                              <div className='col p-0'>
                                <label className='textarea'>
                                  <span className='star IranSans_Bold'>*</span>
                                  توضیحات
                                </label>
                                <textarea
                                  className='w-100'
                                  type='text'
                                  name='description'
                                  value={handleString(this.state.description)}
                                  readOnly={true}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div className='w-100'>
                            <div className='title-password col-12 mt-2 mb-3'>
                              <h2 className='IranSans_Bold'>ارسال پاسخ</h2>
                              <div className='line'></div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div
                                className={`field-form persian textarea ${
                                  this.state.foucs === 'descriptionAnswer' ||
                                  handleCheckText(this.state.descriptionAnswer)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <div className='col p-0'>
                                  <label className='textarea'>
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                    شرح پاسخ
                                  </label>
                                  <textarea
                                    className='w-100'
                                    type='text'
                                    name='descriptionAnswer'
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    value={handleString(this.state.descriptionAnswer)}
                                    onChange={this.handleChange}
                                  ></textarea>
                                </div>
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
