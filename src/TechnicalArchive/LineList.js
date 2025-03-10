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
import ActionLineList from './ActionLineList'
export default class LineList extends Component {
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
        { name: 'ZoneNo.', value: 'zone_no' },
        { name: 'Unit', value: 'unit' },
        { name: 'Rev.', value: 'rev' },
        { name: 'Piping Routing(from)', value: 'piping_routing' },
        { name: 'Piping Routing(to)', value: 'X' },
        {
          name: 'P&ID No.',
          value: 'p_and_id_no',
          download: true,
          hasSplit: true,
          delimiter: '&'
        },
        { name: 'Fluid(idn)', value: 'fluid', changeColor: false },
        { name: 'SerialNo', value: 'serial_no', changeColor: false },
        { name: 'PipingClass', value: 'piping_class', changeColor: false },
        { name: 'size(Inch)', value: 'size', changeColor: false },
        {
          name: 'Insulation/TracingType(idn)',
          value: 'insulation_tracing_type',
          changeColor: false
        },
        // { name: 'Quantity And Size Of Tracers', value: 'AI' },
        {
          name: 'Insulation Thk(mm)',
          value: 'insulation_thk',
          changeColor: false
        },
        { name: 'Tracing Maintain Temp. °C', value: 'tracing' },
        { name: 'Painting System', value: 'painting_system' },
        { name: 'PWHT NOTE 6', value: 'pwht_note6' },
        { name: 'NDT Class', value: 'ndt_class' },
        { name: 'Stress Analysis(A/B/C)', value: 'stress_analysis' },
        { name: 'Cleaning Method', value: 'cleaning_method' },
        { name: 'Phase', value: 'phase' },
        { name: 'Density(kg/m3)', value: 'density' },
        { name: 'Viscosity(cp)', value: 'viscosity' },
        { name: 'Velocity(m/s)', value: 'velocity' },
        {
          name: 'Max Min Operating Conditions Press(Barg)',
          value: 'max_min_operating_conditions'
        },
        { name: 'Max Min Operating Conditions Temp. °C', value: 'AA' },
        { name: 'Design Conditions Press(Barg)', value: 'design_conditions' },
        { name: 'Design Conditions Temp. °C', value: 'AC' },
        {
          name: 'Field Pressure Test Press(Barg)',
          value: 'field_pressure_test'
        },
        { name: 'Field Pressure Test Testmedia', value: 'AE' },
        { name: 'SeverCyclicCondition', value: 'sever_cyclic_condition' },
        { name: 'Remarks', value: 'remarks' }
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
      baseUrlAPI: 'lineList'
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
      fetchDataAPI(url , 'handleLineListLink')
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
      fetchDataAPI(url , 'handleLineListLink')
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
              nameDownload='line_list_download'
              {...this}
              objLink={{
                p_and_id_no: 'p_and_id_no_path'
              }}
              action={data => <ActionLineList {...this} data={data} />}
            />
          </table>
        </div>
        <FooterTable
          {...this}
          xls={`${baseUrlAPI}/exportExcel`}
          xlsName='line_list_export'
          pdf={`${baseUrlAPI}/exportPdf`}
          pdfName='line_list_export'
        />
      </React.Fragment>
    )
  }
}
