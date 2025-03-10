import React, { Component } from 'react'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
import { Redirect } from 'react-router-dom'
import StaticData from '../../staticData'
import Cookies from 'js-cookie'
// import Permision from '../permision/permision'
// import Notification from '../notification/notification'
// import Message from '../notification/Message'
// import NotFoundTable from '../table/notFound'
// import Loading from '../layout/loading'
import KeyboardArrowRightTwoToneIcon from '@material-ui/icons/KeyboardArrowRightTwoTone'
import KeyboardArrowLeftTwoToneIcon from '@material-ui/icons/KeyboardArrowLeftTwoTone'
import Days from './days'
export default class Calendar extends Component {
  constructor (props) {
    super(props)
    this.Search = null
    this.state = {
      token: Cookies.get('token'),
      data: [{}],
      months: [
        { label: 'فروردین', value: 1 },
        { label: 'اردیبهشت', value: 2 },
        { label: 'خرداد', value: 3 },
        { label: 'تیر', value: 4 },
        { label: 'مرداد', value: 5 },
        { label: 'شهریور', value: 6 },
        { label: 'مهر', value: 7 },
        { label: 'آبان', value: 8 },
        { label: 'آذر', value: 9 },
        { label: 'دی', value: 10 },
        { label: 'بهمن', value: 11 },
        { label: 'اسفند', value: 12 }
      ],
      month: 1,
      years: [1403, 1402, 1401, 1400, 1399, 1398, 1397, 1396, 1395],
      year: 1400,
      dateButtons: 'public',
      displayMode: 'day'
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - تقویم`
  }
  handleSearch = e => {
    if (this.Search !== null) {
      this.Search(e.target.value.trim())
    }
  }
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
                <Menu nameRole='calendar' nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 h-100'>
                      <div className='main-calendar'>
                        <div className='nav-calendar'>
                          <div className='col-xl-4 col-lg-4 col-4 p-0'>
                            <div className='date-buttons'>
                              <button
                                className={`${
                                  this.state.dateButtons === 'public'
                                    ? 'active IranSans_Bold'
                                    : ''
                                }`}
                                onClick={() =>
                                  this.setState({ dateButtons: 'public' })
                                }
                              >
                                رویدادهای عمومی
                              </button>
                              <button
                                className={`${
                                  this.state.dateButtons === 'duties'
                                    ? 'active IranSans_Bold'
                                    : ''
                                }`}
                                onClick={() =>
                                  this.setState({ dateButtons: 'duties' })
                                }
                              >
                                تاریخ وظایف
                              </button>
                            </div>
                          </div>
                          <div className='col-xl-4 col-lg-4 col-4 p-0'>
                            <div className='main-change'>
                              <div className='row mr-0 ml-auto'>
                                <button
                                  className='year ml-1 mr-0'
                                  onClick={() =>
                                    this.state.years.includes(
                                      this.state.year + 1
                                    ) &&
                                    this.setState({ year: this.state.year + 1 })
                                  }
                                >
                                  <KeyboardArrowRightTwoToneIcon className='p-1' />
                                </button>
                                <button
                                  className='month mr-1 ml-0'
                                  onClick={() =>
                                    this.state.months[this.state.month] &&
                                    this.setState({
                                      month: this.state.month + 1
                                    })
                                  }
                                >
                                  <KeyboardArrowRightTwoToneIcon className='p-1' />
                                </button>
                              </div>
                              <div className='row mr-auto ml-auto'>
                                <select
                                  className='mr-3 ml-1'
                                  onChange={e =>
                                    this.setState({
                                      month: parseInt(e.target.value)
                                    })
                                  }
                                  value={this.state.month}
                                >
                                  {this.state.months.map((data, key) => (
                                    <option value={data.value} key={key}>
                                      {data.label}
                                    </option>
                                  ))}
                                </select>
                                <select
                                  className='mr-1 ml-3'
                                  onChange={e =>
                                    this.setState({
                                      year: parseInt(e.target.value)
                                    })
                                  }
                                  value={this.state.year}
                                >
                                  {this.state.years.map((_data, _key) => (
                                    <option value={_data} key={_key}>
                                      {_data}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className='row mr-auto ml-0'>
                                <button
                                  className='month mr-0 ml-1'
                                  onClick={() =>
                                    this.state.months[this.state.month - 2] &&
                                    this.setState({
                                      month: this.state.month - 1
                                    })
                                  }
                                >
                                  <KeyboardArrowLeftTwoToneIcon className='p-1' />
                                </button>
                                <button
                                  className='year mr-1 ml-0'
                                  onClick={() =>
                                    this.state.years.includes(
                                      this.state.year - 1
                                    ) &&
                                    this.setState({ year: this.state.year - 1 })
                                  }
                                >
                                  <KeyboardArrowLeftTwoToneIcon className='p-1' />
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* <div className='col'>
                            <div className='display-mode'>
                              <label className='mb-0 ml-2'>نحوه نمایش :</label>
                              <button
                                className={
                                  this.state.displayMode === 'day' &&
                                  'active IranSans_Bold'
                                }
                                onClick={() =>
                                  this.setState({ displayMode: 'day' })
                                }
                              >
                                روزانه
                              </button>
                              <button
                                className={
                                  this.state.displayMode === 'month' &&
                                  'active IranSans_Bold'
                                }
                                onClick={() =>
                                  this.setState({ displayMode: 'month' })
                                }
                              >
                                ماهانه
                              </button>
                              <button
                                className={
                                  this.state.displayMode === 'year' &&
                                  'active IranSans_Bold'
                                }
                                onClick={() =>
                                  this.setState({ displayMode: 'year' })
                                }
                              >
                                سالانه
                              </button>
                            </div>
                          </div> */}
                        </div>
                        <Days {...this} />
                      </div>
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
