import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import StaticData from '../staticData'
import AccessLevel from './AccessLevel'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import axios from 'axios'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import CreatableSelect from 'react-select/creatable'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
export default class CreateUserGroup extends Component {
  constructor (props) {
    super(props)
    this.Counter = null
    this.state = {
      token: Cookies.get('token'),
      nameGroup: '',
      foucs: '',
      right: 0,
      width: 0,
      checkActive: 0,
      accessList: [],
      Selected: {},
      loading: '',
      disabled: false,
      redirect: false,
      id: '',
      office_list: [],
      office: null,
      unit_list: [],
      unit: null,
      nameGroup_list: [
        { value: 'رئیس', label: 'رئیس' },
        { value: 'مدیر', label: 'مدیر' },
        { value: 'سایر', label: 'سایر' }
      ],
      unit_list_for_title: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ایجاد گروه کاربری`
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    this.setState({ id: id })
    this.fetchDate(id)
  }
  handleArray = array => {
    let _result = []
    array.forEach(data => {
      let obj1 = data
      obj1['label'] = handleString(obj1['label'])
      obj1['name'] = handleString(obj1['name'])
      if (obj1.fields) {
        let array2 = obj1.fields
        let _result2 = []
        array2.forEach(data2 => {
          let obj2 = data2
          obj2['label'] = handleString(obj2['label'])
          obj2['name'] = handleString(obj2['name'])
          if (obj2.subfields) {
            let array4 = obj2.subfields
            let _result4 = []
            array4.forEach(data4 => {
              let obj4 = data4
              obj4['label'] = handleString(obj4['label'])
              obj4['name'] = handleString(obj4['name'])
              _result4.push(obj4)
            })
            obj2['subfields'] = _result4
          }
          _result2.push(obj2)
        })
        obj1['fields'] = _result2
      } else if (obj1.subfields) {
        let array3 = obj1.subfields
        let _result3 = []
        array3.forEach(data3 => {
          let obj3 = data3
          obj3['label'] = handleString(obj3['label'])
          obj3['name'] = handleString(obj3['name'])
          _result3.push(obj3)
        })
        obj1['subfields'] = _result3
      }
      _result.push(obj1)
    })
    return _result
  }
  fetchDate = id => {
    if (this.state.token) {
      axios
        .get(`${StaticData.domainIp}/role/getRole/${id}`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(async response => {
          if (response.status === 200) {
            const {
              allRole,
              roleDetail,
              office_list,
              unit_list_for_title,
              // project_code
            } = await response.data.content
            const _office =
              roleDetail.office && roleDetail.office_id
                ? { label: roleDetail.office, value: roleDetail.office_id }
                : {}
            this.SelectOffice(_office)
            const _unit =
              roleDetail.unit && roleDetail.unit_id
                ? { label: roleDetail.unit, value: roleDetail.unit_id }
                : {}
            let array = roleDetail.title.split(' - ')
            if (array) {
              let nameGroup = array[0] ? array[0].trim() : ''
              let _value = array[1] ? array[1] : ''
              nameGroup =
                nameGroup !== 'مدیر' && nameGroup !== 'رئیس'
                  ? 'سایر'
                  : nameGroup
              const foundAnswer = () => {
                let answer = null,
                  _data_ = []
                switch (nameGroup) {
                  case 'مدیر':
                    _data_ = office_list.filter(_dt => _dt.label === _value)
                    _data_ = _data_.length > 0 ? _data_[0] : ''
                    answer = { offiecTop: _data_ }
                    break
                  case 'رئیس':
                    _data_ = unit_list_for_title.filter(
                      _dt => _dt.label === _value
                    )
                    _data_ = _data_.length > 0 ? _data_[0] : ''
                    answer = { unitTop: _data_ }
                    break
                  case 'سایر':
                    let _array = roleDetail.title.split('-')
                    let _groupTiltle = _array[0],
                      _groupName = _array[1]
                    answer = {
                      _groupTiltle: _groupTiltle,
                      _groupName: _groupName
                    }
                    break
                  default:
                    answer = null
                }
                return answer
              }
              let obj1 = {
                accessList: this.handleArray(allRole),
                Selected: this.handleText(roleDetail.role),
                nameGroup: nameGroup,
                office_list: office_list,
                office: _office,
                unit: _unit,
                unit_list_for_title: unit_list_for_title,
                project_code : handleString(roleDetail.project_code)
              }
              let obj2 = foundAnswer()
              let merge = { ...obj1, ...obj2 }
              this.setState(obj2 ? merge : obj1)
            }
            if (this.refs.label_0) {
              await this.setState({ width: this.refs.label_0.offsetWidth })
            }
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
  }
  handleText = obj => {
    let result = {}
    Object.keys(obj).map(_value => {
      result[handleString(_value)] = obj[_value]
    })
    return result
  }
  handleShowSecondBox = () => {
    const {
      nameGroup,
      office_list,
      offiecTop,
      _groupTiltle,
      foucs,
      unit_list_for_title,
      unitTop,
      _groupName
    } = this.state
    const result = []

    switch (nameGroup) {
      case 'سایر':
        result.push(
          <div className='w-100 row mx-0'>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  foucs === '_groupTiltle' || _groupTiltle ? 'active' : ''
                }`}
              >
                <label>
                  عنوان
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  type='text'
                  value={handleString(_groupTiltle)}
                  name='_groupTiltle'
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  foucs === '_groupName' || _groupName ? 'active' : ''
                }`}
              >
                <label>
                  متن
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  type='text'
                  value={handleString(_groupName)}
                  name='_groupName'
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        )
        break
      case 'مدیر':
        result.push(
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div className='field-form selectBox'>
              <CreatableSelect
                onChange={newValue =>
                  this.setState({
                    offiecTop: newValue.__isNew__ ? null : newValue
                  })
                }
                value={offiecTop}
                options={office_list}
                placeholder={
                  <label className='rtl'>
                    اداره
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                }
              />
            </div>
          </div>
        )
        break
      case 'رئیس':
        result.push(
          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
            <div className='field-form selectBox'>
              <CreatableSelect
                onChange={newValue =>
                  this.setState({
                    unitTop: newValue.__isNew__ ? null : newValue
                  })
                }
                value={unitTop}
                options={unit_list_for_title}
                placeholder={
                  <label className='rtl'>
                    واحد
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                }
              />
            </div>
          </div>
        )
        break
    }
    return result
  }
  handleActive = num => {
    let elm = this.refs[`label_${num}`],
      tab = this.refs.tab
    if (elm && tab && this.Counter) {
      this.Counter()
      let left = -(num * (tab.offsetWidth / 4) - elm.offsetWidth)
      tab.scrollTo({
        top: 0,
        left: left,
        behavior: 'smooth'
      })
      this.setState({
        width: elm.offsetWidth,
        right: num * elm.offsetWidth,
        checkActive: num
      })
    }
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: handleString(e.target.value) })
  }
  handleSubmit = () => {
    let {
      Selected,
      nameGroup,
      unit,
      token,
      id,
      offiecTop,
      unitTop,
      _groupName,
      _groupTiltle,
      project_code
    } = this.state
    const handleNameGroup = () => {
      let resultText = ''
      if (handleCheckText(nameGroup)) {
        switch (nameGroup) {
          case 'مدیر':
            if (offiecTop) resultText = `مدیر - ${offiecTop.label}`
            break
          case 'رئیس':
            if (unitTop) resultText = `رئیس - ${unitTop.label}`
            break
          case 'سایر':
            if (handleCheckText(_groupTiltle) && handleCheckText(_groupName)) {
              resultText = `${handleString(
                _groupTiltle
              ).trim()} - ${handleString(_groupName).trim()}`
            }
            break
          default:
            resultText = ''
            break
        }
      }
      return resultText
    }
    const Title = handleNameGroup()
    const check =
      handleCheckText(Title) &&
      handleCheckText(project_code) &&
      unit !== null &&
      Object.keys(Selected).length > 0
    if (check) {
      this.setState({ loading: 'submit', disabled: true })
      let datareg = new FormData()
      datareg.append('title', handleString(Title).trim())
      datareg.append('role', JSON.stringify(Selected))
      datareg.append('unit_id', unit.value)
      datareg.append('project_code', project_code)
      axios({
        method: 'post',
        url: `${StaticData.domainIp}/role/update/${id}`,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            Notification.notify(Message.text(901), 'success')
            setTimeout(() => {
              this.setState({ disabled: false, redirect: true })
            }, 5000)
          } else {
            this.setState({ disabled: false })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({ loading: '', disabled: false })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  handleTotal = () => {
    let counter = 0
    const { accessList, Selected } = this.state
    if (accessList && Selected) {
      Object.keys(accessList).map(level => {
        let __fields = accessList[level].fields
        if (__fields) {
          Object.keys(__fields).map(filed => {
            if (Selected[__fields[filed].name]) {
              counter++
            }
            return true
          })
        }
        return true
      })
    }
    return counter
  }
  SelectOffice = nextValue => {
    const { __isNew__, value } = nextValue
    this.setState({ unit_list: [], unit: null })
    if (!__isNew__ && nextValue) {
      this.setState({ office: nextValue })
      const url = `${StaticData.domainIp}/role/getListUnit/${value}`
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(async response => {
          if (response.status === 200) {
            const { unit_list } = response.data.content
            this.setState({ unit_list: unit_list })
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
  }
  render () {
    if (!this.state.token) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return <Redirect to='/index-user-group' />
    } else {
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
                <Menu nameRole='' nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>ویرایش گروه کاربری</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row justify-content-start persian'>
                          <div className='title-password w-100 mt-3 mb-2'>
                            <h2 className='IranSans_Bold'>نام گروه کاربری</h2>
                            <div className='line'></div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state.foucs === 'nameGroup' ||
                                this.state.nameGroup
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <label>
                                دسته
                                <span className='star IranSans_Bold'>*</span>
                              </label>
                              <select
                                name='nameGroup'
                                value={handleString(this.state.nameGroup)}
                                onFocus={e => this.OnFocus(e.target.name)}
                                onBlur={this.OnBlur}
                                onChange={e =>
                                  this.setState({
                                    [e.target.name]: handleString(
                                      e.target.value
                                    ),
                                    _groupTiltle: '',
                                    unitTop: null,
                                    offiecTop: null,
                                    _groupName: ''
                                  })
                                }
                              >
                                <option className='d-none'></option>
                                {this.state.nameGroup_list.map((data, key) => (
                                  <option value={data.value} key={key}>
                                    {data.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          {this.handleShowSecondBox()}
                          <div className='w-100'>
                            <div className='title-password w-100 mt-3 mb-2'>
                              <h2 className='IranSans_Bold'>اداره / واحد</h2>
                              <div className='line'></div>
                            </div>
                            <div className='row mx-0'>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div className='field-form selectBox'>
                                  <CreatableSelect
                                    onChange={this.SelectOffice}
                                    value={this.state.office}
                                    options={this.state.office_list}
                                    placeholder={
                                      <label className='rtl'>
                                        اداره
                                        <span className='star IranSans_Bold'>
                                          *
                                        </span>
                                      </label>
                                    }
                                  />
                                </div>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                                <div className='field-form selectBox'>
                                  <CreatableSelect
                                    onChange={newValue =>
                                      this.setState({ unit: newValue })
                                    }
                                    value={this.state.unit}
                                    options={this.state.unit_list}
                                    isDisabled={this.state.office === null}
                                    placeholder={
                                      <label className='rtl'>
                                        واحد
                                        <span className='star IranSans_Bold'>
                                          *
                                        </span>
                                      </label>
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='title-password w-100 mt-3 mb-2'>
                            <div className='line'></div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                            <div
                              className={`field-form persian ${
                                this.state.foucs === 'project_code' ||
                                this.state.project_code
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              <label>
                                پروژه
                                <span className='star IranSans_Bold'>*</span>
                              </label>
                              <input
                                type='text'
                                name='project_code'
                                onFocus={e => this.OnFocus(e.target.name)}
                                onBlur={this.OnBlur}
                                onChange={this.handleChange}
                                value={handleString(this.state.project_code)}
                              />
                            </div>
                          </div>
                          <div className='col-12'>
                            <div className='access'>
                              <div className='title-access'>
                                <h3 className='text-title'>
                                  تعیین سطوح دسترسی
                                </h3>
                                <div className='line col pl-0'></div>
                              </div>
                              <div className='main-accsess'>
                                <div className='tab overflow-hidden' ref='tab'>
                                  {this.state.accessList.map(
                                    (data, key) =>
                                      data && (
                                        <span
                                          key={key}
                                          ref={`label_${key}`}
                                          className={`col-3 px-0 label fix_width ${
                                            this.state.checkActive === key
                                              ? 'active IranSans_Bold'
                                              : ''
                                          }`}
                                          onClick={() => this.handleActive(key)}
                                        >
                                          {data.label}
                                        </span>
                                      )
                                  )}
                                  <div
                                    className='line-active _hidden'
                                    style={{
                                      right: `${this.state.right}px`,
                                      width: `${this.state.width}px`
                                    }}
                                  ></div>
                                </div>
                                {this.state.accessList.map(
                                  (data, key) =>
                                    this.state.checkActive === key && (
                                      <AccessLevel
                                        // handleSelecTed={this.handleSelecTed}
                                        data={data}
                                        key={key}
                                        accessList={this.state.accessList}
                                        id={key}
                                        // Reset={(e) => this.Reset = e}
                                        Selected={this.state.Selected}
                                        handleState={(name, value) =>
                                          this.setState({ [name]: value })
                                        }
                                        handleTotal={this.handleTotal}
                                        getCounter={fn => (this.Counter = fn)}
                                      />
                                    )
                                )}
                              </div>
                            </div>
                          </div>
                          <div className='submit-form col-12'>
                            <button
                              onClick={this.handleSubmit}
                              disabled={this.state.disabled}
                            >
                              {this.state.loading === 'submit' ? (
                                <Loading className='form-loader' />
                              ) : (
                                <DoneIcon />
                              )}
                              ثبت اطلاعات
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
      )
    }
  }
}
