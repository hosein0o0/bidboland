import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import StaticData from '../../staticData'
// import axios from 'axios'
// import Notification from '../../notification/notification'
// import Message from '../../notification/Message'
// import AttachedDocument from '../AttachedDocument'
import Form from '../../Form/Form'
import handleString from '../../handleString'
import TypeRecovery from './TypeRecovery'
import handleCheckText from '../../handleCheckText'
import TOCC from '../TOCC'
import ButtonSubmit from './ButtonSubmit'
import Sign from '../sign/Sign'
import ButtonEdit from './ButtonEdit'
import API from './API'
import Foreign from '../ShowTsr/Foreign'
import Internal from '../ShowTsr/Internal'
import CCDisabled from '../CCDisabled'
export default class TechnicalServiceApplication extends Component {
  constructor(props) {
    super(props)
    this.API = new API(this)
    this.state = {
      foucs: '',
      token: Cookies.get('token'),
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
          documentNumber: '',
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: ''
        }
      ],
      canCreate: false,
      role: null,
      disabled: false,
      redirect: false,
      user_list: [],
      applicant_unit: [],
      listData: [],
      office_boss: [],
      unit_boss: [],
      notification_cc: [],
      loading: '',
      select: 1,
      level: 1
    }
  }
  componentDidMount() {
    document.title = `${StaticData.Title} - صدور درخواست توسط متقاضی`
    if (this.props.create) this.fetchData()
    else this.ShowFetch()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      if (this.props.create) this.fetchData()
      else this.ShowFetch()
    }
  }
  ShowFetch = () => {
    const { ShowFetchAPI } = this.API
    ShowFetchAPI()
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
  fetchData = () => {
    const url = `${StaticData.domainIp}/tsr_v1/getFirstDetailForCreate`
    const { fetchDataAPI } = this.API
    fetchDataAPI(url)
  }
  handleDisabled = () => {
    const { create } = this.props
    const { handleCheckUpdate } = this.API
    const canUpdate = handleCheckUpdate(1)
    const check = create || canUpdate
    return !check
  }
  handleListForm = () => {
    const arrray = [
      {
        value: 'tsr_no',
        name: 'شماره TSR',
        rtl: true,
        disabled: true,
        require: true
      },
      {
        value: this.handleDisabled() ? 'created_at_date' : 'created_at',
        name: 'تاریخ درخواست',
        rtl: true,
        disabled: true,
        require: true
      },
      {
        value: 'subject',
        name: 'موضوع',
        rtl: true,
        require: true,
        disabled: this.handleDisabled()
      },
      {
        name: 'واحد درخواست کننده',
        value: 'applicant_unit_select',
        radio: true,
        items: this.state.applicant_unit,
        rtl: true,
        require: true,
        disabled: !this.props.create,
        onchange: (e, item) => this.handleUnitBoss(e, item)
      },
      {
        value: 'area',
        name: 'ناحیه',
        rtl: true,
        require: true,
        disabled: this.handleDisabled()
      },
      {
        value: 'operation_unit',
        name: 'واحد عملیاتی',
        rtl: true,
        require: true,
        disabled: this.handleDisabled()
      },
      {
        value: 'machine_no',
        name: 'شماره دستگاه',
        rtl: true,
        require: true,
        disabled: this.handleDisabled()
      },
      {
        value: 'technical_problem_description',
        name: 'شرح اشکالات فنی',
        rtl: true,
        require: true,
        textArea: true,
        disabled: this.handleDisabled(),
        access: true
      },
      {
        value: 'execution_cause',
        name: 'ریشه‌یابی و تجزیه و تحلیل علل و توجیه لزوم اجرا',
        rtl: true,
        textArea: true,
        disabled: this.handleDisabled(),
        access: true
      },
      {
        value: 'corrective_suggest',
        name: 'پیشنهاد اصلاحی',
        rtl: true,
        textArea: true,
        disabled: this.handleDisabled(),
        access: true
      }
    ]
    return arrray
  }
  handleState = obj => {
    this.setState(obj)
  }
  handleChangeList = (parent, name, value, key) => {
    let list = this.state[parent]
    let obj = list[key]
    obj[name] = value
    this.setState({ [parent]: list })
  }
  handleAddAttach = nameState => {
    let { handleAddAttachAPI } = this.API
    handleAddAttachAPI(nameState)
  }
  handleDelete = (nameState, key) => {
    let data = this.state[nameState]
    data.splice(key, 1)
    this.setState({ [nameState]: data })
  }
  deleteFileList = async (key, num, files, names, parent) => {
    const { deleteFileListAPI } = await this.API
    await deleteFileListAPI(key, num, files, names, parent)
  }
  handleUploadList = async (e, files, names, parentState) => {
    const { handleUploadListAPI } = await this.API
    await handleUploadListAPI(e, files, names, parentState)
  }
  GetLink = async (nameState, file, names, length, key, i, parentState) => {
    const { GetLinkAPI } = await this.API
    await GetLinkAPI(nameState, file, names, length, key, i, parentState)
  }
  handleUnitBoss = async (e, item) => {
    const { handleUnitBossAPI } = await this.API
    await handleUnitBossAPI(e, item)
  }
  handleCheckUnitOffice = (array, _value) => {
    let check = array.length > 0 && _value !== undefined
    if (check) {
      let filter = array.filter(_data => _data === _value)
      check = filter.length === 1
    }
    return check
  }
  render() {
    const { ShowSignAPI, handleCheckUpdate } = this.API
    const canUpdate = handleCheckUpdate(1)
    const sing_1 = ShowSignAPI() ? true : false
    const sign_2 = handleCheckUpdate(1) ? false : true
    let { create } = this.props
    const CheckShow = canUpdate || create
    const sign_3 = create ? false : true
    const canSign = sing_1 && sign_2 && sign_3
    const { status_copy, redirect, improvement_type } = this.state
    const checkRecovery = handleCheckText(improvement_type) || CheckShow
    if (redirect) {
      return <Redirect to='new-index-TSR' />
    } else
      return (
        <div className='form row justify-content-start'>
          <div className='w-100 row justify-content-start m-0'>
            <Form {...this} itemForm={this.handleListForm()} />
            <Foreign check_disabled={this.handleDisabled()} {...this} />
            <Internal check_disabled={this.handleDisabled()} {...this} />
            {checkRecovery && <TypeRecovery {...this} />}
            {create && <TOCC {...this} create_one={true} />}
            {canSign && <Sign {...this} status={status_copy} />}
          </div>
          {create && <ButtonSubmit {...this} />}
          {canUpdate && <ButtonEdit {...this} />}
          {!create && <CCDisabled {...this} />}
        </div>
      )
  }
}
