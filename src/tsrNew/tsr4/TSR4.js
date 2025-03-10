import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import Form from '../../Form/Form'
import handleString from '../../handleString'
import API from './API'
import Foreign from '../ShowTsr/Foreign'
import Internal from '../ShowTsr/Internal'
import TOCC from '../TOCC'
import Dispatch from '../Dispatch/Dispatch'
import ButtonSubmit from './ButtonSubmit'
import Sign from '../sign/Sign'
import ButtonEdit from './ButtonEdit'
import ResetSetting from './ResetState'
import CCDisabled from '../CCDisabled'
import BoxText from '../ShowTsr/BoxText'
export default class TSR4 extends Component {
  constructor(props) {
    super(props)
    this.API = new API(this)
    this.ResetSetting = ResetSetting
    this.state = {
      token: Cookies.get('token'),
      hse_review: true,
      hazop_review: true,
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
      notification_cc: []
    }
  }
  componentDidMount() {
    this.fetchData()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.fetchData()
    }
  }
  fetchData = () => {
    const { fetchDataAPI } = this.API
    fetchDataAPI()
  }
  handleDisabledElm = () => {
    const { handleDisabledAPIElm } = this.API
    const result = handleDisabledAPIElm()
    return result
  }
  handleDisabled = () => {
    const { handleDisabledAPI } = this.API
    let _result = handleDisabledAPI()
    return _result
  }
  handleState = obj => {
    this.setState(obj)
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
  handleListForm = () => {
    const { hse_review } = this.state
    let data = [
      {
        value: 'hse_review',
        radio: true,
        label: 'نتیجه بررسی امور HSE',
        items: [
          {
            value: true,
            label: 'مورد تایید است'
          },

          {
            value: false,
            label: 'مورد تایید نیست.'
          }
        ],
        rtl: true,
        require: true,
        disabled: this.handleDisabledElm(),
        onchange: (e, data) => this.HseReview(e, data)
      },
      {
        access: hse_review,
        value: 'hse_review_msg_true',
        name: 'الزامات و ریسک‌ها',
        rtl: true,
        textArea: true,
        disabled: this.handleDisabledElm(),
        require: true
      },
      {
        access: !hse_review,
        value: 'hse_review_msg_false',
        name: 'دلایل عدم تایید',
        rtl: true,
        textArea: true,
        disabled: this.handleDisabledElm(),
        require: true
      },
      {
        value: 'suggested_execution_time',
        name: 'زمان پیشنهادی جهت اجرا',
        date: true,
        rtl: true,
        objectSetState: true,
        isGregorian: false,
        disabled: this.handleDisabledElm(),
        cantShow: !hse_review
      },
      {
        value: 'hazop_review',
        radio: true,
        label: 'نتیجه مطالعات HAZOP:',
        items: [
          {
            value: true,
            label: 'ضمیمه است'
          },

          {
            value: false,
            label: 'نیازی ندارد'
          }
        ],
        rtl: true,
        require: true,
        disabled: this.handleDisabledElm(),
        onchange: (e, data) => this.HAZOPReview(e, data)
      }
    ]
    return data
  }
  HseReview = (e, data) => {
    const { HseReviewAPI } = this.API
    HseReviewAPI(e, data)
  }
  HAZOPReview = (e, data) => {
    const { HAZOPReviewAPI } = this.API
    HAZOPReviewAPI(e, data)
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
  render() {
    const { handlCreate, handleCheckUpdate, ShowSign } = this.API
    const canCreate = handlCreate(4),
      canUpdate = handleCheckUpdate(4)
    const canCreateSubmit = !this.handleDisabledElm() && canCreate
    const sign_1 = ShowSign() ? true : false
    const sign_2 = handleCheckUpdate(4) ? false : true
    const sign_3 = canCreateSubmit ? false : true
    const canSign = sign_1 && sign_2 && sign_3
    let { redirect, hazop_review, status_copy } = this.state
    if (redirect) {
      return <Redirect to='new-index-TSR' />
    } else {
      return (
        <div className='form row justify-content-start'>
          <div className='w-100 row justify-content-start m-0'>
            <BoxText {...this} id={4} status={status_copy} />
            <Dispatch
              {...this}
              filter1='user_unit'
              filter2='HSE_SD_ایمنی و آتش نشانی_SD_محیط زیست'
              canCreate={canCreate}
            />
            <Form {...this} itemForm={this.handleListForm()} />
            <Foreign
              check_disabled={this.handleDisabledElm()}
              {...this}
              notRequire={hazop_review ? false : true}
              name='foreign_attachment'
            />
            <Internal
              check_disabled={this.handleDisabledElm()}
              {...this}
              name='internal_attachment'
            />
            {canCreateSubmit && <TOCC {...this} />}
            {canCreateSubmit && <ButtonSubmit {...this} />}
            {canSign && <Sign {...this} status={status_copy} />}
            {canUpdate && <ButtonEdit {...this} />}
            <CCDisabled {...this} />
          </div>
        </div>
      )
    }
  }
}
