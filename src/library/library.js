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
// import SearchIcon from '@material-ui/icons/Search';
// import EditIcon from '@material-ui/icons/Edit';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
// import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
// import Permision from '../permision/permision'
// import Notification from '../notification/notification'
// import Message from '../notification/Message'
// import NotFoundTable from '../table/notFound'
// import Loading from '../layout/loading'
import SearchTable from '../table/SearchTable'
import UploadInformation from '../Customization/UploadInformation'
export default class Library extends Component {
  constructor (props) {
    super(props)
    // this.Permision = new Permision(this)
    this.Search = null
    this.state = {
      token: Cookies.get('token'),
      data: [{}]
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - کتابخانه دارا`
  }
  // handleSearch = (e) => {
  //     if (this.Search !== null) {
  //         this.Search(e.target.value.trim())
  //     }
  // }
  render () {
    // const {handlePermision} = this.Permision
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
                <Menu nameRole='standard_bank' nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 header-index pr-0 pl-0'>
                      <div className='row m-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                          <div className='icon-header'>
                            <div className='icon'>
                              <Link to='/Create-Transmital'>
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
                    <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-end'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
}
