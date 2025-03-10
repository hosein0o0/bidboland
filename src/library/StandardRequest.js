import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import axios from 'axios'
import DescriptionIcon from '@material-ui/icons/Description'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import StaticData from '../staticData'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
export default class StandardRequest extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      // category: [],
      // publisher: [],
      doc_publisher: '',
      doc_type: '',
      publish_year: '',
      doc_edition: '',
      foucs: '',
      loading: '',
      description: '',
      disabled: false,
      redirect: false
    }
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    const { value, maxLength, name } = e.target
    this.setState({
      [name]: maxLength !== -1 ? value.slice(0, maxLength) : value
    })
  }
  hadnleSubmit = async () => {
    const {
      doc_type,
      doc_publisher,
      publish_year,
      doc_edition,
      description
    } = this.state
    const check = doc_type || doc_publisher || publish_year || doc_edition
    if (check) {
      await this.setState({ loading: 'submit', disabled: true })
      let datareg = await new FormData()
      await datareg.append('doc_type', doc_type)
      await datareg.append('doc_publisher', doc_publisher)
      await datareg.append('publish_year', publish_year)
      await datareg.append('doc_edition', doc_edition)
      await datareg.append('description', description)
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/Library/requestStandard`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              await this.setState({ redirect: true, disabled: false })
            }, 5000)
          } else {
            await this.setState({ disabled: false })
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
    } else if (this.state.redirect) {
      return <Redirect to={`/dashboard_library`} />
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
                  nameRole='library_request_new_standard'
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>درخواست استاندارد جدید</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row justify-content-end'>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state.doc_type ||
                                this.state.foucs === 'doc_type'
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <div className='icon-field'>
                                <DescriptionIcon />
                              </div>
                              <div className='col p-0'>
                                <label>نوع سند</label>
                                <input
                                  type='text'
                                  name='doc_type'
                                  value={handleString(this.state.doc_type)}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state.foucs === 'doc_publisher' ||
                                this.state.doc_publisher
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <label>
                                ناشر سند
                                {/* <span className='star IranSans_Bold'>*</span> */}
                              </label>
                              <input
                                type='text'
                                name='doc_publisher'
                                value={handleString(this.state.doc_publisher)}
                                onFocus={e => this.OnFocus(e.target.name)}
                                onBlur={this.OnBlur}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state.publish_year ||
                                this.state.foucs === 'publish_year'
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <div className='icon-field'>
                                <DateRangeRoundedIcon />
                              </div>
                              <div className='col p-0'>
                                <label>
                                  سال انتشار
                                  {/* <span className='star IranSans_Bold'>*</span> */}
                                </label>
                                <input
                                  type='number'
                                  name='publish_year'
                                  value={handleString(this.state.publish_year)}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                  maxLength={4}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state.foucs === 'doc_edition' ||
                                this.state.doc_edition
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <label>
                                شماره ویرایش سند
                                {/* <span className='star IranSans_Bold'>*</span> */}
                              </label>
                              <input
                                type='text'
                                name='doc_edition'
                                value={handleString(this.state.doc_edition)}
                                onFocus={e => this.OnFocus(e.target.name)}
                                onBlur={this.OnBlur}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                            <div
                              className={`field-form persian textarea rtl ${
                                this.state.foucs === 'description' ||
                                handleCheckText(this.state.description)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <div className='col p-0'>
                                <label className='textarea'>شرح درخواست</label>
                                <textarea
                                  className='w-100'
                                  type='text'
                                  name='description'
                                  value={handleString(this.state.description)}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div className='submit-form col-12 mt-4'>
                            <button
                              className='justify-content-start'
                              onClick={this.hadnleSubmit}
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
