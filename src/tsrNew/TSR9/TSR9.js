import React, { Component } from 'react'
import Cookies from 'js-cookie'
import handleString from '../../handleString'
import API from './API'
import FirstLevel from './FirstLevel'
import { Redirect } from 'react-router-dom'
import SecondLevel from './SecondLevel'
import ResetState from './ResetState'
export default class TSR9 extends Component {
  constructor (props) {
    super(props)
    this.API = new API(this)
    this.ResetState = new ResetState()
    this.state = {
      token: Cookies.get('token'),
      notification_cc: [],
      all_groups: [{ priority: 1, group: [] }],
      tab: 1,
      fixed_mechanical_contractor_attach: [],
      fixed_mechanical_contractor_attachName: [],
      rotating_mechanical_contractor_attach: [],
      rotating_mechanical_contractor_attachName: [],
      electrical_contractor_attach: [],
      electrical_contractor_attachName: [],
      instrument_contractor_attach: [],
      instrument_contractor_attachName: [],
      sensitive_equipment_contractor_attach: [],
      sensitive_equipment_contractor_attachName: [],
      repair_services_contractor_attach: [],
      repair_services_contractor_attachName: []
    }
  }
  componentDidMount () {
    this.fetchData()
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.props = nextProps
      this.fetchData()
    }
  }
  fetchData = () => {
    const { fetchDataAPI } = this.API
    fetchDataAPI()
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
  handleDisabled = () => {
    const { handleDisabledAPI } = this.API
    let result = handleDisabledAPI()
    return result
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
  handleUpload = async (e, files, names) => {
    const { handleUploadAPI } = this.API
    handleUploadAPI(e, files, names)
  }
  GetLinkSingle = (nameState, file, names, length, i) => {
    const { GetLinkSingleAPI } = this.API
    GetLinkSingleAPI(nameState, file, names, length, i)
  }
  deleteFile = (num, files, names) => {
    const { deleteFileAPI } = this.API
    deleteFileAPI(num, files, names)
  }
  render () {
    let { redirect } = this.state
    if (redirect) {
      return <Redirect to='index-TSR' />
    } else
      return (
        <div className='form row justify-content-start'>
          <div className='w-100 row justify-content-start m-0'>
            <FirstLevel {...this} />
            <SecondLevel {...this} />
          </div>
        </div>
      )
  }
}
