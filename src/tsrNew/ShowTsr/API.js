import axios from 'axios'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import StaticData from '../../staticData'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import moment from 'moment-jalaali'
import ListSign from '../ListSign'
// import CheckDownload from '../../CheckDownload'
class API {
  constructor(props) {
    this.data = props
  }
  handleSeparation = (num, data) => {
    let empty_fr = [
      {
        documentNumber: '',
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: '',
        AttachementName: [],
        Attachement: []
      }
    ]
    let name = `tsr${num}_`
    let result = {
      status_copy: handleString(data.tsr1_status)
    }
    for (let value in data) {
      if (value.includes(name)) {
        let _nameRebuild = value.replace(name, '')
        let ValueSend = data[value]
        if (_nameRebuild.includes('foreign_attachment')) {
          // result[_nameRebuild] = this.handleForeignLink(ValueSend || [])
          result[_nameRebuild] = ValueSend || empty_fr
        } else result[_nameRebuild] = ValueSend
      }
    }
    let obj = { [`tsr${num}`]: result }
    return obj
  }
  PermissiobEditOpen = (data, nameP) => {
    let object = {}
    for (let value in data) {
      if (value.includes(nameP)) {
        let answer = data[value]
        object[value] = answer ? true : false
      }
    }
    return object
  }
  SplitNum = num => {
    let splitArray = num.toString().split('') || []
    let { length } = splitArray
    let number = 0,
      tab = 0
    switch (length) {
      case 2:
        number = splitArray[0]
        tab = splitArray[1]
        break
      case 3:
        number = `${splitArray[0]}${splitArray[1]}`
        tab = splitArray[2]
        break
      default:
        number = 0
        tab = 0
        break
    }
    number = parseInt(number)
    tab = parseInt(tab)
    return { number, tab }
  }
  FoundSelect = (edit_form, _obj) => {
    let num = parseInt(edit_form) || 1
    let checkLarger = num > 12
    if (checkLarger) {
      let { number } = this.SplitNum(num)
      num = number
    }
    return num
  }
  handleSetSelect = (data, _obj) => {
    let { tsr1_edit, tsr1_page, tsr1_edit_form } = data
    const check = tsr1_edit === '1'
    let select = check
      ? this.FoundSelect(tsr1_edit_form, _obj)
      : parseInt(tsr1_page)
    return select
  }
  handleRemoveAuthor = ({ total_list, nameTab, userDetail }) => {
    const { state, ListSign } = this.data
    const { ListMandatory } = ListSign
    const { select } = state
    let id = this.handleSwitchTsrSignId(select)
    let list = ListMandatory[`tsr${id}`] || []
    const filter_list = list.filter(data => data.not_dispatch)
    const obj_filter = filter_list[0] || {}
    const data = state[`tsr${select}`] || {}
    let { filter, filter3 } = obj_filter
    let new_list = [
      { value: handleString(data[filter]) },
      { value: handleString(data[filter3]) }
    ]
    const results = total_list.filter(
      ({ value: id1, label: label }) => !new_list.some(({ value: id2 }) => id2 === id1) && userDetail.name !== label
    )
    const nameEmpty = handleCheckText(nameTab) ? `${nameTab}_update_dispatch_empty` : 'update_dispatch_empty',
      update_dispatch_empty = data[nameEmpty] ? true : false
    const objEmpty = { value: 'empty', label: 'حذف دستگردانی' }
    if (update_dispatch_empty) results.unshift(objEmpty)
    return results
  }
  handleUniqUser = array => {
    const uniq = [...new Map(array.map(item => [item.value, item])).values()]
    return uniq
  }
  FetchApi = async (url, status) => {
    const { state, handleState } = this.data
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      })
      .then(async response => {
        handleState({ loading: '', firstLoading: false })
        if (response.status === 200) {
          const { content, role } = response.data
          const { data } = content
          const level = data.level
          let _obj = {}
          let _select = this.handleSetSelect(data, _obj)
          for (let i = 1; i < 13; i++) {
            _obj = await { ..._obj, ...this.handleSeparation(i, data) }
          }
          _obj['revisions'] = (await content.revisions) || []
          _obj['role'] = await role
          _obj['page'] = await _select
          if (status !== 'endrev') {
            _obj['select'] = await _select
            _obj['level'] = await level
          }
          _obj['applicant_unit_select'] = await data.tsr1_applicant_unit
          _obj['status'] = await data.tsr1_status
          _obj['tsr_no'] = await _obj.tsr1.tsr_no
          _obj['created_at_date'] = await _obj.tsr1.created_at_date
          _obj['subject'] = await _obj.tsr1.subject
          _obj['user_list'] = await this.handleUniqUser(data.AllUserList || [])
          _obj['reject_reasons_selected'] = await data.tsr2_reject_reasons
          _obj['edit'] = await data.tsr1_edit
          _obj['edit_form'] = await data.tsr1_edit_form
          _obj['edit_admin'] = await data.tsr1_edit_admin
          _obj['selectRev'] = await ''
          _obj['_can_sign'] = 'yes'
          _obj['note_counts'] =data.note_counts || []
          _obj['dispatch_history'] = (await data.dispatch_history) || {}
          const objP = this.PermissiobEditOpen(data, 'can_open_edit')
          const objPAdmin = this.PermissiobEditOpen(data, 'admin_update_allow')
          const merge = { ..._obj, ...objP, ...objPAdmin }
          await handleState(merge)
        }
      })
      .catch(err => {
        handleState({ loading: '', firstLoading: false })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  handleSwitch(status, message) {
    switch (status) {
      case 'accepted':
        return {
          verify: true,
          verify_msg: handleString(message)
        }
      case 'reject':
        return {
          verify: false,
          verify_msg: handleString(message),
          reject_this_step: true
        }
      case 'comment':
        return {
          verify: false,
          verify_msg: handleString(message),
          edit_this_step: true
        }
      default:
        return {}
    }
  }
  handleVerify = async (status, data, message) => {
    const { handleState } = this.data
    let result = await this.handleSwitch(status, message)
    const { id, token } = await this.data.state
    let url = await `${StaticData.domainIp}/tsr_v1/${data.url}/${id}`
    if (handleCheckText(token) && handleCheckText(id)) {
      const datareg = await new FormData()
      let a = {}
      for (let item in result) {
        let _value = result[item]
        a[item] = _value
        await datareg.append(item, _value)
      }
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          await handleState({ loading: '', rejectSelect: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(924), 'success')
            setTimeout(async () => {
              window.location.reload(true)
              // await handleState({ redirect: false, disabled: false })
            }, 5000)
          } else {
            handleState({ disabled: false })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          handleState({ loading: '', disabled: false, rejectSelect: '' })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  handleMultiTabNumber = id => {
    let { state } = this.data
    let num = state[`tab_${id}`] || 0
    // let result = num
    return num
  }
  handleSwitchTsrSignId = _select => {
    let result = ''
    switch (_select) {
      case 7:
        let first7 = _select
        let second7 = this.handleMultiTabNumber(_select)
        if (second7) {
          result = `${first7}_${second7}`
        }
        break
      case 8:
        let first8 = _select
        let second8 = this.handleMultiTabNumber(_select)
        if (second8) {
          result = `${first8}_${second8}`
        }
        break
      case 9:
        let first9 = _select
        let second9 = this.handleMultiTabNumber(_select)
        if (second9) {
          result = `${first9}_${second9}`
        }
        break
      case 10:
        let first10 = _select
        let second10 = this.handleMultiTabNumber(_select)
        if (second10) {
          result = `${first10}_${second10}`
        }
        break
      default:
        result = _select
    }
    return result.toString()
  }
  handleSwitchid = _select => {
    let result = ''
    switch (_select) {
      case 2:
        let first2 = _select
        let second2 = this.handleMultiTabNumber(_select)
        if (second2) {
          result = `${first2}${second2}`
          result = parseInt(result)
        }
        break
      case 6:
        let first6 = _select
        let second6 = this.handleMultiTabNumber(_select)
        if (second6) {
          result = `${first6}${second6}`
          result = parseInt(result)
        }
        break
      case 7:
        let first7 = _select
        let second7 = this.handleMultiTabNumber(_select)
        if (second7) {
          result = `${first7}${second7}`
          result = parseInt(result)
        }
        break
      case 8:
        let first8 = _select
        let second8 = this.handleMultiTabNumber(_select)
        if (second8) {
          result = `${first8}${second8}`
          result = parseInt(result)
        }
        break
      case 9:
        let first9 = _select
        let second9 = this.handleMultiTabNumber(_select)
        if (second9) {
          result = `${first9}${second9}`
          result = parseInt(result)
        }
        break
      case 10:
        let first10 = _select
        let second10 = this.handleMultiTabNumber(_select)
        if (second10) {
          result = `${first10}${second10}`
          result = parseInt(result)
        }
        break
      default:
        result = _select
    }
    return result.toString()
  }
  handleOpenEditAdmin = async () => {
    let state = this.data.state || {}
    let { id, select, token } = state
    const { handleState } = this.data
    let number = this.handleSwitchid(select)
    let url = `${StaticData.domainIp}/tsr_v1/openUpdateAdmin/${id}/page/${number}`
    handleState({
      loading: 'edit-form-admin',
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
          await Notification.notify(Message.text(926), 'success')
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
  handleOpenEdit = async () => {
    let state = this.data.state || {}
    let { id, select, token } = state
    const { handleState } = this.data
    let number = this.handleSwitchid(select)
    let url = `${StaticData.domainIp}/tsr_v1/openUpdate/${id}/page/${number}`
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
          await Notification.notify(Message.text(926), 'success')
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
  filterUser = (value, name) => {
    const check = handleCheckText(value) && handleCheckText(name)
    let result = []
    if (check) {
      let state = this.data.state || {}
      let user_list = state.user_list || []
      let arrayName = name.split('_SD_')
      arrayName.forEach(_name => {
        let _list = user_list.filter(user => user[value] === _name)
        result = result.concat(_list)
      })
    }
    return result
  }
  fullListUser = () => {
    let state = this.data.state || {}
    let user_list = state.user_list || []
    return user_list
  }
  handleCheckSigned = data => {
    let list = this.fullListUser()
    const check = typeof data === 'object' && data
    let result = false
    if (check) {
      let _obj = data || {}
      let { value } = _obj
      let filter = list.filter(user => user.value === value)
      result = filter.length === 1
    }
    return result
  }
  handleDispatchUpdate = async name => {
    const { handleState, state } = this.data
    let { id, token, select } = state
    // const pageData = state[`tsr${select}`] || {}
    let data = state[name] || {}
    // const { dispatch_date } = this.handleNameDispatch()
    // const dispatch_at = handleString(pageData[dispatch_date])
    const { value, user_role, user_unit } = data
    let number = this.handleSwitchid(select)

    const checkEmpty = value === 'empty'
    const check = handleCheckText(value) &&
      handleCheckText(user_role) &&
      handleCheckText(user_unit) &&
      handleCheckText(id)
    const checkResult = checkEmpty || check
    if (checkResult) {
      handleState({ loading: name, disabled: true })
      const url = `${StaticData.domainIp}/tsr_v1/dispatchUpdate/${number}`
      const datareg = await new FormData()
      await datareg.append('tsr_id', handleString(id))
      await datareg.append('value', handleString(value))
      await datareg.append('user_role', handleString(user_role))
      await datareg.append('user_unit', handleString(user_unit))
      // await datareg.append('dispatch_at', dispatch_at)
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          await handleState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(921), 'success')
            setTimeout(() => {
              handleState({ redirect: false, disabled: false })
              window.location.reload(true)
            }, 5000)
          } else {
            handleState({ disabled: false })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          handleState({ loading: '', disabled: false })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  handleDispatch = async name => {
    const { handleState, state } = this.data
    let { id, token, select } = state
    let data = state[name] || {}
    let { value, user_role, user_unit } = data
    let number = this.handleSwitchid(select)
    const checkEmpty = value === 'empty'
    const check =
      handleCheckText(value) &&
      handleCheckText(user_role) &&
      handleCheckText(user_unit) &&
      handleCheckText(id)
    const checkResult = checkEmpty || check
    if (checkResult) {
      handleState({ loading: name, disabled: true })
      const url = `${StaticData.domainIp}/tsr_v1/dispatch/${number}`
      const datareg = await new FormData()
      await datareg.append('tsr_id', handleString(id))
      await datareg.append('value', handleString(value))
      await datareg.append('user_role', handleString(user_role))
      await datareg.append('user_unit', handleString(user_unit))
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          await handleState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(929), 'success')
            setTimeout(() => {
              handleState({ redirect: false, disabled: false })
              window.location.reload(true)
            }, 5000)
          } else {
            handleState({ disabled: false })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          handleState({ loading: '', disabled: false })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  CheckPermissionOpenEdit = () => {
    let state = this.data.state || {}
    let { select, edit, edit_form } = state
    let number = this.handleSwitchid(select)
    const check1 = edit === '1' && edit_form === number
    return check1
  }
  handleControlDispatch = data => {
    let result = {}
    const { dispatch_lastName, dispatch_firstName } = this.handleNameDispatch()
    let fname = data[dispatch_firstName],
      lname = data[dispatch_lastName]
    const checkF_L = handleCheckText(fname) && handleCheckText(lname)
    if (checkF_L) {
      result[dispatch_lastName] = lname
      result[dispatch_firstName] = fname
    } else {
      result[dispatch_lastName] = null
      result[dispatch_firstName] = null
    }
    return result
  }
  handleRevision = url => {
    let { state, handleState } = this.data
    let {
      token,
      select,
      dispatch_history
      // selectRev,
    } = state
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async response => {
        handleState({ loading: '' })
        if (response.status === 200) {
          const { content } = await response.data
          let tsr = await `tsr${select}`
          await handleState({
            [tsr]: {}
          })
          const { dispatch_history_rev } = content
          let switchId = this.handleSwitchid(select)
          let nameObj = `form${switchId}_history`
          let dispatch_controll = await this.handleControlDispatch(content)
          let obj_history = dispatch_history_rev || {}
          let result_history = obj_history[nameObj] || []
          obj_history[nameObj] = result_history
          let merge_hostory = { ...dispatch_history, ...obj_history }
          let merge = await { ...content, ...dispatch_controll }
          await handleState({
            [tsr]: merge,
            status: `rev_show_${select}`,
            _can_sign: 'yes',
            dispatch_history: merge_hostory
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
  handleCancell = async () => {
    let { state } = await this.data
    let { id, token } = await state
    let result = {}
    if (handleCheckText(id)) {
      let url = await `${StaticData.domainIp}/tsr_v1/closeUpdate/${id}`
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          result = response
          if (response.status === 200) {
            Notification.notify(Message.text(933), 'success')
            setTimeout(() => {
              window.location.reload(true)
            }, 5000);
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
    return result
  }
  CloseComment = async () => {
    let { state } = await this.data
    let { id, token, select } = await state
    let result = {}
    if (handleCheckText(id)) {
      let pageNumber = this.handleSwitchid(select)
      let url = await `${StaticData.domainIp}/tsr_v1/closeComment/${id}/page/${pageNumber}`
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          result = response
          if (response.status === 200) {
            Notification.notify(Message.text(933), 'success')
            setTimeout(() => {
              window.location.reload(true)
            }, 5000);
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
    return result
  }
  handleAllLIst = (filter, _state) => {
    let array = []
    let datejs = _date => new Date(_date)
    filter.map(_data => {
      let result = {}
      let verify = _state[_data.message] || {}
      if (verify) {
        let verify_at = verify.verify_at || []
        let verify_msg = verify.verify_msg || []
        let verify_by = verify.verify_by || []
        if (verify_at.length === verify_msg.length) {
          verify_msg.forEach((message, index) => {
            let date = verify_at[index]
            let name = _data.name
            let full_name = verify_by[index]
            result = {
              date: datejs(date),
              name: handleString(name),
              message: handleString(message),
              full_name: handleString(full_name)
            }
            array.push(result)
          })
        }
      }
    })
    return array
  }
  handleSortList = array => {
    let sort = array.sort(function (a, b) {
      let result = new Date(b.date) - new Date(a.date)
      return result
    })
    return sort
  }
  handleConvertDate = list => {
    let array = Object.keys(list).map(item => {
      let _data = list[item] || {}
      let _date = _data.date || null
      if (_date) {
        let convert = moment(_date)
          .locale('fa')
          .format(' HH:mm  - jYYYY/jMM/jDD ')
        _data['date'] = convert
      }
      return _data
    })
    return array
  }
  handleMergeList = (filter, _state) => {
    let allList = this.handleAllLIst(filter, _state)
    let sort = this.handleSortList(allList)
    let list = this.handleConvertDate(sort)
    return list
  }
  handleListReject = () => {
    const { state } = this.data
    let { select } = state
    let defaultName = `tsr${select}`
    const history = [
      {
        name: 'مدیر خدمات فنی',
        message: 'reject_reason_history_for_verified'
      }
    ]
    let _state = state[defaultName] || {}
    let allList = this.handleAllLIst(history, _state)
    let sort = this.handleSortList(allList)
    let list = this.handleConvertDate(sort)
    return list
  }
  handleNameDispatch = () => {
    let result = {
      dispatch_firstName: 'dispatch_firstName',
      dispatch_lastName: 'dispatch_lastName',
      dispatch_date: 'dispatch_at'
    }
    let { state } = this.data
    let { select, tab_7, tab_9, tab_10, tab_8 } = state
    switch (select) {
      case 7:
        switch (tab_7) {
          case 1:
            return {
              dispatch_firstName: 'mechanical_dispatch_firstName',
              dispatch_lastName: 'mechanical_dispatch_lastName',
              dispatch_date: 'mechanical_dispatch_at'
            }
          case 2:
            return {
              dispatch_firstName: 'electrical_dispatch_firstName',
              dispatch_lastName: 'electrical_dispatch_lastName',
              dispatch_date: 'electrical_dispatch_at'
            }
          case 3:
            return {
              dispatch_firstName: 'instrument_dispatch_firstName',
              dispatch_lastName: 'instrument_dispatch_lastName',
              dispatch_date: 'instrument_dispatch_at'
            }
          case 4:
            return {
              dispatch_firstName: 'building_dispatch_firstName',
              dispatch_lastName: 'building_dispatch_lastName',
              dispatch_date: 'building_dispatch_at'
            }
          default:
            return result
        }
      case 8:
        switch (tab_8) {
          case 1:
            return {
              dispatch_firstName: 'electrical_dispatch_firstName',
              dispatch_lastName: 'electrical_dispatch_lastName',
              dispatch_date: 'electrical_dispatch_at'
            }
          case 2:
            return {
              dispatch_firstName: 'mechanical_dispatch_firstName',
              dispatch_lastName: 'mechanical_dispatch_lastName',
              dispatch_date: 'mechanical_dispatch_at'
            }
          case 3:
            return {
              dispatch_firstName: 'protection_dispatch_firstName',
              dispatch_lastName: 'protection_dispatch_lastName',
              dispatch_date: 'protection_dispatch_at'
            }
          case 4:
            return {
              dispatch_firstName: 'welding_dispatch_firstName',
              dispatch_lastName: 'welding_dispatch_lastName',
              dispatch_date: 'welding_dispatch_at'
            }
          default:
            return result
        }
      case 9:
        switch (tab_9) {
          case 1:
            return {
              dispatch_firstName: 'fixed_mechanical_dispatch_firstName',
              dispatch_lastName: 'fixed_mechanical_dispatch_lastName',
              dispatch_date: 'fixed_mechanical_dispatch_at'
            }
          case 2:
            return {
              dispatch_firstName: 'rotating_mechanical_dispatch_firstName',
              dispatch_lastName: 'rotating_mechanical_dispatch_lastName',
              dispatch_date: 'rotating_mechanical_dispatch_at'
            }
          case 3:
            return {
              dispatch_firstName: 'electrical_dispatch_firstName',
              dispatch_lastName: 'electrical_dispatch_lastName',
              dispatch_date: 'electrical_dispatch_at'
            }
          case 4:
            return {
              dispatch_firstName: 'instrument_dispatch_firstName',
              dispatch_lastName: 'instrument_dispatch_lastName',
              dispatch_date: 'instrument_dispatch_at'
            }
          case 5:
            return {
              dispatch_firstName: 'sensitive_equipment_dispatch_firstName',
              dispatch_lastName: 'sensitive_equipment_dispatch_lastName',
              dispatch_date: 'sensitive_equipment_dispatch_at'
            }
          case 6:
            return {
              dispatch_firstName: 'repair_services_dispatch_firstName',
              dispatch_lastName: 'repair_services_dispatch_lastName',
              dispatch_date: 'repair_services_dispatch_at'
            }
          default:
            return result
        }
      case 10:
        switch (tab_10) {
          case 1:
            return {
              dispatch_firstName: 'repair_dispatch_firstName',
              dispatch_lastName: 'repair_dispatch_lastName',
              dispatch_date: 'repair_dispatch_at'
            }
          case 2:
            return {
              dispatch_firstName: 'operation_dispatch_firstName',
              dispatch_lastName: 'operation_dispatch_lastName',
              dispatch_date: 'operation_dispatch_at'
            }
          case 3:
            return {
              dispatch_firstName: 'fire_dispatch_firstName',
              dispatch_lastName: 'fire_dispatch_lastName',
              dispatch_date: 'fire_dispatch_at'
            }
          case 4:
            return {
              dispatch_firstName: 'process_dispatch_firstName',
              dispatch_lastName: 'process_dispatch_lastName',
              dispatch_date: 'process_dispatch_at'
            }
          case 5:
            return {
              dispatch_firstName: 'inspection_dispatch_firstName',
              dispatch_lastName: 'inspection_dispatch_lastName',
              dispatch_date: 'inspection_dispatch_at'
            }
          case 6:
            return {
              dispatch_firstName: 'general_dispatch_firstName',
              dispatch_lastName: 'general_dispatch_lastName',
              dispatch_date: 'general_dispatch_at'
            }
          default:
            return result
        }
      default:
        return result
    }
  }
  handleNameCheckDispatch = () => {
    let { state } = this.data
    let { select, tab_7, tab_9, tab_10, tab_8 } = state
    let result = ''
    switch (select) {
      case 7:
        switch (tab_7) {
          case 1:
            result = 'mechanical_is_dispatch'
            break
          case 2:
            result = 'electrical_is_dispatch'
            break
          case 3:
            result = 'instrument_is_dispatch'
            break
          case 4:
            result = 'building_is_dispatch'
            break
          default:
            result = ''
            break
        }
        break
      case 8:
        switch (tab_8) {
          case 1:
            result = 'electrical_is_dispatch'
            break
          case 2:
            result = 'mechanical_is_dispatch'
            break
          case 3:
            result = 'protection_is_dispatch'
            break
          case 4:
            result = 'welding_is_dispatch'
            break
          default:
            result = ''
            break
        }
        break
      case 9:
        switch (tab_9) {
          case 1:
            result = 'fixed_mechanical_is_dispatch'
            break
          case 2:
            result = 'rotating_mechanical_is_dispatch'
            break
          case 3:
            result = 'electrical_is_dispatch'
            break
          case 4:
            result = 'instrument_is_dispatch'
            break
          case 5:
            result = 'sensitive_equipment_is_dispatch'
            break
          case 6:
            result = 'repair_services_is_dispatch'
            break
        }
        break
      case 10:
        switch (tab_10) {
          case 1:
            result = 'repair_is_dispatch'
            break
          case 2:
            result = 'operation_is_dispatch'
            break
          case 3:
            result = 'fire_is_dispatch'
            break
          case 4:
            result = 'process_is_dispatch'
            break
          case 5:
            result = 'inspection_is_dispatch'
            break
          case 6:
            result = 'general_is_dispatch'
            break
        }
        break
      default:
        result = 'is_dispatch'
        break
    }
    return result
    // is_dispatch
  }
  handleAccessDispatchName = () => {
    let { state } = this.data
    let { tab_9, select, tab_10, tab_7, tab_8 } = state
    // building_dispatch_allow
    let result
    switch (select) {
      case 7:
        switch (tab_7) {
          case 1:
            result = 'mechanical_dispatch_allow'
            break
          case 2:
            result = 'electrical_dispatch_allow'
            break
          case 3:
            result = 'instrument_dispatch_allow'
            break
          case 4:
            result = 'building_dispatch_allow'
            break
        }
        break
      case 8:
        switch (tab_8) {
          case 1:
            result = 'electrical_dispatch_allow'
            break
          case 2:
            result = 'mechanical_dispatch_allow'
            break
          case 3:
            result = 'protection_dispatch_allow'
            break
          case 4:
            result = 'welding_dispatch_allow'
            break
        }
        break
      case 9:
        switch (tab_9) {
          case 1:
            result = 'fixed_mechanical_dispatch_allow'
            break
          case 2:
            result = 'rotating_mechanical_dispatch_allow'
            break
          case 3:
            result = 'electrical_dispatch_allow'
            break
          case 4:
            result = 'instrument_dispatch_allow'
            break
          case 5:
            result = 'sensitive_equipment_dispatch_allow'
            break
          case 6:
            result = 'repair_services_dispatch_allow'
            break
        }
        break
      case 10:
        switch (tab_10) {
          case 1:
            result = 'repair_dispatch_allow'
            break
          case 2:
            result = 'operation_dispatch_allow'
            break
          case 3:
            result = 'fire_dispatch_allow'
            break
          case 4:
            result = 'process_dispatch_allow'
            break
          case 5:
            result = 'inspection_dispatch_allow'
            break
          case 6:
            result = 'general_dispatch_allow'
            break
        }
        break
      default:
        result = 'dispatch_allow'
        break
    }
    return result
  }
  handledetailsSigned = () => {
    let list = ListSign.ListMandatory || []
    let { state } = this.data
    let { select } = state
    let number = this.handleSwitchTsrSignId(select)
    let nameTsr = `tsr${number}`
    let listTsr = list[nameTsr] || []
    let name_tsr_select = `tsr${select}`
    let objTsr = state[name_tsr_select] || {}
    let result = Object.keys(listTsr).map(data => {
      let obj = listTsr[data] || {}
      const { not_have_check } = obj
      let object = {}
      const firstName_check = `${handleString(obj['firstName'])}${not_have_check ? '' : '_check'
        }`
      const lastName_check = `${handleString(obj['lastName'])}${not_have_check ? '' : '_check'
        }`
      let firstName = firstName_check.trim()
      let lastName = lastName_check.trim()
      let _name = obj['name'],
        _firstName = objTsr[firstName],
        _lastName = objTsr[lastName]
      object['label'] = _name
      object['firstName'] = handleString(_firstName)
      object['lastName'] = handleString(_lastName)
      return object
    })
    return result
  }
  // handleGetStatus = (status, select) => {
  //   let delimeter = '_'
  //   let { state } = this.data
  //   let { tab_2, tab_6, tab_7 } = state
  //   let result = ''
  //   switch (select) {
  //     case 2:
  //       let array_2 = status.split(delimeter)
  //       result = handleString(array_2[tab_2 - 1])
  //       break
  //     case 6:
  //       let array_6 = status.split(delimeter)
  //       result = handleString(array_6[tab_6 - 1])
  //       break
  //     case 7:
  //       let array_7 = status.split(delimeter)
  //       result = handleString(array_7[tab_7 - 1])
  //       break
  //     default:
  //       result = status
  //       break
  //   }
  //   return result
  // }
  handleCheckHoldSign = (objTsr, hold) => {
    let result = handleString(objTsr[hold])
    const check = handleCheckText(result)
    return check
  }
  handleCheckShowNameSignAPI = item => {
    let list = ListSign.ListMandatory || []
    let { state } = this.data
    let { select } = state
    let number = this.handleSwitchTsrSignId(select)
    let nameTsr = `tsr${number}`
    let listTsr = list[nameTsr] || []
    const filter = listTsr.filter(user => user.name === item.label)
    let objSign = filter[0] || {}
    const { hold } = objSign
    let objTsr = state[`tsr${select}`] || {}
    const check = hold ? this.handleCheckHoldSign(objTsr, hold) : true
    return check
  }
  handleCheckBoxBoolean = (name, default_result = true) => {
    let { state } = this.data
    let { select } = state
    let tsr_data = state[`tsr${select}`] || {}
    let data_get = tsr_data[name]
    let result = false
    switch (data_get) {
      case '1':
        result = true
        break
      case '0':
        result = false
        break
      case true:
        result = true
        break
      case false:
        result = false
        break
      default:
        result = default_result
        break
    }
    return result
  }
  handleNumberMessage = num => {
    let defaultName = `tsr${num}`
    const { state } = this.data
    const { tab_7, tab_8, tab_9, tab_10 } = state
    switch (num) {
      case 7:
        return `${defaultName}_${tab_7}`
      case 8:
        return `${defaultName}_${tab_8}`
      case 9:
        return `${defaultName}_${tab_9}`
      case 10:
        return `${defaultName}_${tab_10}`
      default:
        return defaultName
    }
  }
  handleMultiMessageAPI = () => {
    let _obj = this.data.ListSign.ListMandatory || {}
    const { state } = this.data
    const { select } = state
    let defaultName = `tsr${select}`
    let nameValue = this.handleNumberMessage(select)
    let _list = _obj[nameValue] || []
    let filter = Object.keys(_list).map(_value => {
      let o0bj = _list[_value] || {}
      const { name, message } = o0bj
      let result = {}
      if (message) {
        result = {
          name: handleString(name),
          message: handleString(message)
        }
      }
      return result
    })
    let _state = state[defaultName] || {}
    let array = this.handleMergeList(filter, _state)
    return array
  }
  HandleCompareDateAPI = () => {
    let list_date1 = this.handleMultiMessageAPI()
    let length1 = list_date1.length
    let data1 = length1 > 0 ? list_date1[length1 - 1] : {}
    const date1 = handleString(data1.date)
    const list_date2 = this.handleListReject()
    let length2 = list_date2.length
    let data2 = length2 > 0 ? list_date2[length2 - 1] : {}
    const date2 = handleString(data2.date)
    let result = this.CompareDate(date1, date2)
    return result
  }
  CompareDate = (date1, date2) => {
    let result1 = moment(date1, ' HH:mm  - jYYYY/jMM/jDD ')
    let result2 = moment(date2, ' HH:mm  - jYYYY/jMM/jDD ')
    let result = result1 > result2
    return result
  }
  GetStatus = () => {
    const { state } = this.data
    const { status, select, tab_2, tab_6, tab_7, tab_8, tab_9, tab_10 } = state
    let myStatus = handleString(status)
    const arrayStatus = myStatus.split('_')
    let result
    switch (select) {
      case 2:
        result = arrayStatus[tab_2 - 1] || 'disabled'
        break
      case 6:
        result = arrayStatus[tab_6 - 1] || 'disabled'
        break
      case 7:
        result = arrayStatus[tab_7 - 1] || 'disabled'
        break
      case 8:
        result = arrayStatus[tab_8 - 1] || 'disabled'
        break
      case 9:
        result = arrayStatus[tab_9 - 1] || 'disabled'
        break
      case 10:
        result = arrayStatus[tab_10 - 1] || 'disabled'
        break
      default:
        result = myStatus
        break
    }
    return result
  }
}
export default API
