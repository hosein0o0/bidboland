import React, { Component } from 'react'
import Menu from '../layout/menu'
import Sidebar from '../layout/sidebar'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import Loading from '../layout/loading'
// import AttachFileIcon from '@material-ui/icons/AttachFile';
// import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import EmailIcon from '@material-ui/icons/Email'
import DoneIcon from '@material-ui/icons/Done'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
export default class Mokatebat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      name: '',
      tell: '',
      email: '',
      address: '',
      fax: '',
      loading: '',
      nameCopy: '',
      redirect: false,
      id: ''
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title}- ویرایش مخطبان`
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
        .get(`${StaticData.domainIp}/Contacts/getDetail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(async response => {
          if (response.status === 200) {
            const { content } = response.data
            content['nameCopy'] = await content.name
            await this.setState(content)
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
  handleSubmit = async () => {
    if (this.state.name && this.state.name !== '') {
      this.setState({ loading: 'submit' })
      let datareg = new FormData()
      await datareg.append('id', this.state.id)
      await datareg.append('name', this.state.name)
      await datareg.append('tell', this.state.tell)
      await datareg.append('email', this.state.email)
      await datareg.append('address', this.state.address)
      await datareg.append('fax', this.state.fax)
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/Contacts/update`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            Notification.notify(Message.text(904), 'success')
            setTimeout(async () => {
              await this.setState({ redirect: true })
            }, 5000)
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({ loading: '' })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
            if (err.response.status === 404) {
              this.setState({ back: true })
            }
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
        return <Redirect to='contact' />
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
                          <h2>
                            ویرایش مخاطب
                            {this.state.nameCopy
                              ? `-${this.state.nameCopy}`
                              : ''}
                          </h2>
                        </div>
                        <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                          <div className='form row justify-content-start'>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  this.state.foucs === `name` ||
                                  handleCheckText(this.state.name)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  نام
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='text-right'
                                  name='name'
                                  onChange={this.handleChange}
                                  onBlur={this.OnBlur}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  value={handleString(this.state.name)}
                                  readOnly={false}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  this.state.foucs === `tell` ||
                                  handleCheckText(this.state.tell)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>شماره تماس</label>
                                <input
                                  className='text-right'
                                  name='tell'
                                  value={handleString(this.state.tell)}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                />
                              </div>
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
                                  <EmailIcon />
                                </div>
                                <div className='col p-0'>
                                  <label className='textarea'>ایمیل</label>
                                  <input
                                    className='text-right'
                                    type='text'
                                    name={`email`}
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
                                className={`field-form persian ${
                                  this.state.foucs === `fax` ||
                                  handleCheckText(this.state.fax)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>فکس</label>
                                <input
                                  className='text-right'
                                  name='fax'
                                  onChange={this.handleChange}
                                  onBlur={this.OnBlur}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  value={handleString(this.state.fax)}
                                  readOnly={false}
                                />
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  this.state.foucs === `address` ||
                                  handleCheckText(this.state.address)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <div className='icon-field'>
                                  <LocationOnIcon />
                                </div>
                                <div className='col p-0'>
                                  <label className='textarea'>آدرس</label>
                                  <input
                                    className='text-right'
                                    type='text'
                                    name={`address`}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                    value={handleString(this.state.address)}
                                  />
                                </div>
                              </div>
                            </div>
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
