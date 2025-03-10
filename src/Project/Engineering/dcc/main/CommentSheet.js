import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import Cookies from 'js-cookie'
import DatePicker from 'react-datepicker2'
import Select from 'react-select'
import axios from 'axios'
import Permision from '../../../../permision/permision'
import StaticData from '../../../../staticData'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import RJ from './RJ'
import AN from './AN'
import CM from './CM'
import AP from './AP'
import NCM from './NCM'
import Loading from '../../../../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import Notification from '../../../../notification/notification'
import Message from '../../../../notification/Message'
import getCustomFormat from '../../../../getCustomFormat'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import moment from 'moment-jalaali'
import handleCheckText from '../../../../handleCheckText'
import handleString from '../../../../handleString'
export default class Transmittal extends Component {
  constructor (props) {
    super(props)
    this.Date = null
    this.Permision = new Permision()
    // this.getCustomFormat = GetCustomFormat.getCustomFormat
    this.text = 'BR3-CS-'
    this.state = {
      popUp: false,
      foucs: '',
      token: Cookies.get('token'),
      cc: '',
      commentSheetDate: '',
      contractNumber: '',
      documentList: [],
      from: '',
      to: '',
      transmittalDate: '',
      transmittalNumber: '',
      CommentSheetNo: this.text,
      momDate: null,
      momNo: '',
      documentNumberSelected: '',
      documentDetail: {},
      status2: 'AP',
      letterNo: '',
      data: {},
      pictureShow: '',
      redirect: false,
      disabled: false,
      detail: {},
      dateDisabld: '',
      redirectContinue: false,
      disabledButton: false,
      id_Commnet: '',
      checkPermision: false,
      transmittal_id: '',
      savedStatus: '',
      role: null
    }
  }
  componentDidMount () {
    this.setState(this.props)
    this.Date = this.props.commentSheetDate
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.props = nextProps
      this.setState(this.props)
      this.Date = this.props.commentSheetDate
    }
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = async e => {
    const { name, value } = e.target
    await this.setState({ [name]: value })
  }
  handleBlurCommentSheetNo = e => {
    const { value } = e.target
    this.setState({ foucs: '' })
    if (
      !this.state.CommentSheetNo.includes(this.text) &&
      handleCheckText(value)
    ) {
      this.setState({ CommentSheetNo: this.text + value })
    }
  }
  handleDocumentNumber = async newValue => {
    await this.setState({ documentNumberSelected: '', status2: '' })
    await axios
      .get(
        `${StaticData.domainIp}/commentSheet/getByDocumentCode?documentCode=${newValue.value}`,
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        }
      )
      .then(response => {
        if (response.status === 200) {
          this.setState({
            documentDetail: response.data.content,
            disabled: response.data.content.readonly,
            id_Commnet: response.data.content.commentsheet
              ? response.data.content.commentsheet.id
              : '',
            documentNumberSelected: newValue
          })
          if (response.data.content.readonly) {
            let data
            if (response.data.content.commentsheet.status === 'CM') {
              data = Object.keys(response.data.content.commentsheet.detail).map(
                _data => {
                  return response.data.content.commentsheet.detail[_data]
                }
              )
            } else {
              data = response.data.content.commentsheet.detail
            }
            this.setState({
              CommentSheetNo: response.data.content.commentsheet.commentNo,
              commentSheetDate:
                response.data.content.commentsheet.commentSheetDate,
              letterNo: response.data.content.commentsheet.letterNo
                ? response.data.content.commentsheet.letterNo
                : '',
              momNo: response.data.content.commentsheet.momNo,
              status2: response.data.content.commentsheet.status,
              savedStatus: response.data.content.commentsheet.status,
              detail: response.data.content.commentsheet.detail,
              data: data,
              dateDisabld: response.data.content.commentsheet.momDate,
              momDate: response.data.content.commentsheet.momDate
                ? moment(
                    `${response.data.content.commentsheet.momDate}`,
                    'YYYY/M/D'
                  )
                : null
            })
          } else {
            this.setState({
              CommentSheetNo: '',
              commentSheetDate: this.Date,
              letterNo: '',
              momNo: '',
              status2: 'AP',
              detail: {}
            })
          }
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
          if (err.response.status === 404) {
            setTimeout(() => {
              this.props.handleBack(true)
            }, 5000)
          }
        }
      })
  }
  handleShow = () => {
    if (this.state.status2 === 'RJ') {
      return (
        <RJ
          foucs={this.state.foucs}
          OnFocus={this.OnFocus}
          OnBlur={this.OnBlur}
          getData={e => this.setState({ data: e })}
          disabled={!this.state.disabled}
          detail={
            this.state.disabled
              ? this.state.savedStatus === this.state.status2
                ? this.state.detail
                : {
                    text: '',
                    AttachmentFileName: [],
                    AttachmentFile: [],
                    loading: '',
                    NativeFile: [],
                    NativeFileName: []
                  }
              : this.state.detail
          }
          edit={this.state.disabled}
        />
      )
    } else if (this.state.status2 === 'AN') {
      return (
        <AN
          foucs={this.state.foucs}
          OnFocus={this.OnFocus}
          OnBlur={this.OnBlur}
          getData={e => this.setState({ data: e })}
          disabled={!this.state.disabled}
          detail={
            this.state.disabled
              ? this.state.savedStatus === this.state.status2
                ? this.state.detail
                : {
                    text: '',
                    AttachmentFileName: [],
                    AttachmentFile: [],
                    loading: '',
                    NativeFile: [],
                    NativeFileName: []
                  }
              : this.state.detail
          }
          edit={this.state.disabled}
        />
      )
    } else if (this.state.status2 === 'CM') {
      return (
        <CM
          foucs={this.state.foucs}
          OnFocus={this.OnFocus}
          OnBlur={this.OnBlur}
          getData={e => this.setState({ data: e })}
          disabled={!this.state.disabled}
          detail={
            this.state.disabled
              ? this.state.savedStatus === this.state.status2
                ? this.state.detail
                : {
                    0: {
                      text: '',
                      AttachmentFileName: [],
                      AttachmentFile: [],
                      loading: '',
                      NativeFile: [],
                      NativeFileName: []
                    }
                  }
              : this.state.detail
          }
          edit={this.state.disabled}
        />
      )
    } else if (this.state.status2 === 'AP') {
      return (
        <AP
          foucs={this.state.foucs}
          OnFocus={this.OnFocus}
          OnBlur={this.OnBlur}
          getData={e => this.setState({ data: e })}
          disabled={!this.state.disabled}
          detail={
            this.state.disabled
              ? this.state.savedStatus === this.state.status2
                ? this.state.detail
                : {
                    text: '',
                    AttachmentFileName: [],
                    AttachmentFile: [],
                    loading: '',
                    NativeFile: [],
                    NativeFileName: []
                  }
              : this.state.detail
          }
          edit={this.state.disabled}
        />
      )
    } else if (this.state.status2 === 'NCM') {
      return (
        <NCM
          foucs={this.state.foucs}
          OnFocus={this.OnFocus}
          OnBlur={this.OnBlur}
          getData={e => this.setState({ data: e })}
          disabled={!this.state.disabled}
          detail={
            this.state.disabled
              ? this.state.savedStatus === this.state.status2
                ? this.state.detail
                : {
                    text: '',
                    AttachmentFileName: [],
                    AttachmentFile: [],
                    loading: '',
                    NativeFile: [],
                    NativeFileName: []
                  }
              : this.state.detail
          }
          edit={this.state.disabled}
        />
      )
    }
  }
  handleSubmit = async status => {
    const {
      documentNumberSelected,
      from,
      cc,
      to,
      CommentSheetNo,
      status2,
      data,
      letterNo,
      momDate,
      momNo,
      token
    } = this.state
    let checkStatus = false,
      i = 0
    const check =
      handleCheckText(this.props.id) &&
      handleCheckText(documentNumberSelected) &&
      handleCheckText(from) &&
      handleCheckText(to) &&
      handleCheckText(cc) &&
      handleCheckText(CommentSheetNo) &&
      handleCheckText(status2)
    if (status === 'continue') {
      let result
      if (status2 === 'CM') {
        let cm = data
        result = await Object.assign(
          {},
          Object.keys(cm).map(data => {
            cm[data].AttachmentFile = Object.assign({}, cm[data].AttachmentFile)
            cm[data].NativeFile = Object.assign({}, cm[data].NativeFile)
            return cm[data]
          })
        )
        while (i < data.length) {
          checkStatus = handleCheckText(cm[i].text)
          if (!checkStatus) {
            break
          }
          i++
        }
      } else if (
        status2 === 'RJ' ||
        status2 === 'AN' ||
        status2 === 'AP' ||
        status2 === 'NCM'
      ) {
        let result = data
        result.AttachmentFile = Object.assign({}, result.AttachmentFile)
        result.NativeFile = Object.assign({}, result.NativeFile)
        checkStatus = handleCheckText(result.text)
      }
      if (checkStatus && check) {
        this.setState({ disabledButton: true })
        this.setState({ loading: 'submit-continue' })
      } else {
        this.setState({ loading: 'submit' })
      }
      setTimeout(async () => {
        let datareg = await new FormData()
        await datareg.append('transmittal_id', this.props.id)
        await datareg.append('documentCode', documentNumberSelected.value)
        await datareg.append('from', from)
        await datareg.append('to', to)
        await datareg.append('cc', cc)
        await datareg.append('commentNo', CommentSheetNo)
        await datareg.append('letterNo', letterNo)
        await datareg.append('momDate', getCustomFormat(momDate, false))
        await datareg.append('momNo', momNo)
        await datareg.append('status', status2)
        await datareg.append('detail', JSON.stringify(result))
        await axios({
          method: 'post',
          url: `${StaticData.domainIp}/commentSheet/create`,
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
                await this.setState({ disabledButton: false })
                if (status === 'continue') {
                  await window.location.reload(true)
                } else {
                  await this.setState({ redirect: true })
                }
              }, 5000)
            } else {
              Notification.notify(Message.text(response.status), 'error')
              this.setState({ disabledButton: false })
            }
          })
          .catch(err => {
            this.setState({ loading: '', disabledButton: false })
            if (err.response) {
              Notification.notify(Message.text(err.response.status), 'error')
            }
          })
      }, 100)
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  handleEdit = async () => {
    const {
      documentNumberSelected,
      from,
      to,
      cc,
      CommentSheetNo,
      status2,
      data,
      id_Commnet,
      transmittalNumber,
      letterNo,
      momDate,
      momNo,
      token
    } = this.state
    let checkStatus = false,
      i = 0
    const check =
      this.props.id &&
      handleCheckText(documentNumberSelected) &&
      handleCheckText(from) &&
      handleCheckText(to) &&
      handleCheckText(cc) &&
      handleCheckText(CommentSheetNo) &&
      handleCheckText(status2)
    let result = await {}
    if (status2 === 'CM') {
      let cm = await data
      result = await Object.assign(
        {},
        Object.keys(cm).map(data => {
          cm[data].AttachmentFile = Object.assign({}, cm[data].AttachmentFile)
          cm[data].NativeFile = Object.assign({}, cm[data].NativeFile)
          return cm[data]
        })
      )
      while (i < data.length) {
        checkStatus = handleCheckText(cm[i].text)
        if (!checkStatus) {
          break
        }
        i++
      }
    } else if (
      status2 === 'RJ' ||
      status2 === 'AN' ||
      status2 === 'AP' ||
      status2 === 'NCM'
    ) {
      let result = await data
      result.AttachmentFile = await Object.assign({}, result.AttachmentFile)
      result.NativeFile = await Object.assign({}, result.NativeFile)
      checkStatus = handleCheckText(result.text)
    }
    if (checkStatus && check) {
      this.setState({ disabledButton: true, loading: 'edit' })
      setTimeout(async () => {
        let datareg = await new FormData()
        await datareg.append('id', id_Commnet)
        await datareg.append('transmittal_id', transmittalNumber)
        await datareg.append('documentCode', documentNumberSelected.value)
        await datareg.append('from', from)
        await datareg.append('to', to)
        await datareg.append('cc', cc)
        await datareg.append('commentNo', CommentSheetNo)
        await datareg.append('letterNo', letterNo)
        await datareg.append('momDate', getCustomFormat(momDate, false))
        await datareg.append('momNo', momNo)
        await datareg.append('status', status2)
        await datareg.append('detail', JSON.stringify(result))
        await axios({
          method: 'post',
          url: `${StaticData.domainIp}/commentSheet/update`,
          data: datareg,
          headers: {
            Authorization: token ? `Bearer ${token}` : null
          }
        })
          .then(async response => {
            this.setState({ loading: '' })
            if (response.status === 200) {
              Notification.notify(Message.text(906), 'success')
              setTimeout(async () => {
                await this.setState({ disabledButton: false })
                await window.location.reload(true)
              }, 5000)
            } else {
              Notification.notify(Message.text(response.status), 'error')
              this.setState({ disabledButton: false })
            }
          })
          .catch(err => {
            this.setState({ loading: '', disabledButton: false })
            if (err.response) {
              Notification.notify(Message.text(err.response.status), 'error')
            }
          })
      }, 100)
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  handleShowButton = () => {
    if (this.state.documentNumberSelected) {
      if (this.state.disabled) {
        if (
          this.Permision.handlePermision(
            this.state.role,
            'transmittal_comment_sheet_edit'
          )
        ) {
          return (
            <div className='submit-form justify-content-end col-12 mt-3 mb-3'>
              <button
                className='ml-3 continue justify-content-end'
                onClick={this.handleEdit}
                disabled={this.state.disabledButton}
              >
                ویرایش
                {this.state.loading === 'edit' ? (
                  <Loading className='form-loader' />
                ) : (
                  <EditRoundedIcon />
                )}
              </button>
            </div>
          )
        } else return ''
      } else {
        if (
          this.Permision.handlePermision(
            this.state.role,
            'transmittal_comment_sheet'
          )
        ) {
          return (
            <div className='submit-form justify-content-end col-12 mt-3 mb-3'>
              <button
                className='justify-content-center'
                onClick={() => this.handleSubmit('')}
                disabled={this.state.disabledButton}
              >
                ثبت اطلاعات
                {this.state.loading === 'submit' ? (
                  <Loading className='form-loader' />
                ) : (
                  <DoneIcon />
                )}
              </button>
              <button
                className='ml-3 continue justify-content-center'
                onClick={() => this.handleSubmit('continue')}
                disabled={this.state.disabledButton}
              >
                ثبت و ادامه
                {this.state.loading === 'submit-continue' ? (
                  <Loading className='form-loader mr-0 ml-1' />
                ) : (
                  <DoneIcon className='mr-0 ml-1' />
                )}
              </button>
            </div>
          )
        } else return ''
      }
    } else return ''
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      if (this.state.redirect) {
        return (
          <Redirect
            to={{
              pathname: `/dcc`,
              state: { select: 2 }
            }}
          />
        )
      } else {
        return (
          <div className='form row justify-content-start ltr'>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form data ${
                  handleCheckText(this.state.transmittalDate) ? 'active' : ''
                }`}
              >
                <div className='icon-field'>
                  <DateRangeRoundedIcon />
                </div>
                <div className='col p-0'>
                  <label>
                    Transmittal Date
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <input
                    className='text-left'
                    readOnly={true}
                    name='transmittalDate'
                    value={handleString(this.state.transmittalDate)}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  handleCheckText(this.state.transmittalNumber) ? 'active' : ''
                }`}
              >
                <label>
                  Transmittal No
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='transmittalNumber'
                  value={handleString(this.state.transmittalNumber)}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  handleCheckText(this.state.from) ? 'active' : ''
                }`}
              >
                <label>
                  From
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='from'
                  value={handleString(this.state.from)}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  handleCheckText(this.state.contractNumber) ? 'active' : ''
                }`}
              >
                <label>
                  Contarct No.
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='contractNumber'
                  value={handleString(this.state.contractNumber)}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  handleCheckText(this.state.cc) ? 'active' : ''
                }`}
              >
                <label>
                  CC
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='cc'
                  value={handleString(this.state.cc)}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  handleCheckText(this.state.to) ? 'active' : ''
                }`}
              >
                <label>
                  TO
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='to'
                  value={handleString(this.state.to)}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form data ${
                  handleCheckText(this.state.CommnetSheetDate) ? 'active' : ''
                }`}
              >
                <div className='icon-field'>
                  <DateRangeRoundedIcon />
                </div>
                <div className='col p-0'>
                  <label>
                    Comment Sheet Date.
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <input
                    className='text-left'
                    readOnly={true}
                    name='commentSheetDate'
                    value={handleString(this.state.commentSheetDate)}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div className='field-form selectBox ltr'>
                <Select
                  onChange={newValue => this.handleDocumentNumber(newValue)}
                  name='documentNumberSelected'
                  options={this.state.documentList}
                  value={this.state.documentNumberSelected}
                  className='basic-multi-select'
                  classNamePrefix='select'
                  placeholder={
                    <label>
                      Document No
                      <span className='star IranSans_Bold'>*</span>
                    </label>
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.foucs === 'momDate' ||
                  this.state.momDate !== null ||
                  this.state.dateDisabld !== ''
                    ? 'active'
                    : ''
                }`}
              >
                <div className='icon-field'>
                  <DateRangeRoundedIcon />
                </div>
                <div className='col p-0'>
                  <label>MOM Date</label>
                  <DatePicker
                    className='text-left'
                    value={this.state.momDate}
                    persianDigits={true}
                    isGregorian={true}
                    timePicker={false}
                    onChange={momDate => this.setState({ momDate })}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.foucs === 'momNo' ||
                  handleCheckText(this.state.momNo)
                    ? 'active'
                    : ''
                }`}
              >
                <label>MOM No. (For Open Status)</label>
                <input
                  className='text-left'
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                  name='momNo'
                  value={handleString(this.state.momNo)}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.foucs === 'CommentSheetNo' ||
                  handleCheckText(this.state.CommentSheetNo)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  CommentSheet No.
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  className='text-left'
                  name='CommentSheetNo'
                  value={handleString(this.state.CommentSheetNo)}
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={e => this.handleBlurCommentSheetNo(e)}
                  readOnly={this.state.disabled}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.documentDetail.documentTitle ? 'active' : ''
                }`}
              >
                <label>Document Title</label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='documentTitle'
                  value={
                    this.state.documentDetail.documentTitle
                      ? this.state.documentDetail.documentTitle
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.documentDetail.revision ? 'active' : ''
                }`}
              >
                <label>Rev</label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='revision'
                  value={
                    this.state.documentDetail.revision
                      ? this.state.documentDetail.revision
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.documentDetail.status ? 'active' : ''
                }`}
              >
                <label>P.O.I</label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='status'
                  value={
                    this.state.documentDetail.status
                      ? this.state.documentDetail.status
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.documentDetail.replySheetNumber ? 'active' : ''
                }`}
              >
                <label>Reply Sheet No</label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='replySheetNumber'
                  value={
                    this.state.documentDetail.replySheetNumber
                      ? this.state.documentDetail.replySheetNumber
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.documentDetail.replySheetDate ? 'active' : ''
                }`}
              >
                <div className='icon-field'>
                  <DateRangeRoundedIcon />
                </div>
                <div className='col p-0'>
                  <label>Reply Sheet Date</label>
                  <input
                    readOnly={true}
                    className='text-left'
                    name='replySheetDate'
                    value={
                      this.state.documentDetail.replySheetDate
                        ? this.state.documentDetail.replySheetDate
                        : ''
                    }
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.documentDetail.disc ? 'active' : ''
                }`}
              >
                <label>Discipline</label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='disc'
                  value={
                    this.state.documentDetail.disc
                      ? this.state.documentDetail.disc
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.documentDetail.class ? 'active' : ''
                }`}
              >
                <label>Class</label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='class'
                  value={
                    this.state.documentDetail.class
                      ? this.state.documentDetail.class
                      : ''
                  }
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.foucs === 'letterNo' ||
                  handleCheckText(this.state.letterNo)
                    ? 'active'
                    : ''
                }`}
              >
                <label>LET No</label>
                <input
                  className='text-left'
                  name='letterNo'
                  value={handleString(this.state.letterNo)}
                  onChange={this.handleChange}
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
              <div className='field-radio w-100'>
                <label>
                  status :<span className='star IranSans_Bold'>*</span>
                </label>
                <div className='main-radio'>
                  <div className='radio-button mr-auto ml-auto'>
                    <input
                      className='d-none'
                      type='radio'
                      id='AP'
                      onClick={() => this.setState({ status2: 'AP' })}
                    />
                    <label htmlFor='AP'>
                      {this.state.status2 === 'AP' ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      AP
                    </label>
                  </div>
                  <div className='radio-button mr-auto ml-auto'>
                    <input
                      className='d-none'
                      type='radio'
                      id='AN'
                      onClick={() => this.setState({ status2: 'AN' })}
                    />
                    <label htmlFor='AN'>
                      {this.state.status2 === 'AN' ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      AN
                    </label>
                  </div>
                  <div className='radio-button mr-auto ml-auto'>
                    <input
                      className='d-none'
                      type='radio'
                      id='NCM'
                      onClick={() => this.setState({ status2: 'NCM' })}
                    />
                    <label htmlFor='NCM'>
                      {this.state.status2 === 'NCM' ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      NCM
                    </label>
                  </div>
                  <div className='radio-button mr-auto ml-auto'>
                    <input
                      className='d-none'
                      type='radio'
                      id='CM'
                      onClick={() => this.setState({ status2: 'CM' })}
                    />
                    <label htmlFor='CM'>
                      {this.state.status2 === 'CM' ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      CM
                    </label>
                  </div>
                  <div className='radio-button mr-auto ml-auto'>
                    <input
                      className='d-none'
                      type='radio'
                      id='RJ'
                      onClick={() => this.setState({ status2: 'RJ' })}
                    />
                    <label htmlFor='RJ'>
                      {this.state.status2 === 'RJ' ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      RJ
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {this.handleShow()}
            {handleCheckText(this.state.status2) ? (
              <React.Fragment>
                <div className='title-password col-12'>
                  <h2 className='IranSans_Bold'>Consultant</h2>
                  <div className='line mr-0 ml-3'></div>
                </div>
                {this.state.approvedBy ? (
                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div className={`field-form`}>
                      <label>
                        {`${this.state.approvedBy.first_name} ${this.state.approvedBy.last_name}`}
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <label
                        className='upload-label signEnglish'
                        onClick={() =>
                          this.setState({
                            popUp: true,
                            pictureShow: this.state.approvedBy.sign
                          })
                        }
                      >
                        sign
                        <AttachFileIcon />
                      </label>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {this.state.popUp ? (
                  <Sign
                    close={e => this.setState({ popUp: e, pictureShow: '' })}
                    pictureShow={this.state.pictureShow}
                  />
                ) : (
                  ''
                )}
              </React.Fragment>
            ) : (
              ''
            )}
            {this.handleShowButton()}
          </div>
        )
      }
    }
  }
}
class Sign extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div className='backGroundPopup' onClick={() => this.props.close(false)}>
        <div className='col-xl-6 col-lg-10 col-12'>
          <img src={this.props.pictureShow} alt='sign' />
        </div>
      </div>
    )
  }
}
