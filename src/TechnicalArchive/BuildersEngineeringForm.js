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
// import DatePicker from 'react-datepicker2';
// import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import Form from '../Form/Form'
import getCustomFormat from '../getCustomFormat'
import { Redirect } from 'react-router-dom'
import handleCheckText from '../handleCheckText'
import CancelButton from '../layout/CancelButton'
export default class BuildersEngineeringForm extends Component {
  constructor (props) {
    super(props)
    // handleCheckText = HandleCheckText.handleCheckText
    // getCustomFormat = GetCustomFormat.getCustomFormat
    this.state = {
      token: Cookies.get('token'),
      foucs: '',
      // project_code: '',
      documentNumber: '',
      documentNumberContractor: '',
      activityName: '',
      lastDocumentRevision: '',
      transmitallNumber: '',
      issuedDate: null,
      poi: '',
      poi_status: '',
      commentDate: null,
      disabled: false,
      loading: '',
      itemForm: [
        // { name: "Row", value: 'row' },
        { name: 'Project Code', value: 'project_code', require: true },
        { name: 'Siemens Number', value: 'siemens_number', require: true },
        { name: 'Vendor', value: 'vendor', require: true },
        { name: 'Vendor ABB.', value: 'vendor_ABB', require: true },
        { name: 'PO No.', value: 'po_no', require: true },
        {
          name: 'Scheduled Issue Date',
          value: 'scheduled_issue_date',
          date: true,
          require: true
        },
        { name: 'Doc. Type', value: 'doc_type', require: true },
        { name: 'Tag No.', value: 'tag_no', require: true },
        {
          name: 'OLD Owner Document No.',
          value: 'old_owner_document_no',
          require: true
        },
        {
          name: 'Owner Document No.',
          value: 'owner_document_no',
          require: true
        },
        { name: 'Doc. Description', value: 'doc_description', require: true },
        { name: 'Old Description', value: 'old_description', require: true },
        { name: 'REV.', value: 'rev' },
        { name: 'Last Rev.', value: 'last_rev' },
        { name: 'Doc. Status', value: 'doc_status' },
        { name: 'Doc. Date', value: 'doc_date', date: true },
        { name: 'Vendor Transmittal No.', value: 'vendor_transmittal_no' },
        { name: 'Receiving Date', value: 'receiving_date', date: true },
        { name: 'Due Date', value: 'due_date', date: true },
        {
          name: 'Procurement Transmittal No.',
          value: 'procurement_transmittal_no'
        },
        { name: 'Reply Date', value: 'reply_date', date: true },
        { name: 'AC Status', value: 'ac_status' },
        { name: 'AC Code', value: 'ac_code' },
        { name: 'Vendor Reply Date', value: 'vendor_reply_date', date: true },
        { name: 'Remark', value: 'remark' },
        { name: 'Vendor Name', value: 'vendor_name' },
        { name: 'MC Transmittal', value: 'mc_transmittal' },
        {
          name: 'MC Transmittal Date',
          value: 'mc_transmittal_date',
          date: true
        },
        { name: 'MC Status', value: 'mc_status' },
        { name: 'MC TR. Due Date', value: 'mc_tr_due_date', date: true },
        { name: 'MC Reply', value: 'mc_reply' },
        { name: 'MC Reply Date', value: 'mc_reply_date', date: true },
        { name: 'MC AC Code', value: 'mc_ac_code' },
        { name: 'CONS. TRS.', value: 'cons_trs' },
        { name: 'CONS. TRS. DATE', value: 'cons_trs_date', date: true },
        { name: 'No.', value: 'no' },
        { name: 'Expeditor', value: 'expeditor' },
        { name: 'L/F', value: 'lf' },
        { name: 'AN COL', value: 'AN_COL' },
        { name: 'Discipline PI/ME/EL/IN …', value: 'discipline_pi_me_el_in' },
        { name: 'Portion P0/P1 & P2/P3', value: 'portion_P0_P1_P2_P3' },
        { name: 'Change order', value: 'change_order' },
        { name: 'Orginator', value: 'orginator' },
        { name: 'BLDG', value: 'BLDG' },
        { name: 'CIV', value: 'CIV' },
        { name: 'EED', value: 'EED' },
        // { name: "EQP", value: 'eqp' },
        { name: 'FAS', value: 'FAS' },
        { name: 'FEQ', value: 'FEQ' },
        { name: 'FSD', value: 'FSD' },
        { name: 'FSD Material', value: 'FSD_material' },
        { name: 'INS / INS COR', value: 'INS_INS_COR' },
        { name: 'PPD', value: 'PPD' },
        { name: 'PRC', value: 'PRC' },
        { name: 'RED', value: 'RED' },
        { name: 'SED', value: 'SED' },
        { name: 'LOG/ Shipping', value: 'LOG_Shipping' },
        { name: 'VDC', value: 'VDC' },
        { name: 'Farafan', value: 'farafan' },
        { name: 'PPD.P3', value: 'PPD_P3' },
        { name: 'EED.P3', value: 'EED_P3' },
        { name: 'attachment', value: 'attachment', upload: true, accept: '*' }
      ],
      project_code: '',
      siemens_number: '',
      vendor: '',
      vendor_ABB: '',
      po_no: '',
      scheduled_issue_date: undefined,
      doc_type: '',
      tag_no: '',
      old_owner_document_no: '',
      owner_document_no: '',
      doc_description: '',
      old_description: '',
      rev: '',
      last_rev: '',
      doc_status: '',
      doc_date: undefined,
      vendor_transmittal_no: '',
      receiving_date: undefined,
      due_date: undefined,
      procurement_transmittal_no: '',
      reply_date: undefined,
      ac_status: '',
      ac_code: '',
      vendor_reply_date: undefined,
      remark: '',
      vendor_name: '',
      mc_transmittal: '',
      mc_transmittal_date: undefined,
      mc_status: '',
      mc_tr_due_date: undefined,
      mc_reply: '',
      mc_reply_date: undefined,
      mc_ac_code: '',
      cons_trs: '',
      cons_trs_date: undefined,
      no: '',
      expeditor: '',
      lf: '',
      AN_COL: '',
      discipline_pi_me_el_in: '',
      portion_P0_P1_P2_P3: '',
      change_order: '',
      orginator: '',
      BLDG: '',
      CIV: '',
      EED: '',
      eqp: '',
      FAS: '',
      FEQ: '',
      FSD: '',
      FSD_material: '',
      INS_INS_COR: '',
      PPD: '',
      PRC: '',
      RED: '',
      SED: '',
      LOG_Shipping: '',
      VDC: '',
      farafan: '',
      PPD_P3: '',
      EED_P3: '',
      attachment: [],
      attachmentName: []
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} - ایجاد مهندسی سازندگان`
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
      url: `${StaticData.domainIp}/uploadFile/equipmentid`,
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
      project_code,
      siemens_number,
      vendor,
      vendor_ABB,
      po_no,
      scheduled_issue_date,
      doc_type,
      tag_no,
      old_owner_document_no,
      owner_document_no,
      doc_description,
      old_description,
      rev,
      last_rev,
      doc_status,
      doc_date,
      vendor_transmittal_no,
      receiving_date,
      due_date,
      procurement_transmittal_no,
      reply_date,
      ac_status,
      ac_code,
      vendor_reply_date,
      remark,
      vendor_name,
      mc_transmittal,
      mc_transmittal_date,
      mc_status,
      mc_tr_due_date,
      mc_reply,
      mc_reply_date,
      mc_ac_code,
      cons_trs,
      cons_trs_date,
      no,
      expeditor,
      lf,
      AN_COL,
      discipline_pi_me_el_in,
      portion_P0_P1_P2_P3,
      change_order,
      orginator,
      BLDG,
      CIV,
      EED,
      eqp,
      FAS,
      FEQ,
      FSD,
      FSD_material,
      INS_INS_COR,
      PPD,
      PRC,
      SED,
      RED,
      LOG_Shipping,
      VDC,
      farafan,
      PPD_P3,
      EED_P3
    } = await this.state
    const check =
      (await handleCheckText(project_code)) &&
      handleCheckText(siemens_number) &&
      handleCheckText(vendor) &&
      handleCheckText(vendor_ABB) &&
      handleCheckText(po_no) &&
      handleCheckText(po_no)
    let datareg = await new FormData()
    if (check) {
      await this.setState({ loading: 'submit', disabled: true })
      await datareg.append('project_code', project_code)
      await datareg.append('siemens_number', siemens_number)
      await datareg.append('vendor', vendor)
      await datareg.append('vendor_ABB', vendor_ABB)
      await datareg.append('po_no', po_no)
      await datareg.append(
        'scheduled_issue_date',
        getCustomFormat(scheduled_issue_date, true)
      )
      await datareg.append('doc_type', doc_type)
      await datareg.append('tag_no', tag_no)
      await datareg.append('old_owner_document_no', old_owner_document_no)
      await datareg.append('owner_document_no', owner_document_no)
      await datareg.append('doc_description', doc_description)
      await datareg.append('old_description', old_description)
      await datareg.append('rev', rev)
      await datareg.append('last_rev', last_rev)
      await datareg.append('doc_status', doc_status)
      await datareg.append('doc_date', doc_date)
      await datareg.append('doc_date', getCustomFormat(doc_date, true))
      await datareg.append('vendor_transmittal_no', vendor_transmittal_no)
      await datareg.append(
        'receiving_date',
        getCustomFormat(receiving_date, true)
      )
      await datareg.append('due_date', getCustomFormat(due_date, true))
      await datareg.append(
        'procurement_transmittal_no',
        procurement_transmittal_no
      )
      await datareg.append('reply_date', getCustomFormat(reply_date, true))
      await datareg.append('ac_status', ac_status)
      await datareg.append('ac_code', ac_code)
      await datareg.append(
        'vendor_reply_date',
        getCustomFormat(vendor_reply_date, true)
      )
      await datareg.append('remark', remark)
      await datareg.append('vendor_name', vendor_name)
      await datareg.append('mc_transmittal', mc_transmittal)
      await datareg.append(
        'mc_transmittal_date',
        getCustomFormat(mc_transmittal_date, true)
      )
      await datareg.append('mc_status', mc_status)
      await datareg.append(
        'mc_tr_due_date',
        getCustomFormat(mc_tr_due_date, true)
      )
      await datareg.append('mc_reply', mc_reply)
      await datareg.append(
        'mc_reply_date',
        getCustomFormat(mc_reply_date, true)
      )
      await datareg.append('mc_ac_code', mc_ac_code)
      await datareg.append('cons_trs', cons_trs)
      await datareg.append(
        'cons_trs_date',
        getCustomFormat(cons_trs_date, true)
      )
      await datareg.append('no', no)
      await datareg.append('expeditor', expeditor)
      await datareg.append('lf', lf)
      await datareg.append('AN_COL', AN_COL)
      await datareg.append('discipline_pi_me_el_in', discipline_pi_me_el_in)
      await datareg.append('portion_P0_P1_P2_P3', portion_P0_P1_P2_P3)
      await datareg.append('change_order', change_order)
      await datareg.append('orginator', orginator)
      await datareg.append('BLDG', BLDG)
      await datareg.append('CIV', CIV)
      await datareg.append('EED', EED)
      await datareg.append('FAS', FAS)
      await datareg.append('FEQ', FEQ)
      await datareg.append('FSD', FSD)
      await datareg.append('FSD_material', FSD_material)
      await datareg.append('INS_INS_COR', INS_INS_COR)
      await datareg.append('PPD', PPD)
      await datareg.append('PRC', PRC)
      await datareg.append('RED', RED)
      await datareg.append('SED', SED)
      await datareg.append('LOG_Shipping', LOG_Shipping)
      await datareg.append('VDC', VDC)
      await datareg.append('farafan', farafan)
      await datareg.append('PPD_P3', PPD_P3)
      await datareg.append('EED_P3', EED_P3)
      await datareg.append('eqp', eqp)
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/vpis/create`,
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
            pathname: `/engineering-document`,
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
                <Menu
                  nameRole='builders_engineering_create'
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>ایجاد مهندسی سازندگان</h2>
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
                              redirect='engineering-document'
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
