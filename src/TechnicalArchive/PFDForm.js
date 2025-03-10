import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import Form from '../Form/Form'
import { Redirect } from 'react-router-dom'
import handleCheckText from '../handleCheckText'
import CancelButton from '../layout/CancelButton'
export default class PFDForm extends Component {
  constructor (props) {
    super(props)
    // handleCheckText = HandleCheckText.handleCheckText
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      loading: '',
      project_code: '',
      owner_project_no: '',
      project_plant_location: '',
      unit_no_zone_no: '',
      serial_no: '',
      sheet_no: '',
      rev: '',
      drawing_title: '',
      pfd_no: '',
      legend: '',
      legend_description: '',
      itemForm: [
        { name: 'Project', value: 'project_code', require: true },
        { name: 'OWNER PROJECT No.', value: 'owner_project_no', require: true },
        {
          name: 'PROJECT PLANT LOCATION',
          value: 'project_plant_location',
          require: true
        },
        { name: 'UNIT No./ ZONE No.', value: 'unit_no_zone_no' },
        { name: 'SERIAL No.', value: 'serial_no' },
        { name: 'SHEET No.', value: 'sheet_no' },
        { name: 'REV.', value: 'rev' },
        { name: 'DRAWING TITLE', value: 'drawing_title' },
        { name: 'PFD No.', value: 'pfd_no' },
        { name: 'LEGEND', value: 'legend' },
        {
          name: 'LEGEND DESCRIPTION',
          value: 'legend_description',
          textArea: true
        }
        // { name: 'attachment', value: 'attachment', upload: true, accept: '*' },
      ],
      attachment: [],
      attachmentName: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ایجاد PFD`
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
      url: `${StaticData.domainIp}/uploadFile/equipmentid`,
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
    let {
      project_code,
      owner_project_no,
      project_plant_location,
      unit_no_zone_no,
      serial_no,
      sheet_no,
      rev,
      drawing_title,
      pfd_no,
      legend,
      legend_description
    } = this.state
    const check =
      (await handleCheckText(project_code)) &&
      handleCheckText(owner_project_no) &&
      handleCheckText(project_plant_location)
    if (check) {
      await this.setState({ loading: 'submit', disabled: true })
      let datareg = await new FormData()
      datareg.append('project_code', project_code)
      datareg.append('owner_project_no', owner_project_no)
      datareg.append('project_plant_location', project_plant_location)
      datareg.append('unit_no_zone_no', unit_no_zone_no)
      datareg.append('serial_no', serial_no)
      datareg.append('sheet_no', sheet_no)
      datareg.append('rev', rev)
      datareg.append('drawing_title', drawing_title)
      datareg.append('pfd_no', pfd_no)
      datareg.append('legend', legend)
      datareg.append('legend_description', legend_description)
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/pfd/create`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
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
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/technical-document`,
            state: { select: 1 }
          }}
        />
      )
    } else {
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
                <Menu nameRole='pfd_create' nameUrl={this.props.nameUrl} />
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
                              disabled={this.state.disabled}
                            >
                              {this.state.loading === 'submit' ? (
                                <Loading className='form-loader' />
                              ) : (
                                <DoneIcon />
                              )}
                              ثبت اطلاعات
                            </button>
                            <CancelButton
                              redirect='technical-document'
                              status={1}
                            />
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
}
