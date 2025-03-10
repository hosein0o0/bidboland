import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import TechnicalServiceApplication from './TechnicalServiceApplication'
import PreliminaryReview from './PreliminaryReview'
import ProcessTSR from './ProcessTsr'
import HSE from './HSE'
import GeneralEngineering from './GeneralEngineering'
import Committee from './committee'
import WorkOrder from './WorkOrder'
import Inspector from './Inspector'
import AnnouncementEndWork from './AnnouncementEndWork'
import CheckEndWork from './CheckEndWork'
import MapDelivery from './MapDelivery'
import Effectiveness from './Effectiveness'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import StaticData from '../staticData'
import Revisions from './Revisions'
import Permision from '../permision/permision'
import handleCheckText from '../handleCheckText'
import EditBeforeRequest from './EditBeforeRequest'
import ListSign from './ListSign'
export default class ShowTSR extends Component {
  constructor (props) {
    super(props)
    this.ShowFetch = {}
    this.ResetRev = null
    this.Permision = new Permision()
    this.state = {
      select: '',
      token: Cookies.get('token'),
      stop: false,
      ListTab: [
        {
          id: 1,
          nameTab: 'صدور درخواست TSR',
          title: 'صدور درخواست توسط متقاضی',
          permision: 'tsr_show'
        },
        {
          id: 2,
          nameTab: 'بررسی اولیه و انتخاب مسئول TSR',
          title: 'بررسی اولیه و انتخاب مسئول TSR و گروه کارشناسی',
          permision: 'tsr_show'
        },
        {
          id: 3,
          nameTab: 'بررسی TSR توسط مهندس فرآیند',
          title: 'بررسی TSR توسط مهندس فرآیند',
          permision: 'tsr_show'
        },
        {
          id: 4,
          nameTab: 'بررسی توسط اداره ایمنی',
          title: 'بررسی TSR از دیدگاه ایمنی ، سلامت و زیست محیطی (HSE)',
          permision: 'tsr_show'
        },
        {
          id: 5,
          nameTab: 'بررسی TSR توسط مهندسی عمومی',
          title: 'بررسی TSR توسط مهندسی عمومی',
          permision: 'tsr_show'
        },
        {
          id: 6,
          nameTab: 'کمیته TSR',
          title: 'کمیته TSR',
          permision: 'tsr_show'
        },
        {
          id: 7,
          nameTab: 'دستور کار مهندسی',
          title: 'دستور کار مهندسی',
          permision: 'tsr_show'
        },
        {
          id: 8,
          nameTab: 'دستور العمل بارزسی فنی',
          title: 'دستور العمل بارزسی فنی',
          permision: 'tsr_show'
        },
        {
          id: 9,
          nameTab: 'اعلام پایان کار',
          title: 'اعلام پایان کار توسط مسئول اجرا',
          permision: 'tsr_show'
        },
        {
          id: 10,
          nameTab: 'بررسی پایان اجرای کار',
          title: 'بررسی پایان اجرای کار',
          permision: 'tsr_show'
        },
        {
          id: 11,
          nameTab: 'تحویل نقشه‌های As Built',
          title: 'تحویل نقشه‌های As Built',
          permision: 'tsr_show'
        },
        {
          id: 12,
          nameTab: 'ارزیابی اثر بخشی',
          title: 'ارزیابی اثر بخشی',
          permision: 'tsr_show'
        }
      ],
      id: '',
      tsr1: {},
      tsr2: {},
      tsr3: {},
      tsr4: {},
      tsr5: {},
      tsr6: {},
      tsr7: {},
      tsr8: {},
      tsr9: {},
      tsr10: {},
      tsr11: {},
      tsr12: {},
      status: '',
      part: '',
      role: null,
      can_do_action: false,
      loading: '',
      revisions: {},
      disabledRev: false,
      listData: [],
      firstLoading: true,
      user_list: [],
      verify: false,
      Signs: {},
      hasNot: false,
      numResult: 0
    }
  }
  async componentDidMount () {
    const url = window.location.href
    let id = url.split('-')[url.split('-').length - 1]
    await this.setState({ id: id })
    await this.fetchData(id)
  }
  handleStatus = () => {
    // let result = 'disabled'
    // if (data.tsr1_verified !== '1') {
    //   result = 'disabled'
    // } else if (status) {
    //   result = status.status
    // }
    // return result
    return 'disabled'
  }
  fetchData = async (id, NotChange = false) => {
    if (this.state.token) {
      await axios
        .get(`${StaticData.domainIp}/tsr/get/${id}`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(async response => {
          this.setState({ loading: '', firstLoading: false })
          const content = response.data.content
          const status = content.status
          if (response.status === 200) {
            let select, requestEdit
            if (status) {
              select = parseInt(status.page.split('tsr')[1])
              requestEdit = true
            } else {
              select = 12
              requestEdit = false
            }
            let tsr1 = {},
              tsr2 = {},
              tsr3 = {},
              tsr4 = {},
              tsr5 = {},
              tsr6 = {},
              tsr7 = {},
              tsr8 = {},
              tsr9 = {},
              tsr10 = {},
              tsr11 = {},
              tsr12 = {},
              Signs = {}
            const data = content.data
            for (let value in data) {
              if (value.includes('tsr1_')) {
                tsr1[value] = await data[value]
              } else if (value.includes('tsr2')) {
                tsr2[value] = await data[value]
              } else if (value.includes('tsr3')) {
                tsr3[value] = await data[value]
              } else if (value.includes('tsr4')) {
                tsr4[value] = await data[value]
              } else if (value.includes('tsr5')) {
                tsr5[value] = await data[value]
              } else if (value.includes('tsr6')) {
                tsr6[value] = await data[value]
              } else if (value.includes('tsr7')) {
                tsr7[value] = await data[value]
              } else if (value.includes('tsr8')) {
                tsr8[value] = await data[value]
              } else if (value.includes('tsr9')) {
                tsr9[value] = await data[value]
              } else if (value.includes('tsr10')) {
                tsr10[value] = await data[value]
              } else if (value.includes('tsr11')) {
                tsr11[value] = await data[value]
              } else if (value.includes('tsr12')) {
                tsr12[value] = await data[value]
              }
              if (value.includes('_verify') && data[value] === '1') {
                Signs[value] = data[value]
              }
            }
            tsr1['subjectSuggest'] = data.subject_suggest
              ? data.subject_suggest
              : []
            tsr1['tsr1_user_list'] = data.tsr2_user_list
              ? data.tsr2_user_list
              : []

            tsr2['tsr2_tsr_no'] = await data.tsr1_tsr_no
            tsr2['tsr2_subject'] = await data.tsr1_subject
            tsr2['tsr2_created_at'] = await data.tsr1_created_at
            tsr2['tsr2_user_list'] = (await data.tsr2_user_list)
              ? data.tsr2_user_list
              : []

            tsr3['tsr3_tsr_no'] = await data.tsr1_tsr_no
            tsr3['tsr3_subject'] = await data.tsr1_subject
            tsr3['tsr3_created_at'] = await data.tsr1_created_at
            tsr3['tsr3_user_list'] = (await data.tsr2_user_list)
              ? data.tsr2_user_list
              : []

            tsr4['tsr4_tsr_no'] = await data.tsr1_tsr_no
            tsr4['tsr4_subject'] = await data.tsr1_subject
            tsr4['tsr4_created_at'] = await data.tsr1_created_at
            tsr4['tsr4_user_list'] = (await data.tsr2_user_list)
              ? data.tsr2_user_list
              : []

            tsr5['tsr5_tsr_no'] = await data.tsr1_tsr_no
            tsr5['tsr5_subject'] = await data.tsr1_subject
            tsr5['tsr5_created_at'] = await data.tsr1_created_at
            tsr5['tsr5_user_list'] = (await data.tsr2_user_list)
              ? data.tsr2_user_list
              : []

            tsr6['tsr6_tsr_no'] = await data.tsr1_tsr_no
            tsr6['tsr6_subject'] = await data.tsr1_subject
            tsr6['tsr6_created_at'] = await data.tsr1_created_at
            tsr6['tsr6_user_list'] = (await data.tsr2_user_list)
              ? data.tsr2_user_list
              : []

            tsr7['tsr7_tsr_no'] = await data.tsr1_tsr_no
            tsr7['tsr7_subject'] = await data.tsr1_subject
            tsr7['tsr7_created_at'] = await data.tsr1_created_at
            tsr7['tsr7_author_name'] = await data.tsr1_author_name
            tsr7['tsr7_applicant_unit'] = await data.tsr1_applicant_unit
            tsr7['tsr7_user_list'] = (await data.tsr2_user_list)
              ? data.tsr2_user_list
              : []

            tsr8['tsr8_tsr_no'] = await data.tsr1_tsr_no
            tsr8['tsr8_subject'] = await data.tsr1_subject
            tsr8['tsr8_created_at'] = await data.tsr1_created_at
            tsr8['tsr8_user_list'] = (await data.tsr2_user_list)
              ? data.tsr2_user_list
              : []

            tsr9['tsr9_tsr_no'] = await data.tsr1_tsr_no
            tsr9['tsr9_subject'] = await data.tsr1_subject
            tsr9['tsr9_created_at'] = await data.tsr1_created_at
            tsr9['tsr9_user_list'] = (await data.tsr2_user_list)
              ? data.tsr2_user_list
              : []

            tsr10['tsr10_tsr_no'] = await data.tsr1_tsr_no
            tsr10['tsr10_subject'] = await data.tsr1_subject
            tsr10['tsr10_created_at'] = await data.tsr1_created_at
            tsr10['tsr10_user_list'] = (await data.tsr2_user_list)
              ? data.tsr2_user_list
              : []

            tsr11['tsr11_tsr_no'] = await data.tsr1_tsr_no
            tsr11['tsr11_subject'] = await data.tsr1_subject
            tsr11['tsr11_created_at'] = await data.tsr1_created_at
            tsr11['tsr11_user_list'] = (await data.tsr2_user_list)
              ? data.tsr2_user_list
              : []

            tsr12['tsr12_tsr_no'] = await data.tsr1_tsr_no
            tsr12['tsr12_subject'] = await data.tsr1_subject
            tsr12['tsr12_created_at'] = await data.tsr1_created_at
            tsr12['tsr12_user_list'] = (await data.tsr2_user_list)
              ? data.tsr2_user_list
              : []
            await this.setState({
              select: NotChange
                ? this.state.select
                : data.tsr1_verified === '1'
                ? this.CoercionSign(data, select)
                : 1,
              tsr1: tsr1,
              tsr2: tsr2,
              tsr3: tsr3,
              tsr4: tsr4,
              tsr5: tsr5,
              tsr6: tsr6,
              tsr7: tsr7,
              tsr8: tsr8,
              tsr9: tsr9,
              tsr10: tsr10,
              tsr11: tsr11,
              tsr12: tsr12,
              status: this.handleStatus(),
              // status:
              //   data.tsr1_verified !== '1' && data.tsr1_verified !== '2'
              //     ? 'disabled'
              //     : status
              //     ? status.status
              //     : null,
              part: status ? status.part : null,
              role: response.data.role,
              level: NotChange
                ? this.state.select
                : data.tsr1_verified === '1'
                ? this.CoercionSign(data, select)
                : 1,
              // can_do_action: status ? status.can_do_action : null,
              can_do_action: status ? true : false,
              make_complete: status ? status.make_complete : null,
              revisions: response.data.content.revisions,
              disabledRev: false,
              msg: status ? status.msg : '',
              user_list: data.tsr2_user_list ? data.tsr2_user_list : [],
              unverify_msg:
                data.tsr1_verified === '0' ? data.tsr1_verify_msg : '',
              verify: data.tsr1_verified === '1',
              requestEdit: requestEdit,
              Signs: Signs
            })
            if (this.ShowFetch) {
              await this.ShowFetch[this.state.select]()
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
  }
  GetShowFetch = (number, fn) => {
    this.ShowFetch[number] = fn
  }
  handleString = str => {
    let result = str.replace(/&amp;/g, '&').replace(/amp;/g, '')
    return result
  }
  CanShow = id => {
    const { status, level } = this.state
    const check = !(
      (status === 'create' || status === 'update') &&
      level === id
    )
    return check
  }
  CanUpdate = id => {
    const { level, status, role } = this.state
    const check =
      level === id &&
      status === 'update' &&
      this.Permision.handlePermision(role, `tsr_update`)
    return check
  }
  handleState = (name, value) => {
    this.setState({ [name]: value })
  }
  handleClose = id => {
    const { status, level } = this.state
    const check = status === 'close' && level === id
    return check
  }
  handleShow = () => {
    switch (this.state.select) {
      case 1:
        return (
          <TechnicalServiceApplication
            show={this.CanShow(1)}
            {...this}
            canUpdate={this.CanUpdate(1)}
            close={this.handleClose(1)}
          />
        )
      case 2:
        return (
          <PreliminaryReview
            show={this.CanShow(2)}
            {...this}
            canUpdate={this.CanUpdate(2)}
            close={this.handleClose(2)}
          />
        )
      case 3:
        return (
          <ProcessTSR
            show={this.CanShow(3)}
            {...this}
            canUpdate={this.CanUpdate(3)}
            close={this.handleClose(3)}
          />
        )
      case 4:
        return (
          <HSE
            show={this.CanShow(4)}
            {...this}
            canUpdate={this.CanUpdate(4)}
            close={this.handleClose(4)}
          />
        )
      case 5:
        return (
          <GeneralEngineering
            show={this.CanShow(5)}
            {...this}
            canUpdate={this.CanUpdate(5)}
            close={this.handleClose(5)}
          />
        )
      case 6:
        return (
          <Committee
            show={this.CanShow(6)}
            {...this}
            canUpdate={this.CanUpdate(6)}
            close={this.handleClose(6)}
          />
        )
      case 7:
        return (
          <WorkOrder
            show={this.CanShow(7)}
            {...this}
            canUpdate={this.CanUpdate(7)}
            close={this.handleClose(7)}
          />
        )
      case 8:
        return (
          <Inspector
            show={this.CanShow(8)}
            {...this}
            canUpdate={this.CanUpdate(8)}
            close={this.handleClose(8)}
          />
        )
      case 9:
        return (
          <AnnouncementEndWork
            show={this.CanShow(9)}
            {...this}
            canUpdate={this.CanUpdate(9)}
            close={this.handleClose(9)}
          />
        )
      case 10:
        return (
          <CheckEndWork
            show={this.CanShow(10)}
            {...this}
            canUpdate={this.CanUpdate(10)}
            close={this.handleClose(10)}
          />
        )
      case 11:
        return (
          <MapDelivery
            show={this.CanShow(11)}
            {...this}
            canUpdate={this.CanUpdate(11)}
            close={this.handleClose(11)}
          />
        )
      case 12:
        return (
          <Effectiveness
            show={this.CanShow(12)}
            {...this}
            canUpdate={this.CanUpdate(12)}
            close={this.handleClose(12)}
          />
        )
      default:
        return ''
    }
  }
  handleVerify = async (accept, value = '') => {
    const { url, itemReject } = await this.state.rejectSelect
    if (url) {
      let a = {}
      if (this.state.token && this.state.id) {
        let datareg = await new FormData()
        await datareg.append('verify_msg', value)
        a['verify_msg'] = value
        // await datareg.append('verify', accept)
        if (itemReject) {
          await itemReject.forEach(async row => {
            await datareg.append(
              row.value,
              row.value === 'verify' ? accept : row.accept
            )
            a[row.value] = row.value === 'verify' ? accept : row.accept
          })
          const notVerify =
            (await itemReject.filter(_row => _row.value === 'verify')
              .length) === 0
          if (notVerify) {
            await datareg.append('verify', accept)
            a['verify'] = accept
          }
        } else {
          if (accept) {
            await datareg.append('verify', accept)
            a['verify'] = accept
          }
        }
        await axios({
          method: 'post',
          url: `${StaticData.domainIp}/tsr/${url}/${this.state.id}`,
          data: datareg,
          headers: {
            Authorization: `Bearer ${
              this.state.token ? this.state.token : null
            }`
          }
        })
          .then(async response => {
            await this.setState({ loading: '', rejectSelect: '' })
            if (response.status === 200) {
              await Notification.notify(Message.text(924), 'success')
              setTimeout(async () => {
                await this.setState({ redirect: true, disabled: false })
              }, 5000)
            } else {
              this.setState({ disabled: false })
              Notification.notify(Message.text(response.status), 'error')
            }
          })
          .catch(err => {
            this.setState({ loading: '', disabled: false, rejectSelect: '' })
            if (err.response) {
              Notification.notify(Message.text(err.response.status), 'error')
            }
          })
      }
    }
  }
  hadnleTab = () => {
    const { select } = this.state
    let listNumber = []
    if (select === 1) {
      listNumber = [1, 2, 3, 4]
    } else if (select > 9) {
      listNumber = [9, 10, 11, 12]
    } else {
      listNumber = [select - 1, select, select + 1, select + 2]
    }
    return listNumber
  }
  handleShowTab = data => {
    const { ListTab, role } = this.state
    let filter = ListTab.filter(tab => parseInt(tab.id) === data)[0]
    const CheckPermission = this.Permision.handlePermision(
      role,
      filter.permision
    )
    if (CheckPermission) {
      return filter
    } else return ''
  }
  handleRev = data => {
    const page = this.state.select,
      tsrid = this.state.id,
      id = data.id
    if (this.ShowFetch[this.state.select]) {
      if (page && tsrid && id) {
        axios
          .get(
            `${StaticData.domainIp}/tsr/getRevisionDetail/${page}/tsr/${tsrid}/id/${id}`,
            {
              headers: {
                Authorization: `Bearer ${this.state.token}`
              }
            }
          )
          .then(async response => {
            this.setState({ loading: '' })
            if (response.status === 200) {
              const state = await response.data.content
              if (state) {
                await this.setState({
                  [`tsr${this.state.select}`]: state,
                  status: 'sign',
                  can_do_action: null,
                  disabledRev: true
                })
                await this.ShowFetch[this.state.select]()
              }
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
  }
  ChangeTab = num => {
    this.setState({ select: num })
    if (this.ResetRev) {
      this.ResetRev()
    }
  }
  handleDocumentMdl = text => {
    this.setState({ loading: 'select' })
    let url = `${StaticData.domainIp}/detailEng/searchInDocuments?documentNumber=${text}`
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(response => {
        this.setState({ loading: '' })
        if (response.status === 200) {
          this.setState({ listData: response.data.content })
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
  ForeignAttachments = list => {
    let check = false
    if (list) {
      let i = 0
      while (i < list.length) {
        let obj = list[i]
        if (obj.Attachement && obj.Attachement.length > 0) {
          check =
            handleCheckText(obj.degreeTitle) && handleCheckText(obj.numberPages)
        } else {
          check = true
        }
        if (!check) {
          break
        }
        i++
      }
    }
    return check
  }
  Internalَttachments = list => {
    let check = false
    if (list) {
      let i = 0
      while (i < list.length) {
        let obj = list[i]
        check =
          handleCheckText(obj.documentNumber) &&
          handleCheckText(obj.degreeTitle)
        if (!check) {
          break
        }
        i++
      }
    }
    return check
  }
  SelctDocumentMdl = async (value, props, workOrder = false) => {
    let url = await `${StaticData.domainIp}/mdl/getDocumentDetailByNumber`
    let datareg = await new FormData()
    await datareg.append('documentNumber', value)
    await axios({
      method: 'post',
      url: url,
      data: datareg,
      headers: {
        Authorization: this.state.token ? `Bearer ${this.state.token}` : null
      }
    })
      .then(async response => {
        const degreeTitle = await response.data.content.activityName
        if (workOrder) {
          let typeWork = props.state.typeWork
          let obj = props.state[typeWork]
          if (obj) {
            let list = obj[props.nameParent]
            let _obj = list[props.index]
            _obj['degreeTitle'] = await degreeTitle
            props.handleState(typeWork, obj)
          }
        } else {
          let list = await props.state[props.nameParent]
          if (list) {
            let obj = await list[props.index]
            obj['degreeTitle'] = await degreeTitle
            await props.handleState(props.nameParent, list)
          }
          if (response.status === 200) {
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        }
      })
      .catch(err => {
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  CheckTab = key => {
    const { verify } = this.state
    const check = verify ? true : key === 0
    return check
  }
  CoercionSign = (data, level) => {
    let list = ListSign.ListMandatory
    let i = 1
    let numResult = level
    let Not_Complete = false
    while (i <= level) {
      let tsr = list[`tsr${i}`]
      if (tsr) {
        let array = tsr.filter(_tsr => !_tsr.mandatory)
        let arraySign = Object.keys(array).map(_value => {
          return array[_value].state
        })
        const CheckFilter = arraySign.filter(
          _sign => data[`tsr${i}_${_sign}`] !== '1'
        )
        Not_Complete = CheckFilter.length > 0
        if (Not_Complete) {
          const SecondCounter = this.CheckResult(data, level)
          this.setState({
            hasNot: true,
            numResult: i === SecondCounter ? i : SecondCounter
          })
          numResult = i === SecondCounter ? i : SecondCounter
          break
        }
      }
      i++
    }
    return numResult
  }
  CheckResult = (data, level) => {
    let number = level
    let _tsr3 = {
      check: data['tsr3_review_result'] !== '0' || !data['tsr3_review_result'],
      num: 3
    }
    let _tsr4 = {
      check: data['tsr4_hse_review'] !== '0' || !data['tsr4_hse_review'],
      num: 4
    }
    let _tsr5 = {
      check: data['tsr5_review_result'] !== '0' || !data['tsr5_review_result'],
      num: 5
    }
    let _tsr6 = {
      check:
        data['tsr6_technical_review'] !== '0' || !data['tsr6_technical_review'],
      num: 6
    }
    let _tsr10 = {
      check:
        data['tsr10_review_result'] !== '0' || !data['tsr10_review_result'],
      num: 10
    }
    if (!_tsr3.check) number = _tsr3.num
    else if (!_tsr4.check) number = _tsr4.num
    else if (!_tsr5.check) number = _tsr5.num
    else if (!_tsr6.check) number = _tsr6.num
    else if (!_tsr10.check) number = _tsr10.num
    return number
  }
  handleCheckShow = id => {
    const { hasNot, numResult } = this.state
    let result = hasNot ? id <= numResult : true
    return result
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
                  nameRole='tsr_show'
                  firstLoading={this.state.firstLoading}
                  nameUrl={this.props.nameUrl}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      {this.state.select && (
                        <div className='title-from d-flex align-items-center py-3'>
                          <div className='col pr-0'>
                            <h2>
                              {this.state.ListTab[this.state.select - 1].title}
                            </h2>
                          </div>
                          {this.state.requestEdit &&
                            this.state.status !== 'update' && (
                              <EditBeforeRequest {...this} />
                            )}
                        </div>
                      )}
                      {this.state.select && (
                        <div className='tab-form rtl'>
                          <div className='col-xl-11 col-lg-11 col-12 row m-0 justify-content-start'>
                            {this.hadnleTab().map(
                              (data, key) =>
                                this.CheckTab(key) &&
                                this.handleCheckShow(
                                  this.handleShowTab(data).id
                                ) && (
                                  // this.handleShowTab(data).id <=
                                  //   this.state.level &&
                                  <div
                                    className={`col-xl-3 col-lg-3 col-3 mr-0 pr-3 pl-0`}
                                    key={key}
                                    onClick={() =>
                                      // this.handleShowTab(data).id <=
                                      //   this.state.level &&
                                      this.ChangeTab(
                                        this.handleShowTab(data).id
                                      )
                                    }
                                  >
                                    <div
                                      className={`item-tab rtl mr-0 w-100 p-0 col-12
                                       ${
                                         this.state.select ===
                                         this.handleShowTab(data).id
                                           ? 'active IranSans_Bold'
                                           : ''
                                       }`}
                                    >
                                      <span>
                                        <label
                                          className={`${
                                            this.state.select ===
                                            this.handleShowTab(data).id
                                              ? 'IranSans_Bold'
                                              : ''
                                          }`}
                                        >
                                          {this.handleShowTab(data).id}.
                                        </label>
                                        {this.handleShowTab(data).nameTab}
                                      </span>
                                    </div>
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      )}
                      <div className='col-xl-8 col-lg-12 col-md-12 col-12'>
                        {handleCheckText(this.state.unverify_msg) && (
                          <div className='col-12'>
                            <div className='message-error'>
                              <label className='strong'>
                                <span className='ml-1'>
                                  tsr {this.state.id}
                                </span>
                                به دلیل زیر بسته شد
                              </label>
                              <p className='m-0'>{this.state.unverify_msg}</p>
                            </div>
                          </div>
                        )}
                        {this.state.status === 'close' &&
                          handleCheckText(this.state.msg) && (
                            <div className='col-12 mt-2'>
                              <div className='message-error'>
                                <label className='strong'>
                                  <span className='ml-1'>
                                    tsr {this.state.id}
                                  </span>
                                  به دلیل زیر بسته شد
                                </label>
                                <p className='m-0'>{this.state.msg}</p>
                              </div>
                            </div>
                          )}
                        {this.Permision.handlePermision(
                          this.state.role,
                          'tsr_revisions'
                        ) && (
                          <Revisions
                            {...this}
                            GetReset={fn => (this.ResetRev = fn)}
                          />
                        )}
                        {this.handleShow()}
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
