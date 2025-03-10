import React, { Component } from 'react'
import Loading from '../layout/loading'
import AdvanceSearch from '../Customization/advancedSearch'
import NotFoundTable from '../table/notFound'
import Row from '../table/Row'
// import OutputFilter from '../table/OutputFilter'
import Permision from '../permision/permision'
// import StaticData from '../staticData'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility'
export default class TableRFQ extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      header: [
        { name: 'نام تجهیز', value: 'projectName' },
        { name: 'شماره تجهیز', value: 'equipmentNumber' },
        { name: 'دیسیپلین', value: 'discipline' },
        { name: 'نام سازنده', value: 'manufacturerName' },
        { name: 'تاریخ', value: 'date' },
        { name: 'پیوست', value: 'attachment' }
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
      role: null
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
  handleSearch = async text => {}
  fetchData = async (text = null) => {
    if (this.state.token) {
      this.setState({ loading: 'table' })
      setTimeout(() => {
        this.setState({ loading: '' })
      }, 1000)
      // let url = ''
      // if (text !== null) {
      //     url = `${StaticData.domainIp}/correspondence/getList/${this.state.page}?contentPerPage=${this.state.contentPerPage}&${text}`
      // } else {
      //     url = `${StaticData.domainIp}/correspondence/getList/${this.state.page}?contentPerPage=${this.state.contentPerPage}`
      // }
      // await this.setState({ loading: 'table', search: '' })
      // await this.props.resetSearch()
      // await axios.get(url, {
      //     headers: {
      //         'Authorization': `Bearer ${this.state.token}`
      //     }
      // })
      //     .then(async (response) => {
      //         this.setState({ loading: '' })
      //         if (response.status === 200) {
      //             // let permision = new Permision()
      //             // if(permision.handlePermision(response.data.role , 'main_transmittal')){
      //             await this.setState({
      //                 totalLength: response.data.content.length,
      //                 row: response.data.content.rows,
      //                 pageNumber: response.data.content.pageNumber,
      //                 role: response.data.role,
      //                 columns: response.data.content.columns ? response.data.content.columns : this.state.columns
      //             })
      //             // }
      //         } else {
      //             Notification.notify(Message.text(response.status), 'error');
      //         }
      //     })
      //     .catch((err) => {
      //         this.setState({ loading: '' })
      //         if (err.response) {
      //             Notification.notify(Message.text(err.response.status), 'error');
      //         }
      //     })
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
                    <td className='action justify-content-center'>
                      {/* {this.Permision.handlePermision(this.state.role, '') ? */}
                      <Link
                        className='mr-1 ml-1'
                        to={`#`}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <span className='edit'>
                          <VisibilityIcon />
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
            <div className='col-xl-5 col-lg-5 col-md-12 col-12 d-flex align-items-center'>
              <div className='link-footer'>
                <a
                  // href={OutputFilter.handleFilter(
                  //     this.state.textSearch,
                  //     this.state.search,
                  //     `${StaticData.domainIp}/correspondence/exportExcel`)}
                  href='#/'
                  target='_blank'
                  rel='noreferrer'
                  className='xls'
                >
                  <img src='/img/XLS.svg' alt='xls' />
                  خروجی اکسل
                </a>
                <a
                  // href={OutputFilter.handleFilter(
                  //     this.state.textSearch,
                  //     this.state.search,
                  //     `${StaticData.domainIp}/correspondence/exportPdf`)}
                  href='#/'
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
