import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import StaticData from '../staticData'
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded'
import Loading from '../layout/loading'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import AttachedDocumentWorkOrder from './AttachedDocumentWorkOrder'
import HandleTypeWork from './HandleTypeWork'
import RequestBuy from './RequestBuy'
import AddIcon from '@material-ui/icons/Add'
import ListSign from './ListSign'
import Permision from '../permision/permision'
import getCustomFormat from '../getCustomFormat'
import SubmitWorkOrder from './SubmitWorkOrder'
import SignTSR from './SignTSR'
import CheckIcon from '@material-ui/icons/Check'
import moment from 'moment-jalaali'
import Dispatch from './Dispatch'
import handleCheckText from '../handleCheckText'
import TOCC from './TOCC'
import handleString from '../handleString'
// import ListSign from './ListSign'
export default class WorkOrder extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()

    this.state = {
      token: Cookies.get('token'),
      tsr_no: '',
      created_at: '',
      subject: '',
      disabled: false,
      // description: '',
      // executionTime: undefined,
      documentNumber: [],
      Attachement: [],
      AttachementName: [],
      typeWork: 'mechanical',
      requirements: '',
      author_name: '',
      applicant_unit: '',
      right: 0,
      width: 10,
      mechanical: {
        eng_instruction: [
          {
            description: '',
            executionTime: null,
            instruction_issuance_time: ''
          }
        ],
        foreign_attachments: [
          {
            documentNumber: '',
            degreeTitle: '',
            numberPages: '',
            descriptionAttachment: '',
            AttachementName: [],
            Attachement: []
          }
        ],
        internal_attachments: [
          {
            documentNumber: null,
            degreeTitle: '',
            numberPages: '',
            descriptionAttachment: ''
          }
        ]
      },
      electrical: {
        eng_instruction: [
          {
            description: '',
            executionTime: null,
            instruction_issuance_time: ''
          }
        ],
        foreign_attachments: [
          {
            documentNumber: '',
            degreeTitle: '',
            numberPages: '',
            descriptionAttachment: '',
            AttachementName: [],
            Attachement: []
          }
        ],
        internal_attachments: [
          {
            documentNumber: null,
            degreeTitle: '',
            numberPages: '',
            descriptionAttachment: ''
          }
        ]
      },
      Instrumentation: {
        eng_instruction: [
          {
            description: '',
            executionTime: null,
            instruction_issuance_time: ''
          }
        ],
        foreign_attachments: [
          {
            documentNumber: '',
            degreeTitle: '',
            numberPages: '',
            descriptionAttachment: '',
            AttachementName: [],
            Attachement: []
          }
        ],
        internal_attachments: [
          {
            documentNumber: null,
            degreeTitle: '',
            numberPages: '',
            descriptionAttachment: ''
          }
        ]
      },
      building: {
        eng_instruction: [
          {
            description: '',
            executionTime: null,
            instruction_issuance_time: ''
          }
        ],
        foreign_attachments: [
          {
            documentNumber: '',
            degreeTitle: '',
            numberPages: '',
            descriptionAttachment: '',
            AttachementName: [],
            Attachement: []
          }
        ],
        internal_attachments: [
          {
            documentNumber: null,
            degreeTitle: '',
            numberPages: '',
            descriptionAttachment: ''
          }
        ]
      },
      purchase_packages: [{ number: '', description: '', date: undefined }],
      listSign: [],
      user_list: [],
      notification_to: [],
      notification_cc: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - دستور کار مهندسی`
    this.CheckWidth()
    this.ShowFetch()
    this.props.GetShowFetch(7, this.ShowFetch)
  }
  async componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = await nextProps
      // await this.ShowFetch()
    }
  }
  ShowFetch = async () => {
    let tsr7 = await this.props.state.tsr7,
      obj = {}
    if (tsr7) {
      for (let value in tsr7) {
        let state
        if (value.includes('tsr7_')) {
          state = value.split('tsr7_')[1]
        } else {
          state = value
        }
        if (
          state === 'mechanical_eng_instruction' ||
          state === 'mechanical_foreign_attachments' ||
          state === 'mechanical_internal_attachments' ||
          state === 'electrical_eng_instruction' ||
          state === 'electrical_foreign_attachments' ||
          state === 'electrical_internal_attachments' ||
          state === 'Instrumentation_eng_instruction' ||
          state === 'Instrumentation_foreign_attachments' ||
          state === 'Instrumentation_internal_attachments' ||
          state === 'building_eng_instruction' ||
          state === 'building_foreign_attachments' ||
          state === 'building_internal_attachments'
          // state === 'purchase_packages'
        ) {
          if (this.props.show || this.props.state.status === 'update') {
            state = state.split('_')
            if (obj[state[0]] === undefined) {
              obj[state[0]] = {
                eng_instruction: [
                  {
                    description: '',
                    executionTime: null,
                    instruction_issuance_time: ''
                  }
                ],
                foreign_attachments: [
                  {
                    documentNumber: '',
                    degreeTitle: '',
                    numberPages: '',
                    descriptionAttachment: '',
                    AttachementName: [],
                    Attachement: []
                  }
                ],
                internal_attachments: [
                  {
                    documentNumber: null,
                    degreeTitle: '',
                    numberPages: '',
                    descriptionAttachment: ''
                  }
                ]
              }
            }
            const objDetail = tsr7[value]
            if (objDetail) {
              obj[state[0]][`${state[1]}_${state[2]}`] = Object.keys(
                objDetail
              ).map(row => {
                if (objDetail[row].Attachement) {
                  objDetail[row].Attachement = Object.keys(
                    objDetail[row].Attachement
                  ).map(att => {
                    return objDetail[row].Attachement[att]
                  })
                }
                return objDetail[row]
              })
            }
          }
        } else if (state === 'purchase_packages') {
          const purchase = tsr7[value]
          if (
            (this.props.show || this.props.state.status === 'update') &&
            purchase
          ) {
            obj[state] = Object.keys(purchase).map(pack => {
              return purchase[pack]
            })
          }
        } else if (state === 'technical_review') {
          if (!this.props.show) {
            obj[state] = tsr7[value] === '1'
          }
        } else {
          obj[state] = tsr7[value]
        }
      }
      let ListMandatory = await ListSign.ListMandatory.tsr7
      let listSign = await this.state.listSign
      if (ListMandatory) {
        ListMandatory.forEach(li => {
          listSign = [...listSign, li]
        })
      }
      listSign = await [...new Set(listSign)]
      obj['listSign'] = await listSign
      obj['role'] = await this.props.state.role
      obj['canCreate'] = await this.Permision.handlePermision(
        this.props.state.role,
        'tsr_create'
      )
      await this.setState(obj)
      // await this.handleDate()
    }
  }
  handleDate = () => {
    let currentDate = ''
    if (this.props.show || this.props.canUpdate) {
      if (this.props.state.tsr7.tsr7_updated_at) {
        currentDate = this.props.state.tsr7.tsr7_updated_at
      } else if (this.props.state.tsr7.tsr7_created_at) {
        currentDate = this.props.state.tsr7.tsr7_created_at
      }
    } else {
      currentDate = getCustomFormat(moment(), false)
    }
    let obj = this.state[this.state.typeWork]
    obj.eng_instruction.forEach(el => {
      if (el.instruction_issuance_time === '') {
        el.instruction_issuance_time = currentDate
      }
    })
    this.setState({ [this.state.typeWork]: obj })
  }
  CheckWidth = () => {
    if (this.refs.label_1) {
      this.setState({
        width: this.refs.label_1.offsetWidth
      })
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
    if (this.state.canCreate && !this.props.show) {
      let datareg = new FormData()
      let array = this.state[this.state.typeWork][parentState][key][nameState],
        arrayName = this.state[this.state.typeWork][parentState][key][names]
      datareg.append('file', file)
      axios({
        method: 'post',
        url: `${StaticData.domainIp}/uploadFile/TSR7`,
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
            await this.setState({
              [this.state.typeWork]: this.state[this.state.typeWork]
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
  }
  deleteFileList = async (key, num, files, names, parent) => {
    if (this.state.canCreate && !this.props.show) {
      let nameState = await this.state[this.state.typeWork]
      if (nameState) {
        let list = await nameState[parent]
        if (list) {
          let obj = await list[key]
          let data1 = await obj[files]
          let data2 = await obj[names]
          await data1.splice(num, 1)
          await data2.splice(num, 1)
          await this.setState({ [this.state.typeWork]: nameState })
        }
      }
    }
  }
  _handleChangeList = (parent, name, value, key) => {
    if (this.state.canCreate && !this.props.show) {
      let nameState = this.state[this.state.typeWork]
      let list = nameState[parent]
      if (list) {
        let obj = list[key]
        obj[name] = value
        this.setState({ [this.state.typeWork]: nameState })
      }
    }
  }
  handleAddAttach = nameState => {
    if (this.state.canCreate && !this.props.show) {
      let state = this.state[this.state.typeWork]
      if (state) {
        let obj = {}
        if (nameState === 'foreign_attachments') {
          obj = {
            documentNumber: '',
            degreeTitle: '',
            numberPages: '',
            descriptionAttachment: '',
            AttachementName: [],
            Attachement: []
          }
        } else if (nameState === 'internal_attachments') {
          obj = {
            documentNumber: null,
            degreeTitle: '',
            numberPages: '',
            descriptionAttachment: ''
          }
        }
        let list = state[nameState]
        list.push(obj)
        this.setState({ [this.state.typeWork]: state })
      }
    }
  }
  handleAdd = nameState => {
    if (this.state.canCreate && !this.props.show) {
      let obj = { number: '', description: '', date: undefined }
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
  handleChangeTab = async (name, key) => {
    // if (this.state.canCreate && !this.props.show) {
    if (this.refs[`label_${key}`]) {
      let right = 0
      for (let i = 1; i < key; i++) {
        if (this.refs[`label_${i}`]) {
          right += await this.refs[`label_${key}`].offsetWidth
        }
      }
      await this.setState({
        typeWork: name,
        right: right,
        width: this.refs[`label_${key}`].offsetWidth
      })
      await this.handleDate()
    }
    // }
  }
  ChangeDateList = (date, key, nameState, name) => {
    if (this.state.canCreate && !this.props.show) {
      let list = this.state[nameState]
      if (nameState && list) {
        let obj = list[key]
        obj[name] = date
        this.setState({ [nameState]: list })
      }
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
  handleCheckTypeWork = () => {
    const list = ['mechanical', 'electrical', 'Instrumentation', 'building']
    let check = false
    list.forEach(data => {
      if (this.state[data]) {
        let i = 0
        while (i < this.state[data].eng_instruction.length) {
          if (
            handleCheckText(this.state[data].eng_instruction[i].description)
          ) {
            check = true
            break
          }
          i++
        }
      }
    })
    return check
  }
  // handleCheckInternalOrder = () => {
  //   const list = ['mechanical', 'electrical', 'Instrumentation', 'building']
  //   let check = false
  //   list.forEach(data => {
  //     if (this.state[data]) {
  //       let i = 0
  //       while (i < this.state[data].internal_attachments.length) {
  //         if (
  //           handleCheckText(
  //             this.state[data].internal_attachments[i].documentNumber
  //           ) &&
  //           handleCheckText(
  //             this.state[data].internal_attachments[i].degreeTitle
  //           )
  //         ) {
  //           check = true
  //           break
  //         }
  //         i++
  //       }
  //     }
  //   })
  //   return check
  // }
  handleContinue = async () => {
    if (this.state.id) {
      await this.setState({ loading: 'continue', disabled: true })
      let datareg = await new FormData()
      await datareg.append('id', this.state.id)
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/tsr/tsr7/make_complete`,
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
              this.setState({
                redirect: true,
                disabled: false
              })
            }, 5000)
          } else {
            this.setState({
              redirect: false,
              disabled: false
            })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          this.setState({
            redirect: false,
            disabled: false,
            loading: ''
          })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
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
    // const ShowToCC =
    //   this.props.state.status !== 'complete' &&
    //   !this.handleDisabled() &&
    //   !this.props.close
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
              <p className='m-0'>این صفحه توسط کارشناس TSR تکمیل می‌گردد.</p>
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
                  name='tsr_no'
                  value={handleString(this.state.tsr_no)}
                  readOnly={true}
                  disabled={true}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  handleString(this.state.created_at) ? 'active' : ''
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
                    name='created_at'
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
                className={`field-form persian ${
                  handleCheckText(this.state.author_name) ? 'active' : ''
                }`}
              >
                <label>
                  نام متقاضی
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  type='text'
                  name='author_name'
                  value={handleString(this.state.author_name)}
                  readOnly={true}
                  disabled={true}
                />
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-12'>
              <div
                className={`field-form persian ${
                  handleCheckText(this.state.applicant_unit) ? 'active' : ''
                }`}
              >
                <label>
                  واحد
                  <span className='star IranSans_Bold'>*</span>
                </label>
                <input
                  type='text'
                  name='applicant_unit'
                  value={handleString(this.state.applicant_unit)}
                  readOnly={true}
                  disabled={true}
                />
              </div>
            </div>
            <div className='col-12'>
              <div className='col-12'>
                <div className='access'>
                  <div className='title-access'>
                    <h3 className='text-title'>نوع کار</h3>
                    <div className='line col pl-0'></div>
                  </div>
                  <div className='main-accsess'>
                    <div className='tab'>
                      <span
                        onClick={() => this.handleChangeTab('mechanical', 1)}
                        className={`label ${
                          this.state.typeWork === 'mechanical'
                            ? 'active IranSans_Bold'
                            : ''
                        }`}
                        ref={`label_1`}
                      >
                        مکانیک
                      </span>
                      <span
                        onClick={() => this.handleChangeTab('electrical', 2)}
                        className={`label ${
                          this.state.typeWork === 'electrical'
                            ? 'active IranSans_Bold'
                            : ''
                        }`}
                        ref={`label_2`}
                      >
                        برق
                      </span>
                      <span
                        onClick={() =>
                          this.handleChangeTab('Instrumentation', 3)
                        }
                        className={`label ${
                          this.state.typeWork === 'Instrumentation'
                            ? 'active IranSans_Bold'
                            : ''
                        }`}
                        ref={`label_3`}
                      >
                        ابزار دقیق
                      </span>
                      <span
                        onClick={() => this.handleChangeTab('building', 4)}
                        className={`label ${
                          this.state.typeWork === 'building'
                            ? 'active IranSans_Bold'
                            : ''
                        }`}
                        ref={`label_4`}
                      >
                        ساختمان
                      </span>
                      <div
                        className='line-active'
                        style={{
                          right: `${this.state.right}px`,
                          width: `${this.state.width}px`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <HandleTypeWork
              {...this}
              handleState={(name, value) => this.setState({ [name]: value })}
            />
            <AttachedDocumentWorkOrder
              {...this}
              handleState={(name, value) => this.setState({ [name]: value })}
              out={true}
              nameParent='foreign_attachments'
              canCreate={!this.handleDisabled()}
            />
            <AttachedDocumentWorkOrder
              {...this}
              handleState={(name, value) => this.setState({ [name]: value })}
              nameParent='internal_attachments'
              canCreate={!this.handleDisabled()}
            />
            <div className='w-100'>
              <div className='title-password col-12 mt-3 mb-2'>
                <h2 className='IranSans_Bold'>درخواست‌های خرید</h2>
                <div className='line'></div>
              </div>
              {this.state.purchase_packages.map((data, key) => (
                <RequestBuy
                  {...this}
                  data={data}
                  key={key}
                  length={this.state.purchase_packages.length}
                  _key={key}
                  name='purchase_packages'
                  canCreate={!this.handleDisabled()}
                />
              ))}
              {!this.handleDisabled() && (
                <div className='button-add col-12'>
                  <button onClick={() => this.handleAdd('purchase_packages')}>
                    <AddIcon />
                    افزودن مورد جدید
                  </button>
                </div>
              )}
            </div>
            {this.props.close ? (
              ''
            ) : //  this.props.state.make_complete &&
            this.props.state.status === 'complete' &&
              this.Permision.handlePermision(
                this.state.role,
                'tsr7_make_complete'
              ) ? (
              <div className='submit-form col-12'>
                <button
                  className='continue'
                  onClick={this.handleContinue}
                  disabled={this.state.disabled}
                >
                  {this.state.loading === 'continue' ? (
                    <Loading className='form-loader' />
                  ) : (
                    <CheckIcon />
                  )}
                  تائید و ادامه
                </button>
              </div>
            ) : !this.handleDisabled() ? (
              // && this.props.state.can_do_action
              <React.Fragment>
                <TOCC {...this} />
                <Dispatch {...this} isMulti={true} length={4} />
                <SubmitWorkOrder
                  {...this}
                  handleState={(name, value) =>
                    this.setState({ [name]: value })
                  }
                />
              </React.Fragment>
            ) : (
              <SignTSR
                {...this}
                handleState={(name, value) => this.setState({ [name]: value })}
                permision='tsr7_signs'
                disabled={this.handleDisabled()}
              />
            )}
          </div>
        </div>
      )
  }
}
