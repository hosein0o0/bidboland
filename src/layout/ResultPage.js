import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect } from 'react-router-dom'
import StaticData from '../staticData'
import Cookies from 'js-cookie'
import axios from 'axios'
// import SearchIcon from '@material-ui/icons/Search';
import Notification from '../notification/notification'
import Message from '../notification/Message'
// import Loading from '../layout/loading'
import DetailResultPageTop from './DetailResultPageTop'
import Permision from '../permision/permision'
import TableResultPage from './TableResultPage'
import CounterTab from '../Customization/CounterTab'

export default class ResultPage extends Component {
  constructor (props) {
    super(props)
    this.Permision = new Permision()
    this.that = null
    this.state = {
      token: Cookies.get('token'),
      search: '',
      foucs: '',
      role: '',
      accessTab: false,
      select: 1,
      equipment: '',
      firstLoading: true,
      PID_data: null,
      gallery_result: [],
      information: {}
    }
  }
  async componentDidMount () {
    document.title = `${StaticData.Title} - نتایج جستجو`
    let url = window.location.href,
      equipment
    if (url) {
      if (url.split('-search=')) {
        equipment = url.split('-search=')[1]
        this.setState({ equipment: equipment })
        this.loadData(equipment)
      }
    }
  }
  loadData = async equipment => {
    let url = `${StaticData.domainIp}/AdvanceSearch/getFirstDetailByEquipmentNo/${equipment}`
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(async response => {
        await this.setState({ loading: '', firstLoading: false })
        if (response.status === 200) {
          await this.setState({
            MR: response.data.content.MR.count,
            equipmentNoMr: response.data.content.MR.equipmentNo,
            PID: response.data.content['P&ID'].count,
            equipmentNoPID: response.data.content['P&ID'].equipmentNo,
            PID_data: response.data.content['P&ID_first_page']
              ? response.data.content['P&ID_first_page']
              : null,
            gallery_result: response.data.content.gallery_result
              ? response.data.content.gallery_result
              : [],
            information: response.data.content.information
          })
          if (this.that) {
            await this.that.loadData()
          }
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        this.setState({ loading: '', firstLoading: false })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  // handleSearch = (e) => {
  //     if (this.Search !== null) {
  //         this.setState({ search: e.target.value })
  //         this.Search(e.target.value)
  //     }
  // }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    const { value, maxLength, name } = e.target
    this.setState({
      [name]: maxLength !== -1 ? value.slice(0, maxLength) : value
    })
  }
  handleShowTab = () => {
    let list = [
      {
        name: `P&ID`,
        value: 1,
        access: this.Permision.handlePermision(this.state.role, 'p&id'),
        counter: this.state.PID ? this.state.PID : 0,
        equipment: this.state.equipmentNoPID
      },
      {
        name: `بسته های خرید`,
        value: 2,
        access: this.Permision.handlePermision(this.state.role, 'purchase_package'),
        counter: this.state.MR ? this.state.MR : 0,
        equipment: this.state.equipmentNoMr
      },
      {
        name: `مهندسی پایه`,
        value: 3,
        access: this.Permision.handlePermision(this.state.role, 'basic_engineering'),
        counter: this.state.MR ? this.state.MR : 0,
        equipment: this.state.equipmentNoMr
      },
      {
        name: `مهندسی تفضیلی`,
        value: 4,
        access: this.Permision.handlePermision(this.state.role, 'detail_engineering'),
        counter: this.state.MR ? this.state.MR : 0,
        equipment: this.state.equipmentNoMr
      },
      {
        name: `مهندسی سازندگان`,
        value: 5,
        access: this.Permision.handlePermision(
          this.state.role,
          'builders_engineering'
        ),
        counter: this.state.MR ? this.state.MR : 0,
        equipment: this.state.equipmentNoMr
      },
      {
        name: 'PFD',
        value: 6,
        access: this.Permision.handlePermision(this.state.role, 'pfd'),
        counter: this.state.MR ? this.state.MR : 0,
        equipment: this.state.equipmentNoMr
      },
      {
        name: 'Line List',
        value: 7,
        access: this.Permision.handlePermision(this.state.role, 'line_list'),
        counter: this.state.MR ? this.state.MR : 0,
        equipment: this.state.equipmentNoMr
      },
      {
        name: 'ISOmetric',
        value: 8,
        access: this.Permision.handlePermision(this.state.role, 'isometric'),
        counter: this.state.MR ? this.state.MR : 0,
        equipment: this.state.equipmentNoMr
      },
      {
        name: 'Instrument',
        value: 9,
        access: this.Permision.handlePermision(this.state.role, 'instrument_list'),
        counter: this.state.MR ? this.state.MR : 0,
        equipment: this.state.equipmentNoMr
      },
      {
        name: '3D Model',
        value: 10,
        access: this.Permision.handlePermision(this.state.role, '3d_model'),
        counter: this.state.MR ? this.state.MR : 0,
        equipment: this.state.equipmentNoMr
      }
      // {
      //     name: 'پیوست‌های MR',
      //     value: 3,
      //     access: this.Permision.handlePermision(this.state.role, ''),
      //     counter: 0,
      // },
      // {
      //     name: 'شناسنامه تجهیزات',
      //     value: 4,
      //     access: this.Permision.handlePermision(this.state.role, 'equipment_identify'),
      //     counter: 0,
      // },
    ]
    return list
  }
  getRole = (response, status) => {
    if (status === 'response') {
      if (response.status === 200) {
        this.setState({ role: response.data.role, accessTab: true })
        if (this.props.location && this.props.location.state) {
        } else {
        }
      } else {
        this.setState({ select: 0, accessTab: false })
        Notification.notify(Message.text(response.status), 'error')
      }
    } else {
      this.setState({ select: 0, accessTab: false })
      let _catch = response
      if (_catch.response) {
        Notification.notify(Message.text(_catch.response.status), 'error')
      }
    }
  }
  ChangeTab = async num => {
    if (this.that) {
      await this.that.ResetTable()
      await this.setState({ select: num, search: '' })
      await this.that.fetchData()
    }
  }
  handleData = () => {
    switch (this.state.select) {
      case 1:
        return {
          detail: this.state.PID_data,
          header: [
            { name: 'DRAWING TITLE', value: 'drawing_title' },
            { name: 'P&ID No.', value: 'p_and_id' },
            { name: 'LEGEND', value: 'legend' },
            { name: 'LEGEND DESCRIPTION', value: 'legend_description' },
            { name: 'PROJECT PLANT LOCATION', value: 'project_plant_location' },
            { name: 'UNIT No./ ZONE NO', value: 'unit_no' },
            { name: 'SERIAL No.', value: 'serial_no' },
            { name: 'SHEET No.', value: 'sheet_no' },
            { name: 'REV.', value: 'rev' },
            { name: 'OWNER PROJECT No.', value: 'owner_project_no' }
          ],
          url: 'pAndId',
          equipment: this.state.equipmentNoPID
        }
      case 2:
        return {
          detail: null,
          header: [
            { name: 'PO No.', value: 'po_no' },
            { name: 'PO Description', value: 'po_description' },
            { name: 'MR No.', value: 'mr_no' },
            { name: 'MR Description', value: 'mr_description' },
            { name: 'Tag No.', value: 'tag_no' },
            { name: 'Tag Description', value: 'tag_description' },
            { name: 'Remarks', value: 'remarks' }
          ],
          url: 'mrList',
          equipment: this.state.equipmentNoMr
        }
      case 3:
        return {
          detail: null,
          header: [
            { name: 'Project Code', value: 'project_code' },
            { name: 'Discipline', value: 'discipline' },
            { name: 'Document Type', value: 'document_type' },
            { name: 'Document No.', value: 'document_no' },
            { name: 'Document Title', value: 'document_title' },
            { name: 'Revision', value: 'revision' }
          ],
          url: 'mrList',
          equipment: this.state.equipmentNoMr
        }
      case 4:
        return {
          detail: null,
          header: [
            { name: 'Project Code', value: 'project_code' },
            { name: 'Doc Code', value: 'documentNumber' },
            { name: 'Doc Code Contractor', value: 'documentNumberContractor' },
            { name: 'Doc Description', value: 'activityName' },
            { name: 'Rev', value: 'lastDocumentRevision' },
            { name: 'Trans Code', value: 'transmitallNumber' },
            { name: 'Trans Received Date', value: 'issuedDate' },
            { name: 'POI', value: 'poi' },
            { name: 'POI Status', value: 'poi_status' },
            { name: 'Disc Desc', value: 'disc' },
            { name: 'CommentSheet Code', value: 'commentNumber' },
            { name: 'CommentSheet Date', value: 'commentDate' },
            { name: 'Status', value: 'status' }
          ],
          url: 'mrList',
          equipment: this.state.equipmentNoMr
        }
      case 5:
        return {
          detail: null,
          header: [
            { name: 'Row', value: 'row' },
            { name: 'Project Code', value: 'project_code' },
            { name: 'Siemens Number', value: 'siemens_number' },
            { name: 'Vendor', value: 'vendor' },
            { name: 'Vendor ABB.', value: 'vendor_ABB' },
            { name: 'PO No.', value: 'po_no' },
            { name: 'Scheduled Issue Date', value: 'scheduled_issue_date' },
            { name: 'Doc. Type', value: 'doc_type' },
            { name: 'Tag No.', value: 'tag_no' },
            { name: 'OLD Owner Document No.', value: 'old_owner_document_no' },
            { name: 'Owner Document No.', value: 'owner_document_no' },
            { name: 'Doc. Description', value: 'doc_description' },
            { name: 'Old Description', value: 'old_description' },
            { name: 'REV.', value: 'rev' },
            { name: 'Last Rev.', value: 'last_rev' },
            { name: 'Doc. Status', value: 'doc_status' },
            { name: 'Doc. Date', value: 'doc_date' },
            { name: 'Vendor Transmittal No.', value: 'vendor_transmittal_no' },
            { name: 'Receiving Date', value: 'receiving_date' },
            { name: 'Due Date', value: 'due_date' },
            {
              name: 'Procurement Transmittal No.',
              value: 'procurement_transmittal_no'
            },
            { name: 'Reply Date', value: 'reply_date' },
            { name: 'AC Status', value: 'ac_status' },
            { name: 'AC Code', value: 'ac_code' },
            { name: 'Vendor Reply Date', value: 'vendor_reply_date' },
            { name: 'Remark', value: 'remark' },
            { name: 'Vendor Name', value: 'vendor_name' },
            { name: 'MC Transmittal', value: 'mc_transmittal' },
            { name: 'MC Transmittal Date', value: 'mc_transmittal_date' },
            { name: 'MC Status', value: 'mc_status' },
            { name: 'MC TR. Due Date', value: 'mc_tr_due_date' },
            { name: 'MC Reply', value: 'mc_reply' },
            { name: 'MC Reply Date', value: 'mc_reply_date' },
            { name: 'MC AC Code', value: 'mc_ac_code' },
            { name: 'CONS. TRS.', value: 'cons_trs' },
            { name: 'CONS. TRS. DATE', value: 'cons_trs_date' },
            { name: 'No.', value: 'no' },
            { name: 'Expeditor', value: 'expeditor' },
            { name: 'L/F', value: 'lf' },
            { name: 'AN COL', value: 'AN_COL' },
            {
              name: 'Discipline PI/ME/EL/IN …',
              value: 'discipline_pi_me_el_in'
            },
            { name: 'Portion P0/P1 & P2/P3', value: 'portion_P0_P1_P2_P3' },
            { name: 'Change order', value: 'change_order' },
            { name: 'Orginator', value: 'orginator' },
            { name: 'BLDG', value: 'BLDG' },
            { name: 'CIV', value: 'CIV' },
            { name: 'EED', value: 'EED' },
            { name: 'EQP', value: 'eqp' },
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
            { name: 'EED.P3', value: 'EED_P3' }
          ],
          url: 'mrList',
          equipment: this.state.equipmentNoMr
        }
      case 6:
        return {
          detail: null,
          header: [
            { name: 'Row', value: 'id' },
            { name: 'Project', value: 'project_code' },
            { name: 'OWNER PROJECT No.', value: 'owner_project_no' },
            { name: 'PROJECT PLANT LOCATION', value: 'project_plant_location' },
            { name: 'UNIT No./ ZONE No.', value: 'unit_no_zone_no' },
            { name: 'SERIAL No.', value: 'serial_no' },
            { name: 'SHEET No.', value: 'sheet_no' },
            { name: 'REV.', value: 'rev' },
            { name: 'DRAWING TITLE', value: 'drawing_title' },
            { name: 'PFD No.', value: 'pfd_no' },
            { name: 'LEGEND', value: 'legend' },
            { name: 'LEGEND DESCRIPTION', value: 'legend_description' }
          ],
          url: 'mrList',
          equipment: this.state.equipmentNoMr
        }
      case 7:
        return {
          detail: null,
          header: [
            { name: 'Project Code', value: 'project_code' },
            { name: 'Unit', value: 'unit' },
            { name: 'ZoneNo.', value: 'zone_no' },
            { name: 'RowNo.', value: 'row_no' },
            { name: 'Rev.', value: 'rev' },
            { name: 'Fluid(idn)', value: 'fluid', changeColor: true },
            { name: 'SerialNo.(idn)', value: 'serial_no', changeColor: true },
            {
              name: 'PipingClass(idn)',
              value: 'piping_class',
              changeColor: true
            },
            { name: 'Size(Inch)(idn)', value: 'size', changeColor: true },
            {
              name: 'Insulation/TracingType(idn)',
              value: 'insulation_tracing_type',
              changeColor: true
            },
            {
              name: 'Insulation Thk.(mm)(idn)',
              value: 'insulation_thk',
              changeColor: true
            },
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
            { name: 'P&IDNo.', value: 'p_and_id_no' },
            {
              name: 'Max./Min.OperatingConditions',
              value: 'max_min_operating_conditions'
            },
            { name: 'DesignConditions', value: 'design_conditions' },
            { name: 'Field PressureTest', value: 'field_pressure_test' },
            {
              name: 'SeverCyclicCondition(Y/N)',
              value: 'sever_cyclic_condition'
            },
            { name: 'Remarks', value: 'remarks' }
          ],
          url: 'mrList',
          equipment: this.state.equipmentNoMr
        }
      case 8:
        return {
          detail: null,
          header: [
            { name: 'Area', value: 'test' },
            { name: 'Unit', value: 'test' },
            { name: 'ISO Revision', value: 'test' },
            { name: 'Shop/Field', value: 'test' },
            { name: 'Size', value: 'test' },
            { name: 'Class', value: 'test' },
            { name: 'Joint Type', value: 'test' },
            { name: 'Spool (R)', value: 'test' },
            { name: 'Material (L)', value: 'test' },
            { name: 'Line Type', value: 'test' },
            { name: 'Thickness (R)', value: 'test' },
            { name: 'Joint No.', value: 'test' },
            { name: 'Fit-up Code', value: 'test' },
            { name: 'Fit-up Date', value: 'test' },
            { name: 'Subcontractor', value: 'test' },
            { name: 'RT Percent', value: 'test' },
            { name: 'Line', value: 'test' },
            { name: 'ISO Code', value: 'test' },
            { name: 'Component (Left)', value: 'test' },
            { name: 'Component (Right)', value: 'test' },
            { name: 'Heat Number Left', value: 'test' },
            { name: 'Heat Number Right', value: 'test' },
            { name: 'Weld Code', value: 'test' },
            { name: 'Weld Date', value: 'test' },
            { name: 'Welder (Root 1)', value: 'test' },
            { name: 'Welder (Root 2)', value: 'test' },
            { name: 'Welder (Filling 1)', value: 'test' },
            { name: 'Welder (Filling 2)', value: 'test' },
            { name: 'PWHT Request', value: 'test' },
            { name: 'NDT (PT) Request', value: 'test' },
            { name: 'Valve Size', value: 'test' },
            { name: 'Test Package Code', value: 'test' },
            { name: 'Spool (L)', value: 'test' },
            { name: 'Before_Joint', value: 'test' },
            { name: 'After_Joint', value: 'test' },
            { name: 'NDT (RT) Report', value: 'test' },
            { name: 'Support Qty', value: 'test' },
            { name: 'NDT (RT) Rep. Date', value: 'test' },
            { name: 'Fitup Result', value: 'test' },
            { name: 'Subcontractor Level 2', value: 'test' },
            { name: 'ISO Sheet', value: 'test' },
            { name: 'NDT Number', value: 'test' },
            { name: 'NDT (RT) Result', value: 'test' },
            { name: 'ISO Sheets', value: 'test' },
            { name: 'State', value: 'test' },
            { name: 'Weld Result', value: 'test' },
            { name: 'NDT (RT) Req. Date', value: 'test' },
            { name: 'PWHT Report', value: 'test' },
            { name: 'PWHT Rep. Date', value: 'test' },
            { name: 'Control Valve No.', value: 'test' },
            { name: 'PWHT Result', value: 'test' },
            { name: 'PWHT Required', value: 'test' },
            { name: 'HT Report', value: 'test' },
            { name: 'Description', value: 'test' },
            { name: 'Repair Stamp', value: 'test' },
            { name: 'Work Front Code', value: 'test' },
            { name: 'OBS [Ann.]', value: 'test' },
            { name: 'OBS [Civil]', value: 'test' },
            { name: 'OBS [Engineering]', value: 'test' },
            { name: 'OBS [Equipment]', value: 'test' },
            { name: 'OBS [ISO Note]', value: 'test' },
            { name: 'OBS [Job Lock]', value: 'test' },
            { name: 'OBS [Under 2 Inch]', value: 'test' },
            { name: 'OBS [Steel Structure]', value: 'test' },
            { name: 'Obstacle Type', value: 'test' },
            { name: 'Paint Code', value: 'test' },
            { name: 'T.P. Process05 (Status)', value: 'test' },
            { name: 'NDT (RT) Defect Segement', value: 'test' },
            { name: 'Test Package Date', value: 'test' },
            { name: 'Test Package Result', value: 'test' },
            { name: 'NDT (PT) Report', value: 'test' },
            { name: 'After_Flange', value: 'test' },
            { name: 'Before_Flange', value: 'test' },
            { name: 'NDT (PT) Result', value: 'test' },
            { name: 'OBS [Pending of Contractor]', value: 'test' }
          ],
          url: 'mrList',
          equipment: this.state.equipmentNoMr
        }
      case 9:
        return {
          detail: null,
          header: [
            { name: 'Project Code', value: 'project_code' },
            { name: 'Loop ID', value: 'loop_id' },
            { name: 'Tag No', value: 'tag_no' },
            { name: 'Description', value: 'description' },
            { name: 'P&ID No', value: 'p_and_id_no' },
            { name: 'service', value: 'service' },
            { name: 'Fluid name', value: 'fluid_name' },
            { name: 'Fluid phase', value: 'fluid_phase' },
            { name: 'Size Type', value: 'size_type' },
            {
              name: 'Line No. or Equipment No.',
              value: 'line_no_or_equipment_no'
            },
            { name: 'I/O Type', value: 'io_type' },
            { name: 'Signal conn.', value: 'signal_conn' },
            { name: 'Location', value: 'location' },
            { name: 'Instrument Unit Range', value: 'instrument_unit_range' },
            { name: 'Setpoint', value: 'setpoint' },
            { name: 'Setpoint Unit', value: 'setpoint_unit' },
            { name: 'Tracing', value: 'tracing' },
            { name: 'Air manifold No.', value: 'air_manifold_no' },
            { name: 'Junction Box No.', value: 'junction_box_no' },
            { name: 'Hookup sheet No.', value: 'hookup_sheet_no' },
            { name: 'Key plan sheet no.', value: 'key_plan_sheet_no' },
            { name: 'Data Sheet No.', value: 'data_sheet_no' },
            { name: 'MFR/OWNER', value: 'mfr_owner' },
            { name: 'Remarks', value: 'remarks' }
          ],
          url: 'mrList',
          equipment: this.state.equipmentNoMr
        }
      case 10:
        return {
          detail: null,
          header: [
            { name: 'ROW', value: 'row' },
            { name: 'Project Code', value: 'project_code' },
            { name: 'Area', value: 'area' },
            { name: 'Description', value: 'description' },
            { name: 'Cut of Date', value: 'cut_of_date' },
            { name: 'Rev', value: 'rev' },
            { name: 'Remarks', value: 'remarks' }
          ],
          url: 'mrList',
          equipment: this.state.equipmentNoMr
        }
      default:
        return false
    }
  }
  hadnleTab = () => {
    let listNumber = []
    if (this.state.select === 1) {
      listNumber = [1, 2, 3, 4]
    } else if (this.state.select > 9) {
      listNumber = [9, 10, 11, 12]
    } else {
      listNumber = [
        this.state.select - 1,
        this.state.select,
        this.state.select + 1,
        this.state.select + 2
      ]
    }
    return listNumber
  }
  handleManageTab = () => {
    let arrayHtml = []
    let listTab = this.hadnleTab()
    let detailList = this.handleShowTab()
    listTab.forEach((numtab, index) => {
      let tab = detailList[numtab - 1]
      if (tab) {
        if (numtab === tab.value && tab.access) {
          arrayHtml.push(
            <div
              className={`col-xl-3 col-lg-3 col-3 mr-0 pr-3 pl-0 rtl`}
              onClick={() => this.ChangeTab(tab.value)}
              key={index}
            >
              <div
                className={`item-tab rtl mr-0 w-100 p-0 col-12 ${
                  this.state.select === tab.value ? 'active IranSans_Bold' : ''
                }`}
              >
                <span>
                  <label
                    className={`${
                      this.state.select === tab.value ? 'IranSans_Bold' : ''
                    }`}
                  >
                    <CounterTab
                      key={index}
                      tafazol={
                        this.handleShowTab().filter(item => !item.access).length
                      }
                      data={tab}
                    />
                    .
                  </label>
                  <span className='font-normal ml-1'>({tab.equipment})</span>
                  {tab.name}
                </span>
                <span className='counter-result'>{tab.counter}</span>
              </div>
            </div>
          )
        }
      }
    })
    return arrayHtml
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else
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
                  nameRole='Home'
                  getRole={this.getRole}
                  firstLoading={this.state.firstLoading}
                  nameUrl={this.props.nameUrl}
                  BI={true}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard m-0 pr-0 pl-0'>
                    <div className='col-12 header-index pr-0 pl-0'>
                      <div className='row m-0'>
                        <div className='col-xl-6 col-lg-6 col-md-8 col-12 d-flex align-items-center'>
                          <div className='title-result-page'>
                            <label className='IranSans_Bold_FA mb-0 ml-2'>
                              نتایج جستجو پیشرفته
                            </label>
                            <span>"{this.state.equipment}"</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-12'>
                      <DetailResultPageTop {...this} />
                    </div>
                    <div className='tab-form rtl'>
                      <div className='col-xl-11 col-lg-12 col-12 row m-0 justify-content-start rtl'>
                        {this.state.accessTab ? this.handleManageTab() : ''}
                      </div>
                    </div>
                    <div className='w-100 pr-3 pl-3 position-relative row m-0 justify-content-end'>
                      <TableResultPage
                        {...this}
                        getThat={that => (this.that = that)}
                        handleState={(name, value) =>
                          this.setState({ [name]: value })
                        }
                      />
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
