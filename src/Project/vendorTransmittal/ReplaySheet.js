import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import Cookies from 'js-cookie'
// import DatePicker from 'react-datepicker2';
// import Select from 'react-select';
import axios from 'axios'
import Permision from '../../permision/permision'
import StaticData from '../../staticData'
import AddReplay from './addReplay'
import Loading from '../../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import { handleFilter } from '../../table/OutputFilter'
export default class ReplaySheet extends Component {
  constructor (props) {
    super(props)
    this.Submit = null
    this.Edit = null
    this.Permision = new Permision()
    this.state = {
      popUp: false,
      foucs: '',
      token: Cookies.get('token'),
      CommentNO: '',
      listCommentNO: [],
      documentNo: '',
      from: '',
      to: '',
      cc: '',
      MomDate: '',
      MOM: '',
      LetNo: '',
      detail: [],
      readOnly: true,
      replyNo: '',
      redirect: false,
      checkVendor: true,
      verify: '',
      reject: false,
      reply_id: '',
      loading: '',
      disabledButton: false,
      message: '',
      id: '',
      role: null
    }
  }
  async componentDidMount () {
    await this.fetchData()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.setState({
        id: this.props.id,
        role: this.props.role
      })
    }
  }
  fetchData = () => {
    axios
      .get(
        `${
          StaticData.domainIp
        }/vendorReplySheet/getList?transmittal_id=${parseInt(
          this.props.id.trim()
        )}`,
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        }
      )
      .then(response => {
        if (response.status === 200) {
          // if (this.Permision.handlePermision(response.data.role, 'vendor')) {
          this.setState({
            listCommentNO: response.data.content,
            role: response.data.role
          })
          // } else {
          //     this.setState({ redirect: true })
          // }
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
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = async e => {
    await this.setState({ [e.target.name]: e.target.value })
    if (e.target.name === 'CommentNO') {
      await this.getData()
    }
  }
  getData = async () => {
    await axios
      .get(
        `${StaticData.domainIp}/vendorReplySheet/getDetailByComment?commentCode=${this.state.CommentNO}`,
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        }
      )
      .then(async response => {
        this.setState({ checkVendor: response.data.role === 'vendor' })
        if (response.status === 200) {
          await this.setState({ detail: [] })
          await this.setState({
            cc: response.data.content.cc,
            documentNo: response.data.content.documentNumber,
            from: response.data.content.from,
            LetNo: response.data.content.letterNo,
            MomDate: response.data.content.momDate,
            to: response.data.content.to,
            MOM: response.data.content.momNo,
            readOnly: response.data.content.readonly,
            verify: response.data.content.verify,
            reply_id: response.data.content.reply_id,
            message: response.data.content.message,
            replyNo: response.data.content.readonly
              ? response.data.content.replyNo
              : ''
          })
          if (response.data.content.commentStatus === 'CM') {
            if (response.data.content.readonly) {
              for (let item in response.data.content.detail) {
                if (response.data.content.replyDetail[item]) {
                  response.data.content.replyDetail[
                    item
                  ].AttachmentFile = Object.keys(
                    response.data.content.replyDetail[item].AttachmentFile
                  ).map(file => {
                    return response.data.content.replyDetail[item]
                      .AttachmentFile[file]
                  })
                  response.data.content.replyDetail[
                    item
                  ].NativeFile = Object.keys(
                    response.data.content.replyDetail[item].NativeFile
                  ).map(native => {
                    return response.data.content.replyDetail[item].NativeFile[
                      native
                    ]
                  })
                  response.data.content.replyDetail[
                    item
                  ].DocumentFile = Object.keys(
                    response.data.content.replyDetail[item].DocumentFile
                  ).map(native => {
                    return response.data.content.replyDetail[item].DocumentFile[
                      native
                    ]
                  })

                  response.data.content.detail[item].replay = await response
                    .data.content.replyDetail[item]
                  await this.setState({
                    detail: [
                      ...this.state.detail,
                      response.data.content.detail[item]
                    ]
                  })
                }
              }
            } else {
              for (let value in response.data.content.detail) {
                response.data.content.detail[value].replay = {
                  statusComment: 'NA',
                  text: '',
                  AttachmentFile: [],
                  AttachmentFileName: [],
                  NativeFile: [],
                  NativeFileName: [],
                  DocumentFile: [],
                  DocumentFileName: []
                }
                this.setState({
                  detail: [
                    ...this.state.detail,
                    response.data.content.detail[value]
                  ]
                })
              }
            }
          } else if (
            response.data.content.commentStatus === 'AN' ||
            response.data.content.commentStatus === 'RJ'
          ) {
            if (response.data.content.readonly) {
              for (let item2 in response.data.content.replyDetail) {
                response.data.content.replyDetail[
                  item2
                ].AttachmentFile = Object.keys(
                  response.data.content.replyDetail[item2].AttachmentFile
                ).map(file2 => {
                  return response.data.content.replyDetail[item2]
                    .AttachmentFile[file2]
                })
                response.data.content.replyDetail[
                  item2
                ].NativeFile = Object.keys(
                  response.data.content.replyDetail[item2].NativeFile
                ).map(native2 => {
                  return response.data.content.replyDetail[item2].NativeFile[
                    native2
                  ]
                })
                response.data.content.replyDetail[
                  item2
                ].DocumentFile = Object.keys(
                  response.data.content.replyDetail[item2].DocumentFile
                ).map(native2 => {
                  return response.data.content.replyDetail[item2].DocumentFile[
                    native2
                  ]
                })
                response.data.content.detail.replay = await response.data
                  .content.replyDetail[item2]
                await this.setState({
                  detail: [...this.state.detail, response.data.content.detail]
                })
              }
            } else {
              response.data.content.detail.replay = await {
                statusComment: 'NA',
                text: '',
                AttachmentFile: [],
                AttachmentFileName: [],
                NativeFile: [],
                NativeFileName: []
              }
              await this.setState({ detail: [response.data.content.detail] })
            }
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
  handleShowButton = () => {
    if (this.state.checkVendor) {
      if (this.state.verify === '0' && this.Edit !== null) {
        return (
          <div className='submit-form justify-content-end col-12 mt-3 mb-3'>
            <button
              className='ml-3 continue justify-content-end'
              onClick={() => this.Edit('')}
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
      } else if (
        this.state.verify !== '1' &&
        this.state.verify !== '2' &&
        !this.state.readOnly &&
        this.Submit !== null &&
        this.Permision.handlePermision(
          this.state.role,
          'vpis_reply_sheet',
          true
        )
      ) {
        return (
          <div className='submit-form col-12 mt-5 justify-content-end'>
            <button
              className='justify-content-center'
              onClick={() => this.Submit('')}
              disabled={this.state.disabledButton}
            >
              ثبت اطلاعات
              {this.state.loading === 'submit' ? (
                <Loading className='form-loader' />
              ) : (
                <DoneIcon className='mr-0 ml-1' />
              )}
            </button>
            <button
              className='ml-3 continue justify-content-center'
              onClick={() => this.Submit('continue')}
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
    } else {
      if (
        this.state.verify === '2' &&
        this.Permision.handlePermision(
          this.state.role,
          'vpis_reply_sheet_verify',
          true
        )
      ) {
        return (
          <div className='submit-form col-12 mt-3 mb-3 justify-content-center rtl'>
            <button
              className='mr-2 m-2 accept'
              onClick={() => this.ApproveReject(true)}
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
      } else return ''
    }
  }
  hadnleShowMessage = () => {
    if (this.state.checkVendor) {
      if (this.state.verify === '0') {
        return (
          <div className='col-12 rtl'>
            <div className='message-error'>
              <label className='strong'>ریپلای شیت به دلیل زیر رد شد :</label>
              <p className='m-0'>{this.state.message}</p>
            </div>
          </div>
        )
      } else if (this.state.verify === '1') {
        return (
          <div className='col-12 rtl'>
            <div className='successful-text'>
              <p className='m-0'>ریپلای شیت ثبت و تائید شد.</p>
            </div>
          </div>
        )
      } else if (this.state.verify === '2') {
        return (
          <div className='col-12 rtl'>
            <div className='info-text'>
              <p className='m-0'>ریپلای شیت در دست بررسی قرار دارد</p>
            </div>
          </div>
        )
      }
    } else {
      if (this.state.verify === '0') {
        return (
          <div className='col-12 rtl'>
            <div className='message-error'>
              <label className='strong'>
                ریپلای شیت موردنظر در دست بررسی و اصلاح توسط تامین کننده قرار
                دارد.
              </label>
              <label className='strong'>دلیل رد :</label>
              <p className='m-0'>{this.state.message}</p>
            </div>
          </div>
        )
      } else if (this.state.verify === '1') {
        ;<div className='col-12 rtl'>
          <div className='successful-text'>
            <p className='m-0'>ریپلای شیت ثبت و تائید شد.</p>
          </div>
        </div>
      } else return ''
    }
  }
  ApproveReject = async (status, message = null) => {
    if (this.state.token && this.state.reply_id !== '') {
      let datareg = new FormData()
      this.setState({ disabledButton: true })
      datareg.append('replyId', this.state.reply_id)
      datareg.append('verify', status)
      datareg.append('message', message !== null ? message : '')
      if (status) {
        await this.setState({ loading: 'submit' })
      } else if (!status && message !== null) {
        await this.setState({ loading: 'submit-unaccept' })
      }
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/vendorReplySheet/verify`,
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
              await this.setState({ disabledButton: false })
              // await this.props.changeRedirect(true)
              await window.location.reload(true)
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
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      if (this.state.redirect) {
        return <Redirect to='/purchase-engineering' />
      } else {
        return (
          <div className='form row justify-content-start ltr'>
            {this.hadnleShowMessage()}
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form data ${
                  this.state.foucs === 'CommentNO' ||
                  this.state.CommentNO !== ''
                    ? 'active'
                    : ''
                }`}
              >
                <label>Comment No</label>
                <select
                  name='CommentNO'
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                >
                  <option className='d-none'></option>
                  {this.state.listCommentNO.length === 0 ? (
                    <option className='text-right' disabled={true}>
                      No comment has been created for this document
                    </option>
                  ) : (
                    this.state.listCommentNO.map((data, key) => (
                      <option key={key} value={data.value}>
                        {data.label}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  this.state.foucs === 'replyNo' ||
                  handleCheckText(this.state.replyNo)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  Reply No
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  readOnly={false}
                  className='text-left'
                  name='replyNo'
                  value={handleString(this.state.replyNo)}
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  handleCheckText(this.state.documentNo) ? 'active' : ''
                }`}
              >
                <label>Document No</label>
                <input
                  readOnly={true}
                  className='text-left'
                  name='documentNo'
                  value={handleString(this.state.documentNo)}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  handleCheckText(this.state.from) ? 'active' : ''
                }`}
              >
                <label>From</label>
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
                  handleFilter(this.state.to) ? 'active' : ''
                }`}
              >
                <label>TO</label>
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
                className={`field-form ${
                  handleCheckText(this.state.cc) ? 'active' : ''
                }`}
              >
                <label>CC</label>
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
                  handleCheckText(this.state.MomDate) ? 'active' : ''
                }`}
              >
                <div className='icon-field'>
                  <DateRangeRoundedIcon />
                </div>
                <div className='col p-0'>
                  <label>MOM Date</label>
                  <input
                    className='text-left'
                    value={handleString(this.state.MomDate)}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  handleCheckText(this.state.MOM) ? 'active' : ''
                }`}
              >
                <label>MOM No. (For Open Status)</label>
                <input
                  className='text-left'
                  readOnly={true}
                  value={handleString(this.state.MOM)}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form ${
                  handleCheckText(this.state.LetNo) ? 'active' : ''
                }`}
              >
                <label>LET No</label>
                <input
                  className='text-left'
                  name='LetNo'
                  readOnly={true}
                  value={handleString(this.state.LetNo)}
                />
              </div>
            </div>
            <DefaultDetail
              detail={this.state.detail}
              readOnly={this.state.readOnly}
              getSubmit={e => (this.Submit = e)}
              getEdit={e => (this.Edit = e)}
              id={this.props.id}
              CommentNO={this.state.CommentNO}
              setLoading={e => this.setState({ loading: e })}
              replyNo={this.state.replyNo}
              popUp={this.state.popUp}
              reject={this.state.reject}
              closePopup={e => this.setState({ popUp: e, reject: e })}
              ApproveReject={this.ApproveReject}
              loading={this.state.loading}
              getDisabled={e => this.setState({ disabledButton: e })}
              verify={this.state.verify}
              checkVendor={this.state.checkVendor}
              reply_id={this.state.reply_id}
            />
            {this.handleShowButton()}
          </div>
        )
      }
    }
  }
}
class DefaultDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      array: [],
      foucs: '',
      redirect: false,
      token: Cookies.get('token')
    }
  }
  componentDidMount () {
    this.props.getEdit(this.handleEdit)
    this.props.getSubmit(this.handleSubmit)
    // this.handleData()
  }
  async componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.props = await nextProps
      await this.handleData()
    }
  }
  handleData = async () => {
    await this.setState({ array: this.props.detail })
  }
  Convertor = (obj, list) => {
    let data = []
    for (let value in obj) {
      let result = {}
      result['link'] = obj[value]
      result['name'] = list[value]
      data.push(result)
    }
    return data
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  ChangeStatusComment = name => {
    let key = parseInt(name.split('_')[1]),
      na = name.split('_')[0]
    let list = this.state.array
    let obj = list[key]
    obj['replay']['statusComment'] = na
    this.setState({ array: list })
  }
  handleUpload = async (e, files, names) => {
    await this.setState({ loading: files })
    let key = await parseInt(names.split('_')[1])
    names = await names.split('_')[0]
    files = await files.split('_')[0]
    await e.preventDefault()
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = await new FileReader()
      await reader.readAsDataURL(e.target.files[i])
      await this.GetLink(
        files,
        e.target.files[i],
        names,
        e.target.files.length,
        key,
        i
      )
    }
  }
  GetLink = (nameState, file, names, length, key, i) => {
    let array = this.state.array
    let list = array[key]['replay'][nameState],
      listName = array[key]['replay'][names]
    let datareg = new FormData()
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/replaySheet-CM`,
      data: datareg,
      headers: {
        Authorization: this.state.token ? `Bearer ${this.state.token}` : null
      }
    })
      .then(async response => {
        if (i + 1 === length) {
          this.setState({ loading: '' })
        }
        if (response.status === 200) {
          await list.push(response.data.content)
          await listName.push(file.name)
          let Document = await this.state.array
          let obj = await Document[key]['replay']
          obj[nameState] = await list
          obj[names] = await listName
          await this.setState({ array: array })
        } else {
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
  deleteFile = async (key, num, files, names) => {
    let Document = await this.state.array
    let obj = await Document[key]['replay']
    let data1 = await obj[files]
    let data2 = await obj[names]
    await data1.splice(num, 1)
    await data2.splice(num, 1)
    await this.setState({ array: Document })
  }
  handleChange = e => {
    let list = this.state.array
    let name = e.target.name.split('_')[0]
    let key = parseInt(e.target.name.split('_')[1])
    let obj = list[key]
    obj['replay'][name] = e.target.value
    this.setState({ array: list })
  }
  handleSubmit = async status => {
    let check = false
    let i = 0
    while (i < this.state.array.length) {
      check = this.state.array[i].replay.text !== ''
      i++
      if (!check) {
        break
      }
    }
    if (
      this.props.id &&
      this.props.CommentNO &&
      check &&
      this.props.replyNo !== ''
    ) {
      this.props.getDisabled(true)
      let result = Object.assign(
        {},
        Object.keys(this.state.array).map(data => {
          this.state.array[data].replay.AttachmentFile = Object.assign(
            {},
            this.state.array[data].replay.AttachmentFile
          )
          this.state.array[data].replay.NativeFile = Object.assign(
            {},
            this.state.array[data].replay.NativeFile
          )
          return this.state.array[data].replay
        })
      )
      if (status === 'continue') {
        await this.props.setLoading('submit-continue')
      } else {
        await this.props.setLoading('submit')
      }
      setTimeout(async () => {
        let datareg = await new FormData()
        await datareg.append('transmittal_id', this.props.id)
        await datareg.append('comment_id', this.props.CommentNO)
        await datareg.append('detail', JSON.stringify(result))
        await datareg.append('replyNo', this.props.replyNo)
        await axios({
          method: 'post',
          url: `${StaticData.domainIp}/vendorReplySheet/create`,
          data: datareg,
          headers: {
            Authorization: this.state.token
              ? `Bearer ${this.state.token}`
              : null
          }
        })
          .then(async response => {
            this.props.setLoading('')
            if (response.status === 200) {
              Notification.notify(Message.text(900), 'success')
              setTimeout(async () => {
                this.props.getDisabled(false)
                if (status === 'continue') {
                  await window.location.reload(true)
                } else {
                  await this.setState({ redirect: true })
                }
              }, 5000)
            } else {
              this.props.getDisabled(false)
              Notification.notify(Message.text(response.status), 'error')
            }
          })
          .catch(err => {
            this.props.setLoading('')
            this.props.getDisabled(false)
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
    let check = false
    let i = 0
    while (i < this.state.array.length) {
      check = this.state.array[i].replay.text !== ''
      i++
      if (!check) {
        break
      }
    }
    if (check && this.props.replyNo !== '') {
      this.props.getDisabled(true)
      let result = Object.assign(
        {},
        Object.keys(this.state.array).map(data => {
          this.state.array[data].replay.AttachmentFile = Object.assign(
            {},
            this.state.array[data].replay.AttachmentFile
          )
          this.state.array[data].replay.NativeFile = Object.assign(
            {},
            this.state.array[data].replay.NativeFile
          )
          return this.state.array[data].replay
        })
      )
      await this.props.setLoading('edit')
      setTimeout(async () => {
        let datareg = await new FormData()
        await datareg.append('replyId', this.props.reply_id)
        await datareg.append('detail', JSON.stringify(result))
        await datareg.append('replyNo', this.props.replyNo)
        await axios({
          method: 'post',
          url: `${StaticData.domainIp}/vendorReplySheet/update`,
          data: datareg,
          headers: {
            Authorization: this.state.token
              ? `Bearer ${this.state.token}`
              : null
          }
        })
          .then(async response => {
            this.props.setLoading('')
            if (response.status === 200) {
              Notification.notify(Message.text(906), 'success')
              setTimeout(async () => {
                await this.props.getDisabled(false)
                await window.location.reload(true)
              }, 5000)
            } else {
              this.props.getDisabled(false)
              Notification.notify(Message.text(response.status), 'error')
            }
          })
          .catch(err => {
            this.props.setLoading('')
            this.props.getDisabled(false)
            if (err.response) {
              Notification.notify(Message.text(err.response.status), 'error')
            }
          })
      }, 100)
    } else {
      this.props.getDisabled(false)
      Notification.notify(Message.text(99), 'error')
    }
  }
  render () {
    if (this.state.redirect) {
      return <Redirect to='/purchase-engineering' />
    } else
      return (
        <React.Fragment>
          {this.state.array.map((data, i) => (
            <div className='col-12 row m-0' key={i}>
              <div className='w-100'>
                <div className='col-xl-12 col-lg-12 col-md-12 col-12 p-0'>
                  <div
                    className={`field-form textarea ltr ${
                      this.props.foucs === `text_${i}` ||
                      handleCheckText(data.text)
                        ? 'active'
                        : ''
                    }`}
                  >
                    <div className='col p-0'>
                      <label className='textarea'>
                        {`text ${i + 1}`}
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <textarea
                        className='w-100 text-left'
                        type='text'
                        name={`text_${i}`}
                        value={handleString(data.text)}
                        readOnly={true}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className='col-xl-12 col-lg-12 col-md-12 col-12 p-0'>
                  <div className={`field-form`}>
                    <label>PDF Attachment</label>
                    <div
                      className={`allName english col row m-0 justify-content-end pr-2`}
                    >
                      {this.Convertor(
                        data.AttachmentFile,
                        data.AttachmentFileName
                      ).length > 0 ? (
                        this.Convertor(
                          data.AttachmentFile,
                          data.AttachmentFileName
                        ).map((file, index) => (
                          <a
                            href={file.link}
                            key={index}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <span>{file.name}</span>
                          </a>
                        ))
                      ) : (
                        <span>موردی وجود ندارد</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className='col-xl-12 col-lg-12 col-md-12 col-12 p-0'>
                  <div className={`field-form`}>
                    <label>Native File Attachment</label>
                    <div
                      className={`allName english col row m-0 justify-content-end pr-2`}
                    >
                      {this.Convertor(data.NativeFile, data.NativeFileName)
                        .length > 0 ? (
                        this.Convertor(
                          data.NativeFile,
                          data.NativeFileName
                        ).map((file, index) => (
                          <a
                            href={file.link}
                            key={index}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <span>{file.name}</span>
                          </a>
                        ))
                      ) : (
                        <span>موردی وجود ندارد</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className='col-xl-12 col-lg-12 col-md-12 col-12 p-0'>
                  <div className={`field-form`}>
                    <label>Document Attachment</label>
                    <div
                      className={`allName english col row m-0 justify-content-end pr-2`}
                    >
                      {this.Convertor(data.DocumentFile, data.DocumentFileName)
                        .length > 0 ? (
                        this.Convertor(
                          data.DocumentFile,
                          data.DocumentFileName
                        ).map((file, index) => (
                          <a
                            href={file.link}
                            key={index}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <span>{file.name}</span>
                          </a>
                        ))
                      ) : (
                        <span>موردی وجود ندارد</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <AddReplay _key={i} replay={data.replay} {...this} />
            </div>
          ))}
          {this.props.popUp ? (
            <Sign
              close={e => this.props.closePopup(e)}
              pictureShow={this.state.pictureShow}
              reject={this.props.reject}
              ApproveReject={(status, text) =>
                this.props.ApproveReject(status, text)
              }
              loading={this.props.loading}
              disabled={this.state.disabledButton}
            />
          ) : (
            ''
          )}
        </React.Fragment>
      )
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
                    handleCheckText(this.state.errorText)
                      ? this.props.ApproveReject(false, this.state.errorText)
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
