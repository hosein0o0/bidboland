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
import FinalEngineeringManual from './FinalEngineeringManual'
import FinalEquipmentManual from './FinalEquipmentManual/FinalEquipmentManual'
import Permision from '../permision/permision'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import BuildFinalBooklet from './BuildFinalBooklet'
import UploadInformation from '../Customization/UploadInformation'
import CounterTab from '../Customization/CounterTab'
import SearchTable from '../table/SearchTable'
export default class TechnicalArchiveFinalBook extends Component {
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
    document.title = `${StaticData.Title} - آرشیو فنی کتابچه نهایی`
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
  ChangeTab = num => {
    this.setState({ select: num, search: '' })
    this.loadCheck()
  }
  HasNotRol = () => {
    this.setState({ select: 0, accessTab: false, _404: true })
  }
  getRole = (response, status) => {
    if (status === 'response') {
      if (response.status === 200) {
        this.setState({ role: response.data.role })
        if (this.props.location && this.props.location.state) {
          if (this.props.location.state.select === 1) {
            if (
              this.Permision.handlePermision(
                response.data.role,
                'engineering_final_data_book'
              )
            ) {
              this.setState({ select: 1, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else if (this.props.location.state.select === 2) {
            if (
              this.Permision.handlePermision(
                response.data.role,
                'equipment_final_data_book'
              )
            ) {
              this.setState({ select: 2, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else if (this.props.location.state.select === 3) {
            if (
              this.Permision.handlePermision(
                response.data.role,
                'construction_final_data_book'
              )
            ) {
              this.setState({ select: 3, accessTab: true })
            } else {
              this.HasNotRol()
            }
          } else {
            this.HasNotRol()
          }
        } else {
          if (
            this.Permision.handlePermision(response.data.role, 'engineering_final_data_book')
          ) {
            this.setState({ select: 1, accessTab: true })
          } else if (
            this.Permision.handlePermision(
              response.data.role,
              'equipment_final_data_book'
            )
          ) {
            this.setState({ select: 2, accessTab: true })
          } else if (
            this.Permision.handlePermision(
              response.data.role,
              'construction_final_data_book'
            )
          ) {
            this.setState({ select: 3, accessTab: true })
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
  handleShow = () => {
    if (this.state.token) {
      switch (this.state.select) {
        case 1:
          return (
            <FinalEngineeringManual
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
            <FinalEquipmentManual
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
            <BuildFinalBooklet
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
        name: 'کتابچه نهایی مهندسی',
        value: 1,
        access: this.Permision.handlePermision(
          this.state.role,
          'engineering_final_data_book'
        )
      },
      {
        name: 'کتابچه نهایی تجهیزات (Final Books)',
        value: 2,
        access: this.Permision.handlePermision(
          this.state.role,
          'equipment_final_data_book'
        )
      },
      {
        name: 'کتابچه نهایی ساخت (MC Book)',
        value: 3,
        access: this.Permision.handlePermision(
          this.state.role,
          'construction_final_data_book'
        )
      }
    ]
    return list
  }
  handleShowLink = () => {
    if (this.state.token) {
      switch (this.state.select) {
        case 1:
          return {
            link: '/create-final-engineering-manual',
            access: 'engineering_final_data_book_create',
            update: 'engineering_final_data_book_update',
            linkUpload : 'engFinalDataBook/create'
          }
        case 2:
          return {
            link: '/create-final-equipment-manual',
            access: 'equipment_final_data_book_create',
            update: 'equipment_final_data_book_update',
            linkUpload: 'equipmentFinalDataBook/create'
          }
        case 3:
          return {
            link: '/create-build-final-booklet',
            access: 'construction_final_data_book_create',
            update: 'construction_final_data_book_update',
            linkUpload: 'constructionFinalDataBook/create'
          }
        default:
          return null
      }
    }
  }
  handleNameRole = () => {
    const role = this.state.role
    if (role['engineering_final_data_book'] || role === 'all') {
      return 'engineering_final_data_book'
    } else if (role['equipment_final_data_book'] || role === 'all') {
      return 'equipment_final_data_book'
    } else if (role['construction_final_data_book'] || role === 'all') {
      return 'construction_final_data_book'
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
                                  {this.state.upload && (
                                    <UploadInformation
                                      {...this}
                                      handleState={(name, value) =>
                                        this.setState({ [name]: value })
                                      }
                                      linkUpload={
                                        this.handleShowLink().linkUpload
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
                    <div className='tab-form rtl'>
                      <div className='col-xl-11 col-lg-11 col-12 row m-0 justify-content-start rtl'>
                        {this.state.accessTab &&
                          this.handleShowTab().map(
                            (tab, index) =>
                              tab.access && (
                                <div
                                  className={`col-xl-4 col-lg-4 col-4 mr-0 pr-3 pl-0`}
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
