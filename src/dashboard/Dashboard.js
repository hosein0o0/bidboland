import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect } from 'react-router-dom'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
import axios from 'axios'
import WelCome from './wellcome'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import Attention from '../layout/Attention'
import DashboardRampco from './rampco'
import DashboardBidBoland from './bidboland'
import DashboardPPC from './ppc'
import Permision from '../permision/permision'
import DashboardPars from './pars'
export default class Dashboard extends Component {
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
    document.title = `${StaticData.Title} - داشبورد`
    // Cookies.remove('_dontShow__')
    if (this.state.token) {
      if (Cookies.get('_dontShow__')) {
        this.setState({ attention: false })
      }
      this.fetchData()
    }
  }
  fetchData = () => {
    const url = `${StaticData.domainIp}/user/getDetail`
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            role: response.data.role,
            projectName: response.data.userDetail.project,
            welcome: response.data.content
              ? response.data.content.welcome
              : false
          })
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  handleCloseAttention = (close, _dontShow__) => {
    this.setState({ attention: close })
    if (_dontShow__) {
      Cookies.set('_dontShow__', true, { expires: 7 })
    }
  }
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
  handleShow = () => {
    switch (StaticData.ProjectName) {
      case 'BIDBOLAND':
        if (this.state.projectName === 'EDMS') {
          return (
            <DashboardBidBoland
              handleCheckRole={this.handleCheckRole}
              role={this.state.role}
            />
          )
        } else if (this.state.projectName === 'PPC') {
          return (
            <DashboardPPC
              role={this.state.role}
              handleCheckRole={this.handleCheckRole}
            />
          )
        }
        break
      case 'RAMPCO':
        return <DashboardRampco role={this.state.role} />
      case 'Pars':
        return (
          <DashboardPars
            handleCheckRole={this.handleCheckRole}
            role={this.state.role}
          />
        )
      // break;
      default:
        // return false
        break
    }
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.role === 'vendor') {
      return <Redirect to='/purchase-engineering' />
    } else
      return (
        <div className='main'>
          <div className='col-12 p-0'>
            <div className='row m-0'>
              {this.state.attention && (
                <Attention close={this.handleCloseAttention} />
              )}
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
                  <div className='boxes-dashboard m-0'>{this.handleShow()}</div>
                </div>
              </div>
            </div>
          </div>
          {this.state.welcome ? (
            <WelCome
              close={e => this.setState({ welcome: e })}
              projectName={this.state.projectName}
            />
          ) : (
            ''
          )}
        </div>
      )
  }
}
