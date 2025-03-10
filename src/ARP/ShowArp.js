import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import Permision from '../permision/permision'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import TechnicalReport from './TechnicalReport'
import ReportVariousDisciplines from './ReportVariousDisciplines'
import ReviewReports from './ReviewReports'
import CorrectiveActions from './CorrectiveActions'
// import handleCheckText from '../handleCheckText'
import CounterTab from '../Customization/CounterTab'
import axios from 'axios'
import StaticData from '../staticData'
import Revisions from './Revisions'
import moment from 'moment-jalaali'
import handleString from '../handleString'
export default class ShowARP extends Component {
  constructor(props) {
    super(props)
    this.Permision = new Permision()
    // this.handleCheckText = HandleCheckText.handleCheckText
    this.ShowFetch = {}
    this.state = {
      token: Cookies.get('token'),
      role: '',
      select: 0,
      accessTab: false,
      userDetail: {}
    }
  }
  async componentDidMount() {
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    await this.setState({ id: id })
    await this.fetchData(id)
  }
  fetchData = async (id, NotChange = false) => {
    const url = `${StaticData.domainIp}/arp/get/${id}`
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(async response => {
        this.setState({ loading: '', firstLoading: false })
        if (response.status === 200) {
          const content = response.data.content ? response.data.content[0] : {}
          let select =
            parseInt(content.form) === 34 ? 4 : parseInt(content.form)
          let _state = await content
          _state['select'] = (await NotChange) ? this.state.select : select
          _state['role'] = await response.data.role
          _state['level'] = await select
          _state['state'] = await content.state
          _state['userDetail'] = await response.data.userDetail
          await this.setState(_state)
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        this.setState({ loading: '', firstLoading: false })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  handleShowTab = () => {
    let list = [
      {
        name: 'گزارش فنی حوادث مجتمع',
        value: 1,
        access: this.Permision.handlePermision(this.state.role, 'arp_show'),
        title: 'گزارش فنی حوادث مجتمع'
      },

      {
        name: 'گزارش دیسیپلین‌های مختلف',
        value: 2,
        access: this.Permision.handlePermision(this.state.role, 'arp_show'),
        title: 'گزارش دیسیپلین‌های مختلف'
      },
      {
        name: 'گزارش رویداد',
        value: 3,
        access: this.Permision.handlePermision(this.state.role, 'arp_show'),
        title: 'گزارش رویداد (حادثه و شبه حادثه فرایندی)'
      },
      {
        name: 'اقدامات اصلاحی',
        value: 4,
        access: this.Permision.handlePermision(this.state.role, 'arp_show'),
        title: 'اقدامات اصلاحی جهت جلوگیری از حوادث مشابه'
      }
    ]
    return list
  }
  getRole = (response, status) => {
    if (status === 'response') {
      if (response.status === 200) {
        this.setState({ role: response.data.role, accessTab: true })
      } else {
        this.setState({ select: 0, accessTab: false })
        Notification.notify(Message.text(response.status), 'error')
      }
    } else {
      this.setState({ select: 0, accessTab: false })
      if (response.response) {
        Notification.notify(Message.text(response.response.status), 'error')
      }
    }
  }
  handleState = obj => {
    this.setState(obj)
  }
  CheckShow = () => {
    const { state, level, select } = this.state
    const state1 = state === 'create' || state === 'update' || state === 'signCreate'
    const state2 = level === select
    const state_result = state1 && state2
    const result = state_result ? false : true
    // const show = !((state === 'create' || state === 'update' || state === 'signCreate') && level === select)
    return result
  }
  CheckUpdate4 = () => {
    const { level, select, state, update_arp4_allow, secretary_committee_allow } = this.state
    const state1 = level === select
    const state2 = state === 'update' || update_arp4_allow ? true : false
    const state3 = secretary_committee_allow ? true : false
    const check = state1 && state2 && state3
    return check
  }
  CheckUpdate1 = () => {
    const { level, select, update_arp1_allow } = this.state
    const arp1Edit = update_arp1_allow && level === select
    return arp1Edit
  }
  CheckCanSign = () => {
    const { level, select, state } = this.state
    const check = state === 'sign' && select === level
    return check
  }
  handleShow = () => {
    switch (this.state.select) {
      case 1:
        return {
          access: this.Permision.handlePermision(this.state.role, 'arp_show'),
          html: (
            <TechnicalReport
              {...this}
              show={this.CheckShow()}
              canUpdate={this.CheckUpdate1()}
            />
          )
        }
      case 2:
        return {
          access: this.Permision.handlePermision(this.state.role, 'arp_show'),
          html: <ReportVariousDisciplines {...this} show={this.CheckShow()} />
        }
      case 3:
        return {
          access: this.Permision.handlePermision(this.state.role, 'arp_show'),
          html: <ReviewReports {...this} show={this.CheckShow()} />
        }

      case 4:
        return {
          access: this.Permision.handlePermision(this.state.role, 'arp_show'),
          html: (
            <CorrectiveActions
              {...this}
              show={this.CheckShow()}
              canUpdate={this.CheckUpdate4()}
            />
          )
        }
      default:
        return false
    }
  }
  handleVerify = async (accept = true) => {
    const { url } = await this.state.rejectSelect
    const { token, id } = this.state
    if (url) {
      let a = {}
      if (token && id) {
        let datareg = await new FormData()
        await datareg.append('verify', accept ? '1' : '0')
        a['verify'] = accept ? '1' : '0'
        await datareg.append('arp_id', id)
        a['arp_id'] = id
        let urlSend = `${StaticData.domainIp}/arp/${url}`
        await axios({
          method: 'post',
          url: urlSend,
          data: datareg,
          headers: {
            Authorization: token ? `Bearer ${token}` : null
          }
        })
          .then(async response => {
            await this.setState({ loading: '', rejectSelect: '' })
            if (response.status === 200) {
              await Notification.notify(Message.text(928), 'success')
              setTimeout(async () => {
                await window.location.reload(true)
                await this.setState({ redirect: false, disabled: false })
              }, 5000)
            } else {
              this.setState({ disabled: false })
              Notification.notify(Message.text(response.status), 'error')
            }
          })
          .catch(err => {
            this.setState({ loading: '', disabled: false, rejectSelect: '' })
            if (err.response) {
              Notification.notify(Message.text(err.response.status), 'error')
            }
          })
      }
    }
  }
  handleRev = data => {
    const page = this.state.select,
      arpid = this.state.id,
      id = data.id
    let fn = this.ShowFetch[this.state.select]
    if (fn) {
      if (page && arpid && id) {
        axios
          .get(
            `${StaticData.domainIp}/arp/getRevisionDetail/${page}/arp/${arpid}/id/${id}`,
            {
              headers: {
                Authorization: `Bearer ${this.state.token}`
              }
            }
          )
          .then(async response => {
            this.setState({ loading: '' })
            if (response.status === 200) {
              const state = await response.data.content
              if (state) {
                await this.setState({
                  [`arp${this.state.select}`]: state,
                  status: 'sign',
                  can_do_action: null,
                  disabledRev: true
                })
                await fn()
              }
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
    }
  }
  handleDate = date => {
    const currentDate = moment(date).format('jYYYY/jMM/jDD HH:MM')
    return currentDate
  }
  handleDateWithoutTime = date => {
    const currentDate = moment(date).format('jYYYY/jMM/jDD')
    return currentDate
  }
  render() {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return <Redirect to='/index-ARP' />
    } else {
      return (
        <div className='main'>
          <div className='row m-0'>
            <Sidebar
              handleState={(name, value) => this.setState({ [name]: value })}
            />
            <div
              className={`${this.state._close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'
                } dashboard`}
            >
              <Menu
                nameRole='arp_show'
                getRole={this.getRole}
                nameUrl={this.props.nameUrl}
                firstLoading={this.state.firstLoading}
              />
              <div className='w-100 row m-0 main-box-dashboard'>
                <div className='boxes-dashboard row m-0 p-0'>
                  <div className='main-form'>
                    {this.handleShowTab()[this.state.select - 1] && (
                      <div className='title-from'>
                        <h2>
                          {this.handleShowTab()[this.state.select - 1].title}
                        </h2>
                      </div>
                    )}
                    <div className='tab-form rtl'>
                      <div className='col-xl-11 col-lg-11 col-12 row m-0 justify-content-start'>
                        {this.state.accessTab &&
                          this.handleShowTab().map(
                            (tab, index) =>
                              index < this.state.level &&
                              tab.access && (
                                <div
                                  className={`item-tab rtl col-xl-3 col-lg-3 col-md-4 ${this.state.select === tab.value
                                    ? 'active IranSans_Bold'
                                    : ''
                                    }`}
                                  onClick={() =>
                                    this.setState({
                                      select:
                                        index < this.state.level
                                          ? tab.value
                                          : this.state.select
                                    })
                                  }
                                  key={index}
                                >
                                  <span>
                                    <label
                                      className={`${this.state.select === tab.value
                                        ? 'IranSans_Bold'
                                        : ''
                                        }`}
                                    >
                                      <CounterTab
                                        key={index}
                                        tafazol={
                                          this.handleShowTab().filter(
                                            item => !item.access
                                          ).length
                                        }
                                        data={tab}
                                      />
                                      .
                                    </label>
                                    {handleString(tab.name)}
                                  </span>
                                </div>
                              )
                          )}
                      </div>
                    </div>
                    <div className='col-xl-8 col-lg-12 col-md-12 col-12'>
                      {this.Permision.handlePermision(
                        this.state.role,
                        'arp_revisions'
                      ) && (
                          <Revisions
                            {...this}
                            GetReset={fn => (this.ResetRev = fn)}
                            handleState={(name, value) =>
                              this.setState({ [name]: value })
                            }
                          />
                        )}
                      {this.handleShow().access ? this.handleShow().html : ''}
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
