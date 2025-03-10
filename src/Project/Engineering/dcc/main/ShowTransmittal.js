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
import UndoIcon from '@material-ui/icons/Undo'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import Loading from '../../../../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import CounterTab from '../../../../Customization/CounterTab'
import handleString from '../../../../handleString'
export default class ShowTransmittal extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      select: 1,
      redirect: false,
      id: '',
      role: null,
      accessTab: false,
      _404: false,
      canUndo: false,
      undo: false,
      disabled: false
    }
  }
  componentDidMount () {
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
          let state = response.data.content
          state['role'] = response.data.role
          this.setState(state)
          if (this.props.location.state && this.props.location.state.status) {
            if (this.props.location.state.status === 1) {
              if (
                this.Permision.handlePermision(
                  response.data.role,
                  'main_transmittal'
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
                  'transmittal_comment_sheet_show'
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
                  'transmittal_reply_sheet_show'
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
                'main_transmittal'
              )
            ) {
              this.setState({ select: 1, accessTab: true })
            } else if (
              this.Permision.handlePermision(
                response.data.role,
                'transmittal_comment_sheet_show'
              )
            ) {
              this.setState({ select: 2, accessTab: true })
            } else if (
              this.Permision.handlePermision(
                response.data.role,
                'transmittal_reply_sheet_show'
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
            this.setState({ _404: true })
          }
        }
      })
  }
  handleShow = () => {
    switch (this.state.select) {
      case 1:
        if (
          this.Permision.handlePermision(this.state.role, 'main_transmittal')
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
            'transmittal_comment_sheet_show'
          )
        ) {
          return (
            <CommnetSheet
              {...this.state.commentSheet}
              role={this.state.role}
              id={this.state.id}
              handleBack={e => this.setState({ _404: e })}
            />
          )
        } else return ''
      case 3:
        if (
          this.Permision.handlePermision(
            this.state.role,
            'transmittal_reply_sheet_show'
          )
        ) {
          return (
            <ReplaySheet
              id={this.state.id}
              role={this.state.role}
              handleBack={e => this.setState({ _404: e })}
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
          'main_transmittal'
        )
      },
      {
        name: 'Comment Sheet',
        value: 2,
        access: this.Permision.handlePermision(
          this.state.role,
          'transmittal_comment_sheet_show'
        )
      },
      {
        name: 'Reply Sheet',
        value: 3,
        access: this.Permision.handlePermision(
          this.state.role,
          'transmittal_reply_sheet_show'
        )
      }
    ]
    return list
  }
  handleUndo = async message => {
    if (this.state.id && message.trim() !== '') {
      let datareg = await new FormData()
      await this.setState({ loading: 'submit', disabled: true })
      await datareg.append('transmittal_id', this.state.id)
      await datareg.append('message', message)
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/transmittal/undo`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          await this.setState({ loading: '', undo: false })
          if (response.status === 200) {
            Notification.notify(Message.text(902), 'success')
            setTimeout(async () => {
              await this.setState({ redirect: true })
            }, 5000)
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(async err => {
          await this.setState({ loading: '', undo: false })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
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
              state: { select: 2 }
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
                      nameRole='main_transmittal'
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
                                      'transmittal_complete'
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
                            {this.state.select === 1 && (
                              <div
                                className={`col-12 mt-3 mb-3 main-print ${
                                  this.state.status === '1' ||
                                  this.state.status === 1
                                    ? ''
                                    : 'disabled'
                                }`}
                              >
                                {(this.Permision.handlePermision(
                                  this.state.role,
                                  'main_transmittal'
                                ) &&
                                  this.state.status === '1') ||
                                this.state.status === 1 ? (
                                  <React.Fragment>
                                    <a
                                      href={`${StaticData.domainIp}/transmittal/print/${this.state.id}`}
                                      target='_blank'
                                      rel='noreferrer'
                                      className='print-link'
                                    >
                                      <PrintIcon />
                                      چاپ
                                    </a>
                                    {this.state.canUndo ? (
                                      <span
                                        className='undo pointer mr-2'
                                        onClick={() =>
                                          this.setState({ undo: true })
                                        }
                                      >
                                        <UndoIcon />
                                        بازگشت به وضعیت ویرایش
                                      </span>
                                    ) : (
                                      ''
                                    )}
                                  </React.Fragment>
                                ) : (
                                  <span className='print-link'>
                                    <PrintIcon />
                                    چاپ
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.undo && (
                <Undo
                  close={ev => this.setState({ undo: ev })}
                  handleUndo={this.handleUndo}
                  disabled={this.state.disabled}
                />
              )}
            </div>
          )
      }
    }
  }
}
class Undo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorText: ''
    }
  }
  render () {
    return (
      <div className='backGroundPopup'>
        <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
          <div className='box-wellcome'>
            <div className='main-textarea'>
              <textarea
                onChange={e => this.setState({ errorText: handleString(e.target.value) })}
                placeholder='لطفا دلیل خود را وارد کنید'
                value={handleString(this.state.errorText)}
              ></textarea>
            </div>
            <div className='buttons-wellcome justify-content-center'>
              <button
                className='accept pt-0 pb-0'
                onClick={() =>
                  this.state.errorText.trim() !== ''
                    ? this.props.handleUndo(this.state.errorText)
                    : ''
                }
                disabled={
                  this.state.errorText.trim() === '' || this.props.disabled
                }
              >
                {this.props.loading === 'submit-unaccept' ? (
                  <Loading className='form-loader mr-0 ml-2' />
                ) : (
                  <DoneIcon className='ml-2 mt-2 mb-2' />
                )}
                ثبت
              </button>
              <button
                className='pt-0 pb-0'
                onClick={() => this.props.close(false)}
              >
                <CloseRoundedIcon className='ml-2' />
                بستن
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
