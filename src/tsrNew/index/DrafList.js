import React, { Component } from 'react'
import Permision from '../../permision/permision'
import Cookies from 'js-cookie'
import FetchApi from './FetchApi'
import handleCheckText from '../../handleCheckText'
import StaticData from '../../staticData'
// import DeterminantStatus from './DeterminantStatus'
import HeaderTable from '../../table/HeaderTable'
import BodyTable from '../../table/BodyTable'
import FooterTable from '../../table/FooterTable'
import DraftListAction from './DraftListAction'
// import Undo from './Undo'
import ConfirmReject from './ConfirmReject'
export default class DrafList extends Component {
  constructor(props) {
    super(props)
    this.Permision = new Permision()
    this.FetchApi = new FetchApi(this)
    this.Elm = {}
    this.state = {
      token: Cookies.get('token'),
      header: [
        { name: 'ردیف', value: 'id', class_name: 'position-sticky right-sticky', class_name_parent: 'position-sticky right-sticky_parent IranSans_Medium_FA' },
        { name: 'شماره درخواست', value: 'tsr_no', class_name: 'position-sticky right-sticky', class_name_parent: 'position-sticky right-sticky_parent IranSans_Medium_FA' },
        { name: 'موضوع', value: 'subject' },
        { name: 'ناحیه', value: 'area' },
        { name: 'واحد عملیاتی', value: 'operation_unit' },
        { name: 'شماره دستگاه', value: 'machine_no' },
        { name: 'درخواست کننده', value: 'author_info' },
        { name: 'اداره درخواست کننده', value: 'author_office' },
        {
          name: 'تاریخ درخواست', value: 'created_at_date',
          calssname: 'IranSans_Medium_FA'
        },
        { name: 'موقعیت', value: 'form' },
        { name: 'وضعیت', value: 'state' }
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
      baseUrlAPI: 'tsr_v1',
      id_undo: ''
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
      url = `tsr_v1/getListDraft/${page}?contentPerPage=${contentPerPage}&searchInAll=${text ? text : ''
        }&searchByFields=${textSearch}`
    } else {
      url = `tsr_v1/getListDraft/${page}?contentPerPage=${contentPerPage}&searchInAll=${text ? text : ''
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
      url = `tsr_v1/getListDraft/${page}?contentPerPage=${contentPerPage}&searchInAll=${search ? search : ''
        }&${text}`
    } else {
      url = `tsr_v1/getListDraft/${page}?contentPerPage=${contentPerPage}&searchInAll=${search ? search : ''
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
      url = `${StaticData.domainIp}/tsr_v1/getAutofillDraft/${nameDataBase}/page/${pageAdvance}?searchInAll=${search}&${secondUrl}`
    } else {
      url = `${StaticData.domainIp
        }/tsr_v1/getAutofillDraft/${nameDataBase}/page/${pageAdvance}${handleCheckText(search) ? `?searchInAll=${search}` : ''
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
            }/tsr_v1/getAutofillDraft/${nameDataBase}/page/${pageAdvance}?searchInField=${handleCheckText(text) ? text : ''
            }&searchInAll=${search}&${secondUrl}`
        } else {
          url = `${StaticData.domainIp
            }/tsr_v1/getAutofillDraft/${nameDataBase}/page/${pageAdvance}?searchInField=${handleCheckText(text) ? text : ''
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
  CheckRejectConf = data => {
    let { verified_allow, status } = data
    const check = status === 'waited' && verified_allow
    return check
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
                <DraftListAction
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
          xls={`${baseUrlAPI}/exportExcelDraft`}
          xlsName='tsr_export'
          pdf={`${baseUrlAPI}/exportPdfDraft`}
          pdfName='tsr_export'
        />
        {this.state.IdSelected ? <ConfirmReject {...this} /> : ''}
      </React.Fragment>
    )
  }
}
