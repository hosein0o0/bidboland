import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
// import Sidebar from '../layout/sidebar'
// import Menu from '../layout/menu'
import StaticData from '../staticData'
// import DatePicker from 'react-datepicker2';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import AddIcon from '@material-ui/icons/Add'
// import EngineeringItems from './EngineeringItems'
import DocumentList from './DocumentList'
import DistributionDocuments from './DistributionDocuments'
import ListSign from './ListSign'
import SignTSR from './SignTSR'
import Permision from '../permision/permision'
import CancelButton from '../layout/CancelButton'
import Dispatch from './Dispatch'
import TOCC from './TOCC'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
export default class MapDelivery extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.state = {
      token: Cookies.get('token'),
      tsr_no: '',
      created_at: '',
      subject: '',
      disabled: false,
      documentNumber: '',
      documents_distribution: [{ officeName: '', number: '' }],
      document_type: '',
      edited_document_attachment: [
        {
          documentNumber: '',
          title: '',
          editNumber: '',
          attachment: [],
          attachmentName: []
        }
      ],
      new_document_attachment: [
        {
          documentNumber: '',
          title: '',
          editNumber: '',
          attachment: [],
          attachmentName: []
        }
      ],
      listSign: [],
      user_list: [],
      notification_to: [],
      notification_cc: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - تحویل نقشه‌های As Built`
    this.ShowFetch()
    this.props.GetShowFetch(11, this.ShowFetch)
  }
  async componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = await nextProps
      // await this.ShowFetch()
    }
  }
  ShowFetch = async () => {
    let tsr11 = await this.props.state.tsr11,
      obj = {}
    if (tsr11) {
      for (let value in tsr11) {
        let state
        if (value.includes('tsr11_')) {
          state = value.split('tsr11_')[1]
        } else {
          state = value
        }
        if (
          state === 'new_document_attachment' ||
          state === 'edited_document_attachment' ||
          state === 'documents_distribution'
        ) {
          if (this.props.show || this.props.canUpdate) {
            let objDetail = tsr11[value]
            if (objDetail) {
              obj[state] = Object.keys(objDetail).map(doc => {
                return objDetail[doc]
              })
            }
          }
        } else {
          obj[state] = tsr11[value]
        }
      }
      let ListMandatory = await ListSign.ListMandatory.tsr11
      let listSign = await this.state.listSign
      ListMandatory.forEach(li => {
        listSign = [...listSign, li]
      })
      listSign = await [...new Set(listSign)]
      obj['listSign'] = await listSign
      obj['role'] = await this.props.state.role
      obj['canCreate'] = await this.Permision.handlePermision(
        this.props.state.role,
        'tsr_create'
      )
      await this.setState(obj)
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
  handleChangeList = (parent, name, value, key) => {
    let list = this.state[parent]
    let obj = list[key]
    obj[name] = value
    this.setState({ [parent]: list })
  }
  handleAdd = (nameState, json) => {
    this.setState({ [nameState]: [...this.state[nameState], json] })
  }
  handleDelete = (nameState, key) => {
    let data = this.state[nameState]
    data.splice(key, 1)
    this.setState({ [nameState]: data })
  }
  handleCheck = array => {
    let check = false
    let i = 0
    while (i < array.length) {
      let obj = array[i]
      check =
        obj.attachment.length > 0 &&
        handleCheckText(obj.documentNumber) &&
        handleCheckText(obj.title) &&
        handleCheckText(obj.editNumber)
      if (!check) {
        break
      }
      i++
    }
    return check
  }
  handleSubmit = async () => {
    let {
      new_document_attachment,
      edited_document_attachment,
      documents_distribution,
      notification_to,
      notification_cc,
      listSign,
      document_type
    } = await this.state
    const CheckUpload = this.handleCheck(new_document_attachment)
    const CheckTo = notification_to
      ? notification_to.length === listSign.length && notification_to.length > 0
      : false
    const _check = CheckTo && CheckUpload
    if (_check) {
      let To = Object.keys(notification_to).map(toData => {
        return notification_to[toData].value
      })
      notification_cc = notification_cc ? notification_cc : []
      let CC = Object.keys(notification_cc).map(toData => {
        return notification_cc[toData].value
      })
      new_document_attachment = await Object.assign(
        {},
        Object.keys(new_document_attachment).map(_item => {
          new_document_attachment[_item].attachment = Object.assign(
            {},
            new_document_attachment[_item].attachment
          )
          return new_document_attachment[_item]
        })
      )
      edited_document_attachment = await Object.assign(
        {},
        Object.keys(edited_document_attachment).map(_item => {
          edited_document_attachment[_item].attachment = Object.assign(
            {},
            edited_document_attachment[_item].attachment
          )
          return edited_document_attachment[_item]
        })
      )
      documents_distribution = await Object.assign({}, documents_distribution)
      this.setState({ disabled: true, loading: 'submit' })
      let datareg = await new FormData()
      await datareg.append('tsr_id', this.props.state.id)
      await datareg.append(
        'new_document_attachment',
        JSON.stringify(new_document_attachment)
      )
      await datareg.append(
        'edited_document_attachment',
        JSON.stringify(edited_document_attachment)
      )
      await datareg.append(
        'documents_distribution',
        JSON.stringify(documents_distribution)
      )
      await datareg.append('document_type', document_type)
      await datareg.append('notification_to', To.join(','))
      await datareg.append('notification_cc', CC.join(','))
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/tsr/tsr11/insert`,
        data: datareg,
        headers: {
          Authorization: this.state.token ? `Bearer ${this.state.token}` : null
        }
      })
        .then(async response => {
          this.setState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              await this.setState({ redirect: true, disabled: false })
            }, 5000)
          } else {
            this.setState({ disabled: false })
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
  handleState = (name, value) => {
    this.setState({ [name]: value })
  }
  handleDisabled = () => {
    if (this.props.close) {
      return true
    } else if (this.props.show) {
      return true
    } else if (this.state.canCreate) {
      return false
    } else if (this.props.canUpdate) {
      return false
    } else {
      return true
    }
  }
  handleUploadList = async (e, files, names, parentState) => {
    if (this.state.canCreate && !this.props.show) {
      await e.preventDefault()
      await this.setState({ loading: files })
      names = await names.split('_')[0]
      let key = await parseInt(files.split('_')[1])
      files = await files.split('_')[0]
      if (e.target.files.length === 1) {
        for (let i = 0; i < e.target.files.length; i++) {
          let reader = await new FileReader()
          await reader.readAsDataURL(e.target.files[i])
          await this.GetLink(
            files,
            e.target.files[i],
            names,
            e.target.files.length,
            key,
            i,
            parentState
          )
        }
      }
    }
  }
  GetLink = (nameState, file, names, length, key, i, parentState) => {
    if (this.state.canCreate && !this.props.show) {
      let datareg = new FormData()
      let array = this.state[parentState][key][nameState],
        arrayName = this.state[parentState][key][names]
      datareg.append('file', file)
      axios({
        method: 'post',
        url: `${StaticData.domainIp}/uploadFile/TSR`,
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
            await array.push(response.data.content)
            await arrayName.push(file.name)
            let _Parent = await this.state[parentState]
            await this.setState({ [parentState]: _Parent })
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
  deleteFileList = async (key, num, files, names, parent) => {
    if (this.state.canCreate && !this.props.show) {
      let _Parent = await this.state[parent]
      let obj = await _Parent[key]
      let data1 = await obj[files]
      let data2 = await obj[names]
      await data1.splice(num, 1)
      await data2.splice(num, 1)
      await this.setState({ [parent]: _Parent })
    }
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/index-TSR`,
            state: { select: 2 }
          }}
        />
      )
    } else
      return (
        <div className='form row justify-content-start'>
          <div className='col-12'>
            <div className='box-note'>
              <p className='m-0'>این صفحه توسط مسئول TSR تکمیل می‌گردد.</p>
            </div>
          </div>
          <div className='w-100 row justify-content-start m-0'>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  handleCheckText(this.state.tsr_no) ? 'active' : ''
                }`}
              >
                <label>
                  شماره TSR
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  type='text'
                  name='number'
                  value={handleString(this.state.tsr_no)}
                  readOnly={true}
                  disabled={true}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  handleCheckText(this.state.created_at) ? 'active' : ''
                }`}
              >
                <div className='icon-field'>
                  <DateRangeRoundedIcon />
                </div>
                <div className='col p-0'>
                  <label>
                    تاریخ
                    <span className='star IranSans_Bold'>*</span>
                  </label>
                  <input
                    type='text'
                    name='number'
                    value={handleString(this.state.created_at)}
                    readOnly={true}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  handleCheckText(this.state.subject) ? 'active' : ''
                }`}
              >
                <label>
                  موضوع
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  type='text'
                  name='subject'
                  value={handleString(this.state.subject)}
                  readOnly={true}
                  disabled={true}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian pl-1 ${
                  this.state.foucs === `document_type` ||
                  handleCheckText(this.state.document_type)
                    ? 'active'
                    : ''
                }`}
              >
                <label>نوع اسناد</label>
                <input
                  name={`document_type`}
                  value={handleString(this.state.document_type)}
                  onFocus={e => this.OnFocus(e.target.name)}
                  onBlur={this.OnBlur}
                  onChange={this.handleChange}
                  readOnly={this.handleDisabled()}
                  disabled={this.handleDisabled()}
                />
              </div>
            </div>
            <div className='w-100'>
              <div className='title-password col-12 mt-3 mb-2'>
                <h2 className='IranSans_Bold'>پیوست اسناد جدید</h2>
                <div className='line'></div>
              </div>
              {this.state.new_document_attachment.map((data, key) => (
                <DocumentList
                  {...this}
                  data={data}
                  key={key}
                  _key={key}
                  name='new_document_attachment'
                  length={this.state.new_document_attachment.length}
                  require={true}
                />
              ))}
              {!this.handleDisabled() && (
                <div className='button-add col-12'>
                  <button
                    onClick={() =>
                      this.handleAdd('new_document_attachment', {
                        documentNumber: '',
                        title: '',
                        editNumber: '',
                        attachment: [],
                        attachmentName: []
                      })
                    }
                  >
                    <AddIcon />
                    افزودن مورد جدید
                  </button>
                </div>
              )}
            </div>
            <div className='w-100'>
              <div className='title-password col-12 mt-3 mb-2'>
                <h2 className='IranSans_Bold'>پیوست اسناد ویرایش شده</h2>
                <div className='line'></div>
              </div>
              {this.state.edited_document_attachment.map((data, key) => (
                <DocumentList
                  {...this}
                  data={data}
                  key={key}
                  _key={key}
                  name='edited_document_attachment'
                  length={this.state.edited_document_attachment.length}
                />
              ))}
              {!this.handleDisabled() && (
                <div className='button-add col-12'>
                  <button
                    onClick={() =>
                      this.handleAdd('edited_document_attachment', {
                        documentNumber: '',
                        title: '',
                        editNumber: '',
                        attachment: [],
                        attachmentName: []
                      })
                    }
                  >
                    <AddIcon />
                    افزودن مورد جدید
                  </button>
                </div>
              )}
            </div>
            <div className='w-100'>
              <div className='title-password col-12 mt-3 mb-2'>
                <h2 className='IranSans_Bold'>توزیع اسناد به ادارات</h2>
                <div className='line'></div>
              </div>
              {this.state.documents_distribution.map((data, key) => (
                <DistributionDocuments
                  {...this}
                  data={data}
                  key={key}
                  _key={key}
                  name='documents_distribution'
                  length={this.state.documents_distribution.length}
                />
              ))}
              {!this.handleDisabled() && (
                <div className='button-add col-12'>
                  <button
                    onClick={() =>
                      this.handleAdd('documents_distribution', {
                        officeName: '',
                        number: ''
                      })
                    }
                  >
                    <AddIcon />
                    افزودن مورد جدید
                  </button>
                </div>
              )}
            </div>
            {this.props.close ? (
              ''
            ) : !this.handleDisabled() && this.props.state.can_do_action ? (
              <React.Fragment>
                <TOCC {...this} />
                <Dispatch {...this} />
                <div className='submit-form col-12'>
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
                  <CancelButton redirect='index-TSR' />
                </div>
              </React.Fragment>
            ) : (
              <SignTSR
                {...this}
                handleState={(name, value) => this.setState({ [name]: value })}
                permision='tsr11_signs'
                disabled={this.handleDisabled()}
              />
            )}
          </div>
        </div>
      )
  }
}
