import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import StaticData from '../../staticData'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import Sidebar from '../../layout/sidebar'
import Menu from '../../layout/menu'
// import CounterTab from '../../Customization/CounterTab'
import Permision from '../../permision/permision'
import { Redirect } from 'react-router-dom'
import EquipmentManual from './EquipmentManual'
// import DetailedDocuments from './DetailedDocuments'
export default class FinalEngineeringManualForm extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      project_code: '',
      doc_code: '',
      doc_desc: '',
      vendor: '',
      rev: '',
      trans_code: '',
      trans_received_date: '',
      poi: '',
      poi_status: '',
      disc_desc: '',
      comment_sheet_code: '',
      comment_sheet_date: '',
      status: '',
      loading: '',
      itemForm: [],
      accessTab: false,
      select: 0,
      attachment: [],
      attachmentName: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ایجاد کتابچه نهایی تجهیزات`
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = () => {
    
  }
  handleShowTab = () => {
    let list = [
      {
        name: 'کتابچه تجهیزات',
        value: 1,
        access: this.Permision.handlePermision(
          this.state.role,
          'equipment_final_data_book_create'
        )
      }
      // {
      //   name: 'اسناد تفضیلی کتابچه تجهیزات',
      //   value: 2,
      //   access: this.Permision.handlePermision(this.state.role, '')
      // }
    ]
    return list
  }
  getRole = async (response, status) => {
    if (status === 'response') {
      if (response.status === 200) {
        await this.setState({ role: response.data.role, accessTab: true })
        if (
          this.Permision.handlePermision(
            this.state.role,
            'equipment_final_data_book_create'
          )
        ) {
          await this.setState({ select: 1 })
        } else if (this.Permision.handlePermision(this.state.role, '')) {
          await this.setState({ select: 2 })
        } else {
          await this.HasNotRol()
        }
        await this.ChangeTab(this.state.select)
      } else {
        this.setState({ select: 0, accessTab: false })
        Notification.notify(Message.text(response.status), 'error')
      }
    } else {
      this.setState({ select: 0, accessTab: false })
      if (response.response) {
        Notification.notify(Message.text(response.response.status), 'error')
      }
    }
  }
  HasNotRol = () => {
    this.setState({ select: 0, accessTab: false, _404: true })
  }
  handleUpload = async (e, files, names) => {
    await e.preventDefault()
    await this.setState({ loading: files })
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = await new FileReader()
      await reader.readAsDataURL(e.target.files[i])
      await this.GetLink(
        files,
        e.target.files[i],
        names,
        e.target.files.length,
        i
      )
    }
  }
  GetLink = (nameState, file, names, length, i) => {
    let datareg = new FormData()
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/FinalEngineeringManual`,
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
          await this.setState({
            [nameState]: [...this.state[nameState], response.data.content],
            [names]: [...this.state[names], file.name]
          })
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
  deleteFile = async (num, files, names) => {
    let fileList = await this.state[files],
      nameList = await this.state[names]
    if (fileList && nameList) {
      await nameList.splice(num, 1)
      await fileList.splice(num, 1)
      await this.setState({ [files]: fileList, [names]: nameList })
    }
  }
  handleshow = () => {
    if (this.state.token) {
      switch (this.state.select) {
        case 1:
          return <EquipmentManual {...this} />
        default:
          return ''
      }
    }
  }
  ChangeTab = value => {
    let list = []
    switch (value) {
      case 1:
        list = [
          { name: 'Doc Code', value: 'doc_code' },
          { name: 'Vendor', value: 'vendor_name' },
          { name: 'PO. NUMBER', value: 'po_number' },
          { name: ' PO. Description', value: ' po_description' },
          { name: 'Doc Desc', value: 'doc_desc' },
          { name: 'Tag NO.', value: 'tag_no' },
          { name: 'Disc Desc', value: 'disc_desc' },
          { name: 'Rev', value: 'rev' },
          { name: 'POI Status', value: 'poi_status' },
          { name: 'attachment', value: 'attachment', upload: true, accept: '*' }
        ]
        break
      default:
        break
    }
    this.setState({ select: value, itemForm: list })
  }
  render () {
    if (!this.state.token) {
      return <Redirect to='/Login' />
    } else if (this.state._404) {
      return <Redirect to='/404' />
    } else
      return (
        <div className='main'>
          <div className='col-12 p-0'>
            <div className='row m-0'>
              <Sidebar
                handleState={(name, value) => this.setState({ [name]: value })}
              />
              <div
                className={`${
                  this.state._close
                    ? 'mainSideClose'
                    : 'col-xl-10 col-lg-10 p-0'
                } dashboard`}
              >
                <Menu
                  nameRole='equipment_final_data_book_create'
                  getRole={(response, status) => this.getRole(response, status)}
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>ایجاد سند جدید</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        {this.handleshow()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
}
