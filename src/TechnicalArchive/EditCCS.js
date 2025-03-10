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
import getCustomFormat from '../getCustomFormat'
import CancelButton from '../layout/CancelButton'
import moment from 'moment'
export default class EditCCS extends Component {
  constructor (props) {
    super(props)
    // handleCheckText = HandleCheckText.handleCheckText
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.state = {
      token: Cookies.get('token'),
      itemForm: [
        { name: 'CCSNo', value: 'CCSNo', require: true },
        { name: 'CCSStatus', value: 'CCSStatus', require: true },
        { name: 'CCSType', value: 'CCSType', require: true },
        { name: 'Remark', value: 'Remark' },
        { name: 'RecDate', value: 'RecDate', date: true },
        { name: 'Disipline', value: 'Disipline' },
        { name: 'Subject', value: 'Subject', require: true },
        { name: 'TagNo', value: 'TagNo', require: true },
        { name: 'DocNo', value: 'DocNo', require: true },
        { name: 'StatusTQ', value: 'StatusTQ' },
        { name: 'SentTQDate', value: 'SentTQDate', date: true },
        { name: 'StatusLetter', value: 'StatusLetter' },
        { name: 'SentLetterDate', value: 'SentLetterDate', date: true },
        { name: 'RefTQ', value: 'RefTQ' },
        { name: 'RefLetter', value: 'RefLetter' },
        { name: 'Unit', value: 'Unit', require: true },
        { name: 'Zone', value: 'Zone', require: true },
        { name: 'P&ID', value: 'PID', require: true },
        { name: 'Owner Discipline', value: 'OwnerDiscipline' },
        { name: 'Expr1', value: 'Expr1' },
        { name: 'Delay', value: 'Delay' },
        { name: 'TypeBSendToOwner', value: 'TypeBSendToOwner' },
        { name: 'TypeBReceiveFromOwner', value: 'TypeBReceiveFromOwner' },
        { name: 'Expr2', value: 'Expr2' },
        { name: 'OwnerDelay', value: 'OwnerDelay' },
        { name: 'ConstractionStatus', value: 'ConstractionStatus' },
        { name: 'OwnerApproval', value: 'OwnerApproval' },
        { name: 'ConstractionRemark', value: 'ConstractionRemark' },
        { name: 'ActionBy', value: 'ActionBy', require: true },
        { name: 'Priority', value: 'Priority' },
        { name: 'DoneTypeBDate', value: 'DoneTypeBDate', date: true },
        {
          name: 'file_address',
          value: 'file_address',
          upload: true,
          accept: '*'
        }
      ],
      CCSNo: '',
      CCSStatus: '',
      CCSType: '',
      Remark: '',
      RecDate: undefined,
      Disipline: '',
      Subject: '',
      TagNo: '',
      DocNo: '',
      StatusTQ: '',
      SentTQDate: undefined,
      StatusLetter: '',
      SentLetterDate: undefined,
      RefTQ: '',
      RefLetter: '',
      Unit: '',
      Zone: '',
      PID: '',
      OwnerDiscipline: '',
      Expr1: '',
      Delay: '',
      TypeBSendToOwner: '',
      TypeBReceiveFromOwner: '',
      Expr2: '',
      OwnerDelay: '',
      ConstractionStatus: '',
      OwnerApproval: '',
      ConstractionRemark: '',
      ActionBy: '',
      Priority: '',
      DoneTypeBDate: undefined,
      file_address: [],
      file_addressName: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ویرایش CCS`
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
      let url = `${StaticData.domainIp}/CCS/get/${id}`
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
            let obj = {}
            for (let value in state) {
              const checkDate =
                value === 'RecDate' ||
                value === 'SentTQDate' ||
                value === 'SentLetterDate' ||
                value === 'DoneTypeBDate'
              if (checkDate) {
                if (state[value]) {
                  let convetDate = moment(`${state[value]}`, 'YYYY/M/D')
                  if (convetDate._isValid) {
                    obj[value] = convetDate
                  }
                } else {
                  obj[value] = await undefined
                }
              } else {
                obj[value] = await state[value]
              }
            }
            this.setState(obj)
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
      url: `${StaticData.domainIp}/uploadFile/ccs`,
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
      CCSNo,
      CCSStatus,
      CCSType,
      Remark,
      RecDate,
      Disipline,
      Subject,
      TagNo,
      DocNo,
      StatusTQ,
      SentTQDate,
      StatusLetter,
      SentLetterDate,
      RefTQ,
      RefLetter,
      Unit,
      Zone,
      PID,
      OwnerDiscipline,
      Expr1,
      Delay,
      TypeBSendToOwner,
      TypeBReceiveFromOwner,
      Expr2,
      OwnerDelay,
      ConstractionStatus,
      OwnerApproval,
      ConstractionRemark,
      ActionBy,
      Priority,
      DoneTypeBDate,
      id
    } = this.state
    const check =
      handleCheckText(CCSStatus) &&
      handleCheckText(CCSType) &&
      handleCheckText(Subject) &&
      handleCheckText(DocNo) &&
      handleCheckText(Zone) &&
      handleCheckText(Unit) &&
      handleCheckText(PID) &&
      handleCheckText(ActionBy)
    if (check) {
      await this.setState({ loading: 'submit', disabled: true })
      let datareg = await new FormData()
      await datareg.append('CCSNo', CCSNo)
      await datareg.append('CCSStatus', CCSStatus)
      await datareg.append('CCSType', CCSType)
      await datareg.append('Remark', Remark)
      await datareg.append('RecDate', getCustomFormat(RecDate, true))
      await datareg.append('Disipline', Disipline)
      await datareg.append('Subject', Subject)
      await datareg.append('TagNo', TagNo)
      await datareg.append('DocNo', DocNo)
      await datareg.append('StatusTQ', StatusTQ)
      await datareg.append('SentTQDate', getCustomFormat(SentTQDate, true))
      await datareg.append('StatusLetter', StatusLetter)
      await datareg.append(
        'SentLetterDate',
        getCustomFormat(SentLetterDate, true)
      )
      await datareg.append('RefTQ', RefTQ)
      await datareg.append('RefLetter', RefLetter)
      await datareg.append('Unit', Unit)
      await datareg.append('Zone', Zone)
      await datareg.append('PID', PID)
      await datareg.append('OwnerDiscipline', OwnerDiscipline)
      await datareg.append('Expr1', Expr1)
      await datareg.append('Delay', Delay)
      await datareg.append('TypeBSendToOwner', TypeBSendToOwner)
      await datareg.append('TypeBReceiveFromOwner', TypeBReceiveFromOwner)
      await datareg.append('Expr2', Expr2)
      await datareg.append('OwnerDelay', OwnerDelay)
      await datareg.append('ConstractionStatus', ConstractionStatus)
      await datareg.append('OwnerApproval', OwnerApproval)
      await datareg.append('ConstractionRemark', ConstractionRemark)
      await datareg.append('ActionBy', ActionBy)
      await datareg.append('Priority', Priority)
      await datareg.append(
        'DoneTypeBDate',
        getCustomFormat(DoneTypeBDate, true)
      )
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/CCS/update/${id}`,
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
            pathname: `/ccs`
          }}
        />
      )
    }
    return (
      <div className='main'>
        <div className='row m-0'>
          <Sidebar
            handleState={(name, value) => this.setState({ [name]: value })}
          />
          <div
            className={`${
              this.state._close ? 'mainSideClose' : 'col-xl-10 col-lg-10 p-0'
            } dashboard`}
          >
            <Menu nameRole='comment_sheet_edit' nameUrl={this.props.nameUrl} />
            <div className='w-100 row m-0 main-box-dashboard'>
              <div className='boxes-dashboard row m-0 p-0'>
                <div className='main-form'>
                  <div className='title-from'>
                    <h2>ویرایش CCS</h2>
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
                        <CancelButton redirect='comment_sheet' />
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
