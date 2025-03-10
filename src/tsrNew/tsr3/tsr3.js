import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import Form from '../../Form/Form'
import API from './API'
import handleString from '../../handleString'
import handleCheckText from '../../handleCheckText'
import Foreign from '../ShowTsr/Foreign'
import Internal from '../ShowTsr/Internal'
import Dispatch from '../Dispatch/Dispatch'
import ButtonSubmit from './ButtonSubmit'
import TOCC from '../TOCC'
import Sign from '../sign/Sign'
import ButtonEdit from './ButtonEdit'
import ResetSetting from './ResetState'
import CCDisabled from '../CCDisabled'
import BoxText from '../ShowTsr/BoxText'
export default class TSR3 extends Component {
  constructor(props) {
    super(props)
    this.API = new API(this)
    this.ResetSetting = ResetSetting
    this.state = {
      token: Cookies.get('token'),
      review_result: null,
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
          documentNumber: '',
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: ''
        }
      ],
      notification_cc: [],
      review_result: '1'
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
    const { FetchDataAPI } = this.API
    FetchDataAPI()
  }
  handleState = obj => {
    this.setState(obj)
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
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: handleString(e.target.value) })
  }
  handleReview = (e, data) => {
    const { handleReviewAPI } = this.API
    handleReviewAPI(e, data)
  }
  handleListForm = () => {
    const { DescriptionName } = this.API
    let { result, label } = DescriptionName()
    let { review_result } = this.state
    let data = [
      {
        // name: 'review_result',
        value: 'review_result',
        radio: true,
        label: 'نتیجه بررسی',
        items: [
          {
            value: '1',
            label: 'مورد تایید است'
          },

          {
            value: '0',
            label: 'مورد تایید نیست.'
          },
          {
            value: '2',
            label: 'نیاز به بررسی فرایندی ندارد.'
          }
        ],
        rtl: true,
        require: true,
        disabled: this.handleDisabledElm(),
        onchange: (e, data) => this.handleReview(e, data)
      },
      {
        access: handleCheckText(result) && handleCheckText(label),
        value: result,
        name: label,
        rtl: true,
        require: false,
        textArea: true,
        disabled: this.handleDisabledElm(),
        require: true
      },
      {
        value: 'suggest_time',
        name: 'زمان پیشنهادی جهت اجرا',
        date: true,
        rtl: true,
        objectSetState: true,
        isGregorian: false,
        disabled: this.handleDisabledElm(),
        cantShow: review_result !== '1'
      }
    ]
    return data
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
    const canCreate = handlCreate(3),
      // canSign = ShowSign(),
      canUpdate = handleCheckUpdate(3)
    const canCreateSubmit = !this.handleDisabledElm() && canCreate
    const { status_copy, redirect } = this.state
    const sign_1 = ShowSign() ? true : false
    const sign_2 = handleCheckUpdate(3) ? false : true
    const sign_3 = canCreateSubmit ? false : true
    const canSign = sign_1 && sign_2 && sign_3
    if (redirect) {
      return <Redirect to='new-index-TSR' />
    } else
      return (
        <div className='form row justify-content-start'>
          <div className='w-100 row justify-content-start m-0'>
            <BoxText {...this} id={3} status={status_copy} />
            <Dispatch
              {...this}
              filter1='user_unit'
              filter2='مهندسی فرآیند و کنترل تولید'
              canCreate={canCreate}
            />
            <Form {...this} itemForm={this.handleListForm()} />
            <Foreign
              {...this}
              check_disabled={this.handleDisabledElm()}
              notRequire={true}
              name='foreign_attachment'
            />
            <Internal
              {...this}
              check_disabled={this.handleDisabledElm()}
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
