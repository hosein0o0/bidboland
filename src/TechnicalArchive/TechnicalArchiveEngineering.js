import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'
import RefreshIcon from '@material-ui/icons/Refresh'
import SettingsIcon from '@material-ui/icons/Settings'
import Customization from '../Customization/customization'
// import SearchIcon from '@material-ui/icons/Search';
import BuildersEngineering from './BuildersEngineering'
import StaticData from '../staticData'
import BasicEngineering from './BasicEngineering'
// import BasicEngineeringTest from './BasicEngineeringTest'
import DetailedEngineering from './DetailedEngineering'
// import FinalEquipmentManual from './FinalEquipmentManual'
import { CheckCircle } from '@material-ui/icons'
import { RemoveCircle } from '@material-ui/icons'
import Permision from '../permision/permision'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import UploadInformation from '../Customization/UploadInformation'
import CounterTab from '../Customization/CounterTab'
import SearchTable from '../table/SearchTable'
import Delete from '@material-ui/icons/Delete'
export default class TechnicalArchiveEngineering extends Component {
  constructor(props) {
    super(props)
    this.Search = null
    this.Permision = new Permision()
    this.Reset = null
    this.FilterResetParent = null
    this.ChangeStatusParent = null
    this.state = {
      token: Cookies.get('token'),
      header: [],
      selected: [],
      open: false,
      search: '',
      select: 1,
      accessTab: true,
      upload: false,
      status_rev: 'last_rev'
    }
  }
  componentDidMount() {
    document.title = `${StaticData.Title} - آرشیو فنی مهندسی`
    document.addEventListener('mousedown', this.handleClickOutside)
    setTimeout(() => {
      this.loadCheck()
    }, 1000)
    this.RemoveFilter()
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
    if (this.Reset !== null && this.FilterResetParent !== null) {
      this.FilterResetParent()
      this.Reset()
    }
    this.setState({ status_rev: 'last_rev' })
  }
  ChangeTab = num => {
    this.setState({
      select: num,
      search: '',
      status_rev: 'last_rev'
    })
    this.loadCheck()
  }
  HasNotRol = () => {
    this.setState({ select: 0, accessTab: false, _404: true })
  }
  getRole = (response, status) => {
    if (status === 'response') {
      if (response.status === 200) {
        this.setState({ role: response.data.role })
        const location = this.props.location || {}
        if (location && location.state) {
          if (location.state.select === 1) {
            if (
              this.Permision.handlePermision(
                response.data.role,
                'basic_engineering'
              )
            ) {
              this.setState({ select: 1, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else if (location.state.select === 2) {
            if (
              this.Permision.handlePermision(
                response.data.role,
                'detail_engineering'
              )
            ) {
              this.setState({ select: 2, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else if (location.state.select === 3) {
            if (
              this.Permision.handlePermision(
                response.data.role,
                'builders_engineering'
              )
            ) {
              this.setState({ select: 3, accessTab: true })
            } else {
              this.HasNotRol()
            }
          }
        } else {
          if (
            this.Permision.handlePermision(
              response.data.role,
              'basic_engineering'
            )
          ) {
            this.setState({ select: 1, accessTab: true })
          } else if (
            this.Permision.handlePermision(
              response.data.role,
              'detail_engineering'
            )
          ) {
            this.setState({ select: 2, accessTab: true })
          } else if (
            this.Permision.handlePermision(
              response.data.role,
              'builders_engineering'
            )
          ) {
            this.setState({ select: 3, accessTab: true })
          } else {
            this.HasNotRol()
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
  handleShow = () => {
    if (this.state.token) {
      switch (this.state.select) {
        case 1:
          return (
            <BasicEngineering
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
              FilterReset={remove => (this.FilterResetParent = remove)}
              ChangeStatus={fn => (this.ChangeStatusParent = fn)}
              {...this}
            />
          )
        case 2:
          return (
            <DetailedEngineering
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
              {...this}
              FilterReset={remove => (this.FilterResetParent = remove)}
              ChangeStatus={fn => (this.ChangeStatusParent = fn)}
            // linkUpload={'technicalArchive/mdl/createTest'}
            />
          )
        case 3:
          return (
            <BuildersEngineering
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
              FilterReset={remove => (this.FilterResetParent = remove)}
              ChangeStatus={fn => (this.ChangeStatusParent = fn)}
              {...this}
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
        name: 'مهندسی پایه (Basic)',
        value: 1,
        access: this.Permision.handlePermision(
          this.state.role,
          'basic_engineering'
        )
      },
      {
        name: 'مهندسی تفصیلی (Detail)',
        value: 2,
        access: this.Permision.handlePermision(
          this.state.role,
          'detail_engineering'
        )
      },
      {
        name: 'مهندسی سازندگان (VPIS)',
        value: 3,
        access: this.Permision.handlePermision(
          this.state.role,
          'builders_engineering'
        )
      }
    ]
    return list
  }
  handleNameRole = () => {
    const role = this.state.role
    if (role['engineering_document'] || role === 'all')
      return 'engineering_document'
    else if (role['basic_engineering'] || role === 'all') {
      return 'basic_engineering'
    } else if (role['detail_engineering'] || role === 'all') {
      return 'detail_engineering'
    } else if (role['builders_engineering'] || role === 'all') {
      return 'builders_engineering'
    } else return ''
  }
  handleShowLink = () => {
    if (this.state.token) {
      switch (this.state.select) {
        case 1:
          return {
            link: '/create-basic-engineering',
            access: 'basic_engineering_create',
            update: 'basic_engineering_update',
            linkUpload: 'technicalArchive/basicEng/create'
          }
        case 2:
          return {
            link: '/create-detailed-engineering',
            access: 'detail_engineering_create'
            // update: 'detail_engineering_update',
            // linkUpload: 'technicalArchive/mdl/create'
          }
        case 3:
          return {
            link: '/create-builders-engineering',
            access: 'builders_engineering_create',
            update: 'builders_engineering_update',
            linkUpload: 'technicalArchive/vpis/create'
          }
        default:
          return null
      }
    }
  }
  handleState = (name, value) => {
    if (name && value) {
      this.setState({ [name]: value })
    } else {
      this.setState(name)
    }
  }
  StatusDetail = (name, value) => {
    if (this.ChangeStatusParent) {
      this.setState({ status_rev: value })
      this.ChangeStatusParent(name, value)
    }
  }
  render() {
    const {
      token,
      _404,
      role,
      upload,
      open,
      select,
      accessTab,
      _close,
      status_rev
    } = this.state
    if (!token) {
      return <Redirect to='/Login' />
    } else if (_404) {
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
                className={`${_close ? 'col mainSideClose pr-0' : 'col-xl-10 col-lg-10 p-0'
                  } dashboard`}
              >
                <Menu
                  nameRole={role ? this.handleNameRole() : 'Home'}
                  getRole={this.getRole}
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 header-index pr-0 pl-0'>
                      <div className='row m-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                          <div className='icon-header'>
                            {this.handleShowLink() &&
                              this.Permision.handlePermision(
                                role,
                                this.handleShowLink().access
                              ) && (
                                <div className='icon'>
                                  <a href={this.handleShowLink().link}>
                                    <AddCircleIcon />
                                    <span>ایجاد کاربرگ</span>
                                  </a>
                                </div>
                              )}
                            {this.handleShowLink() &&
                              this.Permision.handlePermision(
                                role,
                                this.handleShowLink().update
                              ) && (
                                <React.Fragment>
                                  <div className='icon'>
                                    <span
                                      className='item'
                                      onClick={() =>
                                        this.setState({
                                          upload: this.handleShowLink()
                                            .linkUpload
                                            ? !upload
                                            : false
                                        })
                                      }
                                    >
                                      <SystemUpdateAltIcon />
                                      <span>بروز رسانی</span>
                                    </span>
                                  </div>
                                  {upload &&
                                    this.handleShowLink().linkUpload && (
                                      <UploadInformation
                                        {...this}
                                        linkUpload={
                                          this.handleShowLink().linkUpload
                                        }
                                        handleState={(name, value) =>
                                          this.setState({ [name]: value })
                                        }
                                      />
                                    )}
                                </React.Fragment>
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
                              {open && (
                                <Customization
                                  {...this}
                                  handleSelect={this.handleSelect}
                                />
                              )}
                            </div>
                            {select === 2 &&
                              <div
                                className={`icon ${status_rev === 'delete_rev' ? '_active' : ''
                                  }`}
                              >
                                <span
                                  className='item'
                                  onClick={() =>
                                    this.StatusDetail('status_rev', 'delete_rev')
                                  }
                                >
                                  <Delete />
                                  <span>Deleted</span>
                                </span>
                              </div>
                            }


                            <div
                              className={`icon ${status_rev === 'all_rev' ? '_active' : ''
                                }`}
                            >
                              <span
                                className='item'
                                onClick={() =>
                                  this.StatusDetail('status_rev', 'all_rev')
                                }
                              >
                                <CheckCircle />
                                <span>All Rev</span>
                              </span>
                            </div>
                            <div
                              className={`icon ${status_rev === 'last_rev' ? '_active' : ''
                                }`}
                            >
                              <span
                                className='item'
                                onClick={() =>
                                  this.StatusDetail('status_rev', 'last_rev')
                                }
                              >
                                <RemoveCircle />
                                <span>Last Rev</span>
                              </span>
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
                        {accessTab &&
                          this.handleShowTab().map(
                            (tab, index) =>
                              tab.access && (
                                <div
                                  className={`col-xl-3 col-lg-4 col-4 mr-0 pr-3 pl-0`}
                                  onClick={() => this.ChangeTab(tab.value)}
                                  key={index}
                                >
                                  <div
                                    className={`item-tab rtl mr-0 w-100 p-0 col-12 ${select === tab.value
                                      ? 'active IranSans_Bold'
                                      : ''
                                      }`}
                                  >
                                    <span>
                                      <label
                                        className={`${select === tab.value
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
                    <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-end'>
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
