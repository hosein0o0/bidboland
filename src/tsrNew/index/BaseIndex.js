import React, { Component } from 'react'
import StaticData from '../../staticData'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import Cookies from 'js-cookie'
import Permision from '../../permision/permision'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import { Redirect } from 'react-router-dom'
import UploadInformation from '../../Customization/UploadInformation'
import SearchTable from '../../table/SearchTable'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RefreshIcon from '@material-ui/icons/Refresh'
import SettingsIcon from '@material-ui/icons/Settings'
import Customization from '../../Customization/customization'
import CounterTab from '../../Customization/CounterTab'
import DrafList from './DrafList'
import AcceptedList from './AcceptedList'
import { ReactComponent as Report } from "../report/assets/report.svg";
import { Link } from 'react-router-dom/cjs/react-router-dom'
export default class BaseIndex extends Component {
  constructor(props) {
    super(props)
    this.Permision = new Permision()
    this.Search = null
    this.Reset = null
    this.FilterReset = null
    this.state = {
      token: Cookies.get('token'),
      header: [],
      select: 2,
      selected: []
    }
  }
  componentDidMount() {
    document.title = `${StaticData.Title} - TSR`
    document.addEventListener('mousedown', this.handleClickOutside)
    setTimeout(async () => {
      this.state.header.forEach(head => {
        if (!head.notDefault) {
          this.setState({
            [`_header_${head.name}`]: true,
            selected: [...this.state.selected, head.name]
          })
        }
      })
    }, 50)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  loadCheck = async () => {
    await this.setState({ selected: [] })
    await Object.keys(this.state).map(value => {
      if (value.includes('_header_')) {
        this.setState({ [value]: false })
      }
      return true
    })
    await this.state.header.forEach(head => {
      if (!head.notDefault) {
        this.setState({
          [`_header_${head.name}`]: true,
          selected: [...this.state.selected, head.name]
        })
      }
    })
  }
  handleSelect = async (checked, name) => {
    if (this.state.selected.length > 1 || checked) {
      await this.setState({ [name]: checked })
      let array = []
      for (let value in this.state) {
        if (value.includes('_header_')) {
          if (this.state[value]) {
            let _name = value.split('_header_')[1]
            array.push(_name)
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
    if (this.refs.report && !this.refs.report.contains(event.target)) {
      this.setState({
        report: false,
        _select_: ''
      })
    }
  }
  RemoveFilter = () => {
    let list = []
    this.state.header.filter(head => list.push(head.name))
    this.setState({ selected: list, search: '' })
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
  ChangeTab = num => {
    this.setState({
      select: num,
      search: ''
    })
    this.loadCheck()
  }
  HasNotRol = () => {
    this.setState({ select: 0, accessTab: false, _404: true })
  }
  getRole = (response, status) => {
    setTimeout(() => {
      this.loadCheck()
    }, 100)
    if (status === 'response') {
      if (response.status === 200) {
        const location = this.props.location
        this.setState({ role: response.data.role, accessTab: true })
        if (location && location.state) {
          if (location.state.select === 2) {
            if (
              this.Permision.handlePermision(response.data.role, 'tsr_show')
            ) {
              this.setState({ select: 2, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else if (location.state.select === 1) {
            if (
              this.Permision.handlePermision(response.data.role, 'tsr_show')
            ) {
              this.setState({ select: 1, accessTab: true })
            } else {
              this.HasNotRol()
            }
          }
        } else {
          if (this.Permision.handlePermision(response.data.role, 'tsr_show')) {
            this.setState({ select: 2, accessTab: true })
          } else if (
            this.Permision.handlePermision(response.data.role, 'tsr_show')
          ) {
            this.setState({ select: 1, accessTab: true })
          }
        }
      } else {
        this.setState({ select: 0, accessTab: false })
        Notification.notify(Message.text(response.status), 'error')
      }
    } else {
      this.setState({ accessTab: false })
      if (response.response) {
        Notification.notify(Message.text(response.response.status), 'error')
      }
    }
  }
  handleShowTab = () => {
    const list = [
      {
        name: 'ثبت شده',
        value: 1,
        access: this.Permision.handlePermision(this.state.role, 'tsr_show')
      },
      {
        name: 'تائید شده',
        value: 2,
        access: this.Permision.handlePermision(this.state.role, 'tsr_show')
      }
    ]
    return list
  }
  handleState = (name, value) => {
    this.setState({ [name]: value })
  }
  handleNameRole = () => {
    const { role } = this.state
    if (role['tsr_show'] || role === 'all') {
      return 'tsr_show'
    }
    return ''
  }
  handleShow = () => {
    const { select, token } = this.state
    const access = this.Permision.handlePermision(this.state.role, 'tsr_show')
    if (token && access) {
      switch (select) {
        case 1:
          return <DrafList {...this} />
        case 2:
          return <AcceptedList {...this} />
        default:
          return ''
      }
    }
    return ''
  }
  handleThis = (name, value) => {
    this[name] = value
  }
  render() {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state._404) {
      return <Redirect to='/404' />
    } else {
      return (
        <div className='main'>
          <div className='col-12 p-0'>
            <div className='row m-0'>
              <Sidebar
                handleState={(name, value) => this.setState({ [name]: value })}
              />
              <div
                className={`${this.state._close
                  ? 'mainSideClose'
                  : 'col-xl-10 col-lg-10 p-0'
                  } dashboard`}
              >
                <Menu
                  nameRole={this.state.role ? this.handleNameRole() : 'Home'}
                  getRole={(response, status) => this.getRole(response, status)}
                  nameUrl={this.props.nameUrl}
                />
                {this.state.upload && (
                  <UploadInformation
                    {...this}
                    handleState={(name, value) =>
                      this.setState({ [name]: value })
                    }
                  />
                )}
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 header-index pr-0 pl-0'>
                      <div className='row m-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                          <div className='icon-header'>
                            {this.Permision.handlePermision(
                              this.state.role,
                              'tsr_create'
                            ) && (
                                <div className='icon'>
                                  <a href='/new-TSR'>
                                    <AddCircleIcon />
                                    <span>ایجاد کاربرگ</span>
                                  </a>
                                </div>
                              )}
                            <div className='icon'>
                              <span
                                className='item'
                                onClick={() => this.RemoveFilter()}
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
                            <div className='icon'>
                              <Link to='/new-tsr/report'>
                                <span className='item'
                                >
                                  <Report style={{ width: 24, height: 24 }} />
                                  <span>Report</span>
                                </span>
                              </Link>
                            </div>
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
                      <div className='col-xl-11 col-lg-11 col-12 row m-0 justify-content-start rtl'>
                        {this.state.accessTab &&
                          this.handleShowTab().map(
                            (tab, index) =>
                              tab.access && (
                                <div
                                  className={`col-xl-3 col-lg-4 col mr-0 pl-3 pr-0`}
                                  onClick={() => this.ChangeTab(tab.value)}
                                  key={index}
                                >
                                  <div
                                    className={`item-tab rtl mr-0 w-100 p-0 col-12 ${this.state.select === tab.value
                                      ? 'active IranSans_Bold'
                                      : ''
                                      }`}
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
                                      {tab.name}
                                    </span>
                                  </div>
                                </div>
                              )
                          )}
                      </div>
                    </div>
                    <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-start'>
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
