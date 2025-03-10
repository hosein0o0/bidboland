import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import handleString from '../../handleString'
import ManageTab from './ManageTab'
import API from './API'
import Mechanical from './Mechanical'
import ButtonSubmit from './ButtonSubmit'
import ButtonEdit from './ButtonEdit'
import Electrical from './Electrical'
import Instrument from './Instrument'
import Building from './Building'
import ResetState from './ResetState'
import CCDisabled from '../CCDisabled'
import BoxText from '../ShowTsr/BoxText'
export default class TSR7 extends Component {
  constructor(props) {
    super(props)
    this.API = new API(this)
    this.ResetState = new ResetState()
    this.state = {
      token: Cookies.get('token'),
      tab: 1
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
    this.props.handleState({ tab_7: tab })
    this.fetchData()
  }
  fetchData = () => {
    const { fetchDataAPI } = this.API
    fetchDataAPI()
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
  handleListForm = () => {
    const { handleListFormAPI } = this.API
    let result = handleListFormAPI()
    return result
  }
  handleShow = () => {
    let { tab } = this.state
    switch (tab) {
      case 1:
        return <Mechanical {...this} />
      case 2:
        return <Electrical {...this} />
      case 3:
        return <Instrument {...this} />
      case 4:
        return <Building {...this} />
      default:
        return ''
    }
  }
  render() {
    let { handlCreate, handleCheckUpdate, handleSwitchName, Split } = this.API
    const canCreate = handlCreate(7),
      canUpdate = handleCheckUpdate(7)
    const canCreateSubmit = !this.handleDisabledElm() && canCreate
    let { redirect } = this.state
    const name_tab = handleSwitchName()
    const status = Split()
    if (redirect) return <Redirect to='index-TSR' />
    else
      return (
        <div className='form row justify-content-start'>
          <div className='w-100 row justify-content-start m-0'>
            <ManageTab {...this} />
            <BoxText {...this} id={7} status={status} />
            {this.handleShow()}
            {canCreateSubmit && <ButtonSubmit {...this} />}
            {canUpdate && <ButtonEdit {...this} />}
            <CCDisabled {...this} nameCC={`${name_tab}_notification_cc_info`} />
          </div>
        </div>
      )
  }
}
