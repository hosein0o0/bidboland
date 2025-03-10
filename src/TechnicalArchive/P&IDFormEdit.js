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
import { Redirect } from 'react-router-dom'
import CancelButton from '../layout/CancelButton'
export default class PAndIDFormEdit extends Component {
  constructor (props) {
    super(props)
    // handleCheckText = HandleCheckText.handleCheckText
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      loading: '',
      project_code: '',
      drawing_title: '',
      p_and_id: '',
      legend: '',
      legend_description: '',
      project_plant_location: '',
      unit_no: '',
      serial_no: '',
      sheet_no: '',
      rev: '',
      owner_project_no: '',
      itemForm: [
        { name: 'Project Code', value: 'project_code', require: true },
        { name: 'DRAWING TITLE', value: 'drawing_title', require: true },
        { name: 'P&ID No.', value: 'p_and_id', require: true },
        { name: 'LEGEND', value: 'legend', require: true },
        {
          name: 'LEGEND DESCRIPTION',
          value: 'legend_description',
          require: true
        },
        { name: 'PROJECT PLANT LOCATION', value: 'project_plant_location' },
        { name: 'UNIT No./ ZONE NO', value: 'unit_no', require: true },
        { name: 'SERIAL No.', value: 'serial_no', require: true },
        { name: 'SHEET No.', value: 'sheet_no' },
        { name: 'REV.', value: 'rev' },
        { name: 'OWNER PROJECT No.', value: 'owner_project_no' }
      ]
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ویرایش P&ID`
    this.GetId()
  }
  GetId = async () => {
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    await this.setState({ id: id })
    await this.fetchData(id)
  }
  fetchData = async id => {
    if (this.state.token) {
      let url = `${StaticData.domainIp}/PAndId/get/${id}`
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            let state = response.data.content
            this.setState(state)
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
  handleSubmit = async () => {
    let {
      project_code,
      drawing_title,
      p_and_id,
      legend,
      legend_description,
      project_plant_location,
      unit_no,
      serial_no,
      sheet_no,
      rev,
      owner_project_no,
      id
    } = this.state
    const check =
      (await handleCheckText(project_code)) &&
      handleCheckText(drawing_title) &&
      handleCheckText(p_and_id) &&
      handleCheckText(legend) &&
      handleCheckText(legend_description) &&
      handleCheckText(unit_no) &&
      handleCheckText(serial_no)
    if (check) {
      await this.setState({ loading: 'submit', disabled: true })
      let datareg = await new FormData()
      await datareg.append('project_code', project_code)
      await datareg.append('drawing_title', drawing_title)
      await datareg.append('p_and_id', p_and_id)
      await datareg.append('legend', legend)
      await datareg.append('legend_description', legend_description)
      await datareg.append('project_plant_location', project_plant_location)
      await datareg.append('unit_no', unit_no)
      await datareg.append('serial_no', serial_no)
      await datareg.append('sheet_no', sheet_no)
      await datareg.append('rev', rev)
      await datareg.append('owner_project_no', owner_project_no)
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/PAndId/update/${id}`,
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
            state: { select: 2 }
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
                <Menu nameRole='p&id_edit' nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>ویرایش P&ID</h2>
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
                              status={2}
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
