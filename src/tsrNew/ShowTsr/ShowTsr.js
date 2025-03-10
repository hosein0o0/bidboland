import React, { Component } from 'react'
import ListTab from './ListTab'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import ShowTab from './ShowTab'
import Permision from '../../permision/permision'
import API from './API'
import Cookies from 'js-cookie'
import handleCheckText from '../../handleCheckText'
import StaticData from '../../staticData'
import Main from './main'
import ListSign from '../ListSign'
// import { Redirect } from 'react-router-dom'
import Title from './Title'
export default class ShowTsrNew extends Component {
  constructor(props) {
    super(props)
    // this.ResetRev = null
    this.Permision = new Permision()
    this.API = new API(this)
    this.ListSign = ListSign
    this.state = {
      token: Cookies.get('token'),
      select: 1,
      _listTab: [],
      role: {},
      id: '',
      firstLoading: true,
      revisions: [],
      rejectSelect: '',
      tsr_no: '',
      user_list: [],
      check_open: false,
      tab_9: 1,
      tab_10: 1,
      tab_7: 1,
      tab_8: 1,
      tab_6: 1,
      tab_2: 1
    }
  }
  async componentDidMount() {
    let url = await window.location.href
    let id = await url.split('-')[url.split('-').length - 1]
    await this.setState({ _listTab: ListTab.array || [], id: id || '' })
    await this.fetchData()
  }
  handleState = obj => {
    this.setState(obj)
  }
  handleThis = (name, value) => {
    this[name] = value
  }
  fetchData = (status = '') => {
    const { FetchApi } = this.API
    let { token, id } = this.state
    if (handleCheckText(id) && handleCheckText(token)) {
      let url = `${StaticData.domainIp}/tsr_v1/get/${id}`
      FetchApi(url, status)
    }
  }
  handleVerify = (status, data, message = '') => {
    const { handleVerify } = this.API
    handleVerify(status, data, message)
  }
  render() {
    const { _close, firstLoading } = this.state
    return (
      <div className='main'>
        <div className='col-12 p-0'>
          <div className='row m-0'>
            <Sidebar
              handleState={(name, value) => this.setState({ [name]: value })}
            />
            <div className={`${_close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'} dashboard`}>
              <Menu
                nameRole='tsr_show'
                firstLoading={firstLoading}
                nameUrl={this.props.nameUrl}
              />
              <div className='w-100 row m-0 main-box-dashboard'>
                <div className='boxes-dashboard row m-0 p-0'>
                  <div className='main-form'>
                    <Title {...this} />
                    <ShowTab {...this} />
                    <Main {...this} />
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
