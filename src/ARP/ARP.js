import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import Permision from '../permision/permision'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import TechnicalReport from './TechnicalReport'
// import ReportVariousDisciplines from './ReportVariousDisciplines'
// import ReviewReports from './ReviewReports'
// import CorrectiveActions from './CorrectiveActions'
// import handleCheckText from '../handleCheckText'
import CounterTab from '../Customization/CounterTab'
import handleString from '../handleString'

export default class ARP extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    // this.handleCheckText = HandleCheckText.handleCheckText
    this.state = {
      token: Cookies.get('token'),
      role: '',
      select: 1,
      accessTab: false
    }
  }
  handleShowTab = () => {
    let list = [
      {
        name: 'گزارش فنی حوادث مجتمع',
        value: 1,
        access: this.Permision.handlePermision(this.state.role, ''),
        title: 'گزارش فنی حوادث مجتمع'
      },

      {
        name: 'گزارش دیسیپلین‌های مختلف',
        value: 2,
        access: this.Permision.handlePermision(this.state.role, ''),
        title: 'گزارش دیسیپلین‌های مختلف'
      },
      {
        name: 'گزارش رویداد',
        value: 3,
        access: this.Permision.handlePermision(this.state.role, ''),
        title: 'گزارش رویداد (حادثه و شبه حادثه فرایندی)'
      },
      {
        name: 'اقدامات اصلاحی',
        value: 4,
        access: this.Permision.handlePermision(this.state.role, ''),
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
  handleShow = () => {
    switch (this.state.select) {
      case 1:
        return <TechnicalReport {...this} notDisabled={true} />
      default:
        return false
    }
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      return (
        <div className='main'>
          <div className='row m-0'>
            <Sidebar
              handleState={(name, value) => this.setState({ [name]: value })}
            />
            <div
              className={`${
                this.state._close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'
              } dashboard`}
            >
              <Menu
                nameRole='arp_create'
                getRole={this.getRole}
                nameUrl={this.props.nameUrl}
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
                              tab.access && (
                                <div
                                  className={`item-tab rtl col ${
                                    this.state.select === tab.value
                                      ? 'active IranSans_Bold'
                                      : ''
                                  }`}
                                  key={index}
                                >
                                  <span>
                                    <label
                                      className={`${
                                        this.state.select === tab.value
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
                      {this.handleShow()}
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
