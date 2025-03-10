import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import StaticData from '../staticData'
import DatePicker from 'react-datepicker2'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
// import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
// import CreatableSelect from 'react-select/creatable';
// import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
// import AttachFileIcon from '@material-ui/icons/AttachFile';
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
// import RequestBuy from './RequestBuy'
// import AddIcon from '@material-ui/icons/Add';
import AttachedDocument from './AttachedDocument'
import ListSign from './ListSign'
import SignTSR from './SignTSR'
import Permision from '../permision/permision'
import getCustomFormat from '../getCustomFormat'
import moment from 'moment-jalaali'
import CancelButton from '../layout/CancelButton'
import Dispatch from './Dispatch'
import TOCC from './TOCC'
import handleCheckText from '../handleCheckText'
import { ContactSupport } from '@material-ui/icons'
import handleString from '../handleString'
export default class Inspector extends Component {
  constructor (props) {
    super(props)
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      tsr_no: '',
      created_at: '',
      subject: '',
      disabled: false,
      instruction_description: '',
      documentNumber: [],
      Attachement: [],
      AttachementName: [],
      execution_date: undefined,
      // typeWork: 'mechanics',
      requirements: '',
      exporter_group: '',
      export_date: undefined,

      foreign_attachment: [
        {
          documentNumber: '',
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: '',
          AttachementName: [],
          Attachement: []
        }
      ],
      internal_attachment: [
        {
          documentNumber: null,
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: ''
        }
      ],
      listSign: [],
      canCreate: false,
      user_list: [],
      notification_to: [],
      notification_cc: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - دستور العمل بارزسی فنی`
    this.ShowFetch()
    this.props.GetShowFetch(8, this.ShowFetch)
  }
  async componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = await nextProps
      // await this.ShowFetch()
    }
  }
  ShowFetch = async () => {
    let tsr8 = await this.props.state.tsr8,
      obj = {}
    if (tsr8) {
      for (let value in tsr8) {
        let state
        if (value.includes('tsr8_')) {
          state = value.split('tsr8_')[1]
        } else {
          state = value
        }
        if (state === 'foreign_attachment' || state === 'internal_attachment') {
          if (this.props.show || this.props.canUpdate) {
            let objDetail = tsr8[value]
            if (objDetail) {
              obj[state] = Object.keys(objDetail).map(fi => {
                let objSecond = objDetail[fi]
                if (objSecond.Attachement) {
                  objSecond.Attachement = Object.keys(
                    objSecond.Attachement
                  ).map(att => {
                    return objSecond.Attachement[att]
                  })
                }
                return objDetail[fi]
              })
            }
          }
        } else if (state === 'technical_review') {
          if (!this.props.show) {
            obj[state] = tsr8[value] === '1'
          }
        } else if (state === 'execution_date' || state === 'export_date') {
          if (this.props.canUpdate) {
            if (tsr8[value]) {
              obj[state] = moment(`${tsr8[value]}`, 'jYYYY/jM/jD')
            }
          } else {
            obj[state] = tsr8[value]
          }
        } else {
          obj[state] = tsr8[value]
        }
      }
      let ListMandatory = await ListSign.ListMandatory.tsr8
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
    if (this.state.canCreate && !this.props.show) {
      this.setState({ foucs: name })
    }
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
  handleUploadList = async (e, files, names, parentState) => {
    if (this.state.canCreate && !this.props.show) {
      await e.preventDefault()
      await this.setState({ loading: files })
      names = await names.split('_')[0]
      let key = await parseInt(files.split('_')[1])
      files = await files.split('_')[0]
      for (let i = 0; i < e.target.files.length; i++) {
        let reader = await new FileReader()
        await reader.readAsDataURL(e.target.files[i])
        await this.GetLink(
          files,
          e.target.files[i],
          names,
          e.target.files.length,
          key,
          i,
          parentState
        )
      }
    }
  }
  GetLink = (nameState, file, names, length, key, i, parentState) => {
    if (this.state.canCreate && !this.props.show) {
      let datareg = new FormData()
      let array = this.state[parentState][key][nameState],
        arrayName = this.state[parentState][key][names]
      datareg.append('file', file)
      axios({
        method: 'post',
        url: `${StaticData.domainIp}/uploadFile/TSR`,
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
            await array.push(response.data.content)
            await arrayName.push(file.name)
            let _Parent = await this.state[parentState]
            let obj = await _Parent[key]
            obj[nameState] = await array
            obj[names] = await arrayName
            await this.setState({ [parentState]: _Parent })
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
  deleteFileList = async (key, num, files, names, parent) => {
    if (this.state.canCreate && !this.props.show) {
      let _Parent = await this.state[parent]
      let obj = await _Parent[key]
      let data1 = await obj[files]
      let data2 = await obj[names]
      await data1.splice(num, 1)
      await data2.splice(num, 1)
      await this.setState({ [parent]: _Parent })
    }
  }
  // handleAdd = (nameState) => {
  //     let obj = { number: '', description: '', date: undefined }
  //     this.setState({ [nameState]: [...this.state[nameState], obj] })
  // }
  handleAddAttach = nameState => {
    if (this.state.canCreate && !this.props.show) {
      let obj = {}
      if (nameState === 'foreign_attachment') {
        obj = {
          documentNumber: '',
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: '',
          AttachementName: [],
          Attachement: []
        }
      } else if (nameState === 'internal_attachment') {
        obj = {
          documentNumber: null,
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: ''
        }
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
  handleChangeList = (parent, name, value, key) => {
    if (this.state.canCreate && !this.props.show) {
      let list = this.state[parent]
      let obj = list[key]
      obj[name] = value
      this.setState({ [parent]: list })
    }
  }
  handleSubmit = async () => {
    let {
      exporter_group,
      export_date,
      instruction_description,
      execution_date,
      foreign_attachment,
      internal_attachment,
      notification_to,
      notification_cc,
      listSign
    } = await this.state
    const CheckTo = notification_to
      ? notification_to.length === listSign.length && notification_to.length > 0
      : false
    const check =
      handleCheckText(exporter_group) &&
      export_date !== undefined &&
      handleCheckText(instruction_description) &&
      CheckTo
    // const foreignCheck = this.props.ForeignAttachments(foreign_attachment)
    // const internalCheck = this.props.Internalَttachments(internal_attachment)
    if (check) {
      let To = Object.keys(notification_to).map(toData => {
        return notification_to[toData].value
      })
      notification_cc = notification_cc ? notification_cc : []
      let CC = Object.keys(notification_cc).map(toData => {
        return notification_cc[toData].value
      })
      foreign_attachment = await Object.assign(
        {},
        Object.keys(foreign_attachment).map(_ => {
          foreign_attachment[_].Attachement = Object.assign(
            {},
            foreign_attachment[_].Attachement
          )
          return foreign_attachment[_]
        })
      )
      internal_attachment = await Object.assign({}, internal_attachment)
      this.setState({ disabled: true, loading: 'submit' })
      let datareg = new FormData()
      await datareg.append('tsr_id', this.props.state.id)
      await datareg.append('exporter_group', exporter_group)
      await datareg.append('export_date', getCustomFormat(export_date, false))
      await datareg.append('instruction_description', instruction_description)
      await datareg.append(
        'execution_date',
        getCustomFormat(execution_date, false)
      )
      await datareg.append(
        'foreign_attachment',
        JSON.stringify(foreign_attachment)
      )
      await datareg.append(
        'internal_attachment',
        JSON.stringify(internal_attachment)
      )
      await datareg.append('notification_to', To.join(','))
      await datareg.append('notification_cc', CC.join(','))
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/tsr/tsr8/insert`,
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
  handleState = (name, value) => {
    this.setState({ [name]: value })
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
  handleValueDate = name => {
    let date = this.state[name]
    if (date) {
      if (typeof date === 'string') {
        let result = moment(date, 'jYYYY/jM/jD')
        return result._isValid ? result : null
      } else return date
    }
    return null
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
          <div className='col-12'>
            <div className='box-note'>
              <p className='m-0'>این صفحه توسط کارشناس TSR تکمیل می‌گردد.</p>
            </div>
          </div>
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
                  this.state.foucs === 'exporter_group' ||
                  handleCheckText(this.state.exporter_group)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  گروه صادر کننده دستورالعمل
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  type='text'
                  name='exporter_group'
                  value={handleString(this.state.exporter_group)}
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                  readOnly={this.handleDisabled()}
                  disabled={this.handleDisabled()}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  this.state.export_date ? 'active' : ''
                }`}
              >
                <div className='icon-field'>
                  <DateRangeRoundedIcon />
                </div>
                <div className='col p-0'>
                  <label>
                    تاریخ صدور دستورالعمل
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  {this.handleDisabled() ? (
                    <input
                      name='export_date'
                      value={handleString(this.state.export_date)}
                      disabled={true}
                      readOnly={true}
                    />
                  ) : (
                    <DatePicker
                      persianDigits={true}
                      isGregorian={false}
                      timePicker={false}
                      onChange={export_date => this.setState({ export_date })}
                      value={this.handleValueDate('export_date')}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
              <div
                className={`field-form persian textarea ${
                  this.state.foucs === `instruction_description` ||
                  handleCheckText(this.state.instruction_description)
                    ? 'active'
                    : ''
                }`}
              >
                <div className='col p-0'>
                  <label className='textarea'>
                    شرح دستورالعمل بارزسی
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <textarea
                    className='w-100'
                    type='text'
                    name={`instruction_description`}
                    onFocus={e => this.OnFocus(e.target.name)}
                    onBlur={this.OnBlur}
                    onChange={this.handleChange}
                    value={handleString(this.state.instruction_description)}
                    readOnly={this.handleDisabled()}
                    disabled={this.handleDisabled()}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  this.state.execution_date ? 'active' : ''
                }`}
              >
                <div className='icon-field'>
                  <DateRangeRoundedIcon />
                </div>
                <div className='col p-0'>
                  <label>زمان اجرا</label>
                  {this.handleDisabled() ? (
                    <input
                      name='execution_date'
                      value={handleString(this.state.execution_date)}
                      readOnly={true}
                      disabled={true}
                    />
                  ) : (
                    <DatePicker
                      persianDigits={true}
                      isGregorian={false}
                      timePicker={false}
                      onChange={execution_date =>
                        this.setState({ execution_date })
                      }
                      value={this.handleValueDate('execution_date')}
                    />
                  )}
                </div>
              </div>
            </div>
            <AttachedDocument
              {...this}
              handleState={(name, value) => this.setState({ [name]: value })}
              out={true}
              nameParent='foreign_attachment'
              canCreate={!this.handleDisabled()}
            />
            <AttachedDocument
              {...this}
              handleState={(name, value) => this.setState({ [name]: value })}
              nameParent='internal_attachment'
              canCreate={!this.handleDisabled()}
            />
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
                permision='tsr8_signs'
                disabled={this.handleDisabled()}
              />
            )}
          </div>
        </div>
      )
  }
}
