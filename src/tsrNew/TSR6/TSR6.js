import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import Form from '../../Form/Form'
import ManageTab from './ManageTab'
import API from './API'
import handleString from '../../handleString'
import ButtonSubmit from './ButtonSubmit'
import Sign from '../sign/Sign'
import ButtonEdit from './ButtonEdit'
import CCDisabled from '../CCDisabled'
export default class TSR6 extends Component {
  constructor(props) {
    super(props)
    this.API = new API(this)
    this.state = {
      token: Cookies.get('token'),
      tab: 1,
      process_foreign_attachment: [],
      process_internal_attachment: [],
      general_foreign_attachment: [],
      general_internal_attachment: [],
      inspection_foreign_attachment: [],
      inspection_internal_attachment: [],
      tech_result: true,
      process_result: false,
      general_result: false,
      inspection_result: false,
      process_result: true,
      general_result: true,
      inspection_result: true
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.fetchData()
    }
  }
  componentDidMount() {
    let { tab } = this.state
    this.props.handleState({ tab_6: tab })
    this.fetchData()
  }
  fetchData = () => {
    const { fetchDataAPI } = this.API
    fetchDataAPI()
  }
  handleState = obj => {
    this.setState(obj)
  }
  handleDisabled = () => {
    const { handleDisabledAPI } = this.API
    let result = handleDisabledAPI()
    return result
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
    let { handleListFormAPI } = this.API
    let data = handleListFormAPI() || []
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
    let { redirect, tab } = this.state
    let { handlCreate, ShowSign, handleCheckUpdate, Split } = this.API
    const canCreate = handlCreate(6),
      canUpdate = handleCheckUpdate(6)
    const status = Split()
    const sign_1 = ShowSign() ? true : false
    const sign_2 = handleCheckUpdate(6) ? false : true
    const sign_3 = canCreate ? false : true
    const canSign = sign_1 && sign_2 && sign_3
    if (redirect) {
      return <Redirect to='index-TSR' />
    } else
      return (
        <div className='form row justify-content-start'>
          <div className='w-100 row justify-content-start m-0'>
            <ManageTab {...this} />
            <Form {...this} itemForm={this.handleListForm()} />
            {canCreate && <ButtonSubmit {...this} />}
            {canSign && <Sign {...this} multiTab={tab} status={status} />}
            {canUpdate && <ButtonEdit {...this} />}
            <CCDisabled {...this} />
          </div>
        </div>
      )
  }
}
