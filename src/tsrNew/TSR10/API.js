import handleString from '../../handleString'
import StaticList from './StaticList'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import StaticData from '../../staticData'
import axios from 'axios'
import handleCheckText from '../../handleCheckText'
import getCustomFormat from '../../getCustomFormat'
class API {
  constructor(props) {
    this.data = props
  }
  PrevStateList = array => {
    const result = Object.keys(array).map(item => {
      let obj = array[item] || {}
      obj['PrevConfirmation'] = obj['confirmation']
      return obj
    })
    return result
  }
  handleListManage = newState => {
    let listTab = StaticList.listTab || []
    // let _default = StaticList.defaultState || {}
    const { handleCheckBoxBoolean } = this.data.props.API
    let result = {}
    const verify = handleCheckBoxBoolean('review_result_verify')
    result['review_result_verify'] = verify
    listTab.forEach(item => {
      let { value } = item
      let nameList = `${value}_executed_problems`
      let list = newState[nameList]
      let resultList = this.PrevStateList(list || [])
      result[nameList] = resultList
    })
    return result
  }
  fetchDataAPI = () => {
    let parentState = this.data.props.state || {}
    let newState = parentState['tsr10'] || {}
    const { handleState } = this.data
    let objList = this.handleListManage(newState)
    let merge = { ...newState, ...objList }
    handleState(merge)
  }
  handleSwitchUserUnit = unit => {
    const value_table = this.ValueTable()
    let result = ''
    switch (value_table) {
      case 'repair':
        result =
          unit === 'تعمیرات' ||
          unit === 'برق' ||
          unit === 'ابزاردقیق' ||
          unit === 'مکانیک ثابت' ||
          unit === 'برنامه ریزی' ||
          unit === 'سرویس های تعمیراتی' ||
          unit === 'مکانیک دوار' ||
          unit === 'تجهیزات حساس' ||
          unit === 'پایش وضعیت CM'
        break
      case 'operation':
        result =
          unit === 'بهره برداری' ||
          unit === 'واحدهای پالایش' ||
          unit === 'واحدهای آب و برق و بخار و تأسیسات مشترک'
        break
      case 'fire':
        result =
          unit === 'HSE' || unit === 'ایمنی و آتش نشانی' || unit === 'محیط زیست'
        break
      case 'process':
        result = unit === 'مهندسی فرآیند و کنترل تولید'
        break
      case 'inspection':
        result = unit === 'بازرسی فنی'
        break
      case 'general':
        result = unit === 'مهندسی عمومی و پروژه ها'
        break
      default:
        result = ''
    }

    return result
  }
  handleTextListDispatch = () => {
    const value_table = this.ValueTable()
    let result = []
    switch (value_table) {
      case 'repair':
        result = [
          'تعمیرات',
          'برق',
          'ابزاردقیق',
          'مکانیک ثابت',
          'برنامه ریزی',
          'سرویس های تعمیراتی',
          'مکانیک دوار',
          'تجهیزات حساس',
          'پایش وضعیت CM'
        ]
        break
      case 'operation':
        result = [
          'بهره برداری',
          'واحدهای پالایش',
          'واحدهای آب و برق و بخار و تأسیسات مشترک'
        ]
        break
      case 'fire':
        result = ['HSE', 'ایمنی و آتش نشانی', 'محیط زیست']
        break
      case 'process':
        result = ['مهندسی فرآیند و کنترل تولید']
        break
      case 'inspection':
        result = ['بازرسی فنی']
        break
      case 'general':
        result = ['مهندسی عمومی و پروژه ها']
        break
      default:
        result = []
        break
    }
    return result.join('_SD_')
  }
  ListUserSuperVisor = () => {
    let parentState = this.data.props.state || {}
    let list = parentState['user_list'] || []
    this.handleSwitchUserUnit()
    let unit_select = unit => this.handleSwitchUserUnit(unit)
    let filter = list.filter(user => unit_select(user.user_unit))
    return filter
  }
  ValueTable = () => {
    let { state } = this.data
    let { tab } = state
    let list = StaticList.listTab || []
    let objList = list[tab - 1] || {}
    let { value } = objList
    return handleString(value)
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
    // let state = this.data.state || {}
    // let { tab } = state
    let value_table = this.ValueTable()
    let obj = {
      create: `${value_table}_fill_allow`,
      update: `${value_table}_update_allow`
    }
    return obj
  }
  handlCreate = id => {
    const { CheckAllow, state , API } = this.data.props
    const { page , select} = state
    const { handleSwitchid } = API
    const nameAdmin = `tsr${handleSwitchid(select)}admin_update_allow`
    const notAdmin = state[nameAdmin] ? false : true
    const status = this.Split()
    const check = status === 'create' && parseInt(page) === id
    let { create } = this.SwitchNamePermission()
    const Allow = CheckAllow(create)
    const result = check && Allow && notAdmin
    return result
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
  handleCheckDispatchDisabled = () => {
    let name = this.ValueTable()
    let { state } = this.data
    let { tab } = state
    const nameDis = `checkBox_${`10${tab}`}_${name}`
    const result = state[nameDis] ? true : false
    return result
  }
  handleDisabledAPI = () => {
    const canUpdate = this.handleCheckUpdate(10)
    const canCreate = this.handlCreate(10)
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
  handleSubmitAPI1 = async () => {
    let { state, handleState } = await this.data
    let value_table = await this.ValueTable()
    let { token, tsr_id } = state
    let name = await `${value_table}_supervisor_id`
    let nameValue = await `${value_table}_supervisor`
    let id_user = await state[name]
    let detail_user = state[nameValue] || {}
    let { value, user_role, user_unit } = detail_user
    const check =
      handleCheckText(user_role) &&
      handleCheckText(user_unit) &&
      handleCheckText(value) &&
      handleCheckText(id_user) &&
      value === id_user &&
      handleCheckText(tsr_id)
    if (check) {
      handleState({
        loading: name,
        disabled: true
      })
      let url = `${StaticData.domainIp}/tsr_v1/tsr10Allocation/${value_table}_supervisor`
      const datareg = new FormData()
      datareg.append('tsr_id', tsr_id)
      datareg.append('value', value)
      datareg.append('user_role', user_role)
      datareg.append('user_unit', user_unit)
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
  handleChangeList = (name, value, nameList, key) => {
    let { state, handleState } = this.data
    let list = state[nameList] || []
    let objList = list[key] || {}
    objList[name] = value
    handleState({ nameList: list })
  }
  handleCheckExecutedProblems = nameList => {
    let { state } = this.data
    let list = state[nameList] || []
    let length = list.length
    let i = 0
    let result = true
    while (i < length) {
      let obj = list[i] || {}
      let state1 = handleCheckText(obj.description)
      let state2 = handleCheckText(getCustomFormat(obj.actionDate))
      let result = state1 || state2
      if (!result) break
      i++
    }
    return result
  }
  handleDisabled_Update = id => {
    let { state } = this.data
    const canUpdate = this.handleCheckUpdate(10) ? true : false
    let name_table = this.ValueTable()
    let name_state_update = `${name_table}_state_update`
    let state_update = state[name_state_update]
    const state2 = state_update === id
    const result = canUpdate && state2
    return result
  }
    handleFollwUp() {
      let name_table = this.ValueTable()
    let firstName = `${name_table}_followUp_firstName`
    let lastName = `${name_table}_followUp_lastName`
    let { state } = this.data
    let fname = handleString(state[firstName])
    let lname = handleString(state[lastName])
    let result = `${fname} ${lname}`
    return result
  }
  handleAddAPI = nameList => {
    const check = this.handleCheckExecutedProblems(nameList)
    const d_2 = this.handleDisabled_Update(2)
    const d_3 = this.handleDisabled_Update(3)
    const d_4 = this.handleDisabled_Update(4)
    const check_dis = d_2 || d_3 || d_4
    const disabled2_4 = check_dis ? true : false
    if (check) {
      let obj_add = {
        description: '',
        followUp: this.handleFollwUp(),
        actionDate: null,
        confirmation: 'false',
        _not_disabled: disabled2_4
      }
      let { state, handleState } = this.data
      let list = state[nameList] || []
      list.push(obj_add)
      handleState({
        nameList: list
      })
    } else {
      Notification.notify(Message.text(932), 'error')
    }
  }
  handleDelete = (nameList, key) => {
    let { state, handleState } = this.data
    let list = state[nameList] || []
    list.splice(key, 1)
    handleState({
      [nameList]: list
    })
  }
  handleFilterList = list => {
    let result = list.filter(data => handleCheckText(data.description))
    return result
  }
  handleConvertList = nameList => {
    let { state } = this.data
    let list = state[nameList] || []
    let result = Object.keys(list).map(index => {
      let obj_data = list[index]
      let new_object = {}
      const { description, followUp, confirmation } = obj_data
      let date = getCustomFormat(obj_data['actionDate'])
      new_object['description'] = handleString(description)
      new_object['actionDate'] = date
      new_object['followUp'] = handleString(followUp)
      new_object['confirmation'] = handleString(confirmation)
      return new_object
    })
    const final_result = this.handleFilterList(result)
    return JSON.stringify(final_result)
  }
  handleCheckSign = name => {
    const { handleCheckSigned } = this.data.props.API
    let nameValue = `${name}_boss_select`
    let { state } = this.data
    let sign = state[nameValue]
    const check = handleCheckSigned(sign)
    return check
  }
  handleCC = nameCC => {
    let { state } = this.data
    let cc = state[nameCC] || []
    let result = Object.keys(cc)
      .map(itemcc => {
        let user = cc[itemcc] || {}
        return user.value
      })
      .join(',')
    return result
  }
  handleSubmitAPI = (_edit = false) => {
    let name = this.ValueTable()
    const check_sign = _edit ? true : this.handleCheckSign(name)
    let { state, handleState } = this.data
    let { tsr_id } = state
    const check = check_sign && handleCheckText(tsr_id)
    if (check) {
      let cc = _edit ? '' : this.handleCC(`${name}_notification_cc`)
      let url = `${StaticData.domainIp}/tsr_v1/${_edit ? 'tsr10Update' : 'tsr10Insert'
        }/${name}`
      let { token } = state
      let nameList = `${name}_executed_problems`
      let list = this.handleConvertList(nameList)
      const datareg = new FormData()
      datareg.append('tsr_id', tsr_id)
      datareg.append(nameList, list)
      if (!_edit) {
        datareg.append(`${name}_notification_cc`, cc)
      }
      handleState({
        loading: 'submit',
        disabled: true
      })
      axios({
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
            Notification.notify(Message.text(_edit ? 901 : 900), 'success')
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
  handleReviewSign = (e, data) => {
    const { name } = e.target
    const { value } = data
    const { handleState } = this.data
    handleState({
      [name]: value
    })
  }
  handleListFormAPI = () => {
    const { state } = this.data
    const { review_result_verify_allow } = state
    const result = [
      {
        value: 'review_result_verify',
        radio: true,
        label: 'نتیجه بررسی',
        items: [
          {
            value: true,
            label: 'مورد تایید است'
          },

          {
            value: false,
            label: 'مورد تایید نیست.'
          }
        ],
        rtl: true,
        require: true,
        disabled: review_result_verify_allow ? false : true,
        onchange: (e, data) => this.handleReviewSign(e, data)
      }
    ]
    return result
  }
  handleSubmitReviewAPI = async () => {
    const parentState = this.data.props.state || {}
    let { state, handleState } = await this.data
    const { review_result_verify, token } = await state
    const { id } = await parentState
    const check = await handleCheckText(id)
    if (check) {
      await handleState({
        loading: 'submit',
        disabled: true
      })
      const url = await `${StaticData.domainIp}/tsr_v1/tsr10Sign/review_result/${id}`
      const datareg = await new FormData()
      await datareg.append('verify', review_result_verify ? true : false)
      await datareg.append('verify_msg', '')
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
            Notification.notify(Message.text(930), 'success')
            setTimeout(async () => {
              window.location.reload(true)
              // handleState({ redirect: false, disabled: false })
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
}
export default API
