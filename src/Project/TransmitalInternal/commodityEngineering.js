import React, { Component } from 'react'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import { Redirect, Link } from 'react-router-dom'
import StaticData from '../../staticData'
import Cookies from 'js-cookie'
import axios from 'axios'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'
import RefreshIcon from '@material-ui/icons/Refresh'
// import SearchIcon from '@material-ui/icons/Search';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'
import Permision from '../../permision/permision'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import DoneIcon from '@material-ui/icons/Done'
import CancelImage from '../../statusImage/cancel.svg'
import InfoImage from '../../statusImage/info.svg'
import SuccsesImage from '../../statusImage/succses.svg'
import NotFoundTable from '../../table/notFound'
import Loading from '../../layout/loading'
import UploadInformation from '../../Customization/UploadInformation'
import SearchTable from '../table/SearchTable'
import handleString from '../../handleString'
export default class DCC extends Component {
  constructor (props) {
    super(props)
    this.Search = null
    this.state = {
      token: Cookies.get('token')
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - مهندسی خرید`
  }
  // handleSearch = (e) => {
  //     if (this.Search !== null) {
  //         this.Search(e.target.value.trim())
  //     }
  // }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else
      return (
        <div className='main'>
          <div className='col-12 p-0'>
            <div className='row m-0'>
              <Sidebar
                handleState={(name, value) => this.setState({ [name]: value })}
              />
              <div
                className={`${
                  this.state._close
                    ? 'mainSideClose'
                    : 'col-xl-10 col-lg-10 p-0'
                } dashboard`}
              >
                <Menu nameRole='Home' nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 header-index pr-0 pl-0'>
                      <div className='row m-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 col-12 p-0'>
                          <div className='icon-header'>
                            <div className='icon'>
                              <span
                                className='item'
                                onClick={() =>
                                  this.setState({ upload: !this.state.upload })
                                }
                              >
                                <SystemUpdateAltIcon />
                                <span>بروز رسانی</span>
                              </span>
                            </div>
                            {this.state.upload && (
                              <UploadInformation
                                {...this}
                                handleState={(name, value) =>
                                  this.setState({ [name]: value })
                                }
                              />
                            )}
                            <div className='icon'>
                              <Link to='#'>
                                <RefreshIcon />
                                <span>حذف فیلترها</span>
                              </Link>
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
                      <Table GetFunction={e => (this.Search = e)} />
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
class Table extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      header: [
        { name: 'Document Number:' },
        { name: 'Activity Name' },
        { name: 'Class' },
        { name: 'Area Code' },
        { name: 'Doc.Type' },
        { name: 'Disc.' },
        { name: 'Phase' },
        { name: 'W.F' },
        { name: 'Approve Planned Date' },
        { name: 'Rev.' },
        { name: 'POI' },
        // {name : "remark"},
        { name: 'Status' },
        { name: 'Action' }
      ],
      row: [],
      contentPerPage: 25,
      page: 1,
      totalLength: 0,
      pageNumber: 1,
      selectNumber: '',
      secondNumner: '',
      documentSelected: '',
      firstData: [
        { label: 'completed', color: '#06c554', name: 'Completed' },
        { label: 'In Progress', color: '#2196F3', name: 'In Progress' },
        { label: 'Hold', color: '#f53d49', popUp: true, name: 'Hold' }
      ],
      search: '',
      permision: '',
      filter: '',
      popUp: false,
      idSelected: '',
      textAfc: '',
      popUpDisabled: false,
      loading: 'table'
    }
  }
  componentDidMount () {
    this.props.GetFunction(this.handleSearch)
    this.fetchData()
    window.addEventListener('click', e => {
      if (this.state.selectNumber !== '') {
        switch (
          e.target === this.refs[`more_${this.state.selectNumber}`] ||
          e.target === this.refs[`moresvg_${this.state.selectNumber}`]
        ) {
          case true:
            break
          case false:
            if (
              e.target === this.refs[`boxMore_${this.state.selectNumber}`] ||
              e.target === this.refs[`titleMore_${this.state.selectNumber}`] ||
              e.target === this.refs[`textMore_${this.state.selectNumber}`] ||
              e.target ===
                this.refs[`mainitemMore_${this.state.selectNumber}`] ||
              e.target ===
                this.refs[
                  `itemMore_${this.state.selectNumber}_${this.state.secondNumner}`
                ] ||
              e.target ===
                this.refs[
                  `svgCheck_${this.state.selectNumber}_${this.state.secondNumner}`
                ] ||
              e.target ===
                this.refs[
                  `inputCheckBox_${this.state.selectNumber}_${this.state.secondNumner}`
                ] ||
              e.target ===
                this.refs[
                  `labelItem_${this.state.selectNumber}_${this.state.secondNumner}`
                ]
            ) {
            } else {
              this.setState({ secondNumner: '', selectNumber: '' })
            }

            break
        }
      }
    })
  }
  handleSearch = async text => {
    if (this.state.token) {
      this.setState({ search: text, loading: 'table' })
      await axios
        .get(
          `${StaticData.domainIp}/mdl/procurementEngineering/${this.state.page}?contentPerPage=${this.state.contentPerPage}&searchInAll=${text}`,
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
              pageNumber: response.data.content.pageNumber
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
  fetchData = async () => {
    if (this.state.token) {
      await axios
        .get(
          `${StaticData.domainIp}/mdl/procurementEngineering/${this.state.page}?contentPerPage=${this.state.contentPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${this.state.token}`
            }
          }
        )
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            let permision = new Permision()
            if (
              permision.handlePermision(
                response.data.role,
                'project_engineering'
              )
            ) {
              await this.setState({
                totalLength: response.data.content.length,
                row: response.data.content.rows,
                pageNumber: response.data.content.pageNumber
              })
            }
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
  handleRemark = async (name, checked, send, remark = '') => {
    await this.setState({ [name]: checked })
    let status = await name.split('_')[0]
    for (let value in this.state) {
      if (value.includes('_check_')) {
        if (this.state[value]) {
          await setTimeout(async () => {
            await this.setState({ secondNumner: '', selectNumber: '' })
          }, 300)
        }
      }
    }
    if (send) {
      if (this.state.token) {
        let datareg = new FormData()
        datareg.append('id', this.state.idSelected)
        datareg.append('status', status)
        if (remark !== '') {
          datareg.append('remark', remark)
        }
        await axios({
          method: 'post',
          url: `${StaticData.domainIp}/mdl/updateAp`,
          data: datareg,
          headers: {
            Authorization: this.state.token
              ? `Bearer ${this.state.token}`
              : null
          }
        })
          .then(async response => {
            this.setState({ popUp: false })
            if (response.status === 200) {
              Notification.notify(Message.text(905), 'success')
              await this.fetchData()
            } else {
              Notification.notify(Message.text(response.status), 'error')
            }
          })
          .catch(err => {
            this.setState({ popUp: false })
            if (err.response) {
              Notification.notify(Message.text(err.response.status), 'error')
            }
          })
      }
    }
  }
  handleStatus = status => {
    if (status !== null && status) {
      if (status === 'Completed') return SuccsesImage
      else if (status === 'In Progress') return InfoImage
      else if (status === 'Hold') return CancelImage
    } else return ''
  }
  handlePositionBox = key => {
    const half = this.state.contentPerPage / 2
    if (key >= half) {
      return 'bottomBox'
    } else return ''
  }
  render () {
    return (
      <React.Fragment>
        <div className='table w-100'>
          <table>
            <tbody>
              <tr className='header'>
                {this.state.header.map((data, index) => (
                  <th
                    key={index}
                    className={
                      index === 1
                        ? 'd-flex justify-content-center'
                        : this.state.header.length - 1 === index
                        ? 'action'
                        : ''
                    }
                  >
                    {data.name}
                    {index === 1 ? (
                      <div className='filter'>
                        <img src='img/Sort_Icon.svg' alt='filter' />
                      </div>
                    ) : (
                      ''
                    )}
                  </th>
                ))}
              </tr>
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
                  <tr key={key}>
                    <td>{data.documentNumber}</td>
                    <td>{data.activityName}</td>
                    <td>{data.class}</td>
                    <td>{data.areaCode}</td>
                    <td>{data.docType}</td>
                    <td>{data.disc}</td>
                    <td>{data.phase}</td>
                    <td>{data.wf}</td>
                    <td>{data.firstStepPlannedDate}</td>
                    <td>{data.lastDocumentRevision}</td>
                    <td>{data.poi}</td>
                    {/* <td>{data.APRemark}</td> */}
                    <td className='status'>
                      {this.handleStatus(data.APStatus) !== '' ? (
                        <img
                          className={
                            data.APRemark !== null && data.APRemark !== ''
                              ? 'cursor'
                              : ''
                          }
                          onClick={() =>
                            data.APRemark !== null && data.APRemark !== ''
                              ? this.setState({
                                  textAfc: data.APRemark,
                                  popUp: true,
                                  popUpDisabled: true
                                })
                              : ''
                          }
                          src={this.handleStatus(data.APStatus)}
                          alt=''
                        />
                      ) : (
                        ''
                      )}
                    </td>
                    <td
                      className={`action ${
                        this.state.selectNumber === key ? 'active' : ''
                      }`}
                    >
                      {data.poi === 'AP' && data.APStatus !== 'Completed' ? (
                        <span
                          className='more'
                          ref={`more_${key}`}
                          onClick={() => this.setState({ selectNumber: key })}
                        >
                          <MoreVertRoundedIcon ref={`moresvg_${key}`} />
                        </span>
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
                            className='title w-100 pl-0 pr-5'
                          >
                            <h4
                              ref={`textMore_${key}`}
                              className={`w-100 ${
                                this.state.firstData.length > 0
                                  ? ''
                                  : 'd-flex justify-content-end'
                              }`}
                            >
                              {`${this.state.documentSelected} last Status `}
                            </h4>
                          </div>
                          <div
                            ref={`mainitemMore_${key}`}
                            className='main-item'
                          >
                            {this.state.firstData.map((data1, index) => (
                              <div
                                key={index}
                                ref={`itemMore_${key}_${index}`}
                                className={`item ${
                                  this.state.secondSelectNumber === index
                                    ? 'active'
                                    : ''
                                }`}
                                onClick={() =>
                                  this.setState({ secondNumner: index })
                                }
                              >
                                <input
                                  id={`checkBox_${key}_${index}`}
                                  ref={`inputCheckBox_${key}_${index}`}
                                  name={`${data1.name}_${key}_${index}_check_`}
                                  className='d-none'
                                  type='checkbox'
                                  onChange={async e => {
                                    await this.setState({ idSelected: data.id })
                                    await this.handleRemark(
                                      e.target.name,
                                      e.target.checked,
                                      data1.name === 'Hold' ? false : true
                                    )
                                  }}
                                  onClick={() =>
                                    data1.popUp
                                      ? this.setState({
                                          popUp: true,
                                          popUpDisabled: false
                                        })
                                      : ''
                                  }
                                />
                                <label
                                  ref={`labelItem_${key}_${index}`}
                                  htmlFor={`checkBox_${key}_${index}`}
                                  className='justify-content-start'
                                >
                                  {this.state[
                                    `${data1.name}_${key}_${index}_check_`
                                  ] ? (
                                    <CheckBoxRoundedIcon
                                      style={{ fill: data1.color }}
                                      ref={`svgCheck_${key}_${index}`}
                                    />
                                  ) : (
                                    <CheckBoxOutlineBlankRoundedIcon
                                      style={{ fill: data1.color }}
                                      ref={`svgCheck_${key}_${index}`}
                                    />
                                  )}
                                  {data1.label}
                                </label>
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
                <a
                  href={`${StaticData.domainIp}/mdl/procurementEngineeringExportExcel`}
                  target='_blank'
                  rel='noreferrer'
                  className='xls'
                >
                  <img src='/img/XLS.svg' alt='xls' />
                  خروجی اکسل
                </a>
                <a
                  href={`${StaticData.domainIp}/mdl/procurementEngineeringExportPdf`}
                  target='_blank'
                  rel='noreferrer'
                  className='pdf'
                >
                  <img src='/img/PDF.svg' alt='PDF' />
                  خروجی pdf
                </a>
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
        {this.state.popUp ? (
          <Sign
            close={e =>
              this.setState({ popUp: e, popUpDisabled: e, textAfc: '' })
            }
            idSelected={this.state.idSelected}
            handleRemark={this.handleRemark}
            popUpDisabled={this.state.popUpDisabled}
            textAfc={this.state.textAfc}
          />
        ) : (
          ''
        )}
      </React.Fragment>
    )
  }
}
class Sign extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorText: ''
    }
  }
  componentDidMount () {
    if (this.props.popUpDisabled) {
      this.setState({
        errorText: this.props.textAfc
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      if (this.props.popUpDisabled) {
        this.setState({
          errorText: this.props.textAfc
        })
      }
    }
  }
  render () {
    return (
      <div className='backGroundPopup'>
        <div className='col-xl-4 col-lg-4 col-md-8 col-12 mb-5'>
          <div className='box-wellcome'>
            <div className='main-textarea'>
              <textarea
                onChange={e =>
                  this.props.popUpDisabled
                    ? ''
                    : this.setState({ errorText: e.target.value })
                }
                placeholder='لطفا دلیل خود را وارد کنید'
                value={handleString(this.state.errorText)}
                readOnly={this.props.popUpDisabled}
              ></textarea>
            </div>
            <div className='buttons-wellcome justify-content-center'>
              <button
                className='close-button d-flex align-items-center'
                onClick={() => this.props.close(false)}
              >
                <CloseRoundedIcon />
                بستن
              </button>
              {!this.props.popUpDisabled ? (
                <button
                  className='accept d-flex align-items-center'
                  onClick={() =>
                    this.state.errorText !== ''
                      ? this.props.handleRemark(
                          'Hold',
                          true,
                          true,
                          this.state.errorText
                        )
                      : ''
                  }
                >
                  <DoneIcon />
                  ثبت
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
