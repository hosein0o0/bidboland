import React, { Component } from 'react'
import Sidebar from '../../../../layout/sidebar'
import Menu from '../../../../layout/menu'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import StaticData from '../../../../staticData'
import Loading from '../../../../layout/loading'
import axios from 'axios'
import DoneIcon from '@material-ui/icons/Done'
import Permision from '../../../../permision/permision'
import Notification from '../../../../notification/notification'
import Message from '../../../../notification/Message'
import DatePicker from 'react-datepicker2'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import getCustomFormat from '../../../../getCustomFormat'
import handleCheckText from '../../../../handleCheckText'
import handleString from '../../../../handleString'
export default class Transmittal extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    // this.getCustomFormat = GetCustomFormat.getCustomFormat
    // handleCheckText = HandleCheckText.handleCheckText
    this.state = {
      token: Cookies.get('token'),
      checkPermision: false,
      documentNumber: '',
      activityName: '',
      _class: '',
      areaCode: '',
      docType: '',
      disc: '',
      phase: '',
      firstStepPlannedDate: undefined,
      foucs: '',
      loading: '',
      back: false,
      disabled: false
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ایجاد mdl`
    this.getRole()
  }
  getRole = () => {
    axios
      .get(`${StaticData.domainIp}/user/getRole`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(response => {
        if (response.data.role === 'vendor') {
          response.data.role = {
            vendor: 1
          }
        }
        if (response.status === 200) {
          if (this.Permision.handlePermision(response.data.role, 'vendor')) {
            this.setState({ checkPermision: false })
          } else {
            this.setState({ checkPermision: true })
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
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: handleString(e.target.value) })
    if (e.target.name === 'documentNumber') {
      let value = handleString(e.target.value).split('-')
      if (value.length > 0) {
        if (value[0] === '' && value.length === 1) {
          this.setState({
            docType: '',
            phase: '',
            areaCode: '',
            disc: ''
          })
        } else {
          if (value[1]) {
            this.setState({ phase: value[1] })
          }
          if (value[2]) {
            this.setState({ areaCode: value[2] })
          }
          if (value[3]) {
            this.setState({ disc: value[3] })
          }
          if (value[4]) {
            this.setState({ docType: value[4] })
          }
        }
      }
    }
  }
  handleSubmit = async (status = '') => {
    const {
      documentNumber,
      activityName,
      _class,
      areaCode,
      docType,
      disc,
      phase,
      firstStepPlannedDate,
      token
    } = this.state
    const Check =
      handleCheckText(documentNumber) &&
      handleCheckText(activityName) &&
      handleCheckText(_class) &&
      handleCheckText(areaCode) &&
      handleCheckText(docType) &&
      handleCheckText(disc) &&
      handleCheckText(phase)
    if (Check) {
      this.setState({ loading: 'submit', disabled: true })
      let datareg = new FormData()
      datareg.append('documentNumber', documentNumber)
      datareg.append('activityName', activityName)
      datareg.append('class', _class)
      datareg.append('areaCode', areaCode)
      datareg.append('docType', docType)
      datareg.append('disc', disc)
      datareg.append('phase', phase)
      datareg.append(
        'firstStepPlannedDate',
        getCustomFormat(firstStepPlannedDate, true)
      )
      axios({
        method: 'post',
        url: `${StaticData.domainIp}/mdl/create`,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              if (status === 'continue') {
                await this.setState({ disabled: false })
                window.location.reload(true)
              } else {
                await this.setState({ redirect: true, disabled: false })
              }
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
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.checkPermision) {
      return <Redirect to={`/purchase-engineering`} />
    } else {
      if (this.state.redirect) {
        return <Redirect to={`/dcc`} />
      } else {
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
                          <h2>مدارک مهندسی سازندگان</h2>
                        </div>
                        <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                          <div className='form row justify-content-end'>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  this.state.foucs === 'documentNumber' ||
                                  handleCheckText(this.state.documentNumber)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Documnet Number
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='text-left ltr'
                                  name='documentNumber'
                                  value={handleString(
                                    this.state.documentNumber
                                  )}
                                  onChange={this.handleChange}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  this.state.foucs === 'activityName' ||
                                  handleCheckText(this.state.activityName)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Document Title
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='text-left ltr'
                                  name='activityName'
                                  value={handleString(this.state.activityName)}
                                  onChange={this.handleChange}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  this.state.foucs === '_class' ||
                                  handleCheckText(this.state._class)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Class
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='text-left ltr'
                                  name='_class'
                                  value={handleString(this.state._class)}
                                  onChange={this.handleChange}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.areaCode)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Area Code
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='text-left ltr'
                                  name='areaCode'
                                  value={handleString(this.state.areaCode)}
                                  readOnly={true}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.docType)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Doc Type
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='text-left ltr'
                                  name='docType'
                                  value={handleString(this.state.docType)}
                                  readOnly={true}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.disc)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Disc
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='text-left ltr'
                                  name='disc'
                                  value={handleString(this.state.disc)}
                                  readOnly={true}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  handleCheckText(this.state.phase)
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <label>
                                  Phase
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='text-left ltr'
                                  name='phase'
                                  value={handleString(this.state.phase)}
                                  readOnly={true}
                                />
                              </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                              <div
                                className={`field-form ${
                                  this.state.foucs === `firstStepPlannedDate` ||
                                  this.state.firstStepPlannedDate
                                    ? 'active'
                                    : ''
                                }`}
                              >
                                <div className='icon-field'>
                                  <DateRangeRoundedIcon />
                                </div>
                                <div className='col p-0'>
                                  <label>Planned Issue Date</label>
                                  <DatePicker
                                    className='ltr text-left'
                                    persianDigits={true}
                                    isGregorian={true}
                                    timePicker={false}
                                    onChange={firstStepPlannedDate =>
                                      this.setState({ firstStepPlannedDate })
                                    }
                                    value={this.state.firstStepPlannedDate}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='submit-form col-12 mt-5'>
                              <button
                                className='ml-3 continue justify-content-center mr-2'
                                onClick={() => this.handleSubmit('continue')}
                                disabled={this.state.disabled}
                              >
                                {this.state.loading === 'submit-continue' ? (
                                  <Loading className='form-loader mr-0 ml-1' />
                                ) : (
                                  <DoneIcon className='mr-0 ml-1' />
                                )}
                                ثبت و ادامه
                              </button>
                              <button
                                className='justify-content-center ml-2'
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
}
