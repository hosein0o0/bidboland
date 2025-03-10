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
export default class BasicEngineeringForm extends Component {
  constructor(props) {
    super(props)
    // handleCheckText = HandleCheckText.handleCheckText
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      project_code: '',
      discipline: '',
      document_type: '',
      document_no: '',
      document_title: '',
      revision: '',
      disabled: false,
      loading: '',
      itemForm: [
        { name: 'Project Code', value: 'project_code', require: true },
        { name: 'discipline', value: 'discipline', require: true },
        { name: 'Document Type', value: 'document_type', require: true },
        { name: 'Document No.', value: 'document_no', require: true },
        { name: 'Document Title', value: 'document_title', require: true },
        { name: 'Transmittal Code', value: 'transmittal_code', require: true },
        { name: 'revision', value: 'revision' },
        {
          name: 'upload file',
          value: 'file_address',
          upload: true,
          accept: '*',
          // rtl: true,
          single: true,
          require: true
        }
      ],
      redirect: false,
      file_address: [],
      file_addressName: []
    }
  }
  componentDidMount() {
    document.title = `${StaticData.Title} - ایجاد مهندسی پایه`
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
    let list = this.state[files] || []
    if (list) {
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
    const {
      project_code,
      discipline,
      document_type,
      document_no,
      document_title,
      revision,
      file_address,
      transmittal_code
    } = this.state
    const check =
      handleCheckText(project_code) &&
      handleCheckText(discipline) &&
      handleCheckText(document_type) &&
      handleCheckText(document_no) &&
      handleCheckText(document_title) &&
      file_address.length > 0 &&
      handleCheckText(transmittal_code)
    if (check) {
      await this.setState({ loading: 'submit', disabled: true })
      let datareg = await new FormData()
      await datareg.append('project_code', project_code)
      await datareg.append('discipline', discipline)
      await datareg.append('document_type', document_type)
      await datareg.append('document_no', document_no)
      await datareg.append('document_title', document_title)
      await datareg.append('revision', revision)
      await datareg.append('transmittal_code', transmittal_code)
      await datareg.append('file_address', file_address[0])
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/basicEng/create`,
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
  render() {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/engineering-document`,
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
                className={`${this.state._close
                    ? 'mainSideClose'
                    : 'col-xl-10 col-lg-10 p-0'
                  } dashboard`}
              >
                <Menu
                  nameRole='basic_engineering_create'
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
                              redirect='engineering-document'
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
