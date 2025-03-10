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
export default class InstrumentForm extends Component {
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
        { name: 'Project Code', value: 'project_code', require: true },
        { name: 'Loop ID', value: 'loop_id', require: true },
        { name: 'Tag No', value: 'tag_no', require: true },
        { name: 'Description', value: 'description', require: true },
        { name: 'P&ID No', value: 'p_and_id_no', require: true },
        { name: 'service', value: 'service' },
        { name: 'Fluid name', value: 'fluid_name' },
        { name: 'Fluid phase', value: 'fluid_phase' },
        { name: 'Size Type', value: 'size_type' },
        { name: 'Line No. or Equipment No.', value: 'line_no_or_equipment_no' },
        { name: 'I/O Type', value: 'io_type' },
        { name: 'Signal conn.', value: 'signal_conn' },
        { name: 'Location', value: 'location' },
        { name: 'Instrument Unit Range', value: 'instrument_unit_range' },
        { name: 'Setpoint', value: 'setpoint' },
        { name: 'Setpoint Unit', value: 'setpoint_unit' },
        { name: 'Tracing', value: 'tracing' },
        { name: 'Air manifold No.', value: 'air_manifold_no' },
        { name: 'Junction Box No.', value: 'junction_box_no' },
        { name: 'Hookup sheet No.', value: 'hookup_sheet_no' },
        { name: 'Key plan sheet no.', value: 'key_plan_sheet_no' },
        { name: 'Data Sheet No.', value: 'data_sheet_no' },
        { name: 'MFR/OWNER', value: 'mfr_owner' },
        { name: 'Remarks', value: 'remarks' },
        { name: 'Rev', value: 'rev' },
        { name: 'attachment', value: 'attachment', upload: true, accept: '*' },
        { name: 'native', value: 'native', upload: true, accept: '*' }
      ],
      // project_code: '',
      loop_id: '',
      tag_no: '',
      description: '',
      p_and_id_no: '',
      service: '',
      fluid_name: '',
      fluid_phase: '',
      size_type: '',
      line_no_or_equipment_no: '',
      io_type: '',
      signal_conn: '',
      location: '',
      instrument_unit_range: '',
      setpoint: '',
      setpoint_unit: '',
      tracing: '',
      air_manifold_no: '',
      junction_box_no: '',
      hookup_sheet_no: '',
      key_plan_sheet_no: '',
      data_sheet_no: '',
      mfr_owner: '',
      remarks: '',
      attachment: [],
      attachmentName: [],
      native: [],
      nativeName: []
      // rev: '',
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ایجاد instrument`
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
      loop_id,
      tag_no,
      description,
      p_and_id_no,
      service,
      fluid_name,
      fluid_phase,
      size_type,
      line_no_or_equipment_no,
      io_type,
      signal_conn,
      location,
      instrument_unit_range,
      setpoint,
      setpoint_unit,
      tracing,
      air_manifold_no,
      junction_box_no,
      hookup_sheet_no,
      key_plan_sheet_no,
      data_sheet_no,
      mfr_owner,
      remarks,
      rev
    } = await this.state
    const check =
      (await handleCheckText(project_code)) &&
      handleCheckText(loop_id) &&
      handleCheckText(tag_no) &&
      handleCheckText(description) &&
      handleCheckText(p_and_id_no)
    if (check) {
      await this.setState({ loading: 'submit', disabled: true })
      let datareg = await new FormData()
      await datareg.append('project_code', project_code)
      await datareg.append('loop_id', loop_id)
      await datareg.append('tag_no', tag_no)
      await datareg.append('description', description)
      await datareg.append('p_and_id_no', p_and_id_no)
      await datareg.append('service', service)
      await datareg.append('fluid_name', fluid_name)
      await datareg.append('fluid_phase', fluid_phase)
      await datareg.append('size_type', size_type)
      await datareg.append('line_no_or_equipment_no', line_no_or_equipment_no)
      await datareg.append('io_type', io_type)
      await datareg.append('signal_conn', signal_conn)
      await datareg.append('location', location)
      await datareg.append('instrument_unit_range', instrument_unit_range)
      await datareg.append('setpoint', setpoint)
      await datareg.append('setpoint_unit', setpoint_unit)
      await datareg.append('tracing', tracing)
      await datareg.append('air_manifold_no', air_manifold_no)
      await datareg.append('junction_box_no', junction_box_no)
      await datareg.append('hookup_sheet_no', hookup_sheet_no)
      await datareg.append('key_plan_sheet_no', key_plan_sheet_no)
      await datareg.append('data_sheet_no', data_sheet_no)
      await datareg.append('mfr_owner', mfr_owner)
      await datareg.append('remarks', remarks)
      await datareg.append('rev', rev)
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/instrumentList/create`,
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
            state: { select: 5 }
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
                <Menu
                  nameRole='instrument_list_create'
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
                              redirect='technical-document'
                              status={5}
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
