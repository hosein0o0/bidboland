import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect, Link } from 'react-router-dom'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
// import axios from 'axios'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'
import RefreshIcon from '@material-ui/icons/Refresh'
import SearchTable from '../table/SearchTable'
import Province from './province'
import City from './city'
import Address from './address'
import UploadInformation from '../Customization/UploadInformation'
export default class SystemManagement extends Component {
  constructor (props) {
    super(props)
    this.Search = null
    this.state = {
      token: Cookies.get('token'),
      select: 1
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - مدیریت سیستم`
  }
  // handleSearch = (e) => {
  //     if (this.Search !== null) {
  //         this.Search(e.target.value.trim())
  //     }
  // }
  handleshow = () => {
    if (this.state.select === 1) {
      return <Province getFunctionSearch={e => (this.Search = e)} />
    } else if (this.state.select === 2) {
      return <City getFunctionSearch={e => (this.Search = e)} />
    } else if (this.state.select === 3) {
      return <Address getFunctionSearch={e => (this.Search = e)} />
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
                              <Link to='#'>
                                <AddCircleIcon />
                                <span>ایجاد مخاطب</span>
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
                              <Link to='#'>
                                <RefreshIcon />
                                <span>حذف فیترها</span>
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
                        <div
                          className={`item-tab col-xl-3 rtl ${
                            this.state.select === 1
                              ? 'active IranSans_Bold'
                              : ''
                          }`}
                          onClick={() => this.setState({ select: 1 })}
                        >
                          <span>
                            <label
                              className={`${
                                this.state.select === 1 ? 'IranSans_Bold' : ''
                              }`}
                            >
                              1.
                            </label>
                            مدیریت استان
                          </span>
                        </div>
                        <div
                          className={`item-tab col-xl-3 rtl ${
                            this.state.select === 2
                              ? 'active IranSans_Bold'
                              : ''
                          }`}
                          onClick={() => this.setState({ select: 2 })}
                        >
                          <span>
                            <label
                              className={`${
                                this.state.select === 2 ? 'IranSans_Bold' : ''
                              }`}
                            >
                              2.
                            </label>
                            مدیریت شهر
                          </span>
                        </div>
                        <div
                          className={`item-tab col-xl-3 rtl ${
                            this.state.select === 3
                              ? 'active IranSans_Bold'
                              : ''
                          }`}
                          onClick={() => this.setState({ select: 3 })}
                        >
                          <span>
                            <label
                              className={`${
                                this.state.select === 3 ? 'IranSans_Bold' : ''
                              }`}
                            >
                              3.
                            </label>
                            مدیریت آدرس
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='w-100 mt-3'>{this.handleshow()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
}
