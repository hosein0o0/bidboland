import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect, Link } from 'react-router-dom'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'
import RefreshIcon from '@material-ui/icons/Refresh'
// import SearchIcon from '@material-ui/icons/Search';
import ContentsProceedings from './ContentsProceedings'
import ItemsProceedings from './ItemsProceedings'
import SettingsIcon from '@material-ui/icons/Settings'
import Customization from '../Customization/customization'
import UploadInformation from '../Customization/UploadInformation'
import SearchTable from '../table/SearchTable'
export default class IndexMetting extends Component {
  constructor (props) {
    super(props)
    this.Search = null
    this.FilterReset = null
    this.state = {
      token: Cookies.get('token'),
      select: 1,
      search: '',
      selected: [],
      header: [],
      open: false
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - مدیریت جلسات`
    document.addEventListener('mousedown', this.handleClickOutside)
    this.loadCheck()
  }
  loadCheck = () => {
    setTimeout(async () => {
      this.state.header.forEach(head => {
        this.setState({
          [`_header_${head.name}`]: true,
          selected: [...this.state.selected, head.name]
        })
      })
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
      this.loadCheck()
      this.FilterReset()
      this.Reset()
    }
  }
  handleShow = () => {
    if (this.state.select === 1) {
      return (
        <ContentsProceedings
          GetFunction={e => (this.Search = e)}
          getHeader={e => this.setState({ header: e })}
          selected={this.state.selected}
          resetSearch={() => this.setState({ search: '' })}
          getReset={e => (this.Reset = e)}
          getRole={(e, name) =>
            this.setState({ role: e, nameRole: name, disabledCreate: false })
          }
          FilterReset={remove => (this.FilterReset = remove)}
        />
      )
    } else if (this.state.select === 2) {
      return (
        <ItemsProceedings
          GetFunction={e => (this.Search = e)}
          getHeader={e => this.setState({ header: e })}
          selected={this.state.selected}
          resetSearch={() => this.setState({ search: '' })}
          getReset={e => (this.Reset = e)}
          getRole={(e, name) =>
            this.setState({ role: e, nameRole: name, disabledCreate: false })
          }
          FilterReset={remove => (this.FilterReset = remove)}
        />
      )
    }
  }
  render () {
    if (this.state.token === undefined) {
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
                <Menu nameRole='Home' nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 header-index pr-0 pl-0'>
                      <div className='row m-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                          <div className='icon-header'>
                            <div className='icon'>
                              <Link to='/create-meeting'>
                                <AddCircleIcon />
                                <span>ایجاد کاربرگ</span>
                              </Link>
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
                            {this.state.upload && (
                              <UploadInformation
                                {...this}
                                handleState={(name, value) =>
                                  this.setState({ [name]: value })
                                }
                              />
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
                        <div
                          className={`item-tab col-xl-3 rtl ${
                            this.state.select === 1
                              ? 'active IranSans_Bold'
                              : ''
                          }`}
                          onClick={() => {
                            this.setState({ select: 1 })
                            this.loadCheck()
                          }}
                        >
                          <span>
                            <label
                              className={`${
                                this.state.select === 1 ? 'IranSans_Bold' : ''
                              }`}
                            >
                              1.
                            </label>
                            فهرست صورت جلسات
                          </span>
                        </div>
                        <div
                          className={`item-tab col-xl-3 rtl ${
                            this.state.select === 2
                              ? 'active IranSans_Bold'
                              : ''
                          }`}
                          onClick={() => {
                            this.setState({ select: 2 })
                            this.loadCheck()
                          }}
                        >
                          <span>
                            <label
                              className={`${
                                this.state.select === 2 ? 'IranSans_Bold' : ''
                              }`}
                            >
                              2.
                            </label>
                            آیتم های صورت جلسات
                          </span>
                        </div>
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
