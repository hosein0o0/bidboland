import React, { Component } from 'react'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import Permision from '../permision/permision'
import handleCheckText from '../handleCheckText'
import ReportItem from './ReportItem'
import HeadTopFirst from './HeadTopFirst'
import moment from 'moment-jalaali'
import handleString from '../handleString'
export default class ReportVariousDisciplines extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    // this.handleCheckText = HandleCheckText.handleCheckText
    this.thisChild = null
    this.state = {
      token: Cookies.get('token'),
      documentNumber: '',
      area: '',
      unit: '',
      event_type: '',
      tag_number: '',
      event_date: moment(),
      event_hour: '',
      unit_conditions: '',
      description: '',
      accident_causes: '',
      conclusion: '',
      offers: '',
      userDetail: null,
      popUp: false,
      listSign: [],
      right: 0,
      width: 10,
      tabSelected: 'technical',
      labelSelected: 'خدمات فنی',
      user_list: [],
      technical: {},
      use: {},
      repair: {},
      hse: {},
      user: '',
      canCreate: false
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - گزارش دیسیپلین‌های مختلف`
    // this.props.GetShowFetch(2, this.ShowFetch)
    this.CheckWidth()
    let userDetail = Cookies.get('userDetail')
    if (userDetail) {
      this.setState({ userDetail: JSON.parse(userDetail) })
    }
    this.ShowFetch()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.ShowFetch()
    }
  }
  ShowFetch = async () => {
    const { state } = await this.props
    const { user_list } = state
    state['canCreate'] = await this.Permision.handlePermision(
      state.role,
      'arp_create'
    )
    for (let _value in state) {
      const checkLink =
        _value === 'technical_report_link' ||
        _value === 'operation_report_link' ||
        _value === 'repair_report_link' ||
        _value === 'hse_report_link'
      const checkUser =
        _value.includes('_unit_supervisor') ||
        _value.includes('_event_expert') ||
        _value.includes('secretary_committee')
      const checkMultiUser = _value.includes('meeting_users')
      let _data = await state[_value]
      if (checkUser) {
        if (_data && _data.length === 5) {
          let filter = await user_list.filter(item => item.value === _data)
          let founded = await filter[0]
          state[_value] = await founded
        }
      } else if (checkLink) {
        let nameTab = await _value.split('_report_link')[0]
        if (_data) {
          state[`${nameTab}_hasAttach`] = await true
          state[`${_value}Name`] = await _data
        }
      } else if (checkMultiUser) {
        if (_data) {
          if (_data.split) {
            let array = _data.split(',')
            let filter = user_list.filter(user => array.includes(user.value))
            state[_value] = filter
          }
        }
      } else if (_value === 'event_type') {
        let _data = state[_value]
        const checkOther =
          _data !== 'انسانی' &&
          _data !== 'خسارت به تجهیزات' &&
          _data !== 'Total S/D' &&
          _data !== 'زیست محیطی' &&
          _data !== 'نشتی مواد' &&
          _data !== 'آتش سوزی'
        if (checkOther) {
          if (!state['other_event_type']) {
            state[_value] = 'other'
            state['other_event_type'] = _data
          }
        }
      }
    }
    const finalState = this.handleCheckShow(state)
    const finalState2 = await this.handleCheckDisable(finalState)
    await this.setState(finalState2)
  }
  handleCheckShow = async state => {
    let newObj = await state
    let _array = await ['technical', 'operation', 'repair', 'hse']
    _array.forEach(_name => {
      const show1 =
        handleCheckText(newObj[`${_name}_discipline`]) &&
        newObj[`${_name}_unit_supervisor`] !== null
      const show2 = newObj[`${_name}_event_expert`] !== null
      const show3 =
        newObj[`${_name}_event_expert_verify`] === '1' ||
        state.public_engineer_allow
      const show4 = newObj['secretary_committee'] !== null
      const show5 =
        handleCheckText(newObj['meeting_date']) &&
        handleCheckText(newObj['meeting_hour']) &&
        handleCheckText(newObj['meeting_place'])
      newObj[`Show1_${_name}`] = show1
      newObj[`Show2_${_name}`] = show2
      newObj[`Show3_${_name}`] = show3
      newObj[`Show4_${_name}`] = show4
      newObj[`Show5_${_name}`] = show5
    })
    return newObj
  }

  handleCheckDisable = async state => {
    let newObj = await state
    let _array = await ['technical', 'operation', 'repair', 'hse']
    const dis4 = newObj['secretary_committee'] !== null
    const dis5 =
      handleCheckText(newObj['meeting_date']) &&
      handleCheckText(newObj['meeting_hour']) &&
      handleCheckText(newObj['meeting_place'])
    newObj['dis_secretary_committee'] = dis4
    newObj['disabledLocation'] = dis5
    await _array.forEach(name => {
      const dis1 =
        handleCheckText(newObj[`${name}_discipline`]) &&
        newObj[`${name}_unit_supervisor`] !== null
      const dis2 = newObj[`${name}_event_expert`] !== null
      const dis3 = newObj[`${name}_event_expert_verify`] === '1'
      const dis6 = newObj[`${name}_meeting_users`] !== null
      newObj[`${name}_dis1`] = dis1
      newObj[`${name}_dis2`] = dis2
      newObj[`${name}_dis3`] = dis3
      newObj[`${name}_dis6`] = dis6
    })
    return newObj
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
  handleDisabled = () => {
    if (!this.state.canCreate) {
      return true
    } else if (this.props.show) {
      return true
    } else {
      return false
    }
    // return false
  }
  CheckWidth = () => {
    if (this.refs.label_0) {
      this.setState({
        width: this.refs.label_0.offsetWidth
      })
    }
  }
  handleChangeTab = async (data, key) => {
    if (this.refs[`label_${key}`]) {
      let right = 0
      for (let i = 0; i < key; i++) {
        if (this.refs[`label_${i}`]) {
          right += await this.refs[`label_${key}`].offsetWidth
        }
      }
      await this.setState({
        tabSelected: data.name,
        labelSelected: data.label,
        right: right,
        width: this.refs[`label_${key}`].offsetWidth
      })
    }
  }
  handleListTab = () => {
    const array = [
      {
        label: 'خدمات فنی',
        name: 'technical'
      },
      {
        label: 'بهره برداری',
        name: 'operation'
      },
      {
        label: 'تعمیرات',
        name: 'repair'
      },
      {
        label: 'HSE',
        name: 'hse'
      }
    ]
    return array
  }
  handleState = state => {
    this.setState(state)
  }
  handleConvertDate = date => {
    let convert = moment(date, 'YYYY-MM-DD')
      .locale('fa')
      .format(' jYYYY/jMM/jDD ')
    return convert
  }
  render () {
    if (!this.state.token) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return <Redirect to='/index-ARP' />
    } else {
      return (
        <div className='form row justify-content-start'>
          <HeadTopFirst {...this} disabled={true} />
          <div className='col-12 px-0'>
            <div className='col-12'>
              <div className='box-note'>
                <p className='m-0'>
                  بارگزاری مدرک تا پنج روز پس از دریافت فرم شماره 1 تا تاریخ
                  <span className='IranSans_Bold_FA mr-1 ml-1'>
                    {this.handleConvertDate(this.state.deadline)}
                  </span>
                  امکان پذیر می‌باشد.
                </p>
              </div>
            </div>
          </div>
          <div className='col-12'>
            <div className='access'>
              <div className='main-accsess'>
                <div className='tab'>
                  {this.handleListTab().map((data, key) => (
                    <span
                      key={key}
                      onClick={() => this.handleChangeTab(data, key)}
                      className={`label ${
                        this.state.tabSelected === data.name
                          ? 'active IranSans_Bold'
                          : ''
                      }`}
                      ref={`label_${key}`}
                    >
                      {handleString(data.label)}
                    </span>
                  ))}
                  <div
                    className='line-active'
                    style={{
                      right: `${this.state.right}px`,
                      width: `${this.state.width}px`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <ReportItem {...this} />
        </div>
      )
    }
  }
}
