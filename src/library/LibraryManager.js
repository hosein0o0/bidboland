import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect } from 'react-router-dom'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
// import axios from 'axios'
// import Notification from '../notification/notification'
// import Message from '../notification/Message'
// import Attention from '../layout/Attention'
// import DashboardRampco from './rampco'
// import DashboardBidBoland from './bidboland'
// import DashboardPPC from './ppc'
import Permision from '../permision/permision'
import ListManager from './ListManeger'
export default class LibraryManager extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      number: null,
      welcome: false,
      attention: true,
      role: null,
      vendor: false,
      projectName: ''
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - مدیریت کتابخانه`
    if (this.state.token) {
      if (Cookies.get('dontShow')) {
        this.setState({ attention: false })
      }
      this.fetchData()
    }
  }
  fetchData = () => {
    // axios
    //   .get(`${StaticData.domainIp}/user/getDetail`, {
    //     headers: {
    //       Authorization: `Bearer ${this.state.token}`
    //     }
    //   })
    //   .then(response => {
    //     if (response.status === 200) {
    //       this.setState({
    //         role: response.data.role,
    //         projectName: response.data.userDetail.project,
    //         welcome: response.data.content
    //           ? response.data.content.welcome
    //           : false
    //       })
    //     } else {
    //       Notification.notify(Message.text(response.status), 'error')
    //     }
    //   })
    //   .catch(err => {
    //     if (err.response) {
    //       Notification.notify(Message.text(err.response.status), 'error')
    //     }
    //   })
  }
  // handleCloseAttention = (close, dontShow) => {
  //     this.setState({ attention: close })
  //     if (dontShow) {
  //         Cookies.set('dontShow', true, { expires: 7 })
  //     }
  // }
  handleCheckRole = list => {
    let i = 0
    let check = false
    if (list) {
      while (i < list.length) {
        check = this.Permision.handlePermision(this.state.role, list[i])
        if (check) {
          break
        }
        i++
      }
    }
    return check
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
                resetStatus={true}
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
                  homeVendor={true}
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0'>
                    <ListManager
                      handleCheckRole={this.handleCheckRole}
                      role={this.state.role}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
}
