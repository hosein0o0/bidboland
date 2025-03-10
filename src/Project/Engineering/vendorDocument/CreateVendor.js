import React, { Component } from 'react'
import Sidebar from '../../../layout/sidebar'
import Menu from '../../../layout/menu'
import { Redirect } from 'react-router-dom'
// import AddIcon from '@material-ui/icons/Add';
// import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import Cookies from 'js-cookie'
import StaticData from '../../../staticData'
// import AttachFileIcon from '@material-ui/icons/AttachFile';
// import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Loading from '../../../layout/loading'
// import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'
import DoneIcon from '@material-ui/icons/Done'
// import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Permision from '../../../permision/permision'
// import CreatableSelect from 'react-select/creatable';
import Notification from '../../../notification/notification'
import Message from '../../../notification/Message'
import DatePicker from 'react-datepicker2'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import getCustomFormat from '../../../getCustomFormat'
import CancelButton from '../../../layout/CancelButton'
import handleCheckText from '../../../handleCheckText'
import handleString from '../../../handleString'
export default class CreateVendorDocument extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.state = {
      token: Cookies.get('token'),
      checkPermision: false,
      documentNumber: '',
      vendor_name: '',
      activityName: '',
      class: '',
      areaCode: '',
      docType: '',
      disc: '',
      phase: '',
      firstStepPlannedDate: undefined,
      wf: '',
      foucs: '',
      loading: '',
      orginal_document_number: '',
      disabled: false
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - مدارک مهندسی سازندگان`
    // this.getRole()
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.status
    ) {
      this.setState({
        orginal_document_number: this.props.location.state.status
      })
    } else {
      this.setState({ redirect: true })
    }
  }
  getRole = (response, status) => {
    if (status === 'response') {
      if (response.status === 200) {
        this.setState({ checkPermision: response.data.role === 'vendor' })
      } else {
        Notification.notify(Message.text(response.status), 'error')
      }
    } else {
      if (response.response) {
        Notification.notify(Message.text(response.response.status), 'error')
      }
    }
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
  Reset = () => {
    let state = {
      token: Cookies.get('token'),
      checkPermision: false,
      documentNumber: '',
      activityName: '',
      firstStepPlannedDate: undefined,
      loading: '',
      back: false,
      disabled: false
    }
    this.setState(state)
  }
  handleSubmit = async (status = '') => {
    if (
      this.state.documentNumber !== '' &&
      this.state.activityName !== '' &&
      this.state.firstStepPlannedDate &&
      this.state.orginal_document_number !== ''
    ) {
      this.setState({ loading: 'submit', disabled: true })
      let datareg = new FormData()
      datareg.append('documentNumber', this.state.documentNumber)
      datareg.append(
        'orginal_document_number',
        this.state.orginal_document_number
      )
      datareg.append('vendor_name', this.state.vendor_name)
      datareg.append('activityName', this.state.activityName)
      datareg.append('class', this.state.class)
      datareg.append('areaCode', this.state.areaCode)
      datareg.append('docType', this.state.docType)
      datareg.append('disc', this.state.disc)
      datareg.append('phase', this.state.phase)
      datareg.append(
        'firstStepPlannedDate',
        getCustomFormat(this.state.firstStepPlannedDate, false)
      )
      datareg.append('wf', this.state.wf)
      axios({
        method: 'post',
        url: `${StaticData.domainIp}/vendorMdl/create`,
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
              if (status === 'continue') {
                await this.setState({ disabled: false })
                await this.Reset()
              } else {
                await this.setState({ redirect: true })
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
    } else if (this.state.redirect) {
      return <Redirect to={`/purchase-engineering`} />
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
                <Menu
                  nameRole='vpis_create'
                  getRole={this.getRole}
                  nameUrl={this.props.nameUrl}
                />
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
                                value={handleString(this.state.documentNumber)}
                                onChange={this.handleChange}
                                onFocus={e => this.OnFocus(e.target.name)}
                                onBlur={this.OnBlur}
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form ${
                                this.state.foucs === 'vendor_name' ||
                                handleCheckText(this.state.vendor_name)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <label>Vendor Name</label>
                              <input
                                className='text-left ltr'
                                name='vendor_name'
                                value={handleString(this.state.vendor_name)}
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
                                this.state.foucs === 'class' ||
                                handleCheckText(this.state.class)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <label>Class</label>
                              <input
                                className='text-left ltr'
                                name='class'
                                value={handleString(this.state.class)}
                                onChange={this.handleChange}
                                onFocus={e => this.OnFocus(e.target.name)}
                                onBlur={this.OnBlur}
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form ${
                                this.state.foucs === 'areaCode' ||
                                handleCheckText(this.state.areaCode)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <label>Area Code</label>
                              <input
                                className='text-left ltr'
                                name='areaCode'
                                value={handleString(this.state.areaCode)}
                                onChange={this.handleChange}
                                onFocus={e => this.OnFocus(e.target.name)}
                                onBlur={this.OnBlur}
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form ${
                                this.state.foucs === 'docType' ||
                                handleCheckText(this.state.docType)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <label>Doc Type</label>
                              <input
                                className='text-left ltr'
                                name='docType'
                                value={handleString(this.state.docType)}
                                onChange={this.handleChange}
                                onFocus={e => this.OnFocus(e.target.name)}
                                onBlur={this.OnBlur}
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form ${
                                this.state.foucs === 'disc' ||
                                handleCheckText(this.state.disc)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <label>Disc</label>
                              <input
                                className='text-left ltr'
                                name='disc'
                                value={handleString(this.state.disc)}
                                onChange={this.handleChange}
                                onFocus={e => this.OnFocus(e.target.name)}
                                onBlur={this.OnBlur}
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form ${
                                this.state.foucs === 'phase' ||
                                handleCheckText(this.state.phase)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <label>Phase</label>
                              <input
                                className='text-left ltr'
                                name='phase'
                                value={handleString(this.state.phase)}
                                onChange={this.handleChange}
                                onFocus={e => this.OnFocus(e.target.name)}
                                onBlur={this.OnBlur}
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form ${
                                this.state.foucs === `firstStepPlannedDate` ||
                                (this.state.firstStepPlannedDate &&
                                  this.state.firstStepPlannedDate !== '')
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <div className='icon-field'>
                                <DateRangeRoundedIcon />
                              </div>
                              <div className='col p-0'>
                                <label>
                                  Planned Issue Date
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <DatePicker
                                  className='ltr text-left'
                                  persianDigits={true}
                                  isGregorian={false}
                                  timePicker={false}
                                  onChange={firstStepPlannedDate =>
                                    this.setState({ firstStepPlannedDate })
                                  }
                                  value={this.state.firstStepPlannedDate}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form ${
                                this.state.foucs === 'wf' ||
                                handleCheckText(this.state.wf)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <label>W.F</label>
                              <input
                                className='text-left ltr'
                                name='wf'
                                value={handleString(this.state.wf)}
                                onChange={this.handleChange}
                                onFocus={e => this.OnFocus(e.target.name)}
                                onBlur={this.OnBlur}
                              />
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
                            <CancelButton
                              redirect='purchase-engineering'
                              status={2}
                            />
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
