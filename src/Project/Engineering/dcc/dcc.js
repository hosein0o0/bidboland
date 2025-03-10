import React, { Component } from 'react'
import Sidebar from '../../../layout/sidebar'
import Menu from '../../../layout/menu'
import { Redirect } from 'react-router-dom'
import StaticData from '../../../staticData'
import Cookies from 'js-cookie'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'
import RefreshIcon from '@material-ui/icons/Refresh'
// import SearchIcon from '@material-ui/icons/Search';
// import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings'
import Customization from '../../../Customization/customization'
import DocumentControlCenter from './DocumentControlCenter/DocumentControlCenter'
import MainTransmittal from './main/index-transmittal'
import SubsidiaryIndex from './subsidiary/SubsidiaryIndex'
import Permision from '../../../permision/permision'
// import Attention from '../../../layout/Attention'
// import axios from 'axios'
import Notification from '../../../notification/notification'
import Message from '../../../notification/Message'
import UploadInformation from '../../../Customization/UploadInformation'
import CounterTab from '../../../Customization/CounterTab'
import SearchTable from '../../../table/SearchTable'
export default class DCC extends Component {
  constructor (props) {
    super(props)
    this.Search = null
    this.Reset = null
    this.FilterReset = null
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      header: [],
      selected: [],
      open: false,
      select: 1,
      search: '',
      role: null,
      nameRole: '',
      disabledCreate: false,
      accessTab: false,
      _404: false,
      upload: false
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - مرکز کنترل اسناد`
    document.addEventListener('mousedown', this.handleClickOutside)
    setTimeout(async () => {
      this.loadCheck()
    }, 100)
    if (this.props.location && this.props.location.state) {
      this.setState({ select: this.props.location.state.select })
    }
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  loadCheck = async () => {
    this.setState({ selected: [] })
    await Object.keys(this.state).map(value => {
      if (value.includes('_header_')) {
        this.setState({ [value]: false })
      }
    })
    await this.state.header.forEach(head => {
      this.setState({
        [`_header_${head.name}`]: true,
        selected: [...this.state.selected, head.name]
      })
    })
  }
  ChangeTab = num => {
    this.setState({ select: num, search: '', disabledCreate: true })
    this.loadCheck()
  }
  handleSelect = async (checked, name) => {
    if (this.state.selected.length > 1 || checked) {
      await this.setState({ [name]: checked })
      let array = []
      for (let value in this.state) {
        if (value.includes('_header_')) {
          if (this.state[value]) {
            let name = value.split('_header_')[1]
            array.push(name)
          }
        }
      }
      await this.setState({ selected: array })
    }
  }
  handleButtonClick = () => {
    this.setState(state => {
      return {
        open: !state.open
      }
    })
  }
  handleClickOutside = event => {
    if (this.refs.container && !this.refs.container.contains(event.target)) {
      this.setState({
        open: false
      })
    }
  }
  RemoveFilter = () => {
    let list = []
    this.state.header.filter(head => list.push(head.name))
    this.setState({ selected: list })
    for (let value in this.state) {
      if (value.includes('_header_')) {
        this.setState({ [value]: true })
      }
    }
    if (this.Reset !== null && this.FilterReset !== null) {
      this.FilterReset()
      this.Reset()
    }
  }
  handleShow = () => {
    switch (this.state.select) {
      case 1:
        if (
          this.Permision.handlePermision(this.state.role, 'dcc')
        ) {
          return (
            <DocumentControlCenter
              GetFunction={e => (this.Search = e)}
              getHeader={e => this.setState({ header: e })}
              selected={this.state.selected}
              resetSearch={() => this.setState({ search: '' })}
              getReset={e => (this.Reset = e)}
              FilterReset={remove => (this.FilterReset = remove)}
            />
          )
        } else return ''
      case 2:
        if (this.Permision.handlePermision(this.state.role, 'main_transmittal')) {
          return (
            <MainTransmittal
              GetFunction={e => (this.Search = e)}
              getHeader={e => this.setState({ header: e })}
              selected={this.state.selected}
              resetSearch={() => this.setState({ search: '' })}
              getReset={e => (this.Reset = e)}
              FilterReset={remove => (this.FilterReset = remove)}
            />
          )
        } else return ''
      case 3:
        if (
          this.Permision.handlePermision(
            this.state.role,
            'secondary_transmittal'
          )
        ) {
          return (
            <SubsidiaryIndex
              GetFunction={e => (this.Search = e)}
              getHeader={e => this.setState({ header: e })}
              selected={this.state.selected}
              resetSearch={() => this.setState({ search: '' })}
              FilterReset={remove => (this.FilterReset = remove)}
              getReset={e => (this.Reset = e)}
            />
          )
        } else return ''
      default:
        return false
    }
  }
  handleShowTab = () => {
    let list = [
      {
        name: 'مدیریت مهندسی',
        value: 1,
        access: this.Permision.handlePermision(this.state.role, 'dcc')
      },
      {
        name: 'ترنسمیتال اصلی',
        value: 2,
        access: this.Permision.handlePermision(this.state.role, 'main_transmittal')
      },
      {
        name: 'ترنسمیتال فرعی',
        value: 3,
        access: this.Permision.handlePermision(
          this.state.role,
          'secondary_transmittal'
        )
      }
    ]
    return list
  }
  handleCreateIcon = () => {
    const { select, role } = this.state
    const CheckPer = name => {
      const check = this.Permision.handlePermision(role, name)
      return check
    }
    const disabled = () => {
      return {
        status: 'disabled',
        html: (
          <span className='item disabled'>
            <AddCircleIcon />
            <span>ایجاد کاربرگ</span>
          </span>
        )
      }
    }
    const Current = url => {
      return {
        status: '',
        html: (
          <a href={url}>
            <AddCircleIcon />
            <span>ایجاد کاربرگ</span>
          </a>
        )
      }
    }
    switch (select) {
      case 1:
        if (CheckPer('dcc_create')) {
          return Current('/create-mdl')
        } else {
          return disabled()
        }
      case 2:
        if (CheckPer('main_transmittal_create')) {
          return Current('/Create-Transmital')
        } else {
          return disabled()
        }
      case 3:
        if (CheckPer('secondary_transmittal_create')) {
          return Current('/Create-SubsidiaryTransmital')
        } else {
          return disabled()
        }
      default:
        return {
          status: 'disabled',
          html: ''
        }
    }
  }
  getRole = (response, status) => {
    if (status === 'response') {
      if (response.status === 200) {
        this.setState({ role: response.data.role })
        if (this.props.location && this.props.location.state) {
          if (this.props.location.state.select === 1) {
            if (
              this.Permision.handlePermision(response.data.role, 'dcc')
            ) {
              this.setState({ select: 1, accessTab: true })
            } else {
              this.setState({ select: 0, accessTab: false, _404: true })
            }
          } else if (this.props.location.state.select === 2) {
            if (
              this.Permision.handlePermision(response.data.role, 'main_transmittal')
            ) {
              this.setState({ select: 2, accessTab: true })
            } else {
              this.setState({ select: 0, accessTab: false, _404: true })
            }
          } else if (this.props.location.state.select === 3) {
            if (
              this.Permision.handlePermision(
                response.data.role,
                'secondary_transmittal'
              )
            ) {
              this.setState({ select: 3, accessTab: true })
            } else {
              this.setState({ select: 0, accessTab: false, _404: true })
            }
          }
        } else {
          if (this.Permision.handlePermision(response.data.role, 'dcc')) {
            this.setState({ select: 1, accessTab: true })
          } else if (
            this.Permision.handlePermision(response.data.role, 'main_transmittal')
          ) {
            this.setState({ select: 2, accessTab: true })
          } else if (
            this.Permision.handlePermision(
              response.data.role,
              'secondary_transmittal'
            )
          ) {
            this.setState({ select: 3, accessTab: true })
          } else {
            this.setState({ select: 0, accessTab: false, _404: true })
          }
        }
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
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state._404) {
      return <Redirect to='/404' />
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
                  nameRole='project_engineering'
                  getRole={this.getRole}
                  BI={false}
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 header-index pr-0 pl-0'>
                      <div className='row m-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                          <div className='icon-header'>
                            <div
                              className={`icon ${
                                this.handleCreateIcon().status
                              }`}
                            >
                              {this.handleCreateIcon().html}
                            </div>
                            <div className='icon'>
                              <span
                                className='item'
                                onClick={() =>
                                  this.setState({ upload: !this.state.upload })
                                }
                              >
                                <SystemUpdateAltIcon />
                                <span>بروز رسانی</span>
                              </span>
                            </div>
                            <div className='icon'>
                              <span
                                className='item'
                                onClick={this.RemoveFilter}
                              >
                                <RefreshIcon />
                                <span>حذف فیلترها</span>
                              </span>
                            </div>
                            <div
                              className='icon position-relative justify-content-center'
                              ref='container'
                            >
                              <span
                                className='item'
                                onClick={this.handleButtonClick}
                              >
                                <SettingsIcon />
                                <span>سفارشی سازی</span>
                              </span>
                              {this.state.open && (
                                <Customization
                                  {...this}
                                  handleSelect={this.handleSelect}
                                />
                              )}
                            </div>
                            {this.state.upload && (
                              <UploadInformation
                                {...this}
                                handleState={(name, value) =>
                                  this.setState({ [name]: value })
                                }
                              />
                            )}
                          </div>
                        </div>
                        <SearchTable
                          {...this}
                          handleState={(name, value) =>
                            this.setState({ [name]: value })
                          }
                        />
                      </div>
                    </div>
                    <div className='tab-form rtl'>
                      <div className='col-xl-11 col-lg-11 col-12 row m-0 justify-content-start'>
                        {this.state.accessTab &&
                          this.handleShowTab().map(
                            (tab, index) =>
                              tab.access && (
                                <div
                                  className={`item-tab rtl col-xl-3 ${
                                    this.state.select === tab.value
                                      ? 'active IranSans_Bold'
                                      : ''
                                  }`}
                                  onClick={() => this.ChangeTab(tab.value)}
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
                                    {tab.name}
                                  </span>
                                </div>
                              )
                          )}
                      </div>
                    </div>
                    <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-end'>
                      {this.state.accessTab && this.handleShow()}
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
