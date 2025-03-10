import React, { Component } from 'react'
import Sidebar from '../../../../layout/sidebar'
import Menu from '../../../../layout/menu'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import StaticData from '../../../../staticData'
import TransmittalDisabled from './TransmittalDisabled'
import CommnetSheet from './CommentSheet'
import axios from 'axios'
import Permision from '../../../../permision/permision'
import ReplaySheet from './ReplaySheet'
import Notification from '../../../../notification/notification'
import Message from '../../../../notification/Message'
import PrintIcon from '@material-ui/icons/Print'
import CounterTab from '../../../../Customization/CounterTab'

export default class Transmittal extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      select: 1,
      redirect: false,
      id: '',
      back: false,
      role: null,
      accessTab: false,
      _404: false
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} -  مشاهده فرم ترنسمیتال فرعی`
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    if (id) {
      this.setState({ id: id })
      this.fetchData(id)
    }
  }
  fetchData = id => {
    axios
      .get(`${StaticData.domainIp}/internalTransmittal/get/${id}`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          let state = response.data.content
          state['role'] = response.data.role
          this.setState(state)
          if (this.props.location.state && this.props.location.state.status) {
            if (this.props.location.state.status === 1) {
              if (
                this.Permision.handlePermision(
                  response.data.role,
                  'secondary_transmittal'
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
                  'internal_transmittal_comment_sheet'
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
                  'internal_transmittal_reply_sheet'
                )
              ) {
                this.setState({ select: 3, accessTab: true })
              } else {
                this.setState({ select: 0, accessTab: false, _404: true })
              }
            } else {
              this.setState({ select: 0, accessTab: false, _404: true })
            }
          } else {
            if (
              this.Permision.handlePermision(
                response.data.role,
                'secondary_transmittal'
              )
            ) {
              this.setState({ select: 1, accessTab: true })
            } else if (
              this.Permision.handlePermision(
                response.data.role,
                'internal_transmittal_comment_sheet'
              )
            ) {
              this.setState({ select: 2, accessTab: true })
            } else if (
              this.Permision.handlePermision(
                response.data.role,
                'internal_transmittal_reply_sheet'
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
            'secondary_transmittal'
          )
        ) {
          return (
            <TransmittalDisabled
              {...this.state}
              changeRedirect={e => this.setState({ redirect: e })}
            />
          )
        } else return ''
      case 2:
        if (
          this.Permision.handlePermision(
            this.state.role,
            'internal_transmittal_comment_sheet'
          )
        ) {
          return (
            <CommnetSheet
              {...this.state.commentSheet}
              id={this.state.id}
              handleBack={e => this.setState({ back: e })}
              role={this.state.role}
            />
          )
        } else return ''
      case 3:
        if (
          this.Permision.handlePermision(
            this.state.role,
            'internal_transmittal_reply_sheet'
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
      default:
        return ''
    }
  }
  handleShowTab = () => {
    let list = [
      {
        name: 'Transmittal',
        value: 1,
        access: this.Permision.handlePermision(
          this.state.role,
          'secondary_transmittal'
        )
      },
      {
        name: 'Comment Sheet',
        value: 2,
        access: this.Permision.handlePermision(
          this.state.role,
          'internal_transmittal_comment_sheet'
        )
      },
      {
        name: 'Reply Sheet',
        value: 3,
        access: this.Permision.handlePermision(
          this.state.role,
          'internal_transmittal_reply_sheet'
        )
      }
    ]
    return list
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      if (this.state.redirect) {
        return (
          <Redirect
            to={{
              pathname: `/dcc`,
              state: { select: 3 }
            }}
          />
        )
      } else {
        if (this.state._404) {
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
                      nameRole='secondary_transmittal'
                      nameUrl={this.props.nameUrl}
                    />
                    <div className='w-100 row m-0 main-box-dashboard'>
                      <div className='boxes-dashboard row m-0 p-0'>
                        <div className='main-form'>
                          <div className='title-from'>
                            <h2> انتقال سند - Document Transmittal </h2>
                          </div>
                          <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                            {this.state.status === '1' ||
                            this.state.status === 1 ? (
                              <div className='tab-form'>
                                <div className='col-xl-11 col-lg-11 col-12 row m-0 justify-content-start'>
                                  {this.state.accessTab &&
                                    this.Permision.handlePermision(
                                      this.state.role,
                                      'secondary_transmittal'
                                    ) &&
                                    this.handleShowTab().map(
                                      (tab, index) =>
                                        tab.access && (
                                          <div
                                            className={`col-xl-4 col-lg-4 col-4 mr-0 pr-3 pl-0`}
                                            onClick={() =>
                                              this.setState({
                                                select: tab.value
                                              })
                                            }
                                            key={index}
                                          >
                                            <div
                                              className={`item-tab mr-0 w-100 p-0 col-12 ${
                                                this.state.select === tab.value
                                                  ? 'active IranSans_Bold'
                                                  : ''
                                              }`}
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
                                    {' '}
                                    ترنسمیتال به دلیل زیر رد شد :{' '}
                                  </label>
                                  <p className='m-0'>{this.state.message}</p>
                                </div>
                              </div>
                            ) : (
                              ''
                            )}
                            {this.handleShow()}
                            {this.state.select === 1 &&
                            this.Permision.handlePermision(
                              this.state.role,
                              'secondary_transmittal'
                            ) ? (
                              <div
                                className={`col-12 mt-3 mb-3 main-print ${
                                  this.state.status === '1' ||
                                  this.state.status === 1
                                    ? ''
                                    : 'disabled'
                                }`}
                              >
                                {this.state.status === '1' ||
                                this.state.status === 1 ? (
                                  <a
                                    href={`${StaticData.domainIp}/internalTransmittal/print/${this.state.id}`}
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
