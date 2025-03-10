import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import BoxResultSearch from './BoxResultSearch'
import Cookies from 'js-cookie'
import axios from 'axios'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import { Redirect } from 'react-router-dom'
import handleString from '../handleString'
export default class GeneralSearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      search: '',
      foucs: '',
      loading: '',
      data: [],
      redirect: false,
      itemSelected: ''
    }
  }
  async componentDidMount () {
    document.title = `${StaticData.Title} - جستجوی پیشرفته`
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    setTimeout(() => {
      this.setState({ foucs: '', loading: '' })
    }, 500)
  }
  handleChange = async e => {
    const { value, maxLength, name } = e.target
    await this.setState({
      [name]: maxLength !== -1 ? value.slice(0, maxLength) : value
    })
    if (value.length > 3) {
      await this.handleRequest()
    }
  }
  handleRequest = async () => {
    let url = `${StaticData.domainIp}/AdvanceSearch/getEquipmentNumber?equipment_no=${this.state.search}`
    this.setState({ loading: 'search' })
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(async response => {
        this.setState({ loading: '' })
        if (response.status === 200) {
          this.setState({
            data: response.data.content
          })
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        this.setState({ loading: '' })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  render () {
    if (!this.state.token) {
      return <Redirect to='/Login' />
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
                <Menu nameRole='Home' BI={true} nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard align-items-start justify-content-center'>
                  <div className='col-xl-6 col-lg-7 col-md-8 col-12'>
                    <div className='main-generalsearch mt-3'>
                      <div className='detail-generalsearch'>
                        <img
                          className='detail-generalsearch-logo'
                          src='img/Illustration-AdvancedSearch.svg'
                          alt=''
                        />
                        <h2 className='detail-generalsearch-title mb-4'>
                          جستجوی پیشرفته اسناد
                        </h2>
                        {/* <p className='detail-generalsearch-paragraph'>
                                                
                                            </p> */}
                      </div>
                      <div
                        className={`field-generalsearch ${
                          this.state.foucs === 'search' && this.state.search
                            ? 'active'
                            : ''
                        }`}
                      >
                        <div className='w-100 d-flex align-items-center position-relative'>
                          <SearchRoundedIcon className='field-generalsearch-icon' />
                          <input
                            className={`field-generalsearch-input ltr ${
                              this.state.loading === 'search' ? 'loading' : ''
                            }`}
                            name='search'
                            value={handleString(this.state.search)}
                            onChange={this.handleChange}
                            onFocus={e => this.OnFocus(e.target.name)}
                            onBlur={this.OnBlur}
                            placeholder='...تگ تجهیز مورد نظر خود را جستجو کنید'
                          />
                        </div>
                        {this.state.foucs === 'search' &&
                          this.state.search &&
                          this.state.search.length > 4 && (
                            <BoxResultSearch {...this} general={true} />
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
