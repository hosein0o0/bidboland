import React, { Component } from 'react'
import Menu from '../layout/menu'
import Sidebar from '../layout/sidebar'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import PeopleIcon from '@material-ui/icons/People'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CreatableSelect from 'react-select/creatable'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import DateRangeIcon from '@material-ui/icons/DateRange'
// import getCustomFormat from '../getCustomFormat'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'
export default class ViewProceedings extends Component {
  constructor (props) {
    super(props)
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.startHourOpen = null
    this.endHourOpen = null
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      startHour: '',
      endHour: '',
      subjectMeeting: '',
      redirect: false,
      date: '',
      keywords: [],
      keywordsSelected: [],
      wbs: [],
      wbsSelected: '',
      userDetail: {
        first_name: '',
        last_name: '',
        sign: ''
      },
      address: [],
      addressSelected: '',
      attendees: [],
      attendeesSelected: [],
      meetingType: [],
      meetingTypeSelected: '',
      leader: [],
      leaderSelected: '',
      meetingOrders: [],
      popUp: false,
      disabled: false,
      NotAccepted: false,
      loading: '',
      id: '',
      linkAdress: ''
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - مشاهده صورت جلسه`
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    this.setState({ id: id })
    this.fetchData(id)
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  fetchData = id => {
    if (this.state.token) {
      axios
        .get(`${StaticData.domainIp}/meeting/getPart1Detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(async response => {
          if (response.status === 200) {
            this.setState({
              addressSelected: response.data.content.address.value,
              address: response.data.content.firstDetail.address,
              subjectMeeting: response.data.content.subject,
              date: response.data.content.holdingTime
                ? response.data.content.holdingTime
                : '',
              startHour: response.data.content.startHour,
              endHour: response.data.content.endHour,
              leaderSelected: response.data.content.leader.value,
              leader: response.data.content.firstDetail.leader,
              meetingTypeSelected: response.data.content.meetingType.value,
              meetingType: response.data.content.firstDetail.meetingType,
              attendeesSelected: response.data.content.attendees,
              attendees: response.data.content.firstDetail.attendees,
              meetingOrders: Object.keys(
                response.data.content.meetingOrders
              ).map(_ => {
                response.data.content.meetingOrders[_].attachment = Object.keys(
                  response.data.content.meetingOrders[_].attachment
                ).map(data => {
                  return response.data.content.meetingOrders[_].attachment[data]
                })
                return response.data.content.meetingOrders[_]
              }),
              keywordsSelected: response.data.content.keywords,
              keywords: response.data.content.firstDetail.keywords,
              userDetail: response.data.userDetail,
              linkAdress:
                response.data.content.meetingType.value === 'مجازی'
                  ? response.data.content.address
                  : ''
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
  handleSubmit = async (status, message = '') => {
    if (this.state.token) {
      let datareg = new FormData()
      await datareg.append('verify', status === 1 ? true : false)
      await datareg.append('message', message)
      if (status === 1) {
        await this.setState({ loading: 'submit' })
      } else if (status === 0) {
        await this.setState({ loading: 'submit-unaccept' })
      }
      await this.setState({ disabled: true })
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/meeting/verifyFirstStep/${this.state.id}`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          await this.setState({ loading: '', popUp: false, NotAccepted: false })
          if (response.status === 200) {
            Notification.notify(Message.text(914), 'success')
            setTimeout(async () => {
              this.setState({
                redirect: true,
                disabled: false
              })
            }, 5000)
          } else {
            this.setState({ disabled: false })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(async err => {
          await this.setState({ loading: '', popUp: false, disabled: false })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      if (this.state.redirect) {
        return <Redirect to='/index-metting' />
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
                  <Menu nameRole='Home' nameUrl={this.props.nameUrl} />
                  <div className='w-100 row m-0 main-box-dashboard'>
                    <div className='boxes-dashboard row m-0 p-0'>
                      <div className='main-form'>
                        <div className='title-from'>
                          <h2>مشاهده صورتجلسه</h2>
                        </div>
                        <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                          <div className='form row justify-content-start'>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  this.state.subjectMeeting !== ''
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  موضوع جلسه
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='text-right'
                                  name='subjectMeeting'
                                  value={handleString(
                                    this.state.subjectMeeting
                                  )}
                                  readOnly={true}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian ${
                                  this.state.date && this.state.date !== ''
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <div className='icon-field'>
                                  <DateRangeRoundedIcon />
                                </div>
                                <div className='col p-0'>
                                  <label>
                                    زمان برگزاری
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
                                className={`field-form clock persian ${
                                  this.state.startHour &&
                                  this.state.startHour !== ''
                                    ? 'active'
                                    : ''
                                }`}
                                ref='startHourOpen'
                              >
                                <div className='icon-field'>
                                  <QueryBuilderIcon />
                                </div>
                                <div className='col p-0 ltr'>
                                  <label>ساعت شروع</label>
                                  <input
                                    name='startHour'
                                    value={handleString(this.state.startHour)}
                                    readOnly={true}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form clock persian ${
                                  this.state.endHour &&
                                  this.state.endHour !== ''
                                    ? 'active'
                                    : ''
                                }`}
                                ref='endHourOpen'
                              >
                                <div className='icon-field'>
                                  <QueryBuilderIcon />
                                </div>
                                <div className='col p-0 ltr'>
                                  <label>ساعت خاتمه</label>
                                  <input
                                    name='endHour'
                                    value={handleString(this.state.endHour)}
                                    readOnly={true}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian pl-1 ${
                                  this.state.leaderSelected !== ''
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  دبیر جلسه
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <select
                                  name={`leaderSelected`}
                                  value={this.state.leaderSelected}
                                  disabled={true}
                                >
                                  <option className='d-none'></option>
                                  {this.state.leader.map((data3, index2) => (
                                    <option key={index2} value={data3.value}>
                                      {data3.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian pl-1 ${
                                  this.state.meetingTypeSelected !== ''
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  نحوه برگزاری
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <select
                                  name={`meetingTypeSelected`}
                                  value={this.state.meetingTypeSelected}
                                  disabled={true}
                                >
                                  <option className='d-none'></option>
                                  {this.state.meetingType.map(
                                    (data2, index1) => (
                                      <option key={index1} value={data2.value}>
                                        {data2.label}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div className='field-form selectBox'>
                                <div className='icon-field'>
                                  <PeopleIcon />
                                </div>
                                <div className='col p-0'>
                                  <CreatableSelect
                                    value={this.state.attendeesSelected}
                                    readOnly={true}
                                    disabled={true}
                                    isMulti
                                    options={this.state.attendees}
                                    placeholder={
                                      <label>
                                        حاضرین
                                        <span className='star IranSans_Bold'>
                                          *
                                        </span>
                                      </label>
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div
                                className={`field-form persian pl-1 ${
                                  this.state.addressSelected !== '' ||
                                  this.state.linkAdress !== ''
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <div className='icon-field'>
                                  <LocationOnIcon />
                                </div>
                                <div className='col p-0'>
                                  <label>
                                    آدرس
                                    {this.state.meetingTypeSelected ===
                                    'مجازی' ? (
                                      ''
                                    ) : (
                                      <span className='star IranSans_Bold'>
                                        *
                                      </span>
                                    )}
                                  </label>
                                  {this.state.meetingTypeSelected ===
                                  'مجازی' ? (
                                    <input
                                      className='text-right'
                                      name='linkAdress'
                                      value={handleString(
                                        this.state.linkAdress
                                      )}
                                      readOnly={true}
                                    />
                                  ) : (
                                    <select
                                      name={`addressSelected`}
                                      value={this.state.addressSelected}
                                      disabled={true}
                                    >
                                      <option className='d-none'></option>
                                      {this.state.address.map((data, key) => (
                                        <option key={key} value={data.value}>
                                          {data.label}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className='title-password col-12'>
                              <h2 className='IranSans_Bold'>دستورات جلسه</h2>
                              <div className='line'></div>
                            </div>
                            {this.state.meetingOrders.map((metting, _index) => (
                              <div className='w-100 row m-0' key={_index}>
                                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian textarea ${
                                      handleCheckText(metting.description)
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <div className='col p-0'>
                                      <label className='textarea'>
                                        دستور جلسه
                                        <span className='star IranSans_Bold'>
                                          *
                                        </span>
                                      </label>
                                      <textarea
                                        className='w-100'
                                        type='text'
                                        name={`description_${_index}`}
                                        value={handleString(
                                          metting.description
                                        )}
                                        readOnly={true}
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                  <div className={`field-form persian`}>
                                    <label>تصویر پیوست</label>
                                    <div className='allName col row m-0 justify-content-end pl-2'>
                                      {metting.attachment.map((name, key) => (
                                        <a
                                          href={name}
                                          target='_blank'
                                          rel='noreferrer'
                                          key={key}
                                        >
                                          <span>
                                            {handleString(
                                              metting.attachmentName[key]
                                            )}
                                          </span>
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian ${
                                      handleCheckText(metting.responsible)
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <label>
                                      مطرح کننده
                                      <span className='star IranSans_Bold'>
                                        *
                                      </span>
                                    </label>
                                    <select
                                      name={`responsible_${_index}`}
                                      value={handleString(metting.responsible)}
                                      disabled={true}
                                    >
                                      <option className='d-none'></option>
                                      <option value='کارفرما'>کارفرما</option>
                                      <option value='مشارکت'>مشارکت</option>
                                      <option value='مشاور'>مشاور</option>
                                      <option value='سازنده'>سازنده</option>
                                      <option value='شخص ثالث'>شخص ثالث</option>
                                      <option value='پیمانکار فرعی'>
                                        پیمانکار فرعی
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian field-clock ${
                                      handleCheckText(metting.duration)
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <div className='icon-field'>
                                      <DateRangeIcon />
                                    </div>
                                    <div className='col p-0'>
                                      <label>
                                        زمان تقریبی (بر حسب دقیقه)
                                        <span className='star IranSans_Bold'>
                                          *
                                        </span>
                                      </label>
                                      <input
                                        name={`duration_${_index}`}
                                        value={handleString(metting.duration)}
                                        readOnly={true}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='col-12'>
                                  <div className='line'>
                                    <hr />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                              <div className='field-form selectBox'>
                                <CreatableSelect
                                  isMulti
                                  options={this.state.keywords}
                                  value={this.state.keywordsSelected}
                                  placeholder='تخصیص تگ'
                                  disabled={true}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form persian pl-1 ${
                                  this.state.wbsSelected ? 'active' : ''
                                }`}
                              >
                                <label>تخصیص سطح WBS</label>
                                <select
                                  name={`wbsSelected`}
                                  value={handleString(
                                    this.state.wbsSelected.value
                                  )}
                                  disabled={true}
                                >
                                  <option className='d-none'></option>
                                  {this.state.wbs.map((data, key) => (
                                    <option
                                      key={key}
                                      value={handleString(data.value)}
                                    >
                                      {handleString(data.label)}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div className={`field-form persian`}>
                                <label>
                                  {handleString(
                                    `${this.state.userDetail.first_name}  ${this.state.userDetail.last_name}`
                                  )}
                                </label>
                                <label
                                  className='upload-label'
                                  onClick={() => this.setState({ popUp: true })}
                                >
                                  امضا
                                  <AttachFileIcon className='ml-0 mr-1' />
                                </label>
                              </div>
                            </div>

                            <div className='submit-form col-12 mt-3 mb-3 justify-content-center'>
                              <button
                                className='mr-2 m-2 accept'
                                onClick={() => this.handleSubmit(1)}
                                disabled={this.state.disabled}
                              >
                                {this.state.loading === 'submit' ? (
                                  <Loading className='form-loader' />
                                ) : (
                                  <DoneIcon />
                                )}
                                تائید
                              </button>
                              <button
                                className='mr-2 m-2'
                                onClick={() =>
                                  this.setState({
                                    NotAccepted: true,
                                    popUp: true
                                  })
                                }
                                disabled={this.state.disabled}
                              >
                                <CloseRoundedIcon />
                                رد
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
            {this.state.popUp ? (
              <Sign
                close={e => this.setState({ popUp: e, NotAccepted: e })}
                pictureShow={this.state.userDetail.sign}
                NotAccepted={this.state.NotAccepted}
                handleSubmit={this.handleSubmit}
                loading={this.state.loading}
              />
            ) : (
              ''
            )}
          </div>
        )
    }
  }
}
class Sign extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorText: ''
    }
  }
  render () {
    return (
      <div
        className='backGroundPopup'
        onClick={() => (!this.props.NotAccepted ? this.props.close(false) : '')}
      >
        {this.props.NotAccepted ? (
          <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
            <div className='box-wellcome'>
              <div className='main-textarea'>
                <textarea
                  onChange={e =>
                    this.setState({ errorText: handleString(e.target.value) })
                  }
                  placeholder='لطفا دلیل خود را وارد کنید'
                  value={this.state.errorText}
                ></textarea>
              </div>
              <div className='buttons-wellcome justify-content-center'>
                <button
                  className='accept pt-0 pb-0'
                  onClick={() =>
                    this.state.errorText !== ''
                      ? this.props.handleSubmit(0, this.state.errorText)
                      : ''
                  }
                  disabled={
                    this.state.errorText === '' ||
                    this.props.loading === 'submit-unaccept'
                  }
                >
                  {this.props.loading === 'submit-unaccept' ? (
                    <Loading className='form-loader mr-0 ml-2' />
                  ) : (
                    <DoneIcon className='ml-2 mt-2 mb-2' />
                  )}
                  ثبت
                </button>
                <button
                  className='pt-0 pb-0'
                  onClick={() => this.props.close(false)}
                >
                  <CloseRoundedIcon className='ml-2' />
                  بستن
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='col-xl-6 col-lg-10 col-12'>
            <img src={this.props.pictureShow} alt='sign' />
          </div>
        )}
      </div>
    )
  }
}
