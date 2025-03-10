import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect } from 'react-router-dom'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
import axios from 'axios'
import Permision from '../permision/permision'
import Message from '../notification/Message'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'
import RefreshIcon from '@material-ui/icons/Refresh'
import SettingsIcon from '@material-ui/icons/Settings'
import Customization from '../Customization/customization'
// import SearchIcon from '@material-ui/icons/Search';
import TableDynamicIndex from './TableDynamicIndex'
import UploadInformation from '../Customization/UploadInformation'
import Notification from '../notification/notification'
import GpsFixedIcon from '@material-ui/icons/GpsFixed'
import AdvanceSearchDate from './AdvanceSearchDate'
import CloseIcon from '@material-ui/icons/Close'
import SearchTable from '../table/SearchTable'
export default class DynamicIndex extends Component {
  constructor (props) {
    super(props)
    this.Search = null
    this.Reset = null
    this.FilterReset = null
    this.handleAdvande = null
    this.Fetch = null
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      header: [],
      selected: [],
      open: false,
      search: '',
      role: null,
      excelFileName: '',
      excelFile: '',
      attachmentFileName: '',
      attachmentFile: '',
      loading: '',
      table_id: '',
      upload: false,
      disabled: false,
      openSearch: false,
      startDate: null,
      endDate: null
    }
  }
  async componentDidMount () {
    document.title = `${StaticData.Title} - ایندکس ساز`
    document.addEventListener('mousedown', this.handleClickOutside)
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    await this.setState({ table_id: id })
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  async componentWillReceiveProps (nextProps) {
    this.props = nextProps
    document.addEventListener('mousedown', this.handleClickOutside)
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    await this.setState({ table_id: id })
  }
  // handleSearch = (e) => {
  //     if (this.Search !== null) {
  //         this.setState({ search: e.target.value })
  //         this.Search(e.target.value)
  //     }
  // }
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
  loadCehck = async () => {
    await this.state.header.forEach(head => {
      this.setState({
        [`_header_${head.name}`]: true,
        selected: [...this.state.selected, head.name]
      })
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
    if (status === 'response') {
      if (response.status === 200) {
        this.setState({ role: response.data.role })
      } else {
        Notification.notify(Message.text(response.status), 'error')
      }
    } else {
      if (response.response) {
        Notification.notify(Message.text(response.response.status), 'error')
      }
    }
  }
  handleUpload = async (e, files, names) => {
    if (this.state.table_id) {
      await this.setState({ loading: files })
      setTimeout(async () => {
        await e.preventDefault()
        let _file = await e.target.files[0]
        let reader = await new FileReader()
        await reader.readAsDataURL(_file)
        await this.setState({
          [files]: _file,
          [names]: _file.name,
          loading: ''
        })
      }, 100)
      // this.GetLink(files, e.target.files[i], names, e.target.files.length, i)
    }
  }
  submitUpload = files => {
    if (this.state.table_id) {
      this.setState({ loading: 'submit', disabled: true })
      const file = this.state[files]
      let datareg = new FormData()
      datareg.append('excel', file)
      axios({
        method: 'post',
        url: `${StaticData.domainIp}/dynamicIndex/updateByExcel/${this.state.table_id}`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            Notification.notify(Message.text(921), 'success')
            await this.setState({ upload: false, disabled: false })
            if (this.Fetch) {
              await this.Fetch()
            }
          } else {
            this.setState({ upload: false, disabled: false })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({ loading: '', upload: false, disabled: false })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  ResetAdvande = () => {
    if (this.Fetch) {
      this.setState({
        startDate: null,
        endDate: null
      })
      this.Fetch()
    }
  }
  render () {
    if (!this.state.token) {
      return <Redirect to='/Login' />
    } else {
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
                  nameRole=''
                  getRole={this.getRole}
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 header-index pr-0 pl-0'>
                      <div className='row m-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                          <div className='icon-header'>
                            {/* {this.Permision.handlePermision(this.state.role, '') ?
                                                            <div className='icon'>
                                                                <Link to='#'>
                                                                    <AddCircleIcon />
                                                                    <span>
                                                                        ایجاد کاربرگ
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            : ''} */}
                            <div className='icon disabled'>
                              <span className='item disabled'>
                                <AddCircleIcon />
                                <span>ایجاد کاربرگ</span>
                              </span>
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
                        <div className='col-xl-6 col-lg-6 col-md-4 col-12 p-0 d-flex justify-content-end row mr-0 ml-0 align-items-center'>
                          <div className='MainAdvancedSearch col-xl-6 col-lg-4 col-md-4 col-11 p-0'>
                            {this.state.startDate && this.state.endDate ? (
                              <span className='advancedSearch-selected'>
                                <GpsFixedIcon className='ml-1' />
                                از
                                <span className='mr-1 ml-1'>
                                  {this.state.startDate}
                                </span>
                                تا
                                <span className='mr-1 ml-1'>
                                  {this.state.endDate}
                                </span>
                                <CloseIcon
                                  className='reset_advance'
                                  onClick={this.ResetAdvande}
                                />
                              </span>
                            ) : (
                              <button
                                className='advancedSearch'
                                onClick={() =>
                                  this.setState({
                                    openSearch: !this.state.openSearch
                                  })
                                }
                              >
                                <GpsFixedIcon className='ml-1' />
                                جستجوی پیشرفته
                              </button>
                            )}
                            {this.state.openSearch && (
                              <AdvanceSearchDate
                                {...this}
                                handleState={(name, value) =>
                                  this.setState({ [name]: value })
                                }
                              />
                            )}
                          </div>
                          <SearchTable
                            {...this}
                            handleState={(name, value) =>
                              this.setState({ [name]: value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-start'>
                      <TableDynamicIndex
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
                        handleState={(name, value) =>
                          this.setState({ [name]: value })
                        }
                        loadCehck={this.loadCehck}
                        handleAdvande={e => (this.handleAdvande = e)}
                        getFetch={Fetch => (this.Fetch = Fetch)}
                      />
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
