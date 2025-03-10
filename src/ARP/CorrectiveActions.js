import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import StaticData from '../staticData'
// import DatePicker from 'react-datepicker2';
// import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
// import Clock from '../clock/clock'
// import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import SimilarEvents from './SimilarEvents'
import AddIcon from '@material-ui/icons/Add'
import ListSign from './ListSign'
import SignARP from './SignARP'
import Permision from '../permision/permision'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import CancelButton from '../layout/CancelButton'
import handleCheckText from '../handleCheckText'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import HeadTopFirst from './HeadTopFirst'
import HanldeToCC from './HanldeToCC'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import handleString from '../handleString'
export default class CorrectiveActions extends Component {
  constructor(props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      documentNumber: '',
      arp_no: '',
      created_at: undefined,
      unit: '',
      numberLabel: '',
      equipment_name: '',
      dateAccident: undefined,
      _corrective_actions: [
        { description: '', responsible: [], status: '', action: '' }
      ],
      listSign: [],
      responsible_list: [
        { label: 'خدمات فنی', value: 'خدمات فنی' },
        { label: 'بهره برداری', value: 'بهره برداری' },
        { label: 'تعمیرات', value: 'تعمیرات' },
        { label: 'HSE', value: 'HSE' }
      ],
      attachment: [],
      attachmentName: [],
      canCreate: false
    }
  }
  componentDidMount() {
    document.title = `${StaticData.Title} - اقدامات اصلاحی جهت جلوگیری از حوادث مشابه`
    this.ShowFetch()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.ShowFetch()
    }
  }
  ShowFetch = async () => {
    const { state } = await this.props
    if (state) {
      state['canCreate'] = await state.secretary_committee_allow
      for (let value in state) {
        if (value === 'event_type') {
          let _data = state[value]
          const checkOther =
            _data !== 'انسانی' &&
            _data !== 'خسارت به تجهیزات' &&
            _data !== 'Total S/D' &&
            _data !== 'زیست محیطی' &&
            _data !== 'نشتی مواد' &&
            _data !== 'آتش سوزی'
          if (checkOther) {
            if (!state['other_event_type']) {
              state[value] = 'other'
              state['other_event_type'] = _data
            }
          }
        }
      }
      let ListMandatory = await ListSign.ListMandatory.arp4
      let listSign = await this.state.listSign
      await ListMandatory.forEach(li => {
        listSign = [...listSign, li]
      })
      listSign = await [...new Set(listSign)]
      state['listSign'] = await listSign
      if (state.corrective_actions) {
        if (
          state.corrective_actions.length &&
          state.corrective_actions.length > 0
        ) {
          let { corrective_actions } = state
          let { responsible_list } = this.state
          let array = []
          corrective_actions.forEach(data => {
            let filter = responsible_list.filter(_data =>
              data.responsible.includes(_data.value)
            )
            if (filter.length > 0) {
              data.responsible = filter
              array.push(data)
            }
          })

          if (array.length > 0) {
            state['_corrective_actions'] = array
          } else {
            state['_corrective_actions'] = state.corrective_actions
          }
        }
      }
      if (state.document_link_arp4) {
        if (state.document_link_arp4.length > 0) {
          state['attachment'] = await state.document_link_arp4
          state['attachmentName'] = await state.document_link_arp4
        }
      }
      await this.setState(state)
    }
  }
  OnFocus = name => {
    if (!this.handleDisabled()) {
      this.setState({ foucs: name })
    }
  }
  OnBlur = () => {
    if (!this.handleDisabled()) {
      this.setState({ foucs: '' })
    }
  }
  handleChange = e => {
    if (!this.handleDisabled()) {
      this.setState({ [e.target.name]: handleString(e.target.value) })
    }
  }
  handleChangeList = (nameState, name, value) => {
    let list = this.state[nameState]
    let key = parseInt(name.split('_')[1])
    name = name.split('_')[0]
    if (name === 'responsible') {
      if (!value) {
        value = []
      }
    }
    let obj = list[key]
    obj[name] = value
    this.setState({ [nameState]: list })
    // }
  }
  ChangeDateList = (date, key, nameState, name) => {
    if (!this.handleDisabled()) {
      let list = this.state[nameState]
      let obj = list[key]
      obj[name] = date
      this.setState({ [nameState]: list })
    }
  }
  handleAdd = nameState => {
    if (!this.handleDisabled()) {
      let obj = { description: '', responsible: '', status: '', action: '' }
      this.setState({ [nameState]: [...this.state[nameState], obj] })
    }
  }
  handleDisabled = () => {
    if (!this.state.secretary_committee_allow) {
      return true
    } else if (this.props.canUpdate) {
      return false
    } else if (this.props.show) {
      return true
    } else {
      return false
    }
  }
  handleDelete = (nameState, key) => {
    if (!this.handleDisabled()) {
      let data = this.state[nameState]
      data.splice(key, 1)
      this.setState({ [nameState]: data })
    }
  }
  handleCheckCorrective = () => {
    const { _corrective_actions } = this.state
    let i = 0
    let check = false
    while (i < _corrective_actions.length) {
      check =
        handleCheckText(_corrective_actions[i].status) &&
        _corrective_actions[i].responsible.length > 0
      // &&
      // handleCheckText(_corrective_actions[i].responsible)
      if (!check) {
        break
      }
      i++
    }
    return check
  }
  handleSubmit = async () => {
    const {
      id,
      _corrective_actions,
      technical_agent_arp4,
      operation_agent_arp4,
      repair_agent_arp4,
      hse_agent_arp4,
      token,
      attachment
    } = this.state
    const check = this.handleCheckCorrective()
    const checkSign =
      technical_agent_arp4 !== null &&
      operation_agent_arp4 !== null &&
      repair_agent_arp4 !== null &&
      hse_agent_arp4 !== null
    const checkFinal = check && checkSign
    if (checkFinal) {
      const document_link_arp4 = Object.assign({}, attachment)
      let resultObj = await Object.assign(
        {},
        Object.keys(_corrective_actions).map(_data => {
          let _list = _corrective_actions[_data].responsible
          _corrective_actions[_data].responsible = Object.keys(_list).map(
            _value => {
              return _list[_value].value
            }
          )
          return _corrective_actions[_data]
        })
      )
      await this.setState({ loading: 'submit', disabled: true })
      const url = await `${StaticData.domainIp}/arp/insertFourth`
      const datareg = await new FormData()
      await datareg.append('arp_id', id)
      await datareg.append('corrective_actions', JSON.stringify(resultObj))
      await datareg.append(
        'document_link_arp4',
        JSON.stringify(document_link_arp4)
      )
      await datareg.append('technical_agent_arp4', technical_agent_arp4.value)
      await datareg.append('operation_agent_arp4', operation_agent_arp4.value)
      await datareg.append('repair_agent_arp4', repair_agent_arp4.value)
      await datareg.append('hse_agent_arp4', hse_agent_arp4.value)
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          this.setState({
            loading: ''
          })
          if (response.status === 200) {
            await Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              this.setState({
                disabled: false,
                redirect: false
              })
              window.location.reload(true)
            }, 5000)
          } else {
            this.setState({
              disabled: false
            })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({
            disabled: false,
            loading: ''
          })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  handleEdit = async () => {
    const { id, _corrective_actions, token, attachment } = this.state
    const check = this.handleCheckCorrective()
    if (check) {
      const document_link_arp4 = Object.assign({}, attachment)
      let resultObj = await Object.assign(
        {},
        Object.keys(_corrective_actions).map(_data => {
          let _list = _corrective_actions[_data].responsible
          _corrective_actions[_data].responsible = Object.keys(_list).map(
            _value => {
              return _list[_value].value
            }
          )
          return _corrective_actions[_data]
        })
      )
      await this.setState({ loading: 'submit', disabled: true })
      const url = await `${StaticData.domainIp}/arp/updateArp4`
      const datareg = await new FormData()
      await datareg.append('arp_id', id)
      await datareg.append('corrective_actions', JSON.stringify(resultObj))
      await datareg.append(
        'document_link_arp4',
        JSON.stringify(document_link_arp4)
      )
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          this.setState({
            loading: ''
          })
          if (response.status === 200) {
            await Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              this.setState({
                disabled: false,
                redirect: false
              })
              window.location.reload(true)
            }, 5000)
          } else {
            this.setState({
              disabled: false
            })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({
            disabled: false,
            loading: ''
          })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  handleState = obj => {
    this.setState(obj)
  }
  handleUpload = (e, files, names) => {
    e.preventDefault()
    this.setState({ loading: files })
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[i])
      this.GetLink(files, e.target.files[i], names, e.target.files.length, i)
    }
  }
  GetLink = (nameState, file, names, length, i) => {
    let array = this.state[nameState] ? this.state[nameState] : [],
      arrayName = this.state[names] ? this.state[names] : []
    let datareg = new FormData()
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/DocumentCenter/ProcessDocument/Arp/${this.state.id}`,
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
          // await arrayName.push(file.name)
          // await array.push(response.data.content)
          await this.setState({
            [names]: [...this.state[names], file.name],
            [nameState]: [...this.state[nameState], response.data.content]
            // [nameState]: array
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
    let data = this.state[`${files}`],
      data2 = this.state[`${names}`]
    data.splice(num, 1)
    data2.splice(num, 1)
    this.setState({ [files]: data, [names]: data2 })
  }
  render() {
    const { secretary_committee_allow, token, redirect, _corrective_actions, attachmentName, attachment, loading, canCreate, disabled, id } = this.state
    const { show, canUpdate } = this.props
    const ShowToCC = !show && !canUpdate && secretary_committee_allow
    if (!token) {
      return <Redirect to='/Login' />
    } else if (redirect) {
      return <Redirect to='/index-ARP' />
    } else {
      return (
        <div className='form row justify-content-start'>
          <HeadTopFirst
            {...this}
            disabled={true}
          // dontShow={true}
          />
          <div className='w-100'>
            <div className='title-password col-12 mt-3 mb-2'>
              <h2 className='IranSans_Bold'>
                اقدامات اصلاحی برای پیشگیری از رویداد‌های مشابه
              </h2>
              <div className='line'></div>
            </div>
            {_corrective_actions.map((data, key) => (
              <SimilarEvents
                {...this}
                key={key}
                data={data}
                _key={key}
                name='_corrective_actions'
              />
            ))}
            {this.handleDisabled() ? (
              ''
            ) : (
              <div className='button-add col-12'>
                <button onClick={() => this.handleAdd('_corrective_actions')}>
                  <AddIcon />
                  افزودن مورد جدید
                </button>
              </div>
            )}
          </div>
          <div className='title-password col-12 mt-3 mb-2'>
            <h2 className='IranSans_Bold'>مدارک پیوست</h2>
            <div className='line'></div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
            <div className={`field-form persian`}>
              <label>فایل ضمیمه</label>
              <div
                className={`allName col row m-0 justify-content-end ${this.handleDisabled() ? 'pl-2' : ''
                  }`}
              >
                {attachmentName.map((name, key) => (
                  <span key={key}>
                    {this.handleDisabled() ? (
                      ''
                    ) : (
                      <CloseRoundedIcon
                        onClick={() =>
                          this.deleteFile(key, 'attachment', 'attachmentName')
                        }
                      />
                    )}
                    <a
                      href={
                        attachment[key]
                          ? attachment[key]
                          : '#/'
                      }
                      target='_blank'
                      rel='noreferrer'
                    >
                      {handleString(name)}
                    </a>
                  </span>
                ))}
              </div>
              {this.handleDisabled() ? (
                ''
              ) : (
                <React.Fragment>
                  <input
                    className='d-none'
                    type='file'
                    id='has_log_sheets-upload'
                    multiple
                    onChange={e =>
                      this.handleUpload(e, 'attachment', 'attachmentName')
                    }
                  />
                  <label
                    className='upload-label'
                    htmlFor='has_log_sheets-upload'
                  >
                    {loading === 'attachment' ? (
                      <Loading className='form-loader w-auto' />
                    ) : (
                      <AttachFileIcon />
                    )}
                    آپلود فایل
                  </label>
                </React.Fragment>
              )}
            </div>
          </div>
          {ShowToCC ? <HanldeToCC {...this} dontCC={true} /> : ''}
          {ShowToCC ? (
            canCreate ? (
              <div className='submit-form col-12'>
                <button
                  onClick={this.handleSubmit}
                  disabled={disabled}
                >
                  {loading === 'submit' ? (
                    <Loading className='form-loader' />
                  ) : (
                    <DoneIcon />
                  )}
                  ثبت اطلاعات
                </button>
                <CancelButton redirect='index-ARP' />
              </div>
            ) : (
              ''
            )
          ) : (
            <SignARP
              {...this}
              handleState={(name, value) => this.setState({ [name]: value })}
              permision='arp_signs'
            />
          )}
          {canUpdate ? (
            <div className='submit-form col-12 mt-3'>
              <button
                className='edit'
                onClick={this.handleEdit}
                disabled={disabled}
              >
                {loading === 'submit' ? (
                  <Loading className='form-loader' />
                ) : (
                  <DoneIcon />
                )}
                ویرایش اطلاعات
              </button>
              <CancelButton redirect={`arp-${id}`} />
            </div>
          ) : (
            ''
          )}
        </div>
      )
    }
  }
}
