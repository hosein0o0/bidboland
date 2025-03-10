import React, { Component } from 'react'
import API from './API'
import handleString from '../../handleString'
import Dispatch from '../Dispatch/Dispatch'
import Form from '../../Form/Form'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import Foreign from '../ShowTsr/Foreign'
import Internal from '../ShowTsr/Internal'
import TOCC from '../TOCC'
import ButtonSubmit from './ButtonSubmit'
import Sign from '../sign/Sign'
import ButtonsEdit from './ButtonsEdit'
import ResetSetting from './ResetState'
import CCDisabled from '../CCDisabled'
import BoxText from '../ShowTsr/BoxText'
export default class TSR5 extends Component {
  constructor(props) {
    super(props)
    this.API = new API(this)
    this.ResetSetting = ResetSetting
    this.state = {
      review_result: true,
      token: Cookies.get('token'),
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
  handleListForm = () => {
    const { review_result } = this.state
    let data = [
      {
        value: 'review_result',
        radio: true,
        label: 'نتیجه بررسی',
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
        onchange: (e, data) => this.ReviewResult(e, data)
      },
      {
        access: !review_result,
        value: 'reject_msg',
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
        cantShow: !review_result
      }
    ]
    return data
  }
  ReviewResult = (e, data) => {
    const { ReviewResultAPI } = this.API
    ReviewResultAPI(e, data)
  }
  render() {
    const { handlCreate, handleCheckUpdate, ShowSign } = this.API
    const canCreate = handlCreate(5),
      canUpdate = handleCheckUpdate(5)
    const canCreateSubmit = !this.handleDisabledElm() && canCreate
    const sign_1 = ShowSign() ? true : false
    const sign_2 = handleCheckUpdate(5) ? false : true
    const sign_3 = canCreateSubmit ? false : true
    const canSign = sign_1 && sign_2 && sign_3
    let { redirect, status_copy } = this.state
    if (redirect) {
      return <Redirect to='index-TSR' />
    } else
      return (
        <div className='form row justify-content-start'>
          <div className='w-100 row justify-content-start m-0'>
            <BoxText {...this} id={5} status={status_copy} />
            <Dispatch
              {...this}
              filter1='user_unit'
              filter2='مهندسی عمومی و پروژه ها'
              canCreate={canCreate}
            />
            <Form {...this} itemForm={this.handleListForm()} />
            <Foreign
              check_disabled={this.handleDisabledElm()}
              {...this}
              notRequire={true}
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
            {canUpdate && <ButtonsEdit {...this} />}
            <CCDisabled {...this} />
          </div>
        </div>
      )
  }
}
