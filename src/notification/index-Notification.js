import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect } from 'react-router-dom'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
// import axios from 'axios'
import Permision from '../permision/permision'
import Message from '../notification/Message'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'
import RefreshIcon from '@material-ui/icons/Refresh'
import SettingsIcon from '@material-ui/icons/Settings'
import Customization from '../Customization/customization'
// import SearchIcon from '@material-ui/icons/Search';
// import TableRFQ from './TableRFQ'
import TableNotification from './tableNotification'
import SearchTable from '../table/SearchTable'
export default class IndexNotification extends Component {
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
      search: '',
      role: null
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - اعلانات`
    document.addEventListener('mousedown', this.handleClickOutside)
    setTimeout(() => {
      this.loadCehck()
    }, 50)
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
  loadCehck = () => {
    this.state.header.forEach(head => {
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
                            {this.Permision.handlePermision(
                              this.state.role,
                              ''
                            ) ? (
                              <div className='icon'>
                                <a href='/send-message'>
                                  <AddCircleIcon />
                                  <span>ایجاد کاربرگ</span>
                                </a>
                              </div>
                            ) : (
                              ''
                            )}
                            <div className='icon disabled'>
                              <span className='item disabled'>
                                {/* <Link to='#'> */}
                                <SystemUpdateAltIcon />
                                <span>بروز رسانی</span>
                              </span>
                              {/* </Link> */}
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
                    <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-start'>
                      <TableNotification
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
