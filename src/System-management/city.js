import React, { Component } from 'react'
import Cookies from 'js-cookie'
import StaticData from '../staticData'
import axios from 'axios'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import NotFoundTable from '../table/notFound'
import Loading from '../layout/loading'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'

export default class City extends Component {
  constructor (props) {
    super(props)
    this.Fetch = null
    this.state = {
      token: Cookies.get('token'),
      name: '',
      city: '',
      provinceList: []
    }
  }
  componentDidMount () {
    this.getProvince()
  }
  getProvince = async () => {
    if (this.state.token) {
      await axios
        .get(`${StaticData.domainIp}/city/provinceListForSelectBox`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(async response => {
          if (response.status === 200) {
            this.setState({ provinceList: response.data.content })
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
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = async () => {
    if (this.state.name !== '' && this.state.city !== '') {
      this.setState({ loading: 'submit' })
      let datareg = await new FormData()
      await datareg.append('name', this.state.name)
      await datareg.append('province_id', this.state.city)
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/city/createCity`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            Notification.notify(Message.text(906), 'success')
            if (this.Fetch !== null) {
              this.Fetch()
            }
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({ loading: '' })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
            if (err.response.status === 404) {
              this.setState({ back: true })
            }
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  render () {
    return (
      <div className='w-100 row m-0'>
        <div className='col-6'>
          <div className='main-form'>
            <div className='form row mt-0'>
              <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                <div
                  className={`field-form persian mt-0 ${
                    this.state.foucs === 'name' ||
                    handleCheckText(this.state.name)
                      ? 'active'
                      : ''
                  }`}
                >
                  <label>
                    نام
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <input
                    readOnly={false}
                    onFocus={e => this.OnFocus(e.target.name)}
                    onBlur={this.OnBlur}
                    onChange={this.handleChange}
                    name='name'
                    value={handleString(this.state.name)}
                  />
                </div>
              </div>
              <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                <div
                  className={`field-form persian pl-1 ${
                    this.state.foucs === `city` ||
                    handleCheckText(this.state.city)
                      ? 'active'
                      : ''
                  }`}
                >
                  <label>استان مروبوطه</label>
                  <select
                    name={`city`}
                    value={handleString(this.state.city)}
                    onFocus={e => this.OnFocus(e.target.name)}
                    onBlur={this.OnBlur}
                    onChange={this.handleChange}
                  >
                    <option className='d-none'></option>
                    {this.state.provinceList.map((data, key) => (
                      <option key={key} value={data.value}>
                        {data.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='submit-form col-12 mt-5'>
                <button onClick={this.handleSubmit}>
                  {this.state.loading === 'submit' ? (
                    <Loading className='form-loader' />
                  ) : (
                    <DoneIcon />
                  )}
                  ثبت اطلاعات
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='col-6 pr-3 pl-3 position-relative row m-0 justify-content-start'>
          <Table
            GetFunction={this.props.getFunctionSearch}
            Fetch={e => (this.Fetch = e)}
          />
        </div>
      </div>
    )
  }
}
class Table extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      header: [
        { name: 'نام' },
        { name: 'نام استان' },
        { name: 'تاریخ ایجاد' },
        { name: 'تاریخ بروز رسانی' },
        { name: 'عملیات' }
      ],
      row: [],
      contentPerPage: 25,
      page: 1,
      totalLength: 0,
      pageNumber: 1,
      selectNumber: '',
      secondSelectNumber: '',
      documentSelected: '',
      firstData: [],
      secondData: {},
      search: '',
      permision: '',
      filter: '',
      loading: 'table',
      letterNumber: '',
      idLetter: ''
    }
  }
  componentDidMount () {
    this.props.GetFunction(this.handleSearch)
    this.fetchData()
    this.props.Fetch(this.fetchData)
  }
  handleSearch = async text => {
    if (this.state.token) {
      this.setState({ search: text, loading: 'table' })
      if (text === '') {
        await this.setState({ page: 1 })
      }
      await axios
        .get(
          `${StaticData.domainIp}/city/getCityList/${this.state.page}?contentPerPage=${this.state.contentPerPage}&searchInAll=${text}`,
          {
            headers: {
              Authorization: `Bearer ${this.state.token}`
            }
          }
        )
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            if (
              response.data.content.rows.length === 0 &&
              response.data.content.length > 0
            ) {
              await this.setState({ page: 1 })
              await this.handleSearch(this.state.search)
            } else {
              await this.setState({
                totalLength: response.data.content.length,
                row: response.data.content.rows,
                pageNumber: response.data.content.pageNumber
              })
            }
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
  fetchData = async () => {
    if (this.state.token) {
      this.setState({ loading: 'table' })
      await axios
        .get(
          `${StaticData.domainIp}/city/getCityList/${this.state.page}?contentPerPage=${this.state.contentPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${this.state.token}`
            }
          }
        )
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            // let permision = new Permision()
            // if(permision.handlePermision(response.data.role , 'main_transmittal')){
            await this.setState({
              totalLength: response.data.content.length,
              row: response.data.content.rows,
              pageNumber: response.data.content.pageNumber
            })
            // }
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
  }
  changeRowNumber = async e => {
    await this.setState({
      [e.target.name]: parseInt(e.target.value),
      loading: 'table'
    })

    if (e.target.name === 'contentPerPage') {
      await this.setState({ page: 1 })
      if (this.refs.page) {
        this.refs.page.value = await 1
      }
      if (this.refs.contentPerPage) {
        this.refs.contentPerPage.value = await parseInt(e.target.value)
      }
    } else if (e.target.name === 'page') {
      if (this.refs.contentPerPage) {
        this.refs.contentPerPage.value = await this.state.contentPerPage
      }
      if (this.refs.page) {
        this.refs.page.value = await parseInt(e.target.value)
      }
    }
    if (this.state.search !== '') {
      await this.handleSearch(this.state.search)
    } else if (this.state.textSearch !== '') {
      await this.fetchData(`searchByFields=${this.state.textSearch}`)
    } else {
      await this.fetchData()
    }
  }
  handleClick = async status => {
    switch (status) {
      case 'right':
        if (this.state.page > 1 && this.state.page <= this.state.pageNumber) {
          await this.setState({
            page: parseInt(this.state.page) - 1,
            loading: 'table'
          })
          if (this.state.search !== '') {
            await this.handleSearch(this.state.search)
          } else if (this.state.textSearch !== '') {
            await this.fetchData(`searchByFields=${this.state.textSearch}`)
          } else {
            await this.fetchData()
          }
          if (this.refs.page) {
            this.refs.page.value = await parseInt(this.state.page)
          }
          if (this.refs.contentPerPage) {
            this.refs.contentPerPage.value = await this.state.contentPerPage
          }
        }
        break
      case 'left':
        if (this.state.page < this.state.pageNumber) {
          await this.setState({
            page: parseInt(this.state.page) + 1,
            loading: 'table'
          })
          if (this.state.search !== '') {
            await this.handleSearch(this.state.search)
          } else if (this.state.textSearch !== '') {
            await this.fetchData(`searchByFields=${this.state.textSearch}`)
          } else {
            await this.fetchData()
          }
          if (this.refs.page) {
            this.refs.page.value = await parseInt(this.state.page)
          }
          if (this.refs.contentPerPage) {
            this.refs.contentPerPage.value = await this.state.contentPerPage
          }
        }
        break
      default:
        return true
    }
  }
  handleNumberPage = () => {
    let allData = []
    for (let i = 0; i < this.state.pageNumber; i++) {
      allData.push(<option value={i + 1}>{i + 1}</option>)
    }
    return allData
  }
  render () {
    return (
      <React.Fragment>
        <div className='table persian rtl w-100'>
          <table>
            <tbody>
              <tr className='header'>
                {this.state.header.map((data, key) => (
                  <th
                    key={key}
                    className={
                      this.state.header.length - 1 === key ? 'action' : ''
                    }
                  >
                    {data.name}
                  </th>
                ))}
              </tr>
              {this.state.loading === 'table' ? (
                <tr className='loading'>
                  <div className='main-loading'>
                    <div className='w-100 row m-0 justify-content-center'>
                      <Loading className='table row m-0 justify-content-center' />
                      <span className='w-100 mt-2'>در حال بارگذاری</span>
                    </div>
                  </div>
                </tr>
              ) : this.state.row.length === 0 ? (
                <NotFoundTable />
              ) : (
                this.state.row.map((data, index) => (
                  <tr key={index} ref={`tr_${data.id}`}>
                    <td>{data.name}</td>
                    <td>{data.province_id}</td>
                    <td>{data.created_at}</td>
                    <td>{data.updated_at}</td>
                    <td className='action justify-content-center'>
                      {/* <Link className='mr-auto ml-auto' to={`/edit-contact-${data.id}`} target='_blank' rel='noreferrer'> */}
                      <span className='edit'>
                        <EditIcon />
                      </span>
                      {/* </Link> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {this.state.row.length === 0 && this.state.search === '' ? (
          ''
        ) : (
          <div
            className={`footer-table row mr-0 ml-0 w-100 ${
              this.state.loading === 'table' ? 'd-none' : ''
            }`}
          >
            <div className='col-xl-12 col-lg-12 col-md-12 col-12 align-items-center row m-0 justify-content-end'>
              <div className='main-item-footer'>
                <div className='item num-row'>
                  <label>تعداد ردیف در هر صفحه :</label>
                  <select
                    name='contentPerPage'
                    ref='contentPerPage'
                    onChange={e => this.changeRowNumber(e)}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <div className='item'>
                  <label>
                    آیتم
                    {this.state.totalLength <
                    this.state.contentPerPage * this.state.page
                      ? this.state.totalLength
                      : this.state.contentPerPage * this.state.page}
                    از
                    {this.state.length}
                    {this.state.totalLength}- صفحه
                  </label>
                  <select
                    ref='page'
                    name='page'
                    onChange={e => this.changeRowNumber(e)}
                  >
                    {this.handleNumberPage()}
                  </select>
                  <label>از {this.state.pageNumber}</label>
                </div>
                <div className='item arrow'>
                  <button onClick={() => this.handleClick('right')}>
                    <ChevronRightIcon />
                  </button>
                  <button onClick={() => this.handleClick('left')}>
                    <ChevronLeftIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}
