import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect } from 'react-router-dom'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
// import axios from 'axios'
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'
import RefreshIcon from '@material-ui/icons/Refresh'
import SettingsIcon from '@material-ui/icons/Settings'
import Customization from '../Customization/customization'
// import AdvanceSearch from '../Customization/advancedSearch'
// import Row from '../table/Row'
// import OutputFilter from '../table/OutputFilter'
import CheckIndex from './CheckIndex'
// import FindReplaceIcon from '@material-ui/icons/FindReplace'
// import AAdvanceSearch from './advanceSearch'
import TableLibrary from './tableLibrary'
import Notification from '../notification/notification'
import Message from '../notification/Message'
// import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded'
import Permision from '../permision/permision'
import SearchTable from '../table/SearchTable'
import UploadInformation from '../Customization/UploadInformation'
import PopupLibrary from './PopupLibrary'
import { FilterBAndW } from '@material-ui/icons'
export default class IndexLibrary extends Component {
  constructor(props) {
    super(props)
    this.Reset = null
    this.FilterReset = null
    this.Search = null
    this.FetchData = null
    this.Permision = new Permision()
    this.handleChildState = null
    this.state = {
      token: Cookies.get('token'),
      header: [],
      selected: [],
      open: false,
      search: '',
      advance: false,
      foucs: '',
      category: [],
      publisher: [],
      publisherSelected: '',
      year: '',
      edition: '',
      status: 'ALL',
      categorySelected: '',
      redirect: false,
      listStandard: [
        { value: 'AASHTO', label: 'AASHTO' },
        { value: 'ACI', label: 'ACI' },
        { value: 'ACITMS', label: 'ACITMS' },
        { value: 'AGMA', label: 'AGMA' },
        { value: 'AISC', label: 'AISC' },
        { value: 'ANSI', label: 'ANSI' },
        { value: 'API', label: 'API' },
        { value: 'ASCE', label: 'ASCE' },
        { value: 'ASCE/ANSI/EWRI', label: 'ASCE/ANSI/EWRI' },
        { value: 'ASCE/CI', label: 'ASCE/CI' },
        { value: 'ASCE/SEI', label: 'ASCE/SEI' },
        { value: 'ASHRAE', label: 'ASHRAE' },
        {
          value: 'ASHRAE Guideline 13-2015',
          label: 'ASHRAE Guideline 13-2015'
        },
        { value: 'ASHRAE Standard 34-2013', label: 'ASHRAE Standard 34-2013' },
        { value: 'ASHRAE/ANSI', label: 'ASHRAE/ANSI' },
        { value: 'ASME', label: 'ASME' },
        { value: 'ASSE', label: 'ASSE' },
        { value: 'ASTM', label: 'ASTM' },
        { value: 'AWS', label: 'AWS' },
        { value: 'AWWA', label: 'AWWA' },
        { value: 'AWWA/ANSI', label: 'AWWA/ANSI' },
        { value: 'BS', label: 'BS' },
        { value: 'BS/ISO', label: 'BS/ISO' },
        { value: 'BSI', label: 'BSI' },
        { value: 'CEN', label: 'CEN' },
        { value: 'CGA', label: 'CGA' },
        { value: 'CLSI', label: 'CLSI' },
        { value: 'CSA', label: 'CSA' },
        { value: 'CSA/ASME', label: 'CSA/ASME' },
        { value: 'DIN', label: 'DIN' },
        { value: 'EEMUA', label: 'EEMUA' },
        { value: 'EJMA', label: 'EJMA' },
        { value: 'HEI', label: 'HEI' },
        { value: 'HI', label: 'HI' },
        { value: 'HI/ANSI', label: 'HI/ANSI' },
        { value: 'IBC', label: 'IBC' },
        { value: 'IEC', label: 'IEC' },
        { value: 'IEC/ISO', label: 'IEC/ISO' },
        { value: 'IEEE', label: 'IEEE' },
        { value: 'IES', label: 'IES' },
        { value: 'IPS', label: 'IPS' },
        { value: 'IPS - STANDARD DRAWING', label: 'IPS - STANDARD DRAWING' },
        { value: 'ISA', label: 'ISA' },
        { value: 'ISO', label: 'ISO' },
        { value: 'MESC', label: 'MESC' },
        { value: 'MSS', label: 'MSS' },
        { value: 'NACE', label: 'NACE' },
        { value: 'NBIC', label: 'NBIC' },
        { value: 'NECA/BICSI', label: 'NECA/BICSI' },
        { value: 'NECA/NEMA', label: 'NECA/NEMA' },
        { value: 'NFPA', label: 'NFPA' },
        { value: 'PAS', label: 'PAS' },
        { value: 'PD/BSI', label: 'PD/BSI' },
        { value: 'SAE', label: 'SAE' },
        { value: 'TEMA', label: 'TEMA' },
        { value: 'TOTAL', label: 'TOTAL' },
        { value: 'UL', label: 'UL' },
        { value: 'WRC', label: 'WRC' }
      ],
      popupFilter: true,
      listStandardSelected: {}
    }
  }
  async componentDidMount() {
    document.title = `${StaticData.Title} - بانک استاندارد`
    await document.addEventListener('mousedown', this.handleClickOutside)
    const url = window.location.href
    let name = url.split('-')[url.split('-').length - 1]
    let filter = await CheckIndex.List.filter(data => data.name === name)[0]
    await this.setState({ redirect: filter === undefined })
    await setTimeout(async () => {
      this.state.header.forEach(head => {
        this.setState({
          [`_header_${head.name}`]: true,
          selected: [...this.state.selected, head.name]
        })
      })
    }, 50)
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.obj
    ) {
      let state = await JSON.parse(this.props.location.state.obj)
      await this.setState(state)
    } else {
      this.setState({ categorySelected: filter.value })
    }
  }
  handleAdvanceSearch = async () => {
    if (this.state.publisherSelected || this.state.edition || this.state.year) {
      await this.setState({ loading: 'submit' })
      await this.FetchData()
    } else {
      Notification.notify(Message.text(919), 'warning')
    }
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  handleSelect = async (checked, name) => {
    if (this.state.selected.length > 1 || checked) {
      await this.setState({ [name]: checked })
      let array = []
      for (let value in this.state) {
        if (value.includes('_header_')) {
          if (this.state[value]) {
            let _name = value.split('_header_')[1]
            array.push(_name)
          }
        }
      }
      await this.setState({ selected: array })
    }
  }
  handleButtonClick = () => {
    this.setState(state => {
      return {
        open: !state.open
      }
    })
  }
  handleClickOutside = event => {
    if (this.refs.container && !this.refs.container.contains(event.target)) {
      this.setState({
        open: false
      })
    }
  }
  RemoveFilter = async () => {
    let list = []
    this.state.header.filter(head => list.push(head.name))
    this.setState({
      publisherSelected: '',
      year: '',
      edition: '',
      status: 'ALL',
      selected: list,
      search: ''
    })
    for (let value in this.state) {
      if (value.includes('_header_')) {
        this.setState({ [value]: true })
      }
    }
    if (this.Reset !== null && this.FilterReset !== null) {
      await this.FilterReset()
      await this.Reset()
    }
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    const { value, maxLength, name } = e.target
    this.setState({
      [name]: maxLength !== -1 ? value.slice(0, maxLength) : value
    })
  }
  getRole = (response, status) => {
    if (status === 'response') {
      if (response.status === 200) {
        this.setState({ role: response.data.role })
      } else {
        Notification.notify(Message.text(response.status), 'error')
      }
    } else {
      if (response.response) {
        Notification.notify(Message.text(response.response.status), 'error')
      }
    }
  }
  handleState = (name, value) => {
    if (name && value) {
      this.setState({ [name]: value })
    } else {
      this.setState(name)
    }
  }
  render() {
    const { handlePermision } = this.Permision
    const { role } = this.state
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return <Redirect to='/404' />
    } else
      return (
        <div className='main'>
          <div className='col-12 p-0'>
            <div className='row m-0'>
              <Sidebar
                handleState={(name, value) => this.setState({ [name]: value })}
              />
              <div
                className={`${this.state._close
                  ? 'mainSideClose'
                  : 'col-xl-10 col-lg-10 p-0'
                  } dashboard`}
              >
                <Menu
                  nameRole='standard_bank'
                  getRole={this.getRole}
                  nameUrl={this.props.nameUrl}
                />
                {/* {this.state.advance && this.FetchData !== null ? (
                  <AAdvanceSearch
                    {...this}
                    handleState={(name, value) =>
                      this.setState({ [name]: value })
                    }
                  />
                ) : (
                  ''
                )} */}
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 header-index pr-0 pl-0'>
                      <div className='row m-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                          <div className='icon-header'>
                            {/* <div className='icon'>
                              <span
                                className='item'
                                onClick={() => this.setState({ advance: true })}
                              >
                                <FindReplaceIcon />
                                <span>جستجو پیشرفته</span>
                              </span>
                            </div> */}
                            {handlePermision(role, 'standard_bank_update') &&
                              <div className='icon'>
                                <span
                                  className='item'
                                  onClick={() =>
                                    this.setState({
                                      upload: !this.state.upload
                                    })
                                  }
                                >
                                  <SystemUpdateAltIcon />
                                  <span>بروز رسانی</span>
                                </span>
                              </div>
                            }
                            {this.state.upload && (
                              <UploadInformation
                                linkUpload={'Library/create'}
                                {...this}
                                handleState={(name, value) =>
                                  this.setState({ [name]: value })
                                }
                              />
                            )}
                            <div className='icon'>
                              <span
                                className='item'
                                onClick={this.RemoveFilter}
                              >
                                <RefreshIcon />
                                <span>حذف فیلترها</span>
                              </span>
                            </div>
                            <div
                              className='icon position-relative justify-content-center'
                              ref='container'
                            >
                              <span
                                className='item'
                                onClick={this.handleButtonClick}
                              >
                                <SettingsIcon />
                                <span>سفارشی سازی</span>
                              </span>
                              {this.state.open && (
                                <Customization
                                  {...this}
                                  handleSelect={this.handleSelect}
                                />
                              )}
                            </div>
                            <div
                              className='icon position-relative justify-content-center'
                              ref='container'
                            >
                              <span
                                className='item'
                                onClick={() =>
                                  this.setState({
                                    popupFilter: !this.state.popupFilter
                                  })
                                }
                              >
                                <FilterBAndW />
                                <span>فیلتر</span>
                              </span>
                              {this.state.popupFilter && (
                                <PopupLibrary {...this} />
                              )}
                            </div>
                          </div>
                        </div>
                        <SearchTable
                          {...this}
                          handleState={(name, value) =>
                            this.setState({ [name]: value })
                          }
                        />
                      </div>
                    </div>
                    <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-end'>
                      {this.state.categorySelected !== '' ? (
                        <TableLibrary
                          GetFunction={e => (this.Search = e)}
                          getHeader={e => this.setState({ header: e })}
                          selected={this.state.selected}
                          resetSearch={() => this.setState({ search: '' })}
                          getReset={e => (this.Reset = e)}
                          getRole={(e, name) =>
                            this.setState({
                              role: e,
                              nameRole: name,
                              disabledCreate: false
                            })
                          }
                          getFetchData={fn => (this.FetchData = fn)}
                          FilterReset={remove => (this.FilterReset = remove)}
                          ChildState={fn => (this.handleChildState = fn)}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
}
