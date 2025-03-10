import React, { Component } from 'react'
import Cookies from 'js-cookie'
import StaticData from '../staticData'
import HeaderTable from '../table/HeaderTable'
import FooterTable from '../table/FooterTable'
import Permision from '../permision/permision'
import handleCheckText from '../handleCheckText'
import FnsTables from './API/FnsTables'
import handleString from '../handleString'
import BodyTable from '../table/BodyTable'
import ActionBuildersEngineering from './ActionBuildersEngineering'
export default class BuildersEngineering extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.API = new FnsTables(this)
    this.Elm = {}
    this.state = {
      token: Cookies.get('token'),
      header: [
        { name: 'Row', value: 'id' },
        { name: 'Project Code', value: 'project_code' },
        { name: 'Doc Code', value: 'documentNumber', download: true },
        { name: 'Doc Description', value: 'doc_description' },
        { name: 'Discipline', value: 'discipline' },
        { name: 'Doc Type', value: 'doc_type' },
        { name: 'Rev', value: 'revision' },
        { name: 'Vendor', value: 'vendor' },
        { name: 'Trans Code', value: 'transmitallNumber', download: true },
        { name: 'Trans Received Date', value: 'transmittal_receive_date' },
        { name: 'POI', value: 'poi' },
        { name: 'POI Status', value: 'poi_status' },
        {
          name: 'Comment Sheet Code',
          value: 'comment_sheet_code',
          download: true
        },
        { name: 'Comment Sheet Date', value: 'comment_sheet_date' },
        { name: 'Status', value: 'status' },
        { name: 'Reply Sheet Code', value: 'reply_sheet_code', download: true },
        { name: 'Reply Sheet Date', value: 'reply_sheet_date' },
        {
          name: 'Other',
          value: 'other',
          download: true,
          hasSplit: true,
          delimiter: ','
        },
        { name: 'Remark', value: 'remark' }
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
      secondData: {},
      baseUrlAPI: 'BuilderEng',
      status_rev: 'last_rev'
    }
  }
  componentDidMount () {
    this.props.getReset(this.Reset)
    this.props.FilterReset(this.RemoveFilter)
    this.props.GetFunction(this.handleSearch)
    this.fetchData()
    this.props.ChangeStatus(this.ChangeStatus)
    this.props.getHeader(this.state.header)
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  handleUrlList = () => {
    const { status_rev } = this.state
    switch (status_rev) {
      case 'last_rev':
        return {
          getList: 'getListLastRevision',
          getAutoFill: 'getAutoFillLastRevision',
          execl: 'exportExcelLastRevision',
          pdf: 'exportPdfLastRevision'
        }
      case 'all_rev':
        return {
          getList: 'getListAllRevision',
          getAutoFill: 'getAutoFillAllRevision',
          execl: 'exportExcelAllRevision',
          pdf: 'exportPdfAllRevision'
        }
      default:
        return {}
    }
  }
  handleSearch = async text => {
    const { fetchDataAPI } = this.API
    const { token, page, contentPerPage, textSearch, baseUrlAPI } = this.state
    const { getList } = this.handleUrlList()
    if (token && handleCheckText(getList)) {
      this.setState({ search: text, loading: 'table' })
      if (text === '') {
        await this.setState({ page: 1 })
      }
      let url = `${
        StaticData.domainIp
      }/${baseUrlAPI}/${getList}/${page}?contentPerPage=${contentPerPage}${
        handleCheckText(text) ? `&searchInAll=${text}` : ''
      }${handleCheckText(textSearch) ? `&searchByFields=${textSearch}` : ''}`
      fetchDataAPI(url, 'detailLink')
    }
  }
  fetchData = async (text = null) => {
    const { fetchDataAPI } = this.API
    const { token, page, contentPerPage, search, baseUrlAPI } = this.state
    const { getList } = this.handleUrlList()
    if (token && handleCheckText(getList)) {
      let url = `${StaticData.domainIp}/${baseUrlAPI}/${getList}/${
        page || 0
      }?contentPerPage=${contentPerPage}${
        handleCheckText(search) ? `&searchInAll=${search}` : ''
      }${handleCheckText(text) ? `&${text}` : ''}`
      fetchDataAPI(url, 'detailLink')
    }
  }
  changeRowNumber = e => {
    const { changeRowNumberAPI } = this.API
    changeRowNumberAPI(e)
  }
  handleClick = async status => {
    const { handleClickAPI } = this.API
    handleClickAPI(status)
  }
  handleNumberPage = () => {
    let allData = []
    for (let i = 0; i < this.state.pageNumber; i++) {
      allData.push(<option value={i + 1}>{i + 1}</option>)
    }
    return allData
  }
  handleFilter = name => {
    const { handleFilterAPI } = this.API
    let result = handleFilterAPI(name)
    return result || ''
  }
  RemoveFilter = () => {
    const { RemoveFilterAPI } = this.API
    RemoveFilterAPI()
  }
  handleClickOutside = event => {
    const { handleClickOutsideDetailedEngAPI } = this.API
    handleClickOutsideDetailedEngAPI(event)
  }
  Reset = () => {
    const { ResetAPI } = this.API
    ResetAPI()
  }
  _handleClick = async (key, data, checkAdd) => {
    const nameDataBase = await data.value
    const { _handleClickAPI } = this.API
    const { getAutoFill } = this.handleUrlList()
    const {
      open_header,
      token,
      list,
      pageAdvance,
      textSearch,
      search,
      baseUrlAPI
    } = await this.state
    if (token && handleCheckText(getAutoFill)) {
      await this.setState({
        loading: 'advance',
        list: !checkAdd ? [] : list,
        open_header: !checkAdd ? key : open_header
      })
      let secondUrl = `searchByFields=${textSearch}`
      let url = `${
        StaticData.domainIp
      }/${baseUrlAPI}/${getAutoFill}/${nameDataBase}/page/${pageAdvance}?searchInAll=${search}${
        handleCheckText(textSearch) ? `&${secondUrl}` : ''
      }`
      _handleClickAPI(checkAdd, url)
    }
  }
  handleSearchAdvance = async text => {
    const { getAutoFill } = this.handleUrlList()
    const {
      pageAdvance,
      search,
      token,
      textSearch,
      header,
      open_header,
      baseUrlAPI
    } = this.state
    const checkheader = header[open_header]
    if (checkheader) {
      const nameDataBase = checkheader.value
      if (token && handleCheckText(getAutoFill)) {
        this.setState({ loading: 'advance' })
        let secondUrl = `searchByFields=${textSearch}`
        let url = `${
          StaticData.domainIp
        }/${baseUrlAPI}/${getAutoFill}/${nameDataBase}/page/${pageAdvance}?searchInField=${handleString(
          text
        )}&searchInAll=${search}&${
          handleCheckText(textSearch) ? secondUrl : ''
        }`
        const { handleSearchAdvanceAPI } = this.API
        handleSearchAdvanceAPI(url)
      }
    }
  }
  handleActions = data => {
    const { handleActionsAPI } = this.API
    handleActionsAPI(data)
  }
  GetMore = async (key, documentNumber) => {
    let { baseUrlAPI } = this.state
    let url = `${StaticData.domainIp}/${baseUrlAPI}/getDocumentRevisions?documentNumber`
    const { GetMoreAPI } = this.API
    GetMoreAPI(key, documentNumber, url)
  }
  GetSecondData = async (data, index, key) => {
    let { baseUrlAPI } = await this.state
    let url =
      await `${StaticData.domainIp}/${baseUrlAPI}/getDocumentRevisionDetail`
    const { GetSecondDataAPI } = await this.API
    await GetSecondDataAPI(data, index, key, url)
  }
  handleState = async (name, value) => {
    if (name && value) await this.setState({ [name]: value })
    else await this.setState(name)
  }
  handleRefs = (name, elm) => {
    this.Elm[name] = elm
  }
  ChangeStatus = (name, value) => {
    const { handleLastAndAllRev } = this.API
    this.setState({ [name]: value })
    handleLastAndAllRev(name, value)
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  render () {
    let { baseUrlAPI } = this.state
    const { execl, pdf } = this.handleUrlList()
    return (
      <React.Fragment>
        <div className='main-form ltr'>
          <div className='col-xl-8 col-lg-10 col-md-12 col-12 pl-0'>
            <div className='form row ltr'></div>
          </div>
        </div>
        <div className='table w-100'>
          <table>
            <HeaderTable {...this} action='action' />
            <BodyTable
              {...this}
              nameDownload='builders_engineering_download'
              objLink={{
                transmitallNumber: 'transmittal_path',
                documentNumber: 'document_path',
                comment_sheet_code: 'comment_sheet_path',
                reply_sheet_code: 'reply_sheet_path',
                other: 'other_path'
              }}
              action={(data, key) => (
                <ActionBuildersEngineering
                  {...this}
                  data={data || {}}
                  key={key}
                  _key={key}
                />
              )}
            />
          </table>
        </div>
        {(handleCheckText(execl) || handleCheckText(pdf)) && (
          <FooterTable
            {...this}
            xls={`${baseUrlAPI}/${execl}`}
            xlsName='basic_engineering_export'
            pdf={`${baseUrlAPI}/${pdf}`}
            pdfName='basic_engineering_export'
          />
        )}
      </React.Fragment>
    )
  }
}
