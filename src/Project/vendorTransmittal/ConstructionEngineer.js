import React, { Component } from 'react'
import StaticData from '../../staticData'
import Cookies from 'js-cookie'
import axios from 'axios'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded'
import Permision from '../../permision/permision'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import NotFoundTable from '../../table/notFound'
import Loading from '../../layout/loading'
import Row from '../../table/Row'
import AdvanceSearch from '../../Customization/advancedSearch'
import OutputFilter from '../../table/OutputFilter'
export default class ConstructionEngineer extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      header: [
        { name: 'Row', value: 'id' },
        { name: 'Vendor', value: 'vendor_name' },
        { name: 'Tag', value: 'tag' },
        { name: 'MRE Code', value: 'documentNumber' },
        { name: 'Document Number', value: 'orginal_document_number' },
        { name: 'Activity Name', value: 'activityName' },
        { name: 'Class', value: 'class' },
        { name: 'Area Code', value: 'areaCode' },
        { name: 'Doc.Type', value: 'docType' },
        { name: 'Disc.', value: 'disc' },
        { name: 'Phase', value: 'phase' },
        { name: 'W.F', value: '' },
        { name: 'First Step Planned Date', value: 'firstStepPlannedDate' },
        { name: 'Remarks', value: 'remarks' },
        // {name : "SCOPE(N.I.O.E.C Issue)"},
        // {name : "Rev.(N.I.O.E.C Issue)"},
        { name: 'Rev.', value: 'lastDocumentRevision' },
        { name: 'Transmittal No.', value: 'transmitallNumber' },
        { name: 'Verify at', value: 'verify_at' },
        { name: 'Issued Date', value: 'issuedDate' },
        { name: 'POI', value: 'poi' },
        { name: 'Last Comment', value: 'commentNumber' },
        { name: 'Comment Date', value: 'commentDate' },
        { name: 'Co. Status', value: 'commentStatus' },
        { name: 'Reply Sheet No', value: 'replyNumber' },
        { name: 'Reply Date', value: 'replyDate' },
        { name: 'Status', value: 'replyStatus' }
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
      loading: 'table',
      columns: {},
      open_header: '',
      list: [],
      textUrl: 'searchByFields',
      testObject: {},
      secondText: [],
      textSearch: '',
      role: null,
      checkPermision: false,
      checkVendor: true,
      xls: false
    }
  }
  componentDidMount () {
    this.props.FilterReset(this.RemoveFilter)
    this.props.getReset(this.Reset)
    this.props.GetHead()
    this.props.getHeader(this.state.header)
    this.props.GetFunction(this.handleSearch)
    this.fetchData()
    document.addEventListener('mousedown', this.handleClickOutside)
    window.addEventListener('click', e => {
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
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
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
  handleSearch = async text => {
    if (this.state.token) {
      for (let value in this.state) {
        if (value.includes('_header_')) {
          this.setState({ [value]: false })
        }
      }
      await this.setState({ search: text, loading: 'table', textSearch: '' })
      await axios
        .get(
          `${StaticData.domainIp}/vendorMdl/getList/${this.state.page}?contentPerPage=${this.state.contentPerPage}&searchInAll=${text}`,
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
              pageNumber: response.data.content.pageNumber,
              columns: response.data.content.columns
                ? response.data.content.columns
                : this.state.columns
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
  fetchData = async (text = null) => {
    if (this.state.token) {
      await this.props.resetSearch()
      this.setState({ loading: 'table', search: '' })
      let url = ''
      if (text !== null) {
        url = `${StaticData.domainIp}/vendorMdl/getList/${this.state.page}?contentPerPage=${this.state.contentPerPage}&${text}`
      } else {
        url = `${StaticData.domainIp}/vendorMdl/getList/${this.state.page}?contentPerPage=${this.state.contentPerPage}`
      }
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(async response => {
          await this.setState({ loading: '' })
          if (response.status === 200) {
            if (
              this.Permision.handlePermision(
                response.data.role,
                'vpis_create',
                true
              )
            ) {
              this.getMreListForSelectBox()
            }
            await this.props.getRoleName(
              response.data.role,
              response.data.role === 'vendor' ? 'vendor' : 'user'
            )
            await this.setState({
              totalLength: response.data.content.length,
              row: response.data.content.rows,
              pageNumber: response.data.content.pageNumber,
              columns: response.data.content.columns
                ? response.data.content.columns
                : this.state.columns,
              checkVendor: response.data.role === 'vendor',
              role: response.data.role
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
  RemoveFilter = () => {
    if (this.refs.page && this.refs.contentPerPage) {
      this.setState({ page: 1, contentPerPage: 25, textSearch: '', search: '' })
      this.refs.page.value = 1
      this.refs.contentPerPage.value = 10
    }
  }
  getMreListForSelectBox = async () => {
    await axios
      .get(`${StaticData.domainIp}/vendorMdl/getMreListForSelectBox`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(async response => {
        if (response.status === 200) {
          this.props.getList(response.data.content)
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
  GetMore = async (key, documentNumber) => {
    await this.setState({
      selectNumber: key,
      firstData: [],
      documentSelected: ''
    })
    if (this.state.token) {
      await axios
        .get(
          `${StaticData.domainIp}/vendorMdl/getDocumentRevisions?documentNumber=${documentNumber}`,
          {
            headers: {
              Authorization: `Bearer ${this.state.token}`
            }
          }
        )
        .then(async response => {
          if (response.status === 200) {
            // if (response.data.role === 'vendor') {
            //     response.data.role = await {
            //         vendor: 1
            //     }
            // }
            // if (this.Permision.handlePermision(response.data.role, 'vendor')) {
            this.setState({
              firstData: response.data.content,
              selectNumber: key,
              documentSelected: documentNumber
            })
            // }
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
      this.setState({
        selectNumber: key,
        secondData: {},
        secondSelectNumber: ''
      })
      await axios
        .get(
          `${StaticData.domainIp}/vendorMdl/getDocumentRevisionDetail?documentId=${data.id}`,
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
  _handleClick = async (key, data) => {
    await this.setState({ list: [] })
    if (this.state.columns && this.state.columns[data.value] && data) {
      await this.setState({
        open_header: key,
        list: this.state.columns[data.value].split('__DARA__')
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
  render () {
    return (
      <React.Fragment>
        <div className='table w-100'>
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
                        rtl={false}
                        handleSelect={(checked, name) =>
                          this.setState({ [name]: checked })
                        }
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
                      className={`action ${
                        this.state.selectNumber === key ? 'active' : ''
                      }`}
                    >
                      <span
                        className='more'
                        ref={`more_${key}`}
                        onClick={() => this.GetMore(key, data.documentNumber)}
                      >
                        <MoreVertRoundedIcon ref={`moresvg_${key}`} />
                      </span>
                      {this.state.selectNumber === key ? (
                        <div
                          ref={`boxMore_${key}`}
                          className={`box-more ${this.handlePositionBox(key)}`}
                        >
                          <div ref={`titleMore_${key}`} className='title w-100'>
                            <h4
                              ref={`textMore_${key}`}
                              className={`w-100 ${
                                this.state.firstData.length > 0
                                  ? ''
                                  : 'd-flex justify-content-end'
                              }`}
                            >
                              {this.state.firstData.length > 0
                                ? `${this.state.documentSelected} داکیومنت `
                                : 'اطلاعات ثبت نشده است'}
                            </h4>
                          </div>
                          <div
                            ref={`mainitemMore_${key}`}
                            className='main-item'
                          >
                            {this.state.firstData.map((data, index) => (
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
                                  Rev : {data.revision}
                                </span>
                                {this.state.secondSelectNumber === index &&
                                this.Permision.handlePermision(
                                  this.state.role,
                                  'vpis_download'
                                ) ? (
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
                                          <div className='hover-link rtl'>
                                            {this.state.secondData.native !==
                                            null ? (
                                              <a
                                                href={
                                                  this.state.secondData.native[
                                                    '0'
                                                  ]
                                                }
                                                className='link-download'
                                                target='_blank'
                                                rel='noreferrer'
                                              >
                                                دانلود فایل native
                                              </a>
                                            ) : (
                                              ''
                                            )}
                                            ‍
                                            {this.state.secondData
                                              .attachment !== null ? (
                                              <a
                                                href={
                                                  this.state.secondData
                                                    .attachment['0']
                                                }
                                                className='link-download'
                                                target='_blank'
                                                rel='noreferrer'
                                              >
                                                دانلود فایل pdf
                                              </a>
                                            ) : (
                                              ''
                                            )}
                                          </div>
                                        </div>
                                        <div className='item'>
                                          <span>Transmittal No.</span>
                                          <label>
                                            {
                                              this.state.secondData
                                                .transmittalNumber
                                            }
                                          </label>
                                          {this.state.secondData
                                            .transmittalNumber ? (
                                            <a
                                              href={`${StaticData.domainIp}/vendorTransmittal/print/${this.state.secondData.transmittalNumber}`}
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
            {!this.state.checkVendor ? (
              <div className='col-xl-5 col-lg-5 col-md-12 col-12 d-flex align-items-center'>
                <div className='link-footer'>
                  <div className='drop-down-index-footer'>
                    <div className='header-drop-down'>
                      <button
                        className='xls'
                        onClick={() => this.setState({ xls: !this.state.xls })}
                      >
                        <img src='/img/XLS.svg' alt='xls' />
                        خروجی اکسل
                      </button>
                    </div>
                    {this.state.xls &&
                      this.Permision.handlePermision(
                        this.state.role,
                        'vpis_export'
                      ) && (
                        <div className='list-drop-down'>
                          <a
                            className='link-list-drop-down xls'
                            href={OutputFilter.handleFilter(
                              this.state.textSearch,
                              this.state.search,
                              `${StaticData.domainIp}/vendorMdl/exportExcel`
                            )}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <img src='/img/XLS.svg' alt='xls' />
                            آخرین وضعیت
                          </a>
                          <a
                            className='link-list-drop-down xls'
                            href={OutputFilter.handleFilter(
                              this.state.textSearch,
                              this.state.search,
                              `${StaticData.domainIp}/vendorMdl/exportAllStatusExcel`
                            )}
                            target='_blank'
                            rel='noreferrer'
                          >
                            <img src='/img/XLS.svg' alt='xls' />
                            گزارش کامل
                          </a>
                        </div>
                      )}
                  </div>
                  {this.Permision.handlePermision(
                    this.state.role,
                    'vpis_export'
                  ) && (
                    <a
                      href={OutputFilter.handleFilter(
                        this.state.textSearch,
                        this.state.search,
                        `${StaticData.domainIp}/vendorMdl/exportPdf`
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
            ) : (
              ''
            )}
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
