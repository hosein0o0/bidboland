import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
// import Sidebar from '../layout/sidebar'
// import Menu from '../layout/menu'
import StaticData from '../staticData'
// import DatePicker from 'react-datepicker2';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
// import CreatableSelect from 'react-select/creatable';
// import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
// import AttachFileIcon from '@material-ui/icons/AttachFile';
import DoneIcon from '@material-ui/icons/Done'
import Loading from '../layout/loading'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
// import AddIcon from '@material-ui/icons/Add';
import EngineeringItems from './EngineeringItems'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import AttachedDocument from './AttachedDocument'
import ListSign from './ListSign'
import SignTSR from './SignTSR'
import Permision from '../permision/permision'
import getCustomFormat from '../getCustomFormat'
import CancelButton from '../layout/CancelButton'
import Dispatch from './Dispatch'
import TOCC from './TOCC'
import handleCheckText from '../handleCheckText'
import handleString from '../handleString'
export default class AnnouncementEndWork extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.state = {
      token: Cookies.get('token'),
      tsr_no: '',
      created_at: '',
      subject: '',
      disabled: false,
      note: '',
      documentNumber: [],
      Attachement: [],
      AttachementName: [],
      // executionTime: undefined,
      // documentNumber: '',
      implement_eng_instruction: [],
      marked_documents: false,
      test_result: false,
      foreign_attachment: [
        {
          documentNumber: '',
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: '',
          AttachementName: [],
          Attachement: []
        }
      ],
      internal_attachment: [
        {
          documentNumber: null,
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: ''
        }
      ],
      listSign: [],
      user_list: [],
      notification_to: [],
      notification_cc: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - اعلام پایان کار توسط مسئول اجرا`
    this.ShowFetch()
    this.props.GetShowFetch(9, this.ShowFetch)
  }
  async componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = await nextProps
      // await this.ShowFetch()
    }
  }
  ShowFetch = async () => {
    let tsr9 = await this.props.state.tsr9,
      obj = {}
    if (tsr9) {
      for (let value in tsr9) {
        let state
        if (value.includes('tsr9_')) {
          state = value.split('tsr9_')[1]
        } else {
          state = value
        }
        if (state === 'foreign_attachment' || state === 'internal_attachment') {
          if (this.props.show || this.props.canUpdate) {
            let objDetail = tsr9[value]
            if (objDetail) {
              obj[state] = Object.keys(objDetail).map(fi => {
                if (objDetail[fi].Attachement) {
                  objDetail[fi].Attachement = Object.keys(
                    objDetail[fi].Attachement
                  ).map(att => {
                    return objDetail[fi].Attachement[att]
                  })
                }
                return objDetail[fi]
              })
            }
          }
        } else if (state === 'implement_eng_instruction') {
          if (this.props.show || this.props.canUpdate) {
            let _objDetail = tsr9[value]
            if (_objDetail) {
              obj[state] = Object.keys(_objDetail).map(item => {
                return _objDetail[item]
              })
            }
          } else {
            // let tsr7Document = this.props.state.tsr7
            let array = []
            const _list = [
              'mechanical',
              'electrical',
              'Instrumentation',
              'building'
            ]
            _list.forEach(item => {
              let tsr7 = this.props.state.tsr7
              let text = `tsr7_${item}_eng_instruction`
              let data = tsr7[text]
              if (data) {
                Object.keys(data).map(eng => {
                  let dataEng = data[eng]
                  if (dataEng.instruction_issuance_time) {
                    let _obj = {
                      group: '',
                      instructionNumber: '',
                      dateIssuanceInstructions:
                        dataEng.instruction_issuance_time,
                      wO: '',
                      wODate: undefined,
                      startDate: undefined,
                      endDate: undefined
                    }
                    array.push(_obj)
                  }
                })
              }
            })
            obj[state] = array
          }
        } else if (state === 'note') {
          if (this.props.show || this.props.canUpdate) {
            obj[state] = tsr9[value]
          } else {
            obj[state] = ''
          }
        } else if (state === 'marked_documents' || state === 'test_result') {
          if (this.props.show || this.props.canUpdate) {
            obj[state] = tsr9[value] === '1' ? true : false
          } else {
            obj[state] = false
          }
        } else {
          obj[state] = tsr9[value]
        }
      }
      let ListMandatory = await ListSign.ListMandatory.tsr9
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
    if (this.state.canCreate && !this.props.show) {
      this.setState({ foucs: name })
    }
  }
  OnBlur = () => {
    if (this.state.canCreate && !this.props.show) {
      this.setState({ foucs: '' })
    }
  }
  handleChange = e => {
    if (this.state.canCreate && !this.props.show) {
      this.setState({ [e.target.name]: e.target.value })
    }
  }
  handleUploadList = async (e, files, names, parentState) => {
    if (this.state.canCreate && !this.props.show) {
      await e.preventDefault()
      await this.setState({ loading: files })
      names = await names.split('_')[0]
      let key = await parseInt(files.split('_')[1])
      files = await files.split('_')[0]
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
  GetLink = (nameState, file, names, length, key, i, parentState) => {
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
          let obj = await _Parent[key]
          obj[nameState] = await array
          obj[names] = await arrayName
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
  handleChangeList = (parent, name, value, key) => {
    if (this.state.canCreate && !this.props.show) {
      let list = this.state[parent]
      let obj = list[key]
      obj[name] = value
      this.setState({ [parent]: list })
    }
  }
  handleAddAttach = nameState => {
    if (this.state.canCreate && !this.props.show) {
      let obj = {}
      if (nameState === 'foreign_attachment') {
        obj = {
          documentNumber: '',
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: '',
          AttachementName: [],
          Attachement: []
        }
      } else if (nameState === 'internal_attachment') {
        obj = {
          documentNumber: null,
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: ''
        }
      }
      this.setState({ [nameState]: [...this.state[nameState], obj] })
    }
  }
  ChangeDateList = (date, key, nameState, name) => {
    if (this.state.canCreate && !this.props.show) {
      let list = this.state[nameState]
      let obj = list[key]
      obj[name] = getCustomFormat(date, false)
      this.setState({ [nameState]: list })
    }
  }
  handleAdd = nameState => {
    if (this.state.canCreate && !this.props.show) {
      let obj = {
        group: '',
        instructionNumber: '',
        dateIssuanceInstructions: undefined,
        wO: '',
        wODate: undefined,
        startDate: undefined,
        endDate: undefined
      }
      this.setState({ [nameState]: [...this.state[nameState], obj] })
    }
  }
  handleDelete = (nameState, key) => {
    if (this.state.canCreate && !this.props.show) {
      let data = this.state[nameState]
      data.splice(key, 1)
      this.setState({ [nameState]: data })
    }
  }
  handleSubmit = async () => {
    let {
      implement_eng_instruction,
      note,
      marked_documents,
      test_result,
      foreign_attachment,
      internal_attachment,
      notification_to,
      notification_cc,
      listSign
    } = this.state
    // const foreignCheck = this.props.ForeignAttachments(foreign_attachment)
    // const internalCheck = this.props.Internalَttachments(internal_attachment)
    // if (internalCheck) {
    const CheckTo = notification_to
      ? notification_to.length === listSign.length && notification_to.length > 0
      : false
    const _check = CheckTo
    if (_check) {
      let To = Object.keys(notification_to).map(toData => {
        return notification_to[toData].value
      })
      notification_cc = notification_cc ? notification_cc : []
      let CC = Object.keys(notification_cc).map(toData => {
        return notification_cc[toData].value
      })
      foreign_attachment = await Object.assign(
        {},
        Object.keys(foreign_attachment).map(_ => {
          foreign_attachment[_].Attachement = Object.assign(
            {},
            foreign_attachment[_].Attachement
          )
          return foreign_attachment[_]
        })
      )
      internal_attachment = await Object.assign({}, internal_attachment)
      implement_eng_instruction = await Object.assign(
        {},
        implement_eng_instruction
      )
      let datareg = await new FormData()
      await datareg.append('tsr_id', this.props.state.id)
      await datareg.append(
        'implement_eng_instruction',
        JSON.stringify(implement_eng_instruction)
      )
      await datareg.append('note', note)
      await datareg.append('marked_documents', marked_documents)
      await datareg.append('test_result', test_result)
      await datareg.append(
        'foreign_attachment',
        JSON.stringify(foreign_attachment)
      )
      await datareg.append(
        'internal_attachment',
        JSON.stringify(internal_attachment)
      )
      await datareg.append('notification_to', To.join(','))
      await datareg.append('notification_cc', CC.join(','))
      this.setState({ loading: 'submit', disabled: true })
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/tsr/tsr9/insert`,
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
  handleState = (name, value) => {
    this.setState({ [name]: value })
  }
  render () {
    const ShowToCC =
      !this.handleDisabled() &&
      this.props.state.can_do_action &&
      !this.props.close
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
            <div className='w-100'>
              <div className='title-password col-12 mt-3 mb-2'>
                <h2 className='IranSans_Bold'>
                  دستور العمل‌های مهندسی اجرا شده
                </h2>
                <div className='line'></div>
              </div>
              {this.state.implement_eng_instruction.map((data, key) => (
                <EngineeringItems
                  {...this}
                  data={data}
                  key={key}
                  _key={key}
                  length={this.state.implement_eng_instruction.length}
                  name='implement_eng_instruction'
                />
              ))}
              {/* <div className='button-add col-12'>
                            <button
                                onClick={() => this.handleAdd('implement_eng_instruction')}
                            >
                                <AddIcon />
                                افزودن مورد جدید
                            </button>
                        </div> */}
            </div>
            <div className='col-xl-12 col-lg-12 col-md-12 col-12'>
              <div
                className={`field-form persian textarea ${
                  this.state.foucs === `note` ||
                  handleCheckText(this.state.note)
                    ? 'active'
                    : ''
                }`}
              >
                <div className='col p-0'>
                  <label className='textarea'>ملاحضات</label>
                  <textarea
                    className='w-100'
                    type='text'
                    name={`note`}
                    onFocus={e => this.OnFocus(e.target.name)}
                    onBlur={this.OnBlur}
                    onChange={this.handleChange}
                    value={handleString(this.state.note)}
                    readOnly={this.handleDisabled()}
                    disabled={this.handleDisabled()}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className='col-xl-12 col-lg-12 col-md-12 col-12 row m-0'>
              <div className='disiplin-checkbox col-xl-3 col-lg-3 col-md-4 col-6 w-auto mt-3 mb-3'>
                <div className='checkbox m-0'>
                  {!this.handleDisabled() && (
                    <input
                      className='d-none'
                      id={`marked_documents`}
                      name={`marked_documents`}
                      type='checkbox'
                      onChange={e =>
                        this.setState({ marked_documents: e.target.checked })
                      }
                      checked={this.state.marked_documents ? true : false}
                    />
                  )}
                  <label className='full' htmlFor={`marked_documents`}>
                    {this.state.marked_documents ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                    مدارک MarkUp شده
                  </label>
                </div>
              </div>
              <div className='disiplin-checkbox col-xl-3 col-lg-3 col-md-4 col-6 w-auto mt-3 mb-3'>
                <div className='checkbox m-0'>
                  {!this.handleDisabled() && (
                    <input
                      className='d-none'
                      id={`test_result`}
                      name={`test_result`}
                      type='checkbox'
                      onChange={e =>
                        this.setState({ test_result: e.target.checked })
                      }
                      checked={this.state.test_result ? true : false}
                    />
                  )}
                  <label className='full' htmlFor={`test_result`}>
                    {this.state.test_result ? (
                      <CheckBoxRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankRoundedIcon />
                    )}
                    نتایج تست
                  </label>
                </div>
              </div>
            </div>

            <AttachedDocument
              {...this}
              handleState={(name, value) => this.setState({ [name]: value })}
              out={true}
              nameParent='foreign_attachment'
              canCreate={!this.handleDisabled()}
            />
            <AttachedDocument
              {...this}
              handleState={(name, value) => this.setState({ [name]: value })}
              nameParent='internal_attachment'
              canCreate={!this.handleDisabled()}
            />
            {ShowToCC ? <TOCC {...this} /> : ''}
            {this.props.close ? (
              ''
            ) : !this.handleDisabled() && this.props.state.can_do_action ? (
              <React.Fragment>
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
                permision='tsr9_signs'
                disabled={this.handleDisabled()}
              />
            )}
          </div>
        </div>
      )
  }
}
