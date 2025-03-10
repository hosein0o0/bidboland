import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import bidboland from '../bidboland'
import Cookies from 'js-cookie'
import axios from 'axios'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
export default class FAQ extends Component {
  constructor (props) {
    super(props)
    this.ThisMenu = null
    this.state = {
      token: Cookies.get('token'),
      open: '',
      height: 0,
      nameUrl: ''
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} -  راهنمایی`
    const url = window.location.href
    let nameUrl = url.split('-')[url.split('-').length - 1]
    this.setState({ nameUrl: nameUrl })
    this.FoundUrl(nameUrl)
  }
  componentDidUpdate () {
    if (this.ThisMenu) {
      this.ThisMenu.handleState('showFAQ', false)
    }
  }
  handleOpenBox = (key, name) => {
    let elm = this.refs[`box_${key}`]
    if (elm) {
      if (this.state.open === key) {
        this.setState({
          height: 0,
          open: ''
        })
      } else {
        this.setState({
          height: elm.offsetHeight,
          open: this.state.open === `${key}_${name}` ? '' : `${key}_${name}`
        })
      }
    }
  }
  FoundUrl = nameUrl => {
    let bd = bidboland
    if (bd.props.children.props.children) {
      // let listUrl = bd.props.children.props.children
      // let previous = document.referrer
      // if (this.props.location.state) {
      // if (this.props.location.state.nameUrl) {
      // const nameUrl = this.props.location.state.nameUrl
      this.checkByName(nameUrl)
      // }
      // }
    }
  }
  checkByName = async nameUrl => {
    // let datareg = await new FormData()
    // await datareg.append('name', nameUrl)
    await axios({
      method: 'get',
      url: `${StaticData.domainIp}/FAQ/checkByName?name=${nameUrl}`,
      // data: datareg,
      headers: {
        Authorization: this.state.token ? `Bearer ${this.state.token}` : null
      }
    })
      .then(async response => {
        if (response.status === 200) {
          let state = this.state
          state['role'] = response.data.role
          state['check'] = response.data.content
          this.setState(state)
          if (response.data.content) {
            this.fetchData(nameUrl)
          }
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
  fetchData = async nameUrl => {
    let url = `${StaticData.domainIp}/FAQ/getByName?name=${nameUrl}`
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(async response => {
        if (response.status === 200) {
          const content = response.data.content
          if (content) {
            this.setState(content)
          }
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
        await this.setState({ loading: '' })
      })
      .catch(err => {
        this.setState({ loading: '' })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  handleConvert = obj => {
    let list = []
    if (obj) {
      list = Object.keys(obj).map(data => {
        return obj[data]
      })
    }
    return list
  }
  render () {
    const { idiom_title, title, text, idiom_object, faq_object } = this.state
    return (
      <div className='main'>
        <div className='col-12 p-0'>
          <div className='row m-0'>
            <Sidebar
              handleState={(name, value) => this.setState({ [name]: value })}
            />
            <div
              className={`${
                this.state._close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'
              } dashboard`}
            >
              <Menu
                nameRole=''
                nameUrl={this.props.nameUrl}
                ThisMenu={th => (this.ThisMenu = th)}
              />
              <div className='w-100 row m-0 main-box-dashboard'>
                <div className='boxes-dashboard row m-0 p-0'>
                  <div className='main-text'>
                    <div className='main-title row mr-0 ml-0'>
                      <div className='title col p-0'>
                        <h2 className='IranSans_Bold_FA'>راهنمای ماژول</h2>
                      </div>
                      <div className='support'>
                        <a href='#'>درخواست پشتیبانی</a>
                      </div>
                    </div>
                    <div className='main-paragraph'>
                      {title && (
                        <div className='paragraph'>
                          <h3 className='title-paragraph IranSans_Bold_FA'>
                            {title}
                          </h3>
                          {/* <p className='text-paragraph'>{title}</p> */}
                        </div>
                      )}
                      <div className='w-100'>
                        <div className='paragraph'>
                          {/* <h3 className='title-paragraph IranSans_Bold_FA'>{title}</h3> */}
                          <p className='text-paragraph'>{text}</p>
                        </div>
                      </div>
                      {idiom_title && (
                        <div className='list-item-paragraph'>
                          <div className='title-password w-100 my-2'>
                            <h2 className='IranSans_Bold'>{idiom_title}</h2>
                            <div className='line'></div>
                          </div>
                          <ul>
                            {this.handleConvert(idiom_object).map(
                              (data, key) => (
                                <li key={key}>
                                  <label className='IranSans_Bold_FA mb-0 ml-1'>
                                    {data.title} :
                                  </label>
                                  <p className='mb-0'>{data.text}</p>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      <div className='main-paragraph-box'>
                        <div className='title-password w-100 mt-3 mb-3'>
                          <h2 className='IranSans_Bold'>
                            سوالات متداول کاربران
                          </h2>
                          <div className='line'></div>
                        </div>
                        {this.handleConvert(faq_object).map((data, key) => (
                          <div
                            className={`paragraph-box ${
                              this.state.open === `${key}_faq_object`
                                ? 'active'
                                : ''
                            }`}
                            key={key}
                            style={{
                              height:
                                this.state.open === `${key}_faq_object`
                                  ? `calc(${this.state.height}px + 5em)`
                                  : '5em'
                            }}
                          >
                            <div className='title-box'>
                              <div className='col p-0'>
                                <h4 className='title-box-text'>
                                  <span className='circle'></span>
                                  {data.title}
                                </h4>
                              </div>
                              <span
                                className={`more-detail pointer ${
                                  this.state.open === `${key}_faq_object`
                                    ? 'IranSans_Bold_FA'
                                    : ''
                                }`}
                                onClick={() =>
                                  this.handleOpenBox(key, 'faq_object')
                                }
                              >
                                جزئیات بیشتر
                                <ExpandLessIcon />
                              </span>
                            </div>
                            <div
                              className='paragraph-box-text'
                              ref={`box_${key}`}
                            >
                              <p>{data.text}</p>
                            </div>
                          </div>
                        ))}
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
