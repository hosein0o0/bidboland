import handleString from '../../handleString'
// import ManageDocument from "./ManageDocument"
// import StaticList from "./StaticList"
import StaticData from '../../staticData'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import axios from 'axios'
import handleCheckText from '../../handleCheckText'
import getCustomFormat from '../../getCustomFormat'
// import Offices from "./Offices"
class API {
  constructor(props) {
    this.data = props
  }
  handleEF = newState => {
    let result = 'true'
    const effective = newState['effective']
    if (effective === '0') result = 'false'
    return {
      effective: result
    }
  }
  fetchDataAPI = () => {
    const parentState = this.data.props.state || {}
    const newState = parentState.tsr12 || {}
    const { handleState } = this.data
    let obj2 = this.handleEF(newState)
    const merge = { ...newState, ...obj2 }
    handleState(merge)
  }
  handleDefaultResult = (e, data) => {
    const { handleState } = this.data
    let { name } = e.target
    let { value } = data
    handleState({
      [name]: value,
      effective_type: '',
      suggested_ways: ''
    })
  }
  handleListFormAPI = () => {
    const { state } = this.data
    const { effective } = state
    let data = [
      {
        value: 'end_work_date',
        name: 'تاریخ صورتجلسه تائید پایان کار',
        rtl: true,
        require: true,
        disabled: this.handleDisabledAPIElm(),
        date: true,
        objectSetState: true
      },
      {
        value: 'operation_start_date',
        name: 'تاريخ شروع بهره برداري:',
        rtl: true,
        require: true,
        disabled: this.handleDisabledAPIElm(),
        date: true,
        objectSetState: true
      },
      {
        value: `effective`,
        radio: true,
        label: 'آيا TSR اثر بخش بوده است؟',
        items: [
          {
            value: 'true',
            label: 'مورد تایید است'
          },

          {
            value: 'false',
            label: 'مورد تایید نیست.'
          }
        ],
        rtl: true,
        require: true,
        disabled: this.handleDisabledAPIElm(),
        onchange: (e, data) => this.handleDefaultResult(e, data)
      },
      {
        access: effective === 'true',
        value: `effective_type`,
        name: 'نوع اثر بخشی',
        rtl: true,
        textArea: true,
        disabled: this.handleDisabledAPIElm(),
        require: true
      },
      {
        access: true,
        value: `description`,
        name: 'توضیحات',
        rtl: true,
        textArea: true,
        disabled: this.handleDisabledAPIElm(),
        require: false
      },
      {
        access: effective === 'false',
        value: `suggested_ways`,
        name: 'راهکارهای پیشنهادی',
        rtl: true,
        textArea: true,
        disabled: this.handleDisabledAPIElm(),
        require: true
      },
      {
        value: 'new_tsr_no',
        name: 'شماره TSR جدید',
        rtl: true,
        require: false,
        disabled: this.handleDisabledAPIElm()
      }
    ]
    return data
  }
  handleChangeList = (state_name, name, value, key) => {
    const { state, handleState } = this.data
    let list = state[state_name] || []
    const obj = list[key] || {}
    obj[name] = value
    handleState({
      [state_name]: list
    })
  }
  handleUploadListAPI = async (e, files, names, parentState) => {
    const { handleState } = this.data
    await e.preventDefault()
    let _files_ = e.target.files
    handleState({ loading: `${files}_${parentState}` })
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
        // _files_.length,
        key,
        i,
        parentState
      )
    }
  }
  GetLinkAPI = (nameState, file, names, key, i, parentState) => {
    let { state, handleState } = this.data

    const { token, tsr_id } = state
    let datareg = new FormData()
    const list = state[parentState] || []
    const obj = list[key] || {}
    let array = obj[nameState] || [],
      arrayName = obj[names] || []
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/DocumentCenter/ProcessDocument/Tsr/Form12/${tsr_id}`,
      data: datareg,
      headers: {
        Authorization: token ? `Bearer ${token}` : null
      }
    }).then(async response => {
      if (i === key) {
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
  deleteFileListAPI = async (key, num, files, names, parent) => {
    const { handleState } = this.data
    let state = this.data.state
    let _Parent = await state[parent]
    let obj = await _Parent[key]
    let data1 = await obj[files]
    let data2 = await obj[names]
    await data1.splice(num, 1)
    await data2.splice(num, 1)
    if (data1.length === 0 && data2.length === 0) {
      let obj_2 = await {
        documentNumber: '',
        title: '',
        editNumber: '',
        attachment: [],
        attachmentName: []
      }
      _Parent[key] = await obj_2
    }
    await handleState({ [parent]: _Parent })
  }
  handleDelete = (name, key) => {
    const { handleState, state } = this.data
    const list = state[name] || []
    list.splice(key, 1)
    handleState({
      [name]: list
    })
  }
  handleCheckfileList = name => {
    const { state } = this.data
    let list = state[name] || []
    let length = list.length
    let prev = length - 1
    let obj_prev = list[prev] || {}
    const attachment = obj_prev.attachment || []
    const attachmentName = obj_prev.attachmentName || []
    const { documentNumber, title, editNumber } = obj_prev
    let state1 = attachment.length > 0 && attachmentName.length > 0
    let state2 =
      handleCheckText(documentNumber) &&
      handleCheckText(title) &&
      handleCheckText(editNumber)
    const result = state1 && state2
    return result
  }
  handleCheckOfficeList = name => {
    const { state } = this.data
    let list = state[name] || []
    let length = list.length
    let prev = length - 1
    let obj_prev = list[prev] || {}
    const { officeName, number } = obj_prev
    const result = handleCheckText(officeName) && handleCheckText(number)
    return result
  }
  handleAdd = name => {
    const { state, handleState } = this.data
    let list = state[name] || []
    let obj1 = { officeName: '', number: '' }
    let obj2 = {
      documentNumber: '',
      title: '',
      editNumber: '',
      attachment: [],
      attachmentName: []
    }
    let obj = name === 'documents_distribution' ? obj1 : obj2
    let check = false
    switch (name) {
      case 'new_document_attachment':
        check = this.handleCheckfileList(name)
        break
      case 'edited_document_attachment':
        check = this.handleCheckfileList(name)
        break
      case 'documents_distribution':
        check = this.handleCheckOfficeList(name)
        break
      default:
        check = false
        break
    }
    if (check) {
      list.push(obj)
      handleState({
        [name]: list
      })
    } else {
      Notification.notify(Message.text(908), 'error')
    }
  }
  handlCreate = id => {
    const { CheckAllow, state, API } = this.data.props
    const { status, page, select } = state
    const { handleSwitchid } = API
    const nameAdmin = `tsr${handleSwitchid(select)}admin_update_allow`
    const notAdmin = state[nameAdmin] ? false : true
    const check = status === 'create' && page == id
    let allow = CheckAllow('fill_allow')
    const result = check && allow && notAdmin
    return result
  }
  handleCheckUpdate = id => {
    let parentState = this.data.props.state || {}
    const { page } = parentState
    const { CheckAllow } = this.data.props
    const Allow = CheckAllow('update_allow')
    const check = parseInt(page) === id
    const result = Allow && check
    return result
  }
  handleDisabledAPI = () => {
    const canUpdate = this.handleCheckUpdate(12)
    const canCreate = this.handlCreate(12)
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
    const canUpdate = this.handleCheckUpdate(12)
    const canCreate = this.handlCreate(12)
    const check = canUpdate || canCreate
    const result = !check
    return result || checkBox
  }
  ShowSign = () => {
    let { handleDisabled } = this.data
    let parentState = this.data.props.state || {}
    let { status, level, select, edit } = parentState
    let state1 = edit === '0'
    let state2 = status === 'sign' || status === 'reject'
    level = level || 0
    select = select || 0
    let check1 = level >= select
    let check2 = handleDisabled()
    let resultCheck = check1 && check2
    let resultState = state1 && state2
    const check = resultCheck || resultState
    return check
  }
  handleCC = array => {
    const result = Object.keys(array).map(index => {
      let obj = array[index] || {}
      const { value } = obj
      return value
    })
    return result.join(',')
  }
  handleDataSend = status => {
    const { state } = this.data
    let {
      tsr_id,
      end_work_date,
      operation_start_date,
      effective,
      effective_type,
      description,
      suggested_ways,
      new_tsr_no,
      notification_cc
    } = state
    end_work_date = getCustomFormat(end_work_date)
    operation_start_date = getCustomFormat(operation_start_date)
    const state1 =
      handleCheckText(end_work_date) && handleCheckText(operation_start_date)
    const state2 =
      effective === 'true'
        ? handleCheckText(effective_type)
        : handleCheckText(suggested_ways)
    const check_send = state1 && state2
    let data = {
      tsr_id,
      end_work_date,
      operation_start_date,
      effective,
      effective_type: handleString(effective_type),
      description: handleString(description),
      suggested_ways: handleString(suggested_ways),
      new_tsr_no: handleString(new_tsr_no)
    }
    if (status === 'create') {
      const cc = this.handleCC(notification_cc || [])
      data['notification_cc'] = cc
    }
    return { data_send: data, check_send: check_send }
  }
  handleDataSign = () => {
    const { state } = this.data
    const { handleCheckSigned } = this.data.props.API
    const { office_boss_select, unit_boss_select } = state
    const check =
      handleCheckSigned(office_boss_select) &&
      handleCheckSigned(unit_boss_select)
    let result = {}
    return { check_sign: check, data_sign: result }
  }
  handleSubmitAPI = async (status = '') => {
    let sign = {},
      sign_check = true
    const { state, handleState } = this.data
    const { token } = state
    if (status === 'create') {
      let data2 = this.handleDataSign()
      const { check_sign, data_sign } = data2
      sign = data_sign
      sign_check = check_sign
    }
    let data1 = this.handleDataSend(status)
    const { data_send, check_send } = data1
    let merge_data = { ...data_send, ...sign }
    let merge_check = sign_check && check_send
    if (merge_check) {
      handleState({
        loading: 'submit',
        disabled: true
      })
      const url = `${StaticData.domainIp}/tsr_v1/${status === 'create' ? 'tsr12Insert' : 'tsr12Update'
        }`
      const datareg = new FormData()
      for (let name in merge_data) {
        let value = await merge_data[name]
        await datareg.append(name, value)
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
}
export default API
