import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import StaticData from '../staticData'
import axios from 'axios'
// import Permision from '../permision/permision'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import Information from './information'
import TagDescription from './tagDesciption'
import Attachments from './attachments'
import MTO from './mto'
import handleString from '../handleString'
export default class MRE extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      select: 1,
      redirect: false,
      id: '',
      foucs: '',
      Mre_No: '',
      project: '',
      phase: '',
      areaCode: '',
      discipline: '',
      doctype: '',
      ser_NO: '',
      revision: '',
      class: '',
      contract_No: '',
      project_Description: '',
      client: '',
      consultant: '',
      vendorSelected: [],
      valueVendor: [],
      vendorList: [
        { label: 'test', value: 'test' },
        { label: 'test1', value: 'test1' },
        { label: 'test2', value: 'test2' },
        { label: 'test3', value: 'test3' }
      ],
      lastRevisionDate: '',
      purposeIssue: '',
      pred: {
        text: '',
        sign: '/img/login-bg.jpg'
      },
      chkd: {
        text: '',
        sign: '/img/login-bg.jpg'
      },
      aprd: {
        text: '',
        sign: '/img/login-bg.jpg'
      },
      autd: {
        text: '',
        sign: '/img/login-bg.jpg'
      },
      pictureShow: '',
      popUp: false,
      tagDescription: [
        { equipment: '', description: '', qty: '', location: '', remarks: '' }
      ],
      attachmentsList: [
        {
          documentNumber: '',
          documentTitle: '',
          documentType: '',
          documentStatus: '',
          remarks: ''
        }
      ]
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} -  MRE`
    // let id = window.location.href.split('-')[window.location.href.split('-').length - 1]
    // if(id) {
    //     this.setState({id : id})
    //     // this.fetchData(id)
    // }
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
          // let permision = new Permision()
          // if(permision.handlePermision(response.data.role , 'main_transmittal')){
          this.setState(response.data.content)
          // }
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
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: handleString(e.target.value) })
  }
  getLabel = (name, value, newValue) => {
    this.setState({ [name]: [] })
    let array = [],
      arrayValue = []
    if (newValue && newValue.length > 0) {
      newValue.forEach(data => {
        array.push(data.value)
        arrayValue.push(data)
        this.setState({
          [name]: array,
          [value]: arrayValue
        })
      })
    }
  }
  handleChangeTag = (e, nameState) => {
    let list = this.state[nameState]
    let name = e.target.name.split('_')[0]
    let key = parseInt(e.target.name.split('_')[1])
    let obj = list[key]
    obj[name] = handleString(e.target.value)
    this.setState({ [nameState]: list })
  }
  AddTag = (name, obj) => {
    this.setState({
      [name]: [...this.state[name], obj]
    })
  }
  DeleteTag = (key, name) => {
    let data = this.state[name]
    data.splice(key, 1)
    this.setState({ [name]: data })
  }
  changeLevel = number => {
    if (number === 1) {
      if (this.state.Mre_No !== '' && this.state.vendorSelected.length > 0) {
        this.setState({ select: number + 1 })
      } else {
        Notification.notify(Message.text(99), 'error')
      }
    } else if (number === 2) {
      let list = this.state.tagDescription
      let i = 0
      let checkTag = false
      while (i < list.length) {
        checkTag =
          list[i].description !== '' &&
          list[i].equipment !== '' &&
          list[i].location !== '' &&
          list[i].qty !== ''
        i++
        if (!checkTag) {
          Notification.notify(Message.text(99), 'error')
          break
        }
      }
      if (checkTag) {
        this.setState({ select: number + 1 })
      }
    } else if (number === 3) {
      let array = this.state.attachmentsList
      let j = 0
      let checkAttach = false
      while (j < array.length) {
        checkAttach =
          array[j].documentNumber !== '' &&
          array[j].documentTitle !== '' &&
          array[j].documentType !== '' &&
          array[j].documentStatus !== ''
        j++
        if (!checkAttach) {
          Notification.notify(Message.text(99), 'error')
          break
        }
      }
      if (checkAttach) {
        this.setState({ select: number + 1 })
      }
    }
  }
  handleShow = () => {
    if (this.state.select === 1) {
      return (
        <Information
          {...this}
          handlePopup={(e, src) =>
            this.setState({ popUp: e, pictureShow: src })
          }
        />
      )
    } else if (this.state.select === 2) {
      return <TagDescription {...this} />
    } else if (this.state.select === 3) {
      return <Attachments {...this} />
    } else if (this.state.select === 4) {
      return <MTO {...this} />
    } else return ''
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      if (this.state.redirect) {
        return <Redirect to='/' />
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
                    <Menu nameRole='Home' nameUrl={this.props.nameUrl} />
                    <div className='w-100 row m-0 main-box-dashboard'>
                      <div className='boxes-dashboard row m-0 p-0'>
                        <div className='main-form'>
                          <div className='title-from'>
                            <h2>درخواست خرید</h2>
                          </div>
                          <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
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
                                    MRE Information
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
                                    Tag Description
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
                                    attachments
                                  </span>
                                </div>
                                <div
                                  className={`item-tab ${
                                    this.state.select === 4
                                      ? 'active IranSans_Bold'
                                      : ''
                                  }`}
                                  onClick={() => this.setState({ select: 4 })}
                                >
                                  <span>
                                    <label
                                      className={`${
                                        this.state.select === 4
                                          ? 'IranSans_Bold'
                                          : ''
                                      }`}
                                    >
                                      4.
                                    </label>
                                    MTO
                                  </span>
                                </div>
                              </div>
                            </div>
                            {this.handleShow()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.popUp && this.state.pictureShow !== '' ? (
                <Sign
                  close={e => this.setState({ popUp: e, pictureShow: '' })}
                  pictureShow={this.state.pictureShow}
                />
              ) : (
                ''
              )}
            </div>
          )
      }
    }
  }
}
class Sign extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div className='backGroundPopup' onClick={() => this.props.close(false)}>
        <div className='col-xl-6 col-lg-10 col-12'>
          <img src={this.props.pictureShow} alt='sign' />
        </div>
      </div>
    )
  }
}
