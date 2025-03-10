import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import StaticData from '../staticData'
// import DatePicker from 'react-datepicker2';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import AddIcon from '@material-ui/icons/Add'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import DifficultiesItems from './DifficultiesItems'
import ListSign from './ListSign'
import SignTSR from './SignTSR'
import Permision from '../permision/permision'
import getCustomFormat from '../getCustomFormat'
import CancelButton from '../layout/CancelButton'
import Dispatch from './Dispatch'
import TOCC from './TOCC'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
export default class CheckEndWork extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.state = {
      token: Cookies.get('token'),
      tsr_no: '',
      created_at: '',
      subject: '',
      disabled: false,
      considerations: '',
      review_result: false,
      executed_problems: [
        {
          description: '',
          FollowUp: '',
          actionDate: undefined,
          confirmation: ''
        }
      ],
      foucs: '',
      instructionNumber: '',
      listSign: [],
      user_list: [],
      notification_to: [],
      notification_cc: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - بررسی پایان اجرای کار`
    this.ShowFetch()
    this.props.GetShowFetch(10, this.ShowFetch)
  }
  async componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = await nextProps
      // await this.ShowFetch()
    }
  }
  ShowFetch = async () => {
    let tsr10 = await this.props.state.tsr10,
      obj = {}
    if (tsr10) {
      for (let value in tsr10) {
        let state
        if (value.includes('tsr10_')) {
          state = value.split('tsr10_')[1]
        } else {
          state = value
        }
        if (state === 'executed_problems') {
          if (this.props.show || this.props.canUpdate) {
            let objDetail = tsr10[value]
            if (objDetail) {
              obj[state] = Object.keys(objDetail).map(ex => {
                return objDetail[ex]
              })
            }
          }
        } else if (state === 'review_result') {
          if (this.props.show || this.props.canUpdate) {
            obj[state] = tsr10[value] === '1'
          } else {
            obj[state] = true
          }
        } else {
          obj[state] = tsr10[value]
        }
      }
      let ListMandatory = await ListSign.ListMandatory.tsr10
      let listSign = await this.state.listSign
      ListMandatory.forEach(li => {
        listSign = [...listSign, li]
      })
      listSign = await [...new Set(listSign)]
      obj['listSign'] = await listSign
      obj['role'] = await this.props.state.role
      obj['canCreate'] = await this.Permision.handlePermision(
        this.props.state.role,
        'tsr_create'
      )
      await this.setState(obj)
    }
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    if (this.state.canCreate && !this.props.show) {
      this.setState({ foucs: '' })
    }
  }
  handleChange = e => {
    if (this.state.canCreate && !this.props.show) {
      this.setState({ [e.target.name]: e.target.value })
    }
  }
  handleUpload = (e, files, names) => {
    if (this.state.canCreate && !this.props.show) {
      e.preventDefault()
      this.setState({ loading: files })
      for (let i = 0; i < e.target.files.length; i++) {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[i])
        this.GetLink(files, e.target.files[i], names, e.target.files.length, i)
      }
    }
  }
  GetLink = (nameState, file, names, length, i) => {
    let datareg = new FormData()
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/ProcessTsr`,
      data: datareg,
      headers: {
        Authorization: this.state.token ? `Bearer ${this.state.token}` : null
      }
    })
      .then(async response => {
        if (i + 1 === length) {
          this.setState({ loading: '' })
        }
        if (response.status === 200) {
          await this.setState({
            [names]: [...this.state[names], file.name],
            [nameState]: [...this.state[nameState], response.data.content]
          })
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
  deleteFile = (num, files, names) => {
    if (this.state.canCreate && !this.props.show) {
      let data = this.state[`${files}`],
        data2 = this.state[`${names}`]
      data.splice(num, 1)
      data2.splice(num, 1)
      this.setState({ [files]: data, [names]: data2 })
    }
  }
  handleChangeList = (parent, name, value, key) => {
    if (this.state.canCreate && !this.props.show) {
      let list = this.state[parent]
      let obj = list[key]
      obj[name] = value
      this.setState({ [parent]: list })
    }
  }
  ChangeDateList = (date, key, nameState, name) => {
    if (this.state.canCreate && !this.props.show) {
      let list = this.state[nameState]
      let obj = list[key]
      obj[name] = getCustomFormat(date, false)
      this.setState({ [nameState]: list })
    }
  }
  handleAdd = nameState => {
    if (this.state.canCreate && !this.props.show) {
      let obj = {
        description: '',
        FollowUp: '',
        actionDate: undefined,
        confirmation: ''
      }
      this.setState({ [nameState]: [...this.state[nameState], obj] })
    }
  }
  handleDelete = (nameState, key) => {
    if (this.state.canCreate && !this.props.show) {
      let data = this.state[nameState]
      data.splice(key, 1)
      this.setState({ [nameState]: data })
    }
  }
  handleSubmit = async () => {
    let {
      review_result,
      executed_problems,
      notification_to,
      notification_cc,
      listSign
    } = await this.state
    const CheckTo = notification_to
      ? notification_to.length === listSign.length && notification_to.length > 0
      : false
    executed_problems = await Object.assign({}, executed_problems)
    let datareg = await new FormData()
    this.setState({ loading: 'submit', disabled: true })
    const _check = CheckTo
    if (_check) {
      let To = await Object.keys(notification_to).map(toData => {
        return notification_to[toData].value
      })
      notification_cc = notification_cc ? notification_cc : []
      let CC = await Object.keys(notification_cc).map(toData => {
        return notification_cc[toData].value
      })
      await datareg.append('tsr_id', this.props.state.id)
      await datareg.append('review_result', review_result)
      await datareg.append(
        'executed_problems',
        JSON.stringify(executed_problems)
      )
      await datareg.append('notification_to', To.join(','))
      await datareg.append('notification_cc', CC.join(','))
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/tsr/tsr10/insert`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
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
      Notification.notify(Message.text(99), 'error')
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
  handleState = (name, value) => {
    this.setState({ [name]: value })
  }
  render () {
    const ShowToCC =
      !this.handleDisabled() &&
      this.props.state.can_do_action &&
      !this.props.close
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
          <div className='w-100 row justify-content-start m-0'>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  handleCheckText(this.state.tsr_no) ? 'active' : ''
                }`}
              >
                <label>
                  شماره TSR
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  type='text'
                  name='number'
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
                  <label>
                    تاریخ
                    <span className='star IranSans_Bold'>*</span>
                  </label>
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
                <label>
                  موضوع
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  type='text'
                  name='subject'
                  value={handleString(this.state.subject)}
                  readOnly={true}
                  disabled={true}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  this.state.foucs === 'instructionNumber' ||
                  handleCheckText(this.state.instructionNumber)
                    ? 'active'
                    : ''
                }`}
              >
                <label>شماره دستور العمل</label>
                <input
                  type='text'
                  name='instructionNumber'
                  value={handleString(this.state.instructionNumber)}
                  readOnly={true}
                  disabled={true}
                />
              </div>
            </div>
            <div className='col-xl-12 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
              <div className='field-radio w-100'>
                <label>
                  نتیجه بررسی
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <div className='main-radio pr-0'>
                  <div className='radio-button mr-1 ml-1'>
                    {!this.handleDisabled() && (
                      <input
                        className='d-none'
                        type='radio'
                        id='yes'
                        onClick={() => this.setState({ review_result: true })}
                      />
                    )}
                    <label htmlFor='yes'>
                      {this.state.review_result ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      مورد تایید است
                    </label>
                  </div>
                  <div className='radio-button mr-1 ml-1'>
                    {!this.handleDisabled() && (
                      <input
                        className='d-none'
                        type='radio'
                        id='no'
                        onClick={() => this.setState({ review_result: false })}
                      />
                    )}
                    <label htmlFor='no'>
                      {!this.state.review_result ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      مورد تایید نیست
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-100'>
              <div className='title-password col-12 mt-3 mb-2'>
                <h2 className='IranSans_Bold'>لیست مشکلات کار اجرا شده</h2>
                <div className='line'></div>
              </div>
              {this.state.executed_problems.map((data, key) => (
                <DifficultiesItems
                  {...this}
                  data={data}
                  key={key}
                  _key={key}
                  name='executed_problems'
                  length={this.state.executed_problems.length}
                />
              ))}
              {!this.handleDisabled() && (
                <div className='button-add col-12'>
                  <button onClick={() => this.handleAdd('executed_problems')}>
                    <AddIcon />
                    افزودن مورد جدید
                  </button>
                </div>
              )}
            </div>
            {ShowToCC ? <TOCC {...this} /> : ''}
            {this.props.close ? (
              ''
            ) : !this.handleDisabled() && this.props.state.can_do_action ? (
              <React.Fragment>
                <Dispatch {...this} />
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
              </React.Fragment>
            ) : (
              <SignTSR
                {...this}
                handleState={(name, value) => this.setState({ [name]: value })}
                permision='tsr10_signs'
                disabled={this.handleDisabled()}
              />
            )}
          </div>
        </div>
      )
  }
}
