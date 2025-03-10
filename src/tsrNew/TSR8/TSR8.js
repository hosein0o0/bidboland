import React, { Component } from 'react'
import Dispatch from '../Dispatch/Dispatch'
import API from './API'
import handleString from '../../handleString'
import Form from '../../Form/Form'
import Cookies from 'js-cookie'
import TOCC from '../TOCC'
import ButtonSubmit from './ButtonSubmit'
import { Redirect } from 'react-router-dom'
import Sign from '../sign/Sign'
import ButtonEdit from './ButtonEdit'
import CCDisabled from '../CCDisabled'
import ManageTab from './ManageTab'
import ResetState from './ResetState'
import BoxText from '../ShowTsr/BoxText'
export default class TSR8 extends Component {
  constructor(props) {
    super(props)
    this.API = new API(this)
    this.ResetState = new ResetState()
    this.state = {
      token: Cookies.get('token'),
      notification_cc: [],
      tab: 1,
      exporter_group: 'electrical'
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
    const { name, value } = e.target
    this.setState({ [name]: handleString(value) })
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
    const { handleListFormAPI } = this.API
    const result = handleListFormAPI()
    return result
  }
  // handleListGroup = () => {
  //   const { handleListGroupAPI } = this.API
  //   let result = handleListGroupAPI() || []
  //   return result
  // }
  render() {
    const {
      handlCreate,
      ShowSign,
      handleCheckUpdate,
      TabValue,
      Split
    } = this.API
    const canCreate = handlCreate(8)
    const canCreateSubmit = !this.handleDisabledElm() && canCreate,
      canUpdate = handleCheckUpdate(8),
      name = TabValue()
    let { redirect, tab } = this.state
    const sign_1 = ShowSign() ? true : false
    const sign_2 = handleCheckUpdate(8) ? false : true
    const sign_3 = canCreateSubmit ? false : true
    const canSign = sign_1 && sign_2 && sign_3
    const status_copy = Split()
    if (redirect) {
      return <Redirect to='index-TSR' />
    } else
      return (
        <div className='form row justify-content-start'>
          <div className='w-100 row justify-content-start m-0'>
            <ManageTab {...this} />
            <BoxText {...this} id={8} status={status_copy} />
            {/* <Form {...this} itemForm={this.handleListGroup()} /> */}
            <Dispatch
              {...this}
              filter1='user_unit'
              filter2='بازرسی فنی'
              canCreate={true}
              nameDis={`checkBox_8${tab}_${name}`}
              nameTab={name}
              except={true}
            />
            <Form {...this} itemForm={this.handleListForm()} />
            {canCreateSubmit && <TOCC {...this} multiTab={tab} nameCC={name} />}
            {canCreateSubmit && <ButtonSubmit {...this} />}
            {canSign && <Sign {...this} status={status_copy} multiTab={tab} />}
            {canUpdate && <ButtonEdit {...this} />}
            <CCDisabled {...this} />
          </div>
        </div>
      )
  }
}
