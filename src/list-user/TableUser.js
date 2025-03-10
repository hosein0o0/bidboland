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
// import OutputFilter from '../table/OutputFilter'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import EditIcon from '@material-ui/icons/Edit'
import Permision from '../permision/permision'
import handleCheckText from '../handleCheckText'
import FooterTable from '../table/FooterTable'
export default class TableUser extends Component {
  constructor(props) {
    super(props)
    this.Permision = new Permision()
    this.Elm = {}
    this.state = {
      token: Cookies.get('token'),
      header: [
        { name: 'شماره', value: 'id' },
        { name: 'نام', value: 'first_name' },
        { name: 'نام خانوادگی', value: 'last_name' },
        { name: 'کد پرسنلی', value: 'personnel_code' },
        { name: 'شماره همراه', value: 'mobile' },
        { name: 'ایمیل', value: 'email' },
        { name: 'تاریخ ثبت', value: 'created_at_date' },
        { name: 'سمت سازمانی', value: 'title' },
        { name: 'کد پروژه', value: 'project_code' },
        { name: 'امضا', value: 'sign', img: true }
      ],
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
      pageAdvance: 1,
      totalAdvance: 0,
      secondData: {}
    }
  }
  componentDidMount() {
    this.props.getReset(this.Reset)
    this.props.FilterReset(this.RemoveFilter)
    this.props.GetFunction(this.handleSearch)
    this.fetchData()
    this.props.getHeader(this.state.header)
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  handleClickOutside = event => {
    const { open_header } = this.state
    if (
      this.refs[`_header_${open_header}`] &&
      !this.refs[`_header_${open_header}`].contains(event.target)
    ) {
      this.setState({
        open_header: ''
      })
    }
  }
  handleSearch = async text => {
    const { token, page, contentPerPage, textSearch } = this.state
    if (token) {
      this.setState({ search: text, loading: 'table' })
      if (text === '') {
        await this.setState({ page: 1 })
      }
      // textSearch
      let url = ''
      if (textSearch) {
        url = `${StaticData.domainIp
          }/user/list/${page}?contentPerPage=${contentPerPage}&searchInAll=${text ? text : ''
          }&searchByFields=${textSearch}`
      } else {
        url = `${StaticData.domainIp
          }/user/list/${page}?contentPerPage=${contentPerPage}&searchInAll=${text ? text : ''
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
              await this.handleSearch(this.state.search)
            } else {
              await this.setState({
                totalLength: response.data.content.length,
                row: response.data.content.rows,
                pageNumber: response.data.content.pageNumber,
                role: response.data.role
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
    const { token, page, contentPerPage, search } = this.state
    if (token) {
      let url = ''
      if (text !== null) {
        url = `${StaticData.domainIp
          }/user/list/${page}?contentPerPage=${contentPerPage}&searchInAll=${search ? search : ''
          }&${text}`
      } else {
        url = `${StaticData.domainIp
          }/user/list/${page}?contentPerPage=${contentPerPage}&searchInAll=${search ? search : ''
          }`
      }
      await this.setState({
        loading: 'table'
        // search: search
      })
      // await this.props.resetSearch()
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(async response => {
          await this.setState({
            loading: '',
            row: [],
            totalLength: 0,
            pageNumber: 0
          })
          if (response.status === 200) {
            const data = await response.data
            const content = await data.content
            await this.setState({
              totalLength: content.length ? content.length : 0,
              row: content.rows ? content.rows : [],
              pageNumber: content.pageNumber ? content.pageNumber : 0,
              role: data.role
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
    this.setState({
      [e.target.name]: parseInt(e.target.value)
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
  handleAttachment = data => {
    let allData = []
    for (let value in data) {
      allData.push(data[value])
    }
    return allData
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
  RemoveFilter = async () => {
    if (this.refs.page && this.refs.contentPerPage) {
      this.refs.page.value = await 1
      this.refs.contentPerPage.value = await 25
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
      search: '',
      _active: '',
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
        url = `${StaticData.domainIp}/user/getAutoFill/${nameDataBase}/page/${pageAdvance}?searchInAll=${search}&${secondUrl}`
      } else {
        url = `${StaticData.domainIp}/user/getAutoFill/${nameDataBase}/page/${pageAdvance}?searchInAll=${search}`
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
          url = `${StaticData.domainIp
            }/user/getAutoFill/${nameDataBase}/page/${pageAdvance}?searchInField=${text ? text : ''
            }&searchInAll=${search}&${secondUrl}`
        } else {
          url = `${StaticData.domainIp
            }/user/getAutoFill/${nameDataBase}/page/${pageAdvance}?searchInField=${text ? text : ''
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
  GetMore = async (key, documentNumber) => {
    await this.setState({
      selectNumber: key,
      firstData: [],
      documentSelected: ''
    })
    if (this.state.token) {
      await axios
        .get(
          `${StaticData.domainIp}/user/getDocumentRevisions?documentNumber=${documentNumber}`,
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
              documentSelected: documentNumber
            })
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(async err => {
          await this.setState({ selectNumber: key })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  GetSecondData = async (data, index, key) => {
    if (this.state.token) {
      const { revision, documentNumber } = data
      this.setState({
        selectNumber: key,
        secondData: {},
        secondSelectNumber: '',
        revision: revision
      })
      const url = `/user/getDocumentRevisionDetail?documentNumber=${documentNumber}&revision=${revision}`
      await axios
        .get(`${StaticData.domainIp}/${url}`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
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
  handleCheck = list => {
    if (list) {
      if (list.length) {
        return true
      } else return false
    }
    return false
  }
  handleState = (name, value) => {
    if (name && value) {
      this.setState({ [name]: value })
    } else {
      this.setState(name)
    }
  }
  handleRefs = (name, elm) => {
    this.Elm[name] = elm
  }
  render() {
    return (
      <React.Fragment>
        <div className='table w-100 persian rtl'>
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
                      className='IranSans_Bold_FA'
                      onClick={() =>
                        !data.img && this._handleClick(index, data)
                      }
                    >
                      {data.name}
                    </span>
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
                        bigSearch={true}
                      />
                    )}
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
                    ref={`tr_${data.id}`}
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
                      handleAttachment={this.handleAttachment}
                      objFiltered={this.state.objFiltered}
                    // link={['pictures', 'attachments']}
                    />
                    <td className='action'>
                      {this.Permision.handlePermision(this.state.role, '') && (
                        <a
                          className='mx-1'
                          href={`Edit-User-${data.id}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <span className='edit'>
                            <EditIcon />
                          </span>
                        </a>
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
            className={`footer-table row mr-0 ml-0 w-100 ${this.state.loading === 'table' ? 'd-none' : ''
              }`}
          >
            <FooterTable
              {...this}
              xls={`user/exportExcel`}
              xlsName=''
              pdf={`user/exportPdf`}
              pdfName=''
            />
            {/* <div className='col-xl-4 col-lg-4 col-md-12 col-12 d-flex align-items-center'>
              <div className='link-footer'>
                {this.Permision.handlePermision(this.state.role, '') && (
                  <a
                    href={OutputFilter.handleFilter(
                      this.state.textSearch,
                      this.state.search,
                      `${StaticData.domainIp}/user/exportExcel`
                    )}
                    target='_blank'
                    rel='noreferrer'
                    className='xls'
                  >
                    <img src='/img/XLS.svg' alt='xls' />
                    خروجی اکسل
                  </a>
                )}
                {this.Permision.handlePermision(this.state.role, '') && (
                  <a
                    href={OutputFilter.handleFilter(
                      this.state.textSearch,
                      this.state.search,
                      `${StaticData.domainIp}/user/exportPdf`
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
            </div> */}
            <div className='col-xl-8 col-lg-8 col-md-12 col-12 align-items-center row m-0 justify-content-end'>
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
