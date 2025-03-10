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
import ActionISO from './ActionISO'
import FooterTable from '../table/FooterTable'
export default class PFD extends Component {
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
        { name: 'Area', value: 'area' },
        { name: 'Line Type', value: 'line_type' },
        { name: 'Size', value: 'size' },
        { name: 'Service Code', value: 'service_code' },
        { name: 'Unit', value: 'unit' },
        { name: 'Serial No', value: 'Serial_No' },
        { name: 'Class', value: 'class' },
        { name: 'Line', value: 'line' },
        { name: 'ISO Code', value: 'iso_code', download: true },
        { name: 'ISO Code(native)', value: 'iso_code_native', download: true },
        { name: 'Insulation', value: 'insulation' },
        { name: 'Rt Percent', value: 'rt_percent' },
        { name: 'ISO Revision', value: 'iso_revision' },
        { name: 'ISO Sheet', value: 'iso_sheet' },
        { name: 'ISO Sheets', value: 'iso_sheets' }
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
      baseUrlAPI: 'isometrics'
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
      fetchDataAPI(url, 'handleISOLink')
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
      fetchDataAPI(url, 'handleISOLink')
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
            <HeaderTable {...this} action='action' />
            <BodyTable
              nameDownload='isometric_download'
              {...this}
              objLink={{
                iso_code: 'url',
                iso_code_native: 'url_native'
              }}
              action={data => <ActionISO {...this} data={data} />}
            />
          </table>
        </div>
        <FooterTable
          {...this}
          xls={`${baseUrlAPI}/exportExcel`}
          xlsName='isometric_export'
          pdf={`${baseUrlAPI}/exportPdf`}
          pdfName='isometric_export'
        />
      </React.Fragment>
    )
  }
}
