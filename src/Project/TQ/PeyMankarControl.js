import React, { Component } from 'react'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import Loading from '../../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import Cookies from 'js-cookie'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import axios from 'axios'
import StaticData from '../../staticData'
import VisibilityIcon from '@material-ui/icons/VisibilityRounded'
import { Redirect } from 'react-router-dom'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import EditIcon from '@material-ui/icons/Edit'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'

export default class PeyMankarControl extends Component {
  constructor (props) {
    super(props)
    this.sign = ''
    this.state = {
      loading: '',
      token: Cookies.get('token'),
      id: '',
      qualityNCR: 'false',
      qualityDescription: '',
      AttachmentFile: [],
      AttachmentFileName: [],
      qualityAttachmentDescription: '',
      FullName: '',
      pictureShow: '',
      popUp: false,
      foucs: '',
      redirect: false,
      reject: false,
      disabledVerify: false,
      disabledButton: false
    }
  }
  componentDidMount () {
    if (this.state.token) {
      this.setState(this.props)
      if (this.props.edit && this.props.state) {
        this.setState({
          qualityDescription: this.props.state.description,
          qualityNCR: this.props.state.qualityNCR,
          AttachmentFile: Object.keys(
            this.props.state.qualityAttachmentFile
          ).map(_ => {
            return this.props.state.qualityAttachmentFile[_]
          }),
          AttachmentFileName: Object.keys(
            this.props.state.qualityAttachmentFile
          ).map(_ => {
            return this.props.state.qualityAttachmentFile[_]
          }),
          qualityAttachmentDescription: this.props.state.attachmentDescription
        })
      }
      const url = window.location.href
      let id = url.split('-')[url.split('-').length - 1]
      if (this.props.disabled) {
        let obj = this.props.qualityName
        if (obj !== null) {
          this.sign = obj.sign
          this.setState({
            id: id,
            FullName: `${obj.first_name} ${obj.last_name}`,
            pictureShow: obj.sign
          })
        }
      } else {
        let object = JSON.parse(Cookies.get('userDetail'))
        this.sign = object.sign
        this.setState({
          id: id,
          FullName: `${object.first_name} ${object.last_name}`,
          pictureShow: object.sign
        })
      }
    }
  }
  OnFocus = name => {
    if (!this.props.disabled) {
      this.setState({ foucs: name })
    }
  }
  OnBlur = () => {
    if (!this.props.disabled) {
      this.setState({ foucs: '' })
    }
  }
  handleChange = e => {
    if (!this.props.disabled) {
      this.setState({ [e.target.name]: e.target.value })
    }
  }
  handleUpload = async e => {
    if (!this.props.disabled) {
      this.setState({ loading: 'attachmentFile' })
      await e.preventDefault()
      for (let i = 0; i < e.target.files.length; i++) {
        let reader = await new FileReader()
        await reader.readAsDataURL(e.target.files[i])
        await this.GetLink(
          e.target.files[i],
          e.target.files[i].name,
          e.target.files.length,
          i
        )
      }
    }
  }
  GetLink = async (file, name, length, i) => {
    let datareg = await new FormData()
    await datareg.append('file', file)
    await axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/TQ`,
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
          await this.setState({
            AttachmentFile: [
              ...this.state.AttachmentFile,
              response.data.content
            ],
            AttachmentFileName: [...this.state.AttachmentFileName, name]
          })
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
  handleDelete = num => {
    if (!this.props.disabled) {
      let data = this.state.AttachmentFile,
        data2 = this.state.AttachmentFileName
      data.splice(num, 1)
      data2.splice(num, 1)
      this.setState({ AttachmentFile: data, AttachmentFileName: data2 })
    }
  }
  haldeShowName = obj => {
    let allData = []
    for (let value in obj) {
      allData.push(obj[value])
    }
    return allData
  }
  handleSubmit = async status => {
    let check = false
    if (status === 'submit') {
      check = !this.props.disabled
    } else if (status === 'edit') {
      check = this.props.edit
    }
    if (this.state.token && this.state.id && check) {
      if (handleCheckText(this.state.qualityDescription)) {
        this.setState({ loading: 'submit', disabledButton: true })
        setTimeout(async () => {
          let result = await Object.assign({}, this.state.AttachmentFile)
          let datareg = await new FormData()
          await datareg.append('Description', this.state.qualityDescription)
          await datareg.append('AttachmentFile', JSON.stringify(result))
          await datareg.append(
            'AttachmentDescription',
            this.state.qualityAttachmentDescription
          )
          await datareg.append(
            'NCR',
            this.state.qualityNCR === 'true' ? true : false
          )
          await axios({
            method: 'post',
            url: `${StaticData.domainIp}/tq/update/${this.state.id}/quality`,
            data: datareg,
            headers: {
              Authorization: `Bearer ${
                this.state.token ? this.state.token : null
              }`
            }
          })
            .then(response => {
              this.setState({ loading: '' })
              if (response.status === 200 && response.statusText === 'OK') {
                Notification.notify(
                  Message.text(status === 'submit' ? 900 : 906),
                  'success'
                )
                setTimeout(() => {
                  this.setState({ redirect: true, disabledButton: false })
                }, 5000)
              } else if (response.status === 214) {
                this.setState({ disabledButton: false })
                Notification.notify(Message.text(response.status), 'error')
                setTimeout(() => {
                  window.location.href = '/Home'
                }, 5000)
              } else {
                this.setState({ disabledButton: false })
                Notification.notify(Message.text(response.status), 'error')
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
  }
  handleVerify = async (status, message = '') => {
    if (this.state.token) {
      await this.setState({
        loading: status ? 'submit' : 'submit-unaccept',
        disabledVerify: true
      })
      let datareg = await new FormData()
      await datareg.append('Verify', status)
      await datareg.append('VerifyMessage', message)
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/tq/verify/${this.state.id}/quality`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          await this.setState({ loading: '', popUp: false, reject: false })
          if (response.status === 200) {
            Notification.notify(Message.text(920), 'success')
            setTimeout(async () => {
              this.setState({ redirect: true, disabledVerify: false })
            }, 5000)
          } else {
            this.setState({ disabledVerify: false })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(async err => {
          await this.setState({
            loading: '',
            popUp: false,
            reject: false,
            disabledVerify: false
          })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  render () {
    if (this.state.redirect) {
      return <Redirect to='/tq-index' />
    } else
      return (
        <React.Fragment>
          <div className='w-100 row justify-content-start m-0'>
            <div className='title-password col-12'>
              <h2 className='IranSans_Bold'>نظر کارشناس مهندسی مشارکت</h2>
              <div className='line'></div>
            </div>
            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
              <div
                className={`field-form persian textarea ${
                  this.state.foucs === 'qualityDescription' ||
                  handleCheckText(this.state.qualityDescription)
                    ? 'active'
                    : ''
                }`}
              >
                <div className='col p-0'>
                  <label>
                    شرح
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <textarea
                    className='w-100'
                    type='text'
                    name='qualityDescription'
                    onFocus={e => this.OnFocus(e.target.name)}
                    onBlur={this.OnBlur}
                    onChange={this.handleChange}
                    value={handleString(this.state.qualityDescription)}
                    readOnly={this.props.disabled ? true : false}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
              <div className='field-radio'>
                <label>
                  نیاز به صدور NCR میباشد :
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <div className='main-radio'>
                  <div className='radio-button'>
                    {!this.props.disabled ? (
                      <input
                        readOnly={this.props.disabled ? true : false}
                        className='d-none'
                        type='radio'
                        id='yes'
                        name='qualityNCR'
                        value='yes'
                        onClick={() => this.setState({ qualityNCR: 'true' })}
                      />
                    ) : (
                      ''
                    )}
                    <label htmlFor='yes'>
                      {this.state.qualityNCR === 'true' ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      بله
                    </label>
                  </div>
                  <div className='radio-button'>
                    {!this.props.disabled ? (
                      <input
                        readOnly={this.props.disabled ? true : false}
                        className='d-none'
                        type='radio'
                        id='no'
                        name='qualityNCR'
                        value='no'
                        onClick={() => this.setState({ qualityNCR: 'false' })}
                      />
                    ) : (
                      ''
                    )}
                    <label htmlFor='no'>
                      {this.state.qualityNCR === 'false' ? (
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
              <div
                className={`field-form persian ${
                  this.state.foucs === 'FullName' ||
                  handleCheckText(this.state.FullName)
                    ? 'active'
                    : ''
                }`}
              >
                <div className='col p-0'>
                  <label>نام و نام خانوادگی</label>
                  <input
                    readOnly={true}
                    type='text'
                    name='FullName'
                    value={handleString(this.state.FullName)}
                  />
                  <div className='Signature'>
                    <span
                      onClick={() =>
                        this.setState({ pictureShow: this.sign, popUp: true })
                      }
                    >
                      <VisibilityIcon />
                      امضا
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
              <div className={`field-form persian`}>
                <label>پیوست</label>
                {this.props.disabled ? (
                  <div className='pl-1 allName col row m-0 justify-content-end'>
                    {this.haldeShowName(this.state.qualityAttachmentFile).map(
                      (data, key) => (
                        <a
                          href={data}
                          target='_blank'
                          rel='noreferrer'
                          key={key}
                        >
                          <span>
                            <VisibilityIcon className='ml-1' />
                            {`پیوست ${key + 1}`}
                          </span>
                        </a>
                      )
                    )}
                  </div>
                ) : (
                  <div className='allName col row m-0 justify-content-end'>
                    {this.state.AttachmentFileName.map((name, key) => (
                      <span key={key}>
                        <CloseRoundedIcon
                          onClick={() => this.handleDelete(key)}
                        />
                        <a
                          href={
                            this.state.AttachmentFile[key]
                              ? this.state.AttachmentFile[key]
                              : '#'
                          }
                          target='_blank'
                          rel='noreferrer'
                        >
                          {name}
                        </a>
                      </span>
                    ))}
                  </div>
                )}
                {!this.props.disabled ? (
                  <React.Fragment>
                    <input
                      className='d-none'
                      type='file'
                      id='upload-control-Peyvast'
                      multiple
                      onChange={e => this.handleUpload(e)}
                    />
                    <label
                      className='upload-label'
                      htmlFor='upload-control-Peyvast'
                    >
                      {this.state.loading === 'attachmentFile' ? (
                        <Loading className='form-loader w-auto' />
                      ) : (
                        <AttachFileIcon />
                      )}
                      آپلود فایل
                    </label>
                  </React.Fragment>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  this.state.foucs === 'qualityAttachmentDescription' ||
                  handleCheckText(this.state.qualityAttachmentDescription)
                    ? 'active'
                    : ''
                }`}
              >
                <label>شرح پیوست</label>
                <input
                  readOnly={this.props.disabled ? true : false}
                  type='text'
                  name='qualityAttachmentDescription'
                  value={handleString(this.state.qualityAttachmentDescription)}
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {!this.props.disabled && !this.props.edit ? (
              <div className='submit-form col-12'>
                <button
                  onClick={() => this.handleSubmit('submit')}
                  disabled={this.state.disabledButton}
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
            {this.props.verify ? (
              <div className='submit-form col-12 mt-3 mb-3 justify-content-center'>
                <button
                  className='mr-2 m-2 accept'
                  onClick={() => this.handleVerify(true, '')}
                  disabled={this.state.disabledVerify}
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
                  onClick={() => this.setState({ reject: true, popUp: true })}
                  disabled={this.state.disabledVerify}
                >
                  <CloseRoundedIcon />
                  رد
                </button>
              </div>
            ) : (
              ''
            )}
            {this.props.edit ? (
              <div className='submit-form col-12'>
                <button
                  onClick={() => this.handleSubmit('edit')}
                  disabled={this.state.disabledButton}
                >
                  {this.state.loading === 'submit' ? (
                    <Loading className='form-loader' />
                  ) : (
                    <EditIcon />
                  )}
                  ویرایش اطلاعات
                </button>
              </div>
            ) : (
              ''
            )}
            {this.state.popUp ? (
              <Sign
                close={e => this.setState({ popUp: e, reject: e })}
                pictureShow={this.state.pictureShow}
                reject={this.state.reject}
                handleVerify={this.handleVerify}
                loading={this.state.loading}
                disabled={this.state.disabledVerify}
              />
            ) : (
              ''
            )}
          </div>
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
        onClick={() => (this.props.reject ? null : this.props.close(false))}
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
                  onClick={() =>
                    handleCheckText(this.state.errorText)
                      ? this.props.handleVerify(false, this.state.errorText)
                      : ''
                  }
                  disabled={this.props.disabled || this.state.errorText === ''}
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
                  disabled={this.props.disabled}
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
