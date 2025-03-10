import StaticData from '../../staticData'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import axios from 'axios'
import StaticList from './StaticList'
import handleString from '../../handleString'
import Foreign from '../ShowTsr/Foreign'
import Internal from '../ShowTsr/Internal'
import handleCheckText from '../../handleCheckText'
import getCustomFormat from '../../getCustomFormat'
import moment from 'moment-jalaali'
class API {
  constructor(props) {
    this.data = props
  }
  handleMarkList = list => {
    let result = Object.keys(list).map(item => {
      let item_obj = list[item] || {}
      item_obj['marked'] = true
      return item_obj
    })
    return result
  }
  handleEmptyCheck = newState => {
    const { update_allow } = newState
    let list = StaticList.all_groups
    let stateList = newState.all_groups
    let result = stateList || list
    let final_list = update_allow ? this.handleMarkList(result || []) : result
    return { all_groups: final_list }
  }
  handleCheckEngList = newState => {
    let defaultState = StaticList.defaultState
    let listTab = StaticList.listTab || []
    let result = {}
    // const { handleForeignLink } = this.data.props.API
    listTab.forEach(item => {
      let { value } = item
      let instructionName = `${value}_instruction`
      let instructionSave = newState[instructionName] || []
      let instructionDefault = defaultState[instructionName]
      let instructionList =
        instructionSave.length > 0 ? instructionSave : instructionDefault
      result[instructionName] = instructionList
      // let foreign_attachmentName = `${value}_foreign_attachment`
      // let foreign_attachmentSave = newState[foreign_attachmentName] || []
      // let foreign_attachmentDefault = defaultState[foreign_attachmentName]
      // let foreign_attachmentList = foreign_attachmentSave.length > 0 ? foreign_attachmentSave : foreign_attachmentDefault
      // result[foreign_attachmentName] = handleForeignLink(foreign_attachmentList)
      let internal_attachmentName = `${value}_internal_attachment`
      let internal_attachmentSave = newState[internal_attachmentName] || []
      let internal_attachmentDefault = defaultState[internal_attachmentName]
      let internal_attachmentList =
        internal_attachmentSave.length > 0
          ? internal_attachmentSave
          : internal_attachmentDefault
      result[internal_attachmentName] = internal_attachmentList
    })
    return result
  }
  handleDefaultCheckBox = () => {
    let listTab = StaticList.listTab || []
    const { handleCheckBoxBoolean } = this.data.props.API
    let objResult = {}
    listTab.forEach(item => {
      let obj = item || {}
      let name = handleString(obj.value)
      let marked_document_name = `${name}_marked_document`
      let test_result_name = `${name}_test_result`
      let marked_document_value = handleCheckBoxBoolean(marked_document_name)
      let test_result_value = handleCheckBoxBoolean(test_result_name)
      objResult[marked_document_name] = marked_document_value
      objResult[test_result_name] = test_result_value
    })
    return objResult
  }
  handleConvert = date => {
    let convert = moment(date).locale('fa').format(' jYYYY/jMM/jDD ')
    return convert
  }
  handleEndDate = () => {
    const parentState = this.data.props.state
    const data8 = parentState.tsr8 || {}
    const {
      electrical_export_date,
      mechanical_export_date,
      protection_export_date,
      welding_export_date
    } = data8
    let list = [
      { date: electrical_export_date },
      { date: mechanical_export_date },
      { date: protection_export_date },
      { date: welding_export_date }
    ]
    list = list.filter(time => handleCheckText(time.date))
    const { handleSortList } = this.data.props.API
    const sort = handleSortList(list) || []
    let end = sort[0] || {}
    let end_date = this.handleConvert(handleString(end.date))
    return { end_date }
  }
  fetchDataAPI = () => {
    const { handleState } = this.data
    let panrentState = this.data.props.state || {}
    let newState = panrentState.tsr9 || {}
    let merge = {
      ...newState,
      ...this.handleEmptyCheck(newState),
      ...this.handleDefaultCheckBox(),
      ...this.handleCheckEngList(newState),
      ...this.handleEndDate()
    }
    handleState(merge)
  }
  handleCheckList = () => {
    let result = false,
      i = 0
    let { state } = this.data
    let { all_groups } = state
    let array = all_groups || []
    while (i < array.length) {
      let obj = array[i] || {}
      let group = obj.group || []
      result = group.length > 0
      if (!result) break
      i++
    }
    return result
  }
  handleSubmit1 = async (status = false) => {
    const check = this.handleCheckList()
    let { state, handleState } = this.data
    let { token, tsr_id, all_groups } = state
    let url = `${StaticData.domainIp}/tsr_v1/${status ? 'tsr9Update' : 'tsr9Insert'
      }/groups`
    if (check) {
      const datareg = await new FormData()
      await datareg.append('tsr_id', tsr_id)
      await datareg.append('all_groups', JSON.stringify(all_groups))
      await handleState({
        loading: 'submit',
        disabled: true
      })
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          handleState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(
              Message.text(status ? 901 : 900),
              'success'
            )
            setTimeout(async () => {
              window.location.reload(true)
              handleState({ redirect: false, disabled: false })
            }, 5000)
          } else {
            handleState({ disabled: false })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          handleState({ disabled: false, loading: '' })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  Split = () => {
    const { state } = this.data
    const { tab } = state
    const parentState = this.data.props.state || {}
    const status = handleString(parentState.status)
    const arrayStatus = status.split('_')
    let currenttab = tab - 1
    const finalStatus = arrayStatus[currenttab] || 'disabled'
    return finalStatus
  }
  SwitchNamePermission = () => {
    let state = this.data.state || {}
    let { tab } = state
    let obj
    switch (tab) {
      case 1:
        obj = {
          create: 'fixed_mechanical_fill_allow',
          update: 'fixed_mechanical_update_allow'
        }
        break
      case 2:
        obj = {
          create: 'rotating_mechanical_fill_allow',
          update: 'rotating_mechanical_update_allow'
        }
        break
      case 3:
        obj = {
          create: 'electrical_fill_allow',
          update: 'electrical_update_allow'
        }
        break
      case 4:
        obj = {
          create: 'instrument_fill_allow',
          update: 'instrument_update_allow'
        }
        break
      case 5:
        obj = {
          create: 'sensitive_equipment_fill_allow',
          update: 'sensitive_equipment_update_allow'
        }
        break
      case 6:
        obj = {
          create: 'repair_services_fill_allow',
          update: 'repair_services_update_allow'
        }
        break
      default:
        obj = {}
        break
    }
    return obj
  }
  handlCreate = id => {
    const { CheckAllow, state, API } = this.data.props
    const { page, select } = state
    const { handleSwitchid } = API
    const nameAdmin = `tsr${handleSwitchid(select)}admin_update_allow`
    const notAdmin = state[nameAdmin] ? false : true
    const status = this.Split()
    let status1 = status === 'create'
    let status2 = parseInt(page) === id
    const check = status1 && status2
    let { create } = this.SwitchNamePermission()
    const Allow = CheckAllow(create)
    const result = check && Allow && notAdmin
    return result
  }
  handleCheckUpdate = id => {
    let parentState = this.data.props.state || {}
    const { page } = parentState
    const { CheckAllow } = this.data.props
    let { update } = this.SwitchNamePermission()
    const Allow = CheckAllow(update)
    const check1 = parseInt(page) === id
    const result = Allow && check1
    return result
  }
  handleCheckDispatchDisabled = () => {
    let name = this.ValueTab()
    let { state } = this.data
    let { tab } = state
    const nameDis = `checkBox_${`9${tab}`}_${name}`
    const result = state[nameDis] ? true : false
    return result
  }
  handleDisabledAPI = () => {
    const canUpdate = this.handleCheckUpdate(9)
    const canCreate = this.handlCreate(9)
    const check = canUpdate || canCreate
    const result = check
    return !result
  }
  handleDisabledElmAPI = () => {
    const state1 = this.handleCheckDispatchDisabled()
    const state2 = this.handleDisabledAPI()
    const result = state1 || state2
    return result
  }
  handleChangeList = e => {
    let { name, value } = e.target
    let arrayName = handleString(name).split('__')
    let nameTab = arrayName[0] || ''
    let nameElm = arrayName[1] || ''
    let key = arrayName[2] || '0'
    let { state, handleState } = this.data
    let nameListState = `${nameTab}_instruction`
    let list = state[nameListState] || []
    let obj = list[key] || {}
    obj[nameElm] = value
    handleState({
      [nameListState]: list
    })
  }
  ValueTab = () => {
    let { state } = this.data
    let { tab } = state
    let listTab = StaticList.listTab
    let filter = Object.keys(listTab).map(item => {
      let obj = listTab[item] || {}
      return handleString(obj.value)
    })
    let result = filter[tab - 1] || ''
    return result
  }
  ValueTabPersian = () => {
    let { state } = this.data
    let { tab } = state
    let listTab = StaticList.listTab
    let filter = Object.keys(listTab).map(item => {
      let obj = listTab[item] || {}
      return handleString(obj.label)
    })
    let result = filter[tab - 1] || ''
    return result
  }
  handleChangeDateListAPI = (date, tab_value, name, _key) => {
    let { state, handleState } = this.data
    let nameListState = `${tab_value}_instruction`
    let list = state[nameListState] || []
    let obj = list[_key] || {}
    obj[name] = date
    handleState({
      [nameListState]: list
    })
  }
  // handleDeleteAPI = (key, name) => {
  //   let { state, handleState } = this.data
  //   let list = state[name] || []
  //   list.splice(key, 1)
  //   handleState({
  //     [name]: list
  //   })
  // }
  handleAddAPI = name => {
    let defaultObj = {
      group: '',
      instructionNumber: '',
      dateIssuanceInstructions: null,
      wo: '',
      wODate: null,
      startDate: null,
      endDate: null
    }
    const { state, handleState } = this.data
    const list = state[name] || []
    const { length } = list
    const lastObj = list[length - 1]
    const { group, instructionNumber, dateIssuanceInstructions, wo, wODate, startDate, endDate } = lastObj
    const _wODate = getCustomFormat(wODate), _startDate = getCustomFormat(startDate), _endDate = getCustomFormat(endDate)
    const check = handleCheckText(group) && handleCheckText(instructionNumber) && handleCheckText(dateIssuanceInstructions) && handleCheckText(wo) && handleCheckText(_wODate) && handleCheckText(_startDate) && handleCheckText(_endDate)
    if (check) {
      list.push(defaultObj)
      handleState({
        [name]: list
      })
    } else {
      Notification.notify(Message.text(932), 'error')
    }
  }
  handleListFormAPI = () => {
    const { state } = this.data
    let tab_value = this.ValueTab()
    const _disabled = this.handleDisabledElmAPI()
    // const verify_by_state = this.handlCreate(9) ? false : true
    // const verify_by_result = _disabled || verify_by_state
    const marked_document_value = state[`${tab_value}_marked_document`]
      ? true
      : false
    const test_result_value = state[`${tab_value}_test_result`] ? true : false
    const check_require = marked_document_value || test_result_value
    let result = [
      {
        access: true,
        value: `${tab_value}_note`,
        name: 'ملاحظات',
        rtl: true,
        textArea: true,
        disabled: _disabled,
        require: false
      },
      {
        access: true,
        value: `${tab_value}_marked_document`,
        name: 'مدارک MARK UP شده',
        rtl: true,
        checkBox: true,
        disabled: _disabled,
        require: false,
        objState: true
      },
      {
        access: true,
        value: `${tab_value}_test_result`,
        name: 'نتايج تست',
        rtl: true,
        checkBox: true,
        disabled: _disabled,
        require: false,
        objState: true
      },
      {
        class: true,
        html: () => (
          <Foreign
            {...this.data}
            notRequire={check_require ? false : true}
            name={`${tab_value}_foreign_attachment`}
            check_disabled={this.handleDisabledElmAPI()}
          />
        ),
        access: true
      },
      {
        class: true,
        html: () => (
          <Internal
            {...this.data}
            name={`${tab_value}_internal_attachment`}
            check_disabled={this.handleDisabledElmAPI()}
          />
        ),
        access: true
      },
      {
        label: 'پیمانکار اجرایی',
        access: true,
        value: `${tab_value}_contractor_verify_by`,
        name: 'نام پیمانکار',
        rtl: true,
        disabled: _disabled,
        require: true
      },
      {
        name: 'آپلود فایل',
        value: `${tab_value}_contractor_attach`,
        upload: true,
        accept: '*',
        rtl: true,
        single: true,
        require: false,
        disabled: _disabled
      }
    ]
    return result
  }
  CheckForeign = nameState => {
    const state = this.data.state || {}
    const foreign_attachment = state[nameState] || []
    let i = 0
    let check = false
    while (i < foreign_attachment.length) {
      let _obj = foreign_attachment[i]
      const { Attachement, AttachementName, degreeTitle } = _obj
      check =
        Attachement.length > 0 &&
        AttachementName.length > 0 &&
        handleCheckText(degreeTitle)
      if (!check) {
        break
      }
      i++
    }
    return check
  }
  CheckInternal = nameState => {
    let check = false
    const state = this.data.state || {}
    const internal_attachment = state[nameState] || []
    let i = 0
    while (i < internal_attachment.length) {
      let _obj = internal_attachment[i]
      const { degreeTitle, documentNumber } = _obj
      check = handleCheckText(degreeTitle) && handleCheckText(documentNumber)
      if (!check) {
        break
      }
      i++
    }
    return check
  }
  deleteFileListAPI = async (key, num, files, names, parent) => {
    const { handleState } = this.data
    let state = this.data.state
    let _Parent = await state[parent]
    let obj = await _Parent[key]
    let data1 = await obj[files]
    let data2 = await obj[names]
    await data1.splice(num, 1)
    await data2.splice(num, 1)
    await handleState({ [parent]: _Parent })
  }
  handleUploadListAPI = async (e, files, names, parentState) => {
    const { handleState } = this.data
    await e.preventDefault()
    let _files_ = e.target.files
    handleState({ loading: files })
    names = await names.split('_')[0]
    let key = await parseInt(files.split('_')[1])
    files = await files.split('_')[0]
    for (let i = 0; i < _files_.length; i++) {
      let reader = await new FileReader()
      await reader.readAsDataURL(_files_[i])
      await this.GetLinkAPI(
        files,
        _files_[i],
        names,
        _files_.length,
        key,
        i,
        parentState
      )
    }
  }
  GetLinkAPI = (nameState, file, names, length, key, i, parentState) => {
    let { state, handleState } = this.data

    const { token, tsr_id } = state
    let datareg = new FormData()
    let array = state[parentState][key][nameState],
      arrayName = state[parentState][key][names]
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/DocumentCenter/ProcessDocument/Tsr/Form9/${tsr_id}`,
      data: datareg,
      headers: {
        Authorization: token ? `Bearer ${token}` : null
      }
    }).then(async response => {
      if (i + 1 === length) {
        handleState({ loading: '' })
      }
      if (response.status === 200) {
        const { content } = response.data
        await array.push(content)
        await arrayName.push(file.name)
        let _Parent = await state[parentState]
        let obj = await _Parent[key]
        obj[nameState] = await array
        obj[names] = await arrayName
        await handleState({ [parentState]: _Parent })
      } else {
        Notification.notify(Message.text(response.status), 'error')
      }
    })
  }
  handleAddAttachAPI = nameState => {
    const { handleState, state } = this.data
    let obj = {}
    let check = false
    let name = this.ValueTab()
    switch (nameState) {
      case `${name}_foreign_attachment`:
        obj = {
          documentNumber: '',
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: '',
          AttachementName: [],
          Attachement: []
        }
        check = this.CheckForeign(nameState)
        break
      case `${name}_internal_attachment`:
        obj = {
          documentNumber: null,
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: ''
        }
        check = this.CheckInternal(nameState)
        break
      default:
        obj = {}
        break
    }
    if (check) {
      const resultState = { [nameState]: [...state[nameState], obj] }
      handleState(resultState)
    } else {
      Notification.notify(Message.text(932), 'error')
    }
  }
  handleUploadAPI = async (e, files, names) => {
    const { handleState, GetLinkSingle } = this.data
    await e.preventDefault()
    await handleState({ loading: files })
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = await new FileReader()
      await reader.readAsDataURL(e.target.files[i])
      await GetLinkSingle(
        files,
        e.target.files[i],
        names,
        e.target.files.length,
        i
      )
    }
  }
  GetLinkSingleAPI = (nameState, file, names, length, i) => {
    const { handleState, state } = this.data
    const { tsr_id, token } = state
    let datareg = new FormData()
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/DocumentCenter/ProcessDocument/Tsr/Form9/${tsr_id}`,
      data: datareg,
      headers: {
        Authorization: token ? `Bearer ${token}` : null
      }
    })
      .then(async response => {
        if (i + 1 === length) {
          handleState({ loading: '' })
        }
        if (response.status === 200) {
          let nameStateList = state[nameState] || []
          nameStateList.push(response.data.content)
          let namesList = state[names] || []
          namesList.push(file.name)
          await handleState({
            [nameState]: nameStateList,
            [names]: namesList
          })
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        handleState({ loading: '' })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  deleteFileAPI = async (num, files, names) => {
    const { handleState, state } = this.data
    let fileList = await state[files],
      nameList = await state[names]
    if (fileList && nameList) {
      await nameList.splice(num, 1)
      await fileList.splice(num, 1)
      await handleState({ [files]: fileList, [names]: nameList })
    }
  }
  handleDateInstructionList = list => {
    let array = list || []
    let result = Object.keys(array).map(item => {
      let obj = array[item] || {}
      let dateIssuanceInstructions = getCustomFormat(
        obj.dateIssuanceInstructions
      )
      obj['dateIssuanceInstructions'] = dateIssuanceInstructions
      let endDate = getCustomFormat(obj.endDate)
      obj['endDate'] = endDate
      let startDate = getCustomFormat(obj.startDate)
      obj['startDate'] = startDate
      let wODate = getCustomFormat(obj.wODate)
      obj['wODate'] = wODate
      return obj
    })
    return result
  }
  handleNotiCC = array => {
    let result = Object.keys(array).map(item => {
      let obj = array[item] || {}
      return obj.value
    })
    return result.join(',')
  }
  ItemSendData = status_edit => {
    let { state } = this.data
    let { tsr_id } = state
    let result = {}
    let name = this.ValueTab()
    let instruction_name = `${name}_instruction`
    let instruction_list = state[instruction_name] || []
    let instruction = this.handleDateInstructionList(instruction_list)
    let noteName = `${name}_note`
    let note = handleString(state[noteName])
    let marked_documentName = `${name}_marked_document`
    let marked_document = state[marked_documentName] ? true : false
    let test_resultName = `${name}_test_result`
    let test_result = state[test_resultName] ? true : false
    let foreign_attachmentName = `${name}_foreign_attachment`
    let foreign_attachment = state[foreign_attachmentName] || []
    let internal_attachmentName = `${name}_internal_attachment`
    let internal_attachment = state[internal_attachmentName] || []
    let notification_ccName = `${name}_notification_cc`
    let notification_cc = state[notification_ccName] || []
    let contractor_verify_byName = `${name}_contractor_verify_by`
    let contractor_verify_by = state[contractor_verify_byName]
    let contractor_attachName = `${name}_contractor_attach`
    let contractor_attach = state[contractor_attachName] || []
    result['tsr_id'] = tsr_id
    result[instruction_name] = JSON.stringify(instruction)
    result[noteName] = note
    result[marked_documentName] = marked_document
    result[test_resultName] = test_result
    result[foreign_attachmentName] = JSON.stringify(foreign_attachment)
    result[internal_attachmentName] = JSON.stringify(internal_attachment)
    if (!status_edit) {
      result[notification_ccName] = this.handleNotiCC(notification_cc)
    }
    result[contractor_verify_byName] = contractor_verify_by
    result[contractor_attachName] = JSON.stringify(contractor_attach)
    return result
    // }
  }
  handleCheckListInst = array => {
    let i = 0
    let result = false
    while (i < array.length) {
      let obj = array[i] || {}
      result =
        handleCheckText(obj.group) &&
        handleCheckText(obj.instructionNumber) &&
        // handleCheckText(obj.dateIssuanceInstructions) &&
        handleCheckText(obj.wo) &&
        handleCheckText(obj.wODate) &&
        handleCheckText(obj.startDate) &&
        handleCheckText(obj.endDate)
      if (!result) {
        break
      }
      i++
    }
    return result
  }
  handleCheckData = () => {
    let { state } = this.data
    let name = this.ValueTab()
    let instruction_name = `${name}_instruction`
    let instruction_list = state[instruction_name] || []
    let instruction = this.handleDateInstructionList(instruction_list)
    let check1 = this.handleCheckListInst(instruction)
    let contractor_verify_byName = `${name}_contractor_verify_by`
    let contractor_verify_by = state[contractor_verify_byName]
    let check2 = handleCheckText(contractor_verify_by)
    const result = check1 && check2
    return result
  }
  handleSign = () => {
    const { handleCheckSigned } = this.data.props.API
    const name = this.ValueTab()
    let { state } = this.data
    let unit_bossNameSelect = `${name}_unit_boss_select`
    let planning_bossNameSelect = `${name}_planning_unit_boss_select`
    let unit_boss = state[unit_bossNameSelect] || {}
    let planning_boss = state[planning_bossNameSelect] || {}
    const check =
      handleCheckSigned(unit_boss) && handleCheckSigned(planning_boss)
    return check
  }
  handleCheckAttach = name => {
    const { state } = this.data
    const foreign_name = `${name}_foreign_attachment`
    let marked_document_name = `${name}_marked_document`
    let test_result_name = `${name}_test_result`
    const marked = state[marked_document_name] ? true : false
    const test_result = state[test_result_name] ? true : false
    const check_box = marked || test_result
    const check = check_box ? this.CheckForeign(foreign_name) : true
    return check
    // _foreign_attachment
  }
  handleSubmitAPI = async (status_edit = false) => {
    const name = await this.ValueTab()
    const checkSign = status_edit ? true : this.handleSign()
    const check_attach = this.handleCheckAttach(name)
    const check =
      checkSign &&
      this.handleCheckData() &&
      handleCheckText(name) &&
      check_attach
    if (check) {
      let objData = this.ItemSendData(status_edit) || {}
      const { handleState, state } = await this.data
      const { token } = state
      const url = `${StaticData.domainIp}/tsr_v1/${status_edit ? 'tsr9Update' : 'tsr9Insert'
        }/${name}`
      const datareg = await new FormData()
      for (let value in objData) {
        let label = await objData[value]
        await datareg.append(value, label)
      }
      await handleState({
        loading: 'submit',
        disabled: true
      })
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          handleState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              handleState({ redirect: false, disabled: false })
              window.location.reload(true)
            }, 5000)
          } else {
            handleState({ disabled: false })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          handleState({ disabled: false, loading: '' })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else Notification.notify(Message.text(99), 'error')
  }
  handleAddAttachAPI = nameState => {
    const { handleState, state } = this.data
    let obj = {}
    let check = false
    let name = this.ValueTab()
    switch (nameState) {
      case `${name}_foreign_attachment`:
        obj = {
          documentNumber: '',
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: '',
          AttachementName: [],
          Attachement: []
        }
        check = this.CheckForeign(nameState)
        break
      case `${name}_internal_attachment`:
        obj = {
          documentNumber: null,
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: ''
        }
        check = this.CheckInternal(nameState)
        break
      default:
        obj = {}
        break
    }
    if (check) {
      const resultState = { [nameState]: [...state[nameState], obj] }
      handleState(resultState)
    } else {
      Notification.notify(Message.text(932), 'error')
    }
  }
  handleSearchDocument = value => {
    let { handleState } = this.data
    let url = `${StaticData.domainIp}/detailEng/searchInDocuments?documentNumber=${value}`
    const check = value.length > 9
    const checkText = handleCheckText(value)
    if (check && checkText) {
      handleState({ loading: 'document' })
      this._Request(url)
    } else handleState({ listData: [], loading: '' })
  }
  _Request = url => {
    let { handleState, state } = this.data
    const { token } = state
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        handleState({ loading: '' })
        if (response.status === 200) {
          handleState({ listData: response.data.content, loading: '' })
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        handleState({ loading: '' })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  ShowSign = () => {
    let parentState = this.data.props.state || {}
    let { edit, level, select } = parentState
    let status = this.Split()
    let state1 = edit === '0'
    let state2 = status === 'sign' || status === 'reject' || status === 'show'
    level = level || 0
    select = select || 0
    let check1 = level >= select
    let check2 = this.handleDisabledElmAPI()
    let resultCheck = check1 && check2
    let resultState = state1 && state2
    const check = resultCheck || resultState
    return check
  }
  EditReqGroup = async () => {
    const parentState = this.data.props.state || {}
    const { handleState, state } = this.data
    const { token } = state
    const { id, select } = parentState
    let url = `${StaticData.domainIp}/tsr_v1/openUpdate/${id}/page/${select}`
    handleState({
      loading: 'edit-form',
      disabled: true
    })
    await axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: token ? `Bearer ${token}` : null
      }
    })
      .then(async response => {
        await handleState({
          loading: ''
        })
        if (response.status === 200) {
          await Notification.notify(Message.text(936), 'success')
          setTimeout(async () => {
            await handleState({
              disabled: false
            })
            window.location.reload(true)
          }, 5000)
        } else {
          await handleState({
            disabled: false
          })
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        handleState({
          disabled: false,
          loading: ''
        })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  handleChangeGroup = dataget => {
    const { state, handleState } = this.data
    const { all_groups } = state
    const { data, key, newValue } = dataget
    let objState = data
    let filter = newValue.filter(item => !item.__isNew__) || []
    objState['group'] = filter
    let listState = all_groups || []
    listState[key] = objState
    handleState({
      all_groups: listState
    })
    if (filter.length === 0 && listState.length > 1) {
      this.handleDeleteAPI(key, 'all_groups')
    }
  }
  handleDeleteAPI = (key, name) => {
    const { state, handleState } = this.data
    let listState = state[name] || []
    listState.splice(key, 1)
    let array = this.handleArrangement()
    handleState({
      [name]: listState,
      all_groups: array
    })
  }
  handleArrangement = () => {
    let result = []
    const { state } = this.data
    let listState = state.all_groups || []
    listState.forEach((item, index) => {
      item['priority'] = index + 1
      result.push(item)
    })
    return result
  }
  handleShowRemove = (length, checkDis, data) => {
    let state1 = length > 1
    let state2 = checkDis ? false : true
    let state3 = data.marked ? false : true
    let result = state1 && state2 && state3
    return result
  }
  handleCanAddItem = (checkDis, listItem) => {
    let state1 = checkDis ? false : true
    let _list = listItem || []
    let state2 = _list.length > 0
    const result = state1 && state2
    return result
  }
  CheckDisabledGroup = (checkDis, data) => {
    const { state } = this.data
    const { update_allow } = state
    let state1 = checkDis ? true : false
    let state2 = update_allow ? data.marked : state1
    let result = state1 || state2
    return result
  }
}
export default API
