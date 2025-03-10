import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'
// import AccessLevel from './AccessLevel'
import axios from 'axios'
import StaticData from '../staticData'
import CallIcon from '@material-ui/icons/Call'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import Notification from '../notification/notification'
import Message from '../notification/Message'
// import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
// import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import CreatableSelect from 'react-select/creatable'
import handleCheckText from '../handleCheckText'
import PersonIcon from '@material-ui/icons/Person'
import handleString from '../handleString'
export default class CreateUser extends Component {
  constructor(props) {
    super(props)
    // handleCheckText = HandleCheckText.handleCheckText
    this.Reset = null
    this.state = {
      foucs: '',
      token: Cookies.get('token'),
      loading: false,
      file: '',
      nameFile: '',
      disabled: false,
      // vendor: false,
      // companyName: '',
      // companyLogoName: '',
      // companyLogo: '',
      // MRECode: [],
      // MRECodeList: [],
      redirect: false,
      // transmittalPrefix: '',
      // contractNumber: '',
      UserGroupsList: [],
      UserGroups: [],
      organizationـlevel: '',
      personnel_code: ''
    }
  }
  componentDidMount() {
    document.title = `${StaticData.Title} - ایجاد کاربر`
    this.fetchDate()
  }
  fetchDate = () => {
    if (this.state.token) {
      axios
        .get(`${StaticData.domainIp}/user/getFirstDetailForUserRegistration`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          }
        })
        .then(async response => {
          if (response.status === 200) {
            const handleArra = (_array, _num) => {
              let result = []
              _array.forEach((_data, __key) => {
                if (__key > _num) {
                  let _obj = {
                    label: handleString(_data.label),
                    value: _data.value
                  }
                  result.push(_obj)
                }
              })
              return result
            }
            await this.setState({
              // MRECodeList: response.data.content.MRECode,
              UserGroupsList: handleArra(
                response.data.content.permissionList,
                1
              )
            })
            if (this.refs.label_0) {
              await this.setState({ width: this.refs.label_0.offsetWidth })
            }
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

  handleUpload = (e, file, nameFile) => {
    let fileSelect = e.target.files[0]
    if (fileSelect.type.includes('image')) {
      e.preventDefault()
      this.setState({ [file]: fileSelect, [nameFile]: fileSelect.name })
      let reader = new FileReader()
      reader.readAsDataURL(fileSelect)
    }
  }
  handleSubmit = async () => {
    let {
      // vendor,
      // companyName,
      // companyLogo,
      // MRECode,
      // transmittalPrefix,
      // contractNumber,
      UserGroups,
      first_name,
      last_name,
      email,
      password,
      file,
      token,
      mobile,
      // organizationـlevel,
      personnel_code
    } = this.state
    const check =
      handleCheckText(first_name) &&
      handleCheckText(last_name) &&
      handleCheckText(password) &&
      handleCheckText(personnel_code) &&
      UserGroups.length > 0
    if (check && file !== '') {
      let _obj = Object.keys(UserGroups).map(data => {
        return UserGroups[data].value
      })
      await this.setState({ loading: true, disabled: true })
      let datareg = await new FormData()

      await datareg.append('first_name', first_name)
      await datareg.append('last_name', last_name)
      await datareg.append('email', handleCheckText(email) ? email : '-')
      await datareg.append('password', password)
      await datareg.append('mobile', handleCheckText(mobile) ? mobile : '-')
      await datareg.append('permission', _obj.join(','))
      await datareg.append('personnel_code', personnel_code)
      await datareg.append('sign', file)

      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/user/create`,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(response => {
          this.setState({ loading: false })
          if (response.status === 200) {
            Notification.notify(Message.text(903), 'success')
            setTimeout(() => {
              this.setState({ disabled: false, redirect: true })
            }, 5000)
          } else {
            this.setState({ disabled: false })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({ loading: false, disabled: false })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  render() {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return <Redirect to='/list-user' />
    } else
      return (
        <div className='main'>
          <div className='col-12 p-0'>
            <div className='row m-0'>
              <Sidebar
                handleState={(name, value) => this.setState({ [name]: value })}
              />
              <div
                className={`${this.state._close
                    ? 'mainSideClose'
                    : 'col-xl-10 col-lg-10 p-0'
                  } dashboard`}
              >
                <Menu nameRole='' nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>ایجاد کاربر جدید</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row justify-content-start persian'>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${this.state.foucs === 'first_name' ||
                                  handleCheckText(this.state.first_name)
                                  ? 'active'
                                  : ''
                                }`}
                            >
                              <label>
                                نام
                                <span className='star IranSans_Bold'>*</span>
                              </label>
                              <input
                                type='text'
                                name='first_name'
                                onFocus={e => this.OnFocus(e.target.name)}
                                onBlur={this.OnBlur}
                                onChange={this.handleChange}
                                value={handleString(this.state.first_name)}
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${this.state.foucs === 'last_name' ||
                                  handleCheckText(this.state.last_name)
                                  ? 'active'
                                  : ''
                                }`}
                            >
                              <label>
                                نام خانوادگی
                                <span className='star IranSans_Bold'>*</span>
                              </label>
                              <input
                                type='text'
                                name='last_name'
                                onFocus={e => this.OnFocus(e.target.name)}
                                onBlur={this.OnBlur}
                                onChange={this.handleChange}
                                value={handleString(this.state.last_name)}
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${this.state.foucs === 'email' ||
                                  handleCheckText(this.state.email)
                                  ? 'active'
                                  : ''
                                }`}
                            >
                              <div className='icon-field'>
                                <EmailIcon />
                              </div>
                              <div className='col p-0'>
                                <label>
                                  ایمیل
                                  {/* <span className='star IranSans_Bold'>*</span> */}
                                </label>
                                <input
                                  type='email'
                                  name='email'
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                  value={handleString(this.state.email)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${this.state.foucs === 'password' ||
                                  handleCheckText(this.state.password)
                                  ? 'active'
                                  : ''
                                }`}
                            >
                              <div className='icon-field'>
                                <LockIcon />
                              </div>
                              <div className='col p-0'>
                                <label>
                                  کلمه عبور
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  type='password'
                                  name='password'
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                  value={handleString(this.state.password)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${this.state.foucs === 'personnel_code' ||
                                  handleCheckText(this.state.personnel_code)
                                  ? 'active'
                                  : ''
                                }`}
                            >
                              <div className='icon-field'>
                                <PersonIcon />
                              </div>
                              <div className='col p-0'>
                                <label>
                                  کد پرسنلی
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  type='email'
                                  name='personnel_code'
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                  value={handleString(
                                    this.state.personnel_code
                                  )}
                                />
                              </div>
                            </div>
                          </div>

                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${this.state.foucs === 'mobile' ||
                                  handleCheckText(this.state.mobile)
                                  ? 'active'
                                  : ''
                                }`}
                            >
                              <div className='icon-field'>
                                <CallIcon />
                              </div>
                              <div className='col p-0'>
                                <label>شماره تماس</label>
                                <input
                                  type='email'
                                  name='mobile'
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                  value={handleString(this.state.mobile)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-12 col-md-12 col-12'>
                            <div className={`field-form persian`}>
                              <label>
                                نمونه امضا
                                <span className='star IranSans_Bold'>*</span>
                              </label>
                              <div className='allName col row m-0 justify-content-end'>
                                <span>{handleString(this.state.nameFile)}</span>
                              </div>
                              <input
                                className='d-none'
                                accept='image/*'
                                type='file'
                                id='upload-creater'
                                onChange={e =>
                                  this.handleUpload(e, 'file', 'nameFile')
                                }
                              />
                              <label
                                className='upload-label'
                                htmlFor='upload-creater'
                              >
                                <AttachFileIcon />
                                آپلود امضا
                              </label>
                            </div>
                          </div>
                          <div className='row m-0 w-100'>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div className='field-form selectBox'>
                                <CreatableSelect
                                  isMulti
                                  value={this.state.UserGroups}
                                  onChange={newValue =>
                                    this.setState({ UserGroups: newValue })
                                  }
                                  options={this.state.UserGroupsList}
                                  placeholder={
                                    <label>
                                      گروه های گاربری
                                      <span className='star IranSans_Bold'>
                                        *
                                      </span>
                                    </label>
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className='submit-form col-12'>
                            <button
                              onClick={this.handleSubmit}
                              disabled={this.state.disabled}
                            >
                              {this.state.loading ? (
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
