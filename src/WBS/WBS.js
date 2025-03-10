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
// import DetailedEngineering from './DetailedEngineering'
import WorkFailureStructure from './WorkFailureStructure'
import Permision from '../permision/permision'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import PurchasePackages from './PurchasePackages'
import AttachedDocumentsPurchasePackages from './AttachedDocumentsPurchasePackages'
import ListEngineeringDocuments from './ListEngineeringDocuments'
import UploadInformation from '../Customization/UploadInformation'
import CounterTab from '../Customization/CounterTab'
// import HandleCheckText from '../handleCheckText'
import SearchTable from '../table/SearchTable'
import VirtualReality from './VirtualReality'
import ProjectIdentify from './ProjectIdentify'
export default class WBS extends Component {
  constructor (props) {
    super(props)
    // handleCheckText = HandleCheckText.handleCheckText
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
    document.title = `${StaticData.Title} - آرشیو فنی شناسنامه`
    document.addEventListener('mousedown', this.handleClickOutside)
    setTimeout(() => {
      this.loadCheck()
    }, 100)
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
  getRole = (response, status) => {
    setTimeout(() => {
      this.loadCheck()
    }, 100)
    if (status === 'response') {
      const location = this.props.location || {}
      const state_location = location.state
      const { handlePermision } = this.Permision
      if (response.status === 200) {
        const role = response.data.role
        this.setState({ role: role })
        if (location && state_location) {
          if (state_location.select === 1) {
            if (handlePermision(role, 'equipment_list')) {
              this.setState({ select: 1, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else if (state_location.select === 2) {
            if (handlePermision(role, 'engineering_document_list')) {
              this.setState({ select: 2, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else if (state_location.select === 3) {
            if (handlePermision(role, 'purchase_package')) {
              this.setState({ select: 3, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else if (state_location.select === 4) {
            if (handlePermision(role, 'purchase_attachment_package')) {
              this.setState({ select: 4, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else if (state_location.select === 5) {
            if (handlePermision(role, 'project_identify')) {
              this.setState({ select: 5, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else if (state_location.select === 6) {
            if (handlePermision(role, 'virtual_reality')) {
              this.setState({ select: 6, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else {
            this.HasNotRol()
          }
        } else {
          if (handlePermision(role, 'equipment_list')) {
            this.setState({ select: 1, accessTab: true })
          } else if (handlePermision(role, 'engineering_document_list')) {
            this.setState({ select: 2, accessTab: true })
          } else if (handlePermision(role, 'purchase_package')) {
            this.setState({ select: 3, accessTab: true })
          } else if (handlePermision(role, 'purchase_attachment_package')) {
            this.setState({ select: 4, accessTab: true })
          } else if (handlePermision(role, 'project_identify')) {
            this.setState({ select: 5, accessTab: true })
          } else if (handlePermision(role, 'virtual_reality')) {
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
  HasNotRol = () => {
    this.setState({ select: 0, accessTab: false, _404: true })
  }
  handleShow = () => {
    if (this.state.token) {
      switch (this.state.select) {
        case 1:
          return (
            <WorkFailureStructure
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
            <ListEngineeringDocuments
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
            <PurchasePackages
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

        case 4:
          return (
            <AttachedDocumentsPurchasePackages
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
        case 5:
          return (
            <ProjectIdentify
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
            <VirtualReality
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
    const { handlePermision } = this.Permision
    const { role } = this.state
    let list = [
      {
        name: 'لیست تجهیزات',
        value: 1,
        access: handlePermision(role, 'equipment_list')
      },
      {
        name: 'لیست مدارک مهندسی',
        value: 2,
        access: handlePermision(role, 'engineering_document_list')
      },
      {
        name: 'لیست بسته‌های خرید',
        value: 3,
        access: handlePermision(role, 'purchase_package')
      },
      {
        name: 'لیست مدارک پیوست بسته‌های خرید',
        value: 4,
        access: handlePermision(role, 'purchase_attachment_package')
      },
      {
        name: 'شناسنامه پروژه',
        value: 5,
        access: handlePermision(role, 'project_identify')
      },
      {
        name: 'واقعیت مجازی',
        value: 6,
        access: handlePermision(role, 'virtual_reality'),
        linkUpload: ''
      }
    ]
    return list
  }
  ChangeTab = num => {
    this.setState({ select: num, search: '' })
    this.loadCheck()
  }
  handleShowLink = () => {
    const { token, select, role } = this.state
    const { handlePermision } = this.Permision
    if (token) {
      switch (select) {
        case 1:
          return {
            create: '/create-work-failure-structure',
            access_create: handlePermision(role, 'equipment_list_create'),
            access_update: handlePermision(role, 'equipment_list_update')
          }
        case 2:
          return {
            create: '/create-engineering-document',
            access_create: handlePermision(
              role,
              'engineering_document_list_create'
            ),
            access_update: handlePermision(
              role,
              'engineering_document_list_update'
            )
          }
        case 3:
          return {
            create: '/create-engineering-documents',
            access_create: handlePermision(role, 'purchase_package_create'),
            access_update: handlePermision(role, 'purchase_package_update')
          }
        case 4:
          return {
            create: '/create-attached-purchase',
            access_create: handlePermision(
              role,
              'purchase_attachment_package_create'
            ),
            access_update: handlePermision(
              role,
              'purchase_attachment_package_update'
            )
          }
        case 5:
          return {
            create: '/project-identify-create',
            access_create: handlePermision(role, 'project_identify_create'),
            access_update: handlePermision(role, 'project_identify_update')
          }
        case 6:
          return {
            linkUpload: 'virtual_reality/create',
            access_create: handlePermision(role, 'virtual_reality_create'),
            access_update: handlePermision(role, 'virtual_reality_update')
          }
        default:
          return {}
      }
    }
  }
  render () {
    const { token, upload, _close, accessTab, role, select, open } = this.state
    const { create, linkUpload, access_create, access_update } =
      this.handleShowLink()
    const { handlePermision } = this.Permision
    const list_tab = this.handleShowTab() || []
    if (!token) {
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
                  _close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'
                } dashboard`}
              >
                <Menu
                  nameRole='wbs'
                  getRole={this.getRole}
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 header-index pr-0 pl-0'>
                      <div className='row m-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                          <div className='icon-header'>
                            <div className='icon'>
                              {create && access_create ? (
                                <a href={create}>
                                  <AddCircleIcon />
                                  <span>ایجاد کاربرگ</span>
                                </a>
                              ) : (
                                <span className='item disabled'>
                                  <AddCircleIcon />
                                  <span>ایجاد کاربرگ</span>
                                </span>
                              )}
                            </div>
                            {linkUpload && access_update && (
                              <React.Fragment>
                                <div className='icon'>
                                  <span
                                    className='item'
                                    onClick={() =>
                                      this.setState({ upload: !upload })
                                    }
                                  >
                                    <SystemUpdateAltIcon />
                                    <span>بروز رسانی</span>
                                  </span>
                                </div>
                                {upload && (
                                  <UploadInformation
                                    {...this}
                                    handleState={(name, value) =>
                                      this.setState({ [name]: value })
                                    }
                                    linkUpload={linkUpload}
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
                      <div className='col-xl-12 col-lg-12 col-12 row m-0 justify-content-start rtl'>
                        {accessTab &&
                          handlePermision(role, 'transmittal_complete') &&
                          list_tab.map(
                            (tab, index) =>
                              tab.access && (
                                <div
                                  className={`col-xl col mr-0 pr-3 pl-0`}
                                  onClick={() => this.ChangeTab(tab.value)}
                                  key={index}
                                >
                                  <div
                                    className={`item-tab rtl mr-0 w-100 p-0 col-12 ${
                                      select === tab.value
                                        ? 'active IranSans_Bold'
                                        : ''
                                    }`}
                                  >
                                    <span>
                                      <label
                                        className={`${
                                          select === tab.value
                                            ? 'IranSans_Bold'
                                            : ''
                                        }`}
                                      >
                                        <CounterTab
                                          key={index}
                                          tafazol={
                                            list_tab.filter(
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
