import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import StaticData from '../../../staticData'
import Sidebar from '../../../layout/sidebar'
import Menu from '../../../layout/menu'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import Form from '../../../Form/Form'
import axios from 'axios'
import Notification from '../../../notification/notification'
import Message from '../../../notification/Message'
export default class Edit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      itemForm: [
        {
          name: 'موضوع پیام',
          value: 'subject',
          require: true,
          rtl: true,
          fullSize: true
        },
        { name: 'ارسال به...', value: 'send', require: true, rtl: true },
        { name: 'CC', value: 'cc', require: true, rtl: true },
        {
          name: 'اتصال به WBS',
          value: 'wbs',
          require: true,
          rtl: true,
          select: true,
          listItem: [
            { value: 'wbs', label: 'wbs' },
            { value: 'wbs2', label: 'wbs2' }
          ]
        },
        {
          name: 'تعیین برچسب',
          value: 'tag',
          require: true,
          rtl: true,
          select: true,
          listItem: [
            { value: 'tag', label: 'tag' },
            { value: 'tag2', label: 'tag2' }
          ]
        },
        {
          name: 'Text Editor',
          value: 'textEditor',
          require: true,
          rtl: true,
          textArea: true
        },
        {
          name: 'فایل پیوست',
          rtl: true,
          require: true,
          value: 'attachment',
          upload: true,
          accept: '*'
        },
        {
          name: 'پیشنویس شود',
          name2: 'ارسال شود',
          switch: true,
          rtl: true,
          value: 'switch'
        }
      ],
      attachment: [],
      attachmentName: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ویرایش/ارسال پیشنویس‌ها`
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
      url: `${StaticData.domainIp}/uploadFile/Drafts`,
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
  handleState = (name, value) => {
    this.setState({ [name]: value })
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/Management-Email`
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
                <Menu nameRole='' nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from d-flex'>
                        <h2 className='background d-flex align-items-center'>
                          <InsertDriveFileIcon className='ml-1' />
                          ویرایش/ارسال پیشنویس‌ها
                        </h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row rtl'>
                          <Form {...this} />
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
