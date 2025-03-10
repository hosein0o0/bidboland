import React, { Component } from 'react'
// import { a } from 'react-router-dom'
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import NotificationContainer from '../notification/NotificationCotainer'
// import axios from 'axios'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import ItemSide from './itemSide.js'
import Permision from '../permision/permision'
import SideOpen from './SideOpen'
import SideClose from './SideClose'
// import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
export default class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this._This = null
    this.state = {
      token: Cookies.get('token'),
      role: null,
      data: [],
      checkVendor: true,
      vendor: false,
      close: true
    }
  }
  async componentDidMount () {
    await this.getRole()
    if (this.props.handleState) {
      const checkSide = (await Cookies.get('side')) === 'true' ? true : false
      await this.props.handleState('_close', checkSide)
      await this.setState({
        close: checkSide
      })
    }
  }
  getRole = () => {
    this.Permision.GetRole(this, 'sidebar')
  }
  handleResponse = async (response, status) => {
    if (status === 'response') {
      if (response.status === 200) {
        this.setState({
          role: response.data.role,
          vendor: response.data.role === 'vendor'
        })
        if (response.data.role === 'vendor') {
          this.setState({ data: ItemSide.VendorItem, checkVendor: true })
        } else {
          if (
            StaticData.ProjectName === 'RAMPCO' ||
            StaticData.ProjectName === 'Pars'
          ) {
            if (ItemSide.defaultItem[StaticData.ProjectName]) {
              await this.setState({
                data: ItemSide.defaultItem[StaticData.ProjectName],
                checkVendor: false
              })
            }
          } else if (StaticData.ProjectName === 'BIDBOLAND') {
            if (response.data.userDetail.project === 'EDMS') {
              if (ItemSide.defaultItem['BIDBOLAND']) {
                await this.setState({
                  data: ItemSide.defaultItem['BIDBOLAND'],
                  checkVendor: false
                })
              }
            } else if (response.data.userDetail.project === 'PPC') {
              let list = []
              if (response.data.content.indexMaker) {
                response.data.content.indexMaker.forEach(data => {
                  data['path'] = `dynamic-index-${data.id}`
                  list.push(data)
                })
              }
              if (ItemSide.defaultItem['PPC']) {
                let _list = ItemSide.defaultItem['PPC']
                let obj = _list[1]
                obj.items = list
                await this.setState({ data: _list, checkVendor: false })
              }
            }
          }
          if (this._This) {
            if (this._This.Check) {
              await this._This.Check()
            }
          }
        }
      } else {
        Notification.notify(Message.text(response.status), 'error')
      }
    } else if (status === 'catch') {
      setTimeout(() => {
        // this.setState({ loading: false, _404: true })
      }, 1000)
      if (response.response) {
        Notification.notify(Message.text(response.response.status), 'error')
      }
    }
  }

  handleSupport = () => {
    let crsip = document.querySelector('.crisp-client')
    if (document.querySelector('.cc-unoo') && crsip) {
      crsip.style.display = 'block'
      document.querySelector('.cc-unoo').click()
    }
  }
  handleRole = data => {
    if (!this.state.vendor) {
      let i = 0
      let check = false
      while (i < data.nameRole.length) {
        check = this.Permision.handlePermision(
          this.state.role,
          data.nameRole[i]
        )
        if (check) {
          break
        }
        i++
      }
      return check
    }
  }
  handleClose = async () => {
    if (this.props.handleState) {
      await this.setState({ close: !this.state.close })
      await Cookies.set('side', this.state.close)
      await this.props.handleState('_close', this.state.close)
    }
  }
  render () {
    return (
      <div
        className={`pr-0 pl-0 main-side ${
          this.state.close ? 'sideClose' : 'col-xl-2 col-lg-2'
        }`}
      >
        <NotificationContainer />
        <div className={`sidebar ${this.state.close ? '_close' : ''}`}>
          <div className={`logo-sidebar ${this.state.close ? '_close' : ''}`}>
            {!this.state.close && (
              <div className='main-logo'>
                <a href='/'>
                  <img className='logo' src='/img/logo-white.svg' alt='logo' />
                </a>
              </div>
            )}
            <div
              className={`dubble-arrow pointer ${
                this.state.close ? 'active' : ''
              }`}
              onClick={this.handleClose}
            >
              <img src='/img/dubble-right-Arrow.svg' alt='logo' />
            </div>
          </div>
          {this.state.close ? (
            <SideClose {...this} />
          ) : (
            <SideOpen {...this} getThis={_This => (this._This = _This)} />
          )}
          {/* <div className='_support' onClick={this.handleSupport}>
                            <span className='row m-0 w-100 align-items-center'>
                                <span className='col p-0 d-flex align-items-center'>
                                    <HelpRoundedIcon className='ml-3' />
                                    پیشتیبانی
                                </span>
                                <ArrowBackIosIcon className={`left-icon`} />
                            </span>
                        </div> */}
        </div>
      </div>
    )
  }
}
