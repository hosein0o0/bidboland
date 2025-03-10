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
import handleCheckText from '../handleCheckText'
import getCustomFormat from '../getCustomFormat'
import { Redirect } from 'react-router-dom'
import CancelButton from '../layout/CancelButton'
export default class ModelForm3D extends Component {
  constructor (props) {
    super(props)
    // handleCheckText = HandleCheckText.handleCheckText
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      disabled: false,
      loading: '',
      row: '',
      project_code: '',
      area: '',
      description: '',
      cut_of_date: undefined,
      rev: '',
      remarks: '',
      attachment: [],
      attachmentName: [],
      itemForm: [
        { name: 'Project Code', value: 'project_code', require: true },
        { name: 'Area', value: 'area', require: true },
        { name: 'Cut of Date', value: 'cut_of_date', date: true },
        { name: 'Rev', value: 'rev', require: true },
        { name: 'Remarks', value: 'remarks' },
        { name: 'Description', value: 'description', textArea: true },
        {
          name: 'پیوست',
          value: 'attachment',
          upload: true,
          accept: '*',
          single: true,
          rtl: true
        }
      ]
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - فرم ایجاد نقشه های سه بعدی`
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
      url: `${StaticData.domainIp}/uploadFile/3DModel`,
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
    await fileList.splice(num, 1)
    await nameList.splice(num, 1)
    await this.setState({ [files]: fileList, [names]: nameList })
  }
  handleSubmit = async () => {
    let {
      project_code,
      area,
      cut_of_date,
      rev,
      remarks,
      description,
      attachment
    } = await this.state
    const check =
      (await handleCheckText(project_code)) &&
      handleCheckText(area) &&
      handleCheckText(rev)
    if (check) {
      await this.setState({ loading: 'submit', disabled: true })
      let datareg = await new FormData()
      datareg.append('project_code', project_code)
      datareg.append('area', area)
      datareg.append(
        'cut_of_date',
        cut_of_date ? getCustomFormat(cut_of_date, true) : null
      )
      datareg.append('rev', rev)
      datareg.append('remarks', remarks)
      datareg.append('description', description)
      datareg.append('attachment', attachment.length === 0 ? '' : attachment[0])
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/ThreedModel/create`,
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
            state: { select: 6 }
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
                  this.state._close
                    ? 'mainSideClose'
                    : 'col-xl-10 col-lg-10 p-0'
                } dashboard`}
              >
                <Menu nameRole='3d_model_create' nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>فرم ایجاد نقشه های سه بعدی</h2>
                      </div>
                      <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                        <div className='form row ltr'>
                          <Form
                            {...this}
                            handleState={(name, value) =>
                              this.setState({ [name]: value })
                            }
                          />
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
                              status={6}
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
