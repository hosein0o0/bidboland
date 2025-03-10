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
// import SearchIcon from '@material-ui/icons/Search';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Notification from '../notification/notification'
import Message from '../notification/Message'
// import VisibilityIcon from '@material-ui/icons/Visibility';
import NotFoundTable from '../table/notFound'
import Loading from '../layout/loading'
import PopupConfirm from '../layout/popupConfirm'
import EditIcon from '@material-ui/icons/Edit'
import UploadInformation from '../Customization/UploadInformation'
import SearchTable from '../table/SearchTable'
export default class Contact extends Component {
  constructor (props) {
    super(props)
    this.Search = null
    this.state = {
      token: Cookies.get('token')
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - correspondence`
  }
  // handleSearch = (e) => {
  //     if (this.Search !== null) {
  //         this.Search(e.target.value.trim())
  //     }
  // }
  render () {
    if (this.state.token === undefined) {
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
                <Menu nameRole='' nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 header-index pr-0 pl-0'>
                      <div className='row m-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                          <div className='icon-header'>
                            <div className='icon'>
                              <Link to='/create-contact'>
                                <AddCircleIcon />
                                <span>ایجاد مخاطب</span>
                              </Link>
                            </div>
                            <div className='icon'>
                              <span
                                className='item'
                                onClick={() =>
                                  this.setState({ upload: !this.state.upload })
                                }
                              >
                                <SystemUpdateAltIcon />
                                <span>بروز رسانی</span>
                              </span>
                            </div>
                            {this.state.upload && (
                              <UploadInformation
                                {...this}
                                handleState={(name, value) =>
                                  this.setState({ [name]: value })
                                }
                              />
                            )}
                            <div className='icon'>
                              <Link to='#'>
                                <RefreshIcon />
                                <span>حذف فیترها</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <SearchTable
                          {...this}
                          handleState={(name, value) =>
                            this.setState({ [name]: value })
                          }
                        />
                      </div>
                    </div>
                    <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-start'>
                      <Table GetFunction={e => (this.Search = e)} />
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
class Table extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      header: [
        { name: 'نام و نام خانوادگی' },
        { name: 'شماره تماس' },
        { name: 'ایمیل' },
        { name: 'آدرس' },
        { name: 'فکس' },
        { name: 'تاریخ ایجاد' },
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
    document.title = `${StaticData.Title}- مخطبان`
    this.props.GetFunction(this.handleSearch)
    this.fetchData()
  }
  handleSearch = async text => {
    if (this.state.token) {
      this.setState({ search: text, loading: 'table' })
      if (text === '') {
        await this.setState({ page: 1 })
      }
      await axios
        .get(
          `${StaticData.domainIp}/Contacts/getAll/${this.state.page}?contentPerPage=${this.state.contentPerPage}&searchInAll=${text}`,
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
          `${StaticData.domainIp}/Contacts/getAll/${this.state.page}?contentPerPage=${this.state.contentPerPage}`,
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
  GetMore = async key => {
    if (this.state.token) {
      this.setState({ selectNumber: key })
      let id = await this.state.row[key].id
      await axios
        .get(
          `${StaticData.domainIp}/transmittal/getDocumentList?transmittalCode=${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.state.token}`
            }
          }
        )
        .then(async response => {
          if (response.status === 200) {
            this.setState({
              firstData: response.data.content,
              selectNumber: key,
              documentSelected: id
            })
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
  GetSecondData = async (data, index, key) => {
    if (this.state.token) {
      this.setState({ selectNumber: key })
      await axios
        .get(
          `${StaticData.domainIp}/mdl/getDocumentRevisionDetail?documentId=${data.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.state.token}`
            }
          }
        )
        .then(async response => {
          if (response.status === 200) {
            await this.setState({
              secondData: response.data.content,
              selectNumber: key,
              secondSelectNumber: index
            })
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
  handleAttachment = data => {
    let allData = []
    for (let value in data) {
      allData.push(data[value])
    }
    return allData
  }
  handleDelete = () => {
    if (this.state.token) {
      this.setState({ loading: 'delete' })
      let datareg = new FormData()
      datareg.append('id', this.state.idLetter)
      axios({
        method: 'post',
        url: `${StaticData.domainIp}/correspondence/delete`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          if (response.status === 200) {
            let elm = await this.refs[`tr_${this.state.idLetter}`]
            await elm.remove()
            await this.setState({ loading: '', idLetter: '', letterNumber: '' })
          } else {
            await this.setState({ loading: '', idLetter: '', letterNumber: '' })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({ loading: '', idLetter: '', letterNumber: '' })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  getCustomFormat (inputValue, isGregorian) {
    if (!inputValue) return ''
    const inputFormat = isGregorian ? 'YYYY/M/D' : 'jYYYY/jM/jD'
    return isGregorian
      ? inputValue.locale('es').format(inputFormat)
      : inputValue.locale('fa').format(inputFormat)
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
                    <td>{data.tell ? data.tell : 'ندارد'}</td>
                    <td>{data.email ? data.email : 'ندارد'}</td>
                    <td>{data.address ? data.address : 'ندارد'}</td>
                    <td>{data.fax ? data.fax : 'ندارد'}</td>
                    <td>{data.created_at}</td>
                    <td className='action justify-content-center'>
                      <Link
                        className='mr-auto ml-auto'
                        to={`/edit-contact-${data.id}`}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <span className='edit'>
                          <EditIcon />
                        </span>
                      </Link>
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
            <div className='col-xl-7 col-lg-7 col-md-12 col-12 align-items-center row m-0 justify-content-end'>
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
        {this.state.letterNumber !== '' && this.state.idLetter !== '' ? (
          <PopupConfirm
            handleSubmit={this.handleDelete}
            close={e => this.setState({ letterNumber: e, idLetter: e })}
            number={this.state.letterNumber}
            label={'شماره نامه'}
            loading={this.state.loading}
          />
        ) : (
          ''
        )}
      </React.Fragment>
    )
  }
}
