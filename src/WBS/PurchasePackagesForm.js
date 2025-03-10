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
import handleCheckText from '../handleCheckText'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import handleString from '../handleString'
import axios from 'axios'
import StaticData from '../staticData'
import { Redirect } from 'react-router-dom'
import getCustomFormat from '../getCustomFormat'

export default class PurchasePackagesForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      disabled: false,
      loading: '',
      po_no: '',
      po_description: '',
      mr_no: '',
      mr_description: '',
      tag_no: '',
      tag_description: '',
      remarks: '',
      itemForm: [
        { name: 'Project Code', value: 'project_code', require: true },
        { name: 'Scope', value: 'scope', require: true },
        { name: 'Doc Code1', value: 'doc_code1', require: true },
        { name: 'Doc Code2', value: 'doc_code2', require: false },
        { name: 'Doc Description', value: 'doc_description', require: true },
        { name: 'Doc Type', value: 'doc_type', require: true },
        { name: 'Discipline', value: 'discipline', require: true },
        { name: 'Zone', value: 'zone', require: true },
        { name: 'Unit', value: 'unit', require: true },
        { name: 'WF', value: 'wf', require: true },
        { name: 'Class', value: 'class', require: true },
        { name: 'Last Plan Poi', value: 'last_plan_poi', require: true },
        {
          name: 'First Step Plan Date', value: 'first_step_plan_date', require: true, date: true,
          objectSetState: true,
          isGregorian: true
        },
        { name: 'Remark', value: 'remark' },
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
    this.setState({ [e.target.name]: handleString(e.target.value) })
  }
  handleSubmit = async () => {
    const _class = this.state.class
    const { project_code, scope, doc_code1, doc_code2, doc_description, doc_type, discipline, zone, unit, wf, last_plan_poi, first_step_plan_date, remark, token } = this.state
    const check = handleCheckText(project_code) && handleCheckText(scope) && handleCheckText(doc_code1) && handleCheckText(doc_description) && handleCheckText(doc_type) && handleCheckText(doc_type) && handleCheckText(discipline) && handleCheckText(zone) && handleCheckText(unit) && handleCheckText(wf) && handleCheckText(last_plan_poi) && handleCheckText(_class) && first_step_plan_date
    if (check) {
      await this.setState({ loading: 'submit', disabled: true })
      const datareg = new FormData()
      await datareg.append('project_code', handleString(project_code))
      await datareg.append('scope', handleString(scope))
      await datareg.append('doc_code1', handleString(doc_code1))
      await datareg.append('doc_code2', handleString(doc_code2))
      await datareg.append('doc_description', handleString(doc_description))
      await datareg.append('doc_type', handleString(doc_type))
      await datareg.append('discipline', handleString(discipline))
      await datareg.append('zone', handleString(zone))
      await datareg.append('unit', handleString(unit))
      await datareg.append('wf', handleString(wf))
      await datareg.append('class', handleString(_class))
      await datareg.append('last_plan_poi', handleString(last_plan_poi))
      await datareg.append('first_step_plan_date', getCustomFormat(first_step_plan_date, true))
      await datareg.append('remark', handleString(remark))
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/EngineeringDocumentList/create`,
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
  handleState = (obj) => {
    this.setState(obj)
  }
  render() {
    const { redirect, _close, disabled, loading } = this.state
    if (redirect) {
      return <Redirect
        to={{
          pathname: `/wbs`,
          state: { select: 2 }
        }}
      />
    } else return (
      <div className='main'>
        <div className='col-12 p-0'>
          <div className='row m-0'>
            <Sidebar
              handleState={(name, value) => this.setState({ [name]: value })}
            />
            <div
              className={`${_close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'
                } dashboard`}
            >
              <Menu nameRole='' nameUrl={this.props.nameUrl} />
              <div className='w-100 row m-0 main-box-dashboard'>
                <div className='boxes-dashboard row m-0 p-0'>
                  <div className='main-form'>
                    <div className='title-from'>
                      <h2>ایجاد مدرک جدید</h2>
                    </div>
                    <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                      <div className='form row ltr'>
                        <Form {...this} />
                        <div className='submit-form rtl col-12 mt-5'>
                          <button
                            onClick={this.handleSubmit}
                            disabled={disabled}
                          >
                            {loading === 'submit' ? (
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
