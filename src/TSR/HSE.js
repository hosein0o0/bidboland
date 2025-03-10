import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
// import Sidebar from '../layout/sidebar'
// import Menu from '../layout/menu'
import StaticData from '../staticData'
import DatePicker from 'react-datepicker2'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
// import CreatableSelect from 'react-select/creatable'
// import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
// import AttachFileIcon from '@material-ui/icons/AttachFile';
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import AttachedDocument from './AttachedDocument'
import ListSign from './ListSign'
import Permision from '../permision/permision'
import SignTSR from './SignTSR'
import getCustomFormat from '../getCustomFormat'
import moment from 'moment-jalaali'
import CancelButton from '../layout/CancelButton'
import Dispatch from './Dispatch'
import TOCC from './TOCC'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
export default class HSE extends Component {
  constructor (props) {
    super(props)
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      tsr_no: '',
      created_at: '',
      subject: '',
      disabled: false,
      hse_review_msg: '',
      documentNumber: [],
      Attachement: [],
      AttachementName: [],
      suggested_execution_time: undefined,
      hse_review: true,
      hazop_review: true,
      foreign_attachment: [
        {
          documentNumber: '',
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: '',
          AttachementName: [],
          Attachement: []
        }
      ],
      internal_attachment: [
        {
          documentNumber: null,
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: ''
        }
      ],
      listSign: [],
      canCreate: false,
      user_list: [],
      notification_to: [],
      notification_cc: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - بررسی TSR از دیدگاه ایمنی ، سلامت و زیست محیطی (HSE)`

    this.ShowFetch()
    this.props.GetShowFetch(4, this.ShowFetch)
  }
  async componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = await nextProps
      // await this.ShowFetch()
    }
  }
  ShowFetch = async () => {
    let tsr4 = await this.props.state.tsr4,
      obj = {}
    if (tsr4) {
      for (let value in tsr4) {
        let state
        if (value.includes('tsr4_')) {
          state = value.split('tsr4_')[1]
        } else {
          state = value
        }
        if (state === 'foreign_attachment' || state === 'internal_attachment') {
          if (this.props.show || this.props.canUpdate) {
            let objDetail = tsr4[value]
            if (objDetail) {
              obj[state] = Object.keys(objDetail).map(fi => {
                if (objDetail[fi].Attachement) {
                  objDetail[fi].Attachement = Object.keys(
                    objDetail[fi].Attachement
                  ).map(att => {
                    return objDetail[fi].Attachement[att]
                  })
                }
                return objDetail[fi]
              })
            }
          }
        } else if (state === 'hse_review' || state === 'hazop_review') {
          obj[state] =
            tsr4[value] === '1' ? true : tsr4[value] === '0' ? false : true
        } else if (state === 'suggested_execution_time') {
          if (this.props.canUpdate || !this.props.show) {
            if (tsr4[value]) {
              if (tsr4[value] !== 'null') {
                obj[state] = moment(`${tsr4[value]}`, 'jYYYY/jM/jD')
              } else {
                obj[state] = undefined
              }
            }
          } else {
            obj[state] = tsr4[value] === 'null' ? '' : tsr4[value]
          }
        } else {
          obj[state] = tsr4[value]
        }
      }
      let ListMandatory = await ListSign.ListMandatory.tsr4
      let listSign = await this.state.listSign
      ListMandatory.forEach(li => {
        listSign = [...listSign, li]
      })
      listSign = await [...new Set(listSign)]
      obj['listSign'] = await listSign
      obj['role'] = await this.props.state.role
      obj['canCreate'] = await this.Permision.handlePermision(
        this.props.state.role,
        'tsr_create'
      )
      await this.setState(obj)
    }
  }
  OnFocus = name => {
    if (this.state.canCreate && !this.props.show) {
      this.setState({ foucs: name })
    }
  }
  OnBlur = () => {
    if (this.state.canCreate && !this.props.show) {
      this.setState({ foucs: '' })
    }
  }
  handleChange = e => {
    if (this.state.canCreate && !this.props.show) {
      this.setState({ [e.target.name]: e.target.value })
    }
  }
  handleUploadList = async (e, files, names, parentState) => {
    if (this.state.canCreate && !this.props.show) {
      await e.preventDefault()
      await this.setState({ loading: files })
      names = await names.split('_')[0]
      let key = await parseInt(files.split('_')[1])
      files = await files.split('_')[0]
      for (let i = 0; i < e.target.files.length; i++) {
        let reader = await new FileReader()
        await reader.readAsDataURL(e.target.files[i])
        await this.GetLink(
          files,
          e.target.files[i],
          names,
          e.target.files.length,
          key,
          i,
          parentState
        )
      }
    }
  }
  GetLink = (nameState, file, names, length, key, i, parentState) => {
    let datareg = new FormData()
    let array = this.state[parentState][key][nameState],
      arrayName = this.state[parentState][key][names]
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/TSR`,
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
          await array.push(response.data.content)
          await arrayName.push(file.name)
          let _Parent = await this.state[parentState]
          let obj = await _Parent[key]
          obj[nameState] = await array
          obj[names] = await arrayName
          await this.setState({ [parentState]: _Parent })
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
  deleteFileList = async (key, num, files, names, parent) => {
    if (this.state.canCreate && !this.props.show) {
      let _Parent = await this.state[parent]
      let obj = await _Parent[key]
      let data1 = await obj[files]
      let data2 = await obj[names]
      await data1.splice(num, 1)
      await data2.splice(num, 1)
      await this.setState({ [parent]: _Parent })
    }
  }
  handleChangeList = (parent, name, value, key) => {
    if (this.state.canCreate && !this.props.show) {
      let list = this.state[parent]
      let obj = list[key]
      obj[name] = value
      this.setState({ [parent]: list })
    }
  }
  handleAddAttach = nameState => {
    if (this.state.canCreate && !this.props.show) {
      let obj = {}
      if (nameState === 'foreign_attachment') {
        obj = {
          documentNumber: '',
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: '',
          AttachementName: [],
          Attachement: []
        }
      } else if (nameState === 'internal_attachment') {
        obj = {
          documentNumber: null,
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: ''
        }
      }
      this.setState({ [nameState]: [...this.state[nameState], obj] })
    }
  }
  handleDelete = (nameState, key) => {
    if (this.state.canCreate && !this.props.show) {
      let data = this.state[nameState]
      data.splice(key, 1)
      this.setState({ [nameState]: data })
    }
  }
  handleSubmit = async () => {
    let {
      hse_review,
      hse_review_msg,
      suggested_execution_time,
      foreign_attachment,
      internal_attachment,
      hazop_review,
      notification_to,
      notification_cc,
      listSign
    } = this.state
    const CheckTo = notification_to
      ? notification_to.length === listSign.length && notification_to.length > 0
      : false
    const checkHse = hse_review ? handleCheckText(hse_review_msg) : true
    const check = checkHse && CheckTo
    // notification_to.length === listSign.length
    // const foreignCheck = hazop_review
    //   ? this.props.ForeignAttachments(foreign_attachment)
    //   : true
    // const internalCheck = hazop_review
    //   ? this.props.Internalَttachments(internal_attachment)
    //   : true
    if (check) {
      let To = Object.keys(notification_to).map(toData => {
        return notification_to[toData].value
      })
      notification_cc = notification_cc ? notification_cc : []
      let CC = Object.keys(notification_cc).map(toData => {
        return notification_cc[toData].value
      })
      foreign_attachment = await Object.assign(
        {},
        Object.keys(foreign_attachment).map(_ => {
          foreign_attachment[_].Attachement = Object.assign(
            {},
            foreign_attachment[_].Attachement
          )
          return foreign_attachment[_]
        })
      )
      internal_attachment = await Object.assign({}, internal_attachment)
      await this.setState({ loading: 'submit', disabled: true })
      let datareg = await new FormData()
      await datareg.append('tsr_id', this.props.state.id)
      await datareg.append('hse_review', hse_review)
      await datareg.append('hse_review_msg', hse_review_msg)
      await datareg.append(
        'suggested_execution_time',
        suggested_execution_time
          ? getCustomFormat(suggested_execution_time, false)
          : null
      )
      await datareg.append('hazop_review', hazop_review)
      await datareg.append(
        'foreign_attachment',
        JSON.stringify(foreign_attachment)
      )
      await datareg.append(
        'internal_attachment',JSON.stringify(internal_attachment)
      )
      await datareg.append('notification_to', To.join(','))
      await datareg.append('notification_cc', CC.join(','))
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/tsr/tsr4/insert`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(900), 'success')
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
  handleDisabled = () => {
    if (this.props.close) {
      return true
    } else if (this.props.show) {
      return true
    } else if (this.state.canCreate) {
      return false
    } else if (this.props.canUpdate) {
      return false
    } else {
      return true
    }
  }
  handleState = (name, value) => {
    this.setState({ [name]: value })
  }
  render () {
    const ShowToCC =
      !this.handleDisabled() &&
      this.props.state.can_do_action &&
      !this.props.close
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/index-TSR`,
            state: { select: 2 }
          }}
        />
      )
    } else
      return (
        <div className='form row justify-content-start'>
          <div className='w-100 row justify-content-start m-0'>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  handleCheckText(this.state.tsr_no) ? 'active' : ''
                }`}
              >
                <label>شماره TSR</label>
                <input
                  type='text'
                  name='tsr_no'
                  value={handleString(this.state.tsr_no)}
                  readOnly={true}
                  disabled={true}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  handleCheckText(this.state.created_at) ? 'active' : ''
                }`}
              >
                <div className='icon-field'>
                  <DateRangeRoundedIcon />
                </div>
                <div className='col p-0'>
                  <label>تاریخ درخواست</label>
                  <input
                    type='text'
                    name='number'
                    value={handleString(this.state.created_at)}
                    readOnly={true}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  handleCheckText(this.state.subject) ? 'active' : ''
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
                  readOnly={true}
                  disabled={true}
                />
              </div>
            </div>
            <div className='col-xl-12 col-lg-12 col-md-12 col-12 d-flex align-items-center'>
              <div className='field-radio w-100'>
                <label>
                  نتیجه بررسی امور HSE:
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <div className='main-radio pr-0'>
                  <div className='radio-button mr-1 ml-1'>
                    {!this.handleDisabled() && (
                      <input
                        className='d-none'
                        type='radio'
                        id='HSEYES'
                        onClick={() =>
                          this.setState({
                            hse_review: true,
                            hse_review_msg: ''
                          })
                        }
                      />
                    )}
                    <label htmlFor='HSEYES'>
                      {this.state.hse_review ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      مورد تایید است
                    </label>
                  </div>
                  <div className='radio-button mr-1 ml-1'>
                    {!this.handleDisabled() && (
                      <input
                        className='d-none'
                        type='radio'
                        id='HSENO'
                        onClick={() =>
                          this.setState({
                            hse_review: false,
                            hse_review_msg: ''
                          })
                        }
                      />
                    )}
                    <label htmlFor='HSENO'>
                      {!this.state.hse_review ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      مورد تایید نیست
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {!this.state.hse_review ? (
              <React.Fragment>
                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                  <div
                    className={`field-form persian textarea ${
                      this.state.foucs === `hse_review_msg` ||
                      handleCheckText(this.state.hse_review_msg)
                        ? 'active'
                        : ''
                    }`}
                  >
                    <div className='col p-0'>
                      <label className='textarea'>دلایل عدم تایید</label>
                      <textarea
                        className='w-100'
                        type='text'
                        name={`hse_review_msg`}
                        onFocus={e => this.OnFocus(e.target.name)}
                        onBlur={this.OnBlur}
                        onChange={this.handleChange}
                        value={handleString(this.state.hse_review_msg)}
                        readOnly={this.handleDisabled()}
                        disabled={this.handleDisabled()}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              ''
            )}
            {this.state.hse_review ? (
              <React.Fragment>
                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                  <div
                    className={`field-form persian textarea ${
                      this.state.foucs === `hse_review_msg` ||
                      handleCheckText(this.state.hse_review_msg)
                        ? 'active'
                        : ''
                    }`}
                  >
                    <div className='col p-0'>
                      <label className='textarea'>
                        الزامات و ریسک‌ها
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <textarea
                        className='w-100'
                        type='text'
                        name={`hse_review_msg`}
                        onFocus={e => this.OnFocus(e.target.name)}
                        onBlur={this.OnBlur}
                        onChange={this.handleChange}
                        value={handleString(this.state.hse_review_msg)}
                        readOnly={this.handleDisabled()}
                        disabled={this.handleDisabled()}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                  <div
                    className={`field-form persian ${
                      this.state.suggested_execution_time ? 'active' : ''
                    }`}
                  >
                    <div className='icon-field'>
                      <DateRangeRoundedIcon />
                    </div>
                    <div className='col p-0'>
                      <label>
                        زمان پیشنهادی جهت اجرا
                        {/* <span className='star IranSans_Bold'>*</span> */}
                      </label>
                      {this.handleDisabled() ? (
                        <input
                          type='text'
                          name='suggested_execution_time'
                          value={handleString(
                            this.state.suggested_execution_time
                          )}
                          readOnly={true}
                          disabled={true}
                        />
                      ) : (
                        <DatePicker
                          persianDigits={true}
                          isGregorian={false}
                          timePicker={false}
                          onChange={suggested_execution_time =>
                            this.setState({ suggested_execution_time })
                          }
                          value={
                            this.state.suggested_execution_time
                              ? this.state.suggested_execution_time
                              : null
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              ''
            )}
            <div className='col-xl-12 col-lg-12 col-md-12 col-12 d-flex align-items-center'>
              <div className='field-radio w-100'>
                <label>
                  نتیجه مطالعات HAZOP:
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <div className='main-radio pr-0'>
                  <div className='radio-button mr-1 ml-1'>
                    {!this.handleDisabled() && (
                      <input
                        className='d-none'
                        type='radio'
                        id='HAZOPYES'
                        onClick={() => this.setState({ hazop_review: true })}
                      />
                    )}
                    <label htmlFor='HAZOPYES'>
                      {this.state.hazop_review ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      ضمیمه است
                    </label>
                  </div>
                  <div className='radio-button mr-1 ml-1'>
                    {!this.handleDisabled() && (
                      <input
                        className='d-none'
                        type='radio'
                        id='HAZOPNO'
                        onClick={() => this.setState({ hazop_review: false })}
                      />
                    )}
                    <label htmlFor='HAZOPNO'>
                      {!this.state.hazop_review ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      نیازی ندارد
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <React.Fragment>
              <div className='col-12'>
                <div className='box-note'>
                  <p className='m-0'>
                    کلیه‌ی تغییرات، استانداردها مدارک و نتایج مربوط به HAZOP در
                    این قسمت ضمیمه گردد.
                  </p>
                </div>
              </div>
              <AttachedDocument
                {...this}
                handleState={(name, value) => this.setState({ [name]: value })}
                out={true}
                nameParent='foreign_attachment'
                canCreate={!this.handleDisabled()}
              />
              <AttachedDocument
                {...this}
                handleState={(name, value) => this.setState({ [name]: value })}
                nameParent='internal_attachment'
                canCreate={!this.handleDisabled()}
              />
            </React.Fragment>
            {ShowToCC ? <TOCC {...this} /> : ''}
            {this.props.close ? (
              ''
            ) : !this.handleDisabled() && this.props.state.can_do_action ? (
              <React.Fragment>
                <Dispatch {...this} />
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
                  <CancelButton redirect='index-TSR' />
                </div>
              </React.Fragment>
            ) : (
              <SignTSR
                {...this}
                handleState={(name, value) => this.setState({ [name]: value })}
                permision='tsr4_signs'
                disabled={this.handleDisabled()}
              />
            )}
          </div>
        </div>
      )
  }
}
