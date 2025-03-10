import React, { Component } from 'react'
import Form from '../../Form/Form'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import API from './API'
import RejectReasonsItems from './RejectReasonsItems'
import handleString from '../../handleString'
import ResponsibleExpert from './ResponsibleExpert'
import ManageTab from './ManageTab'
import ButtonSubmit from './ButtonSubmit'
import ButtonEdit from './ButtonEdit'
import CCDisabled from '../CCDisabled'
import Sign from '../sign/Sign'
export default class TSR2 extends Component {
  constructor(props) {
    super(props)
    this.API = new API(this)
    this.state = {
      token: Cookies.get('token'),
      issued_status: true,
      reject_reasons: [],
      responsible: [{ user_unit: '', value: '', user_role: '' }],
      right: 0,
      width: 100,
      tab: 1
    }
  }
  async componentDidMount() {
    await this.FetchCreate()
    let { tab } = this.state
    await this.props.handleState({ tab_2: tab })
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.FetchCreate()
    }
  }
  FetchCreate = () => {
    const { FetchCreateAPI } = this.API
    FetchCreateAPI()
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
  handleListForm = () => {
    const { DescriptionName } = this.API
    let { issued_status, tab, experts, responsible } = this.state
    let experts_list = experts || []
    let responsible_list = responsible || []
    return [
      {
        name: '',
        value: 'issued_status',
        radio: true,
        label: 'بررسی شرایط صدور TSR',
        items: [
          {
            value: true,
            label:
              'درخواست ارائه شده با روش اجرائی درخواست های خدمات فنی تطابق دارد.'
          },
          {
            value: false,
            label:
              'به دلیل عدم تطابق با روش اجرائی درخواست های فنی عودت داده می‌شود.'
          }
        ],
        rtl: true,
        require: true,
        disabled: this.handleDisabledElm(),
        fullView: true,
        onchange: (e, item) => this.handleIssue(e, item)
      },
      {
        class: true,
        html: () => (
          <RejectReasonsItems {...this} disabled={this.handleDisabledElm()} />
        ),
        access: !issued_status
      },
      {
        value: DescriptionName(),
        name: 'توضیحات',
        rtl: true,
        require: false,
        textArea: true,
        disabled: this.handleDisabled(),
        access: true
      },
      {
        rtl: true,
        label:
          issued_status && responsible_list.length > 0 ? 'مسئول TSR' : null,
        access: issued_status,
        class: true,
        html: () => (
          <ResponsibleExpert
            disabled={this.handleDisabledElm()}
            {...this}
            name='responsible'
            checkShowBoxText={tab === 1}
          />
        )
      },
      {
        rtl: true,
        label:
          issued_status && experts_list.length > 0 ? 'گروه کارشناسی' : null,
        access: issued_status,
        class: true,
        html: () => (
          <ResponsibleExpert
            disabled={true}
            {...this}
            name='experts'
            checkShowBoxText={tab === 1}
          />
        )
      }
    ]
  }
  handleIssue = (e, item) => {
    let { value } = item
    let { name } = e.target
    const { ResetIssue } = this.API
    this.setState({ [name]: value })
    if (value) {
      ResetIssue()
    }
  }
  handleState = obj => {
    this.setState(obj)
  }
  handleDisabledElm = () => {
    let { tab, canchangeDescription } = this.state
    const state1 = tab > 1
    const state2 = this.handleDisabled()
    const state3 = canchangeDescription ? true : false
    const result = state1 || state2 || state3
    return result
  }
  handleDisabled = () => {
    const { handleDisabledAPI } = this.API
    const result = handleDisabledAPI()
    return result
  }
  render() {
    const { handlCreate, handleCheckUpdate, ShowSign, Split } = this.API
    const canCreate = handlCreate(2)
    const canUpdate = handleCheckUpdate(2)
    const sign_1 = ShowSign() ? true : false
    const sign_2 = handleCheckUpdate(2) ? false : true
    const sign_3 = canCreate ? false : true
    const canSign = sign_1 && sign_2 && sign_3
    const status = Split()
    const { tab, redirect } = this.state
    if (redirect) {
      return <Redirect to='new-index-TSR' />
    } else
      return (
        <div className='form row justify-content-start'>
          <div className='w-100 row justify-content-start m-0'>
            <ManageTab {...this} />
            <Form {...this} itemForm={this.handleListForm()} />
            {canCreate && <ButtonSubmit {...this} />}
            {canUpdate && <ButtonEdit {...this} />}
            {canSign && <Sign {...this} multiTab={tab} status={status} />}
            <CCDisabled {...this} />
          </div>
        </div>
      )
  }
}
