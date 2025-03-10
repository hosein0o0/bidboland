import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import StaticData from '../../staticData'
import handleCheckText from '../../handleCheckText'
import axios from 'axios'
import Foreign from '../ShowTsr/Foreign'
import Internal from '../ShowTsr/Internal'
import StaticList from './StaticList'
import getCustomFormat from '../../getCustomFormat'
import handleString from '../../handleString'
import PurchaseRequests from './PurchaseRequests'
import moment from 'moment-jalaali'
import ListTab from './ListTab'
// import handleString from '../../handleString'
class API {
  constructor(props) {
    this.data = props
  }
  handleCheckList = newState => {
    const list = ListTab.List || []
    let result = {}
    // const { handleForeignLink } = this.data.props.API
    list.forEach(data => {
      let name = data.value
      const name_internal = `${name}_internal_attachment`,
        // name_foreign = `${name}_foreign_attachment`,
        name_purchase = `${name}_purchase_request`,
        internal_default = StaticList[name_internal],
        // foreign_default = StaticList[name_foreign],
        purchase_default = StaticList[name_purchase],
        internal = newState[name_internal] || [],
        // foreign = newState[name_foreign] || [],
        purchase = newState[name_purchase] || []
      result[name_internal] = internal.length > 0 ? internal : internal_default
      // result[name_foreign] = handleForeignLink(foreign.length > 0 ? foreign : foreign_default)
      result[name_purchase] = purchase.length > 0 ? purchase : purchase_default
    })
    return result
  }
  handleConvertDate = newState => {
    const list = ListTab.List || []
    const result = {}
    list.forEach(data => {
      let name = `${data.value}_export_date`
      let date = newState[name]
      result[name] = ''
      const check = handleCheckText(date)
      if (check) {
        let convert = moment(date)
          .locale('fa')
          .format(' HH:mm  - jYYYY/jMM/jDD ')
        result[name] = convert
      }
    })
    return result
  }
  Split = () => {
    const { state } = this.data
    const parentState = this.data.props.state || {}
    const { status } = parentState
    const { tab } = state
    const system_status = handleString(status)
    const array_status = system_status.split('_')
    let final_status = handleString(array_status[tab - 1]) || 'show'
    return final_status
  }
  TabValue = () => {
    const { state } = this.data
    const { tab } = state
    const list = ListTab.List || []
    let obj_list = list[tab - 1] || {}
    const name = handleString(obj_list.value)
    return name
  }
  fetchDataAPI = () => {
    const { handleState } = this.data
    let parentState = this.data.props.state || {}
    let newState = parentState['tsr8'] || {}
    // const { export_date } = newState
    const convert_date = this.handleConvertDate(newState)
    let merge = {
      ...newState,
      ...this.handleCheckList(newState),
      ...convert_date
    }
    handleState(merge)
  }
  handleAddAttachAPI = nameState => {
    const { handleState, state } = this.data
    let obj = {}
    let check = false
    const name = this.TabValue()
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
        check = this.CheckForeign()
        break
      case `${name}_internal_attachment`:
        obj = {
          documentNumber: null,
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: ''
        }
        check = this.CheckInternal()
        break
      case `${name}_purchase_request`:
        obj = {
          number: '',
          description: '',
          date: null
        }
        check = true
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
  handlwSwitchPermission = () => {
    const name = this.TabValue()
    const create = `${name}_fill_allow`
    const update = `${name}_update_allow`
    return {
      create: create,
      update: update
    }
  }
  handlCreate = id => {
    const { CheckAllow, state, API } = this.data.props
    const { page, select } = state
    const { handleSwitchid } = API
    let check = false
    if (page >= id) check = true
    else check = false
    const nameAdmin = `tsr${handleSwitchid(select)}admin_update_allow`
    const notAdmin = state[nameAdmin] ? false : true
    const { create } = this.handlwSwitchPermission()
    let allow = CheckAllow(create)
    const result = check && allow && notAdmin
    return result
  }
  handleCheckUpdate = id => {
    let parentState = this.data.props.state || {}
    const { page } = parentState
    const { CheckAllow } = this.data.props
    const { update } = this.handlwSwitchPermission()
    const Allow = CheckAllow(update)
    const check = parseInt(page) === id
    const result = Allow && check
    return result
  }
  handleDisabledAPI = () => {
    const canUpdate = this.handleCheckUpdate(8)
    const canCreate = this.handlCreate(8)
    const check = canUpdate || canCreate
    const result = check
    return !result
  }
  handleDisabledAPIElm = () => {
    const { state } = this.data
    let parentState = this.data.props.state || {}
    const { select } = parentState
    const NameCheckbox = `checkBox_${select}`
    const checkBox = state[NameCheckbox] ? true : false
    const canUpdate = this.handleCheckUpdate(8)
    const canCreate = this.handlCreate(8)
    const check = canUpdate || canCreate
    const result = !check
    return result || checkBox
  }
  CheckForeign = () => {
    const state = this.data.state || {}
    const name = this.TabValue()
    const foreign_attachment = state[`${name}_foreign_attachment`] || []
    let i = 0
    let check = false
    while (i < foreign_attachment.length) {
      let _obj = foreign_attachment[i]
      const { Attachement, AttachementName } = _obj
      check = Attachement.length > 0 && AttachementName.length > 0
      // handleCheckText(degreeTitle)
      if (!check) {
        break
      }
      i++
    }
    return check
  }
  CheckInternal = () => {
    let check = false
    const name = this.TabValue()
    const state = this.data.state || {}
    const internal_attachment = state[`${name}_internal_attachment`] || []
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
      url: `${StaticData.domainIp}/uploadFile/DocumentCenter/ProcessDocument/Tsr/Form8/${tsr_id}`,
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
    let { handleDisabledElm } = this.data
    let parentState = this.data.props.state || {}
    let { edit, status, level, select } = parentState
    let state1 = edit === '0'
    let state2 = status === 'sign' || status === 'reject'
    level = level || 0
    select = select || 0
    let check1 = level >= select
    let check2 = handleDisabledElm()
    let resultCheck = check1 && check2
    let resultState = state1 && state2
    const check = resultCheck || resultState
    return check
  }
  // handleListGroupAPI = () => {
  //   const result = [
  //     {
  //       label: 'بازرسی فنی',
  //       value: 'exporter_group',
  //       name: 'گروه صادر کننده دستورالعمل',
  //       rtl: true,
  //       radio: true,
  //       disabled: true,
  //       items: ListTab.List
  //     }
  //   ]
  //   return result
  // }
  handleListFormAPI = () => {
    const name = this.TabValue()
    const result = [
      {
        value: `${name}_export_date`,
        name: 'تاریخ صدور دستورالعمل',
        date: true,
        rtl: true,
        objectSetState: true,
        isGregorian: false,
        disabled: true
      },
      {
        access: true,
        value: `${name}_instruction_description`,
        name: 'شرح دستورالعمل بازرسی',
        rtl: true,
        textArea: true,
        disabled: this.handleDisabledAPIElm(),
        require: true
      },
      {
        value: `${name}_execution_date`,
        name: 'زمان اجرا',
        date: true,
        rtl: true,
        objectSetState: true,
        isGregorian: false,
        disabled: this.handleDisabledAPIElm()
      },
      {
        class: true,
        html: () => (
          <Foreign
            {...this.data}
            notRequire={true}
            name={`${name}_foreign_attachment`}
            check_disabled={this.handleDisabledAPIElm()}
          />
        ),
        access: true
      },
      {
        class: true,
        html: () => (
          <Internal
            {...this.data}
            name={`${name}_internal_attachment`}
            check_disabled={this.handleDisabledAPIElm()}
          />
        ),
        access: true
      },
      {
        class: true,
        html: () => (
          <PurchaseRequests
            {...this.data}
            name={`${name}_purchase_request`}
            check_disabled={this.handleDisabledAPIElm()}
          />
        ),
        access: true
      }
    ]
    return result
  }
  handleCC = arrayCC => {
    let list = arrayCC || []
    const result = Object.keys(list)
      .map(item => {
        let _obj = list[item]
        return _obj.value
      })
      .join(',')
    return result
  }
  handlePurchaseRequest = purchase_request => {
    let _array = purchase_request || []
    let result = Object.keys(_array).map(item => {
      let obj = _array[item]
      obj['date'] = getCustomFormat(obj.date)
      return obj
    })
    return JSON.stringify(result)
  }
  handleItemSend = (status = '') => {
    let result = {}
    const { state } = this.data
    const { tsr_id } = state
    const nameTab = this.TabValue()
    const instruction_description_name = `${nameTab}_instruction_description`
    const instruction_description = state[instruction_description_name]
    const execution_date_name = `${nameTab}_execution_date`
    const execution_date = getCustomFormat(state[execution_date_name])
    const foreign_attachment_name = `${nameTab}_foreign_attachment`
    const foreign_attachment = JSON.stringify(state[foreign_attachment_name])
    const internal_attachment_name = `${nameTab}_internal_attachment`
    const internal_attachment = JSON.stringify(state[internal_attachment_name])
    const notification_cc_name = `${nameTab}_notification_cc`
    const notification_cc = state[notification_cc_name]
    const purchase_request_name = `${nameTab}_purchase_request`
    const purchase_request = JSON.stringify(state[purchase_request_name])
    result = {
      tsr_id,
      [instruction_description_name]: instruction_description,
      [execution_date_name]: execution_date,
      [foreign_attachment_name]: foreign_attachment,
      [internal_attachment_name]: internal_attachment,
      [purchase_request_name]: purchase_request,
      [purchase_request_name]: purchase_request
    }
    const check =
      handleCheckText(instruction_description) && handleCheckText(tsr_id)
    if (status === 'create') {
      result[notification_cc_name] = this.handleCC(notification_cc || [])
    }
    return { itemData: result, checkItem: check }
  }
  handleSigned = () => {
    const { state } = this.data
    const nameTab = this.TabValue()
    const supervisor_name = `${nameTab}_supervisor_verify_select`,
      supervisor = state[supervisor_name],
      inspection_name = `${nameTab}_inspection_boss_verify_select`,
      inspection = state[inspection_name]
    const { handleCheckSigned } = this.data.props.API
    const check = handleCheckSigned(supervisor) && handleCheckSigned(inspection)
    const data = check
      ? { [`${nameTab}_supervisor_verify_by`]: supervisor.value }
      : {}
    return {
      checkSing: check,
      mainSign: data
    }
  }
  handleSubmitAPI = async () => {
    const { state, handleState } = this.data
    const itemSend = this.handleItemSend('create')
    const dataSign = this.handleSigned()
    const { checkSing, mainSign } = dataSign
    const { itemData, checkItem } = itemSend
    const check = checkSing && checkItem
    if (check) {
      const nameTab = this.TabValue()
      const { token } = state
      const mergeData = { ...mainSign, ...itemData }
      const datareg = new FormData()
      for (let value in mergeData) {
        let ietmSend = mergeData[value]
        datareg.append(value, ietmSend)
      }
      let url = `${StaticData.domainIp}/tsr_v1/tsr8Insert/${nameTab}`
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
    } else Notification.notify(Message.text(99), 'error')
  }
  handleEditAPI = async () => {
    const { state, handleState } = this.data
    const itemSend = this.handleItemSend()
    const { itemData, checkItem } = itemSend
    if (checkItem) {
      const nameTab = this.TabValue()
      const { token } = state
      const datareg = new FormData()
      for (let value in itemData) {
        let ietmSend = itemData[value]
        datareg.append(value, ietmSend)
      }
      let url = `${StaticData.domainIp}/tsr_v1/tsr8Update/${nameTab}`
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
    } else Notification.notify(Message.text(99), 'error')
  }
}
export default API
