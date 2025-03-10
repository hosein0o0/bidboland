import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import DescriptionIcon from '@material-ui/icons/Description'
import TableChartIcon from '@material-ui/icons/TableChart'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PublicIcon from '@material-ui/icons/Public'
// import FileCopyIcon from '@material-ui/icons/FileCopy';
import BuildIcon from '@material-ui/icons/Build'
import NoteIcon from '@material-ui/icons/Note'
import FaceIcon from '@material-ui/icons/Face'
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded'
import SearchIcon from '@material-ui/icons/Search'
// import DatePicker from 'react-datepicker2';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import StaticData from '../staticData'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import CheckIndex from './CheckIndex'
import BoxResult from '../layout/BoxResult'
import handleString from '../handleString'

export default class DashboardLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listIndex: [
        {
          icon: <DescriptionIcon style={{ fill: '#e62ee6' }} />,
          title: 'مقالات',
          label: 'مقالات موجود',
          number: '2,849',
          link: '/indexLibrary-articles',
          backGround: '#ffe5ff',
          value: 1,
          unit: 'عدد'
        },
        {
          icon: <MenuBookIcon style={{ fill: '#1779dc' }} />,
          title: 'کتاب‌های راهنما',
          label: 'کتاب‌های موجود',
          number: '2,849',
          link: '/indexLibrary-books',
          backGround: '#e6f4ff',
          value: 2,
          unit: 'عدد'
        },
        {
          icon: <PublicIcon style={{ fill: '#69ad24' }} />,
          title: 'بانک استانداردها',
          label: 'اسناد موجود',
          number: '2,849',
          link: '/indexLibrary-standard',
          backGround: '#e5ffd0',
          value: 3,
          unit: 'عدد'
        },
        // { icon: <FileCopyIcon style={{ fill: '#23ae3b' }} />, title: 'استاندارد‌های داخلی', label: 'اسناد موجود', number: '2,849', link: '/indexLibrary-documents', backGround: '#e5fae9', value: 4 },
        {
          icon: <BuildIcon style={{ fill: '#eb7d00' }} />,
          title: 'سازندگان مورد تائید',
          label: 'تعداد سازندگان',
          number: '2,849',
          link: '/indexLibrary-builders',
          backGround: '#fef3d5',
          value: 5,
          unit: 'عدد'
        },
        {
          icon: <NoteIcon style={{ fill: '#7347ff ' }} />,
          title: 'مجلات',
          label: 'مجلات موجود',
          number: '2,849',
          link: '/indexLibrary-magazines',
          backGround: '#ebe5ff',
          value: 6,
          unit: 'عدد'
        },
        {
          icon: <SchoolRoundedIcon style={{ fill: '#00a3f2' }} />,
          title: 'فایل‌های آموزش تصویری',
          label: 'فایل‌های موجود',
          number: '2,849',
          link: '/indexLibrary-file',
          backGround: '#e5f6fe',
          value: 7,
          unit: 'عدد'
        },
        {
          icon: <FaceIcon style={{ fill: '#e62e2e' }} />,
          title: 'درخواست استاندارد جدید',
          label: 'میانگین زمان پاسخگویی',
          number: '2,849',
          link: '/standard-request',
          backGround: '#ffe5e6',
          unit: 'ساعت'
        }
      ],
      foucs: '',
      category: [],
      publisher: [],
      publisherSelected: '',
      year: '',
      edition: '',
      status: 'ALL',
      token: Cookies.get('token'),
      categorySelected: '',
      disabled: false,
      loading: '',
      redirect: false,
      name: '',
      obj: {},
      keyWords: '',
      listSuggestion: [
        { value: 'فایل‌های آموزشی' },
        { value: 'استاندارد‌های بین الملل' },
        { value: 'مقالات' },
        { value: 'مجالات' },
        { value: 'کتاب‌های راهنما' },
        { value: 'استاندارد‌های داخلی' },
        { value: 'سازندگان مورد تائید ' },
        { value: 'فایل‌های آموزش تصویری ' }
      ]
    }
  }
  componentDidMount() {
    document.title = `${StaticData.Title} -  بانک استاندارد`
    this.fetchData()
  }
  fetchData = async () => {
    await axios
      .get(`${StaticData.domainIp}/Library/searchableFields`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(async response => {
        if (response.status === 200) {
          const category = await Object.keys(
            response.data.content.category
          ).map(_ => {
            let obj = response.data.content.category[_]
            obj['unit'] = 'عدد'
            return obj
          })
          const object = await response.data.content
          object['category'] = await category
          await this.setState(object)
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
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
  hadnleSubmit = () => {
    if (this.state.categorySelected !== '') {
      this.setState({ loading: 'submit' })
      let list = CheckIndex.List
      let id = list.filter(
        data => data.value === parseInt(this.state.categorySelected)
      )[0]
      let obj = {}
      setTimeout(() => {
        if (id.name && id.value) {
          obj['categorySelected'] = this.state.categorySelected
          obj['publisherSelected'] = this.state.publisherSelected
          obj['year'] = this.state.year
          obj['edition'] = this.state.edition
          obj['status'] = this.state.status
          this.setState({
            loading: '',
            name: id.name,
            obj: JSON.stringify(obj),
            redirect: true
          })
        } else {
          this.setState({ loading: '' })
        }
      }, 1000)
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/indexLibrary-${this.state.name}`,
            state: { obj: this.state.obj }
          }}
        />
      )
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
                <Menu nameRole='standard_bank' nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard pt-2'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0 library pt-0 row m-0'>
                    <div className='main-box-index row'>
                      {this.state.listIndex.map((data, key) =>
                        this.state.category[key] &&
                          this.state.category[key].value === data.value
                          ? this.state.category[key].label ===
                          'بانک استانداردها' && (
                            <div
                              className='col-xl-3 col-lg-4 col-md-6 col-12 mt-2 pr-2 pl-2'
                              key={key}
                            >
                              <div className='box-index'>
                                <div className='detail-box'>
                                  <div
                                    className='logo-box'
                                    style={{
                                      backgroundColor: data.backGround
                                    }}
                                  >
                                    {data.icon}
                                  </div>
                                  <div className='detail-text'>
                                    <div className='w-100'>
                                      <h4 className='title'>
                                        {this.state.category[key].label}
                                      </h4>
                                    </div>
                                    <div className='w-100 row mr-0 ml-0 availableNumber'>
                                      <label>{data.label}:</label>
                                      <span>
                                        {`${this.state.category[key].count} ${this.state.category[key].unit}`}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className='link-index'>
                                  <a href={data.link}>
                                    <TableChartIcon />
                                    مشاهده ایندکس
                                  </a>
                                </div>
                              </div>
                            </div>
                          )
                          : data.title === 'درخواست استاندارد جدید' && (
                            <div
                              className='col-xl-3 col-lg-4 col-md-6 col-12 mt-2 pr-2 pl-2'
                              key={key}
                            >
                              <div className='box-index'>
                                <div className='detail-box'>
                                  <div
                                    className='logo-box'
                                    style={{
                                      backgroundColor: data.backGround
                                    }}
                                  >
                                    {data.icon}
                                  </div>
                                  <div className='detail-text'>
                                    <div className='w-100'>
                                      <h4 className='title'>{data.title}</h4>
                                    </div>
                                    <div className='w-100 row mr-0 ml-0 availableNumber'>
                                      <label>{data.label}:</label>
                                      <span>
                                        {`${data.count ? data.count : 0}
                                        ${data.unit}
                                                                        `}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className='link-index'>
                                  <a href={data.link}>
                                    <TableChartIcon />
                                    مشاهده ایندکس
                                  </a>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                    <div className='w-100 pl-2 pr-2'>
                      <div className='maniAdvance'>
                        <div className='title'>
                          <h4>
                            <SearchIcon className='ml-1' />
                            جتسجوی پیشرفته
                          </h4>
                        </div>
                        <div className='main-form'>
                          <div className='col-xl-8 col-lg-12 col-md-12 col-12 pr-0 pl-0'>
                            <div className='form row justify-content-start mt-3 mb-3'>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian overflow-initial ${this.state.keyWords ||
                                    this.state.foucs === 'keyWords'
                                    ? 'active'
                                    : ''
                                    }`}
                                >
                                  <div className='icon-field'>
                                    <SearchIcon />
                                  </div>
                                  <div className='col p-0'>
                                    <label>
                                      جستجوی کلمات کلیدی
                                      {/* <span className='star IranSans_Bold'>*</span> */}
                                    </label>
                                    <input
                                      type='text'
                                      name='keyWords'
                                      value={handleString(this.state.keyWords)}
                                      onFocus={e => this.OnFocus(e.target.name)}
                                      onBlur={() =>
                                        setTimeout(() => this.OnBlur(), 100)
                                      }
                                      onChange={this.handleChange}
                                    />
                                  </div>
                                  {this.state.foucs === 'keyWords' &&
                                    this.state.keyWords && (
                                      <BoxResult
                                        value={this.state.keyWords}
                                        listSuggestion={
                                          this.state.listSuggestion
                                        }
                                      />
                                    )}
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${this.state.foucs === 'categorySelected' ||
                                    this.state.categorySelected
                                    ? 'active'
                                    : ''
                                    }`}
                                >
                                  <label>
                                    نوع سند
                                    <span className='star IranSans_Bold'>
                                      *
                                    </span>
                                  </label>
                                  <select
                                    name={`categorySelected`}
                                    value={this.state.categorySelected}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                  >
                                    <option className='d-none'></option>
                                    {this.state.category.map((data, key) => (
                                      <option value={data.value} key={key}>
                                        {data.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${this.state.foucs === 'publisherSelected' ||
                                    this.state.publisherSelected
                                    ? 'active'
                                    : ''
                                    }`}
                                >
                                  <label>
                                    ناشر سند
                                    {/* <span className='star IranSans_Bold'>*</span> */}
                                  </label>
                                  <select
                                    name={`publisherSelected`}
                                    value={this.state.publisherSelected}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                  >
                                    <option className='d-none'></option>
                                    {this.state.publisher.map((_data, _key) => (
                                      <option value={_data.value} key={_key}>
                                        {_data.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${this.state.year ||
                                    this.state.foucs === 'year'
                                    ? 'active'
                                    : ''
                                    }`}
                                >
                                  <div className='icon-field'>
                                    <DateRangeRoundedIcon />
                                  </div>
                                  <div className='col p-0'>
                                    <label>
                                      سال انتشار
                                      {/* <span className='star IranSans_Bold'>*</span> */}
                                    </label>
                                    <input
                                      type='number'
                                      name='year'
                                      value={handleString(this.state.year)}
                                      onFocus={e => this.OnFocus(e.target.name)}
                                      onBlur={this.OnBlur}
                                      onChange={this.handleChange}
                                      maxLength={4}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div
                                  className={`field-form persian ${this.state.foucs === 'edition' ||
                                    this.state.edition
                                    ? 'active'
                                    : ''
                                    }`}
                                >
                                  <label>
                                    شماره ویرایش سند
                                    {/* <span className='star IranSans_Bold'>*</span> */}
                                  </label>
                                  <input
                                    type='text'
                                    name='edition'
                                    value={handleString(this.state.edition)}
                                    onFocus={e => this.OnFocus(e.target.name)}
                                    onBlur={this.OnBlur}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
                                <div className='field-radio w-100'>
                                  <label>
                                    وضعیت
                                    {/* <span className='star IranSans_Bold'>*</span> */}
                                  </label>
                                  <div className='main-radio pr-0'>
                                    <div className='radio-button mr-0 ml-0'>
                                      <input
                                        className='d-none'
                                        type='radio'
                                        id='ALL'
                                        onClick={() =>
                                          this.setState({ status: 'ALL' })
                                        }
                                      />
                                      <label htmlFor='ALL'>
                                        {this.state.status === 'ALL' ? (
                                          <RadioButtonCheckedIcon />
                                        ) : (
                                          <RadioButtonUncheckedIcon />
                                        )}
                                        تمام ویرایش‌ها
                                      </label>
                                    </div>
                                    <div className='radio-button mr-0 ml-0'>
                                      <input
                                        className='d-none'
                                        type='radio'
                                        id='LAST_EDITION'
                                        onClick={() =>
                                          this.setState({
                                            status: 'LAST_EDITION'
                                          })
                                        }
                                      />
                                      <label htmlFor='LAST_EDITION'>
                                        {this.state.status ===
                                          'LAST_EDITION' ? (
                                          <RadioButtonCheckedIcon />
                                        ) : (
                                          <RadioButtonUncheckedIcon />
                                        )}
                                        آخرین ویرایش‌
                                      </label>
                                    </div>
                                    <div className='radio-button mr-0 ml-0'>
                                      <input
                                        className='d-none'
                                        type='radio'
                                        id='DRAFT'
                                        onClick={() =>
                                          this.setState({ status: 'DRAFT' })
                                        }
                                      />
                                      <label htmlFor='DRAFT'>
                                        {this.state.status === 'DRAFT' ? (
                                          <RadioButtonCheckedIcon />
                                        ) : (
                                          <RadioButtonUncheckedIcon />
                                        )}
                                        پیش نویس شده‌
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='submit-form col-12 mt-4'>
                                <button
                                  className='justify-content-center'
                                  onClick={this.hadnleSubmit}
                                  disabled={this.state.disabled}
                                >
                                  {this.state.loading === 'submit' ? (
                                    <Loading className='form-loader' />
                                  ) : (
                                    <DoneIcon />
                                  )}
                                  جستجو
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
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
