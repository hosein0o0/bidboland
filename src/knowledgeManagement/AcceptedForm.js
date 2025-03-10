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

export default class AcceptedForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      disabled: false,
      loading: '',
      row: '',
      project_code: '',
      area: '',
      description: '',
      cut_date: '',
      rev: '',
      remarks: '',
      itemForm: [
        // { name: 'ردیف', value: 'id', rtl: true },
        { name: 'نام پروژه', value: 'project_name', rtl: true },
        { name: 'موضوع درس آموخته', value: 'subject_lesson', rtl: true },
        { name: 'ساختار شکست کار', value: 'Work_failure_structure', rtl: true },
        { name: 'فرآیند مربوطه', value: 'relevant_process', rtl: true },
        {
          name: 'تاریخ ارائه',
          value: 'date_submission',
          rtl: true,
          disabled: true
        },
        { name: 'تائید کننده', value: 'verifier', rtl: true },
        {
          name: 'شرح درس آموخته',
          value: 'description',
          rtl: true,
          textArea: true
        }
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
    const { name, value } = e.target
    this.setState({ [name]: value })
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
                      <div className='form row rtl'>
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
