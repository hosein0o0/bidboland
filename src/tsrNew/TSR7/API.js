import ListTab from './ListTab'
import Foreign from '../ShowTsr/Foreign'
import Internal from '../ShowTsr/Internal'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import axios from 'axios'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import StaticData from '../../staticData'
import StaticList from './StaticList'
import getCustomFormat from '../../getCustomFormat'
class API {
  constructor(props) {
    this.data = props
  }
  handleCheckList = data => {
    let nameArray = StaticList.List
    let object = {}
    // const { handleForeignLink } = this.data.props.API
    nameArray.forEach(value => {
      let defaultList = data[value] || []
      let fixed = StaticList[value]
      let resukt_list = defaultList.length > 0 ? defaultList : fixed
      // if (value.includes('foreign_attachment')) resukt_list = handleForeignLink(resukt_list)
      object[value] = resukt_list
    })
    return object
  }
  finallCheck = data => {
    let state = this.data.state
    let list = ListTab.List || []
    let result = {}
    list.forEach(_item => {
      let { value } = _item
      let nameText = `${value}_instruction`,
        text = data[nameText],
        nameDate = `${value}_time_execution`,
        date = data[nameDate],
        nameCC = `${value}_notification_cc`,
        CC = state[nameCC] || null
      result[nameText] = text
      result[nameDate] = date
      result[nameCC] = CC
    })
    return result
  }
  fetchDataAPI = () => {
    const { handleState } = this.data
    let parentState = this.data.props.state || {}
    let newState = parentState.tsr7 || {}
    let _obj = this.handleCheckList(newState)
    let object = this.finallCheck(newState)
    let merge = { ...newState, ..._obj, ...object }
    handleState(merge)
  }
  Split = () => {
    const { state } = this.data
    const { tab } = state
    const parentState = this.data.props.state || {}
    const status = handleString(parentState.status)
    const arrayStatus = status.split('_')
    let currenttab = tab - 1
    const finalStatus = arrayStatus[currenttab] ? arrayStatus[currenttab] : ''
    return finalStatus
  }
  handleSwitchName = () => {
    let _list = ListTab.List || []
    let { tab } = this.data.state
    let filter = Object.keys(_list).map(_data => {
      let _obj = _list[_data]
      return _obj.value
    })
    let value = filter[tab - 1] ? filter[tab - 1] : ''
    let result = value
    return result
  }
  SwitchNamePermission = () => {
    let state = this.data.state || {}
    let { tab } = state
    let obj
    switch (tab) {
      case 1:
        obj = {
          create: 'mechanical_fill_allow',
          update: 'mechanical_update_allow'
        }
        break
      case 2:
        obj = {
          create: 'electrical_fill_allow',
          update: 'electrical_update_allow'
        }
        break
      case 3:
        obj = {
          create: 'instrument_fill_allow',
          update: 'instrument_update_allow'
        }
        break
      case 4:
        obj = {
          create: 'building_fill_allow',
          update: 'building_update_allow'
        }
        break
      default:
        obj = {}
        break
    }
    return obj
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
  handlCreate = id => {
    const { CheckAllow, state , API } = this.data.props
    let check = false
    const {handleSwitchid}  =API
    const { page , select} = state
    if (page >= id) check = true
    else check = false
    const nameAdmin = `tsr${handleSwitchid(select)}admin_update_allow`
    const notAdmin = state[nameAdmin] ? false : true
    let { create } = this.SwitchNamePermission()
    const Allow = CheckAllow(create)
    const result = check && Allow && notAdmin
    return result
  }
  handleDisabledAPI = () => {
    const canUpdate = this.handleCheckUpdate(7)
    const canCreate = this.handlCreate(7)
    const check = canUpdate || canCreate
    const result = check
    return !result
  }
  handleDisabledAPIElm = () => {
    let name = this.handleSwitchName()
    const { state } = this.data
    const { tab } = state
    let parentState = this.data.props.state || {}
    const { select } = parentState
    const NameCheckbox = `checkBox_${select}${tab}_${name}`
    const checkBox = state[NameCheckbox] ? true : false
    const canUpdate = this.handleCheckUpdate(7)
    const canCreate = this.handlCreate(7)
    const check = canUpdate || canCreate
    const result = !check
    return result || checkBox
  }
  CheckForeign = nameState => {
    const state = this.data.state || {}
    const foreign_attachment = state[nameState] || []
    let i = 0
    let check = false
    while (i < foreign_attachment.length) {
      let _obj = foreign_attachment[i]
      const { Attachement, AttachementName, degreeTitle } = _obj
      check = Attachement.length > 0 && AttachementName.length > 0
      // handleCheckText(degreeTitle)
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
      url: `${StaticData.domainIp}/uploadFile/DocumentCenter/ProcessDocument/Tsr/Form7/${tsr_id}`,
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
    let name = this.handleSwitchName()
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
  handleListFormAPI = () => {
    let name = this.handleSwitchName()
    let data = [
      {
        label: 'دستور کار',
        access: true,
        value: `${name}_instruction`,
        name: 'شرح دستور العمل',
        rtl: true,
        textArea: true,
        disabled: this.handleDisabledAPIElm(),
        require: true
      },
      {
        value: `${name}_time_execution`,
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
      }
    ]
    return data
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
    let { edit, level, select } = parentState
    let status = this.Split()
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
  handleCC = cc => {
    let list = cc || []
    let filter = Object.keys(list).map(_data => {
      let _obj = list[_data]
      return _obj.value
    })
    return filter.join(',')
  }
  handleDataSend = status => {
    let name = this.handleSwitchName()
    let { state } = this.data
    let { tsr_id } = state
    const checkText = handleCheckText(state[`${name}_instruction`])
    let result = {
      tsr_id,
      [`${name}_instruction`]: handleString(state[`${name}_instruction`]),
      [`${name}_time_execution`]: getCustomFormat(
        state[`${name}_time_execution`]
      ),
      [`${name}_foreign_attachment`]: JSON.stringify(
        state[`${name}_foreign_attachment`] || []
      ),
      [`${name}_internal_attachment`]: JSON.stringify(
        state[`${name}_internal_attachment`] || []
      )
    }
    if (status === 'create') {
      result[`${name}_notification_cc`] = this.handleCC(
        state[`${name}_notification_cc`]
      )
    }
    return { result, checkText }
  }
  handleSign = () => {
    const { handleCheckSigned } = this.data.props.API
    let name = this.handleSwitchName()
    let { state } = this.data
    let name_supervisor_select = `${name}_supervisor_select`,
      supervisor_select = state[name_supervisor_select],
      name_general_boss = `general_boss_${name}_select`,
      general_boss = state[name_general_boss],
      name_technical_boss = `technical_boss_${name}_select`,
      technical_boss = state[name_technical_boss]
    const check =
      handleCheckSigned(supervisor_select) &&
      handleCheckSigned(general_boss) &&
      handleCheckSigned(technical_boss)
    return {
      check_sign: check,
      dataSign: check
        ? { [`${name}_supervisor_verify_by`]: supervisor_select.value }
        : {}
    }
  }
  handleSwitchSubmit = async () => {
    let dataSend = await this.handleDataSend('create')
    let sign = await this.handleSign()
    let { check_sign, dataSign } = await sign
    let { result, checkText } = await dataSend
    const checkFinal = check_sign && checkText
    if (checkFinal) {
      const { handleState, state } = this.data
      await handleState({
        loading: 'submit',
        disabled: true
      })
      const { token } = state
      let nameTab = this.handleSwitchName()
      const mergeFinal = await { ...dataSign, ...result }
      const datareg = await new FormData()
      for (let name in mergeFinal) {
        let value = await mergeFinal[name]
        await datareg.append(name, value)
      }
      let url = `${StaticData.domainIp}/tsr_v1/tsr7Insert/${nameTab}`
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
    let dataSend = await this.handleDataSend()
    let { result, checkText } = await dataSend
    if (checkText) {
      const { handleState, state } = this.data
      const { token } = state
      let nameTab = this.handleSwitchName()
      await handleState({
        loading: 'submit',
        disabled: true
      })
      const datareg = await new FormData()
      for (let name in result) {
        let value = await result[name]
        await datareg.append(name, value)
      }
      let url = `${StaticData.domainIp}/tsr_v1/tsr7Update/${nameTab}`
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
