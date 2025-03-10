import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import AdvanceSearch from '../Customization/advancedSearch'
import Loading from '../layout/loading'
import NotFoundTable from '../table/notFound'
import Row from '../table/Row'
import OutputFilter from '../table/OutputFilter'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
// import { Link } from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility'
import PrintIcon from '@material-ui/icons/Print'
import Permision from '../permision/permision'
import DeleteIcon from '@material-ui/icons/Delete'
import PopupConfirm from '../layout/popupConfirm'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DeterminantStatus from './DeterminantStatus'
import handleCheckText from '../handleCheckText'
export default class TableTSR extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      header: [
        { name: 'ردیف', value: 'id' },
        { name: 'شماره درخواست', value: 'tsr_no' },
        { name: 'موضوع', value: 'subject' },
        { name: 'تاریخ درخواست', value: 'created_at', notDefault: true },
        { name: 'اقدام کننده', value: 'author' },
        { name: 'ناحیه', value: 'area', notDefault: true },
        { name: 'واحد عملیاتی', value: 'operation_unit', notDefault: true },
        { name: 'شماره دستگاه', value: 'machine_no' },
        {
          name: 'موقعیت TSR',
          value: 'status',
          secondValue: 'status',
          hasSecondValue: true,
          haveIf: 'verified',
          valueIf: '0',
          resultValue: 'بسته شده'
        },
        {
          name: 'آخرین وضعیت',
          value: '-'
        },
        {
          name: 'آخرین مرحله تائید شده',
          value: 'status',
          secondValue: 'page',
          hasSecondValue: true
        },
        { name: 'مرحله در دست بررسی', value: '-', notDefault: true },
        { name: 'دلیل ویرایش', value: '-', notDefault: true },
        { name: 'دلیل توقف', value: '-', notDefault: true },
        { name: 'دلیل رد شدن', value: '-', notDefault: true }
      ],
      row: [],
      contentPerPage: 25,
      page: 1,
      totalLength: 0,
      pageNumber: 1,
      search: '',
      loading: 'table',
      letterNumber: '',
      idTsr: '',
      columns: {},
      open_header: '',
      list: [],
      textUrl: 'searchByFields',
      testObject: {},
      secondText: [],
      textSearch: '',
      role: null,
      number: null,
      determinant: false,
      deterSuggest: [
        { value: 'متوقف (کنترل شده)', label: 'متوقف (کنترل شده)' },
        { value: 'درحال انجام', label: 'درحال انجام' },
        { value: 'بسته شده', label: 'بسته شده' },
        { value: 'متوقف (خارج از کنترل)', label: 'متوقف (خارج از کنترل)' }
      ],
      pageAdvance: 1,
      totalAdvance: 0,
      secondData: {}
    }
  }
  componentDidMount () {
    this.props.getReset(this.Reset)
    this.props.FilterReset(this.RemoveFilter)
    this.props.GetFunction(this.handleSearch)
    this.fetchData()
    this.props.getHeader(this.state.header)
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  handleSearch = async text => {
    const {
      token,
      page,
      contentPerPage,
      textSearch,
      columns,
      search
    } = this.state
    if (this.state.token) {
      this.setState({ search: text, loading: 'table' })
      if (text === '') {
        await this.setState({ page: 1 })
      }
      let url = ''
      if (textSearch) {
        url = `${
          StaticData.domainIp
        }/tsr/getList/${page}?contentPerPage=${contentPerPage}&searchInAll=${
          text ? text : ''
        }&searchByFields=${textSearch}`
      } else {
        url = `${
          StaticData.domainIp
        }/tsr/getList/${page}?contentPerPage=${contentPerPage}&searchInAll=${
          text ? text : ''
        }`
      }
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`
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
              await this.handleSearch(search)
            } else {
              await this.setState({
                totalLength: response.data.content.length,
                row: response.data.content.rows,
                pageNumber: response.data.content.pageNumber,
                columns: response.data.content.columns
                  ? response.data.content.columns
                  : columns
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
      const { token, page, contentPerPage, search } = this.state
      let url = ''
      if (text !== null) {
        url = `${
          StaticData.domainIp
        }/tsr/getList/${page}?contentPerPage=${contentPerPage}&searchInAll=${
          search ? search : ''
        }&${text}`
      } else {
        url = `${
          StaticData.domainIp
        }/tsr/getList/${page}?contentPerPage=${contentPerPage}&searchInAll=${
          search ? search : ''
        }`
      }
      await this.setState({
        loading: 'table'
        //  search: ''
      })
      // await this.props.resetSearch()
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(async response => {
          if (response.status === 200) {
            const { content } = response.data
            await this.setState({
              totalLength: content.length ? content.length : 0,
              row: content.rows ? content.rows : [],
              pageNumber: content.pageNumber ? content.pageNumber : 0,
              columns: content.columns ? content.columns : this.state.columns,
              role: response.data.role
            })
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
  }
  changeRowNumber = async e => {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
      // loading: 'table'
    })

    if (e.target.name === 'contentPerPage') {
      this.setState({ page: 1 })
      if (this.refs.page) {
        this.refs.page.value = 1
      }
      if (this.refs.contentPerPage) {
        this.refs.contentPerPage.value = parseInt(e.target.value)
      }
    } else if (e.target.name === 'page') {
      if (this.refs.contentPerPage) {
        this.refs.contentPerPage.value = this.state.contentPerPage
      }
      if (this.refs.page) {
        this.refs.page.value = parseInt(e.target.value)
      }
    }
    setTimeout(() => {
      if (this.state.textSearch !== '') {
        this.fetchData(`searchByFields=${this.state.textSearch}`)
      } else {
        this.fetchData()
      }
    }, 100)
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
  // handleAttachment = data => {
  //   let allData = []
  //   for (let value in data) {
  //     allData.push(data[value])
  //   }
  //   return allData
  // }
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
  RemoveFilter = async () => {
    if (this.refs.page && this.refs.contentPerPage) {
      this.refs.page.value = await 1
      this.refs.contentPerPage.value = await 25
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
    let objState = await {
      page: 1,
      contentPerPage: 25,
      textSearch: '',
      open_header: '',
      list: [],
      textUrl: 'searchByFields',
      testObject: {},
      secondText: [],
      pageAdvance: 1,
      totalAdvance: 0,
      secondData: {},
      _active: '',
      search: '',
      objFiltered: {},
      _listData_: []
    }
    let merge = await { ...state, ...objState }
    await this.setState(merge)
    await this.fetchData()
  }
  _handleClick = async (key, data, checkAdd) => {
    const nameDataBase = await data.value
    const {
      open_header,
      token,
      list,
      pageAdvance,
      textSearch,
      search
    } = await this.state
    if (token) {
      await this.setState({
        loading: 'advance',
        list: !checkAdd ? [] : list,
        open_header: !checkAdd ? key : open_header
      })
      let url
      let secondUrl = `searchByFields=${textSearch}`
      if (handleCheckText(textSearch)) {
        url = `${StaticData.domainIp}/tsr/getAutoFill/${nameDataBase}/page/${pageAdvance}?searchInAll=${search}&${secondUrl}`
      } else {
        url = `${
          StaticData.domainIp
        }/tsr/getAutoFill/${nameDataBase}/page/${pageAdvance}${
          handleCheckText(search) ? `?searchInAll=${search}` : ''
        }`
      }
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(async response => {
          const { content } = response.data
          this.setState({ loading: '' })
          if (response.status === 200) {
            if (content) {
              let list = [...new Set(content.fields.split('__DARA__'))]
              const handleList = () => {
                if (checkAdd) {
                  let array = this.state.list ? this.state.list : []
                  array = array.concat(list)
                  return array
                } else {
                  return list
                }
              }
              await this.setState({
                list: handleList(),
                // pageAdvance: content.pageNo,
                totalAdvance: content.total
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
  handleSearchAdvance = async text => {
    const checkheader = this.state.header[this.state.open_header]
    if (checkheader) {
      const nameDataBase = checkheader.value
      const { pageAdvance, search, token, textSearch } = this.state
      if (this.state.token) {
        this.setState({ loading: 'advance' })
        let secondUrl = `searchByFields=${textSearch}`
        let url
        if (handleCheckText(textSearch)) {
          url = `${
            StaticData.domainIp
          }/tsr/getAutoFill/${nameDataBase}/page/${pageAdvance}?searchInField=${
            text ? text : ''
          }&searchInAll=${search}&${secondUrl}`
        } else {
          url = `${
            StaticData.domainIp
          }/tsr/getAutoFill/${nameDataBase}/page/${pageAdvance}?searchInField=${
            text ? text : ''
          }&searchInAll=${search}`
        }
        await axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(async response => {
            const { content } = response.data
            this.setState({ loading: '' })
            if (response.status === 200) {
              if (content) {
                let list = [...new Set(content.fields.split('__DARA__'))]
                await this.setState({
                  list: list,
                  totalAdvance: content.total
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
            testObject[dbName] = listValue.join('*')
          }
        } else if (!this.state[state] && listValue.length === 0) {
          delete testObject[dbName]
        }
      }
    }

    this.setState({ testObject: testObject, loading: '' })
    let ListText = []
    for (let txt in testObject) {
      dbNameList.push(txt)
      let _text = `${txt}=${testObject[txt]}`
      ListText.push(_text)
    }
    dbNameList = [...new Set(dbNameList)]
    // text = `${dbNameList.join(',')}&${ListText.join('&')}`
    text = `${ListText.join('|$')}`
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
      this.setState({ open_header: '', pageAdvance: 1 })
    }, 100)
  }
  handleDelete = async () => {
    const { idTsr, token } = this.state
    const url = `${StaticData.domainIp}/tsr/delete/${idTsr}`
    this.setState({ loading: 'delete' })
    await axios({
      method: 'post',
      url: url,
      headers: {
        Authorization: token ? `Bearer ${token}` : null
      }
    })
      .then(async response => {
        await this.setState({
          idTsr: '',
          number: '',
          loading: ''
        })
        if (response.status === 200) {
          await Notification.notify(Message.text(927), 'success')
          let elm = this.refs[`tr_${idTsr}`]
          if (elm) {
            elm.remove()
          }
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        this.setState({ loading: 'delete', number: '', idTsr: '' })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  handleState = (name, value) => {
    if (name && value) {
      this.setState({ [name]: value })
    } else {
      this.setState(name)
    }
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
                    ref={`_header_${index}`}
                  >
                    <span
                      className='head-click'
                      onClick={() => {
                        this.setState({ loading: 'advance' })
                        this._handleClick(index, data)
                      }}
                    >
                      {data.name}
                      <div className='filter d-inline-block'>
                        <img src='img/Sort_Icon.svg' alt='filter' />
                      </div>
                    </span>
                    {this.state.open_header === index && (
                      <AdvanceSearch
                        className={index === 0 ? 'first' : ''}
                        index={index}
                        data={data}
                        {...this}
                        rtl={true}
                        handleSelect={(checked, name) =>
                          this.setState({ [name]: checked })
                        }
                        bigSearch={true}
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
                      // handleAttachment={this.handleAttachment}
                      // link={['pictures', 'attachments']}
                    />
                    <td className='action justify-content-center'>
                      {this.Permision.handlePermision(
                        this.state.role,
                        'tsr_show'
                      ) && (
                        <a className='mr-auto ml-auto' href={`tsr-${data.id}`}>
                          <span className='edit'>
                            <VisibilityIcon />
                          </span>
                        </a>
                      )}
                      {this.Permision.handlePermision(
                        this.state.role,
                        'tsr_print'
                      ) && (
                        <a
                          className='mr-auto ml-auto'
                          href={`/tsr/print/${data.id}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <span className='edit'>
                            <PrintIcon />
                          </span>
                        </a>
                      )}
                      {this.Permision.handlePermision(
                        this.state.role,
                        'tsr_delete'
                      ) ? (
                        <span
                          className='delete mr-1 ml-1'
                          onClick={() =>
                            this.setState({
                              number: data.tsr_no,
                              idTsr: data.id
                            })
                          }
                        >
                          <DeleteIcon />
                        </span>
                      ) : (
                        ''
                      )}
                      <span
                        className='edit'
                        onClick={() => this.setState({ determinant: true })}
                      >
                        <MoreHorizIcon />
                      </span>
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
            className={`footer-table row mr-0 ml-0 w-100 justify-content-end ${
              this.state.loading === 'table' ? 'd-none' : ''
            }`}
          >
            <div className='col-xl-5 col-lg-5 col-md-12 col-12 d-flex align-items-center'>
              <div className='link-footer'>
                {this.Permision.handlePermision(
                  this.state.role,
                  'tsr_export'
                ) && (
                  <a
                    href={OutputFilter.handleFilter(
                      this.state.textSearch,
                      this.state.search,
                      `${StaticData.domainIp}/tsr/exportExcel`
                    )}
                    target='_blank'
                    rel='noreferrer'
                    className='xls'
                  >
                    <img src='/img/XLS.svg' alt='xls' />
                    خروجی اکسل
                  </a>
                )}
                {this.Permision.handlePermision(
                  this.state.role,
                  'tsr_export'
                ) && (
                  <a
                    href={OutputFilter.handleFilter(
                      this.state.textSearch,
                      this.state.search,
                      `${StaticData.domainIp}/tsr/exportPdf`
                    )}
                    target='_blank'
                    rel='noreferrer'
                    className='pdf'
                  >
                    <img src='/img/PDF.svg' alt='PDF' />
                    خروجی pdf
                  </a>
                )}
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
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                    <option value={500}>500</option>
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
        {this.state.number && this.state.idTsr ? (
          <PopupConfirm
            handleSubmit={this.handleDelete}
            close={e => this.setState({ number: e, idTsr: e })}
            number={this.state.number}
            label={'TSR'}
            loading={this.state.loading}
          />
        ) : (
          ''
        )}
        {this.state.determinant && <DeterminantStatus {...this} />}
      </React.Fragment>
    )
  }
}
