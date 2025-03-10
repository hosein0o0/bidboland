import React, { Component } from 'react'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import StaticData from '../../staticData'
import Creater from './create-show'
import PeyMankarControl from './PeyMankarControl'
import Moshaver from './Moshaver'
import Karfarma from './Karfarma'
import PrintIcon from '@material-ui/icons/Print'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import Permision from '../../permision/permision'
export default class TqFrom extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      foucs: '',
      token: Cookies.get('token'),
      loading: false,
      Document: 'TQ',
      tqStatus: '',
      _id: '',
      _404: false,
      rejectMessage: '',
      role: null
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - Technical Request TQ`
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    this.setState({ _id: id })
    if (this.state.token) {
      if (Cookies.get('userDetail')) {
        let obj = JSON.parse(Cookies.get('userDetail'))
        this.setState({
          userDetail: obj,
          FullNameKargah: `${obj.first_name} ${obj.last_name}`
        })
      }
      this.fetchData()
    }
  }
  fetchData = () => {
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    axios
      .get(`${StaticData.domainIp}/tq/${id}`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          let state = response.data.content
          state['role'] = response.data.role
          this.setState(state)
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
          setTimeout(() => {
            this.setState({ _404: true })
          }, 5000)
        } else {
          this.setState({ _404: true })
        }
      })
  }
  handleShow = () => {
    if (this.state.tqStatus === 'quality') {
      return (
        <React.Fragment>
          <Creater {...this.state} />
          {this.Permision.handlePermision(
            this.state.role,
            'TQ_quality_control'
          ) && <PeyMankarControl {...this} fetchData={this.fetchData} />}
        </React.Fragment>
      )
    } else if (
      this.state.tqStatus === 'qualityVerify' &&
      this.Permision.handlePermision(this.state.role, 'TQ_edit')
    ) {
      return (
        <React.Fragment>
          <Creater {...this.state} />
          <PeyMankarControl {...this.state} disabled={true} verify={true} />
        </React.Fragment>
      )
    } else if (
      this.state.tqStatus === 'qualityEdit' &&
      this.Permision.handlePermision(this.state.role, 'TQ_edit')
    ) {
      return (
        <React.Fragment>
          <Creater {...this.state} />
          <PeyMankarControl {...this} fetchData={this.fetchData} edit={true} />
        </React.Fragment>
      )
    } else if (
      this.state.tqStatus === 'consultant' &&
      this.Permision.handlePermision(this.state.role, 'TQ_program_consultant')
    ) {
      return (
        <React.Fragment>
          <Creater {...this.state} />
          <PeyMankarControl {...this.state} disabled={true} />
          <Moshaver {...this.state} fetchData={this.fetchData} />
        </React.Fragment>
      )
    } else if (
      this.state.tqStatus === 'consultantVerify' &&
      this.Permision.handlePermision(this.state.role, 'TQ_edit')
    ) {
      return (
        <React.Fragment>
          <Creater {...this.state} />
          <PeyMankarControl {...this.state} disabled={true} />
          <Moshaver {...this.state} verify={true} disabled={true} />
        </React.Fragment>
      )
    } else if (
      this.state.tqStatus === 'consultantEdit' &&
      this.Permision.handlePermision(this.state.role, 'TQ_edit')
    ) {
      return (
        <React.Fragment>
          <Creater {...this.state} />
          <PeyMankarControl {...this.state} disabled={true} />
          <Moshaver {...this.state} fetchData={this.fetchData} edit={true} />
        </React.Fragment>
      )
    } else if (
      this.state.tqStatus === 'owner' &&
      this.Permision.handlePermision(this.state.role, 'TQ_owner')
    ) {
      return (
        <React.Fragment>
          <Creater {...this.state} />
          <PeyMankarControl {...this.state} disabled={true} />
          <Moshaver {...this.state} disabled={true} />
          <Karfarma {...this.state} fetchData={this.fetchData} />
        </React.Fragment>
      )
    } else if (
      this.state.tqStatus === 'ownerVerify' &&
      this.Permision.handlePermision(this.state.role, 'TQ_edit')
    ) {
      return (
        <React.Fragment>
          <Creater {...this.state} />
          <PeyMankarControl {...this.state} disabled={true} />
          <Moshaver {...this.state} disabled={true} />
          <Karfarma {...this.state} verify={true} disabled={true} />
        </React.Fragment>
      )
    } else if (
      this.state.tqStatus === 'ownerEdit' &&
      this.Permision.handlePermision(this.state.role, 'TQ_edit')
    ) {
      return (
        <React.Fragment>
          <Creater {...this.state} />
          <PeyMankarControl {...this.state} disabled={true} />
          <Moshaver {...this.state} disabled={true} />
          <Karfarma {...this.state} fetchData={this.fetchData} edit={true} />
        </React.Fragment>
      )
    } else if (
      this.state.tqStatus === 'compelete' &&
      this.Permision.handlePermision(this.state.role, 'TQ_complete')
    ) {
      return (
        <React.Fragment>
          <Creater {...this.state} />
          <PeyMankarControl {...this.state} disabled={true} />
          <Moshaver {...this.state} disabled={true} />
          <Karfarma {...this.state} disabled={true} />
        </React.Fragment>
      )
    }
  }
  handleName = () => {
    if (this.state.tqStatus === 'qualityEdit') {
      return 'کارشناس'
    } else if (this.state.tqStatus === 'consultantEdit') {
      return 'مشاور'
    } else if (this.state.tqStatus === 'ownerEdit') {
      return 'کارفرما'
    }
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
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
                  <Menu nameRole='TQ' nameUrl={this.props.nameUrl} />
                  <div className='w-100 row m-0 main-box-dashboard'>
                    <div className='boxes-dashboard row m-0 p-0'>
                      <div className='main-form'>
                        <div className='title-from'>
                          <h2>درخواست فنی</h2>
                        </div>
                        <div className='col-xl-8 col-lg-12 col-md-12 col-12'>
                          <div className='form row justify-content-start'>
                            {this.state.rejectMessage ? (
                              <div className='col-12 mb-3'>
                                <div className='message-error'>
                                  <label className='strong'>
                                    {' '}
                                    نظر {this.handleName()} به دلیل زیر رد شد :{' '}
                                  </label>
                                  <p className='m-0'>
                                    {this.state.rejectMessage}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              ''
                            )}
                            {this.handleShow()}
                            <div className='submit-form mt-3 nb-3 col-12'>
                              <button
                                className='print'
                                onClick={this.handleSubmit}
                              >
                                <a
                                  target='_blank'
                                  rel='noreferrer'
                                  href={`${StaticData.domainIp}/tqPrint/${this.state._id}`}
                                >
                                  <PrintIcon />
                                  چاپ
                                </a>
                              </button>
                            </div>
                          </div>
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
