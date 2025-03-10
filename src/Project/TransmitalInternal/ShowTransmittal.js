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
export default class Transmittal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      select: 1,
      redirect: false,
      id: ''
    }
  }
  componentDidMount () {
    if (this.props.location.state) {
      if (this.props.location.state.status) {
        this.setState({ select: this.props.location.state.status })
      }
    }
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
      .get(`${StaticData.domainIp}/transmittal/get/${id}`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          let permision = new Permision()
          if (
            permision.handlePermision(response.data.role, 'main_transmittal')
          ) {
            this.setState(response.data.content)
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
    if (this.state.select === 1) {
      return (
        <TransmittalDisabled
          {...this.state}
          changeRedirect={e => this.setState({ redirect: e })}
        />
      )
    } else if (this.state.select === 2) {
      return (
        <CommnetSheet
          {...this.state.commentSheet}
          id={this.state.id}
          handleBack={e => this.setState({ back: e })}
        />
      )
    } else if (this.state.select === 3) {
      return (
        <ReplaySheet
          id={this.state.id}
          handleBack={e => this.setState({ back: e })}
        />
      )
    }
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      if (this.state.redirect) {
        return <Redirect to='/transmittal' />
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
                    <Menu nameRole='Home' />
                    <div className='w-100 row m-0 main-box-dashboard'>
                      <div className='boxes-dashboard row m-0 p-0'>
                        <div className='main-form'>
                          <div className='title-from'>
                            <h2>انتقال سند - Document Transmittal</h2>
                          </div>
                          <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                            {this.state.status === '1' ||
                            this.state.status === 1 ? (
                              <div className='tab-form'>
                                <div className='col-xl-11 col-lg-11 col-12 row m-0 justify-content-end'>
                                  <div
                                    className={`item-tab ${
                                      this.state.select === 1
                                        ? 'active IranSans_Bold'
                                        : ''
                                    }`}
                                    onClick={() => this.setState({ select: 1 })}
                                  >
                                    <span>
                                      <label
                                        className={`${
                                          this.state.select === 1
                                            ? 'IranSans_Bold'
                                            : ''
                                        }`}
                                      >
                                        1.
                                      </label>
                                      Transmittal
                                    </span>
                                  </div>
                                  <div
                                    className={`item-tab ${
                                      this.state.select === 2
                                        ? 'active IranSans_Bold'
                                        : ''
                                    }`}
                                    onClick={() => this.setState({ select: 2 })}
                                  >
                                    <span>
                                      <label
                                        className={`${
                                          this.state.select === 2
                                            ? 'IranSans_Bold'
                                            : ''
                                        }`}
                                      >
                                        2.
                                      </label>
                                      Comment Sheet
                                    </span>
                                  </div>
                                  <div
                                    className={`item-tab ${
                                      this.state.select === 3
                                        ? 'active IranSans_Bold'
                                        : ''
                                    }`}
                                    onClick={() => this.setState({ select: 3 })}
                                  >
                                    <span>
                                      <label
                                        className={`${
                                          this.state.select === 3
                                            ? 'IranSans_Bold'
                                            : ''
                                        }`}
                                      >
                                        3.
                                      </label>
                                      Reply Sheet
                                    </span>
                                  </div>
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
                                {this.state.status === '1' ||
                                this.state.status === 1 ? (
                                  <a
                                    href={`${StaticData.domainIp}/transmittal/print/${this.state.id}`}
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
