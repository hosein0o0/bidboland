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
import CancelButton from '../layout/CancelButton'
import moment from 'moment'
export default class IsoMetricFormEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      loading: '',
      itemForm: [
        { name: 'Area', value: 'area' },
        { name: 'ISO Revision', value: 'iso_revision' },
        { name: 'Unit', value: 'unit' },
        { name: 'Shop/Field', value: 'shop_field' },
        { name: 'Size', value: 'size' },
        { name: 'Class', value: 'class' },
        { name: 'Joint Type', value: 'joint_type' },
        { name: 'Spool (R)', value: 'spool_r' },
        { name: 'Material (L)', value: 'material_l' },
        { name: 'Line Type', value: 'line_type' },
        { name: 'Thickness (R)', value: 'thickness' },
        { name: 'Joint No.', value: 'joint_no' },
        { name: 'Fit-up Code', value: 'fit_up_code' },
        { name: 'Fit-up Date', value: 'fit_up_date', date: true },
        { name: 'Subcontractor', value: 'subcontractor' },
        { name: 'RT Percent', value: 'rt_percent' },
        { name: 'Line', value: 'line' },
        { name: 'ISO Code', value: 'iso_code', download: true },
        { name: 'Component (Left)', value: 'component_left' },
        { name: 'Component (Right)', value: 'component_right' },
        { name: 'Heat Number Left', value: 'heat_number_left' },
        { name: 'Heat Number Right', value: 'heat_number_right' },
        { name: 'Weld Code', value: 'weld_code' },
        { name: 'Weld Date', value: 'weld_date', date: true },
        { name: 'Welder (Root 1)', value: 'welder_root_1' },
        { name: 'Welder (Root 2)', value: 'welder_root_2' },
        { name: 'Welder (Filling 1)', value: 'welder_filling_1' },
        { name: 'Welder (Filling 2)', value: 'welder_filling_2' },
        { name: 'PWHT Request', value: 'pwht_request' },
        { name: 'NDT (PT) Request', value: 'ndt_pt_request' },
        { name: 'Valve Size', value: 'valve_size' },
        { name: 'Test Package Code', value: 'test_package_code' },
        { name: 'Spool (L)', value: 'spool_l' },
        { name: 'Before Joint', value: 'before_joint' },
        { name: 'After Joint', value: 'after_joint' },
        { name: 'NDT (RT) Report', value: 'ndt_rt_report' },
        { name: 'NDT (RT) Request', value: 'ndt_rt_request' },
        { name: 'Support Qty', value: 'support_qty' },
        { name: 'NDT (RT) Rep. Date', value: 'ndt_rt_rep_date', date: true },
        { name: 'Fitup Result', value: 'fitup_result' },
        { name: 'Subcontractor Level 2', value: 'subcontractor_level_2' },
        { name: 'ISO Sheet', value: 'iso_sheet' },
        { name: 'NDT Number', value: 'ndt_number' },
        { name: 'NDT (RT) Result', value: 'ndt_rt_result' },
        { name: 'ISO Sheets', value: 'iso_sheets' },
        { name: 'State', value: 'state' },
        { name: 'Weld Result', value: 'weld_result' },
        { name: 'NDT (RT) Req. Date', value: 'ndt_rt_req_date', date: true },
        { name: 'PWHT Report', value: 'pwht_report' },
        { name: 'PWHT Rep. Date', value: 'pwht_rep_date', date: true },
        { name: 'Control Valve No.', value: 'control_valve_no' },
        { name: 'PWHT Result', value: 'pwht_result' },
        { name: 'PWHT Required', value: 'pwht_required' },
        { name: 'HT Report', value: 'ht_report' },
        { name: 'Description', value: 'description' },
        { name: 'Repair Stamp', value: 'repair_stamp' },
        { name: 'Work Front Code', value: 'work_front_code' },
        { name: 'OBS [Ann.]', value: 'obs_ann' },
        { name: 'OBS [Civil]', value: 'obs_civil' },
        { name: 'OBS [Engineering]', value: 'obs_engineering' },
        { name: 'OBS [Equipment]', value: 'obs_equipment' },
        { name: 'OBS [ISO Note]', value: 'obs_iso_ote' },
        { name: 'OBS [Job Lock]', value: 'obs_job_lock' },
        { name: 'OBS [Under 2 Inch]', value: 'obs_under_2_inch' },
        { name: 'OBS [Steel Structure]', value: 'obs_steel_structure' },
        {
          name: 'OBS [Pending Of Contractor]',
          value: 'obs_pending_of_contractor'
        },
        { name: 'Obstacle Type', value: 'obstacle_type' },
        { name: 'Paint Code', value: 'paint_code' },
        { name: 'T.P. Process05 (Status)', value: 'tp_process05_status' },
        { name: 'NDT (RT) Defect Segement', value: 'ndt_rt_defect_segement' },
        { name: 'Test Package Date', value: 'test_package_date', date: true },
        { name: 'Test Package Result', value: 'test_ackage_result' },
        { name: 'NDT (PT) Report', value: 'ndt_pt_report' },
        { name: 'After Flange', value: 'after_flange' },
        { name: 'Before Flange', value: 'before_flange' },
        { name: 'NDT (PT) Result', value: 'ndt_pt_result' },
        { name: 'OBS [Pending of Contractor]', value: 'test' },
        {
          name: 'پیوست',
          value: 'attachment',
          upload: true,
          accept: '*',
          single: true,
          rtl: true
        }
      ],
      attachment: [],
      attachmentName: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ویرایش ISOmetric`
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
      let url = `${StaticData.domainIp}/isometrics/get/${id}`
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
            for (let value in state) {
              const checkDate =
                value === 'fit_up_date' ||
                value === 'weld_date' ||
                value === 'ndt_rt_rep_date' ||
                value === 'ndt_rt_req_date' ||
                value === 'pwht_rep_date' ||
                value === 'test_package_date'
              if (checkDate) {
                if (state[value]) {
                  let convetDate = await moment(`${state[value]}`, 'YYYY/M/D')
                  state[value] = convetDate
                } else state[value] = undefined
              } else if (state === 'attachment') {
                if (state['attachment']) {
                  state['attachmentName'] = await [state['attachment']]
                  state['attachment'] = await [state['attachment']]
                } else {
                  state['attachmentName'] = await []
                  state['attachment'] = await []
                }
              }
            }
            await this.setState(state)
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
            [nameState]: [response.data.content],
            [names]: [file.name]
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
  handleSubmit = () => {}
  render () {
    return (
      <div className='main'>
        <div className='col-12 p-0'>
          <div className='row m-0'>
            <Sidebar
              handleState={(name, value) => this.setState({ [name]: value })}
            />
            <div
              className={`${
                this.state._close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'
              } dashboard`}
            >
              <Menu nameRole='isometric_create' nameUrl={this.props.nameUrl} />
              <div className='w-100 row m-0 main-box-dashboard'>
                <div className='boxes-dashboard row m-0 p-0'>
                  <div className='main-form'>
                    <div className='title-from'>
                      <h2>ایجاد سند جدید</h2>
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
                            status={4}
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
