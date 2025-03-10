import React, { Component } from 'react'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import { Redirect, Link } from 'react-router-dom'
import StaticData from '../../staticData'
import Cookies from 'js-cookie'
import axios from 'axios'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'
import RefreshIcon from '@material-ui/icons/Refresh'
import SearchTable from '../table/SearchTable'
import EditIcon from '@material-ui/icons/Edit'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded'
import Permision from '../../permision/permision'
import VisibilityIcon from '@material-ui/icons/Visibility'
import PrintIcon from '@material-ui/icons/Print'
import ModeCommentRoundedIcon from '@material-ui/icons/ModeCommentRounded'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import NotFoundTable from '../../table/notFound'
import Loading from '../../layout/loading'
import SettingsIcon from '@material-ui/icons/Settings'
import Customization from '../../Customization/customization'
import Row from '../../table/Row'
import UploadInformation from '../../Customization/UploadInformation'
export default class internalTransmital extends Component {
  constructor (props) {
    super(props)
    this.Search = null
    this.state = {
      token: Cookies.get('token'),
      header: [],
      selected: [],
      open: false
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - transmittal`
    document.addEventListener('mousedown', this.handleClickOutside)
    setTimeout(async () => {
      this.state.header.forEach(head => {
        this.setState({
          [`_header_${head.name}`]: true,
          selected: [...this.state.selected, head.name]
        })
      })
    }, 50)
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  // handleSearch = (e) => {
  //     if (this.Search !== null) {
  //         this.Search(e.target.value.trim())
  //     }
  // }
  handleSelect = async (checked, name) => {
    if (this.state.selected.length > 1 || checked) {
      await this.setState({ [name]: checked })
      let array = []
      for (let value in this.state) {
        if (value.includes('_header_')) {
          if (this.state[value]) {
            let name = value.split('_header_')[1]
            array.push(name)
          }
        }
      }
      await this.setState({ selected: array })
    }
  }
  handleButtonClick = () => {
    this.setState(state => {
      return {
        open: !state.open
      }
    })
  }
  handleClickOutside = event => {
    if (this.refs.container && !this.refs.container.contains(event.target)) {
      this.setState({
        open: false
      })
    }
  }
  removeFilter = () => {
    let list = []
    this.state.header.filter(head => list.push(head.name))
    this.setState({ selected: list })
    for (let value in this.state) {
      if (value.includes('_header_')) {
        this.setState({ [value]: true })
      }
    }
  }
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
                <Menu
                  nameRole='secondary_transmittal'
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 header-index pr-0 pl-0'>
                      <div className='row m-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                          <div className='icon-header'>
                            <div className='icon'>
                              <Link to='/Create-Transmital'>
                                <AddCircleIcon />
                                <span>ایجاد کاربرگ</span>
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
                              <span
                                className='item'
                                onClick={this.removeFilter}
                              >
                                <RefreshIcon />
                                <span>حذف فیترها</span>
                              </span>
                            </div>
                            <div
                              className='icon position-relative justify-content-center'
                              ref='container'
                            >
                              <span
                                className='item'
                                onClick={this.handleButtonClick}
                              >
                                <SettingsIcon />
                                <span>سفارشی سازی</span>
                              </span>
                              {this.state.open && (
                                <Customization
                                  {...this}
                                  handleSelect={this.handleSelect}
                                />
                              )}
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
                    <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-end'>
                      <Table
                        GetFunction={e => (this.Search = e)}
                        getHeader={e => this.setState({ header: e })}
                        selected={this.state.selected}
                      />
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
        { name: 'id', value: 'id' },
        { name: 'Letter Number', value: 'letterNo' },
        { name: 'From', value: '_from' },
        { name: 'To', value: '_to' },
        { name: 'CC', value: 'cc' },
        { name: 'Creator', value: 'author' },
        { name: 'Approved By', value: 'approveBy' },
        { name: 'Verify at', value: 'verify_at' },
        { name: 'Created At', value: 'created_at' },
        { name: 'Last Activity Date', value: 'updated_at' }
        // {name : "Action"},
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
      loading: 'table'
    }
  }
  componentDidMount () {
    this.props.GetFunction(this.handleSearch)
    this.fetchData()
    this.props.getHeader(this.state.header)
    window.addEventListener('click', async e => {
      if (this.state.selectNumber !== '') {
        if (
          e.target !== this.refs[`more_${this.state.selectNumber}`] ||
          e.target !== this.refs[`moresvg_${this.state.selectNumber}`]
        ) {
          if (
            e.target === this.refs[`boxMore_${this.state.selectNumber}`] ||
            e.target === this.refs[`titleMore_${this.state.selectNumber}`] ||
            e.target === this.refs[`textMore_${this.state.selectNumber}`] ||
            e.target === this.refs[`mainitemMore_${this.state.selectNumber}`] ||
            e.target ===
              this.refs[
                `itemMore_${this.state.selectNumber}_${this.state.secondSelectNumber}`
              ] ||
            e.target ===
              this.refs[
                `svgItemMore_${this.state.selectNumber}_${this.state.secondSelectNumber}`
              ] ||
            e.target ===
              this.refs[
                `spanItemMore_${this.state.selectNumber}_${this.state.secondSelectNumber}`
              ]
          ) {
            this.setState({ selectNumber: '' })
          } else {
            if (this.state.secondSelectNumber !== '') {
              this.setState({ secondSelectNumber: '' })
            } else {
              this.setState({ selectNumber: '' })
            }
          }
        }
      }
    })
  }
  handleSearch = async text => {
    if (this.state.token) {
      this.setState({ search: text, loading: 'table' })
      await axios
        .get(
          `${StaticData.domainIp}/transmittal/getList/${this.state.page}?contentPerPage=${this.state.contentPerPage}&searchInAll=${text}`,
          {
            headers: {
              Authorization: `Bearer ${this.state.token}`
            }
          }
        )
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            await this.setState({
              totalLength: response.data.content.length,
              row: response.data.content.rows,
              pageNumber: response.data.content.pageNumber
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
  fetchData = async () => {
    if (this.state.token) {
      await axios
        .get(
          `${StaticData.domainIp}/transmittal/getList/${this.state.page}?contentPerPage=${this.state.contentPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${this.state.token}`
            }
          }
        )
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            let permision = new Permision()
            if (
              permision.handlePermision(response.data.role, 'main_transmittal')
            ) {
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
  handleFilter = name => {
    if (this.props.selected.length === 0) {
      return ''
    } else {
      if (this.props.selected.includes(name)) {
        return ''
      } else {
        return 'd-none'
      }
    }
  }
  handlePositionBox = key => {
    const half = this.state.contentPerPage / 2
    if (key >= half) {
      return 'bottomBox'
    } else return ''
  }
  handlePositionSecondBox = (key, index) => {
    const halfKey = this.state.contentPerPage / 2,
      halfIndex = parseInt(index / 2)
    if (key >= halfKey) {
      return 'bottomBox'
    } else if (key >= halfIndex) {
      return 'middleBox'
    } else return ''
  }
  render () {
    return (
      <React.Fragment>
        <div className='table transmittal w-100'>
          <table>
            <thead>
              <tr className='header'>
                {this.state.header.map((data, index) => (
                  <th key={index} className={`${this.handleFilter(data.name)}`}>
                    {data.name}
                    <div className='filter d-inline-block'>
                      <img src='img/Sort_Icon.svg' alt='filter' />
                    </div>
                  </th>
                ))}
                <th className='action'>action</th>
              </tr>
            </thead>
            <tbody>
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
                this.state.row.map((data, key) => (
                  <tr
                    className={this.state._active === key ? '_active' : ''}
                    key={key}
                  >
                    <Row
                      _active={this.state._active}
                      _index={key}
                      handleState={(name, value) =>
                        this.setState({ [name]: value })
                      }
                      data={data}
                      row={Object.keys(this.state.header).map(_ => {
                        return this.state.header[_].value
                      })}
                      handleFilter={this.handleFilter}
                      header={this.state.header}
                      objFiltered={this.state.objFiltered}
                    />
                    <td
                      className={`action justify-content-start ${
                        this.state.selectNumber === key ? 'active' : ''
                      }`}
                    >
                      <span
                        className='more'
                        ref={`more_${key}`}
                        onClick={() => this.GetMore(key)}
                      >
                        <MoreVertRoundedIcon ref={`moresvg_${key}`} />
                      </span>
                      {data.status === '0' ? (
                        <Link to={`/editTransmittal-${data.id}`}>
                          <span className='edit'>
                            <EditIcon />
                          </span>
                        </Link>
                      ) : (
                        <Link
                          to={{
                            pathname: `/transmittal-${data.id}`,
                            state: { status: 2 }
                          }}
                        >
                          <span className='edit'>
                            <ModeCommentRoundedIcon />
                          </span>
                        </Link>
                      )}
                      <Link
                        to={{
                          pathname: `/transmittal-${data.id}`,
                          state: { status: 1 }
                        }}
                      >
                        <span className='edit'>
                          <VisibilityIcon />
                        </span>
                      </Link>

                      {data.status === '1' ? (
                        <a
                          href={`${StaticData.domainIp}/transmittal/print/${data.id}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <span className='edit'>
                            <PrintIcon />
                          </span>
                        </a>
                      ) : (
                        <span className='edit disabled'>
                          <PrintIcon />
                        </span>
                      )}

                      {this.state.selectNumber === key ? (
                        <div
                          ref={`boxMore_${key}`}
                          className={`box-more ${this.handlePositionBox(key)}`}
                        >
                          <div
                            ref={`titleMore_${key}`}
                            className='title w-100 pl-0 pr-4 text-left'
                          >
                            <h4 ref={`textMore_${key}`} className='w-100'>
                              {this.state.firstData.length > 0
                                ? `Transmittal ${this.state.documentSelected}`
                                : 'اطلاعات ثبت نشده است'}
                            </h4>
                          </div>
                          <div
                            ref={`mainitemMore_${key}`}
                            className='main-item'
                          >
                            {this.state.firstData.map((data2, index) => (
                              <div
                                key={index}
                                ref={`itemMore_${key}_${index}`}
                                className={`item ${
                                  this.state.secondSelectNumber === index
                                    ? 'active'
                                    : ''
                                }`}
                                onClick={() =>
                                  this.GetSecondData(data, index, key)
                                }
                              >
                                <ChevronLeftRoundedIcon
                                  ref={`svgItemMore_${key}_${index}`}
                                />
                                <span ref={`spanItemMore_${key}_${index}`}>
                                  {data2.documentNumber} : {data2.revision}
                                </span>
                                {this.state.secondSelectNumber === index ? (
                                  <div
                                    className={`second-box ${this.handlePositionSecondBox(
                                      key,
                                      this.state.firstData.length
                                    )}`}
                                  >
                                    <div className='col-12 p-0 row m-0'>
                                      <div className='col-6'>
                                        <div className='item'>
                                          <span>REV</span>
                                          <label>
                                            {this.state.secondData.revision}
                                          </label>
                                          {data2.attachment ? (
                                            <a
                                              href={
                                                data2.attachment['0']
                                                  ? data2.attachment['0']
                                                  : '#'
                                              }
                                              target='_blank'
                                              rel='noreferrer'
                                            >
                                              مشاهده جزئیات
                                            </a>
                                          ) : (
                                            ''
                                          )}
                                        </div>
                                        <div className='item'>
                                          <span>Transmittal No.</span>
                                          <label>{data.id}</label>
                                          <a
                                            href={`/transmittal-${data.id}`}
                                            target='_blank'
                                            rel='noreferrer'
                                          >
                                            مشاهده جزئیات
                                          </a>
                                        </div>
                                        <div className='item'>
                                          <span>Comment No.</span>
                                          <label>
                                            {
                                              this.state.secondData
                                                .commentNumber
                                            }
                                          </label>
                                        </div>
                                        <div className='item'>
                                          <span>Reply No.</span>
                                          <label>
                                            {this.state.secondData.replyNumber}
                                          </label>
                                        </div>
                                        <div className='item'>
                                          <span>Comment Status</span>
                                          <label>
                                            {
                                              this.state.secondData
                                                .commentStatus
                                            }
                                          </label>
                                        </div>
                                      </div>
                                      <div className='col-6'>
                                        <div className='item'>
                                          <span>POI</span>
                                          <label>
                                            {this.state.secondData.poi}
                                          </label>
                                        </div>
                                        <div className='item'>
                                          <span>Date</span>
                                          <label>
                                            {this.state.secondData.date}
                                          </label>
                                        </div>
                                        <div className='item'>
                                          <span>Comment Date</span>
                                          <label>
                                            {this.state.secondData.commentDate}
                                          </label>
                                        </div>
                                        <div className='item'>
                                          <span>Reply Date</span>
                                          <label>
                                            {this.state.secondData.replyDate}
                                          </label>
                                        </div>
                                        {/* <div className='item'>
                                                                    <span>ReplyStatus</span>
                                                                    <label>{this.state.secondData.replyStatus}</label>
                                                                </div> */}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  ''
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
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
            <div className='col-xl-5 col-lg-5 col-md-12 col-12 d-flex align-items-center'>
              <div className='link-footer'>
                <a
                  href={`${StaticData.domainIp}/transmittal/exportExcel`}
                  target='_blank'
                  rel='noreferrer'
                  className='xls'
                >
                  <img src='/img/XLS.svg' alt='xls' />
                  خروجی اکسل
                </a>
                <a
                  href={`${StaticData.domainIp}/transmittal/exportPdf`}
                  target='_blank'
                  rel='noreferrer'
                  className='pdf'
                >
                  <img src='/img/PDF.svg' alt='PDF' />
                  خروجی pdf
                </a>
              </div>
            </div>
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
      </React.Fragment>
    )
  }
}
