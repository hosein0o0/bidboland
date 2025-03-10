import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import '../css/style.css'
import TSR1 from './TSR1/TSR1'
import TSR2 from './TSR2/TSR2'
import API from './API/API'
import handleCheckText from '../../handleCheckText'
import NotificationContainer from '../../notification/NotificationCotainer'
import TSR3 from './TSR3/TSR3'
import TSR4 from './TSR4/TSR4'
import TSR5 from './TSR5/TSR5'
import TSR6 from './TSR6/TSR6'
import TSR7 from './TSR7/TSR7'
import TSR8 from './TSR8/TSR8'
import TSR9 from './TSR9/TSR9'
import TSR10 from './TSR10/TSR10'
import TSR11 from './TSR11/TSR11'
import TSR12 from './TSR12/TSR12'
import FirstLoading from '../../layout/firstLoading'
export default class NewTSRPrint extends Component {
  constructor(props) {
    super(props)
    this.API = new API(this)
    this.state = {
      token: Cookies.get('token'),
      firstLoading: true
    }
  }
  async componentDidMount() {
    let url = await window.location.href
    let array = url.split('/') || []
    let id = await array[array.length - 1]
    await this.setState({ id: id || '' })
    await this.fetchData()
  }
  fetchData = () => {
    const { fetchDataAPI } = this.API
    let { id } = this.state
    if (handleCheckText(id)) {
      fetchDataAPI()
    }
  }
  handleState = obj => {
    this.setState(obj)
  }
  render() {
    const { token, page, firstLoading } = this.state
    const data = num => this.state[`tsr${num}`] || {}
    if (!token) return <Redirect to='/404' />
    else
      return (
        <div className='mainPDF'>
          {firstLoading && <FirstLoading />}
          <NotificationContainer />
          <TSR1 {...this} data={data(1)} />
          {page > 1 && <TSR2 {...this} data={data(2)} />}
          {page > 2 && <TSR3 {...this} data={data(3)} />}
          {page > 3 && <TSR4 {...this} data={data(4)} />}
          {page > 4 && <TSR5 {...this} data={data(5)} />}
          {page > 5 && <TSR6 {...this} data={data(6)} />}
          {page > 6 && <TSR7 {...this} data={data(7)} />}
          {page > 7 && <TSR8 {...this} data={data(8)} />}
          {page > 8 && <TSR9 {...this} data={data(9)} />}
          {page > 9 && <TSR10 {...this} data={data(10)} />}
          {page > 10 && <TSR11 {...this} data={data(11)} />}
          {page > 11 && <TSR12 {...this} data={data(12)} />}
        </div>
      )
  }
}
