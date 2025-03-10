import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect, Link } from 'react-router-dom'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
import axios from 'axios'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'
import RefreshIcon from '@material-ui/icons/Refresh'
import SearchIcon from '@material-ui/icons/Search'
import Notification from '../notification/notification'
import Message from '../notification/Message'
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ImageIcon from '@material-ui/icons/Image'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import CloseIcon from '@material-ui/icons/Close';
import PopUpGallery from './PopUpGallery'
import handleString from '../handleString'

export default class ArchiveGallery extends Component {
  constructor (props) {
    super(props)
    this.Search = null
    this.state = {
      token: Cookies.get('token'),
      list: [],
      pictureShow: '',
      popUp: false,
      back: false,
      detail: {},
      page: 1,
      total: 0,
      search: ''
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - گالری تصاویر`
    this.fetchData()
    window.addEventListener('scroll', async () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (this.state.list.length < this.state.total) {
          await this.setState({
            page: this.state.page + 1
          })
          await this.fetchData()
        }
      }
    })
  }
  fetchData = () => {
    if (this.state.token) {
      axios
        .get(`${StaticData.domainIp}/gallery/getList/${this.state.page}`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.setState({
              list: this.state.list.concat(response.data.content.rows),
              total: response.data.content.length,
              role: response.data.role
            })
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
  }
  handleSearch = async e => {
    if (this.state.token) {
      await this.setState({
        search: handleString(e.target.value),
        loading: 'table',
        page: 1
      })
      await axios
        .get(
          `${StaticData.domainIp}/gallery/getList/${1}&searchInAll=${
            handleString(e.target.value)
          }`,
          {
            headers: {
              Authorization: `Bearer ${this.state.token}`
            }
          }
        )
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            this.setState({
              list: response.data.content.rows,
              total: response.data.content.length
            })
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(async err => {
          this.setState({ loading: '' })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  Covertor = obj => {
    let allData = []
    for (let value in obj) {
      allData.push(obj[value])
    }
    return allData
  }
  handleclass = key => {
    if (key === 0) {
      return 'third'
    } else if (key === 1) {
      return 'second'
    } else if (key === 2) {
      return 'first'
    }
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.back) {
      return <Redirect to='/404' />
    } else
      return (
        <div className='main'>
          <div className='col-12 p-0'>
            <div className='row m-0'>
              <Sidebar
                handleState={(name, value) => this.setState({ [name]: value })}
              />
              <div
                className={`${
                  this.state._close
                    ? 'mainSideClose'
                    : 'col-xl-10 col-lg-10 p-0'
                } dashboard`}
              >
                <Menu nameRole='gallery' nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 header-index pr-0 pl-0'>
                      <div className='row m-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                          <div className='icon-header'>
                            <div className='icon'>
                              <Link to='/Create-gallery'>
                                <AddCircleIcon />
                                <span>ارسال تصویر</span>
                              </Link>
                            </div>
                            <div className='icon disabled'>
                              <Link to='#'>
                                <SystemUpdateAltIcon />
                                <span>فیلتر بر اساس</span>
                              </Link>
                            </div>
                            <div className='icon disabled'>
                              <Link to='#'>
                                <RefreshIcon />
                                <span>حذف فیترها</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-4 col-12 p-0 d-flex justify-content-end'>
                          <div className='search-index col-xl-6 col-lg-8 col-md-10 col-11'>
                            <SearchIcon />
                            <input
                              className='ltr text-right'
                              placeholder='...جستجو'
                              value={handleString(this.state.search)}
                              onChange={this.handleSearch}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-start'>
                      <div className='main-gallery'>
                        <div className='header-gallery row m-0'>
                          <div className='col-12'>
                            <div className='latest-reports archive'>
                              <div ref='mainBox' className='w-100 row m-0'>
                                {this.state.list.map((data, key) => (
                                  <div
                                    className='five-item col-lg-3 col-md-4 col-sm-6 col-12'
                                    key={key}
                                  >
                                    <div
                                      className='box-gallery'
                                      onClick={() =>
                                        this.setState({
                                          popUp: true,
                                          detail: data
                                        })
                                      }
                                    >
                                      <div className='image-box'>
                                        <img
                                          src={data.img['0']}
                                          alt={data.name}
                                        />
                                      </div>
                                      <div className='detail-box'>
                                        <div className='detail-box-text'>
                                          <p>{data.text}</p>
                                        </div>
                                        <div className='detail-box-items row m-0'>
                                          <div className='item col-12 p-0'>
                                            <span>
                                              <ImageIcon />
                                              {data.name}
                                            </span>
                                          </div>
                                          <div className='item col-6 p-0 mt-1'>
                                            <span>
                                              <CalendarTodayIcon />
                                              {data.date}
                                            </span>
                                          </div>
                                          <div className='item col-6 p-0 mt-1'>
                                            <span>
                                              <LocationOnIcon />
                                              {data.location}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
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
            </div>
          </div>
          {this.state.popUp ? (
            <PopUpGallery
              close={e => this.setState({ popUp: e, detail: '' })}
              detail={this.state.detail}
              Covertor={this.Covertor}
              fetchData={this.fetchData}
              role={this.state.role}
            />
          ) : (
            ''
          )}
        </div>
      )
  }
}
