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
import AttachFileIcon from '@material-ui/icons/AttachFile'
import DateRangeIcon from '@material-ui/icons/DateRange'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import VisibilityIcon from '@material-ui/icons/VisibilityRounded'
import handleString from '../handleString'
import handleCheckText from '../handleCheckText'

export default class signatureMetting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      approvedBy: {
        first_name: '',
        last_name: '',
        sign: ''
      },
      confirmation: true,
      id: '',
      orders: [],
      signed: true,
      popUp: false,
      disabled: false,
      signStatus: false,
      NotAccepted: false,
      loading: ''
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - تاییدیه صورتجلسه نهایی`
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
        .get(`${StaticData.domainIp}/meeting/getSignDetail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(response => {
          if (response.status === 200) {
            let state = response.data.content
            state['approvedBy'] = response.data.userDetail
            this.setState(state)
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
  handleSubmit = async (reject_sign_message = '') => {
    let check = this.state.confirmation
      ? true
      : reject_sign_message.trim() !== ''
    if (check) {
      let datareg = new FormData()
      await datareg.append('id', this.state.id)
      await datareg.append('signStatus', this.state.confirmation)
      await datareg.append('reject_sign_message', reject_sign_message)
      await this.setState({
        loading: this.state.confirmation ? 'submit' : 'submit-unaccept',
        disabled: true
      })
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/meeting/signMeeting`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            Notification.notify(Message.text(906), 'success')
            this.setState({ popUp: false, NotAccepted: false })
            setTimeout(async () => {
              this.setState({ redirect: true, disabled: false })
            }, 5000)
          } else {
            this.setState({ disabled: false, popUp: false, NotAccepted: false })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({
            disabled: false,
            popUp: false,
            NotAccepted: false,
            loading: ''
          })
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
    } else {
      if (this.state.redirect) {
        return <Redirect to='index-metting' />
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
                          <h2>تاییدیه صورتجلسه نهایی</h2>
                        </div>
                        <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                          <div className='form row justify-content-start'>
                            {this.state.orders.length > 0 ? (
                              <div className='title-password col-12'>
                                <h2 className='IranSans_Bold'>
                                  دستورات و توافقات جلسه
                                </h2>
                                <div className='line'></div>
                              </div>
                            ) : (
                              ''
                            )}
                            {this.state.orders.map((data, key) => (
                              <div className='w-100 row m-0' key={key}>
                                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian textarea ${
                                      this.state.foucs === 'agenda' ||
                                      handleCheckText(data.description)
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
                                        name='agenda'
                                        value={handleString(data.description)}
                                        readOnly={true}
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                  <div className={`field-form persian`}>
                                    <label>پیوست ها</label>
                                    <div className='pl-1 allName col row m-0 justify-content-end'>
                                      {Object.keys(data.attachment).map(_ => {
                                        return data.attachment[_]
                                      }).length === 0 ? (
                                        <span>پیوست ندارد</span>
                                      ) : (
                                        Object.keys(data.attachment)
                                          .map(_ => {
                                            return data.attachment[_]
                                          })
                                          .map((link, ind) => (
                                            <a
                                              href={link}
                                              target='_blank'
                                              rel='noreferrer'
                                              key={ind}
                                            >
                                              <span>
                                                {handleString(data.attachmentName[ind])}
                                                <VisibilityIcon className='ml-1' />
                                              </span>
                                            </a>
                                          ))
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian ${
                                      handleCheckText(data.responsible)
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
                                    <input
                                      readOnly={true}
                                      value={handleString(data.responsible)}
                                    />
                                  </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian field-clock ${
                                      handleCheckText(data.duration)
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <div className='icon-field'>
                                      <DateRangeIcon />
                                    </div>
                                    <div className='col p-0'>
                                      <label>
                                        زمان تقریبی
                                        <span className='star IranSans_Bold'>
                                          *
                                        </span>
                                      </label>
                                      <input
                                        readOnly={true}
                                        value={handleString(data.duration)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian textarea ${
                                      handleCheckText(data.agreement_description)
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <div className='col p-0'>
                                      <label className='textarea'>
                                        شرح توافقات
                                      </label>
                                      <textarea
                                        className='w-100'
                                        type='text'
                                        name={`agreement_description`}
                                        value={
                                          handleString(data.agreement_description)
                                        }
                                        readOnly={true}
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian ${
                                      handleCheckText(data.acting)
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <label>
                                      اقدام کننده
                                      <span className='star IranSans_Bold'>
                                        *
                                      </span>
                                    </label>
                                    <input
                                      readOnly={true}
                                      name={`acting`}
                                      value={handleString(data.acting)}
                                    />
                                  </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                  <div
                                    className={`field-form persian ${
                                       data.acting_date
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <div className='icon-field'>
                                      <DateRangeRoundedIcon />
                                    </div>
                                    <div className='col p-0'>
                                      <label>
                                        موعد انجام
                                        <span className='star IranSans_Bold'>
                                          *
                                        </span>
                                      </label>
                                      <input
                                        readOnly={true}
                                        name={`acting`}
                                        value={handleString(data.acting_date)}
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
                            <div className='title-password col-12'>
                              <h2 className='IranSans_Bold'>
                                حق امضا حاضرین جلسه
                              </h2>
                              <div className='line'></div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
                              <div className='field-radio w-100'>
                                <label>
                                  آیا صورتجلسه قابل تایید میباشید؟
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <div className='main-radio pr-0'>
                                  <div className='radio-button mr-1 ml-1'>
                                    {this.state.signStatus !== false ||
                                    this.state.disabled ? (
                                      ''
                                    ) : (
                                      <input
                                        className='d-none'
                                        type='radio'
                                        id='yes'
                                        onClick={() =>
                                          this.setState({ confirmation: true })
                                        }
                                      />
                                    )}
                                    <label htmlFor='yes'>
                                      {this.state.confirmation ? (
                                        <RadioButtonCheckedIcon />
                                      ) : (
                                        <RadioButtonUncheckedIcon />
                                      )}
                                      بله
                                    </label>
                                  </div>
                                  <div className='radio-button mr-1 ml-1'>
                                    {this.state.signStatus !== false ||
                                    this.state.disabled ? (
                                      ''
                                    ) : (
                                      <input
                                        className='d-none'
                                        type='radio'
                                        id='no'
                                        onClick={() =>
                                          this.setState({
                                            confirmation: false,
                                            popUp: true,
                                            NotAccepted: true
                                          })
                                        }
                                      />
                                    )}
                                    <label htmlFor='no'>
                                      {!this.state.confirmation ? (
                                        <RadioButtonCheckedIcon />
                                      ) : (
                                        <RadioButtonUncheckedIcon />
                                      )}
                                      خیر
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div className={`field-form persian`}>
                                <label>{`${this.state.approvedBy.first_name}  ${this.state.approvedBy.last_name}`}</label>
                                <label
                                  className='upload-label'
                                  onClick={() => this.setState({ popUp: true })}
                                >
                                  امضا
                                  <AttachFileIcon className='ml-0 mr-1' />
                                </label>
                              </div>
                            </div>
                            {!this.state.signed ? (
                              <div className='submit-form col-12'>
                                <button
                                  onClick={() => this.handleSubmit('')}
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
            {this.state.popUp ? (
              <Sign
                close={e =>
                  this.setState({
                    popUp: e,
                    NotAccepted: e,
                    confirmation: true
                  })
                }
                pictureShow={this.state.approvedBy.sign}
                NotAccepted={this.state.NotAccepted}
                handleSubmit={this.handleSubmit}
                loading={this.state.loading}
                disabled={this.state.disabled}
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
                  onClick={() => this.props.handleSubmit(this.state.errorText)}
                  disabled={
                    this.props.loading === 'submit-unaccept' ||
                    this.props.disabled
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
