import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
// import Sidebar from '../layout/sidebar'
// import Menu from '../layout/menu'
import StaticData from '../staticData'
// import DatePicker from 'react-datepicker2';
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import ListItems from './listItems'
import AddIcon from '@material-ui/icons/Add'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import ListSign from './ListSign'
import SignTSR from './SignTSR'
import Permision from '../permision/permision'
import { TrendingUpTwoTone } from '@material-ui/icons'
import CancelButton from '../layout/CancelButton'
// import Revisions from './Revisions'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
export default class PreliminaryReview extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      number: '',
      date: '',
      subject: '',
      issued_status: true,
      conditionsList: [
        {
          value:
            'درخواست‌، ماهیت تعمیراتی دارد و بایستی درخواست کار تعمیراتی صادر گردد',
          label:
            'درخواست‌، ماهیت تعمیراتی دارد و بایستی درخواست کار تعمیراتی (W.O) صادر گردد'
        },
        {
          value:
            'درخواست، اجرای اصلاحات موقتی می‌باشد که نیازی به تغییر در اسناد فنی نمی‌باشد',
          label:
            'درخواست، اجرای اصلاحات موقتی می‌باشد که نیازی به تغییر در اسناد فنی نمی‌باشد'
        },
        {
          value: 'درخواست، مربوط به خارج از محدوده تعریف شده مجتمع می‌باشد',
          label: 'درخواست، مربوط به خارج از محدوده تعریف شده مجتمع می‌باشد'
        },
        {
          value:
            'درخواست، ماهیت پروژه‌ای دارد و بایستی در قالب درخواست پروژه صادر گردد',
          label:
            'درخواست، ماهیت پروژه‌ای دارد و بایستی در قالب درخواست پروژه (PRA) صادر گردد'
        },
        {
          value:
            'درخواست، اضطراری بوده و بایستی از طریق برگزاری جلسه فنی تصمیم گیری گردد',
          label:
            'درخواست، اضطراری بوده و بایستی از طریق برگزاری جلسه فنی تصمیم گیری گردد'
        },
        {
          value:
            'درخواست، اجرای اصلاحلات موقتی است و نیازمند تغییر در اسناد فنی می‌باشد.',
          label:
            'درخواست، با حوزه تخصصی اداره متقاضی (بند 1-6 روش اجرایی) تطابق ندارد'
        },
        {
          value: 'سایر موارد',
          label: 'سایر موارد'
        }
      ],
      issued_description: '',
      responsible: [{ position_group: '', user_id: '', org_position: '' }],
      undergraduate_group: [
        { position_group: '', user_id: '', org_position: '' }
      ],
      disabled: false,
      listSign: [],
      canCreate: false,
      user_list: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - بررسی اولیه و انتخاب مسئول TSR و گروه کارشناسی`
    this.props.GetShowFetch(2, this.ShowFetch)
    this.ShowFetch()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      // this.ShowFetch()
    }
  }
  ShowFetch = () => {
    let { tsr2 } = this.props.state,
      obj = {}
    if (tsr2) {
      for (let value in tsr2) {
        let state
        if (value.includes('tsr2_')) {
          state = value.split('tsr2_')[1]
        } else {
          state = value
        }
        if (state === 'reject_reasons') {
          if (tsr2[value]) {
            let list = tsr2[value].split(',')
            list.forEach(li => {
              obj[`improvement_${li}`] = TrendingUpTwoTone
            })
          }
        } else if (state === 'issued_description') {
          if (this.props.show || this.props.canUpdate) {
            obj[state] = tsr2[value]
          } else {
            obj[state] = ''
          }
        } else if (state === 'responsible' || state === 'undergraduate_group') {
          if (tsr2[value].length === 0) {
            obj[state] = [{ position_group: '', user_id: '', org_position: '' }]
          } else {
            obj[state] = tsr2[value]
          }
        } else if (state !== 'issued_status') {
          obj[state] = tsr2[value]
        } else {
          if (this.props.show || this.props.canUpdate) {
            obj[state] = tsr2[value] === '1' ? true : false
          } else {
            obj[state] = true
          }
        }
      }
      let ListMandatory = ListSign.ListMandatory.tsr2
      let listSign = this.state.listSign
      ListMandatory.forEach(li => {
        listSign = [...listSign, li]
      })
      listSign = [...new Set(listSign)]
      obj['listSign'] = listSign
      obj['role'] = this.props.state.role
      obj['canCreate'] = this.Permision.handlePermision(
        this.props.state.role,
        'tsr_create'
      )
      obj['disabledRev'] = false
      this.setState(obj)
    }
  }
  OnFocus = name => {
    if (this.state.canCreate && this.props.state.can_do_action) {
      this.setState({ foucs: name })
    }
  }
  OnBlur = () => {
    if (this.state.canCreate && this.props.state.can_do_action) {
      this.setState({ foucs: '' })
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleCheck = e => {
    if (this.state.canCreate && this.props.state.can_do_action) {
      this.setState({ [e.target.name]: e.target.checked })
    }
  }
  handleChangeList = (nameState, name, value) => {
    if (this.state.canCreate && this.props.state.can_do_action) {
      let list = this.state[nameState]
      let key = parseInt(name.split('__')[2])
      name = name.split('__')[1]
      let obj = list[key]
      obj[name] = value
      this.setState({ [nameState]: list })
    }
  }
  handleAdd = nameState => {
    if (this.state.canCreate && this.props.state.can_do_action) {
      let obj = { position_group: '', user_id: '', org_position: '' }
      this.setState({ [nameState]: [...this.state[nameState], obj] })
    }
  }
  handleDelete = (nameState, key) => {
    if (this.state.canCreate && this.props.state.can_do_action) {
      let data = this.state[nameState]
      data.splice(key, 1)
      this.setState({ [nameState]: data })
    }
  }
  RejectReasons = () => {
    let list = []
    Object.keys(this.state).map(st => {
      if (st.includes('improvement_')) {
        if (this.state[st]) {
          st = st.split('improvement_')[1]
          if (st) {
            list.push(st)
          }
        }
      }
      return true
    })
    return list
  }
  handleSubmit = async () => {
    const {
      issued_status,
      issued_description,
      responsible,
      undergraduate_group,
      canCreate,
      token
    } = await this.state
    if (canCreate && token) {
      const check =
        (handleCheckText(issued_description) ||
          issued_description !== undefined) &&
        issued_status
          ? true
          : this.RejectReasons().length > 0
          ? true
          : false
      if (check) {
        this.setState({ loading: 'submit', disabled: true })
        let datareg = new FormData()
        datareg.append('tsr_id', this.props.state.id)
        datareg.append('issued_status', issued_status)
        datareg.append('reject_reasons', this.RejectReasons().join(','))
        datareg.append('issued_description', issued_description)
        datareg.append(
          'responsible',
          JSON.stringify(Object.assign({}, responsible))
        )
        datareg.append(
          'undergraduate_group',
          JSON.stringify(Object.assign({}, undergraduate_group))
        )
        await axios({
          method: 'post',
          url: `${StaticData.domainIp}/tsr/tsr2/insert`,
          data: datareg,
          headers: {
            Authorization: token ? `Bearer ${token}` : null
          }
        })
          .then(async response => {
            this.setState({ loading: '' })
            if (response.status === 200) {
              await Notification.notify(Message.text(900), 'success')
              setTimeout(async () => {
                await this.setState({ redirect: true, disabled: false })
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
        this.setState({ loading: '' })
        Notification.notify(Message.text(99), 'error')
      }
    }
  }
  handleIssuedStatus = status => {
    this.setState({ issued_status: status })
    if (!status) {
      this.setState({
        responsible: [{ position_group: '', user_id: '', org_position: '' }],
        undergraduate_group: [
          { position_group: '', user_id: '', org_position: '' }
        ]
      })
    } else {
      this.handleResetIsse()
    }
  }
  handleResetIsse = () => {
    for (let value in this.state) {
      if (value.includes('improvement_')) {
        this.setState({
          [value]: false
        })
      }
    }
  }
  handleDisabled = () => {
    if (this.props.close) {
      return true
    } else if (this.props.show) {
      return true
    } else if (this.state.canCreate) {
      return false
    } else if (this.props.canUpdate) {
      return false
    } else {
      return true
    }
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/index-TSR`,
            state: { select: 2 }
          }}
        />
      )
    } else
      return (
        <div className='form row justify-content-start'>
          {/* <Revisions {...this} /> */}
          <div className='w-100 row justify-content-start m-0'>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  handleCheckText(this.state.tsr_no) ? 'active' : ''
                }`}
              >
                <label>شماره TSR</label>
                <input
                  type='text'
                  name='tsr_no'
                  value={handleString(this.state.tsr_no)}
                  readOnly={true}
                  disabled={true}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  handleCheckText(this.state.created_at) ? 'active' : ''
                }`}
              >
                <div className='icon-field'>
                  <DateRangeRoundedIcon />
                </div>
                <div className='col p-0'>
                  <label>تاریخ درخواست</label>
                  <input
                    type='text'
                    name='number'
                    value={handleString(this.state.created_at)}
                    readOnly={true}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  handleCheckText(this.state.subject) ? 'active' : ''
                }`}
              >
                <div className='col p-0'>
                  <label>
                    موضوع
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <input
                    type='text'
                    name={`subject`}
                    value={handleString(this.state.subject)}
                    readOnly={true}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <div className='title-password col-12 mt-3 mb-2'>
              <h2 className='IranSans_Bold'>بررسی شرایط صدور TSR</h2>
              <div className='line'></div>
            </div>
            <div className='col-xl-12 col-lg-12 col-md-12 col-12 d-flex align-items-center p-0'>
              <div className='field-radio'>
                <div className='main-radio row'>
                  <div className='radio-button col-12 mt-3'>
                    {this.state.canCreate && this.props.state.can_do_action && (
                      <input
                        className='d-none'
                        type='radio'
                        id='yes'
                        name='issued_status'
                        value='yes'
                        // onClick={() => this.setState({ issued_status: true })}
                        onClick={() => this.handleIssuedStatus(true)}
                      />
                    )}
                    <label htmlFor='yes'>
                      {this.state.issued_status ? (
                        <RadioButtonCheckedIcon className='ml-1' />
                      ) : (
                        <RadioButtonUncheckedIcon className='ml-1' />
                      )}
                      درخواست ارائه شده با روش اجرایی درخواست‌های خدمات فنی
                      تطابق دارد.
                    </label>
                  </div>
                  <div className='radio-button col-12 mt-3'>
                    {!this.handleDisabled() && this.props.state.can_do_action && (
                      <input
                        className='d-none'
                        type='radio'
                        id='no'
                        name='issued_status'
                        value='no'
                        // onClick={() => this.setState({ issued_status: false })}
                        onClick={() => this.handleIssuedStatus(false)}
                      />
                    )}
                    <label htmlFor='no'>
                      {!this.state.issued_status ? (
                        <RadioButtonCheckedIcon className='ml-1' />
                      ) : (
                        <RadioButtonUncheckedIcon className='ml-1' />
                      )}
                      به دلیل عدم تطابق با روش اجرایی درخواست‌های فنی عودت داده
                      می‌شود.
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {!this.state.issued_status ? (
              <div className='col-12'>
                {this.state.conditionsList.map((data, key) => (
                  <div
                    className='disiplin-checkbox col-xl-12 col-lg-12 col-md-4 col-12 w-auto mt-3 mb-3 pr-4'
                    key={key}
                  >
                    <div className='checkbox m-0'>
                      {!this.handleDisabled() &&
                        this.props.state.can_do_action && (
                          <input
                            className='d-none'
                            id={`improvement_${data.value}`}
                            name={`improvement_${data.value}`}
                            type='checkbox'
                            onChange={e => this.handleCheck(e)}
                            checked={
                              this.state[`improvement_${data.value}`]
                                ? true
                                : false
                            }
                          />
                        )}
                      <label
                        className='full'
                        htmlFor={`improvement_${data.value}`}
                      >
                        {this.state[`improvement_${data.value}`] ? (
                          <CheckBoxRoundedIcon />
                        ) : (
                          <CheckBoxOutlineBlankRoundedIcon />
                        )}
                        {data.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
              <div
                className={`field-form persian textarea ${
                  this.state.foucs === `issued_description` ||
                  handleCheckText(this.state.issued_description)
                    ? 'active'
                    : ''
                }`}
              >
                <div className='col p-0'>
                  <label className='textarea'>
                    توضیحات
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <textarea
                    className='w-100'
                    type='text'
                    name={`issued_description`}
                    onFocus={e => this.OnFocus(e.target.name)}
                    onBlur={this.OnBlur}
                    onChange={this.handleChange}
                    value={handleString(this.state.issued_description)}
                    readOnly={this.handleDisabled()}
                    disabled={this.handleDisabled()}
                  ></textarea>
                </div>
              </div>
            </div>
            {this.state.issued_status && (
              <React.Fragment>
                <div className='w-100'>
                  <div className='title-password col-12 mt-3 mb-2'>
                    <h2 className='IranSans_Bold'>مسئول TSR</h2>
                    <div className='line'></div>
                  </div>
                  <div className='col-12'>
                    <div className='box-note'>
                      <p className='m-0'>
                        در صورت تطابق درخواست با شرایط صدور TSR، مسئول آن و گروه
                        کارشناسی انتخاب گردد.
                      </p>
                    </div>
                  </div>
                  {this.state.responsible.map((data, key) => (
                    <ListItems
                      {...this}
                      key={key}
                      data={data}
                      _key={key}
                      name='responsible'
                      length={this.state.responsible.length}
                    />
                  ))}
                  {!this.handleDisabled() && (
                    <div className='button-add col-12'>
                      <button onClick={() => this.handleAdd('responsible')}>
                        <AddIcon />
                        افزودن مورد جدید
                      </button>
                    </div>
                  )}
                </div>
                <div className='w-100'>
                  <div className='title-password col-12 mt-3 mb-2'>
                    <h2 className='IranSans_Bold'>گروه کارشناسی</h2>
                    <div className='line'></div>
                  </div>
                  {this.state.undergraduate_group.map((data, key) => (
                    <ListItems
                      {...this}
                      key={key}
                      length={this.state.undergraduate_group.length}
                      data={data}
                      _key={key}
                      name='undergraduate_group'
                    />
                  ))}
                  {!this.handleDisabled() && (
                    <div className='button-add col-12'>
                      <button
                        onClick={() => this.handleAdd('undergraduate_group')}
                      >
                        <AddIcon />
                        افزودن مورد جدید
                      </button>
                    </div>
                  )}
                </div>
              </React.Fragment>
            )}
            {this.state.canCreate &&
            this.props.state.can_do_action &&
            !this.props.show ? (
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
                <CancelButton redirect='index-TSR' />
              </div>
            ) : (
              <SignTSR
                {...this}
                handleState={(name, value) => this.setState({ [name]: value })}
                permision='tsr2_signs'
                disabled={this.handleDisabled()}
              />
            )}
          </div>
        </div>
      )
  }
}
