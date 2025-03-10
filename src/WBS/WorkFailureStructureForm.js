import React, { Component } from 'react'
import Cookies from 'js-cookie'
// import axios from 'axios'
// import StaticData from '../staticData'
// import Notification from '../notification/notification'
// import Message from '../notification/Message'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import Loading from '../layout/loading'
import DoneIcon from '@material-ui/icons/Done'
import Form from '../Form/Form'

export default class WorkFailureStructureForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      disabled: false,
      loading: '',
      id: '',
      dara_code: '',
      project_name: '',
      project_code: '',
      phase: '',
      disc: '',
      zone: '',
      unit: '',
      equipment_no: '',
      description: '',
      system_name: '',
      sub_system_name: '',
      task_type_name: '',
      itemForm: [
        { name: 'Row', value: 'id' },
        { name: 'Dara Code', value: 'dara_code' },
        { name: 'Project Name', value: 'project_name' },
        { name: 'Project Code', value: 'project_code' },
        { name: 'Phase', value: 'phase' },
        { name: 'Discipline', value: 'disc' },
        { name: 'Zone', value: 'zone' },
        { name: 'Unit', value: 'unit' },
        { name: 'Equipment No', value: 'equipment_no' },
        { name: 'Description', value: 'description' },
        { name: 'SYSTEM Name', value: 'system_name' },
        { name: 'Sub SYSTEM Name', value: 'sub_system_name' },
        { name: 'Task Type Name', value: 'task_type_name' }
      ]
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
              <Menu nameRole='' nameUrl={this.props.nameUrl} />
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
