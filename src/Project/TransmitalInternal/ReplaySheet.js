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
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
export default class ReplaySheet extends Component {
  constructor (props) {
    super(props)
    this.Submit = null
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
      replyNo: 'BR3-RS-'
    }
  }
  async componentDidMount () {
    await this.fetchData()
  }
  fetchData = () => {
    axios
      .get(
        `${StaticData.domainIp}/replySheet/getList?transmittal_id=${parseInt(
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
          let permision = new Permision()
          if (
            permision.handlePermision(response.data.role, 'main_transmittal')
          ) {
            this.setState({ listCommentNO: response.data.content })
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
        `${StaticData.domainIp}/replySheet/getDetailByComment?commentCode=${this.state.CommentNO}`,
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        }
      )
      .then(async response => {
        if (response.status === 200) {
          let permision = await new Permision()
          if (
            permision.handlePermision(response.data.role, 'main_transmittal')
          ) {
            await this.setState({ detail: [] })
            await this.setState({
              cc: response.data.content.cc,
              documentNo: response.data.content.documentNumber,
              from: response.data.content.from,
              LetNo: response.data.content.letterNo,
              MomDate: response.data.content.momDate,
              to: response.data.content.to,
              MOM: response.data.content.momNo,
              readOnly: response.data.content.readonly
            })
            if (response.data.content.commentStatus === 'CM') {
              if (response.data.content.readonly) {
                for (let item in response.data.content.detail) {
                  if (response.data.content.replyDetail[item]) {
                    let fileList = await [],
                      nativeList = await []
                    for (let file in response.data.content.replyDetail[item]
                      .AttachmentFile) {
                      await fileList.push(
                        response.data.content.replyDetail[item].AttachmentFile[
                          file
                        ]
                      )
                    }
                    response.data.content.replyDetail[
                      item
                    ].AttachmentFile = await fileList
                    for (let native in response.data.content.replyDetail[item]
                      .NativeFile) {
                      await nativeList.push(
                        response.data.content.replyDetail[item].NativeFile[
                          native
                        ]
                      )
                    }
                    response.data.content.replyDetail[
                      item
                    ].NativeFile = await nativeList
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
                    NativeFileName: []
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
                let fileList2 = await [],
                  nativeList2 = await []
                for (let item2 in response.data.content.replyDetail) {
                  for (let file2 in response.data.content.replyDetail[item2]
                    .AttachmentFile) {
                    await fileList2.push(
                      response.data.content.replyDetail[item2].AttachmentFile[
                        file2
                      ]
                    )
                  }
                  response.data.content.replyDetail[
                    item2
                  ].AttachmentFile = await fileList2
                  for (let native2 in response.data.content.replyDetail[item2]
                    .NativeFile) {
                    await nativeList2.push(
                      response.data.content.replyDetail[item2].NativeFile[
                        native2
                      ]
                    )
                  }
                  response.data.content.replyDetail[
                    item2
                  ].NativeFile = await nativeList2
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
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      if (this.state.redirect) {
        return <Redirect to='/project-engineering' />
      } else {
        return (
          <div className='form row justify-content-start ltr'>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form data ${
                  this.state.foucs === 'CommentNO' ||
                  handleCheckText(this.state.CommentNO)
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
                  handleCheckText(this.state.to) ? 'active' : ''
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
              id={this.props.id}
              CommentNO={this.state.CommentNO}
              setLoading={e => this.setState({ loading: e })}
              replyNo={this.state.replyNo}
            />
            {!this.state.readOnly && this.Submit !== null ? (
              <div className='submit-form col-12 mt-5 justify-content-end'>
                <button
                  className='justify-content-center'
                  onClick={() => this.Submit('')}
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
                >
                  ثبت و ادامه
                  {this.state.loading === 'submit-continue' ? (
                    <Loading className='form-loader mr-0 ml-1' />
                  ) : (
                    <DoneIcon className='mr-0 ml-1' />
                  )}
                </button>
              </div>
            ) : (
              ''
            )}
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
      redirect: false
    }
  }
  componentDidMount () {
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
        Authorization: `Bearer ${this.state.token ? this.state.token : null}`
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
    let result = await {}
    for (let i = 0; i < this.state.array.length; i++) {
      if (this.state.array[i].replay.text === '') {
        check = false
      } else {
        check = true
      }
      let AttachmentFileResult = {},
        NativeFileResult = {}
      if (this.state.array[i].replay.AttachmentFile.length) {
        this.state.array[i].replay.AttachmentFile.forEach((data, key) => {
          AttachmentFileResult[key] = data
        })
      }
      this.state.array[i].replay.AttachmentFile = AttachmentFileResult
      if (this.state.array[i].replay.NativeFile.length) {
        this.state.array[i].replay.NativeFile.forEach(
          (data1, index) => (NativeFileResult[index] = data1)
        )
      }
      this.state.array[i].replay.NativeFile = NativeFileResult
      result[i] = this.state.array[i].replay
    }
    if (this.props.id && this.props.CommentNO && check) {
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
          url: `${StaticData.domainIp}/replySheet/create`,
          data: datareg,
          headers: {
            Authorization: `Bearer ${
              this.state.token ? this.state.token : null
            }`
          }
        })
          .then(async response => {
            this.props.setLoading('')
            if (response.status === 200) {
              if (status === 'continue') {
                await window.location.reload(true)
              } else {
                await this.setState({ redirect: true })
              }
            } else {
              Notification.notify(Message.text(response.status), 'error')
            }
          })
          .catch(err => {
            this.props.setLoading('')
            if (err.response) {
              Notification.notify(Message.text(err.response.status), 'error')
            }
          })
      }, 100)
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  render () {
    if (this.state.redirect) {
      return <Redirect to='/project-engineering' />
    } else
      return this.state.array.map((data, i) => (
        <div className='col-12 row m-0' key={i}>
          <div className='w-100'>
            <div className='col-xl-12 col-lg-12 col-md-12 col-12 p-0'>
              <div
                className={`field-form textarea ltr ${
                  this.props.foucs === `text_${i}` || handleCheckText(data.text)
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
                  {this.Convertor(data.AttachmentFile, data.AttachmentFileName)
                    .length > 0 ? (
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
                  {this.Convertor(data.NativeFile, data.NativeFileName).length >
                  0 ? (
                    this.Convertor(data.NativeFile, data.NativeFileName).map(
                      (file, index) => (
                        <a
                          href={file.link}
                          key={index}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <span>{file.name}</span>
                        </a>
                      )
                    )
                  ) : (
                    <span>موردی وجود ندارد</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <AddReplay _key={i} replay={data.replay} {...this} />
        </div>
      ))
  }
}
