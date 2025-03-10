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
export default class ProjectIdentifyEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      itemForm: [
        { name: 'Project Code', value: 'project_code', require: true },
        { name: 'Contractor No', value: 'contractor_no', require: true },
        { name: 'Client No', value: 'client_no', require: false },
        { name: 'Transmittal No', value: 'transmittal_no', require: true },
        { name: 'From Part1', value: 'from_part1', require: false },
        { name: 'From Part2', value: 'from_part2', require: false },
        { name: 'To Part1', value: 'to_part1', require: false },
        { name: 'To Part2', value: 'to_part2', require: false },
        { name: 'CC Part1', value: 'cc_part1', require: false },
        { name: 'CC Part2', value: 'cc_part2', require: false },
        { name: 'Discipline', value: 'discipline', require: false },
        { name: 'Class', value: '_class', require: false },
        { name: 'Poi', value: 'poi', require: false },
        { name: 'cc', value: 'cc', require: false },
        { name: 'ac', value: 'ac', require: false },
        { name: 'Status', value: 'status', require: false },
        {
          name: 'Comment Sheet',
          value: 'comment_sheet_code',
          require: false
        },
        {
          name: 'Reply',
          value: 'reply_sheet_code',
          require: false
        },
        {
          name: 'Contractor Logo',
          value: 'contractor_logo',
          require: false,
          upload: true,
          accept: 'image/*',
          single: true
        },
        {
          name: 'Client Logo',
          value: 'client_logo',
          require: false,
          upload: true,
          accept: 'image/*',
          single: true
        }
      ],
      contractor_logo: [],
      contractor_logoName: [],
      client_logo: [],
      client_logoName: []
    }
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
      url: `${StaticData.domainIp}/uploadFile/SystemManagement/Wbs/ProjectIdentify/logo`,
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
      token
    } = this.state
    const check =
      handleCheckText(project_code) &&
      handleCheckText(contractor_no) &&
      handleCheckText(transmittal_no)
    if (check) {
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
      await datareg.append('discipline', discipline)
      await datareg.append('class', _class)
      await datareg.append('poi', poi)
      await datareg.append('cc', cc)
      await datareg.append('ac', ac)
      await datareg.append('status', status)
      await datareg.append('comment_sheet_code', comment_sheet_code)
      await datareg.append('reply_sheet_code', reply_sheet_code)
      await datareg.append(
        'contractor_logo',
        JSON.stringify(contractor_logo || [])
      )
      await datareg.append(
        'contractor_logo',
        JSON.stringify(contractor_logo || [])
      )
      await datareg.append('client_logo', JSON.stringify(client_logo || []))
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
  render () {
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
                className={`${
                  _close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'
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
                          <Form {...this} />
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
