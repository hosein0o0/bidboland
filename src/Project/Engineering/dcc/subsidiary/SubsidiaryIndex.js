import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import StaticData from '../../../../staticData'
import Cookies from 'js-cookie'
import axios from 'axios'
import EditIcon from '@material-ui/icons/Edit'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded'
import VisibilityIcon from '@material-ui/icons/Visibility'
import PrintIcon from '@material-ui/icons/Print'
import ModeCommentRoundedIcon from '@material-ui/icons/ModeCommentRounded'
import Notification from '../../../../notification/notification'
import Message from '../../../../notification/Message'
import NotFoundTable from '../../../../table/notFound'
import Loading from '../../../../layout/loading'
import Row from '../../../../table/Row'
import Permision from '../../../../permision/permision'
import AdvanceSearch from '../../../../Customization/advancedSearch'
import OutputFilter from '../../../../table/OutputFilter'
export default class MainInternalTransmittal extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      header: [
        { name: 'Row', value: 'id' },
        { name: 'Transmittal Number', value: 'transmittalNumber' },
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
      filter: '',
      loading: 'table',
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
    this.props.FilterReset(this.RemoveFilter)
    this.props.GetFunction(this.handleSearch)
    this.fetchData()
    this.props.getHeader(this.state.header)
    this.props.getReset(this.Reset)
    document.addEventListener('mousedown', this.handleClickOutside)
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
  RemoveFilter = () => {
    if (this.refs.page && this.refs.contentPerPage) {
      this.setState({ page: 1, contentPerPage: 25, textSearch: '', search: '' })
      this.refs.page.value = 1
      this.refs.contentPerPage.value = 10
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
  handleSearch = async text => {
    if (this.state.token) {
      for (let value in this.state) {
        if (value.includes('_header_')) {
          this.setState({ [value]: false })
        }
      }
      this.setState({ search: text, loading: 'table', textSearch: '' })
      axios
        .get(
          `${StaticData.domainIp}/internalTransmittal/getList/${this.state.page}?contentPerPage=${this.state.contentPerPage}&searchInAll=${text}`,
          {
            headers: {
              Authorization: `Bearer ${this.state.token}`
            }
          }
        )
        .then(response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            this.setState({
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
  fetchData = async (text = null) => {
    if (this.state.token) {
      await this.props.resetSearch()
      this.setState({ loading: 'table', search: '' })
      let url = ''
      if (text !== null) {
        url = `${StaticData.domainIp}/internalTransmittal/getList/${this.state.page}?contentPerPage=${this.state.contentPerPage}&${text}`
      } else {
        url = `${StaticData.domainIp}/internalTransmittal/getList/${this.state.page}?contentPerPage=${this.state.contentPerPage}`
      }
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
              role: response.data.role,
              columns: response.data.content.columns
                ? response.data.content.columns
                : this.state.columns
            })
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.props.getRole(null, '')
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
          `${StaticData.domainIp}/internalTransmittal/getDocumentList?transmittalCode=${id}`,
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
                      download={'Transmittal Number'}
                      _linkDownload='internalTransmittal/getZipArchive'
                      objFiltered={this.state.objFiltered}
                    />
                    <td
                      className={`action justify-content-start ${
                        this.state.selectNumber === key ? 'active' : ''
                      }`}
                    >
                      {this.Permision.handlePermision(
                        this.state.role,
                        'secondary_transmittal'
                      ) && (
                        <span
                          className='more'
                          ref={`more_${key}`}
                          onClick={() => this.GetMore(key)}
                        >
                          <MoreVertRoundedIcon ref={`moresvg_${key}`} />
                        </span>
                      )}

                      {data.status === '0' &&
                      this.Permision.handlePermision(
                        this.state.role,
                        'internal_transmittal_edit'
                      ) ? (
                        <Link to={`/InternalEditTransmittal-${data.id}`}>
                          <span className='edit'>
                            <EditIcon />
                          </span>
                        </Link>
                      ) : (
                        ''
                      )}
                      {this.Permision.handlePermision(
                        this.state.role,
                        'internal_transmittal_comment_sheet'
                      ) ? (
                        data.status === '1' ? (
                          <Link
                            to={{
                              pathname: `/InternalTransmittal-${data.id}`,
                              state: { status: 2 }
                            }}
                          >
                            <span className='edit'>
                              <ModeCommentRoundedIcon />
                            </span>
                          </Link>
                        ) : (
                          <span className='edit disabled'>
                            <ModeCommentRoundedIcon />
                          </span>
                        )
                      ) : (
                        ''
                      )}
                      {this.Permision.handlePermision(
                        this.state.role,
                        'secondary_transmittal'
                      ) ? (
                        <Link
                          to={{
                            pathname: `/InternalTransmittal-${data.id}`,
                            state: { status: 1 }
                          }}
                        >
                          <span className='edit'>
                            <VisibilityIcon />
                          </span>
                        </Link>
                      ) : (
                        ''
                      )}

                      {this.Permision.handlePermision(
                        this.state.role,
                        'secondary_transmittal'
                      ) ? (
                        data.status === '1' ? (
                          <a
                            href={`${StaticData.domainIp}/internalTransmittal/print/${data.id}`}
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
                        )
                      ) : (
                        ''
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
                                  this.GetSecondData(data2, index, key)
                                }
                              >
                                <ChevronLeftRoundedIcon
                                  ref={`svgItemMore_${key}_${index}`}
                                />
                                <span ref={`spanItemMore_${key}_${index}`}>
                                  {data2.documentNumber} : {data2.revision}
                                </span>
                                {this.state.secondSelectNumber === index ? (
                                  <div className='second-box'>
                                    <div className='col-12 p-0 row m-0'>
                                      <div className='col-6'>
                                        <div
                                          className={`item ${
                                            this.state.secondData.native !==
                                              null ||
                                            this.state.secondData.attachment !==
                                              null
                                              ? 'hashover'
                                              : ''
                                          }`}
                                        >
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
                                          <label>{data.id}</label>
                                          <a
                                            href={`/internalTransmittal/print/${data.id}`}
                                            target='_blank'
                                            rel='noreferrer'
                                          >
                                            مشاهده جزئیات
                                          </a>
                                        </div>
                                        <div
                                          className={`item ${
                                            (this.state.secondData
                                              .commentNative &&
                                              this.state.secondData
                                                .commentNative.length > 0) ||
                                            (this.state.secondData.commentPdf &&
                                              this.state.secondData.commentPdf
                                                .length > 0)
                                              ? 'hashover'
                                              : ''
                                          }`}
                                        >
                                          <span>Comment No.</span>
                                          <label>
                                            {
                                              this.state.secondData
                                                .commentNumber
                                            }
                                          </label>
                                          {(this.state.secondData
                                            .commentNative &&
                                            this.state.secondData.commentNative
                                              .length > 0) ||
                                          (this.state.secondData.commentPdf &&
                                            this.state.secondData.commentPdf
                                              .length > 0) ? (
                                            <div className='hover-link rtl'>
                                              <div className='second-item'>
                                                <label>
                                                  دانلود فایل native
                                                </label>
                                                <div className='absolute'>
                                                  {this.state.secondData
                                                    .commentNative &&
                                                  this.state.secondData
                                                    .commentNative.length >
                                                    0 !==
                                                    null
                                                    ? this.state.secondData.commentNative.map(
                                                        (__data1, __key) => (
                                                          <div
                                                            className='item-hover mt-1'
                                                            key={__key}
                                                          >
                                                            <a
                                                              href={__data1}
                                                              className='link-download'
                                                              target='_blank'
                                                              rel='noreferrer'
                                                            >
                                                              فایل {__key + 1}
                                                            </a>
                                                          </div>
                                                        )
                                                      )
                                                    : ''}
                                                </div>
                                              </div>
                                              <div className='second-item'>
                                                <label>دانلود فایل pdf</label>
                                                <div className='absolute'>
                                                  {this.state.secondData
                                                    .commentPdf &&
                                                  this.state.secondData
                                                    .commentPdf.length >
                                                    0 !==
                                                    null
                                                    ? this.state.secondData.commentPdf.map(
                                                        (__data2, __key) => (
                                                          <div
                                                            className='item-hover mt-1'
                                                            key={__key}
                                                          >
                                                            <a
                                                              href={__data2}
                                                              className='link-download'
                                                              target='_blank'
                                                              rel='noreferrer'
                                                            >
                                                              فایل {__key + 1}
                                                            </a>
                                                          </div>
                                                        )
                                                      )
                                                    : ''}
                                                </div>
                                              </div>
                                            </div>
                                          ) : (
                                            ''
                                          )}
                                        </div>
                                        <div
                                          className={`item ${
                                            (this.state.secondData
                                              .replyNative !== undefined &&
                                              this.state.secondData.replyNative
                                                .length > 0) ||
                                            (this.state.secondData
                                              .replyAttachment !== undefined &&
                                              this.state.secondData
                                                .replyAttachment.length > 0)
                                              ? 'hashover'
                                              : ''
                                          }`}
                                        >
                                          <span>Reply No.</span>
                                          <label>
                                            {this.state.secondData.replyNumber}
                                          </label>
                                          {(this.state.secondData
                                            .replyNative !== undefined &&
                                            this.state.secondData.replyNative
                                              .length > 0) ||
                                          (this.state.secondData.commentPdf !==
                                            undefined &&
                                            this.state.secondData.commentPdf
                                              .length > 0) ? (
                                            <div className='hover-link rtl'>
                                              <div className='second-item'>
                                                <label>
                                                  دانلود فایل native
                                                </label>
                                                <div className='absolute'>
                                                  {this.state.secondData
                                                    .replyNative !==
                                                    undefined &&
                                                  this.state.secondData
                                                    .replyNative.length >
                                                    0 !==
                                                    null
                                                    ? this.state.secondData.replyNative.map(
                                                        (__data1, __key) => (
                                                          <div
                                                            className='item-hover mt-1'
                                                            key={__key}
                                                          >
                                                            <a
                                                              href={__data1}
                                                              className='link-download'
                                                              target='_blank'
                                                              rel='noreferrer'
                                                            >
                                                              فایل {__key + 1}
                                                            </a>
                                                          </div>
                                                        )
                                                      )
                                                    : ''}
                                                </div>
                                              </div>
                                              <div className='second-item'>
                                                <label>دانلود فایل pdf</label>
                                                <div className='absolute'>
                                                  {this.state.secondData
                                                    .replyAttachment !==
                                                    undefined &&
                                                  this.state.secondData
                                                    .replyAttachment.length >
                                                    0 !==
                                                    null
                                                    ? this.state.secondData.replyAttachment.map(
                                                        (__data2, __key) => (
                                                          <div
                                                            className='item-hover mt-1'
                                                            key={__key}
                                                          >
                                                            <a
                                                              href={__data2}
                                                              className='link-download'
                                                              target='_blank'
                                                              rel='noreferrer'
                                                            >
                                                              فایل {__key + 1}
                                                            </a>
                                                          </div>
                                                        )
                                                      )
                                                    : ''}
                                                </div>
                                              </div>
                                            </div>
                                          ) : (
                                            ''
                                          )}
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
            <div className='col-xl-5 col-lg-5 col-md-12 col-12 d-flex align-items-center'>
              <div className='link-footer'>
                {this.Permision.handlePermision(
                  this.state.role,
                  'secondary_transmittal_export'
                ) && (
                  <a
                    href={OutputFilter.handleFilter(
                      this.state.textSearch,
                      this.state.search,
                      `${StaticData.domainIp}/internalTransmittal/exportExcel`
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
                  'secondary_transmittal_export'
                ) && (
                  <a
                    href={OutputFilter.handleFilter(
                      this.state.textSearch,
                      this.state.search,
                      `${StaticData.domainIp}/internalTransmittal/exportPdf`
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
