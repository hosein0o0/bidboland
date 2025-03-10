import React, { Component } from 'react'
import Loading from '../layout/loading'
import AdvanceSearch from '../Customization/advancedSearch'
import NotFoundTable from '../table/notFound'
import Row from '../table/Row'
// import OutputFilter from '../table/OutputFilter'
import Permision from '../permision/permision'
import StaticData from '../staticData'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Cookies from 'js-cookie'
// import { Link } from 'react-router-dom'
// import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import getCustomFormat from '../getCustomFormat'
import handleString from '../handleString'
export default class TableNotification extends Component {
  constructor (props) {
    super(props)
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      headerTagName: [],
      header: [],
      row: [],
      contentPerPage: 25,
      page: 1,
      totalLength: 0,
      pageNumber: 1,
      search: '',
      loading: '',
      columns: {},
      open_header: '',
      list: [],
      textUrl: 'searchByFields',
      testObject: {},
      secondText: [],
      textSearch: '',
      role: null,
      table_id: '',
      advandeText: '',
      legends: {},
      page_title: ''
    }
  }
  async componentDidMount () {
    await this.props.getReset(this.Reset)
    await this.props.FilterReset(this.RemoveFilter)
    await this.props.GetFunction(this.handleSearch)
    // await this.props.getFetch(this.fetchData)
    await document.addEventListener('mousedown', this.handleClickOutside)
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    await this.setState({ table_id: id })
    await this.props.handleAdvande(this.handleAdvande)
    await this.props.getFetch(this.fetchData)
    await this.fetchData()
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  async componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
    }
  }
  handleSearch = async text => {
    if (this.state.token) {
      this.setState({ search: text, loading: 'table', textSearch: '' })
      if (text === '') {
        await this.setState({ page: 1 })
      }
      await axios
        .get(
          `${StaticData.domainIp}/dynamicIndex/getDetail/${this.state.table_id}/${this.state.page}?contentPerPage=${this.state.contentPerPage}&searchInAll=${text}`,
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
  fetchData = async (text = null, advande = null) => {
    if (this.state.token) {
      await this.setState({ loading: 'table' })
      const baseUrl = await `${StaticData.domainIp}/dynamicIndex/getDetail/${this.state.table_id}/Page/${this.state.page}?contentPerPage=${this.state.contentPerPage}`
      let url = await ''
      if (text !== null && advande !== null) {
        url = await `${baseUrl}&${text}&${advande}`
      } else if (text === null && advande === null) {
        url = await baseUrl
      } else if (text !== null) {
        url = await `${baseUrl}&${text}`
      } else if (advande !== null) {
        url = await `${baseUrl}&${advande}`
      }
      await this.setState({ loading: 'table', search: '' })
      await this.props.resetSearch()
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(async response => {
          if (response.data.content.page_title) {
            document.title = `${StaticData.Title} - ${response.data.content.page_title}`
          }
          this.setState({ loading: '' })
          if (response.status === 200) {
            let first = [{ name: 'id', value: 'id' }]
            let firstTagName = [{ name: '', value: '' }]
            let second = Object.keys(response.data.content.column_info).map(
              data => {
                let obj = {}
                obj['name'] = response.data.content.column_info[data].title
                obj['value'] = data
                return obj
              }
            )
            let secondTagName = Object.keys(
              response.data.content.column_info
            ).map(data => {
              let obj = {}
              obj['name'] = response.data.content.column_info[data].tagName
              obj['value'] = data
              return obj
            })
            let third = [
              { name: 'created_at', value: 'created_at' },
              { name: 'updated_at', value: 'updated_at' }
            ]
            let thirdTagName = [
              { name: '', value: '' },
              { name: '', value: '' }
            ]
            let mergeTagName = firstTagName.concat(secondTagName)
            mergeTagName = mergeTagName.concat(thirdTagName)
            let merge = first.concat(second)
            merge = merge.concat(third)
            await this.setState({
              totalLength: response.data.content.length,
              row: response.data.content.rows,
              pageNumber: response.data.content.pageNumber,
              role: response.data.role,
              header: merge,
              columns: response.data.content.columns
                ? response.data.content.columns
                : this.state.columns,
              headerTagName: mergeTagName,
              legends: response.data.content.legends
            })
            await this.props.getHeader(merge)
            await this.props.loadCehck()
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
    } else if (this.state.textSearch !== '' && this.state.advandeText === '') {
      await this.fetchData(`searchByFields=${this.state.textSearch}`)
    } else if (this.state.advandeText !== '' && this.state.textSearch === '') {
      await this.fetchData(null, this.state.advandeText)
    } else if (this.state.advandeText === '' && this.state.textSearch === '') {
      await this.fetchData(
        `searchByFields=${this.state.textSearch}`,
        this.state.advandeText
      )
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
          } else if (
            this.state.textSearch !== '' &&
            this.state.advandeText === ''
          ) {
            await this.fetchData(`searchByFields=${this.state.textSearch}`)
          } else if (
            this.state.advandeText !== '' &&
            this.state.textSearch === ''
          ) {
            await this.fetchData(null, this.state.advandeText)
          } else if (
            this.state.advandeText === '' &&
            this.state.textSearch === ''
          ) {
            await this.fetchData(
              `searchByFields=${this.state.textSearch}`,
              this.state.advandeText
            )
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
          } else if (
            this.state.textSearch !== '' &&
            this.state.advandeText === ''
          ) {
            await this.fetchData(`searchByFields=${this.state.textSearch}`)
          } else if (
            this.state.advandeText !== '' &&
            this.state.textSearch === ''
          ) {
            await this.fetchData(null, this.state.advandeText)
          } else if (
            this.state.advandeText === '' &&
            this.state.textSearch === ''
          ) {
            await this.fetchData(
              `searchByFields=${this.state.textSearch}`,
              this.state.advandeText
            )
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
        if (this.state.advandeText !== '') {
          this.fetchData(
            `searchByFields=${this.state.textSearch}`,
            this.state.advandeText
          )
        } else {
          this.fetchData(`searchByFields=${this.state.textSearch}`)
        }
      }
      this.setState({ open_header: '' })
    }, 100)
  }
  handleAdvande = (startDate, endDate) => {
    if (startDate && endDate) {
      // this.props.handleState('loading', 'submit')
      startDate = getCustomFormat(startDate, false)
      endDate = getCustomFormat(endDate, false)
      this.props.handleState('startDate', startDate)
      this.props.handleState('endDate', endDate)
      this.props.handleState('openSearch', false)
      let textUrl = `fromDate=${startDate}&toDate=${endDate}`
      this.setState({ advandeText: textUrl })
      if (this.state.textSearch !== '') {
        this.fetchData(`searchByFields=${this.state.textSearch}`, textUrl)
      } else {
        this.fetchData(null, textUrl)
      }
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  render () {
    return (
      <React.Fragment>
        <div className='table w-100 ltr'>
          <div className='main-legends row'>
            {this.state.legends.history_type && (
              <div className={`legends`}>
                <label className='m-0'>History Type :</label>
                <span>{this.state.legends.history_type}</span>
              </div>
            )}
            {this.state.legends.historical_point_list && (
              <div className={`legends`}>
                <label className='m-0'>Historical point list :</label>
                <span>{this.state.legends.historical_point_list}</span>
              </div>
            )}
            {this.state.legends.number_of_points && (
              <div className={`legends`}>
                <label className='m-0'>Number of points :</label>
                <span>{this.state.legends.number_of_points}</span>
              </div>
            )}
            {/* {this.state.legends.number_of_samples &&
                            <div className={`legends`}>
                                <label className='m-0'>Number of samples :</label>
                                <span>{this.state.legends.number_of_samples}</span>
                            </div>
                        } */}
          </div>
          <table>
            <thead className='w-100'>
              <tr className='header dynamic'>
                {this.state.headerTagName.map((data, index) => (
                  <th
                    key={index}
                    className={`${this.handleFilter(
                      this.state.header[index].name
                    )}`}
                    // onClick={() => this._handleClick(index, data)}
                    // ref={`_header_${index}`}
                  >
                    {data.name}
                  </th>
                ))}
              </tr>
              <tr className='header'>
                {this.state.header.map((data, index) => (
                  <th
                    key={index}
                    className={`${this.handleFilter(data.name)}`}
                    onClick={() => this._handleClick(index, data)}
                    ref={`_header_${index}`}
                  >
                    {data.name}
                    {/* <div className='filter d-inline-block'>
                                            <img src='img/Sort_Icon.svg' alt='filter' />
                                        </div> */}
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
                <NotFoundTable className='mt-5' />
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
                    />
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
              {/* <div className='link-footer'>
                                <a
                                    // href={OutputFilter.handleFilter(
                                    //     this.state.textSearch,
                                    //     this.state.search,
                                    //     `${StaticData.domainIp}/correspondence/exportExcel`)}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='xls'>
                                    <img src='/img/XLS.svg' alt='xls' />
                                    خروجی اکسل
                                </a>
                                <a
                                    // href={OutputFilter.handleFilter(
                                    //     this.state.textSearch,
                                    //     this.state.search,
                                    //     `${StaticData.domainIp}/correspondence/exportPdf`)}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='pdf'>
                                    <img src='/img/PDF.svg' alt='PDF' />
                                    خروجی pdf
                                </a>
                            </div> */}
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
