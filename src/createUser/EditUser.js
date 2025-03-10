import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import EmailIcon from '@material-ui/icons/Email'
// import LockIcon from '@material-ui/icons/Lock'
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
export default class EditUser extends Component {
  constructor (props) {
    super(props)
    // handleCheckText = HandleCheckText.handleCheckText
    this.Reset = null
    this.state = {
      foucs: '',
      token: Cookies.get('token'),
      loading: false,
      sign: '',
      nameSign: null,
      disabled: false,
      redirect: false,
      permissionList: [],
      selectedPermission: [],
      id: '',
      password: '',
      organizationـlevel: '',
      personnel_code: ''
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ویرایش کاربر`
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    this.setState({ id: id })
    if (id) {
      this.fetchDate(id)
    }
  }
  fetchDate = id => {
    const { token } = this.state
    if (token) {
      const url = `${StaticData.domainIp}/user/getDetailForUpdate/${id}`
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(async response => {
          if (response.status === 200) {
            const { content, role } = response.data
            const { userDetail, disabled } = content
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
            let obj1 = {
              permissionList: handleArra(content.permissionList, 1),
              selectedPermission: handleArra(content.selectedPermission, -1),
              role: role,
              checkDisabeld: disabled
            }
            userDetail['hasurl'] = userDetail.sign ? true : false
            const merge = await { ...obj1, ...userDetail }
            await this.setState(merge)
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

  handleUpload = (e, sign, nameSign) => {
    let signSelect = e.target.files[0]
    if (signSelect.type.includes('image')) {
      e.preventDefault()
      this.setState({ [sign]: signSelect, [nameSign]: signSelect.name })
      let reader = new FileReader()
      reader.readAsDataURL(signSelect)
    }
  }
  handleSubmit = async () => {
    let {
      selectedPermission,
      first_name,
      last_name,
      email,
      // password,
      sign,
      token,
      mobile,
      id,
      personnel_code
    } = this.state
    const check =
      handleCheckText(first_name) &&
      handleCheckText(last_name) &&
      handleCheckText(personnel_code) &&
      selectedPermission.length > 0
    if (check && handleCheckText(id)) {
      let _obj = Object.keys(selectedPermission).map(data => {
        return selectedPermission[data].value
      })
      await this.setState({ loading: 'submit', disabled: true })
      let datareg = await new FormData()
      await datareg.append('first_name', first_name)
      await datareg.append('last_name', last_name)
      await datareg.append('email', handleCheckText(email) ? email : '-')
      // await datareg.append('password', password)
      await datareg.append('permission', _obj.join(','))
      await datareg.append('personnel_code', personnel_code)
      await datareg.append('mobile', handleCheckText(mobile) ? mobile : '-')
      if (typeof sign === 'object') {
        await datareg.append('sign', sign)
      }
      const url = `${StaticData.domainIp}/user/update/${id}`
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            Notification.notify(Message.text(904), 'success')
            setTimeout(() => {
              this.setState({ disabled: false, redirect: true })
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
  handleLinkSign = () => {
    const { sign, nameSign } = this.state
    if (sign) {
      if (typeof sign === 'string') {
        return (
          <a href={sign} target='_blank' rel='noreferrer'>
            <span>نمونه امضا انتخاب شده</span>
          </a>
        )
      } else {
        return <span>{nameSign}</span>
      }
    } else return ''
  }
  handleHieght = () => {
    const { selectedPermission } = this.state
    let result = selectedPermission ? selectedPermission.length > 0 : false
    return result
  }
  render () {
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
                        <h2>ویرایش کاربر</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row justify-content-start persian'>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state.foucs === 'first_name' ||
                                this.state.first_name
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
                              className={`field-form persian ${
                                this.state.foucs === 'last_name' ||
                                this.state.last_name
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
                              className={`field-form persian ${
                                this.state.foucs === 'email' || this.state.email
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
                          {/* <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state.foucs === 'password' ||
                                this.state.password
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <div className='icon-field'>
                                <LockIcon />
                              </div>
                              <div className='col p-0'>
                                <label>کلمه عبور</label>
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
                          </div> */}
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state.foucs === 'personnel_code' ||
                                this.state.personnel_code
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
                                  type='number'
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
                              className={`field-form persian ${
                                this.state.foucs === 'mobile' ||
                                this.state.mobile
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
                                  //   type='email'
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
                                {this.handleLinkSign()}
                              </div>
                              <input
                                className='d-none'
                                accept='image/*'
                                type='file'
                                id='upload-creater'
                                onChange={e =>
                                  this.handleUpload(e, 'sign', 'nameSign')
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
                              <div
                                className={`field-form selectBox ${
                                  this.handleHieght() ? 'h-auto' : ''
                                }`}
                              >
                                <CreatableSelect
                                  isMulti
                                  value={this.state.selectedPermission}
                                  onChange={newValue =>
                                    this.setState({
                                      selectedPermission: newValue
                                    })
                                  }
                                  isDisabled={
                                    this.state.checkDisabeld ? true : false
                                  }
                                  options={this.state.permissionList}
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
