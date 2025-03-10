import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import Cookies from 'js-cookie'
import DatePicker from 'react-datepicker2'
import Select from 'react-select'
import axios from 'axios'
import StaticData from '../../staticData'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import RJ from './RJ'
import AN from './AN'
import CM from './CM'
import AP from './AP'
import NCM from './NCM'
import Loading from '../../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import getCustomFormat from '../../getCustomFormat'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import moment from 'moment-jalaali'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import Permision from '../../permision/permision'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'

export default class CommetnSheet extends Component {
  constructor (props) {
    super(props)
    this.Date = null
    this.Permision = new Permision()
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.text = ''
    this.state = {
      popUp: false,
      foucs: '',
      token: Cookies.get('token'),
      userDetail: Cookies.get('userDetail')
        ? JSON.parse(Cookies.get('userDetail'))
        : null,
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
      status2: '',
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
      CheckVendor: true,
      reject: false,
      popUp: false,
      verify: '',
      savedStatus: ''
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
    await this.setState({ [e.target.name]: e.target.value })
  }
  handleBlurCommentSheetNo = e => {
    this.setState({ foucs: '' })
    // if (!this.state.CommentSheetNo.includes(this.text) && e.target.value !== '') {
    //     this.setState({ CommentSheetNo: this.text + e.target.value })
    // }
  }
  handleDocumentNumber = async newValue => {
    await axios
      .get(
        `${StaticData.domainIp}/vendorCommentSheet/getByDocumentCode?documentCode=${newValue.value}`,
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        }
      )
      .then(async response => {
        if (response.status === 200) {
          await this.setState({
            documentDetail: response.data.content,
            disabled: response.data.content.readonly,
            id_Commnet: response.data.content.commentsheet
              ? response.data.content.commentsheet.id
              : '',
            verify: response.data.content.commentsheet
              ? response.data.content.commentsheet.verify
              : '',
            documentNumberSelected: newValue,
            message: response.data.content.commentsheet
              ? response.data.content.commentsheet.message
              : '',
            CommentSheetNo: response.data.content.commentNo
          })
          if (response.data.content.readonly) {
            let data
            if (
              response.data.content.commentsheet &&
              response.data.content.commentsheet.status === 'CM'
            ) {
              data = await Object.keys(
                response.data.content.commentsheet.detail
              ).map(_data => {
                return response.data.content.commentsheet.detail[_data]
              })
            } else {
              data = (await response.data.content.commentsheet)
                ? response.data.content.commentsheet.detail
                : {}
            }
            await this.setState({
              commentSheetDate: response.data.content.commentsheet
                ? response.data.content.commentsheet.commentSheetDate
                : '',
              letterNo: response.data.content.commentsheet
                ? response.data.content.commentsheet.letterNo
                : '',
              momNo: response.data.content.commentsheet
                ? response.data.content.commentsheet.momNo
                : '',
              status2: response.data.content.commentsheet
                ? response.data.content.commentsheet.status
                : '',
              savedStatus: response.data.content.commentsheet
                ? response.data.content.commentsheet.status
                : '',
              detail: response.data.content.commentsheet ? data : {},
              data: data,
              dateDisabld: response.data.content.commentsheet
                ? response.data.content.commentsheet.momDate
                : null,
              momDate: response.data.content.commentsheet.momDate
                ? moment(
                    `${response.data.content.commentsheet.momDate}`,
                    'YYYY/M/D'
                  )
                : null
            })
          } else {
            this.setState({
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
          disabled={
            !(
              !this.state.CheckVendor &&
              this.state.documentNumberSelected !== '' &&
              (this.state.verify === '0' || !this.state.disabled)
            )
          }
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
                    NativeFileName: [],
                    DocumentFile: [],
                    DocumentFileName: []
                  }
              : this.state.detail
          }
          edit={
            !this.state.CheckVendor &&
            this.state.documentNumberSelected !== '' &&
            (this.state.verify === '0' || !this.state.disabled)
          }
        />
      )
    } else if (this.state.status2 === 'AN') {
      return (
        <AN
          foucs={this.state.foucs}
          OnFocus={this.OnFocus}
          OnBlur={this.OnBlur}
          getData={e => this.setState({ data: e })}
          disabled={
            !(
              !this.state.CheckVendor &&
              this.state.documentNumberSelected !== '' &&
              (this.state.verify === '0' || !this.state.disabled)
            )
          }
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
                    NativeFileName: [],
                    DocumentFile: [],
                    DocumentFileName: []
                  }
              : this.state.detail
          }
          edit={
            !this.state.CheckVendor &&
            this.state.documentNumberSelected !== '' &&
            (this.state.verify === '0' || !this.state.disabled)
          }
        />
      )
    } else if (this.state.status2 === 'CM') {
      return (
        <CM
          foucs={this.state.foucs}
          OnFocus={this.OnFocus}
          OnBlur={this.OnBlur}
          getData={e => this.setState({ data: e })}
          disabled={
            !(
              !this.state.CheckVendor &&
              this.state.documentNumberSelected !== '' &&
              (this.state.verify === '0' || !this.state.disabled)
            )
          }
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
                      NativeFileName: [],
                      DocumentFile: [],
                      DocumentFileName: []
                    }
                  }
              : this.state.detail
          }
          edit={
            !this.state.CheckVendor &&
            this.state.documentNumberSelected !== '' &&
            (this.state.verify === '0' || !this.state.disabled)
          }
        />
      )
    } else if (this.state.status2 === 'AP') {
      return (
        <AP
          foucs={this.state.foucs}
          OnFocus={this.OnFocus}
          OnBlur={this.OnBlur}
          getData={e => this.setState({ data: e })}
          disabled={
            !(
              !this.state.CheckVendor &&
              this.state.documentNumberSelected !== '' &&
              (this.state.verify === '0' || !this.state.disabled)
            )
          }
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
                    NativeFileName: [],
                    DocumentFile: [],
                    DocumentFileName: []
                  }
              : this.state.detail
          }
          edit={
            !this.state.CheckVendor &&
            this.state.documentNumberSelected !== '' &&
            (this.state.verify === '0' || !this.state.disabled)
          }
        />
      )
    } else if (this.state.status2 === 'NCM') {
      return (
        <NCM
          foucs={this.state.foucs}
          OnFocus={this.OnFocus}
          OnBlur={this.OnBlur}
          getData={e => this.setState({ data: e })}
          disabled={
            !(
              !this.state.CheckVendor &&
              this.state.documentNumberSelected !== '' &&
              (this.state.verify === '0' || !this.state.disabled)
            )
          }
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
                    NativeFileName: [],
                    DocumentFile: [],
                    DocumentFileName: []
                  }
              : this.state.detail
          }
          edit={
            !this.state.CheckVendor &&
            this.state.documentNumberSelected !== '' &&
            (this.state.verify === '0' || !this.state.disabled)
          }
        />
      )
    }
  }
  handleSubmit = async status => {
    let checkStatus = false,
      i = 0
    const check =
      this.props.id &&
      this.state.documentNumberSelected !== '' &&
      this.state.from !== '' &&
      this.state.to !== '' &&
      this.state.cc !== '' &&
      this.state.CommentSheetNo !== '' &&
      this.state.status2 !== ''
    let result
    if (this.state.status2 === 'CM') {
      let cm = this.state.data
      result = await Object.assign(
        {},
        Object.keys(cm).map(data => {
          cm[data].AttachmentFile = Object.assign({}, cm[data].AttachmentFile)
          cm[data].NativeFile = Object.assign({}, cm[data].NativeFile)
          cm[data].DocumentFile = Object.assign({}, cm[data].DocumentFile)
          return cm[data]
        })
      )
      while (i < this.state.data.length) {
        checkStatus = cm[i].text !== ''
        if (!checkStatus) {
          break
        }
        i++
      }
    } else if (
      this.state.status2 === 'RJ' ||
      this.state.status2 === 'AN' ||
      this.state.status2 === 'AP' ||
      this.state.status2 === 'NCM'
    ) {
      let result = this.state.data
      result.AttachmentFile = Object.assign({}, result.AttachmentFile)
      result.NativeFile = Object.assign({}, result.NativeFile)
      result.DocumentFile = await Object.assign({}, result.DocumentFile)
      checkStatus = result.text !== ''
    }
    if (checkStatus && check) {
      if (status === 'continue') {
        this.setState({ loading: 'submit-continue' })
      } else {
        this.setState({ loading: 'submit' })
      }
      await this.setState({ disabledButton: true })
      setTimeout(async () => {
        let datareg = await new FormData()
        await datareg.append('transmittal_id', this.props.id)
        await datareg.append(
          'documentCode',
          this.state.documentNumberSelected.value
        )
        await datareg.append('from', this.state.from)
        await datareg.append('to', this.state.to)
        await datareg.append('cc', this.state.cc)
        await datareg.append('commentNo', this.state.CommentSheetNo)
        await datareg.append('letterNo', this.state.letterNo)
        await datareg.append(
          'momDate',
          getCustomFormat(this.state.momDate, false)
        )
        await datareg.append('momNo', this.state.momNo)
        await datareg.append('status', this.state.status2)
        await datareg.append('detail', JSON.stringify(result))
        await axios({
          method: 'post',
          url: `${StaticData.domainIp}/vendorCommentSheet/create`,
          data: datareg,
          headers: {
            Authorization: this.state.token
              ? `Bearer ${this.state.token}`
              : null
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
    let checkStatus = false,
      i = 0
    const check =
      this.props.id &&
      this.state.documentNumberSelected !== '' &&
      this.state.from !== '' &&
      this.state.to !== '' &&
      this.state.cc !== '' &&
      this.state.CommentSheetNo !== '' &&
      this.state.status2 !== ''
    let result = await {}
    if (this.state.status2 === 'CM') {
      let cm = await this.state.data
      result = await Object.assign(
        {},
        Object.keys(cm).map(data => {
          cm[data].AttachmentFile = Object.assign({}, cm[data].AttachmentFile)
          cm[data].NativeFile = Object.assign({}, cm[data].NativeFile)
          cm[data].DocumentFile = Object.assign({}, cm[data].DocumentFile)
          return cm[data]
        })
      )
      while (i < this.state.data.length) {
        checkStatus = cm[i].text !== ''
        if (!checkStatus) {
          break
        }
        i++
      }
    } else if (
      this.state.status2 === 'RJ' ||
      this.state.status2 === 'AN' ||
      this.state.status2 === 'AP' ||
      this.state.status2 === 'NCM'
    ) {
      let result = await this.state.data
      result.AttachmentFile = await Object.assign({}, result.AttachmentFile)
      result.NativeFile = await Object.assign({}, result.NativeFile)
      result.DocumentFile = await Object.assign({}, result.DocumentFile)
      checkStatus = result.text !== ''
    }
    if (checkStatus && check) {
      this.setState({ disabledButton: true, loading: 'edit' })
      setTimeout(async () => {
        let datareg = await new FormData()
        await datareg.append('id', this.state.id_Commnet)
        await datareg.append('transmittal_id', this.state.transmittalNumber)
        await datareg.append(
          'documentCode',
          this.state.documentNumberSelected.value
        )
        await datareg.append('from', this.state.from)
        await datareg.append('to', this.state.to)
        await datareg.append('cc', this.state.cc)
        await datareg.append('commentNo', this.state.CommentSheetNo)
        await datareg.append('letterNo', this.state.letterNo)
        await datareg.append(
          'momDate',
          getCustomFormat(this.state.momDate, false)
        )
        await datareg.append('momNo', this.state.momNo)
        await datareg.append('status', this.state.status2)
        await datareg.append('detail', JSON.stringify(result))
        await axios({
          method: 'post',
          url: `${StaticData.domainIp}/vendorCommentSheet/update`,
          data: datareg,
          headers: {
            Authorization: this.state.token
              ? `Bearer ${this.state.token}`
              : null
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
  haldeShowName = obj => {
    let allData = []
    for (let value in obj) {
      allData.push(obj[value])
    }
    return allData
  }
  ApproveReject = async (status, message = null) => {
    if (this.state.token) {
      let datareg = new FormData()
      this.setState({ disabledButton: true })
      await datareg.append('commentId', this.state.id_Commnet)
      await datareg.append('verify', status)
      await datareg.append('message', message === null ? '' : message)
      if (status === 1) {
        await this.setState({ loading: 'submit' })
      } else if (status === 10 && message !== null) {
        await this.setState({ loading: 'submit-unaccept' })
      }
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/vendorCommentSheet/verifyCommentSheet`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          await this.setState({ loading: '', popUp: false })
          if (response.status === 200) {
            Notification.notify(Message.text(910), 'success')
            setTimeout(async () => {
              this.setState({ disabledButton: false })
              await this.props.changeRedirect(true)
            }, 5000)
          } else {
            this.setState({ disabledButton: false })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(async err => {
          await this.setState({
            loading: '',
            popUp: false,
            disabledButton: false
          })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  handleShowButton = () => {
    if (!this.state.CheckVendor && this.state.documentNumberSelected !== '') {
      if (
        this.state.verify === '2' &&
        this.Permision.handlePermision(
          this.state.role,
          'vpis_comment_sheet_verify',
          true
        )
      ) {
        return (
          <div className='submit-form col-12 mt-3 mb-3 justify-content-center rtl'>
            <button
              className='mr-2 m-2 accept'
              onClick={() => this.ApproveReject(1)}
              disabled={this.state.disabledButton}
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
              disabled={this.state.disabledButton}
              onClick={() => this.setState({ reject: true, popUp: true })}
            >
              <CloseRoundedIcon />
              رد
            </button>
          </div>
        )
      } else if (
        !this.state.disabled &&
        this.Permision.handlePermision(
          this.state.role,
          'vpis_comment_sheet_send',
          true
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
      } else if (
        this.state.verify === '0' &&
        this.Permision.handlePermision(
          this.state.role,
          'vpis_comment_sheet_send',
          true
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
              pathname: `/purchase-engineering`,
              state: { select: 2 }
            }}
          />
        )
      } else {
        return (
          <React.Fragment>
            {this.state.verify === '0' ? (
              <div className='col-12'>
                <div className='message-error'>
                  <label className='strong'>
                    کامنت شیت به دلیل زیر رد شد :{' '}
                  </label>
                  <p className='m-0'>{this.state.message}</p>
                </div>
              </div>
            ) : (
              ''
            )}
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
                    handleCheckText(this.state.transmittalNumber)
                      ? 'active'
                      : ''
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
                    handleCheckText(this.state.CommentSheetNo) ? 'active' : ''
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
                    readOnly={true}
                  />
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form ${
                    handleCheckText(this.state.documentDetail.documentTitle)
                      ? 'active'
                      : ''
                  }`}
                >
                  <label>Document Title</label>
                  <input
                    readOnly={true}
                    className='text-left'
                    name='documentTitle'
                    value={handleString(
                      this.state.documentDetail.documentTitle
                    )}
                  />
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form ${
                    handleCheckText(this.state.documentDetail.revision)
                      ? 'active'
                      : ''
                  }`}
                >
                  <label>Rev</label>
                  <input
                    readOnly={true}
                    className='text-left'
                    name='revision'
                    value={handleString(this.state.documentDetail.revision)}
                  />
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form ${
                    handleCheckText(this.state.documentDetail.status)
                      ? 'active'
                      : ''
                  }`}
                >
                  <label>P.O.I</label>
                  <input
                    readOnly={true}
                    className='text-left'
                    name='status'
                    value={handleString(this.state.documentDetail.status)}
                  />
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form ${
                    handleCheckText(this.state.documentDetail.replySheetNumber)
                      ? 'active'
                      : ''
                  }`}
                >
                  <label>Reply Sheet No</label>
                  <input
                    readOnly={true}
                    className='text-left'
                    name='replySheetNumber'
                    value={handleString(
                      this.state.documentDetail.replySheetNumber
                    )}
                  />
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form ${
                    handleCheckText(this.state.documentDetail.replySheetDate)
                      ? 'active'
                      : ''
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
                      value={handleString(
                        this.state.documentDetail.replySheetDate
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form ${
                    handleCheckText(this.state.documentDetail.disc)
                      ? 'active'
                      : ''
                  }`}
                >
                  <label>Discipline</label>
                  <input
                    readOnly={true}
                    className='text-left'
                    name='disc'
                    value={handleString(this.state.documentDetail.disc)}
                  />
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form ${
                    handleCheckText(this.state.documentDetail.class)
                      ? 'active'
                      : ''
                  }`}
                >
                  <label>Class</label>
                  <input
                    readOnly={true}
                    className='text-left'
                    name='class'
                    value={handleString(this.state.documentDetail.class)}
                  />
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form ${this.state.foucs === 'letterNo' ||
                    handleCheckText(this.state.letterNo)}`}
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
                      {!(
                        !this.state.CheckVendor &&
                        handleCheckText(this.state.documentNumberSelected) &&
                        (this.state.verify === '0' || !this.state.disabled)
                      ) ? (
                        ''
                      ) : (
                        <input
                          className='d-none'
                          type='radio'
                          id='AP'
                          onClick={() => this.setState({ status2: 'AP' })}
                        />
                      )}
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
                      {!(
                        !this.state.CheckVendor &&
                        handleCheckText(this.state.documentNumberSelected) &&
                        (this.state.verify === '0' || !this.state.disabled)
                      ) ? (
                        ''
                      ) : (
                        <input
                          className='d-none'
                          type='radio'
                          id='AN'
                          onClick={() => this.setState({ status2: 'AN' })}
                        />
                      )}
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
                      {!(
                        !this.state.CheckVendor &&
                        handleCheckText(this.state.documentNumberSelected) &&
                        (this.state.verify === '0' || !this.state.disabled)
                      ) ? (
                        ''
                      ) : (
                        <input
                          className='d-none'
                          type='radio'
                          id='NCM'
                          onClick={() => this.setState({ status2: 'NCM' })}
                        />
                      )}
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
                      {!(
                        !this.state.CheckVendor &&
                        handleCheckText(this.state.documentNumberSelected) &&
                        (this.state.verify === '0' || !this.state.disabled)
                      ) ? (
                        ''
                      ) : (
                        <input
                          className='d-none'
                          type='radio'
                          id='CM'
                          onClick={() => this.setState({ status2: 'CM' })}
                        />
                      )}
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
                      {!(
                        !this.state.CheckVendor &&
                        handleCheckText(this.state.documentNumberSelected) &&
                        (this.state.verify === '0' || !this.state.disabled)
                      ) ? (
                        ''
                      ) : (
                        <input
                          className='d-none'
                          type='radio'
                          id='RJ'
                          onClick={() => this.setState({ status2: 'RJ' })}
                        />
                      )}
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
                  {this.state.userDetail ? (
                    <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                      <div className={`field-form`}>
                        <label>
                          {handleString(
                            `${this.state.userDetail.first_name} ${this.state.userDetail.last_name}`
                          )}
                          <span className='star IranSans_Bold'>*</span>
                        </label>
                        <label
                          className='upload-label signEnglish'
                          onClick={() =>
                            this.setState({
                              popUp: true,
                              pictureShow: this.state.userDetail.sign
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
                      close={e => this.setState({ popUp: e, reject: e })}
                      pictureShow={this.state.pictureShow}
                      reject={this.state.reject}
                      ApproveReject={this.ApproveReject}
                      loading={this.state.loading}
                      disabled={this.state.disabledButton}
                    />
                  ) : (
                    ''
                  )}
                </React.Fragment>
              ) : (
                ''
              )}
              {this.state.documentNumberSelected !== ''
                ? this.handleShowButton()
                : ''}
            </div>
          </React.Fragment>
        )
      }
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
        onClick={() => (!this.props.reject ? this.props.close(false) : '')}
      >
        {this.props.reject ? (
          <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
            <div className='box-wellcome'>
              <div className='main-textarea'>
                <textarea
                  onChange={e => this.setState({ errorText: e.target.value })}
                  placeholder='لطفا دلیل خود را وارد کنید'
                  value={handleString(this.state.errorText)}
                ></textarea>
              </div>
              <div className='buttons-wellcome justify-content-center'>
                <button
                  className='accept pt-0 pb-0'
                  disabled={this.props.disabled}
                  onClick={() =>
                    this.state.errorText !== ''
                      ? this.props.ApproveReject(10, this.state.errorText)
                      : ''
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
