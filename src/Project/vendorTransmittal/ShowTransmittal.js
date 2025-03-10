import React, { Component } from 'react'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import StaticData from '../../staticData'
import TransmittalDisabled from './TransmittalDisabled'
import CommnetSheet from './CommentSheet'
import axios from 'axios'
import Permision from '../../permision/permision'
import ReplaySheet from './ReplaySheet'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import PrintIcon from '@material-ui/icons/Print'
import CounterTab from '../../Customization/CounterTab'

export default class ShowTransmittal extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      select: 1,
      redirect: false,
      id: '',
      CheckVendor: true,
      accessTab: false,
      role: null
    }
  }
  componentDidMount () {
    // if (this.props.location.state) {
    //     if (this.props.location.state.status) {
    //         this.setState({ select: this.props.location.state.status })
    //     }
    // }
    document.title = `${StaticData.Title} -  مشاهده فرم ترنسمیتال`
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    if (id) {
      this.setState({ id: id })
      this.fetchData(id)
    }
  }
  fetchData = id => {
    axios
      .get(`${StaticData.domainIp}/vendorTransmittal/get/${id}`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(response => {
        this.setState({ CheckVendor: response.data.role === 'vendor' })
        if (response.status === 200) {
          let state = response.data.content
          state['roleName'] =
            response.data.role === 'vendor' ? 'vendor' : 'user'
          state['role'] = response.data.role
          this.setState(state)
          if (this.props.location && this.props.location.state) {
            if (this.props.location.state.status === 1) {
              if (
                this.Permision.handlePermision(
                  response.data.role,
                  'builders_transmittal',
                  true
                )
              ) {
                this.setState({ select: 1, accessTab: true })
              } else {
                this.setState({ select: 0, accessTab: false, _404: true })
              }
            } else if (this.props.location.state.status === 2) {
              if (
                this.Permision.handlePermision(
                  response.data.role,
                  'vpis_comment_sheet',
                  true
                )
              ) {
                this.setState({ select: 2, accessTab: true })
              } else {
                this.setState({ select: 0, accessTab: false, _404: true })
              }
            } else if (this.props.location.state.status === 3) {
              if (
                this.Permision.handlePermision(
                  response.data.role,
                  'vpis_reply_sheet',
                  true
                )
              ) {
                this.setState({ select: 3, accessTab: true })
              } else {
                this.setState({ select: 0, accessTab: false, _404: true })
              }
            }
          } else {
            if (
              this.Permision.handlePermision(
                response.data.role,
                'builders_transmittal',
                true
              )
            ) {
              this.setState({ select: 1, accessTab: true })
            } else if (
              this.Permision.handlePermision(
                response.data.role,
                'vpis_comment_sheet',
                true
              )
            ) {
              this.setState({ select: 2, accessTab: true })
            } else if (
              this.Permision.handlePermision(
                response.data.role,
                'vpis_reply_sheet',
                true
              )
            ) {
              this.setState({ select: 3, accessTab: true })
            } else {
              this.setState({ select: 0, accessTab: false, _404: true })
            }
          }
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
          if (err.response.status === 404) {
            this.setState({ back: true })
          }
        }
      })
  }
  handleShow = () => {
    switch (this.state.select) {
      case 1:
        if (
          this.Permision.handlePermision(
            this.state.role,
            'builders_transmittal',
            true
          )
        ) {
          return (
            <TransmittalDisabled
              {...this.state}
              changeRedirect={e => this.setState({ redirect: e })}
              CheckVendor={this.state.CheckVendor}
            />
          )
        } else return ''
      case 2:
        if (
          this.Permision.handlePermision(
            this.state.role,
            'vpis_comment_sheet',
            true
          )
        ) {
          return (
            <CommnetSheet
              {...this.state.commentSheet}
              id={this.state.id}
              CheckVendor={this.state.CheckVendor}
              handleBack={e => this.setState({ back: e })}
              changeRedirect={e => this.setState({ redirect: e })}
              role={this.state.role}
            />
          )
        } else return ''
      case 3:
        if (
          this.Permision.handlePermision(
            this.state.role,
            'vpis_reply_sheet',
            true
          )
        ) {
          return (
            <ReplaySheet
              id={this.state.id}
              handleBack={e => this.setState({ back: e })}
              role={this.state.role}
            />
          )
        } else return ''
    }
  }
  handleShowTab = () => {
    let listTab = [
      {
        name: 'Transmittal',
        value: 1,
        access: this.Permision.handlePermision(
          this.state.role,
          'builders_transmittal',
          true
        )
      },
      {
        name: 'Comment Sheet',
        value: 2,
        access: this.Permision.handlePermision(
          this.state.role,
          'vpis_comment_sheet',
          true
        )
      },
      {
        name: 'Reply Sheet',
        value: 3,
        access: this.Permision.handlePermision(
          this.state.role,
          'vpis_reply_sheet',
          true
        )
      }
    ]
    return listTab
  }
  ChangeTab = num => {
    this.setState({ select: num, search: '' })
    // this.loadCheck()
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      if (this.state.redirect) {
        return <Redirect to={`/purchase-engineering`} />
      } else {
        if (this.state.back) {
          return <Redirect to='/404' />
        } else
          return (
            <div className='main'>
              <div className='col-12 p-0'>
                <div className='row m-0'>
                  <Sidebar
                    handleState={(name, value) =>
                      this.setState({ [name]: value })
                    }
                  />
                  <div
                    className={`${
                      this.state._close
                        ? 'mainSideClose'
                        : 'col-xl-10 col-lg-10 p-0'
                    } dashboard`}
                  >
                    <Menu
                      nameRole='builders_transmittal'
                      vendor={true}
                      nameUrl={this.props.nameUrl}
                    />
                    <div className='w-100 row m-0 main-box-dashboard'>
                      <div className='boxes-dashboard row m-0 p-0'>
                        <div className='main-form'>
                          <div className='title-from'>
                            <h2>انتقال سند - Document Transmittal</h2>
                          </div>
                          <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                            {this.state.status === '1' ||
                            this.state.status === 1 ? (
                              <div className='tab-form ltr'>
                                <div className='col-xl-11 col-lg-11 col-12 row m-0 justify-content-start'>
                                  {this.state.accessTab &&
                                    this.handleShowTab().map(
                                      (tab, index) =>
                                        tab.access && (
                                          <div
                                            className={`item-tab ltr col-xl-4 ${
                                              this.state.select === tab.value
                                                ? 'active IranSans_Bold'
                                                : ''
                                            }`}
                                            onClick={() =>
                                              this.ChangeTab(tab.value)
                                            }
                                            key={index}
                                          >
                                            <span>
                                              <label
                                                className={`${
                                                  this.state.select ===
                                                  tab.value
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
                                        )
                                    )}
                                </div>
                              </div>
                            ) : this.state.status === '0' ||
                              this.state.status === 0 ? (
                              <div className='col-12'>
                                <div className='message-error'>
                                  <label className='strong'>
                                    ترنسمیتال به دلیل زیر رد شد :{' '}
                                  </label>
                                  <p className='m-0'>{this.state.message}</p>
                                </div>
                              </div>
                            ) : (
                              ''
                            )}
                            {this.handleShow()}
                            {this.state.select === 1 ? (
                              <div
                                className={`col-12 mt-3 mb-3 main-print ${
                                  this.state.status === '1' ||
                                  this.state.status === 1
                                    ? ''
                                    : 'disabled'
                                }`}
                              >
                                {(this.state.status === '1' ||
                                  this.state.status === 1) &&
                                this.Permision.handlePermision(
                                  this.state.role,
                                  'builders_transmittal',
                                  true
                                ) ? (
                                  <a
                                    href={`${StaticData.domainIp}/vendorTransmittal/print/${this.state.id}`}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='print-link'
                                  >
                                    <PrintIcon />
                                    چاپ
                                  </a>
                                ) : (
                                  <span className='print-link'>
                                    <PrintIcon />
                                    چاپ
                                  </span>
                                )}
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
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
}
