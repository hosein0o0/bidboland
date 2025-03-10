import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import AddCircleIcon from '@material-ui/icons/AddCircle'
// import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import RefreshIcon from '@material-ui/icons/Refresh'
import SettingsIcon from '@material-ui/icons/Settings'
import Customization from '../Customization/customization'
// import SearchIcon from '@material-ui/icons/Search';
import StaticData from '../staticData'
import Permision from '../permision/permision'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import Registered from './Registered'
import Accepted from './Accepted'
// import UploadInformation from '../Customization/UploadInformation'
import CounterTab from '../Customization/CounterTab'
import SearchTable from '../table/SearchTable'
export default class KnowledgeManagement extends Component {
  constructor (props) {
    super(props)
    this.Search = null
    this.Permision = new Permision()
    this.Reset = null
    this.FilterReset = null
    this.state = {
      token: Cookies.get('token'),
      header: [],
      selected: [],
      open: false,
      search: '',
      select: 1,
      accessTab: true
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - مدیریت دانش`
    document.addEventListener('mousedown', this.handleClickOutside)
    setTimeout(() => {
      this.loadCheck()
    }, 100)
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  // handleSearch = (e) => {
  //     if (this.Search !== null) {
  //         this.setState({ search: e.target.value })
  //         this.Search(e.target.value)
  //     }
  // }
  loadCheck = async () => {
    await this.setState({ selected: [] })
    await Object.keys(this.state).map(value => {
      if (value.includes('_header_')) {
        this.setState({ [value]: false })
      }
      return true
    })
    await this.state.header.forEach(head => {
      this.setState({
        [`_header_${head.name}`]: true,
        selected: [...this.state.selected, head.name]
      })
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
  }
  RemoveFilter = () => {
    let list = []
    if (this.state.select === 4 || this.state.select === 3) {
      this.state.defaultSelected.filter(head => list.push(head.name))
    } else {
      this.state.header.filter(head => list.push(head.name))
    }
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
  getRole = (response, status) => {
    if (status === 'response') {
      if (response.status === 200) {
        this.setState({ role: response.data.role, accessTab: true })
      }
    } else {
      this.setState({ select: 0, accessTab: false })
      if (response.response) {
        Notification.notify(Message.text(response.response.status), 'error')
      }
    }
  }
  ChangeTab = num => {
    this.setState({ select: num, search: '' })
    this.loadCheck()
  }
  handleShow = () => {
    if (this.state.token) {
      switch (this.state.select) {
        case 1:
          return (
            <Registered
              GetFunction={e => (this.Search = e)}
              getHeader={e => this.setState({ header: e })}
              selected={this.state.selected}
              resetSearch={() => this.setState({ search: '' })}
              getReset={e => (this.Reset = e)}
              getRole={(e, name) =>
                this.setState({
                  role: e,
                  nameRole: name,
                  disabledCreate: false
                })
              }
              FilterReset={remove => (this.FilterReset = remove)}
            />
          )
        case 2:
          return (
            <Accepted
              GetFunction={e => (this.Search = e)}
              getHeader={e => this.setState({ header: e })}
              selected={this.state.selected}
              resetSearch={() => this.setState({ search: '' })}
              getReset={e => (this.Reset = e)}
              getRole={(e, name) =>
                this.setState({
                  role: e,
                  nameRole: name,
                  disabledCreate: false
                })
              }
              FilterReset={remove => (this.FilterReset = remove)}
            />
          )
        default:
          return ''
      }
    }
  }
  handleShowTab = () => {
    let list = [
      {
        name: 'درس آموخته‌های ثبت شده',
        value: 1,
        access: this.Permision.handlePermision(this.state.role, '')
      },
      {
        name: 'درس آموخته‌های تائید شده',
        value: 2,
        access: this.Permision.handlePermision(this.state.role, '')
      }
    ]
    return list
  }
  handleShowLink = () => {
    if (this.state.token) {
      switch (this.state.select) {
        case 1:
          return '/recorded-lessons-learned'
        case 2:
          return '/approved-lessons-learned'
        default:
          return '#'
      }
    }
  }
  render () {
    if (!this.state.token) {
      return <Redirect to='/Login' />
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
                  nameRole='Home'
                  getRole={this.getRole}
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 header-index pr-0 pl-0'>
                      <div className='row m-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                          <div className='icon-header'>
                            {this.state.select === 1 ? (
                              <div className='icon'>
                                <a href={this.handleShowLink()}>
                                  <AddCircleIcon />
                                  <span>ایجاد کاربرگ</span>
                                </a>
                              </div>
                            ) : (
                              ''
                            )}
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
                          this.Permision.handlePermision(
                            this.state.role,
                            'transmittal_complete'
                          ) &&
                          this.handleShowTab().map(
                            (tab, index) =>
                              tab.access && (
                                <div
                                  className={`col-xl-3 col-lg-4 col mr-0 pr-3 pl-0`}
                                  onClick={() => this.ChangeTab(tab.value)}
                                  key={index}
                                >
                                  <div
                                    className={`item-tab rtl mr-0 w-100 p-0 col-12 ${
                                      this.state.select === tab.value
                                        ? 'active IranSans_Bold'
                                        : ''
                                    }`}
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
                                </div>
                              )
                          )}
                      </div>
                    </div>
                    <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-end rtl'>
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
