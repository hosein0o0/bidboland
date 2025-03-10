import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded'
import axios from 'axios'
import StaticData from '../staticData'
import DeleteIcon from '@material-ui/icons/Delete'
import BackupIcon from '@material-ui/icons/Backup'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
export default class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      foucs: '',
      token: Cookies.get('token'),
      loading: '',
      file: '',
      path: '',
      userDetail: {},
      email: '',
      readeOnly: true,
      mobile: '',
      Signature: '',
      popUp: false,
      profile: ''
    }
  }
  componentDidMount () {
    if (Cookies.get('userDetail')) {
      let obj = JSON.parse(Cookies.get('userDetail'))
      this.setState({
        userDetail: obj,
        mobile: obj.mobile,
        Signature: `${obj.first_name} ${obj.last_name}`,
        path: obj.profile
      })
    }
    document.title = `${StaticData.Title} - ویرایش کاربر`
    this.GetEmail()
  }
  GetEmail = () => {
    if (this.state.token) {
      axios
        .get(`${StaticData.domainIp}/user/getEmail`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(async response => {
          if (response.status === 200) {
            this.setState({ email: response.data.content })
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
    this.setState({ foucs: '', readeOnly: true })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: handleString(e.target.value) })
  }
  handleUpload = async e => {
    await e.preventDefault()
    let path = await ''
    const file = await e.target.files[0]
    let reader = await new FileReader()
    reader.onloadend = async () => {
      path = await reader.result
    }
    this.setState({ loading: 'profile' })
    await reader.readAsDataURL(file)
    let datareg = await new FormData()
    await datareg.append('profile', e.target.files[0])
    await axios({
      method: 'post',
      url: `${StaticData.domainIp}/user/updateProfilePic`,
      data: datareg,
      headers: {
        Authorization: this.state.token ? `Bearer ${this.state.token}` : null
      }
    })
      .then(response => {
        if (response.statusText === 'OK' && response.status === 200) {
          this.setState({ file: file, path: path, loading: '' })
          Cookies.set('userDetail', JSON.stringify(response.data.userDetail))
          setTimeout(() => {
            window.location.reload(true)
          }, 100)
        } else {
          Notification.notify(Message.text(response.status), 'error')
          this.setState({ file: '', path: '', loading: '' })
        }
      })
      .catch(err => {
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  DeleteProfile = () => {
    this.setState({ loading: 'delete' })
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/user/deleteProfilePic`,
      data: '',
      headers: {
        Authorization: this.state.token ? `Bearer ${this.state.token}` : null
      }
    })
      .then(response => {
        if (response.status === 200 && response.statusText === 'OK') {
          Cookies.set('userDetail', JSON.stringify(response.data.userDetail))
          this.setState({ file: '', path: '', loading: '' })
          window.location.reload(true)
        } else {
          this.setState({ loading: '' })
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
  handleEdit = () => {
    this.setState({ readeOnly: false })
    this.refs.mobile.focus()
  }
  handleSubmit = () => {
    this.setState({ loading: 'submit' })
    let datareg = new FormData()
    datareg.append('mobile', this.state.mobile)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/user/updateProfile`,
      data: datareg,
      headers: {
        Authorization: this.state.token ? `Bearer ${this.state.token}` : null
      }
    })
      .then(response => {
        if (response.status === 200 && response.statusText === 'OK') {
          Notification.notify(Message.text(906), 'success')
          setTimeout(() => {
            Cookies.set('userDetail', JSON.stringify(response.data.userDetail))
            window.location.reload(true)
            this.setState({ loading: '' })
          }, 5000)
        } else {
          this.setState({ loading: '' })
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
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
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
                <Menu
                  nameRole='Home'
                  vendor={true}
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>ویرایش پروفایل</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row justify-content-start'>
                          <div className='col-12'>
                            <div className='field-avatar'>
                              <div className='w-100'>
                                <label className='IranSans_Bold'>
                                  تصویر پروفایل
                                </label>
                              </div>
                              <div className='avatar'>
                                <div className='picture'>
                                  {this.state.path === null ||
                                  this.state.path === '' ? (
                                    <PersonRoundedIcon />
                                  ) : (
                                    <img src={this.state.path} alt='avatar' />
                                  )}
                                </div>
                              </div>
                              <div className='upload-image'>
                                <input
                                  type='file'
                                  className='d-none'
                                  id='ulpoadFile'
                                  onChange={this.handleUpload}
                                />
                                <label htmlFor='ulpoadFile'>
                                  {this.state.loading === 'profile' ? (
                                    <Loading className='form-loader upload' />
                                  ) : (
                                    <BackupIcon />
                                  )}
                                  آپلود تصویر پروفایل
                                </label>
                              </div>
                              {this.state.path === '' ||
                              this.state.path === null ? (
                                ''
                              ) : (
                                <div
                                  className='delete-avatar'
                                  onClick={this.DeleteProfile}
                                >
                                  {this.state.loading === 'delete' ? (
                                    <Loading className='form-loader delete-profile' />
                                  ) : (
                                    <DeleteIcon />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div className={`field-form persian active`}>
                              <label>نام</label>
                              <input
                                value={handleString(
                                  `${this.state.userDetail.first_name} ${this.state.userDetail.last_name}`
                                )}
                                readOnly={true}
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div className={`field-form persian active`}>
                              <label>ایمیل</label>
                              <input
                                value={handleString(this.state.email)}
                                readOnly={true}
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state.foucs === 'mobile' ||
                                handleCheckText(this.state.mobile)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <label>شماره همراه</label>
                              <input
                                name='mobile'
                                onFocus={this.OnFocus}
                                onBlur={this.OnBlur}
                                value={handleString(this.state.mobile)}
                                readOnly={this.state.readeOnly ? true : false}
                                onChange={this.handleChange}
                                ref='mobile'
                              />
                              <div className='edit' onClick={this.handleEdit}>
                                <span>
                                  <EditIcon />
                                  ویرایش
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div className={`field-form persian active`}>
                              <label>امضا</label>
                              <input
                                value={handleString(this.state.Signature)}
                                readOnly={true}
                              />
                              <div
                                className='Signature'
                                onClick={this.handleEdit}
                              >
                                <span
                                  onClick={() => this.setState({ popUp: true })}
                                >
                                  <VisibilityIcon />
                                  مشاهده امضا
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='submit-form col-12 mt-4'>
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
                        {/* <ChangePassword /> */}
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
              userDetail={this.state.userDetail}
            />
          ) : (
            ''
          )}
        </div>
      )
  }
}
// class ChangePassword extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       foucs: '',
//       loading: false,
//       newPassword: '',
//       ReplayPassword: '',
//       CurrentPassword: '',
//       disabled: false,
//       token: Cookies.get('token')
//     }
//   }
//   OnFocus = name => {
//     this.setState({ foucs: name })
//   }
//   OnBlur = () => {
//     this.setState({ foucs: '', readeOnly: true })
//   }
//   handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value })
//   }
//   SubmitPassword = () => {
//     if (
//       handleCheckText(this.state.CurrentPassword) &&
//       handleCheckText(this.state.newPassword) &&
//       handleCheckText(this.state.ReplayPassword) &&
//       this.state.newPassword === this.state.ReplayPassword
//     ) {
//       this.setState({ loading: true, disabled: true })
//       let datareg = new FormData()
//       datareg.append('current_password', this.state.CurrentPassword)
//       datareg.append('new_password', this.state.newPassword)
//       axios({
//         method: 'post',
//         url: `${StaticData.domainIp}/user/changePassword`,
//         data: datareg,
//         headers: {
//           Authorization: this.state.token ? `Bearer ${this.state.token}` : null
//         }
//       })
//         .then(response => {
//           this.setState({ disabled: false })
//           if (response.status === 200 && response.statusText === 'OK') {
//             Notification.notify(Message.text(906), 'success')
//             setTimeout(() => {
//               this.setState({ loading: false, disabled: false })
//               Cookies.remove('userDetail')
//               Cookies.remove('token')
//               window.location.reload(true)
//             }, 5000)
//           } else {
//             Notification.notify(Message.text(response.status), 'error')
//             this.setState({ loading: false, disabled: false })
//           }
//         })
//         .catch(err => {
//           this.setState({ loading: false, disabled: false })
//           if (err.response) {
//             Notification.notify(Message.text(err.response.status), 'error')
//           }
//         })
//     } else {
//       alert('لطفا مقادیر را به درستی وارد کنید')
//     }
//   }
//   render () {
//     return (
//       <React.Fragment>
//         <div className='form row justify-content-start persian'>
//           <div className='title-password col-12'>
//             <h2 className='IranSans_Bold'>تغییر رمز عبور</h2>
//             <div className='line'></div>
//           </div>
//           <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//             <div
//               className={`field-form persian ${
//                 this.state.foucs === 'newPassword' ||
//                  handleCheckText(this.state['newPassword'])
//                   ? 'active'
//                   : ''
//               }`}
//             >
//               <label>
//                 رمز عبور جدید
//                 <span className='star IranSans_Bold'>*</span>
//               </label>
//               <input
//                 name='newPassword'
//                 onFocus={e => this.OnFocus(e.target.name)}
//                 onBlur={this.OnBlur}
//                 onChange={this.handleChange}
//               />
//             </div>
//           </div>
//           <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//             <div
//               className={`field-form persian ${
//                 this.state.foucs === 'ReplayPassword' ||
//                 handleCheckText(this.state['ReplayPassword'])
//                   ? 'active'
//                   : ''
//               }`}
//             >
//               <label>
//                 تکرار رمز عبور جدید
//                 <span className='star IranSans_Bold'>*</span>
//               </label>
//               <input
//                 name='ReplayPassword'
//                 onFocus={e => this.OnFocus(e.target.name)}
//                 onBlur={this.OnBlur}
//                 onChange={this.handleChange}
//               />
//             </div>
//           </div>
//           <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
//             <div
//               className={`field-form persian ${
//                 this.state.foucs === 'CurrentPassword' ||
//                 handleCheckText(this.state['CurrentPassword'])
//                   ? 'active'
//                   : ''
//               }`}
//             >
//               <label>
//                 رمز عبور قبلی
//                 <span className='star IranSans_Bold'>*</span>
//               </label>
//               <input
//                 name='CurrentPassword'
//                 onFocus={e => this.OnFocus(e.target.name)}
//                 onBlur={this.OnBlur}
//                 onChange={this.handleChange}
//               />
//             </div>
//           </div>
//           <div className='submit-form passwrod col-12 mt-4'>
//             <button
//               onClick={this.SubmitPassword}
//               disabled={this.state.disabled}
//             >
//               {this.state.loading ? (
//                 <Loading className='form-loader' />
//               ) : (
//                 <DoneIcon />
//               )}
//               ثبت اطلاعات
//             </button>
//           </div>
//         </div>
//       </React.Fragment>
//     )
//   }
// }
class Sign extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div className='backGroundPopup' onClick={() => this.props.close(false)}>
        <div className='col-xl-6 col-lg-10 col-12'>
          {this.props.userDetail.sign ? (
            <img src={this.props.userDetail.sign} alt='sign' />
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}
