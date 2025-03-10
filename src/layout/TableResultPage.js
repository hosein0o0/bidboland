import React, { Component } from 'react'
import Loading from '../layout/loading'
import AdvanceSearch from '../Customization/advancedSearch'
import NotFoundTable from '../table/notFound'
import Row from '../table/Row'
import OutputFilter from '../table/OutputFilter'
import Permision from '../permision/permision'
// import StaticData from '../staticData'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Cookies from 'js-cookie'
// import { Link } from 'react-router-dom'
// import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import StaticData from '../staticData'
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded'
import AssignmentReturnedRoundedIcon from '@material-ui/icons/AssignmentReturnedRounded'
export default class TableResultPage extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      header: [],
      row: [],
      contentPerPage: 25,
      page: 1,
      totalLength: 0,
      pageNumber: 1,
      search: '',
      loading: 'table',
      letterNumber: '',
      idLetter: '',
      columns: {},
      open_header: '',
      list: [],
      textUrl: 'searchByFields',
      testObject: {},
      secondText: [],
      textSearch: '',
      role: null,
      numSelect: ''
    }
  }
  componentDidMount () {
    // this.fetchData()
    this.loadData()
    document.addEventListener('mousedown', this.handleClickOutside)
    this.props.getThat(this)
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      // this.ResetTable()
    }
  }
  ResetTable = () => {
    this.setState({
      header: [],
      totalLength: 0,
      row: [],
      pageNumber: 1,
      columns: {}
    })
  }
  loadData = () => {
    const data = this.props.handleData()
    this.setState({ loading: '' })
    if (data.detail) {
      this.setState({
        header: data.header,
        totalLength: data.detail.length,
        row: data.detail.rows,
        pageNumber: data.detail.pageNumber,
        columns: data.detail.columns ? data.detail.columns : this.state.columns,
        loading: ''
      })
    }
  }
  handleSearch = async text => {
    const data = this.props.handleData()
    if (this.state.token && data) {
      this.setState({ search: text, loading: 'table', textSearch: '' })
      if (text === '') {
        await this.setState({ page: 1 })
      }
      const baseUrl = `${StaticData.domainIp}/AdvanceSearch/${data.url}/${this.state.page}?contentPerPage=${this.state.contentPerPage}&equipment=${data.equipment}&searchInAll=${text}`
      await axios
        .get(baseUrl, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
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
    const data = this.props.handleData()
    if (this.state.token && data) {
      let url = ''
      const baseUrl = `${StaticData.domainIp}/AdvanceSearch/${data.url}/${this.state.page}?contentPerPage=${this.state.contentPerPage}&equipment=${data.equipment}`
      if (text !== null) {
        url = `${baseUrl}&${text}`
      } else {
        url = `${baseUrl}`
      }
      await this.setState({
        loading: 'table',
        search: ''
      })
      await this.props.handleState('search', '')
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(async response => {
          await this.setState({ loading: '' })
          if (response.status === 200) {
            await this.setState({
              totalLength: response.data.content.length,
              row: response.data.content.rows,
              pageNumber: response.data.content.pageNumber,
              role: response.data.role,
              columns: response.data.content.columns
                ? response.data.content.columns
                : this.state.columns,
              header: data.header
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
    state['_listData_'] = []
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
  render () {
    const data = this.props.handleData()
    if (data) {
      return (
        <React.Fragment>
          <div className='table w-100'>
            <table>
              <thead>
                <tr
                  className={`header ${
                    this.state.loading === 'table' ||
                    this.state.row.length === 0
                      ? 'd-block not-radius'
                      : ''
                  }`}
                >
                  {this.state.header.map((data, index) => (
                    <th
                      key={index}
                      // className={`${this.handleFilter(data.name)}`}
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
                          rtl={false}
                          handleSelect={(checked, name) =>
                            this.setState({ [name]: checked })
                          }
                        />
                      )}
                    </th>
                  ))}
                  {this.props.state.select === 1 ? (
                    <th className='action'>action</th>
                  ) : (
                    ''
                  )}
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
                        // download={data.url ? 'متن' : null}
                        // IndependentLink={data.url ? data.url : 'empty'}
                      />
                      {this.props.state.select === 1 ? (
                        <td
                          className='action justify-content-center'
                          ref={`action_${index}`}
                        >
                          {this.Permision.handlePermision(
                            this.state.role,
                            'pfd_download'
                          ) && (
                            <React.Fragment>
                              {data.attachment && (
                                <a
                                  href={
                                    data.attachment[0]
                                      ? data.attachment[0]
                                      : '#/'
                                  }
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  <span
                                    className='edit'
                                    //  onClick={() => this.setState({ numSelect: index })}
                                  >
                                    <GetAppRoundedIcon />
                                  </span>
                                </a>
                              )}

                              {data.native && (
                                <a
                                  href={data.native[0] ? data.native[0] : '#/'}
                                >
                                  <span
                                    className='edit'
                                    //  onClick={() => this.setState({ numSelect: index })}
                                  >
                                    <AssignmentReturnedRoundedIcon />
                                  </span>
                                </a>
                              )}
                            </React.Fragment>
                          )}
                        </td>
                      ) : (
                        ''
                      )}
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
                      `${StaticData.domainIp}/${data.url}/exportExcel?equipment=${data.equipment}`
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
                      `${StaticData.domainIp}/${data.url}/exportPdf?equipment=${data.equipment}`
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
}
