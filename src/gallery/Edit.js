import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect } from 'react-router-dom'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import Loading from '../layout/loading'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import CreatableSelect from 'react-select/creatable'
import RoomIcon from '@material-ui/icons/Room'
import DoneIcon from '@material-ui/icons/Done'
import BoxResultSearch from '../layout/BoxResultSearch'
import DeleteIcon from '@material-ui/icons/Delete'
import DatePicker from 'react-datepicker2'
import FilterSelect from '../Customization/filterSelect'
import moment from 'moment-jalaali'
import getCustomFormat from '../getCustomFormat'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'

export default class Create extends Component {
  constructor (props) {
    super(props)
    // handleCheckText = HandleCheckText.handleCheckText
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      sender: '',
      date: '',
      images: [],
      imagesName: [],
      location: [],
      LocationImage: '',
      importance: '',
      text: '',
      learned_lessons: '',
      keywordsSelected: [],
      keywords: [],
      wbs: [],
      wbsSelected: '',
      back: false,
      loading: '',
      redirect: false,
      disabled: false,
      data: [],
      listDoucumentNumber: [],
      selectDocumentNumber: [],
      listSelected: [],
      _date: undefined,
      unit: [],
      zone: [],
      disc: [],
      job_phase: [],
      _open: '',
      firstLoading: true
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} -  ویرایش گالری تصاویر`
    document.addEventListener('mousedown', this.handleClickOutside)
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    if (id) {
      this.setState({ id: id })
      this.fetchData(id)
    }
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  handleClickOutside = event => {
    if (
      this.refs[this.state._open] &&
      !this.refs[this.state._open].contains(event.target)
    ) {
      this.setState({
        _open: ''
      })
    }
  }
  fetchData = id => {
    if (this.state.token) {
      axios
        .get(`${StaticData.domainIp}/gallery/getDetail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(response => {
          const content = response.data.content
          let _date = content.date
          _date = moment(`${_date}`, 'jYYYY-jM-jD')
          this.setState({
            firstLoading: false
          })
          if (response.status === 200) {
            let imageList = content.pictures
              ? Object.keys(content.pictures).map(function (_) {
                  return content.pictures[_]
                })
              : []
            let listSelected = content.document_number
              ? content.document_number.split(',')
              : []
            listSelected = Object.keys(listSelected).map(data => {
              return { value: listSelected[data], label: listSelected[data] }
            })
            this.setState({
              sender: content.firstDetail.sender,
              date: content.firstDetail.date,
              images: imageList,
              imagesName: imageList,
              LocationImage: content.location,
              location: content.firstDetail.location,
              importance: content.importance,
              text: content.text,
              learned_lessons: content.learned_lessons,
              keywordsSelected: content.keywords,
              keywords: content.firstDetail.keywords,
              wbs: content.firstDetail.wbs,
              wbsSelected: content.wbs,
              selectWbs: content.wbs ? true : false,
              disc: content.firstDetail.disc,
              job_phase: content.firstDetail.job_phase,
              unit: content.firstDetail.unit,
              zone: content.firstDetail.zone,
              unitSelected: content.unit,
              zoneSelected: content.zone,
              discSelected: content.disc,
              job_phaseSelected: content.job_phase,
              listSelected: listSelected,
              _date: _date,
              job_phaseSelectedCheck: content.job_phase ? true : false,
              discSelectedCheck: content.disc ? true : false,
              zoneSelectedCheck: content.zone ? true : false,
              unitSelectedCheck: content.unit ? true : false
            })
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({
            firstLoading: false
          })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
            if (err.response.status === 404) {
              this.setState({ back: true })
            }
          }
        })
    }
  }
  OnFocus = name => {
    this.setState({ foucs: name, _open: name })
  }
  OnBlur = () => {
    setTimeout(() => {
      this.setState({
        foucs: '',
        wbsSelected: this.state.selectWbs ? this.state.wbsSelected : '',
        documentNumberSelected: this.state.selectDocumentNumber
          ? this.state.documentNumberSelected
          : '',
        unitSelected: this.state.unitSelectedCheck
          ? this.state.unitSelected
          : '',
        zoneSelected: this.state.zoneSelectedCheck
          ? this.state.zoneSelected
          : '',
        discSelected: this.state.discSelectedCheck
          ? this.state.discSelected
          : '',
        job_phaseSelected: this.state.job_phaseSelectedCheck
          ? this.state.job_phaseSelected
          : ''
      })
    }, 200)
  }
  handleChange = e => {
    let name = e.target.name
    let value = handleString(e.target.value)
    const check =
      name === 'job_phaseSelected' ||
      name === 'discSelected' ||
      name === 'zoneSelected' ||
      name === 'unitSelected'
    if (check) {
      this.setState({
        [`${name}Check`]: false
      })
    }
    this.setState({
      [name]: value,
      selectWbs: name === 'wbsSelected' ? false : this.state.selectWbs,
      selectDocumentNumber:
        name === 'documentNumberSelected'
          ? false
          : this.state.selectDocumentNumber
    })
    if (name === 'wbsSelected' && value.length > 6) {
      this.handleRequest(value)
    } else if (name === 'documentNumberSelected' && value.length > 6) {
      this.handleDocumentMdl(value)
    }
  }
  handleRequest = async text => {
    let url = `${StaticData.domainIp}/AdvanceSearch/getEquipmentNumber?equipment_no=${text}`
    this.setState({ loading: 'search' })
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(async response => {
        this.setState({ loading: '' })
        if (response.status === 200) {
          const overal = await [{ value: 'overall', label: 'overall' }]
          const content = response.data.content
          const array = overal.concat(content)
          await this.setState({
            data: array
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
  handleUpload = async (e, files, names) => {
    await e.preventDefault()
    await this.setState({ loading: files })
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = await new FileReader()
      await reader.readAsDataURL(e.target.files[i])
      await this.GetLink(
        files,
        e.target.files[i],
        names,
        e.target.files.length,
        i
      )
    }
  }
  GetLink = (nameState, file, names, length, i) => {
    let datareg = new FormData()
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/Gallery`,
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
            [nameState]: [...this.state[nameState], response.data.content],
            [names]: [...this.state[names], file.name]
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
  deleteFile = async (num, files, names) => {
    let fileList = await this.state[files],
      nameList = await this.state[names]
    await fileList.splice(num, 1)
    await nameList.splice(num, 1)
    await this.setState({ [files]: fileList, [names]: nameList })
  }
  deleteDucoment = num => {
    let list = this.state.listSelected
    list.splice(num, 1)
    let uniq = [...new Set(list)]
    this.setState({
      listSelected: uniq
    })
  }
  getLabel = (name, newValue) => {
    this.setState({ [name]: newValue })
  }
  handleDocumentMdl = text => {
    this.setState({ loading: 'search' })
    let url = `${StaticData.domainIp}/detailEng/searchInDocuments?documentNumber=${text}`
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(response => {
        this.setState({ loading: '' })
        if (response.status === 200) {
          // listSelected
          let array = response.data.content.concat(this.state.listSelected)
          let uniq = [...new Set(array)]
          this.setState({ listDoucumentNumber: uniq })
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
  handleSelectData = (data, name1, name2) => {
    const check =
      name1 === 'documentNumberSelected' && name2 === 'selectDocumentNumber'
    this.setState({
      [name1]: check ? '' : data.value,
      [name2]: true
    })

    if (check) {
      let list = this.state.listSelected
      list.push(data)
      list = [...new Set(list)]
      this.setState({
        listSelected: list
      })
    }
  }
  handleSubmit = async () => {
    let {
      importance,
      wbsSelected,
      zoneSelected,
      unitSelected,
      discSelected,
      job_phaseSelected,
      listSelected,
      id,
      images,
      LocationImage,
      keywordsSelected,
      text,
      learned_lessons,
      _date,
      token
    } = this.state
    const check =
      handleCheckText(id) &&
      handleCheckText(importance) &&
      handleCheckText(wbsSelected) &&
      handleCheckText(zoneSelected) &&
      handleCheckText(unitSelected) &&
      handleCheckText(discSelected) &&
      handleCheckText(job_phaseSelected)
    if (
      check &&
      images.length > 0 &&
      handleCheckText(LocationImage) &&
      handleCheckText(LocationImage.value) &&
      keywordsSelected.length > 0
    ) {
      let _keywordsSelected = Object.keys(keywordsSelected).map(data => {
        return `${keywordsSelected[data].value}`
      })
      let document_number = await Object.keys(listSelected).map(key => {
        return listSelected[key].value
      })
      await this.setState({ loading: 'submit', disabled: true })
      let datareg = await new FormData()
      await datareg.append('id', id)
      await datareg.append(
        'pictures',
        JSON.stringify(Object.assign({}, images))
      )
      await datareg.append('location', LocationImage.value)
      await datareg.append('importance', importance)
      await datareg.append('text', text)
      await datareg.append('learned_lessons', learned_lessons)
      await datareg.append('keywords', _keywordsSelected.join(','))
      await datareg.append('wbs', wbsSelected ? wbsSelected : '')
      await datareg.append('date', getCustomFormat(_date, false))
      await datareg.append('unit', unitSelected)
      await datareg.append('zone', zoneSelected)
      await datareg.append('disc', discSelected)
      await datareg.append('job_phase', job_phaseSelected)
      await datareg.append('document_number', document_number.join(','))
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/gallery/update`,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(100), 'success')
            setTimeout(async () => {
              await this.setState({ redirect: true, disabled: false })
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
    } else if (this.state.back) {
      return <Redirect to='/404' />
    } else if (this.state.redirect) {
      return <Redirect to='/gallery' />
    } else
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
                  nameRole='gallery_edit'
                  nameUrl={this.props.nameUrl}
                  firstLoading={this.state.firstLoading}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>ویرایش گزارش تصویری</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row'>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state.foucs === 'sender' ||
                                handleCheckText(this.state.sender)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <label>
                                ارسال کننده
                                <span className='star IranSans_Bold'>*</span>
                              </label>
                              <input
                                name='sender'
                                value={handleString(this.state.sender)}
                                readOnly={true}
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state._date ? 'active' : ''
                              }`}
                            >
                              <div className='icon-field'>
                                <DateRangeRoundedIcon />
                              </div>
                              <div className='col p-0'>
                                <label>تاریخ ارسال تصویر</label>
                                <DatePicker
                                  persianDigits={true}
                                  isGregorian={false}
                                  timePicker={false}
                                  onChange={_date => this.setState({ _date })}
                                  value={this.state._date}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form overflow-initial ${
                                this.state.foucs === 'unitSelected' ||
                                handleCheckText(this.state.unitSelected)
                                  ? 'active'
                                  : ''
                              }`}
                              ref='unitSelected'
                            >
                              <div className='col p-0'>
                                <label>
                                  Unit
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='w-100 text-left'
                                  type='text'
                                  name='unitSelected'
                                  value={handleString(this.state.unitSelected)}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                />
                              </div>
                              {this.state._open === 'unitSelected' && (
                                <FilterSelect
                                  {...this}
                                  nameList='unit'
                                  handleState={(name, value) =>
                                    this.setState({ [name]: value })
                                  }
                                  nameValue={'unitSelected'}
                                />
                              )}
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form overflow-initial ${
                                this.state.foucs === 'zoneSelected' ||
                                handleCheckText(this.state.zoneSelected)
                                  ? 'active'
                                  : ''
                              }`}
                              ref='zoneSelected'
                            >
                              <div className='col p-0'>
                                <label>
                                  Zone
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='w-100 text-left'
                                  type='text'
                                  name='zoneSelected'
                                  value={handleString(this.state.zoneSelected)}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                />
                              </div>
                              {this.state._open === 'zoneSelected' && (
                                <FilterSelect
                                  {...this}
                                  nameList='zone'
                                  handleState={(name, value) =>
                                    this.setState({ [name]: value })
                                  }
                                  nameValue={'zoneSelected'}
                                />
                              )}
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form overflow-initial ${
                                this.state.foucs === 'discSelected' ||
                                handleCheckText(this.state.discSelected)
                                  ? 'active'
                                  : ''
                              }`}
                              ref='discSelected'
                            >
                              <div className='col p-0'>
                                <label>
                                  Disc
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='w-100 text-left'
                                  type='text'
                                  name='discSelected'
                                  value={handleString(this.state.discSelected)}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                />
                              </div>
                              {this.state._open === 'discSelected' && (
                                <FilterSelect
                                  {...this}
                                  nameList='disc'
                                  handleState={(name, value) =>
                                    this.setState({ [name]: value })
                                  }
                                  nameValue={'discSelected'}
                                />
                              )}
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form overflow-initial ${
                                this.state.foucs === 'job_phaseSelected' ||
                                handleCheckText(this.state.job_phaseSelected)
                                  ? 'active'
                                  : ''
                              }`}
                              ref='job_phaseSelected'
                            >
                              <div className='col p-0'>
                                <label>
                                  Job Phase
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='w-100 text-left'
                                  type='text'
                                  name='job_phaseSelected'
                                  value={handleString(
                                    this.state.job_phaseSelected
                                  )}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                />
                              </div>
                              {this.state._open === 'job_phaseSelected' && (
                                <FilterSelect
                                  {...this}
                                  nameList='job_phase'
                                  handleState={(name, value) =>
                                    this.setState({ [name]: value })
                                  }
                                  nameValue={'job_phaseSelected'}
                                />
                              )}
                            </div>
                          </div>
                          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                            <div className={`field-form persian`}>
                              <label>
                                تصاویر
                                <span className='star IranSans_Bold'>*</span>
                              </label>
                              <div className='allName col row m-0 justify-content-end'>
                                {this.state.imagesName.map((name, index) => (
                                  <span key={index}>
                                    <CloseRoundedIcon
                                      onClick={() =>
                                        this.deleteFile(
                                          index,
                                          'images',
                                          'imagesName'
                                        )
                                      }
                                    />
                                    <a
                                      href={name ? name : '#'}
                                      target='_blank'
                                      rel='noreferrer'
                                    >
                                      {name}
                                    </a>
                                  </span>
                                ))}
                              </div>
                              <input
                                name={`images`}
                                className='d-none'
                                type='file'
                                id={`images`}
                                multiple
                                onChange={e =>
                                  this.handleUpload(e, `images`, `imagesName`)
                                }
                              />
                              <label
                                className='upload-label'
                                htmlFor={`images`}
                              >
                                {this.state.loading === `images` ? (
                                  <Loading className='form-loader w-auto' />
                                ) : (
                                  <AttachFileIcon />
                                )}
                                آپلود فایل
                              </label>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div className='field-form selectBox'>
                              <div className='icon-field labelSelect'>
                                <RoomIcon />
                              </div>
                              <CreatableSelect
                                value={this.state.LocationImage}
                                onChange={newValue => {
                                  this.setState({
                                    LocationImage: newValue
                                  })
                                }}
                                options={this.state.location}
                                placeholder={
                                  <label>
                                    لوکیشن تصاویر
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                }
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state.foucs === `importance` ||
                                handleCheckText(this.state.importance)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <label>
                                میزان اهمیت گزارش
                                <span className='star IranSans_Bold'>*</span>
                              </label>
                              <select
                                name={`importance`}
                                onFocus={e => this.OnFocus(e.target.name)}
                                onBlur={this.OnBlur}
                                onChange={this.handleChange}
                                value={handleString(this.state.importance)}
                              >
                                <option className='d-none'></option>
                                <option value={1}>کم</option>
                                <option value={2}>متوسط</option>
                                <option value={3}>زیاد</option>
                              </select>
                            </div>
                          </div>
                          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                            <div
                              className={`field-form persian textarea ${
                                this.state.foucs === 'text' ||
                                handleCheckText(this.state.text)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <div className='col p-0'>
                                <label className='textarea'>
                                  توضیحات تصویر
                                </label>
                                <textarea
                                  className='w-100'
                                  type='text'
                                  name='text'
                                  value={handleString(this.state.text)}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                            <div
                              className={`field-form persian textarea ${
                                this.state.foucs === 'learned_lessons' ||
                                handleCheckText(this.state.learned_lessons)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <div className='col p-0'>
                                <label className='textarea'>
                                  درس آموخته ها
                                </label>
                                <textarea
                                  className='w-100'
                                  type='text'
                                  name='learned_lessons'
                                  value={handleString(
                                    this.state.learned_lessons
                                  )}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                            <div className='field-form selectBox'>
                              <CreatableSelect
                                isMulti
                                onChange={newValue =>
                                  this.getLabel('keywordsSelected', newValue)
                                }
                                options={this.state.keywords}
                                value={this.state.keywordsSelected}
                                placeholder={
                                  <label>
                                    تخصیص تگ (با Ent جدا کنید)
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                }
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form overflow-initial ${
                                this.state.foucs === 'wbsSelected' ||
                                handleCheckText(this.state.wbsSelected)
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <div className='col p-0'>
                                <label>
                                  WBS
                                  <span className='star IranSans_Bold'>*</span>
                                </label>
                                <input
                                  className='w-100 text-left'
                                  type='text'
                                  name='wbsSelected'
                                  value={handleString(this.state.wbsSelected)}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                />
                              </div>
                              {this.state.foucs === 'wbsSelected' &&
                                this.state.wbsSelected &&
                                this.state.wbsSelected.length > 4 && (
                                  <BoxResultSearch
                                    {...this}
                                    name1='wbsSelected'
                                    name2='selectWbs'
                                  />
                                )}
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form overflow-initial ${
                                this.state.foucs === 'documentNumberSelected' ||
                                handleCheckText(
                                  this.state.documentNumberSelected
                                )
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <div className='col p-0'>
                                <label>
                                  Document Number
                                  {/* <span className='star IranSans_Bold'>*</span> */}
                                </label>
                                <input
                                  className='w-100 text-left'
                                  type='text'
                                  name='documentNumberSelected'
                                  value={handleString(
                                    this.state.documentNumberSelected
                                  )}
                                  onFocus={e => this.OnFocus(e.target.name)}
                                  onBlur={this.OnBlur}
                                  onChange={this.handleChange}
                                />
                              </div>
                              {this.state.foucs === 'documentNumberSelected' &&
                                this.state.documentNumberSelected &&
                                this.state.documentNumberSelected.length >
                                  6 && (
                                  <BoxResultSearch
                                    {...this}
                                    nameList='listDoucumentNumber'
                                    name1='documentNumberSelected'
                                    name2='selectDocumentNumber'
                                  />
                                )}
                            </div>
                          </div>
                          <div className='row mx-0 w-100 justify-content-end'>
                            {this.state.listSelected.map((data, key) => (
                              <div className='col-6 ltr'>
                                <div className='text-selected' key={key}>
                                  <span className='col pl-0'>{data.label}</span>
                                  <span className='delete pointer'>
                                    <DeleteIcon
                                      onClick={() => this.deleteDucoment(key)}
                                    />
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className='submit-form col-12'>
                            <button
                              onClick={this.handleSubmit}
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
