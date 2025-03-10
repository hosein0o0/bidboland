import React, { Component } from 'react'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import axios from 'axios'
import StaticData from '../../staticData'
import Cookies from 'js-cookie'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../../layout/loading'
import { Redirect } from 'react-router-dom'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'

export default class Creater extends Component {
  constructor (props) {
    super(props)
    this.list = []
    this.state = {
      token: Cookies.get('token'),
      IdNumber: '',
      ContractNumber: '',
      ReferenceNo: '',
      mapNo: '',
      project: '',
      phase: '',
      unit: '',
      disc: '',
      Document: 'TQ',
      orginator: '',
      subject: '',
      description: '',
      attachmentFile: [],
      namesFilePeymanKar: [],
      kargaahDescription: '',
      FullNameKargah: '',
      kargaahAttachmentFile: [],
      namePeyvastKargah: [],
      kargaahAttachmentDescription: '',
      attachmentDescription: '',
      userDetail: {},
      loading: '',
      redirect: false,
      revision: '',
      tags: [],
      listDisiplin: [],
      costImpact: 'NO',
      timeImpact: 'NO',
      qualityImpact: 'NO',
      other: false,
      costImpactDescription: '',
      qualityImpactDescription: '',
      timeImpactDescription: '',
      disabled: false,
      role: null
    }
  }
  componentDidMount () {
    if (this.state.token) {
      if (Cookies.get('userDetail')) {
        let obj = JSON.parse(Cookies.get('userDetail'))
        this.setState({
          userDetail: obj,
          FullNameKargah: `${obj.first_name} ${obj.last_name}`
        })
      }
      this.fetchData()
    }
  }
  fetchData = () => {
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/tq/getFirstDetail`,
      data: '',
      headers: {
        Authorization: this.state.token ? `Bearer ${this.state.token}` : null
      }
    })
      .then(response => {
        if (response.status === 200 && response.statusText === 'OK') {
          this.setState({
            IdNumber: response.data.content.id,
            ContractNumber: response.data.content.contractNumber,
            ReferenceNo: response.data.content.refrenceNumber,
            role: response.data.role
          })
        } else if (response.status === 214) {
          Notification.notify(Message.text(response.status), 'error')
          setTimeout(() => {
            window.location.href = '/Home'
          }, 5000)
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
    this.setState({ [e.target.name]: e.target.value })
  }
  handleUpload = (e, files, names) => {
    e.preventDefault()
    this.setState({ loading: files })
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[i])
      this.GetLink(files, e.target.files[i], names, e.target.files.length, i)
    }
  }
  GetLink = (nameState, file, names, length, i) => {
    let datareg = new FormData()
    datareg.append('file', file)
    axios({
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
            [names]: [...this.state[names], file.name],
            [nameState]: [...this.state[nameState], response.data.content]
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
  deleteFile = (num, files, names) => {
    let data = this.state[`${files}`],
      data2 = this.state[`${names}`]
    data.splice(num, 1)
    data2.splice(num, 1)
    this.setState({ [files]: data, [names]: data2 })
  }
  HandleNumberMap = e => {
    let value = e.target.value.split('-')
    if (value.length > 0) {
      if (value[0] === '' && value.length === 1) {
        this.setState({
          project: '',
          phase: '',
          unit: '',
          disc: ''
        })
      } else {
        if (value[0]) {
          this.setState({ project: value[0] })
        }
        if (value[1]) {
          this.setState({ phase: value[1] })
        }
        if (value[2]) {
          this.setState({ unit: value[2] })
        }
        if (value[3]) {
          this.setState({ disc: value[3] })
        }
      }
    }
  }
  getDisiplin = e => {
    this.setState({
      [e.target.name]: e.target.checked
    })
  }
  handleSubmit = async () => {
    let check =
      handleCheckText(this.state.mapNo) &&
      handleCheckText(this.state.project) &&
      handleCheckText(this.state.phase) &&
      handleCheckText(this.state.unit) &&
      handleCheckText(this.state.disc) &&
      handleCheckText(this.state.orginator) &&
      handleCheckText(this.state.subject) &&
      handleCheckText(this.state.description) &&
      this.state.attachmentFile.length > 0 &&
      handleCheckText(this.state.attachmentDescription) &&
      handleCheckText(this.state.kargaahDescription) &&
      this.state.costImpact !== 'select' &&
      this.state.timeImpact !== 'select' &&
      this.state.qualityImpact !== 'select'
    if (check) {
      this.setState({ loading: 'submit', disabled: true })
      setTimeout(async () => {
        let datareg = await new FormData()
        await datareg.append('mapNo', this.state.mapNo)
        await datareg.append('project', this.state.project)
        await datareg.append('phase', this.state.phase)
        await datareg.append('unit', this.state.unit)
        await datareg.append('disc', this.state.disc)
        await datareg.append('orginator', this.state.orginator)
        await datareg.append('subject', this.state.subject)
        await datareg.append('description', this.state.description)
        await datareg.append(
          'attachmentFile',
          JSON.stringify(Object.assign({}, this.state.attachmentFile))
        )
        await datareg.append(
          'attachmentDescription',
          this.state.attachmentDescription
        )
        await datareg.append(
          'kargaahDescription',
          this.state.kargaahDescription
        )
        await datareg.append(
          'kargaahAttachmentDescription',
          this.state.kargaahAttachmentDescription
        )
        await datareg.append(
          'kargaahAttachmentFile',
          JSON.stringify(Object.assign({}, this.state.kargaahAttachmentFile))
        )
        await datareg.append('revision', this.state.revision)
        await datareg.append('otherDescription', this.state.tags.join(','))
        await datareg.append(
          'architecture',
          this.state.architecture ? 'YES' : 'NO'
        )
        await datareg.append(
          'construction',
          this.state.construction ? 'YES' : 'NO'
        )
        await datareg.append(
          'electricity',
          this.state.electricity ? 'YES' : 'NO'
        )
        await datareg.append('heating', this.state.heating ? 'YES' : 'NO')
        await datareg.append('piping', this.state.piping ? 'YES' : 'NO')
        await datareg.append('tool', this.state.tool ? 'YES' : 'NO')
        await datareg.append('mechanic', this.state.mechanic ? 'YES' : 'NO')
        await datareg.append('costImpact', this.state.costImpact)
        await datareg.append('timeImpact', this.state.timeImpact)
        await datareg.append('qualityImpact', this.state.qualityImpact)
        await datareg.append('other', this.state.other ? 'YES' : 'NO')
        await datareg.append(
          'costImpactDescription',
          this.state.costImpactDescription
        )
        await datareg.append(
          'timeImpactDescription',
          this.state.timeImpactDescription
        )
        await datareg.append(
          'qualityImpactDescription',
          this.state.qualityImpactDescription
        )
        await axios({
          method: 'post',
          url: `${StaticData.domainIp}/tq/create`,
          data: datareg,
          headers: {
            Authorization: this.state.token
              ? `Bearer ${this.state.token}`
              : null
          }
        })
          .then(response => {
            this.setState({ loading: false })
            if (response.status === 200) {
              Notification.notify(Message.text(900), 'success')
              setTimeout(() => {
                this.setState({ redirect: true, disabled: false })
              }, 5000)
            } else {
              Notification.notify(Message.text(response.status), 'error')
              this.setState({ disabled: false })
              if (response.status === 214) {
                setTimeout(() => {
                  window.location.href = '/Home'
                }, 5000)
              }
            }
          })
          .catch(err => {
            this.setState({ loading: false, disabled: false })
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
      return <Redirect to='/tq-index' />
    } else
      return (
        <div className='w-100 row justify-content-start m-0'>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                handleCheckText(this.state.IdNumber) ? 'active' : ''
              }`}
            >
              <label>شماره شناسه سند</label>
              <input
                className='text-left'
                readOnly={true}
                type='text'
                name='IdNumber'
                value={handleString(this.state.IdNumber)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                handleCheckText(this.state.ContractNumber) ? 'active' : ''
              }`}
            >
              <label>شماره قرارداد</label>
              <input
                className='text-left'
                readOnly={true}
                type='text'
                name='ContractNumber'
                value={handleString(this.state.ContractNumber)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                handleCheckText(this.state.ReferenceNo) ? 'active' : ''
              }`}
            >
              <label>شماره مرجع</label>
              <input
                className='text-left'
                readOnly={true}
                type='text'
                name='ReferenceNo'
                value={handleString(this.state.ReferenceNo)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                this.state.foucs === 'mapNo' ||
                handleCheckText(this.state.mapNo)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                شماره نقشه
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                className='text-left'
                type='text'
                name='mapNo'
                value={handleString(this.state.mapNo)}
                onFocus={e => this.OnFocus(e.target.name)}
                onBlur={this.OnBlur}
                onChange={e => {
                  this.handleChange(e)
                  this.HandleNumberMap(e)
                }}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                this.state.foucs === 'project' ||
                handleCheckText(this.state.project)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                پروژه
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                type='text'
                readOnly={true}
                name='project'
                value={handleString(this.state.project)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                this.state.foucs === 'phase' ||
                handleCheckText(this.state.phase)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                فاز
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={true}
                type='text'
                name='phase'
                value={handleString(this.state.phase)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                this.state.foucs === 'unit' || handleCheckText(this.state.unit)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                ناحیه
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={true}
                type='text'
                name='unit'
                value={handleString(this.state.unit)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                this.state.foucs === 'disc' || handleCheckText(this.state.disc)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                دیسیپلین
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={true}
                type='text'
                name='disc'
                value={handleString(this.state.disc)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form ${
                this.state.foucs === 'revision' ||
                handleCheckText(this.state.revision)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                Rev.
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                className='text-left'
                type='text'
                name='revision'
                value={handleString(this.state.revision)}
                onFocus={e => this.OnFocus(e.target.name)}
                onBlur={this.OnBlur}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                this.state.foucs === 'Document' ||
                handleCheckText(this.state.Document)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                نوع سند
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                readOnly={true}
                type='text'
                name='Document'
                value={handleString(this.state.Document)}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                this.state.foucs === 'orginator' ||
                handleCheckText(this.state.orginator)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                درخواست کننده
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                type='text'
                name='orginator'
                value={handleString(this.state.orginator)}
                onFocus={e => this.OnFocus(e.target.name)}
                onBlur={this.OnBlur}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                this.state.foucs === 'subject' ||
                handleCheckText(this.state.subject)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                موضوع
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                type='text'
                name='subject'
                value={handleString(this.state.subject)}
                onFocus={e => this.OnFocus(e.target.name)}
                onBlur={this.OnBlur}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
            <div
              className={`field-form persian textarea ${
                this.state.foucs === 'description' ||
                handleCheckText(this.state.description)
                  ? 'active'
                  : ''
              }`}
            >
              <div className='col p-0'>
                <label className='textarea'>
                  شرح درخواست / پرسش فنی (TQ)
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <textarea
                  className='w-100'
                  type='text'
                  name='description'
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                  value={handleString(this.state.description)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
            <div className={`field-form persian`}>
              <label>
                مدارک پیوست
                <span className='star IranSans_Bold'>*</span>
              </label>
              <div className='allName col row m-0 justify-content-end'>
                {this.state.namesFilePeymanKar.map((name, key) => (
                  <span key={key}>
                    <CloseRoundedIcon
                      onClick={() =>
                        this.deleteFile(
                          key,
                          'attachmentFile',
                          'namesFilePeymanKar'
                        )
                      }
                    />
                    {name}
                  </span>
                ))}
              </div>
              <input
                className='d-none'
                type='file'
                id='upload-creater'
                multiple
                onChange={e =>
                  this.handleUpload(e, 'attachmentFile', 'namesFilePeymanKar')
                }
              />
              <label className='upload-label' htmlFor='upload-creater'>
                {this.state.loading === 'attachmentFile' ? (
                  <Loading className='form-loader w-auto' />
                ) : (
                  <AttachFileIcon />
                )}
                آپلود فایل
              </label>
            </div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                this.state.foucs === 'attachmentDescription' ||
                (this.state.attachmentDescription &&
                  handleCheckText(this.state.attachmentDescription))
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                شرح پیوست
                <span className='star IranSans_Bold'>*</span>
              </label>
              <input
                type='text'
                name='attachmentDescription'
                onFocus={e => this.OnFocus(e.target.name)}
                onBlur={this.OnBlur}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className='title-password col-12'>
            <h2 className='IranSans_Bold'>
              نظر دفتر فنی پیمانکار / مهندسی کارگاهی
            </h2>
            <div className='line'></div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
            <div
              className={`field-form persian textarea ${
                this.state.foucs === 'kargaahDescription' ||
                handleCheckText(this.state.kargaahDescription)
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
                  name='kargaahDescription'
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                  value={handleString(this.state.kargaahDescription)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                this.state.foucs === 'FullNameKargah' ||
                handleCheckText(this.state.FullNameKargah)
                  ? 'active'
                  : ''
              }`}
            >
              <div className='col p-0'>
                <label>
                  نام و نام خانوادگی
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  disabled={true}
                  type='text'
                  name='FullNameKargah'
                  value={handleString(this.state.FullNameKargah)}
                />
                <div
                  className='Signature'
                  onClick={() => this.setState({ popUp: true })}
                >
                  <span>
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
              <div className='allName col row m-0 justify-content-end'>
                {this.state.namePeyvastKargah.map((name, key) => (
                  <span key={key}>
                    <CloseRoundedIcon
                      onClick={() =>
                        this.deleteFile(
                          key,
                          'kargaahAttachmentFile',
                          'namePeyvastKargah'
                        )
                      }
                    />
                    {handleString(name)}
                  </span>
                ))}
              </div>
              <input
                className='d-none'
                type='file'
                id='upload-creater-Peyvast'
                multiple
                onChange={e =>
                  this.handleUpload(
                    e,
                    'kargaahAttachmentFile',
                    'namePeyvastKargah'
                  )
                }
              />
              <label className='upload-label' htmlFor='upload-creater-Peyvast'>
                {this.state.loading === 'kargaahAttachmentFile' ? (
                  <Loading className='form-loader w-auto' />
                ) : (
                  <AttachFileIcon />
                )}
                آپلود فایل
              </label>
            </div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                this.state.foucs === 'kargaahAttachmentDescription' ||
                handleCheckText(this.state.kargaahAttachmentDescription)
                  ? 'active'
                  : ''
              }`}
            >
              <label>شرح پیوست</label>
              <input
                type='text'
                name='kargaahAttachmentDescription'
                onFocus={e => this.OnFocus(e.target.name)}
                onBlur={this.OnBlur}
                onChange={this.handleChange}
                value={handleString(this.state.kargaahAttachmentDescription)}
              />
            </div>
          </div>
          <div className='title-password col-12'>
            <h2 className='IranSans_Bold'>تاثیر بر دیسیپلین ها</h2>
            <div className='line'></div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
            <div className='disiplin-checkbox'>
              <div className='checkbox'>
                <input
                  className='d-none'
                  id={`architecture`}
                  name='architecture'
                  type='checkbox'
                  onChange={e => this.getDisiplin(e)}
                  checked={this.state.architecture ? true : false}
                />
                <label className={'full'} htmlFor={`architecture`}>
                  {this.state.architecture ? (
                    <CheckBoxRoundedIcon />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                  معماری
                </label>
              </div>
              <div className='checkbox'>
                <input
                  className='d-none'
                  id={`construction`}
                  name='construction'
                  type='checkbox'
                  onChange={e => this.getDisiplin(e)}
                  checked={this.state.construction ? true : false}
                />
                <label className={'full'} htmlFor={`construction`}>
                  {this.state.construction ? (
                    <CheckBoxRoundedIcon />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                  عمران و سازه
                </label>
              </div>
              <div className='checkbox'>
                <input
                  className='d-none'
                  id={`electricity`}
                  name='electricity'
                  type='checkbox'
                  onChange={e => this.getDisiplin(e)}
                  checked={this.state.electricity ? true : false}
                />
                <label className={'full'} htmlFor={`electricity`}>
                  {this.state.electricity ? (
                    <CheckBoxRoundedIcon />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                  برق
                </label>
              </div>
              <div className='checkbox'>
                <input
                  className='d-none'
                  id={`heating`}
                  name='heating'
                  type='checkbox'
                  onChange={e => this.getDisiplin(e)}
                  checked={this.state.heating ? true : false}
                />
                <label className={'full'} htmlFor={`heating`}>
                  {this.state.heating ? (
                    <CheckBoxRoundedIcon />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                  گرمایش و تهویه مطبوع
                </label>
              </div>
              <div className='checkbox'>
                <input
                  className='d-none'
                  id={`piping`}
                  name='piping'
                  type='checkbox'
                  onChange={e => this.getDisiplin(e)}
                  checked={this.state.piping ? true : false}
                />
                <label className={'full'} htmlFor={`piping`}>
                  {this.state.piping ? (
                    <CheckBoxRoundedIcon />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                  لوله گذاری
                </label>
              </div>
              <div className='checkbox'>
                <input
                  className='d-none'
                  id={`tool`}
                  name='tool'
                  type='checkbox'
                  onChange={e => this.getDisiplin(e)}
                  checked={this.state.tool ? true : false}
                />
                <label className={'full'} htmlFor={`tool`}>
                  {this.state.tool ? (
                    <CheckBoxRoundedIcon />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                  ابزار
                </label>
              </div>
              <div className='checkbox'>
                <input
                  className='d-none'
                  id={`mechanic`}
                  name='mechanic'
                  type='checkbox'
                  onChange={e => this.getDisiplin(e)}
                  checked={this.state.mechanic ? true : false}
                />
                <label className={'full'} htmlFor={`mechanic`}>
                  {this.state.mechanic ? (
                    <CheckBoxRoundedIcon />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                  مکانیک
                </label>
              </div>
              <div className='checkbox'>
                <input
                  className='d-none'
                  id={`other`}
                  name='other'
                  type='checkbox'
                  onChange={e => this.setState({ other: e.target.checked })}
                  checked={this.state.other ? true : false}
                />
                <label className={'full'} htmlFor={`other`}>
                  {this.state.other ? (
                    <CheckBoxRoundedIcon />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                  سایر
                </label>
              </div>
            </div>
            {this.state.other ? (
              <div className='col-12 mt-3 mb-3'>
                <TagsInput
                  inputProps={{
                    className: 'react-tagsinput-input tagsInput',
                    placeholder: 'جدا سازی با Enter'
                  }}
                  value={handleString(this.state.tags)}
                  onChange={tags => this.setState({ tags })}
                />
              </div>
            ) : (
              ''
            )}
            <div className='col-12'>
              <div className='row-disiplin row'>
                <label>اثر هزینه ای</label>
                <div className='col row m-0'>
                  <div className='col-xl-3 col-lg-3 col-md-4'>
                    <div className={`main-toggle align-items-center active`}>
                      <div className='p-0'>
                        <span>بله</span>
                      </div>
                      <div className={`toggle-button`}>
                        <label className='switch'>
                          <input
                            type='checkbox'
                            className='d-none'
                            name={`costImpact`}
                            onChange={e =>
                              !e.target.checked
                                ? this.setState({
                                    costImpactDescription: '',
                                    costImpact: 'NO',
                                    costImpactComplete: false,
                                    costImpactEdit: false
                                  })
                                : this.setState({ costImpact: 'select' })
                            }
                          />
                          <span className='slider'></span>
                        </label>
                      </div>
                      <div className='p-0'>
                        <span>خیر</span>
                      </div>
                    </div>
                  </div>
                  <div className='col disiplin-checkbox m-0'>
                    {this.state.costImpact !== 'NO' ? (
                      <React.Fragment>
                        <div className='checkbox mr-1 ml-1'>
                          <input
                            className='d-none'
                            id={`costImpactPositive`}
                            name='costImpactPositive'
                            type='checkbox'
                            onChange={() =>
                              this.setState({
                                costImpactPositive: true,
                                costImpactNegative: false,
                                costImpact: 'POSITIVE'
                              })
                            }
                            checked={
                              this.state.costImpactPositive ? true : false
                            }
                          />
                          <label
                            className='w-auto'
                            htmlFor={`costImpactPositive`}
                          >
                            {this.state.costImpactPositive ? (
                              <CheckBoxRoundedIcon />
                            ) : (
                              <CheckBoxOutlineBlankRoundedIcon />
                            )}
                            مثبت
                          </label>
                        </div>
                        <div className='checkbox mr-1 ml-1'>
                          <input
                            className='d-none'
                            id={`costImpactNegative`}
                            name='costImpactNegative'
                            type='checkbox'
                            onChange={() =>
                              this.setState({
                                costImpactNegative: true,
                                costImpactPositive: false,
                                costImpact: 'NEGETIVE'
                              })
                            }
                            checked={
                              this.state.costImpactNegative ? true : false
                            }
                          />
                          <label
                            className='w-auto'
                            htmlFor={`costImpactNegative`}
                          >
                            {this.state.costImpactNegative ? (
                              <CheckBoxRoundedIcon />
                            ) : (
                              <CheckBoxOutlineBlankRoundedIcon />
                            )}
                            منفی
                          </label>
                        </div>
                      </React.Fragment>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                {this.state.costImpact !== 'NO' ? (
                  <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                    <div
                      className={`field-form persian textarea ${
                        this.state.foucs === 'costImpactDescription' ||
                        (this.state.costImpactDescription &&
                          handleCheckText(this.state.costImpactDescription))
                          ? 'active'
                          : ''
                      }`}
                    >
                      <div className='col p-0'>
                        <label className='textarea'>
                          توضیحات
                          <span className='star IranSans_Bold'>*</span>
                        </label>
                        <textarea
                          className='w-100'
                          type='text'
                          name='costImpactDescription'
                          value={handleString(
                            this.state.costImpactDescription
                          )}
                          onFocus={e => this.OnFocus(e.target.name)}
                          onBlur={this.OnBlur}
                          onChange={this.handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className='row-disiplin row'>
                <label>اثر زمانی</label>
                <div className='col row m-0'>
                  <div className='col-xl-3 col-lg-3 col-md-4'>
                    <div className={`main-toggle align-items-center active`}>
                      <div className='p-0'>
                        <span>بله</span>
                      </div>
                      <div className={`toggle-button`}>
                        <label className='switch'>
                          <input
                            type='checkbox'
                            className='d-none'
                            name={`timeImpact`}
                            onChange={e =>
                              !e.target.checked
                                ? this.setState({
                                    timeImpactDescription: '',
                                    timeImpact: 'NO',
                                    timeImpactNegative: false,
                                    timeImpactPositive: false
                                  })
                                : this.setState({ timeImpact: 'select' })
                            }
                          />
                          <span className='slider'></span>
                        </label>
                      </div>
                      <div className='p-0'>
                        <span>خیر</span>
                      </div>
                    </div>
                  </div>
                  <div className='col disiplin-checkbox m-0'>
                    {this.state.timeImpact !== 'NO' ? (
                      <React.Fragment>
                        <div className='checkbox mr-1 ml-1'>
                          <input
                            className='d-none'
                            id={`timeImpactPositive`}
                            name='timeImpactPositive'
                            type='checkbox'
                            onChange={() =>
                              this.setState({
                                timeImpactPositive: true,
                                timeImpactNegative: false,
                                timeImpact: 'POSITIVE'
                              })
                            }
                            checked={
                              this.state.timeImpactPositive ? true : false
                            }
                          />
                          <label
                            className='w-auto'
                            htmlFor={`timeImpactPositive`}
                          >
                            {this.state.timeImpactPositive ? (
                              <CheckBoxRoundedIcon />
                            ) : (
                              <CheckBoxOutlineBlankRoundedIcon />
                            )}
                            مثبت
                          </label>
                        </div>
                        <div className='checkbox mr-1 ml-1'>
                          <input
                            className='d-none'
                            id={`timeImpactNegative`}
                            name='timeImpactNegative'
                            type='checkbox'
                            onChange={() =>
                              this.setState({
                                timeImpactPositive: false,
                                timeImpactNegative: true,
                                timeImpact: 'NEGETIVE'
                              })
                            }
                            checked={
                              this.state.timeImpactNegative ? true : false
                            }
                          />
                          <label
                            className='w-auto'
                            htmlFor={`timeImpactNegative`}
                          >
                            {this.state.timeImpactNegative ? (
                              <CheckBoxRoundedIcon />
                            ) : (
                              <CheckBoxOutlineBlankRoundedIcon />
                            )}
                            منفی
                          </label>
                        </div>
                      </React.Fragment>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                {this.state.timeImpact !== 'NO' ? (
                  <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                    <div
                      className={`field-form persian textarea ${
                        this.state.foucs === 'timeImpactDescription' ||
                        (this.state.timeImpactDescription &&
                          handleCheckText(this.state.timeImpactDescription))
                          ? 'active'
                          : ''
                      }`}
                    >
                      <div className='col p-0'>
                        <label className='textarea'>
                          توضیحات
                          <span className='star IranSans_Bold'>*</span>
                        </label>
                        <textarea
                          className='w-100'
                          type='text'
                          name='timeImpactDescription'
                          value={handleString(
                            this.state.timeImpactDescription
                          )}
                          onFocus={e => this.OnFocus(e.target.name)}
                          onBlur={this.OnBlur}
                          onChange={this.handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className='row-disiplin row'>
                <label>اثر بر کیفیت</label>
                <div className='col row m-0'>
                  <div className='col-xl-3 col-lg-3 col-md-4'>
                    <div className={`main-toggle align-items-center active`}>
                      <div className='p-0'>
                        <span>بله</span>
                      </div>
                      <div className={`toggle-button`}>
                        <label className='switch'>
                          <input
                            type='checkbox'
                            className='d-none'
                            name={`qualityImpact`}
                            onChange={e =>
                              !e.target.checked
                                ? this.setState({
                                    qualityImpactDescription: '',
                                    qualityImpact: 'NO',
                                    qualityImpactPositive: false,
                                    qualityImpactNegative: false
                                  })
                                : this.setState({ qualityImpact: 'select' })
                            }
                          />
                          <span className='slider'></span>
                        </label>
                      </div>
                      <div className='p-0'>
                        <span>خیر</span>
                      </div>
                    </div>
                  </div>
                  <div className='col disiplin-checkbox m-0'>
                    {this.state.qualityImpact !== 'NO' ? (
                      <React.Fragment>
                        <div className='checkbox mr-1 ml-1'>
                          <input
                            className='d-none'
                            id={`qualityImpactPositive`}
                            name='qualityImpactPositive'
                            type='checkbox'
                            onChange={() =>
                              this.setState({
                                qualityImpactPositive: true,
                                qualityImpactNegative: false,
                                qualityImpact: 'POSITIVE'
                              })
                            }
                            checked={
                              this.state.qualityImpactPositive ? true : false
                            }
                          />
                          <label
                            className='w-auto'
                            htmlFor={`qualityImpactPositive`}
                          >
                            {this.state.qualityImpactPositive ? (
                              <CheckBoxRoundedIcon />
                            ) : (
                              <CheckBoxOutlineBlankRoundedIcon />
                            )}
                            مثبت
                          </label>
                        </div>
                        <div className='checkbox mr-1 ml-1'>
                          <input
                            className='d-none'
                            id={`qualityImpactNegative`}
                            name='qualityImpactNegative'
                            type='checkbox'
                            onChange={() =>
                              this.setState({
                                qualityImpactPositive: false,
                                qualityImpactNegative: true,
                                qualityImpact: 'NEGETIVE'
                              })
                            }
                            checked={
                              this.state.qualityImpactNegative ? true : false
                            }
                          />
                          <label
                            className='w-auto'
                            htmlFor={`qualityImpactNegative`}
                          >
                            {this.state.qualityImpactNegative ? (
                              <CheckBoxRoundedIcon />
                            ) : (
                              <CheckBoxOutlineBlankRoundedIcon />
                            )}
                            منفی
                          </label>
                        </div>
                      </React.Fragment>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                {this.state.qualityImpact !== 'NO' ? (
                  <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                    <div
                      className={`field-form persian textarea ${
                        this.state.foucs === 'qualityImpactDescription' ||
                        (this.state.qualityImpactDescription &&
                          handleCheckText(this.state.qualityImpactDescription))
                          ? 'active'
                          : ''
                      }`}
                    >
                      <div className='col p-0'>
                        <label className='textarea'>
                          توضیحات
                          <span className='star IranSans_Bold'>*</span>
                        </label>
                        <textarea
                          className='w-100'
                          type='text'
                          name='qualityImpactDescription'
                          value={handleString(
                            this.state.qualityImpactDescription
                          )}
                          onFocus={e => this.OnFocus(e.target.name)}
                          onBlur={this.OnBlur}
                          onChange={this.handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className='submit-form col-12'>
            <button onClick={this.handleSubmit} disabled={this.state.disabled}>
              {this.state.loading === 'submit' ? (
                <Loading className='form-loader' />
              ) : (
                <DoneIcon />
              )}
              ثبت اطلاعات
            </button>
          </div>
          {this.state.popUp ? (
            <Sign
              close={e => this.setState({ popUp: e })}
              userDetail={this.state.userDetail}
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
    this.state = {}
  }
  render () {
    return (
      <div className='backGroundPopup' onClick={() => this.props.close(false)}>
        <div className='col-xl-6 col-lg-10 col-12'>
          {this.props.userDetail.sign ? (
            <img src={this.props.userDetail.sign} alt='sign' />
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}
