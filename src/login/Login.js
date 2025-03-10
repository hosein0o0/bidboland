import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffRounded'
import VisibilityIcon from '@material-ui/icons/VisibilityRounded'
import StaticData from '../staticData'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loading from '../layout/loading'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import NotificationContainer from '../notification/NotificationCotainer'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
// import Attention from '../layout/Attention'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      check: false,
      personnel_code: '',
      password: '',
      redirect: false,
      token: Cookies.get('token') ? Cookies.get('token') : null,
      loading: false,
      disabled: false,
      userDetail: Cookies.get('userDetail') ? Cookies.get('userDetail') : null,
      checkVendor: false,
      attention: true,
      listItem: [
        {
          label: 'بروز رسانی ها',
          items: [
            {
              value:
                'از تاریخ ۱۴۰۱/۰۲/۱۸ کاربران تنها با کد پرسنلی خود میتوانند از سامانه استفاده نمایند.'
            }
          ]
        }
      ]
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ورود`
    document.onkeydown = event => {
      if (event.keyCode === 13 && event.key === 'Enter') {
        if (
          (handleCheckText(this.state.personnel_code) &&
            handleCheckText(this.state.password)) ||
          this.state.disabled
        ) {
          this.handleSubmit()
        }
      }
    }
  }
  handleSubmit = async () => {
    const { personnel_code, password, token } = await this.state
    if (handleCheckText(personnel_code) && handleCheckText(password)) {
      await this.setState({ loading: true })
      let datareg = await new FormData()
      await datareg.append('personnel_code', personnel_code)
      await datareg.append('password', password)
      let url = await `${StaticData.domainIp}/login`
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        config: {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : '*'
          },
          processData: false,
          contentType: 'application/json',
          mimeType: 'multipart/form-data'
        }
      })
        .then(async response => {
          await this.setState({ loading: false, disabled: true })
          if (response.status === 200) {
            if (response.data.content && response.data.userDetail) {
              await Cookies.set('token', response.data.content)
              await Cookies.set(
                'userDetail',
                JSON.stringify(response.data.userDetail)
              )
              await this.setState({
                token: response.data.content,
                userDetail: response.data.userDetail,
                checkVendor: response.data.role === 'vendor',
                redirect: true
              })
            } else {
              this.setState({ redirect: false })
            }
          } else {
            Notification.notify(Message.text(response.status), 'error')
            this.setState({ redirect: false, disabled: false })
          }
        })
        .catch(err => {
          this.setState({ loading: false, disabled: false })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else {
      setTimeout(() => {
        this.setState({ loading: false, disabled: false })
        Notification.notify(Message.text(890), 'error')
      }, 5000)
    }
  }
  handleCloseAttention = (close, _dontShow_) => {
    this.setState({ attention: close })
    if (_dontShow_) {
      Cookies.set('_dontShow_', true, { expires: 7 })
    }
  }
  render () {
    const {
      redirect,
      token,
      userDetail,
      checkVendor,
      // attention,
      // listItem,
      personnel_code,
      check,
      password,
      disabled,
      loading
    } = this.state
    if (redirect || (token && userDetail)) {
      if (checkVendor) {
        return <Redirect to='/purchase-engineering' />
      } else {
        return <Redirect to='/Home' />
      }
    } else
      return (
        <div className='main'>
          <NotificationContainer />
          <div className='Login row m-0'>
            <div className='col-xl-8 col-lg-8 col-md-8 col-12 h-100 p-0 main-box-login'>
              <div className='main-login'>
                <div className='col-xl-6 col-lg-8 col-md-10 col-12'>
                  <div className='box-login'>
                    {/* {attention && (
                      <Attention
                        close={this.handleCloseAttention}
                        list={listItem}
                        title='اطلاعیه'
                      />
                    )} */}
                    <div className='title-login'>
                      <h3 className='IranSans_Bold'>ورود به حساب کاربری</h3>
                    </div>
                    <div className='form-login'>
                      <div className='field-form'>
                        <label>کد پرسنلی</label>
                        <input
                          className='ltr IranSans_Bold_FA'
                          type='number'
                          onChange={e =>
                            this.setState({
                              personnel_code: handleString(e.target.value)
                            })
                          }
                          tabIndex={1}
                          value={handleString(personnel_code)}
                          ref='personnel_code'
                        />
                      </div>
                      <div className='field-form'>
                        <label className='d-flex'>
                          رمز عبور
                          <span className='forgot-link'>
                            <Link to='/forgetPassword'>
                              رمز عبور خود را فراموش کرده‌اید؟
                            </Link>
                          </span>
                        </label>
                        <div className='w-100 position-relative d-flex align-items-center'>
                          <div
                            className='show-hidden'
                            onClick={() => this.setState({ check: !check })}
                          >
                            {check ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </div>
                          <input
                            className='pr-5 ltr IranSans_Bold_FA'
                            type={`${check ? 'text' : 'password'}`}
                            onChange={e =>
                              this.setState({
                                password: handleString(e.target.value)
                              })
                            }
                            value={handleString(password)}
                            tabIndex={2}
                          />
                        </div>
                      </div>
                      <div className='submit-form'>
                        <button
                          type='submit'
                          onClick={this.handleSubmit}
                          tabIndex={3}
                          disabled={
                            (handleCheckText(personnel_code) &&
                              handleCheckText(password)) ||
                            disabled
                              ? false
                              : true
                          }
                        >
                          ورود به حساب
                          {loading ? <Loading /> : ''}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='copy-right-login'>
                <span>
                  ©تمامی حقوق محفوظ است | {` ${StaticData.status} `} - نسخه
                  {` ${StaticData.Name} `}
                </span>
              </div>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-4 col-12 pl-0 pr-0 h-100'>
              <div className='main-logo-login'>
                <img
                  className='background-login'
                  src='/img/login-bg.jpg'
                  alt='background-logo'
                />
                <div className='logo'>
                  <img src='/img/logo-white.svg' alt='logo' />
                </div>
                <div className='product-rev'>
                  <span>شرکت گسترش اندیشه دارا</span>
                  <span>REV.2021DARA01.1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
}
