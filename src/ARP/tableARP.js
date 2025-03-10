import React, { Component } from 'react'
import Permision from '../permision/permision'
import Cookies from 'js-cookie'
import FetchApi from './FetchApi'
import handleCheckText from '../handleCheckText'
import StaticData from '../staticData'
// import DeterminantStatus from './DeterminantStatus'
import HeaderTable from '../table/HeaderTable'
import BodyTable from '../table/BodyTable'
import FooterTable from '../table/FooterTable'
// import AcceptedListAction from './AcceptedListAction'
// import Undo from './Undo'
import Report from './Report'
import ActionArp from './ActionArp'
export default class AcceptedList extends Component {
  constructor(props) {
    super(props)
    this.Permision = new Permision()
    this.FetchApi = new FetchApi(this)
    this.Elm = {}
    this.state = {
      token: Cookies.get('token'),
      header: [
        { name: 'شماره سطر', value: 'id', class_name: 'position-sticky right-sticky', class_name_parent: 'position-sticky right-sticky_parent IranSans_Medium_FA' },
        { name: 'شماره ARP', value: 'arp_no', class_name: 'position-sticky right-sticky', class_name_parent: 'position-sticky right-sticky_parent IranSans_Medium_FA' },
        { name: 'موضوع', value: 'subject' },
        { name: 'ناحیه', value: 'area' },
        { name: 'واحد', value: 'unit' },
        { name: 'نوع حادثه', value: 'event_type' },
        { name: 'TAG NO.', value: 'tag_number' },
        {
          name: 'تاریخ حادثه',
          value: 'event_date',
          calssname: 'IranSans_Medium_FA'
        },
        {
          name: 'ساعت حادثه',
          value: 'event_hour',
          calssname: 'IranSans_Medium_FA'
        },
        { name: 'شرایط واحد در زمان حادثه', value: 'unit_conditions' },
        { name: 'دبیر کمیته', value: 'secretary_committees_info' },
        { name: 'تهیه کننده گزارش', value: 'authors_info' },
        {
          name: 'ساعت گزارش',
          value: 'created_at_hour',
          calssname: 'IranSans_Medium_FA'
        },
        {
          name: 'تاریخ گزارش',
          value: 'created_at_date',
          calssname: 'IranSans_Medium_FA'
        },
        { name: 'DISCIPLINE', value: 'discipline' },
        { name: 'تعداد اقدامات اصلاحی', value: 'actions_number' },
        { name: 'تعداد وضعیت جاری', value: 'process_status_number' },
        { name: 'تعداد وضعیت رد شده', value: 'reject_status_number' },
        { name: 'تعداد وضعیت انجام شد', value: 'done_status_number' },
        { name: 'موقعیت', value: 'page' },
        { name: 'مرحله در دست بررسی', value: 'hold' }
      ],
      row: [],
      contentPerPage: 25,
      page: 1,
      totalLength: 0,
      pageNumber: 1,
      search: '',
      loading: 'table',
      open_header: '',
      list: [],
      textUrl: 'searchByFields',
      testObject: {},
      secondText: [],
      textSearch: '',
      role: null,
      number: null,
      determinant: false,
      pageAdvance: 1,
      baseUrlAPI: 'arp',
      id_undo: '',
      _part: 'first'
    }
  }
  componentDidMount() {
    this.props.handleThis('Reset', this.Reset)
    this.props.handleThis('FilterReset', this.RemoveFilter)
    // this.props.handleThis('handleSearch', this.handleSearch)
    this.props.handleThis('Search', this.handleSearch)
    this.fetchData()
    this.props.handleState('header', this.state.header)
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  handleState = obj => {
    this.setState(obj)
  }
  handleSearch = async text => {
    const { textSearch, contentPerPage, page } = this.state
    let url = ''
    if (handleCheckText(textSearch)) {
      url = `arp/getList/${page}?contentPerPage=${contentPerPage}&searchInAll=${text ? text : ''
        }&searchByFields=${textSearch}`
    } else {
      url = `arp/getList/${page}?contentPerPage=${contentPerPage}&searchInAll=${text ? text : ''
        }`
    }
    const { fetchDataAPI } = this.FetchApi
    fetchDataAPI(url)
  }
  fetchData = (text = null) => {
    const { fetchDataAPI } = this.FetchApi
    const { page, contentPerPage, search } = this.state
    let url = ''
    if (text !== null) {
      url = `arp/getList/${page}?contentPerPage=${contentPerPage}&searchInAll=${search ? search : ''
        }&${text}`
    } else {
      url = `arp/getList/${page}?contentPerPage=${contentPerPage}&searchInAll=${search ? search : ''
        }`
    }
    fetchDataAPI(url)
  }
  handleFilter = name => {
    const { selected } = this.props.state
    if (selected.length === 0) {
      return ''
    } else {
      if (selected.includes(name)) {
        return ''
      } else {
        return 'd-none'
      }
    }
  }
  RemoveFilter = async () => {
    const { page, contentPerPage } = this.refs
    if (page && contentPerPage) {
      page.value = await 1
      contentPerPage.value = await 25
    }
  }
  handleClickOutside = event => {
    const { open_header } = this.state
    let elm = this.Elm[`_header_${open_header}`]
    if (elm && !elm.contains(event.target)) {
      this.setState({
        open_header: ''
      })
    }
  }
  Reset = async () => {
    const { Reset } = this.FetchApi
    Reset()
  }
  handleNumberPage = () => {
    let allData = []
    for (let i = 0; i < this.state.pageNumber; i++) {
      allData.push(<option value={i + 1}>{i + 1}</option>)
    }
    return allData
  }
  _handleClick = async (key, data, checkAdd) => {
    const { _handleClickAPI } = this.FetchApi
    const nameDataBase = await data.value
    const { pageAdvance, textSearch, search } = await this.state
    let url
    let secondUrl = `searchByFields=${textSearch}`
    if (handleCheckText(textSearch)) {
      url = `${StaticData.domainIp}/arp/getAutoFill/${nameDataBase}/page/${pageAdvance}?searchInAll=${search}&${secondUrl}`
    } else {
      url = `${StaticData.domainIp
        }/arp/getAutoFill/${nameDataBase}/page/${pageAdvance}${handleCheckText(search) ? `?searchInAll=${search}` : ''
        }`
    }
    _handleClickAPI(key, checkAdd, url)
  }
  handleSearchAdvance = async text => {
    const {
      pageAdvance,
      search,
      textSearch,
      header,
      open_header,
      token
    } = this.state
    const checkheader = header[open_header]
    const { handleSearchAdvanceAPI } = this.FetchApi
    if (checkheader) {
      const nameDataBase = checkheader.value
      if (token) {
        this.setState({ loading: 'advance' })
        let secondUrl = `searchByFields=${textSearch}`
        let url
        if (handleCheckText(textSearch)) {
          url = `${StaticData.domainIp
            }/arp/getAutoFill/${nameDataBase}/page/${pageAdvance}?searchInField=${text ? text : ''
            }&searchInAll=${search}&${secondUrl}`
        } else {
          url = `${StaticData.domainIp
            }/arp/getAutoFill/${nameDataBase}/page/${pageAdvance}?searchInField=${text ? text : ''
            }&searchInAll=${search}`
        }
        handleSearchAdvanceAPI(url)
      }
    }
  }
  handleActions = data => {
    const { handleActionsData } = this.FetchApi
    handleActionsData(data)
  }
  changeRowNumber = e => {
    const { changeRowNumberAPI } = this.FetchApi
    changeRowNumberAPI(e)
  }
  handleClick = status => {
    const { handleClickAPI } = this.FetchApi
    handleClickAPI(status)
  }
  handleRefs = (name, elm) => {
    this.Elm[name] = elm
  }
  handlleCheckReport = data => {
    const { actions_number } = data
    const check = actions_number
      ? actions_number !== '-' && parseInt(actions_number) > 0
      : false
    return check
  }
  handleReport = async id => {
    const { handleReportAPI } = this.FetchApi
    handleReportAPI(id)
  }
  render() {
    const { baseUrlAPI } = this.state
    // const undo_show = handleCheckText(id_undo)
    return (
      <React.Fragment>
        <div className='table w-100 rtl persian'>
          <table>
            <HeaderTable {...this} action='عملیات' rtl={true} />
            <BodyTable
              {...this}
              action={(data, key) => (
                <ActionArp
                  {...this}
                  data={data}
                  key={key}
                  _key={key}
                />
              )}
            />
          </table>
        </div>
        <FooterTable
          {...this}
          xls={`${baseUrlAPI}/exportExcel`}
          xlsName='arp_export'
          pdf={`${baseUrlAPI}/exportPdf`}
          pdfName='arp_export'
          corrective={true}
          xlsCorrective={`${baseUrlAPI}/exportExcelStatus`}
          pdfCorrective={`${baseUrlAPI}/exportPdfStatus`}
        />
        {this.state.popup ? <Report {...this} /> : ''}
      </React.Fragment>
    )
  }
}
