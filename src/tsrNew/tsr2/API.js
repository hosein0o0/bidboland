import RejectReasons from './RejectReasons'
import StaticData from '../../staticData'
import handleCheckText from '../../handleCheckText'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import handleString from '../../handleString'
import axios from 'axios'
class API {
  constructor(props) {
    this.data = props
  }
  ResetIssue = () => {
    const { handleState, state } = this.data
    for (let value in state) {
      if (value.includes('improvement_')) {
        handleState({ [value]: false })
      }
    }
  }
  FetchCreateAPI = () => {
    let state = this.data.props.state || {}
    let {
      //  level,
      // tsr1
      // edit_form
    } = state
    // let page = tsr1.page || '0'
    let { edit } = state
    let newState = state.tsr2 || {}
    // const { handleForeignLink } = this.data.props.API
    let reject_reasons_selected = state.reject_reasons_selected
    let reject_reasons = RejectReasons.list
    let obj = this.RejectReasonsSelected(reject_reasons_selected)
    let merge = { ...newState, ...{ reject_reasons }, ...obj }
    let check_value_ = merge['issued_status']
    merge['issued_status'] = check_value_ === '0' ? false : true
    merge['canchangeDescription'] = edit === '1' ? false : check_value_ === '1'
    // const chekCantRes =
    //   parseInt(page) !== level && edit_form === '21' && edit === '1'
    // merge['chekCantRes'] = chekCantRes
    const checkRes = merge.responsible || []
    let objRes = { user_unit: '', value: '', user_role: '' }
    let res = checkRes.length > 0 ? checkRes : [objRes]
    merge['responsible'] = res
    // const { foreign_attachments } = merge
    // merge['foreign_attachments'] = handleForeignLink(foreign_attachments || [])
    const { handleState } = this.data
    handleState(merge)
  }
  RejectReasonsSelected = data => {
    let text = handleString(data)
    let result = {}
    let list = text.split(',')
    list.forEach(value => {
      if (handleCheckText(value)) {
        let textTrim = value.trim()
        if (textTrim === 'other') {
          result['other'] = true
        } else {
          let finalValue = `improvement_${textTrim}`
          result[finalValue] = true
        }
      }
    })
    return result
  }
  handleSwitchPermission = () => {
    const {
      general_boss_fill_allow,
      tab,
      process_boss_fill_allow,
      inspection_boss_fill_allow
    } = this.data.state
    let result = false
    switch (tab) {
      case 1:
        result = general_boss_fill_allow ? true : false
        break
      case 2:
        result = process_boss_fill_allow ? true : false
        break
      case 3:
        result = inspection_boss_fill_allow ? true : false
        break
      default:
        result = true
        break
    }
    return result
  }
  Split = () => {
    const { state } = this.data
    const { tab } = state
    const parentState = this.data.props.state || {}
    const status = handleString(parentState.status)
    const arrayStatus = status.split('_')
    const finalStatus = arrayStatus[tab - 1] || 'show'
    return finalStatus
  }
  SwitchNamePermission = () => {
    let state = this.data.state || {}
    let { tab } = state
    let obj
    switch (tab) {
      case 1:
        obj = {
          create: 'general_boss_fill_allow',
          update: 'general_boss_update_allow'
        }
        break
      case 2:
        obj = {
          create: 'process_boss_fill_allow',
          update: 'process_boss_update_allow'
        }
        break
      case 3:
        obj = {
          create: 'inspection_boss_fill_allow',
          update: 'inspection_boss_update_allow'
        }
        break
      default:
        obj = {}
        break
    }
    return obj
  }
  handleCheckUpdate = (id) => {
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
    const firstPermission = this.handleSwitchPermission()
    const { CheckAllow, state, API } = this.data.props
    const { handleSwitchid } = API
    const { page, select } = state
    const nameAdmin = `tsr${handleSwitchid(select)}admin_update_allow`
    const notAdmin = state[nameAdmin] ? false : true
    const status = this.Split()
    const check = status === 'create' && parseInt(page) === id
    let { create } = this.SwitchNamePermission()
    const Allow = CheckAllow(create)
    const result = firstPermission && check && Allow && notAdmin
    return result
  }
  handleDisabledAPI = () => {
    const canUpdate = this.handleCheckUpdate(2)
    const canCreate = this.handlCreate(2)
    const check = canUpdate || canCreate
    const result = check
    return !result
  }
  handleUrlAPI = () => {
    const { tab } = this.data.state
    let url = ''
    switch (tab) {
      case 1:
        url = `${StaticData.domainIp}/tsr_v1/tsr2Insert/generalBoss`
        this.handleSubmit1(url)
        break
      case 2:
        url = `${StaticData.domainIp}/tsr_v1/tsr2Insert/processBoss`
        this.handleSubmit2(url)
        break
      case 3:
        url = `${StaticData.domainIp}/tsr_v1/tsr2Insert/inspectionBoss`
        this.handleSubmit2(url)
        break
      default:
        url = ''
        break
    }
    return url
  }
  DescriptionName = () => {
    const { tab } = this.data.state
    let name = ''
    switch (tab) {
      case 1:
        name = 'general_boss_description'
        break
      case 2:
        name = 'process_boss_description'
        break
      case 3:
        name = 'inspection_boss_description'
        break
      default:
        name = ''
        break
    }
    return name
  }
  CheckReasons = () => {
    let list = [],
      state = this.data.state || {}
    const { other } = state
    if (other) {
      list = ['other']
    } else {
      for (let value in state) {
        if (value.includes('improvement_')) {
          if (state[value]) {
            let finalValue = value.replace('improvement_', '')
            list.push(finalValue.trim())
          }
        }
      }
    }
    return list
  }
  CheckResponsible = responsible => {
    let check = false,
      list = responsible || [],
      i = 0
    while (i < list.length) {
      let _obj = list[i]
      const { user_role, user_unit, value } = _obj
      check =
        handleCheckText(user_role) &&
        handleCheckText(user_unit) &&
        handleCheckText(value)

      if (!check) {
        break
      }
      i++
    }
    return check
  }
  handleSubmit1 = async url => {
    const {
      tsr_id,
      issued_status,
      general_boss_description,
      responsible,
      token
    } = this.data.state
    const { handleState } = this.data
    const listReasons = this.CheckReasons()
    const checkReasons = issued_status ? true : listReasons.length > 0
    const checkRes = issued_status ? this.CheckResponsible(responsible) : true
    const checkId = handleCheckText(tsr_id)
    const finalCheck = checkReasons && checkRes && checkId
    if (finalCheck) {
      handleState({ loading: 'submit', disabled: true })
      const datareg = new FormData()
      datareg.append('tsr_id', tsr_id)
      datareg.append('issued_status', issued_status ? 'true' : 'false')
      datareg.append('reject_reasons', listReasons.join(' , '))
      datareg.append(
        'general_boss_description',
        handleString(general_boss_description)
      )
      datareg.append(
        'responsible',
        issued_status ? JSON.stringify(responsible) : []
      )
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
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  handleSubmit2 = async url => {
    const state = (await this.data.state) || {}
    const { tsr_id, token } = await state
    const nameValue = this.DescriptionName()
    const text = handleString(state[nameValue])
    const datareg = await new FormData()
    const check = handleCheckText(tsr_id) && handleCheckText(nameValue)
    const { handleState } = await this.data
    if (check) {
      await datareg.append('tsr_id', tsr_id)
      await datareg.append(nameValue, text)
      await handleState({ loading: 'submit', disabled: true })
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
    }
  }
  handleUrlEditAPI = () => {
    const { tab } = this.data.state
    let url = ''
    switch (tab) {
      case 1:
        url = `${StaticData.domainIp}/tsr_v1/tsr2Update/generalBoss`
        this.handleSubmit1(url)
        break
      case 2:
        url = `${StaticData.domainIp}/tsr_v1/tsr2Update/processBoss`
        this.handleSubmit2(url)
        break
      case 3:
        url = `${StaticData.domainIp}/tsr_v1/tsr2Update/inspectionBoss`
        this.handleSubmit2(url)
        break
      default:
        url = ''
        break
    }
    return url
  }
  ShowSign = () => {
    let { handleDisabledElm } = this.data
    let parentState = this.data.props.state || {}
    let { level, select, edit } = parentState
    const status = this.Split()
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
  handleOtherCheck = () => {
    this.ResetIssue()
    const { handleState, state } = this.data
    const { other } = state
    handleState({
      other: !other
    })
  }
}
export default API
