import React, { Component } from 'react'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import NotFoundTable from '../table/notFound'
import Loading from '../layout/loading'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import axios from 'axios'
import StaticData from '../staticData'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import Row from '../table/Row'
import AdvanceSearch from '../Customization/advancedSearch'
import EditAttributesIcon from '@material-ui/icons/EditAttributes'
// import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import OutputFilter from '../table/OutputFilter'
export default class ContentsProceedings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      header: [
        { name: 'ردیف', value: 'id' },
        { name: 'موضوع', value: 'subject' },
        { name: 'شماره صورت جلسه', value: 'id' },
        { name: 'تاریخ برگزاری', value: 'holdingTime' },
        { name: 'محل برگزاری', value: 'address' },
        { name: 'روش برگزاری', value: 'meetingType' },
        { name: 'ارکان حاضر در جلسه', value: 'attendees' },
        { name: 'تعداد بندهای صورت جلسه', value: 'ordersNumber' }
      ],
      columns: {},
      open_header: '',
      list: [],
      textUrl: 'searchByFields',
      testObject: {},
      secondText: [],
      textSearch: '',
      row: [],
      contentPerPage: 25,
      page: 1,
      totalLength: 0,
      pageNumber: 1,
      loading: 'table',
      search: ''
    }
  }
  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
    this.props.getReset(this.Reset)
    this.props.FilterReset(this.RemoveFilter)
    this.props.GetFunction(this.handleSearch)
    this.fetchData()
    this.props.getHeader(this.state.header)
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  handleSearch = async text => {
    if (this.state.token) {
      this.setState({ search: text, loading: 'table', textSearch: '' })
      if (text === '') {
        await this.setState({ page: 1 })
      }
      await axios
        .get(
          `${StaticData.domainIp}/meeting/mom/${this.state.page}?contentPerPage=${this.state.contentPerPage}&searchInAll=${text}`,
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
                pageNumber: response.data.content.pageNumber,
                columns: response.data.content.columns
                  ? response.data.content.columns
                  : this.state.columns
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
  fetchData = async (text = null) => {
    if (this.state.token) {
      let url = ''
      if (text !== null) {
        url = `${StaticData.domainIp}/meeting/mom/${this.state.page}?contentPerPage=${this.state.contentPerPage}&${text}`
      } else {
        url = `${StaticData.domainIp}/meeting/mom/${this.state.page}?contentPerPage=${this.state.contentPerPage}`
      }
      this.setState({ loading: 'table', search: '' })
      await this.props.resetSearch()
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            await this.setState({
              totalLength: response.data.content.length,
              row: response.data.content.rows,
              pageNumber: response.data.content.pageNumber,
              columns: response.data.content.columns
                ? response.data.content.columns
                : this.state.columns
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
  RemoveFilter = () => {
    if (this.refs.page && this.refs.contentPerPage) {
      this.setState({ page: 1, contentPerPage: 25, textSearch: '', search: '' })
      this.refs.page.value = 1
      this.refs.contentPerPage.value = 10
    }
  }
  handleClickOutside = event => {
    if (
      this.refs[`_header_${this.state.open_header}`] &&
      !this.refs[`_header_${this.state.open_header}`].contains(event.target)
    ) {
      this.setState({
        open_header: ''
      })
    }
  }
  Reset = async () => {
    let state = this.state
    for (let value in state) {
      if (value.includes('_header_')) {
        state[value] = await false
      }
    }
    state['_listData_'] = await []
    state['_active'] = await ''
    state['objFiltered'] = await {}
    await this.setState(state)
    await this.fetchData()
  }
  _handleClick = async (key, data) => {
    await this.setState({ list: [] })
    if (this.state.columns && this.state.columns[data.value] && data) {
      await this.setState({
        open_header: key,
        list: this.state.columns[data.value].split('__DARA__')
      })
    }
  }
  handleActions = data => {
    let text = ''
    let dbNameList = [],
      listValue = []
    let testObject = this.state.testObject
    // let testObject = {}
    let delimiter = '__DARA__'
    for (let state in this.state) {
      if (state.includes(delimiter)) {
        let dbName = state.split(delimiter)[1]
        let value = state.split(delimiter)[0].split('_header_')[1]
        // testObject[dbName] = value
        if (this.state[state]) {
          // state = state.split(delimiter)
          // dbNameList.push(dbName)
          if (data.value === dbName) {
            listValue.push(value)
            listValue = [...new Set(listValue)]
            testObject[dbName] = listValue.join(delimiter)
          }
        } else if (!this.state[state] && listValue.length === 0) {
          delete testObject[dbName]
        }
      }
    }

    this.setState({ testObject: testObject, loading: 'table' })
    let ListText = []
    for (let txt in testObject) {
      dbNameList.push(txt)
      let _text = `${txt}=${testObject[txt]}`
      ListText.push(_text)
    }
    dbNameList = [...new Set(dbNameList)]
    text = `${dbNameList.join(',')}&${ListText.join('&')}`
    this.setState({ textSearch: text })
    setTimeout(() => {
      if (
        Object.keys(this.state.testObject).length === 0 &&
        this.state.testObject.constructor === Object
      ) {
        this.setState({ textSearch: '' })
        this.fetchData()
      } else {
        this.fetchData(`searchByFields=${this.state.textSearch}`)
      }
      this.setState({ open_header: '' })
    }, 100)
  }
  handleStatus = data => {
    if (data.status === '0') {
      return (
        <Link
          className='mr-auto ml-auto'
          to={`ViewProceedings-${data.id}`}
          target='_blank'
          rel='noreferrer'
        >
          <span className='edit'>
            <VisibilityIcon />
          </span>
        </Link>
      )
    } else if (data.status === '2' && data.canEdit) {
      return (
        <Link
          className='mr-auto ml-auto'
          to={`edit-metting-${data.id}`}
          target='_blank'
          rel='noreferrer'
        >
          <span className='edit'>
            <EditIcon />
          </span>
        </Link>
      )
    } else if (data.status === '1' && data.canEnter) {
      return (
        <Link
          className='mr-auto ml-auto'
          to={`enter-meeting-${data.id}`}
          target='_blank'
          rel='noreferrer'
        >
          <span className='edit'>
            <MeetingRoomIcon />
          </span>
        </Link>
      )
    } else if (data.status === '3' && data.canSign) {
      return (
        <Link
          className='mr-auto ml-auto'
          to={`signature-metting-${data.id}`}
          target='_blank'
          rel='noreferrer'
        >
          <span className='edit'>
            <AssignmentIndIcon />
          </span>
        </Link>
      )
    } else if (data.status === '4' && data.canEdit) {
      return (
        <Link
          className='mr-auto ml-auto'
          to={`edit-enter-${data.id}`}
          target='_blank'
          rel='noreferrer'
        >
          <span className='edit'>
            <EditAttributesIcon />
          </span>
        </Link>
      )
    } else return 'اتمام جلسه'
  }
  render () {
    return (
      <React.Fragment>
        <div className='table persian rtl w-100'>
          <table>
            <thead>
              <tr className='header'>
                {this.state.header.map((data, index) => (
                  <th
                    key={index}
                    className={`${this.handleFilter(data.name)}`}
                    onClick={() => this._handleClick(index, data)}
                    ref={`_header_${index}`}
                  >
                    {data.name}
                    <div className='filter d-inline-block'>
                      <img src='img/Sort_Icon.svg' alt='filter' />
                    </div>
                    {this.state.open_header === index && (
                      <AdvanceSearch
                        index={index}
                        data={data}
                        {...this}
                        rtl={true}
                        handleSelect={(checked, name) =>
                          this.setState({ [name]: checked })
                        }
                      />
                    )}
                  </th>
                ))}
                <th className='action'>عملیات</th>
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
                this.state.row.map((data, index) => (
                  <tr
                    className={this.state._active === index ? '_active' : ''}
                    key={index}
                    ref={`tr_${data.id}`}
                  >
                    <React.Fragment>
                      <Row
                        _active={this.state._active}
                        _index={index}
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
                      <td className='action'>{this.handleStatus(data)}</td>
                    </React.Fragment>
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
                  href={OutputFilter.handleFilter(
                    this.state.textSearch,
                    this.state.search,
                    `${StaticData.domainIp}/meeting/momGetExcel`
                  )}
                  target='_blank'
                  rel='noreferrer'
                  className='xls'
                >
                  <img src='/img/XLS.svg' alt='xls' />
                  خروجی اکسل
                </a>
                <a
                  href={OutputFilter.handleFilter(
                    this.state.textSearch,
                    this.state.search,
                    `${StaticData.domainIp}/meeting/momGetPdf`
                  )}
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
