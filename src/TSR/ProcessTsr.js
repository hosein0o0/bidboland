import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import StaticData from '../staticData'
import DatePicker from 'react-datepicker2'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
// import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
// import AttachFileIcon from '@material-ui/icons/AttachFile';
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import AttachedDocument from './AttachedDocument'
import ListSign from './ListSign'
import SignTSR from './SignTSR'
import Permision from '../permision/permision'
import getCustomFormat from '../getCustomFormat'
import moment from 'moment-jalaali'
import CancelButton from '../layout/CancelButton'
import Dispatch from './Dispatch'
import TOCC from './TOCC'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
export default class ProcessTSR extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.state = {
      token: Cookies.get('token'),
      tsr_no: '',
      created_at: '',
      subject: '',
      IssuanceConditions: true,
      disabled: false,
      review_result: 'yes',
      review_msg: '',
      documentNumber: [],
      Attachement: [],
      AttachementName: [],
      suggest_time: undefined,
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
          documentNumber: '',
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
    document.title = `${StaticData.Title} - بررسی TSR توسط مهندس فرآیند`
    this.props.GetShowFetch(3, this.ShowFetch)
    this.ShowFetch()
  }
  async componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = await nextProps
      // await this.ShowFetch()
    }
  }
  ShowFetch = async () => {
    let tsr3 = await this.props.state.tsr3,
      obj = {}
    if (tsr3) {
      for (let value in tsr3) {
        let state
        if (value.includes('tsr3_')) {
          state = value.split('tsr3_')[1]
        } else {
          state = value
        }
        if (state === 'foreign_attachment' || state === 'internal_attachment') {
          if (this.props.show || this.props.canUpdate) {
            let objDetail = tsr3[value]
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
          } else {
            if (tsr3[value]) {
              const _obj = tsr3[value]
              if (_obj.length) {
                obj[state] = tsr3[value]
              } else {
                let _list = Object.keys(_obj).map(_ => {
                  return _obj[_]
                })
                obj[state] = _list
              }
            }
          }
        } else if (state === 'review_result') {
          if (this.props.show || this.props.canUpdate) {
            obj[state] = this.handleReviewResult(tsr3[value], 'get')
          }
        } else if (state === 'suggest_time') {
          const checkExpert =
            !this.props.state.can_do_action && !this.props.show
          if (this.props.canUpdate) {
            if (tsr3[value]) {
              if (checkExpert) {
                obj[state] = tsr3[value] === 'null' ? '' : tsr3[value]
              } else {
                obj[state] =
                  tsr3[value] === 'null'
                    ? undefined
                    : moment(`${tsr3[value]}`, 'jYYYY/jM/jD')
              }
            }
          } else {
            const _dubleCheck = checkExpert || this.handleDisabled(checkExpert)
            let __result
            if (tsr3[value] === 'null') {
              __result = ''
            } else if (_dubleCheck) {
              __result = tsr3[value]
            } else if (!_dubleCheck) {
              if (tsr3[value]) {
                __result = moment(`${tsr3[value]}`, 'jYYYY/jM/jD')
              }
            }
            obj[state] = __result
          }
        } else if (state === 'notification_to' || state === 'notification_cc') {
          let _list = []
          let array = tsr3['tsr3_user_list']
          if (array) {
            let selected = tsr3[value]
            if (selected) {
              let arraySelected = selected.split(',')
              if (arraySelected) {
                arraySelected.forEach(id => {
                  let filter = array.filter(item => item.value === id)
                  if (filter) {
                    _list.push(filter[0])
                  }
                })
              }
            }
          }
          obj[state] = _list
        } else {
          obj[state] = tsr3[value]
        }
      }
      let ListMandatory = await ListSign.ListMandatory.tsr3
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
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleUploadList = (e, files, names, parentState) => {
    if (this.state.canCreate) {
      e.preventDefault()
      if (e.target.files.length > 0) {
        this.setState({ loading: files })
      }
      names = names.split('_')[0]
      let key = parseInt(files.split('_')[1])
      files = files.split('_')[0]
      for (let i = 0; i < e.target.files.length; i++) {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[i])
        this.GetLink(
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
      url: `${StaticData.domainIp}/uploadFile/TSR3`,
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
    let _Parent = await this.state[parent]
    let obj = await _Parent[key]
    let data1 = await obj[files]
    let data2 = await obj[names]
    await data1.splice(num, 1)
    await data2.splice(num, 1)
    await this.setState({ [parent]: _Parent })
  }
  handleChangeList = (parent, name, value, key) => {
    let list = this.state[parent]
    let obj = list[key]
    obj[name] = value
    this.setState({ [parent]: list })
  }
  handleAddAttach = nameState => {
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
  handleDelete = (nameState, key) => {
    let data = this.state[nameState]
    data.splice(key, 1)
    this.setState({ [nameState]: data })
  }
  handleReviewResult = (review_result, status = '') => {
    if (status === 'send') {
      switch (review_result) {
        case 'yes':
          return true
        case 'no':
          return false
        case 'need':
          return 2
        default:
          return ''
      }
    } else if (status === 'get') {
      switch (review_result) {
        case '0':
          return 'no'
        case '1':
          return 'yes'
        case '2':
          return 'need'
        default:
          return ''
      }
    }
  }
  CheckReviewResult = () => {
    if (this.state.review_result === 'yes') {
      if (this.state.review_msg !== '') {
        return true
      } else return false
    } else if (this.state.review_result === 'no') {
      if (this.state.review_msg !== '') {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }
  handleSubmit = async () => {
    let {
      foreign_attachment,
      internal_attachment,
      review_msg,
      review_result,
      suggest_time,
      notification_to,
      notification_cc,
      listSign
    } = await this.state
    // const internalCheck = await this.props.Internalَttachments(
    //   internal_attachment
    // )
    const CheckTo = notification_to
      ? notification_to.length === listSign.length && notification_to.length > 0
      : false
    const check = (await this.CheckReviewResult()) && CheckTo
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
      await datareg.append(
        'review_result',
        this.handleReviewResult(review_result, 'send')
      )
      await datareg.append('review_msg', review_msg)
      await datareg.append(
        'suggest_time',
        suggest_time ? getCustomFormat(suggest_time, false) : null
      )
      await datareg.append(
        'foreign_attachment',
        JSON.stringify(foreign_attachment)
      )
      await datareg.append(
        'internal_attachment',
        JSON.stringify(internal_attachment)
      )
      await datareg.append('notification_to', To.join(','))
      await datareg.append('notification_cc', CC.join(','))
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/tsr/tsr3/insert`,
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
  handleShowSubmit = checkExpert => {
    if (!checkExpert) {
      return (
        <React.Fragment>
          {this.state.canCreate &&
          this.props.state.can_do_action &&
          !this.props.show &&
          !this.handleCheckDisabled() &&
          this.props.state.can_do_action ? (
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
              permision='tsr3_signs'
              disabled={this.handleDisabled(checkExpert) || checkExpert}
            />
          )}
        </React.Fragment>
      )
    } else return ''
  }
  handleDisabled = checkExpert => {
    if (this.props.close) {
      return true
    } else if (this.props.show) {
      return true
    } else if (this.state.canCreate) {
      return false
    } else if (this.props.canUpdate) {
      return false
    } else if (checkExpert) {
      return true
    } else {
      return false
    }
  }
  handleCheckCreate = checkExpert => {
    const checkCreate = this.handleCheckDisabled()
    if (!checkCreate && !checkExpert) {
      return true
    } else {
      return false
    }
  }
  handleCheckDisabled = () => {
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
    const checkExpert = !this.props.state.can_do_action && !this.props.show
    const ShowToCC =
      this.state.canCreate &&
      this.props.state.can_do_action &&
      !this.props.show &&
      !this.handleCheckDisabled() &&
      this.props.state.can_do_action &&
      !checkExpert
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
          {checkExpert ? (
            <div className='col-12'>
              <div className='message-error'>
                <label className='strong my-2'>
                  شما به عنوان کارشنانس انتخاب نشده اید.
                </label>
              </div>
            </div>
          ) : (
            ''
          )}
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
                <div className='col p-0'>
                  <label>
                    موضوع
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <input
                    type='text'
                    name={`subject`}
                    value={handleString(this.state.subject)}
                    readOnly={true}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-12 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
              <div className='field-radio w-100'>
                <label>
                  نتیجه بررسی
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <div className='main-radio pr-0'>
                  <div className='radio-button mr-1 ml-1'>
                    {!this.handleCheckDisabled() && !checkExpert && (
                      <input
                        className='d-none'
                        type='radio'
                        id='yes'
                        onClick={() =>
                          this.setState({
                            review_result: 'yes',
                            review_msg: ''
                          })
                        }
                      />
                    )}
                    <label htmlFor='yes'>
                      {this.state.review_result === 'yes' ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      مورد تایید است
                    </label>
                  </div>
                  <div className='radio-button mr-1 ml-1'>
                    {!this.handleCheckDisabled() && !checkExpert && (
                      <input
                        className='d-none'
                        type='radio'
                        id='no'
                        onClick={() =>
                          this.setState({ review_result: 'no', review_msg: '' })
                        }
                      />
                    )}
                    <label htmlFor='no'>
                      {this.state.review_result === 'no' ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      مورد تایید نیست
                    </label>
                  </div>
                  <div className='radio-button mr-1 ml-1'>
                    {!this.handleCheckDisabled() && !checkExpert && (
                      <input
                        className='d-none'
                        type='radio'
                        id='need'
                        onClick={() =>
                          this.setState({
                            review_result: 'need',
                            review_msg: ''
                          })
                        }
                      />
                    )}
                    <label htmlFor='need'>
                      {this.state.review_result === 'need' ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      نیاز به بررسی فرایندی ندارد
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {this.state.review_result === 'no' ? (
              <React.Fragment>
                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                  <div
                    className={`field-form persian textarea ${
                      this.state.foucs === `review_msg` ||
                      handleCheckText(this.state.review_msg)
                        ? 'active'
                        : ''
                    }`}
                  >
                    <div className='col p-0'>
                      <label className='textarea'>
                        دلایل عدم تایید
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <textarea
                        className='w-100'
                        type='text'
                        name={`review_msg`}
                        onFocus={e => this.OnFocus(e.target.name)}
                        onBlur={this.OnBlur}
                        onChange={this.handleChange}
                        value={handleString(this.state.review_msg)}
                        readOnly={this.handleDisabled(checkExpert)}
                        disabled={this.handleDisabled(checkExpert)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              ''
            )}
            {this.state.review_result === 'yes' ? (
              <React.Fragment>
                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                  <div
                    className={`field-form persian textarea ${
                      this.state.foucs === `review_msg` ||
                      handleCheckText(this.state.review_msg)
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
                        name={`review_msg`}
                        onFocus={e => this.OnFocus(e.target.name)}
                        onBlur={this.OnBlur}
                        onChange={this.handleChange}
                        value={handleString(this.state.review_msg)}
                        readOnly={
                          this.handleDisabled(checkExpert) || checkExpert
                        }
                        disabled={
                          this.handleDisabled(checkExpert) || checkExpert
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
                {this.handleDisabled(checkExpert) || checkExpert ? (
                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div
                      className={`field-form persian ${
                        this.state.suggest_time ? 'active' : ''
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
                        <input
                          type='text'
                          name={`suggest_time`}
                          value={handleString(this.state.suggest_time)}
                          readOnly={true}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                    <div
                      className={`field-form persian ${
                        this.state.suggest_time ? 'active' : ''
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
                        <DatePicker
                          persianDigits={true}
                          isGregorian={false}
                          timePicker={false}
                          onChange={suggest_time =>
                            this.setState({ suggest_time })
                          }
                          value={
                            this.state.suggest_time
                              ? this.state.suggest_time
                              : null
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ) : (
              ''
            )}
            <AttachedDocument
              {...this}
              handleState={(name, value) => this.setState({ [name]: value })}
              out={true}
              nameParent='foreign_attachment'
              canCreate={this.handleCheckCreate(checkExpert)}
            />
            <AttachedDocument
              {...this}
              handleState={(name, value) => this.setState({ [name]: value })}
              nameParent='internal_attachment'
              canCreate={this.handleCheckCreate(checkExpert)}
            />
            {ShowToCC ? <TOCC {...this} /> : ''}
            {this.props.close ? '' : this.handleShowSubmit(checkExpert)}
          </div>
        </div>
      )
  }
}
