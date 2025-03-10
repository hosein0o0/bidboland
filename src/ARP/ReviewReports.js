import React, { Component } from 'react'
import Cookies from 'js-cookie'
import StaticData from '../staticData'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import AddIcon from '@material-ui/icons/Add'
import { Redirect } from 'react-router-dom'
import ListSign from './ListSign'
import SignARP from './SignARP'
import Permision from '../permision/permision'
import Loading from '../layout/loading'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import DoneIcon from '@material-ui/icons/Done'
import CancelButton from '../layout/CancelButton'
import HeadTopFirst from './HeadTopFirst'
import HanldeToCC from './HanldeToCC'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
export default class ReviewReports extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      userDetail: null,
      listSign: [],
      reasonsAccident: [
        {
          value: 'کار بر روی تجهیز بدون قطع منبع انرژی',
          label: 'کار بر روی تجهیز بدون قطع منبع انرژی'
        },
        {
          value: 'عدم کارایی سیستم‌های ایمنی تجهیزات',
          label: 'عدم کارایی سیستم‌های ایمنی تجهیزات'
        },
        {
          value: 'عدم رعایت الزامات در دستورالعمل‌های بهره‌برداری',
          label: 'عدم رعایت الزامات در دستورالعمل‌های بهره‌برداری'
        },

        {
          value: 'نقص در نحوه نگارش پروانه‌های کار',
          label: 'نقص در نحوه نگارش پروانه‌های کار'
        },
        {
          value: 'فقدان یا نامناسب بودن وسایل حفاظت فردی',
          label: 'فقدان یا نامناسب بودن وسایل حفاظت فردی'
        },
        {
          value: 'فقدان دستورالعمل کاری مناسب',
          label: 'فقدان دستورالعمل کاری مناسب'
        },

        {
          value: 'راه اندازی تجهیز به شکل ناایمن',
          label: 'راه اندازی تجهیز به شکل ناایمن'
        },
        {
          value: 'عدم ایزوله کردن درست تجهیز',
          label: 'عدم ایزوله کردن درست تجهیز'
        },
        {
          value: 'عدم اجرای روش جاری در مدیریت تغییر',
          label: 'عدم اجرای روش جاری در مدیریت تغییر'
        },

        {
          value: 'نقص در نحوه اجرای پروانه‌های کار',
          label: 'نقص در نحوه اجرای پروانه‌های کار'
        },
        { value: 'نقص در ارتباطات پروسسی', label: 'نقص در ارتباطات پروسسی' },
        { value: 'عدم اجرای مدیریت ریسک', label: 'عدم اجرای مدیریت ریسک' },

        {
          value: 'کار برروی تجهیز بدون مجوز',
          label: 'کار برروی تجهیز بدون مجوز'
        },
        {
          value: 'استفاده نادرست و غیراصولی از تجهیزات(آموزش ناکافی)',
          label: 'استفاده نادرست و غیراصولی از تجهیزات(آموزش ناکافی)'
        },
        {
          value: 'فقدان یا ضعف برنامه تعمیر و نگهداری پیشگیرانه و بازرسی',
          label: 'فقدان یا ضعف برنامه تعمیر و نگهداری پیشگیرانه و بازرسی'
        },

        { value: 'نقشه‌های نامناسب', label: 'نقشه‌های نامناسب' },
        {
          value: 'نقص در طراحی (شناسایی پیش از حادثه)',
          label: 'نقص در طراحی (شناسایی پیش از حادثه)'
        },
        {
          value: 'نقص در طراحی (عدم شناسایی پیش از حادثه)',
          label: 'نقص در طراحی (عدم شناسایی پیش از حادثه)'
        }
      ],
      other: false,
      userDetail: null,
      listSign: [],
      discipline: '',
      canCreate: false,
      listOther: [{ value: '' }]
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - گزارش رویداد (حادثه و شبه حادثه فرایندی)`
    if (Cookies.get('userDetail')) {
      this.setState({ userDetail: JSON.parse(Cookies.get('userDetail')) })
    }
    this.ShowFetch()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.ShowFetch()
    }
  }
  ResetSelect = () => {
    const state = this.state
    for (let value in state) {
      if (value.includes('event_reasons_')) {
        this.setState({ [value]: false })
      }
    }
  }
  ShowFetch = async () => {
    const { state } = await this.props
    if (state) {
      state['canCreate'] = await state.secretary_committee_allow
      for (let value in state) {
        // const checkDate = value === 'event_date'
        if (value === 'event_type') {
          let _data = state[value]
          const checkOther =
            _data !== 'انسانی' &&
            _data !== 'خسارت به تجهیزات' &&
            _data !== 'Total S/D' &&
            _data !== 'زیست محیطی' &&
            _data !== 'نشتی مواد' &&
            _data !== 'آتش سوزی'
          if (checkOther) {
            if (!state['other_event_type']) {
              state[value] = 'other'
              state['other_event_type'] = _data
            }
          }
        }
      }

      let ListMandatory = await ListSign.ListMandatory.arp3
      let listSign = await this.state.listSign
      await ListMandatory.forEach(li => {
        listSign = [...listSign, li]
      })
      listSign = await [...new Set(listSign)]
      state['listSign'] = await listSign
      const newState = this.hanldeCheckReasons(state)
      await this.setState(newState)
    }
  }
  hanldeCheckReasons = state => {
    let { event_reasons } = state
    if (event_reasons) {
      const { reasonsAccident } = this.state
      let _array = event_reasons.split(',')
      let _reasonsAccident = Object.keys(reasonsAccident).map(_obj => {
        return reasonsAccident[_obj].value
      })
      let listOther = []
      _array.forEach(_itm => {
        if (_reasonsAccident.includes(_itm)) {
          state[`event_reasons_${_itm}`] = true
        } else {
          let __obj = { value: _itm }
          listOther.push(__obj)
        }
      })
      state['other'] = listOther.length > 0
      state['listOther'] = listOther
    }
    return state
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
  handleAdd = nameState => {
    let obj = { value: '' }
    this.setState({ [nameState]: [...this.state[nameState], obj] })
  }
  handleDisabled = () => {
    if (!this.state.canCreate) {
      return true
    } else if (this.props.show) {
      return true
    } else {
      return false
    }
  }
  handleAccidentReasons = () => {
    const state = this.state,
      list = []
    Object.keys(state).map(data => {
      if (data.includes('event_reasons_')) {
        if (state[data]) {
          let text = data.split('event_reasons_')[1]
          list.push(text)
        }
      }
      return true
    })
    return list
  }
  hanldleCheckOther = () => {
    const { listOther } = this.state
    let check = false,
      i = 0
    while (i < listOther.length) {
      let _obj = listOther[i]
      check = handleCheckText(_obj.value)
      if (!check) {
        break
      }
      i++
    }
    return check
  }
  handleOtherList = () => {
    let array = []
    const { other, listOther } = this.state
    if (other) {
      array = Object.keys(listOther).map(_t => {
        return listOther[_t].value
      })
    }
    return array
  }
  handleSubmit = async () => {
    // if (licens) {
    const {
      id,
      discipline,
      event_description,
      event_before_instructions,
      technical_agent_arp3,
      operation_agent_arp3,
      repair_agent_arp3,
      hse_agent_arp3,
      other,
      token
    } = this.state
    let event_reasons = this.handleAccidentReasons()
    const checkReasons = other
      ? this.hanldleCheckOther()
      : event_reasons.length > 0
    const checkSign =
      technical_agent_arp3 !== null &&
      operation_agent_arp3 !== null &&
      repair_agent_arp3 !== null &&
      hse_agent_arp3 !== null
    const check =
      handleCheckText(discipline) &&
      handleCheckText(event_description) &&
      handleCheckText(event_before_instructions)
    const finalCheck = check && checkSign && checkReasons
    const secondArray = this.handleOtherList()
    if (finalCheck) {
      this.setState({ loading: 'submit', disabled: true })
      const finalReasons = event_reasons.concat(secondArray)
      const url = await `${StaticData.domainIp}/arp/insertThird`
      const datareg = await new FormData()
      await datareg.append('arp_id', id)
      await datareg.append('discipline', discipline)
      await datareg.append('event_reasons', finalReasons.join(','))
      await datareg.append('event_description', event_description)
      await datareg.append(
        'event_before_instructions',
        event_before_instructions
      )
      await datareg.append('technical_agent_arp3', technical_agent_arp3.value)
      await datareg.append('operation_agent_arp3', operation_agent_arp3.value)
      await datareg.append('repair_agent_arp3', repair_agent_arp3.value)
      await datareg.append('hse_agent_arp3', hse_agent_arp3.value)
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          this.setState({
            loading: ''
          })
          if (response.status === 200) {
            await Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              this.setState({
                disabled: false,
                redirect: false
              })
              window.location.reload(true)
            }, 5000)
          } else {
            this.setState({
              disabled: false
            })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({
            disabled: false,
            loading: ''
          })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
    // }
  }
  handleState = obj => {
    this.setState(obj)
    // this.props.handleState(obj)
  }
  handleChangeList = e => {
    const { value, name } = e.target
    let key = parseInt(name.split('_')[1])
    let _name = name.split('_')[0]
    let array = this.state.listOther
    let obj = array[key]
    obj[_name] = value
    this.setState({
      listOther: array
    })
  }
  handleDelete = async num => {
    let data = await this.state.listOther
    await data.splice(num, 1)
    await this.setState({ listOther: data, other: data.length !== 0 })
  }
  render () {
    const ShowToCC = !this.props.show
    if (!this.state.token) {
      return <Redirect to='Login' />
    } else if (this.state.redirect) {
      return <Redirect to='/index-ARP' />
    } else {
      return (
        <div className='form row justify-content-start'>
          <HeadTopFirst
            {...this}
            disabled={true}
            // dontShow={true}
          />
          <div className='title-password col-12 mt-3 mb-2 px-0'>
            <div className='line'></div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div
              className={`field-form persian ${
                this.state.foucs === 'discipline' ||
                handleCheckText(this.state.discipline)
                  ? 'active'
                  : ''
              }`}
            >
              <label>
                Discipline
                <span className='star IranSans_Bold'>*</span>
              </label>
              <select
                name='discipline'
                value={handleString(this.state.discipline)}
                onChange={e => this.handleChange(e)}
                onFocus={e => this.OnFocus(e)}
                onBlur={this.OnBlur}
                readOnly={this.handleDisabled()}
                disabled={this.handleDisabled()}
              >
                <option className='d-none'></option>
                <option value='مکانیک'>مکانیک</option>
                <option value='برق'>برق</option>
                <option value='ابزار دقیق'>ابزار دقیق</option>
                <option value='فرآیند'>فرآیند</option>
              </select>
            </div>
          </div>
          <div className='title-password col-12 mt-3 mb-2'>
            <h2 className='IranSans_Bold'>دلایل بروز حادثه</h2>
            <div className='line'></div>
          </div>
          <div className='col-12 row m-0'>
            {this.state.reasonsAccident.map((data, key) => (
              <div
                className='disiplin-checkbox col-xl-6 col-lg-6 col-md-12 col-12 w-auto mt-3 mb-3 p-0'
                key={key}
              >
                <div className='checkbox m-0'>
                  {this.handleDisabled() ? (
                    ''
                  ) : (
                    <input
                      className='d-none'
                      id={`event_reasons_${data.value}`}
                      name={`event_reasons_${data.value}`}
                      type='checkbox'
                      onChange={e =>
                        this.setState({ [e.target.name]: e.target.checked })
                      }
                      checked={
                        this.state[`event_reasons_${data.value}`] ? true : false
                      }
                    />
                  )}
                  <label
                    className='full'
                    htmlFor={`event_reasons_${data.value}`}
                  >
                    {this.state[`event_reasons_${data.value}`] ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                    {handleString(data.label)}
                  </label>
                </div>
              </div>
            ))}
            <div className='disiplin-checkbox col-xl-6 col-lg-6 col-md-12 col-12 w-auto mt-3 mb-3 p-0'>
              <div className='checkbox m-0'>
                {this.handleDisabled() ? (
                  ''
                ) : (
                  <input
                    className='d-none'
                    id={`other`}
                    name={`other`}
                    type='checkbox'
                    onChange={e =>
                      this.setState({
                        [e.target.name]: e.target.checked,
                        listOther: [{ value: '' }]
                      })
                    }
                    checked={this.state.other ? true : false}
                  />
                )}
                <label className='full' htmlFor={`other`}>
                  {this.state.other ? (
                    <CheckBoxRoundedIcon />
                  ) : (
                    <CheckBoxOutlineBlankRoundedIcon />
                  )}
                  سایر موارد
                </label>
              </div>
            </div>
          </div>
          {this.state.other && (
            <div className='w-100'>
              {this.state.listOther.map((data, key) => (
                <div className='w-100'>
                  <div
                    className='col-xl-12 col-lg-12 col-md-12 col-12'
                    key={key}
                  >
                    <div
                      className={`field-form persian ${
                        this.state.foucs === `value_${key}` ||
                        handleCheckText(data.value)
                          ? 'active'
                          : ''
                      }`}
                    >
                      <label>
                        شرح سایر دلایل بروز حادثه
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                      <input
                        type='text'
                        name={`value_${key}`}
                        value={handleString(data.value)}
                        onChange={this.handleChangeList}
                        onBlur={this.OnBlur}
                        onFocus={e => this.OnFocus(e.target.name)}
                        readOnly={this.handleDisabled()}
                        disabled={this.handleDisabled()}
                      />
                    </div>
                  </div>
                  {this.handleDisabled() ? (
                    ''
                  ) : (
                    <div className='button-add col-12 row mr-0 ml-0'>
                      <button
                        className='remove'
                        onClick={() => this.handleDelete(key)}
                      >
                        <DeleteRoundedIcon />
                        حذف
                      </button>
                    </div>
                  )}
                  {this.state.listOther.length > 1 && (
                    <div className='title-password col-12 mt-3 mb-2'>
                      <div className='line'></div>
                    </div>
                  )}
                </div>
              ))}
              {this.handleDisabled() ? (
                ''
              ) : (
                <div className='button-add col-12'>
                  <button onClick={() => this.handleAdd('listOther')}>
                    <AddIcon />
                    افزودن مورد جدید
                  </button>
                </div>
              )}
            </div>
          )}
          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
            <div
              className={`field-form persian textarea ${
                this.state.foucs === `event_description` ||
                handleCheckText(this.state.event_description)
                  ? 'active'
                  : ''
              }`}
            >
              <div className='col p-0'>
                <label className='textarea'>
                  شرح رویداد با جزئیات (پیش از وقوع رویداد چه فعالیتی در حال
                  انجام بود؟)
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <textarea
                  className='w-100'
                  type='text'
                  name={`event_description`}
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                  value={handleString(this.state.event_description)}
                  readOnly={this.handleDisabled()}
                  disabled={this.handleDisabled()}
                ></textarea>
              </div>
            </div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
            <div
              className={`field-form persian textarea ${
                this.state.foucs === `event_before_instructions` ||
                handleCheckText(this.state.event_before_instructions)
                  ? 'active'
                  : ''
              }`}
            >
              <div className='col p-0'>
                <label className='textarea'>
                  پیش از وقوع رویداد چه دستورالعمل و مقرراتی (ایمنی و
                  بهره‌برداری) در انجام فعالیت میبایست اجرا میگردید؟
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <textarea
                  className='w-100'
                  type='text'
                  name={`event_before_instructions`}
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                  value={handleString(this.state.event_before_instructions)}
                  readOnly={this.handleDisabled()}
                  disabled={this.handleDisabled()}
                ></textarea>
              </div>
            </div>
          </div>
          {ShowToCC ? <HanldeToCC {...this} dontCC={true} /> : ''}
          {ShowToCC ? (
            this.state.canCreate ? (
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
                <CancelButton redirect='index-ARP' />
              </div>
            ) : (
              ''
            )
          ) : (
            <SignARP
              {...this}
              handleState={(name, value) => this.setState({ [name]: value })}
              permision='arp_signs'
            />
          )}
        </div>
      )
    }
  }
}
