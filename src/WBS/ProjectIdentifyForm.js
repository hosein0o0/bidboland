import React, { Component } from 'react'
import Cookies from 'js-cookie'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import Form from '../Form/Form'
import handleString from '../handleString'
import axios from 'axios'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import handleCheckText from '../handleCheckText'
import { Redirect } from 'react-router-dom'
import Items from './API/ItemForms'
export default class ProjectIdentifyForm extends Component {
  constructor(props) {
    super(props)
    this.Items = new Items(this)
    this.state = {
      token: Cookies.get('token'),
      transmittal_no: 'CT-MT-T-xxxxx',
      comment_sheet_code: 'OT-PT-C-xxxxx',
      reply_sheet_code: 'PT-OT-R-xxxxx',
      project_code: '',
      // itemForm: this.Items.ItemForms() || [],
      contractor_logo: [],
      contractor_logoName: [],
      client_logo: [],
      client_logoName: [],
      contractor_sign: [],
      contractor_signName: [],
      client_sign: [],
      client_signName: []
    }
  }
  // componentDidMount() {
  //   const { ItemForms } = this.Items
  //   this.setState({ itemForm: ItemForms() || [] })
  // }
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
  handleUpload = async (e, files, names) => {
    const myFile = e.target.files
    const { project_code } = this.state
    if (handleCheckText(project_code)) {
      await e.preventDefault()
      await this.setState({ loading: files })
      for (let i = 0; i < myFile.length; i++) {
        let reader = await new FileReader()
        await reader.readAsDataURL(myFile[i])
        await this.GetLink(files, myFile[i], names, myFile.length, i, project_code)
      }
    } else {
      Notification.notify(Message.text(208), 'error')
    }
  }
  GetLink = (nameState, file, names, length, i, project_code) => {
    let datareg = new FormData()
    datareg.append('file', file)
    const check = nameState === 'client_logo' || nameState === 'contractor_logo'
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/SystemManagement/Wbs/ProjectIdentify/${project_code}/${check ? 'logo' : 'sign'}`,
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
  handleManageList = (list) => {
    let result = Object.keys(list).map(item => {
      return list[item].value
    }).join(',')
    return result
  }
  CheckArray = array => {
    let result = array.length > 0
    return result
  }
  handleSubmit = async () => {
    const {
      project_code,
      contractor_no,
      client_no,
      transmittal_no,
      from_part1,
      from_part2,
      to_part1,
      to_part2,
      cc_part1,
      cc_part2,
      discipline,
      _class,
      poi,
      cc,
      ac,
      status,
      comment_sheet_code,
      reply_sheet_code,
      contractor_logo,
      client_logo,
      token,
      contractor_sign,
      client_sign
    } = this.state
    let _poi = this.handleManageList(poi || []),
      _cc = this.handleManageList(cc || []),
      _ac = this.handleManageList(ac || []),
      _discipline = this.handleManageList(discipline || []),
      my_class = this.handleManageList(_class || [])
    const check =
      handleCheckText(project_code) &&
      handleCheckText(contractor_no) &&
      handleCheckText(client_no) &&
      handleCheckText(transmittal_no) &&
      handleCheckText(from_part1) &&
      handleCheckText(from_part2) &&
      handleCheckText(comment_sheet_code) &&
      handleCheckText(reply_sheet_code) &&
      handleCheckText(to_part1) &&
      handleCheckText(to_part2) &&
      handleCheckText(cc_part1) &&
      handleCheckText(cc_part2) &&
      handleCheckText(_discipline) &&
      handleCheckText(my_class) &&
      handleCheckText(_ac) &&
      handleCheckText(_cc) &&
      handleCheckText(_poi) &&
      handleCheckText(status?.value) &&
      handleCheckText(comment_sheet_code) &&
      handleCheckText(reply_sheet_code) &&
      this.CheckArray(contractor_logo || []) &&
      this.CheckArray(client_logo || []) &&
      this.CheckArray(contractor_sign || []) &&
      this.CheckArray(client_sign || [])
    if (check) {
      let fnVal = (array) => array[0]
      await this.setState({ loading: 'submit', disabled: true })
      const datareg = await new FormData()
      await datareg.append('project_code', project_code)
      await datareg.append('contractor_no', contractor_no)
      await datareg.append('client_no', client_no)
      await datareg.append('transmittal_no', transmittal_no)
      await datareg.append('from_part1', from_part1)
      await datareg.append('from_part2', from_part2)
      await datareg.append('to_part1', to_part1)
      await datareg.append('to_part2', to_part2)
      await datareg.append('cc_part1', cc_part1)
      await datareg.append('cc_part2', cc_part2)
      await datareg.append('discipline', _discipline)
      await datareg.append('class', my_class)
      await datareg.append('poi', _poi)
      await datareg.append('cc', _cc)
      await datareg.append('ac', _ac)
      await datareg.append('status', status?.value)
      await datareg.append('comment_sheet_code', comment_sheet_code)
      await datareg.append('reply_sheet_code', reply_sheet_code)
      await datareg.append('contractor_logo', handleCheckText(project_code) ? fnVal(contractor_logo || []) : '')
      await datareg.append('client_logo', handleCheckText(project_code) ? fnVal(client_logo || []) : '')
      await datareg.append('contractor_sign', handleCheckText(project_code) ? fnVal(contractor_sign || []) : '')
      await datareg.append('client_sign', handleCheckText(project_code) ? fnVal(client_sign || []) : '')
      const url = `${StaticData.domainIp}/project_identify/create`
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          await this.setState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              await this.setState({ redirect: true, disabled: false })
            }, 5000)
          } else {
            await this.setState({ disabled: false })
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
  handleState = (name, value) => {
    this.setState({ [name]: value })
  }
  render() {
    const { loading, disabled, token, redirect, _close } = this.state
    if (token === undefined) {
      return <Redirect to='/Login' />
    } else if (redirect) {
      return (
        <Redirect
          to={{
            pathname: `/wbs`,
            state: { select: 5 }
          }}
        />
      )
    } else
      return (
        <div className='main'>
          <div className='col-12 p-0'>
            <div className='row m-0'>
              <Sidebar
                handleState={(name, value) => this.setState({ [name]: value })}
              />
              <div
                className={`${_close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'
                  } dashboard`}
              >
                <Menu
                  nameRole='project_identify_create'
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>ایجاد سند جدید</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row ltr'>
                          <Form {...this} itemForm={this.Items.ItemForms()} />
                          <div className='submit-form rtl col-12 mt-5'>
                            <button
                              onClick={this.handleSubmit}
                              disabled={disabled}
                            >
                              {loading === 'submit' ? (
                                <Loading className='form-loader' />
                              ) : (
                                <DoneIcon />
                              )}
                              ثبت اطلاعات
                            </button>
                          </div>
                        </div>
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
