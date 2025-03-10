import React, { Component } from 'react'
import Cookies from 'js-cookie'
import StaticData from '../staticData'
import Permision from '../permision/permision'
import handleCheckText from '../handleCheckText'
import HeaderTable from '../table/HeaderTable'
import FnsTables from './API/FnsTables'
import handleString from '../handleString'
import BodyTable from '../table/BodyTable'
import FooterTable from '../table/FooterTable'
export default class FinalEngineeringManual extends Component {
  constructor(props) {
    super(props)
    this.Permision = new Permision()
    this.API = new FnsTables(this)
    this.Elm = {}
    this.state = {
      token: Cookies.get('token'),
      header: [
        { name: 'Row', value: 'id' },
        { name: 'Project Code', value: 'project_code' },
        { name: 'Doc Code', value: 'doc_code' },
        { name: 'Doc Code Contractor', value: 'doc_code_contractor' },
        { name: 'Doc Desc', value: 'doc_desc' },
        { name: 'Rev', value: 'rev' },
        { name: 'Trans Code', value: 'trans_code', download: true },
        { name: 'Trans Received Date', value: 'trans_received_date' },
        { name: 'POI', value: 'poi' },
        { name: 'POI Status', value: 'poi_status' },
        { name: 'Disc Desc', value: 'disc_desc' },
        { name: 'CommentSheet Code', value: 'commentSheet_code' },
        { name: 'CommentSheet Date', value: 'commentSheet_date' },
        { name: 'Status', value: 'status' }
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
      open_header: '',
      list: [],
      textUrl: 'searchByFields',
      testObject: {},
      secondText: [],
      textSearch: '',
      pageAdvance: 1,
      totalAdvance: 0,
      secondData: {},
      baseUrlAPI: 'engFinalDataBook'
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
  handleSearch = async text => {
    const { fetchDataAPI } = this.API
    const { token, page, contentPerPage, textSearch, baseUrlAPI } = this.state
    if (token) {
      this.setState({ search: text, loading: 'table' })
      if (text === '') {
        await this.setState({ page: 1 })
      }
      let url = `${StaticData.domainIp
        }/${baseUrlAPI}/getList/${page}?contentPerPage=${contentPerPage}${handleCheckText(text) ? `&searchInAll=${text}` : ''
        }${handleCheckText(textSearch) ? `&searchByFields=${textSearch}` : ''}`
      fetchDataAPI(url, 'handleLinkEngFinalDataBook')
    }
  }
  fetchData = async (text = null) => {
    const { fetchDataAPI } = this.API
    const { token, page, contentPerPage, search, baseUrlAPI } = this.state
    if (token) {
      let url = `
      ${StaticData.domainIp
        }/${baseUrlAPI}/getList/${page}?contentPerPage=${contentPerPage}${handleCheckText(search) ? `&searchInAll=${search}` : ''
        }${handleCheckText(text) ? `&${text}` : ''}
      `
      fetchDataAPI(url, 'handleLinkEngFinalDataBook')
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
      let url = `${StaticData.domainIp
        }/${baseUrlAPI}/getAutoFill/${nameDataBase}/page/${pageAdvance}?searchInAll=${search}&${handleCheckText(textSearch) ? secondUrl : ''
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
        let url = `${StaticData.domainIp
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
  render() {
    const { baseUrlAPI } = this.state
    return (
      <React.Fragment>
        <div className='table w-100'>
          <table>
            <HeaderTable {...this} />
            <BodyTable
              {...this}
              nameDownload='engineering_final_data_book_download'
              objLink={{
                trans_code: 'url',
              }}
            />
          </table>
        </div>
        <FooterTable
          {...this}
          xls={`${baseUrlAPI}/exportExcel`}
          xlsName='engineering_final_data_book_export'
          pdf={`${baseUrlAPI}/exportPdf`}
          pdfName='engineering_final_data_book_export'
        />
      </React.Fragment>
    )
  }
}
