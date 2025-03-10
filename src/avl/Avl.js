import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import DatePicker from 'react-datepicker2'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import MailIcon from '@material-ui/icons/Mail'
import CallIcon from '@material-ui/icons/Call'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import LanguageIcon from '@material-ui/icons/Language'
import StaticData from '../staticData'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import handleString from '../handleString'
export default class AVL extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      keywords: [],
      keywordsSelected: [],
      citizenship: 'internal',
      previousCollaboration: 'no',
      id: '',
      wbs: [],
      wbsSelect: '',
      manufacturerName: '',
      ceo: '',
      discipline: '',
      manufacturer: '',
      source: '',
      iranCode: '',
      nationalCode: '',
      projectname: '',
      equip: '',
      startDate: undefined,
      date: undefined,
      email: '',
      website: '',
      phoneNumber: '',
      fax: '',
      state: '',
      address: ''
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ثبت سازندگان مورد تایید`
    this.fetchData()
  }
  fetchData = () => {
    axios
      .get(`${StaticData.domainIp}/avl/getFirstDetail`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState(response.data.content)
          // let permision = new Permision()
          // if(permision.handlePermision(response.data.role , 'main_transmittal')){

          // }
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
          if (err.response.status === 404) {
            this.setState({ back: true })
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
  handleChange = e => {
    this.setState({ [e.target.name]: handleString(e.target.value) })
  }
  getCustomFormat (inputValue, isGregorian) {
    if (!inputValue) return ''
    const inputFormat = isGregorian ? 'YYYY/M/D' : 'jYYYY/jM/jD'
    return isGregorian
      ? inputValue.locale('es').format(inputFormat)
      : inputValue.locale('fa').format(inputFormat)
  }
  handleSubmit = async () => {
    let collaboration =
      this.state.previousCollaboration === 'yes'
        ? this.state.projectname !== '' && this.state.equip !== ''
        : true
    if (
      this.state.manufacturerName !== '' &&
      this.state.discipline !== '' &&
      this.state.manufacturer !== '' &&
      this.state.keywordsSelected.length > 0 &&
      this.state.citizenship !== '' &&
      this.state.previousCollaboration !== '' &&
      collaboration
    ) {
      let keyw = []
      this.state.keywordsSelected.filter(elm => keyw.push(elm.value))
      await this.setState({ loading: 'submit' })
      let datareg = await new FormData()
      await datareg.append('name', this.state.manufacturerName)
      await datareg.append('managerName', this.state.ceo)
      await datareg.append('disc', this.state.discipline)
      await datareg.append('constructor', this.state.manufacturer)
      await datareg.append('resource', this.state.source)
      await datareg.append('iranCode', this.state.iranCode)
      await datareg.append('melliCode', this.state.nationalCode)
      await datareg.append('keywords', keyw.join(','))
      await datareg.append('wbs', this.state.wbsSelect)
      await datareg.append('citizenShip', this.state.citizenship)
      await datareg.append(
        'previousCollaboration',
        this.state.previousCollaboration
      )
      await datareg.append('previousProjectName', this.state.projectname)
      await datareg.append('previousEquipmentName', this.state.equip)
      await datareg.append(
        'avlStartDate',
        this.getCustomFormat(this.state.startDate, false)
          ? this.getCustomFormat(this.state.startDate, false)
          : ''
      )
      await datareg.append(
        'systemEntryDate',
        this.getCustomFormat(this.state.date, false)
          ? this.getCustomFormat(this.state.date, false)
          : ''
      )
      await datareg.append('email', this.state.email)
      await datareg.append('website', this.state.website)
      await datareg.append('tell', this.state.phoneNumber)
      await datareg.append('fax', this.state.fax)
      await datareg.append('city', this.state.state)
      await datareg.append('address', this.state.address)
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/avl/create`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              await this.setState({ redirect: true })
            }, 5000)
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({ loading: '' })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
            if (err.response.status === 404) {
              this.setState({ back: true })
            }
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      if (this.state.redirect) {
        return <Redirect to='/avl' />
      } else {
        if (this.state.back) {
          return <Redirect to='/404' />
        } else
          return (
            <div className='main'>
              <div className='col-12 p-0'>
                <div className='row m-0'>
                  <Sidebar
                    handleState={(name, value) =>
                      this.setState({ [name]: value })
                    }
                  />
                  <div
                    className={`${
                      this.state._close
                        ? 'mainSideClose'
                        : 'col-xl-10 col-lg-10 p-0'
                    } dashboard`}
                  >
                    <Menu nameRole='avl' nameUrl={this.props.nameUrl} />
                    <div className='w-100 row m-0 main-box-dashboard'>
                      <div className='boxes-dashboard row m-0 p-0'>
                        <div className='main-form'>
                          <div className='title-from'>
                            <h2>ثبت سازندگان مورد تایید</h2>
                          </div>
                          <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                            <div className='form row'>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${
                                    this.state.id !== '' ? 'active' : ''
                                  }`}
                                >
                                  <label>
                                    شناسه
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                  <input
                                    readOnly={true}
                                    name='id'
                                    value={this.state.id}
                                  />
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${
                                    this.state.foucs === 'manufacturerName' ||
                                    (this.state.manufacturerName &&
                                      this.state.manufacturerName !== '')
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <label>
                                    نام سازنده
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                  <input
                                    readOnly={false}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                    name='manufacturerName'
                                    value={this.state.manufacturerName}
                                  />
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${
                                    this.state.foucs === 'ceo' ||
                                    (this.state.ceo && this.state.ceo !== '')
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <label>نام مدیر عامل</label>
                                  <input
                                    readOnly={false}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                    name='ceo'
                                    value={this.state.ceo}
                                  />
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian pl-1 ${
                                    this.state.foucs === `discipline` ||
                                    (this.state.discipline &&
                                      this.state.discipline !== '')
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <label>
                                    دیسیپلین
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                  <input
                                    readOnly={false}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                    name='discipline'
                                    value={this.state.discipline}
                                  />
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian pl-1 ${
                                    this.state.foucs === `manufacturer` ||
                                    (this.state.manufacturer &&
                                      this.state.manufacturer !== '')
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <label>
                                    تخصیص سازنده
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                  <input
                                    readOnly={false}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                    name='manufacturer'
                                    value={this.state.manufacturer}
                                  />
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${
                                    this.state.foucs === 'source' ||
                                    (this.state.source &&
                                      this.state.source !== '')
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <label>شرح محصول</label>
                                  <input
                                    readOnly={false}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                    name='source'
                                    value={this.state.source}
                                  />
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${
                                    this.state.foucs === 'iranCode' ||
                                    (this.state.iranCode &&
                                      this.state.iranCode !== '')
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <label>ایران کد</label>
                                  <input
                                    readOnly={false}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                    name='iranCode'
                                    value={this.state.iranCode}
                                  />
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${
                                    this.state.foucs === 'nationalCode' ||
                                    (this.state.nationalCode &&
                                      this.state.nationalCode !== '')
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <label>کد ملی</label>
                                  <input
                                    readOnly={false}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                    name='nationalCode'
                                    value={this.state.nationalCode}
                                  />
                                </div>
                              </div>
                              <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                                <div className='field-form selectBox'>
                                  <CreatableSelect
                                    isMulti
                                    value={this.state.keywordsSelected}
                                    onChange={newValue =>
                                      this.setState({
                                        keywordsSelected: newValue
                                      })
                                    }
                                    options={this.state.keywords}
                                    placeholder={
                                      <label>
                                        تخصیص تگ (با ENT جدا کنید)
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
                                  className={`field-form persian pl-1 ${
                                    this.state.foucs === `wbsSelect` ||
                                    this.state.wbsSelect !== ''
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <label>تخصیص سطح wbs</label>
                                  <select
                                    name={`wbsSelect`}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                  >
                                    <option className='d-none'></option>
                                    {this.state.wbs.map((data, key) => (
                                      <option key={key} value={data.value}>
                                        {data.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
                                <div className='field-radio w-100'>
                                  <label>
                                    تابعیت :
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                  <div className='main-radio'>
                                    <div className='radio-button mr-2 ml-2'>
                                      {this.state.disabled ? (
                                        ''
                                      ) : (
                                        <input
                                          className='d-none'
                                          type='radio'
                                          id='internal'
                                          onClick={() =>
                                            this.setState({
                                              citizenship: 'internal'
                                            })
                                          }
                                        />
                                      )}
                                      <label htmlFor='internal'>
                                        {this.state.citizenship ===
                                        'internal' ? (
                                          <RadioButtonCheckedIcon />
                                        ) : (
                                          <RadioButtonUncheckedIcon />
                                        )}
                                        داخلی
                                      </label>
                                    </div>
                                    <div className='radio-button mr-2 ml-2'>
                                      {this.state.disabled ? (
                                        ''
                                      ) : (
                                        <input
                                          className='d-none'
                                          type='radio'
                                          id='foreign'
                                          onClick={() =>
                                            this.setState({
                                              citizenship: 'foreign'
                                            })
                                          }
                                        />
                                      )}
                                      <label htmlFor='foreign'>
                                        {this.state.citizenship ===
                                        'foreign' ? (
                                          <RadioButtonCheckedIcon />
                                        ) : (
                                          <RadioButtonUncheckedIcon />
                                        )}
                                        خارجی
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-xl-12 col-lg-12 col-md-12 col-12 d-flex align-items-center'>
                                <div className='field-radio w-100'>
                                  <label>
                                    آیا سازمان همکاری قبلی با سازمان داشته است؟
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                  <div className='main-radio'>
                                    <div className='radio-button mr-2 ml-2'>
                                      {this.state.disabled ? (
                                        ''
                                      ) : (
                                        <input
                                          className='d-none'
                                          type='radio'
                                          id='yes'
                                          onClick={() =>
                                            this.setState({
                                              previousCollaboration: 'yes'
                                            })
                                          }
                                        />
                                      )}
                                      <label htmlFor='yes'>
                                        {this.state.previousCollaboration ===
                                        'yes' ? (
                                          <RadioButtonCheckedIcon />
                                        ) : (
                                          <RadioButtonUncheckedIcon />
                                        )}
                                        بله
                                      </label>
                                    </div>
                                    <div className='radio-button mr-2 ml-2'>
                                      {this.state.disabled ? (
                                        ''
                                      ) : (
                                        <input
                                          className='d-none'
                                          type='radio'
                                          id='no'
                                          onClick={() =>
                                            this.setState({
                                              previousCollaboration: 'no',
                                              projectname: '',
                                              equip: ''
                                            })
                                          }
                                        />
                                      )}
                                      <label htmlFor='no'>
                                        {this.state.previousCollaboration ===
                                        'no' ? (
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
                              {this.state.previousCollaboration === 'yes' ? (
                                <React.Fragment>
                                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                    <div
                                      className={`field-form persian pl-1 ${
                                        this.state.foucs === `projectname` ||
                                        (this.state.projectname &&
                                          this.state.projectname !== '')
                                          ? 'active'
                                          : ''
                                      }`}
                                    >
                                      <label>
                                        نام پروژه
                                        <span className='star IranSans_Bold'>
                                          *
                                        </span>
                                      </label>
                                      <input
                                        readOnly={false}
                                        onFocus={e =>
                                          this.OnFocus(e.target.name)
                                        }
                                        onBlur={this.OnBlur}
                                        onChange={this.handleChange}
                                        name='projectname'
                                        value={this.state.projectname}
                                      />
                                    </div>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                    <div
                                      className={`field-form persian ${
                                        this.state.foucs === 'equip' ||
                                        (this.state.equip &&
                                          this.state.equip !== '')
                                          ? 'active'
                                          : ''
                                      }`}
                                    >
                                      <label>
                                        نام تجهیز تامین شده
                                        <span className='star IranSans_Bold'>
                                          *
                                        </span>
                                      </label>
                                      <input
                                        readOnly={false}
                                        onFocus={e =>
                                          this.OnFocus(e.target.name)
                                        }
                                        onBlur={this.OnBlur}
                                        onChange={this.handleChange}
                                        name='equip'
                                        value={this.state.equip}
                                      />
                                    </div>
                                  </div>
                                </React.Fragment>
                              ) : (
                                ''
                              )}
                              <div className='col-12'>
                                <div className='line'>
                                  <hr />
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${
                                    this.state.foucs === `startDate` ||
                                    (this.state.startDate &&
                                      this.state.startDate !== '')
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <div className='icon-field'>
                                    <DateRangeRoundedIcon />
                                  </div>
                                  <div className='col p-0'>
                                    <label>شروع AVL</label>
                                    <DatePicker
                                      persianDigits={true}
                                      isGregorian={false}
                                      timePicker={false}
                                      onChange={startDate =>
                                        this.setState({ startDate })
                                      }
                                      value={this.state.startDate}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${
                                    this.state.foucs === `date` ||
                                    (this.state.date && this.state.date !== '')
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <div className='icon-field'>
                                    <DateRangeRoundedIcon />
                                  </div>
                                  <div className='col p-0'>
                                    <label>ورود به سیستم</label>
                                    <DatePicker
                                      persianDigits={true}
                                      isGregorian={false}
                                      timePicker={false}
                                      onChange={date => this.setState({ date })}
                                      value={this.state.date}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${
                                    this.state.foucs === `email` ||
                                    (this.state.email &&
                                      this.state.email !== '')
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <div className='icon-field'>
                                    <MailIcon />
                                  </div>
                                  <div className='col p-0'>
                                    <label>ایمیل</label>
                                    <input
                                      readOnly={false}
                                      onFocus={e => this.OnFocus(e.target.name)}
                                      onBlur={this.OnBlur}
                                      onChange={this.handleChange}
                                      name='email'
                                      value={this.state.email}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${
                                    this.state.foucs === `website` ||
                                    (this.state.website &&
                                      this.state.website !== '')
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <div className='icon-field'>
                                    <LanguageIcon />
                                  </div>
                                  <div className='col p-0'>
                                    <label>وب سایت</label>
                                    <input
                                      readOnly={false}
                                      onFocus={e => this.OnFocus(e.target.name)}
                                      onBlur={this.OnBlur}
                                      onChange={this.handleChange}
                                      name='website'
                                      value={this.state.website}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${
                                    this.state.foucs === `phoneNumber` ||
                                    (this.state.phoneNumber &&
                                      this.state.phoneNumber !== '')
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <div className='icon-field'>
                                    <CallIcon />
                                  </div>
                                  <div className='col p-0'>
                                    <label>شماره تماس</label>
                                    <input
                                      readOnly={false}
                                      onFocus={e => this.OnFocus(e.target.name)}
                                      onBlur={this.OnBlur}
                                      onChange={this.handleChange}
                                      name='phoneNumber'
                                      value={this.state.phoneNumber}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${
                                    this.state.foucs === `fax` ||
                                    (this.state.fax && this.state.fax !== '')
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <div className='icon-field'>
                                    <CallIcon />
                                  </div>
                                  <div className='col p-0'>
                                    <label>فکس</label>
                                    <input
                                      readOnly={false}
                                      onFocus={e => this.OnFocus(e.target.name)}
                                      onBlur={this.OnBlur}
                                      onChange={this.handleChange}
                                      name='fax'
                                      value={this.state.fax}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian pl-1 ${
                                    this.state.foucs === `state` ||
                                    (this.state.state &&
                                      this.state.state !== '')
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <label>استان</label>
                                  <input
                                    readOnly={false}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                    name='state'
                                    value={this.state.state}
                                  />
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian pl-1 ${
                                    this.state.foucs === `address` ||
                                    (this.state.address &&
                                      this.state.address !== '')
                                      ? 'active'
                                      : ''
                                  }`}
                                >
                                  <label>آدرس</label>
                                  <input
                                    readOnly={false}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                    name='address'
                                    value={this.state.address}
                                  />
                                </div>
                              </div>
                              <div className='submit-form col-12 mt-5'>
                                <button onClick={this.handleSubmit}>
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
  }
}
