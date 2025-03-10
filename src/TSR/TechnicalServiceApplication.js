import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import StaticData from '../staticData'
// import DatePicker from 'react-datepicker2';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
// import CreatableSelect from 'react-select/creatable';
// import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Loading from '../layout/loading'
// import AttachFileIcon from '@material-ui/icons/AttachFile';
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import DoneIcon from '@material-ui/icons/Done'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import AttachedDocument from './AttachedDocument'
import Permision from '../permision/permision'
import CreatableSelect from 'react-select/creatable'
import SignTSR from './SignTSR'
import ListSign from './ListSign'
import handleCheckText from '../handleCheckText'
import EditIcon from '@material-ui/icons/Edit'
import CancelButton from '../layout/CancelButton'
import handleString from '../handleString'
export default class TechnicalServiceApplication extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      foucs: '',
      token: Cookies.get('token'),
      tsr_no: '',
      created_at: '',
      subject: null,
      subjectSuggest: [],
      // documentNumber: '',
      applicant_unit: 'HSE',
      area: '',
      operation_unit: '',
      machine_no: '',
      technical_problem_description: '',
      execution_cause: '',
      corrective_suggest: '',
      improvement_type: [
        {
          value: 'تامین الزامات ایمنی تجهیزات و نیروی انسانی',
          label: 'تامین الزامات ایمنی تجهیزات و نیروی انسانی'
        },
        {
          value: 'رفع موانع جهت دستیابی به ظرفیت اسمی',
          label: 'رفع موانع جهت دستیابی به ظرفیت اسمی'
        },
        {
          value: 'جلوگیری از تولید محصول نامنطبق',
          label: 'جلوگیری از تولید محصول نامنطبق'
        },
        {
          value: 'بهبود در راندمان فرایندهای تولیدی',
          label: 'بهبود در راندمان فرایندهای تولیدی'
        },
        {
          value: 'رفع موانع جهت دستیابی به ظرفیت برنامه ای',
          label: 'رفع موانع جهت دستیابی به ظرفیت برنامه ای'
        },
        {
          value: 'افزایش راندمان مصرف انرژی',
          label: 'افزایش راندمان مصرف انرژی'
        },
        {
          value: 'جلوگیری از خرابی مکرر تجهیزات عملیاتی',
          label: 'جلوگیری از خرابی مکرر تجهیزات عملیاتی'
        },
        {
          value: 'بهبود در عملیات بهره برداری و تعمیرات',
          label: 'بهبود در عملیات بهره برداری و تعمیرات'
        },
        {
          value: 'کاهش و یا حذف عوامل زیان آور زیست محیطی',
          label: 'کاهش و یا حذف عوامل زیان آور زیست محیطی'
        },
        {
          value: 'افزایش ظرفیت اسمی تولید',
          label: 'افزایش ظرفیت اسمی تولید'
        },
        {
          value: 'بهبود شرایط سلامت، محیط کار و ارگونومی',
          label: 'بهبود شرایط سلامت، محیط کار و ارگونومی'
        },
        {
          value: 'تولید گریدهای جدید',
          label: 'تولید گریدهای جدید'
        },
        {
          value: 'بهبود در پایش سرویس های مبادلاتی',
          label: 'بهبود در پایش سرویس های مبادلاتی'
        },
        {
          value: 'درخواست های خدماتی، اداری و غیر فرایندی',
          label: 'درخواست های خدماتی، اداری و غیر فرایندی'
        }
      ],
      userDetail: Cookies.get('userDetail')
        ? JSON.parse(Cookies.get('userDetail'))
        : {},
      popUp: false,
      applicant_unitOther: '',
      foreign_attachments: [
        {
          documentNumber: '',
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: '',
          AttachementName: [],
          Attachement: []
        }
      ],
      internal_attachments: [
        {
          documentNumber: null,
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: ''
        }
      ],
      canCreate: false,
      role: null,
      disabled: false,
      redirect: false,
      listSign: [],
      loading: '',
      rejectSelect: '',
      user_list: [],
      notification_to: [],
      notification_cc: []
      // verified: false
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - صدور درخواست توسط متقاضی`
    if (this.props.GetShowFetch) {
      this.props.GetShowFetch(1, this.ShowFetch)
    }
    if (this.props.show || this.props.canUpdate) {
      this.ShowFetch()
    } else {
      this.fetchData()
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      if (this.props.show || this.props.canUpdate) {
        this.ShowFetch()
      }
    }
  }
  ShowFetch = () => {
    let { tsr1, status, part, role, id } = this.props.state,
      obj = {}
    if (tsr1) {
      for (let value in tsr1) {
        let state = value.split('tsr1_')[1]
        if (
          state === 'foreign_attachments' ||
          state === 'internal_attachments'
        ) {
          let detail = tsr1[value]
          if (detail) {
            let array = Object.keys(detail).map(fi => {
              if (detail[fi].Attachement) {
                if (Object.keys(detail[fi].Attachement).length) {
                  detail[fi].Attachement = Object.keys(
                    detail[fi].Attachement
                  ).map(att => {
                    return detail[fi].Attachement[att]
                  })
                } else {
                  detail[fi].Attachement = []
                }
              }
              return detail[fi]
            })
            obj[state] = array
          }
        } else if (state === 'improvement_type') {
          let list = tsr1[value].split(',')
          if (list) {
            list.forEach(item => {
              obj[`_improvement_${item}`] = true
            })
          }
        } else if (state === 'applicant_unit') {
          const check =
            tsr1[value] === 'HSE' ||
            tsr1[value] === 'bahre' ||
            tsr1[value] === 'repair'
          if (check) {
            obj[state] = tsr1[value]
            obj['applicant_unitOther'] = ''
          } else {
            obj[state] = 'other'
            obj['applicant_unitOther'] = tsr1[value]
          }
        } else if (state === 'notification_to' || state === 'notification_cc') {
          let _list = []
          let array = tsr1['tsr1_user_list']
          if (array) {
            let selected = tsr1[value]
            if (selected) {
              let arraySelected = selected.split(',')
              if (arraySelected) {
                arraySelected.forEach(id => {
                  let filter = array.filter(item => item.value === id)
                  if (filter) {
                    _list.push(filter[0])
                  }
                })
              }
            }
          }
          obj[state] = _list
        } else if (state === 'tsr_no') {
          obj['_tsr_no'] = handleString(tsr1[value])
        } else {
          obj[state] = tsr1[value]
        }
      }
      let ListMandatory = ListSign.ListMandatory.tsr1
      let listSign = this.state.listSign
      ListMandatory.forEach(li => {
        listSign = [...listSign, li]
      })
      listSign = [...new Set(listSign)]
      obj['part'] = part
      obj['status'] = status
      obj['listSign'] = listSign
      obj['role'] = role
      if (this.props.canUpdate) {
        obj['subject'] = {
          value: tsr1.tsr1_subject,
          label: tsr1.tsr1_subject
        }
      } else {
        obj['subject'] = tsr1.tsr1_subject
      }
      obj['canCreate'] = this.Permision.handlePermision(role, 'tsr_create')
      if (
        tsr1.subjectSuggest &&
        tsr1.subjectSuggest.length &&
        this.props.canUpdate
      ) {
        obj['subjectSuggest'] = tsr1.subjectSuggest
      }
      this.setState(obj)
    }
  }
  fetchData = () => {
    axios
      .get(`${StaticData.domainIp}/tsr/getFirstDetailForCreate`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(async response => {
        if (response.status === 200) {
          const state = await response.data.content
          state['role'] = await response.data.role
          // state['verified'] = await true
          state['canCreate'] = await this.Permision.handlePermision(
            response.data.role,
            'tsr_create'
          )
          let ListMandatory = ListSign.ListMandatory.tsr1
          let listSign = this.state.listSign
          ListMandatory.forEach(li => {
            if (li.value === this.props.part) {
              listSign = [...listSign, li]
            }
          })
          state['listSign'] = await listSign
          await this.setState(state)
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
    if (this.state.canCreate) {
      this.setState({ foucs: name })
    }
  }
  OnBlur = () => {
    if (this.state.canCreate) {
      this.setState({ foucs: '' })
    }
  }
  handleChange = e => {
    if (this.state.canCreate) {
      this.setState({ [e.target.name]: e.target.value })
    }
  }
  handleUploadList = async (e, files, names, parentState) => {
    if (this.state.canCreate) {
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
    let datareg = new FormData()
    let array = this.state[parentState][key][nameState],
      arrayName = this.state[parentState][key][names]
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/TSR1`,
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
  deleteFileList = async (key, num, files, names, parent) => {
    if (this.state.canCreate) {
      let _Parent = await this.state[parent]
      let obj = await _Parent[key]
      let data1 = await obj[files]
      let data2 = await obj[names]
      await data1.splice(num, 1)
      await data2.splice(num, 1)
      await this.setState({ [parent]: _Parent })
    }
  }
  handleCheck = e => {
    if (this.state.canCreate) {
      this.setState({
        [e.target.name]: e.target.checked
      })
    }
  }
  handleChangeList = (parent, name, value, key) => {
    if (this.state.canCreate) {
      let list = this.state[parent]
      let obj = list[key]
      obj[name] = value
      this.setState({ [parent]: list })
    }
  }
  handleAddAttach = nameState => {
    if (this.state.canCreate) {
      let obj = {}
      if (nameState === 'foreign_attachments') {
        obj = {
          documentNumber: '',
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: '',
          AttachementName: [],
          Attachement: []
        }
      } else if (nameState === 'internal_attachments') {
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
    if (this.state.canCreate) {
      let data = this.state[nameState]
      data.splice(key, 1)
      this.setState({ [nameState]: data })
    }
  }
  handleSubmit = async () => {
    let {
      subject,
      applicant_unit,
      applicant_unitOther,
      area,
      operation_unit,
      machine_no,
      foreign_attachments,
      internal_attachments,
      technical_problem_description,
      execution_cause,
      corrective_suggest,
      notification_to,
      notification_cc
    } = this.state
    const check =
      handleCheckText(area) &&
      handleCheckText(operation_unit) &&
      handleCheckText(machine_no) &&
      (notification_to ? notification_to.length === 2 : false)
    // notification_to.length === 2
    const foreignCheck = this.props.ForeignAttachments(foreign_attachments)
    // const internalCheck = this.props.Internalَttachments(internal_attachments)
    const checkSubject = subject ? handleCheckText(subject.value) : false
    const checkApplicant_unit =
      applicant_unit === 'other' ? handleCheckText(applicant_unitOther) : true
    if (check && checkSubject && checkApplicant_unit && foreignCheck) {
      let To = Object.keys(notification_to).map(toData => {
        return notification_to[toData].value
      })
      notification_cc = notification_cc ? notification_cc : []
      let CC = Object.keys(notification_cc).map(toData => {
        return notification_cc[toData].value
      })
      await this.setState({ loading: 'submit', disabled: true })
      foreign_attachments = await Object.assign(
        {},
        Object.keys(foreign_attachments).map(_ => {
          foreign_attachments[_].Attachement = Object.assign(
            {},
            foreign_attachments[_].Attachement
          )
          return foreign_attachments[_]
        })
      )
      internal_attachments = await Object.assign({}, internal_attachments)
      let improvement_list = await []
      Object.keys(this.state).map(state => {
        if (state.includes('_improvement_')) {
          let value = state.split('_improvement_')[1]
          if (this.state[state]) {
            improvement_list.push(value)
          }
        }
        return true
      })
      let datareg = await new FormData()
      await datareg.append('subject', subject.value)
      await datareg.append(
        'applicant_unit',
        applicant_unit === 'other' ? applicant_unitOther : applicant_unit
      )
      await datareg.append('area', area)
      await datareg.append('operation_unit', operation_unit)
      await datareg.append('machine_no', machine_no)
      await datareg.append(
        'technical_problem_description',
        technical_problem_description
      )
      await datareg.append('execution_cause', execution_cause)
      await datareg.append('corrective_suggest', corrective_suggest)
      await datareg.append(
        'foreign_attachments',
        JSON.stringify(foreign_attachments)
      )
      await datareg.append(
        'internal_attachments',
        JSON.stringify(internal_attachments)
      )
      await datareg.append('improvement_type', improvement_list.join(','))
      await datareg.append('notification_to', To.join(','))
      await datareg.append('notification_cc', CC.join(','))
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/tsr/insert`,
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
      this.setState({ loading: '' })

      Notification.notify(Message.text(99), 'error')
    }
  }
  handleEdit = async () => {
    let {
      subject,
      applicant_unit,
      applicant_unitOther,
      area,
      operation_unit,
      machine_no,
      foreign_attachments,
      internal_attachments,
      technical_problem_description,
      execution_cause,
      corrective_suggest,
      notification_to,
      notification_cc
    } = this.state
    const { id } = this.props.state
    const check =
      handleCheckText(area) &&
      handleCheckText(operation_unit) &&
      handleCheckText(machine_no) &&
      notification_to.length === 2
    const foreignCheck = this.props.ForeignAttachments(foreign_attachments)
    // const internalCheck = this.props.Internalَttachments(internal_attachments)
    const checkSubject = subject ? handleCheckText(subject.value) : false
    const checkApplicant_unit =
      applicant_unit === 'other' ? handleCheckText(applicant_unitOther) : true
    if (
      check &&
      foreignCheck &&
      checkSubject &&
      checkApplicant_unit
      // internalCheck
    ) {
      this.setState({ loading: 'submit', disabled: true })
      let To = Object.keys(notification_to).map(toData => {
        return notification_to[toData].value
      })
      let CC = Object.keys(notification_cc).map(toData => {
        return notification_cc[toData].value
      })
      foreign_attachments = Object.assign(
        {},
        Object.keys(foreign_attachments).map(_ => {
          foreign_attachments[_].Attachement = Object.assign(
            {},
            foreign_attachments[_].Attachement
          )
          return foreign_attachments[_]
        })
      )
      internal_attachments = Object.assign({}, internal_attachments)
      let improvement_list = []
      Object.keys(this.state).map(state => {
        if (state.includes('_improvement_')) {
          let value = state.split('_improvement_')[1]
          if (this.state[state]) {
            improvement_list.push(value)
          }
        }
        return true
      })
      let datareg = new FormData()
      datareg.append('tsr_id', id)
      datareg.append('subject', subject.value)
      datareg.append(
        'applicant_unit',
        applicant_unit === 'other' ? applicant_unitOther : applicant_unit
      )
      datareg.append('area', area)
      datareg.append('operation_unit', operation_unit)
      datareg.append('machine_no', machine_no)
      datareg.append(
        'technical_problem_description',
        technical_problem_description
      )
      datareg.append('execution_cause', execution_cause)
      datareg.append('corrective_suggest', corrective_suggest)
      datareg.append('foreign_attachments', JSON.stringify(foreign_attachments))
      datareg.append(
        'internal_attachments',
        JSON.stringify(internal_attachments)
      )
      datareg.append('improvement_type', improvement_list.join(','))
      await datareg.append('notification_to', To.join(','))
      await datareg.append('notification_cc', CC.join(','))
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/tsr/update`,
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
  handleShowButtonSubmit = () => {
    // if (!this.props.close) {
    if (this.props.canUpdate) {
      return (
        <div className='submit-form col-12'>
          <button
            className='continue mt-3'
            onClick={this.handleEdit}
            disabled={this.state.disabled}
          >
            {this.state.loading === 'submit' ? (
              <Loading className='form-loader' />
            ) : (
              <EditIcon />
            )}
            ویرایش اطلاعات
          </button>
          <CancelButton redirect='index-TSR' />
        </div>
      )
    } else if (!this.props.show && this.state.canCreate) {
      return (
        <div className='submit-form col-12'>
          <button
            className='mt-3'
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
      )
    } else if (this.props.show) {
      return (
        <SignTSR
          {...this}
          handleState={(name, value) => this.setState({ [name]: value })}
          permision='tsr1_signs'
          disabled={this.handleDisabled()}
        />
      )
    } else return ''
    // }
  }
  handleChangeSelect = (name, newValue) => {
    let filter = newValue ? newValue.filter(data => !data.__isNew__) : []
    const check = name === 'notification_to' ? filter.length < 3 : true
    if (check) {
      this.setState({
        [name]: filter
      })
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
      return <Redirect to='index-TSR' />
    } else
      return (
        <div className='form row justify-content-start'>
          <div className='w-100 row justify-content-start m-0'>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  handleCheckText(this.state._tsr_no) ? 'active' : ''
                }`}
              >
                <label>شماره TSR</label>
                <input
                  type='text'
                  name='_tsr_no'
                  value={handleString(this.state._tsr_no)}
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
              {!this.handleDisabled() ? (
                <div className='field-form selectBox'>
                  <CreatableSelect
                    value={this.state.subject ? this.state.subject : ''}
                    onChange={newValue =>
                      !this.handleDisabled() &&
                      this.setState({ subject: newValue })
                    }
                    options={this.state.subjectSuggest}
                    readOnly={this.state.canCreate}
                    placeholder={
                      <label className='rtl'>
                        موضوع
                        <span className='star IranSans_Bold'>*</span>
                      </label>
                    }
                  />
                </div>
              ) : (
                <div
                  className={`field-form persian ${
                    handleCheckText(this.state.subject) ? 'active' : ''
                  }`}
                >
                  <div className='col p-0'>
                    <label className='rtl'>
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
              )}
            </div>
            <div className='col-xl-12 col-lg-6 col-md-12 col-12 d-flex align-items-center'>
              <div className='field-radio w-100'>
                <label>
                  واحد درخواست کننده
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <div className='main-radio pr-0'>
                  <div className='radio-button mr-1 ml-1'>
                    {this.handleDisabled() ? (
                      ''
                    ) : (
                      <input
                        className='d-none'
                        type='radio'
                        id='HSE'
                        onClick={() =>
                          this.setState({
                            applicant_unit: 'HSE',
                            applicant_unitOther: ''
                          })
                        }
                      />
                    )}
                    <label
                      htmlFor='HSE'
                      className={this.handleDisabled() ? 'disabled' : ''}
                    >
                      {this.state.applicant_unit === 'HSE' ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      HSE
                    </label>
                  </div>
                  <div className='radio-button mr-1 ml-1'>
                    {this.handleDisabled() ? (
                      ''
                    ) : (
                      <input
                        className='d-none'
                        type='radio'
                        id='bahre'
                        onClick={() =>
                          this.setState({
                            applicant_unit: 'bahre',
                            applicant_unitOther: ''
                          })
                        }
                      />
                    )}
                    <label
                      htmlFor='bahre'
                      className={this.handleDisabled() ? 'disabled' : ''}
                    >
                      {this.state.applicant_unit === 'bahre' ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      بهره برداری
                    </label>
                  </div>
                  <div className='radio-button mr-1 ml-1'>
                    {this.handleDisabled() ? (
                      ''
                    ) : (
                      <input
                        className='d-none'
                        type='radio'
                        id='repair'
                        onClick={() =>
                          this.setState({
                            applicant_unit: 'repair',
                            applicant_unitOther: ''
                          })
                        }
                      />
                    )}
                    <label
                      htmlFor='repair'
                      className={this.handleDisabled() ? 'disabled' : ''}
                    >
                      {this.state.applicant_unit === 'repair' ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      تعمیرات
                    </label>
                  </div>
                  <div className='radio-button mr-1 ml-1'>
                    {this.handleDisabled() ? (
                      ''
                    ) : (
                      <input
                        className='d-none'
                        type='radio'
                        id='other'
                        onClick={() =>
                          this.setState({ applicant_unit: 'other' })
                        }
                      />
                    )}
                    <label
                      htmlFor='other'
                      className={this.handleDisabled() ? 'disabled' : ''}
                    >
                      {this.state.applicant_unit === 'other' ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                      سایر
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {this.state.applicant_unit === 'other' && (
              <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
                <div
                  className={`field-form persian ${
                    this.state.foucs === `applicant_unitOther` ||
                    handleCheckText(this.state.applicant_unitOther)
                      ? 'active'
                      : ''
                  }`}
                >
                  <div className='col p-0'>
                    <label>
                      واحد درخواست کننده
                      <span className='star IranSans_Bold'>*</span>
                    </label>
                    <input
                      type='text'
                      name={`applicant_unitOther`}
                      onFocus={e => this.OnFocus(e.target.name)}
                      onBlur={this.OnBlur}
                      onChange={this.handleChange}
                      value={handleString(this.state.applicant_unitOther)}
                      readOnly={this.handleDisabled()}
                      disabled={this.handleDisabled()}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian pl-1 ${
                  this.state.foucs === `area` ||
                  handleCheckText(this.state.area)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  ناحیه
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  type='text'
                  name={`area`}
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                  value={handleString(this.state.area)}
                  readOnly={this.handleDisabled()}
                  disabled={this.handleDisabled()}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian pl-1 ${
                  this.state.foucs === `operation_unit` ||
                  handleCheckText(this.state.operation_unit)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  واحد عملیاتی
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  type='text'
                  name={`operation_unit`}
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                  value={handleString(this.state.operation_unit)}
                  readOnly={this.handleDisabled()}
                  disabled={this.handleDisabled()}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  this.state.foucs === 'machine_no' ||
                  handleCheckText(this.state.machine_no)
                    ? 'active'
                    : ''
                }`}
              >
                <label>
                  شماره دستگاه
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  type='text'
                  name='machine_no'
                  value={handleString(this.state.machine_no)}
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                  readOnly={this.handleDisabled()}
                  disabled={this.handleDisabled()}
                />
              </div>
            </div>
            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
              <div
                className={`field-form persian textarea ${
                  this.state.foucs === `technical_problem_description` ||
                  handleCheckText(this.state.technical_problem_description)
                    ? 'active'
                    : ''
                }`}
              >
                <div className='col p-0'>
                  <label className='textarea'>شرح اشکالات فنی</label>
                  <textarea
                    className='w-100'
                    type='text'
                    name={`technical_problem_description`}
                    onFocus={e => this.OnFocus(e.target.name)}
                    onBlur={this.OnBlur}
                    onChange={this.handleChange}
                    value={handleString(
                      this.state.technical_problem_description
                    )}
                    readOnly={this.handleDisabled()}
                    disabled={this.handleDisabled()}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
              <div
                className={`field-form persian textarea ${
                  this.state.foucs === `execution_cause` ||
                  handleCheckText(this.state.execution_cause)
                    ? 'active'
                    : ''
                }`}
              >
                <div className='col p-0'>
                  <label className='textarea'>
                    ریشه‌یابی و تجزیه و تحلیل علل و توجیه لزوم اجرا
                  </label>
                  <textarea
                    className='w-100'
                    type='text'
                    name={`execution_cause`}
                    onFocus={e => this.OnFocus(e.target.name)}
                    onBlur={this.OnBlur}
                    onChange={this.handleChange}
                    value={handleString(this.state.execution_cause)}
                    readOnly={this.handleDisabled()}
                    disabled={this.handleDisabled()}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
              <div
                className={`field-form persian textarea ${
                  this.state.foucs === `corrective_suggest` ||
                  handleCheckText(this.state.corrective_suggest)
                    ? 'active'
                    : ''
                }`}
              >
                <div className='col p-0'>
                  <label className='textarea'>پیشنهاد اصلاحی</label>
                  <textarea
                    className='w-100'
                    type='text'
                    name={`corrective_suggest`}
                    onFocus={e => this.OnFocus(e.target.name)}
                    onBlur={this.OnBlur}
                    onChange={this.handleChange}
                    value={handleString(this.state.corrective_suggest)}
                    readOnly={this.handleDisabled()}
                    disabled={this.handleDisabled()}
                  ></textarea>
                </div>
              </div>
            </div>
            <AttachedDocument
              {...this}
              handleState={(name, value) => this.setState({ [name]: value })}
              out={true}
              nameParent='foreign_attachments'
              canCreate={!this.handleDisabled()}
              require={true}
            />
            <AttachedDocument
              {...this}
              handleState={(name, value) => this.setState({ [name]: value })}
              nameParent='internal_attachments'
              canCreate={!this.handleDisabled()}
            />
            <div className='title-password col-12 mt-3 mb-2'>
              <h2 className='IranSans_Bold'>نوع بهبود</h2>
              <div className='line'></div>
            </div>
            {this.state.improvement_type.map((data, key) => (
              <div
                className='disiplin-checkbox col-xl-6 col-lg-6 col-md-4 col-6 w-auto mt-3 mb-3'
                key={key}
              >
                <div className='checkbox m-0'>
                  {this.handleDisabled() ? (
                    ''
                  ) : (
                    <input
                      className='d-none'
                      id={`_improvement_${data.value}`}
                      name={`_improvement_${data.value}`}
                      type='checkbox'
                      onChange={e => this.handleCheck(e)}
                      checked={
                        this.state[`_improvement_${data.value}`] ? true : false
                      }
                    />
                  )}
                  <label
                    className={`full ${
                      this.handleDisabled() ? 'disabled' : ''
                    }`}
                    htmlFor={`_improvement_${data.value}`}
                  >
                    {this.state[`_improvement_${data.value}`] ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                    {data.label}
                  </label>
                </div>
              </div>
            ))}
            {this.props.showToCC ||
            (!this.props.close && this.props.canUpdate) ? (
              <div className='w-100 row mx-0'>
                <div className='title-password col-12 mt-3 mb-2'>
                  <h2 className='IranSans_Bold'>تخصیص شخص بررسی کننده</h2>
                  <div className='line'></div>
                </div>
                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                  <div className='field-form selectBox'>
                    <CreatableSelect
                      isMulti
                      onChange={newValue =>
                        this.handleChangeSelect('notification_to', newValue)
                      }
                      options={this.state.user_list}
                      value={this.state.notification_to}
                      placeholder={
                        <label className='ltr'>
                          TO
                          <span className='star IranSans_Bold'>*</span>
                        </label>
                      }
                    />
                  </div>
                  <div className='col-12 px-0'>
                    <div className='box-note'>
                      <p className='m-0'>
                        جهت ارسال فرم به منظور دریافت امضاهای بعدی از بخش TO
                        استفاده نمائید. (رئیس واحد، رئیس اداره/امور)
                      </p>
                    </div>
                  </div>
                </div>
                <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
                  <div className='field-form selectBox'>
                    <CreatableSelect
                      isMulti
                      onChange={newValue =>
                        this.handleChangeSelect('notification_cc', newValue)
                      }
                      options={this.state.user_list}
                      value={this.state.notification_cc}
                      placeholder={<label>CC</label>}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
            {this.handleShowButtonSubmit()}
          </div>
          {this.state.popUp && (
            <Sign
              userDetail={this.state.userDetail}
              close={e => this.setState({ popUp: e })}
            />
          )}
        </div>
      )
  }
}
class Sign extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div className='backGroundPopup' onClick={() => this.props.close(false)}>
        <div className='col-xl-6 col-lg-10 col-12'>
          {this.props.userDetail.sign ? (
            <img src={this.props.userDetail.sign} alt='sign' />
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}
