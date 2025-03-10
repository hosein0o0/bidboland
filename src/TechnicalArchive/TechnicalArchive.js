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
import StaticData from '../staticData'
import IsoMetric from './IsoMetric'
// import FinalEquipmentManual from './FinalEquipmentManual'
import Permision from '../permision/permision'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import PAndId from './P&ID'
import LineList from './LineList'
import PFD from './PFD'
import Model3D from './3DModel'
// import { Switch } from '@material-ui/core'
import Instrument from './Instrument'
import UploadInformation from '../Customization/UploadInformation'
import CounterTab from '../Customization/CounterTab'
import SearchTable from '../table/SearchTable'
export default class TechnicalArchive extends Component {
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
      accessTab: true,
      defaultSelected: [],
      num: 0
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - آرشیو فنی شناسنامه`
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
  componentWillUnmount () {
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
  RemoveFilter = async () => {
    let list = await []
    await this.setState({ selected: [] })
    await this.state.header.filter(head => {
      if (!head.notDefault) {
        list.push(head.name)
      }
    })
    await this.setState({ selected: list, search: '' })
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
    if (this.Reset !== null && this.FilterReset !== null) {
      await this.FilterReset()
      await this.Reset()
    }
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
        this.setState({ role: response.data.role })
        if (this.props.location && this.props.location.state) {
          if (this.props.location.state.select === 1) {
            if (this.Permision.handlePermision(response.data.role, 'pfd')) {
              this.setState({ select: 1, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else if (this.props.location.state.select === 2) {
            if (this.Permision.handlePermision(response.data.role, 'p_and_id')) {
              this.setState({ select: 2, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else if (this.props.location.state.select === 3) {
            if (
              this.Permision.handlePermision(response.data.role, 'line_list')
            ) {
              this.setState({ select: 3, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else if (this.props.location.state.select === 4) {
            if (
              this.Permision.handlePermision(response.data.role, 'isometric')
            ) {
              this.setState({ select: 4, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else if (this.props.location.state.select === 5) {
            if (
              this.Permision.handlePermision(response.data.role, 'instrument_list')
            ) {
              this.setState({ select: 5, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else if (this.props.location.state.select === 6) {
            if (
              this.Permision.handlePermision(response.data.role, '3d_model')
            ) {
              this.setState({ select: 6, accessTab: true })
            } else {
              this.HasNotRol()
            }
          }
        } else {
          if (this.Permision.handlePermision(response.data.role, 'pfd')) {
            this.setState({ select: 1, accessTab: true })
          } else if (
            this.Permision.handlePermision(response.data.role, 'p_and_id')
          ) {
            this.setState({ select: 2, accessTab: true })
          } else if (
            this.Permision.handlePermision(response.data.role, 'line_list')
          ) {
            this.setState({ select: 3, accessTab: true })
          } else if (
            this.Permision.handlePermision(response.data.role, 'isometric')
          ) {
            this.setState({ select: 4, accessTab: true })
          } else if (
            this.Permision.handlePermision(response.data.role, 'instrument_list')
          ) {
            this.setState({ select: 5, accessTab: true })
          } else if (
            this.Permision.handlePermision(response.data.role, '3d_model')
          ) {
            this.setState({ select: 6, accessTab: true })
          } else {
            this.HasNotRol()
          }
        }
      }
    } else {
      this.setState({ select: 0, accessTab: false })
      if (response.response) {
        Notification.notify(Message.text(response.response.status), 'error')
      }
    }
  }
  ChangeTab = async num => {
    this.setState({ select: num, search: '' })
    this.loadCheck()
  }
  handleShow = () => {
    if (this.state.token) {
      switch (this.state.select) {
        case 1:
          return (
            <PFD
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
            <PAndId
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
        case 3:
          return (
            <LineList
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
              GetDefaultSelected={defaultSelected =>
                this.setState({ defaultSelected })
              }
            />
          )
        case 4:
          return (
            <IsoMetric
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
              GetDefaultSelected={defaultSelected =>
                this.setState({ defaultSelected })
              }
            />
          )
        case 5:
          return (
            <Instrument
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
        case 6:
          return (
            <Model3D
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
        name: 'PFD',
        value: 1,
        access: this.Permision.handlePermision(this.state.role, 'pfd')
      },
      {
        name: 'P&ID',
        value: 2,
        access: this.Permision.handlePermision(this.state.role, 'p_and_id')
      },
      {
        name: 'Line List',
        value: 3,
        access: this.Permision.handlePermision(this.state.role, 'line_list')
      },
      {
        name: 'ISOmetric',
        value: 4,
        access: this.Permision.handlePermision(this.state.role, 'isometric')
      },
      {
        name: 'Instrument List',
        value: 5,
        access: this.Permision.handlePermision(this.state.role, 'instrument_list')
      },
      {
        name: '3D Model',
        value: 6,
        access: this.Permision.handlePermision(this.state.role, '3d_model')
      }
    ]
    return list
  }
  handleShowLink = () => {
    if (this.state.token) {
      switch (this.state.select) {
        case 1:
          return {
            link: '/create-PFD',
            access: 'pfd_create',
            update: 'pfd_update',
            linkUpload: 'pfd/create'
          }
        case 2:
          return {
            link: '/create-PAndID',
            access: 'p&id_create',
            update: 'p&id_update',
            linkUpload: 'technicalArchive/PAndId/create'
          }
        case 3:
          return {
            link: '/create-linelist',
            access: 'line_list_create',
            update: 'line_list_update',
            linkUpload: 'technicalArchive/lineList/create'
          }
        case 4:
          return {
            link: '/create-IsoMetric',
            access: 'isometric_create',
            update: 'isometric_update',
            linkUpload: 'isometrics/create'
          }
        case 5:
          return {
            link: '/create-instrument',
            access: 'instrument_list_create',
            update: 'instrument_list_update',
            linkUpload: 'technicalArchive/instrumentList/create'
          }
        case 6:
          return {
            link: '/create-3DModel',
            access: '3d_model_create',
            update: '3d_model_update'
          }
        default:
          return null
      }
    }
  }
  handleNameRole = () => {
    const role = this.state.role
    if (role['pfd'] || role === 'all') {
      return 'pfd'
    } else if (role['p_and_id'] || role === 'all') {
      return 'p_and_id'
    } else if (role['line_list'] || role === 'all') {
      return 'line_list'
    } else if (role['isometric'] || role === 'all') {
      return 'isometric'
    } else if (role['instrument'] || role === 'all') {
      return 'instrument'
    } else if (role['3d_model'] || role === 'all') {
      return '3d_model'
    } else return ''
  }
  render () {
    if (!this.state.token) {
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
                  nameRole={this.state.role ? this.handleNameRole() : 'Home'}
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
                                this.state.role,
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
                                this.state.role,
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
                                            ? !this.state.upload
                                            : false
                                        })
                                      }
                                    >
                                      <SystemUpdateAltIcon />
                                      <span>بروز رسانی</span>
                                    </span>
                                  </div>
                                  {this.state.upload &&
                                    this.handleShowLink().linkUpload && (
                                      <UploadInformation
                                        linkUpload={
                                          this.handleShowLink().linkUpload
                                        }
                                        {...this}
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
                    <div className='tab-form ltr'>
                      <div className='col-xl-11 col-lg-11 col-12 row m-0 justify-content-start ltr'>
                        {this.state.accessTab &&
                          this.handleShowTab().map(
                            (tab, index) =>
                              tab.access && (
                                <div
                                  className={`col-xl col-lg col mr-0 pr-3 pl-0`}
                                  onClick={() => this.ChangeTab(tab.value)}
                                  key={index}
                                >
                                  <div
                                    className={`item-tab ltr mr-0 w-100 p-0 col-12 ${
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
