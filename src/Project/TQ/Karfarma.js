import React, { Component } from 'react'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import Cookies from 'js-cookie'
import VisibilityIcon from '@material-ui/icons/VisibilityRounded'
import axios from 'axios'
import StaticData from '../../staticData'
import Loading from '../../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import { Redirect } from 'react-router-dom'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import EditIcon from '@material-ui/icons/Edit'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'

export default class Karfarma extends Component {
  constructor (props) {
    super(props)
    this.sign = ''
    this.state = {
      loading: '',
      token: Cookies.get('token'),
      id: '',
      NCR: false,
      karfarmaDescription: '',
      AttachmentFile: [],
      AttachmentFileName: [],
      karfarmaAttachmentDescription: '',
      FullName: '',
      pictureShow: '',
      popUp: false,
      foucs: '',
      redirect: false,
      disabledButton: false,
      reject: false,
      disabledVerify: false
    }
  }
  componentDidMount () {
    if (this.state.token) {
      this.setState(this.props)
      if (this.props.edit) {
        this.setState({
          AttachmentFile: Object.keys(this.props.karfarmaAttachmentFile).map(
            _ => {
              return this.props.karfarmaAttachmentFile[_]
            }
          ),
          AttachmentFileName: Object.keys(
            this.props.karfarmaAttachmentFile
          ).map(_ => {
            return this.props.karfarmaAttachmentFile[_]
          })
        })
      }
      const url = window.location.href
      let id = url.split('-')[url.split('-').length - 1]
      if (this.props.disabled) {
        let obj = this.props.karfarmaName
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
  handleChange = e => {
    if (!this.props.disabled) {
      this.setState({ [e.target.name]: e.target.value })
    }
  }
  handleSubmit = status => {
    let check = false
    if (status === 'submit') {
      check = !this.props.disabled
    } else if (status === 'edit') {
      check = this.props.edit
    }
    if (this.state.token && this.state.id && check) {
      if (this.state.karfarmaDescription) {
        this.setState({ loading: 'submit', disabledButton: true })
        setTimeout(async () => {
          let result = await Object.assign({}, this.state.AttachmentFile)
          let datareg = await new FormData()
          await datareg.append('Description', this.state.karfarmaDescription)
          await datareg.append('AttachmentFile', JSON.stringify(result))
          await datareg.append(
            'AttachmentDescription',
            this.state.karfarmaAttachmentDescription
          )
          await axios({
            method: 'post',
            url: `${StaticData.domainIp}/tq/update/${this.state.id}/owner`,
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
        url: `${StaticData.domainIp}/tq/verify/${this.state.id}/owner`,
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
        <div className='w-100 row justify-content-start m-0'>
          <div className='title-password col-12'>
            <h2 className='IranSans_Bold'>نظر کارفرما</h2>
            <div className='line'></div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
            <div
              className={`field-form persian textarea ${
                this.state.foucs === 'karfarmaDescription' ||
                handleCheckText(this.state.karfarmaDescription)
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
                  name='karfarmaDescription'
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                  value={
                    handleString(this.state.karfarmaDescription)
                  }
                  readOnly={this.props.disabled ? true : false}
                ></textarea>
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
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                />
                <div className='Signature'>
                  <span
                    onClick={() =>
                      this.setState({ pictureShow: this.sign, popUp: true })
                    }
                  >
                    <AttachFileIcon className='attach' />
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
                  {this.haldeShowName(this.state.karfarmaAttachmentFile).map(
                    (data, key) => (
                      <a key={key} href={data} target='_blank' rel='noreferrer'>
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
              {this.props.disabled ? (
                ''
              ) : (
                <React.Fragment>
                  <input
                    className='d-none'
                    type='file'
                    id='upload-karfarma-file'
                    multiple
                    onChange={e => this.handleUpload(e)}
                  />
                  <label
                    className='upload-label'
                    htmlFor='upload-karfarma-file'
                  >
                    {this.state.loading === 'attachmentFile' ? (
                      <Loading className='form-loader w-auto' />
                    ) : (
                      <AttachFileIcon />
                    )}
                    آپلود فایل
                  </label>
                </React.Fragment>
              )}
            </div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                this.state.foucs === 'karfarmaAttachmentDescription' ||
                handleCheckText(this.state.karfarmaAttachmentDescription)
                  ? 'active'
                  : ''
              }`}
            >
              <label>شرح پیوست</label>
              <input
                type='text'
                readOnly={this.props.disabled ? true : false}
                name='karfarmaAttachmentDescription'
                value={handleString(this.state.karfarmaAttachmentDescription)}
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
              close={e => this.setState({ popUp: e, pictureShow: '' })}
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
