import React, { Component } from 'react'
import Cookies from 'js-cookie'
import StaticData from '../staticData'
import Permision from '../permision/permision'
import handleCheckText from '../handleCheckText'
import HeaderTable from '../table/HeaderTable'
import FnsTables from './API/FnsTables'
import handleString from '../handleString'
import BodyTable from '../table/BodyTable'
// import ActionBasicEng from './ActionBasicEng'
import FooterTable from '../table/FooterTable'
import ActionCcs from './ActionCcs'
export default class TableCCS extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.API = new FnsTables(this)
    this.Elm = {}
    this.state = {
      token: Cookies.get('token'),
      header: [
        { name: 'row', value: 'id' },
        { name: 'CCSNo', value: 'CCSNo', download: true },
        { name: 'CCSStatus', value: 'CCSStatus' },
        { name: 'Remark', value: 'Remark' },
        { name: 'RecDate', value: 'RecDate' },
        { name: 'Disipline', value: 'discipline' },
        {
          name: 'Subject',
          value: 'Subject',
          secondValue: 'status',
          // hasSecondValue: true
        },
        {
          name: 'TagNo',
          value: 'TagNo',
          secondValue: 'page',
          // hasSecondValue: true
        },
        { name: 'DocNo', value: 'DocNo' },
        { name: 'StatusTQ', value: 'StatusTQ' },
        { name: 'SentTQDate', value: 'SentTQDate' },
        { name: 'StatusLetter', value: 'StatusLetter' },
        { name: 'SentLetterDate', value: 'SentLetterDate' },
        { name: 'RefTQ', value: 'RefTQ' },
        { name: 'RefLetter', value: 'RefLetter' },
        { name: 'Unit', value: 'Unit' },
        { name: 'Zone', value: 'Zone' },
        { name: 'PID', value: 'PID' },
        { name: 'OwnerDiscipline', value: 'OwnerDiscipline' },
        { name: 'Expr1', value: 'Expr1' },
        { name: 'Delay', value: 'Delay' },
        { name: 'TypeBSendToOwner', value: 'TypeBSendToOwner' },
        { name: 'TypeBReceiveFromOwner', value: 'TypeBReceiveFromOwner' },
        { name: 'Expr2', value: 'Expr2' },
        { name: 'OwnerDelay', value: 'OwnerDelay' },
        { name: 'ConstractionStatus', value: 'ConstractionStatus' },
        { name: 'OwnerApproval', value: 'OwnerApproval' },
        { name: 'ConstractionRemark', value: 'ConstractionRemark' },
        { name: 'ActionBy', value: 'ActionBy' },
        { name: 'Priority', value: 'Priority' },
        { name: 'DoneTypeBDate', value: 'DoneTypeBDate' }
      ],
      row: [],
      contentPerPage: 25,
      page: 1,
      totalLength: 0,
      pageNumber: 1,
      search: '',
      loading: 'table',
      letterNumber: '',
      open_header: '',
      list: [],
      textUrl: 'searchByFields',
      testObject: {},
      secondText: [],
      textSearch: '',
      pageAdvance: 1,
      totalAdvance: 0,
      secondData: {},
      baseUrlAPI: 'launchCommentsSheet'
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
    const { fetchDataAPI } = this.API
    const { token, page, contentPerPage, textSearch, baseUrlAPI } = this.state
    if (token) {
      this.setState({ search: text, loading: 'table' })
      if (text === '') {
        await this.setState({ page: 1 })
      }
      let url = `${
        StaticData.domainIp
      }/${baseUrlAPI}/getList/${page}?contentPerPage=${contentPerPage}${
        handleCheckText(text) ? `&searchInAll=${text}` : ''
      }${handleCheckText(textSearch) ? `&searchByFields=${textSearch}` : ''}`
      fetchDataAPI(url, 'handleCCSLink')
    }
  }
  fetchData = async (text = null) => {
    const { fetchDataAPI } = this.API
    const { token, page, contentPerPage, search, baseUrlAPI } = this.state
    if (token) {
      let url = `
      ${
        StaticData.domainIp
      }/${baseUrlAPI}/getList/${page}?contentPerPage=${contentPerPage}${
        handleCheckText(search) ? `&searchInAll=${search}` : ''
      }${handleCheckText(text) ? `&${text}` : ''}
      `
      fetchDataAPI(url, 'handleCCSLink')
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
  // handleAttachment = data => {
  //   let allData = []
  //   for (let value in data) {
  //     allData.push(data[value])
  //   }
  //   return allData
  // }
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
    const { handleClickOutsideAPI } = this.API
    handleClickOutsideAPI(event)
  }
  Reset = () => {
    const { ResetAPI } = this.API
    ResetAPI()
  }
  _handleClick = async (key, data, checkAdd) => {
    const nameDataBase = await data.value
    const { _handleClickAPI } = this.API
    const {
      open_header,
      token,
      list,
      pageAdvance,
      textSearch,
      search,
      baseUrlAPI
    } = await this.state
    if (token) {
      await this.setState({
        loading: 'advance',
        list: !checkAdd ? [] : list,
        open_header: !checkAdd ? key : open_header
      })
      let secondUrl = `searchByFields=${textSearch}`
      let url = `${
        StaticData.domainIp
      }/${baseUrlAPI}/getAutoFill/${nameDataBase}/page/${pageAdvance}?searchInAll=${search}&${
        handleCheckText(textSearch) ? secondUrl : ''
      }`
      _handleClickAPI(checkAdd, url)
    }
  }
  handleSearchAdvance = async text => {
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
      if (token) {
        this.setState({ loading: 'advance' })
        let secondUrl = `searchByFields=${textSearch}`
        let url = `${
          StaticData.domainIp
        }/${baseUrlAPI}/getAutoFill/${nameDataBase}/page/${pageAdvance}
        ?searchInField=${handleString(text)}
        &searchInAll=${search}&${handleCheckText(textSearch) ? secondUrl : ''}`
        const { handleSearchAdvanceAPI } = this.API
        handleSearchAdvanceAPI(url)
      }
    }
  }
  handleActions = data => {
    const { handleActionsAPI } = this.API
    handleActionsAPI(data)
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
  render () {
    const { baseUrlAPI } = this.state
    return (
      <React.Fragment>
        <div className='table w-100'>
          <table>
            <HeaderTable {...this} action='action' />
            <BodyTable
              {...this}
              nameDownload='comment_sheet_download'
              objLink={{
                CCSNo: 'url'
              }}
              action={data => <ActionCcs {...this} data={data} />}
            />
          </table>
        </div>
        <FooterTable
          {...this}
          xls={`${baseUrlAPI}/exportExcel`}
          xlsName='comment_sheet_export'
          pdf={`${baseUrlAPI}/exportPdf`}
          pdfName='comment_sheet_export'
        />
      </React.Fragment>
    )
  }
}
