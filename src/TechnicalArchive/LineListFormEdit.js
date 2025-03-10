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
export default class LineListFormEdit extends Component {
  constructor (props) {
    super(props)
    // handleCheckText = HandleCheckText.handleCheckText
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      loading: '',
      itemForm: [
        { name: 'Project Code', value: 'project_code', require: true },
        { name: 'Unit', value: 'unit', require: true },
        { name: 'Rev.', value: 'rev', require: true },
        { name: 'F', value: 'F' },
        { name: 'Fluid', value: 'fluid' },
        { name: 'SerialNo.(idn)', value: 'serial_no' },
        { name: 'PipingClass(idn)', value: 'piping_class' },
        { name: 'Size(Inch)(idn)', value: 'size' },
        {
          name: 'Insulation/TracingType(idn)',
          value: 'insulation_tracing_type'
        },
        { name: 'Insulation Thk.(mm)(idn)', value: 'insulation_thk' },
        { name: 'Tracing(Maintain Temp. °C)', value: 'tracing' },
        { name: 'Painting System', value: 'painting_system' },
        { name: 'PWHT NOTE 6', value: 'pwht_note6' },
        { name: 'NDT Class', value: 'ndt_class' },
        { name: 'Stress Analysis(A/B/C)', value: 'stress_analysis' },
        { name: 'Cleaning Method', value: 'cleaning_method' },
        { name: 'Phase', value: 'phase' },
        { name: 'Density(Kg/m3)', value: 'density' },
        { name: 'Viscosity(cp)', value: 'viscosity' },
        { name: 'Velocity(m/s)', value: 'velocity' },
        { name: 'PipingRouting', value: 'piping_routing' },
        { name: 'X', value: 'X' },
        { name: 'P&IDNo.', value: 'p_and_id_no', require: true },
        {
          name: 'Max./Min.OperatingConditions',
          value: 'max_min_operating_conditions'
        },
        { name: 'AA', value: 'AA' },
        { name: 'DesignConditions', value: 'design_conditions' },
        { name: 'AC', value: 'AC', require: true },
        { name: 'Field PressureTest', value: 'field_pressure_test' },
        { name: 'AE', value: 'AE' },
        { name: 'ZoneNo.', value: 'zone_no' },
        { name: 'SeverCyclicCondition(Y/N)', value: 'sever_cyclic_condition' },
        { name: 'Remarks', value: 'remarks' },
        { name: 'AI', value: 'AI' }
      ],
      project_code: '',
      unit: '',
      rev: '',
      F: '',
      fluid: '',
      serial_no: '',
      piping_class: '',
      size: '',
      insulation_tracing_type: '',
      insulation_thk: '',
      tracing: '',
      painting_system: '',
      pwht_note6: '',
      ndt_class: '',
      stress_analysis: '',
      cleaning_method: '',
      phase: '',
      density: '',
      viscosity: '',
      velocity: '',
      piping_routing: '',
      X: '',
      p_and_id_no: '',
      max_min_operating_conditions: '',
      AA: '',
      design_conditions: '',
      AC: '',
      field_pressure_test: '',
      AE: '',
      zone_no: '',
      sever_cyclic_condition: '',
      remarks: '',
      AI: '',
      attachment: [],
      attachmentName: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ویرایش Linelist`
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
      let url = `${StaticData.domainIp}/lineList/get/${id}`
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
      unit,
      rev,
      F,
      fluid,
      serial_no,
      piping_class,
      size,
      insulation_tracing_type,
      insulation_thk,
      tracing,
      painting_system,
      pwht_note6,
      ndt_class,
      stress_analysis,
      cleaning_method,
      phase,
      density,
      viscosity,
      velocity,
      piping_routing,
      X,
      p_and_id_no,
      max_min_operating_conditions,
      AA,
      design_conditions,
      AC,
      field_pressure_test,
      AE,
      zone_no,
      sever_cyclic_condition,
      remarks,
      AI,
      id,
      token
    } = await this.state
    const check =
      (await handleCheckText(project_code)) &&
      handleCheckText(unit) &&
      handleCheckText(rev) &&
      handleCheckText(serial_no) &&
      handleCheckText(p_and_id_no) &&
      handleCheckText(AC)
    if (check && id) {
      await this.setState({ loading: 'submit', disabled: true })
      let datareg = await new FormData()
      await datareg.append('project_code', project_code)
      await datareg.append('unit', unit)
      await datareg.append('rev', rev)
      await datareg.append('F', F)
      await datareg.append('fluid', fluid)
      await datareg.append('serial_no', serial_no)
      await datareg.append('piping_class', piping_class)
      await datareg.append('size', size)
      await datareg.append('insulation_tracing_type', insulation_tracing_type)
      await datareg.append('insulation_thk', insulation_thk)
      await datareg.append('tracing', tracing)
      await datareg.append('painting_system', painting_system)
      await datareg.append('pwht_note6', pwht_note6)
      await datareg.append('ndt_class', ndt_class)
      await datareg.append('stress_analysis', stress_analysis)
      await datareg.append('cleaning_method', cleaning_method)
      await datareg.append('phase', phase)
      await datareg.append('density', density)
      await datareg.append('viscosity', viscosity)
      await datareg.append('velocity', velocity)
      await datareg.append('piping_routing', piping_routing)
      await datareg.append('X', X)
      await datareg.append('p_and_id_no', p_and_id_no)
      await datareg.append(
        'max_min_operating_conditions',
        max_min_operating_conditions
      )
      await datareg.append('AA', AA)
      await datareg.append('design_conditions', design_conditions)
      await datareg.append('AC', AC)
      await datareg.append('field_pressure_test', field_pressure_test)
      await datareg.append('AE', AE)
      await datareg.append('zone_no', zone_no)
      await datareg.append('sever_cyclic_condition', sever_cyclic_condition)
      await datareg.append('remarks', remarks)
      await datareg.append('AI', AI)
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/lineList/update/${id}`,
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
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/technical-document`,
            state: { select: 3 }
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
                <Menu nameRole='line_list_edit' nameUrl={this.props.nameUrl} />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>ویرایش Linelist</h2>
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
                              status={3}
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
