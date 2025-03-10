import handleString from '../../handleString'
import ManageDocument from './ManageDocument'
import StaticList from './StaticList'
import StaticData from '../../staticData'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import axios from 'axios'
import handleCheckText from '../../handleCheckText'
import Offices from './Offices'
class API {
  constructor(props) {
    this.data = props
  }
  handleList = newState => {
    let defaultState = StaticList.defaultState
    let default_new = defaultState.new_document_attachment
    let default_edited = defaultState.edited_document_attachment
    let default_documents = defaultState.documents_distribution
    let state_new = newState.new_document_attachment || []
    let state_edited = newState.edited_document_attachment || []
    let state_documents = newState.documents_distribution || []
    let new_document_attachment = state_new.length > 0 ? state_new : default_new
    let edited_document_attachment =
      state_edited.length > 0 ? state_edited : default_edited
    let documents_distribution =
      state_documents.length > 0 ? state_documents : default_documents
    return {
      new_document_attachment,
      edited_document_attachment,
      documents_distribution
    }
  }
  fetchDataAPI = () => {
    const parentState = this.data.props.state || {}
    const newState = parentState.tsr11 || {}
    const { handleState } = this.data
    let obj2 = this.handleList(newState)
    const merge = { ...newState, ...obj2 }
    handleState(merge)
  }
  handleListFormAPI = () => {
    let data = [
      {
        label: 'نوع اسناد',
        value: 'document_type',
        name: 'نوع اسناد',
        rtl: true,
        require: true,
        disabled: this.handleDisabledAPIElm()
      },
      {
        class: true,
        html: () => (
          <ManageDocument
            {...this.data}
            name={`new_document_attachment`}
            label='اسناد جدید'
          />
        ),
        access: true
      },
      {
        class: true,
        html: () => (
          <ManageDocument
            {...this.data}
            name={`edited_document_attachment`}
            label='اسناد ویرایش شده'
          />
        ),
        access: true
      },
      {
        class: true,
        html: () => (
          <Offices
            {...this.data}
            name={`documents_distribution`}
            label='توسط مركز اسناد به ادارات زير توزيع گردد'
          />
        ),
        access: true
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
      url: `${StaticData.domainIp}/uploadFile/DocumentCenter/ProcessDocument/Tsr/Form11/${tsr_id}`,
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
        Attachement: [],
        AttachementName: []
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
    const Attachement = obj_prev.Attachement || []
    const AttachementName = obj_prev.AttachementName || []
    const { documentNumber, title, editNumber } = obj_prev
    let state1 = Attachement.length > 0 && AttachementName.length > 0
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
    let { officeName, number } = obj_prev
    officeName = officeName || {}
    let { value, label } = officeName
    const result =
      handleCheckText(value) &&
      handleCheckText(label) &&
      handleCheckText(number)
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
      Attachement: [],
      AttachementName: []
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
    const { CheckAllow, state , API} = this.data.props
    const { status, page , select} = state
    const { handleSwitchid } = API
    const nameAdmin = `tsr${handleSwitchid(select)}admin_update_allow`
    const notAdmin = state[nameAdmin] ? false : true
    const check = status === 'create' && parseInt(page) === id
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
    const canUpdate = this.handleCheckUpdate(11)
    const canCreate = this.handlCreate(11)
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
    const canUpdate = this.handleCheckUpdate(11)
    const canCreate = this.handlCreate(11)
    const check = canUpdate || canCreate
    const result = !check
    return result || checkBox
  }
  handleCheckList = array => {
    let result = true,
      i = 0
    while (i < array.length) {
      let obj = array[i] || {}
      const { Attachement, editNumber, title, documentNumber } = obj
      let atta = Attachement || []
      // let atta_name = AttachementName || []
      if (atta.length > 0) {
        result =
          handleCheckText(editNumber) &&
          handleCheckText(title) &&
          handleCheckText(documentNumber)
        if (!result) break
      }
      i++
    }
    return result
  }
  handleCC = array => {
    const result = Object.keys(array).map(index => {
      let obj = array[index] || {}
      const { value } = obj
      return value
    })
    return result.join(',')
  }
  handleFiltered = array => {
    const filter = array.filter(
      data =>
        data.Attachement.length > 0 ||
        handleCheckText(data.editNumber) ||
        handleCheckText(data.title) ||
        handleCheckText(data.documentNumber)
    )
    return JSON.stringify(filter)
  }
  handleFilterOffice = array => {
    const filter = array.filter(
      data => handleCheckText(data.officeName) || handleCheckText(data.number)
    )
    return JSON.stringify(filter)
  }
  handleDataSend = status => {
    const { state } = this.data
    const {
      tsr_id,
      document_type,
      new_document_attachment,
      edited_document_attachment,
      documents_distribution,
      notification_cc
    } = state
    const check1 = this.handleCheckList(new_document_attachment || [])
    const check2 = this.handleCheckList(edited_document_attachment || [])
    const check3 = handleCheckText(document_type) && handleCheckText(tsr_id)
    const check = check1 && check2 && check3
    let data = {
      tsr_id,
      document_type: handleString(document_type),
      new_document_attachment: this.handleFiltered(
        new_document_attachment || []
      ),
      edited_document_attachment: this.handleFiltered(
        edited_document_attachment || []
      ),
      documents_distribution: this.handleFilterOffice(
        documents_distribution || []
      )
    }
    if (status === 'create') {
      data['notification_cc'] = this.handleCC(notification_cc || [])
    }
    return { data_send: data, check_send: check }
  }
  handleDataSign = () => {
    const { state } = this.data
    const { handleCheckSigned } = this.data.props.API
    const { supervisor_select, general_boss_select } = state
    const check =
      handleCheckSigned(supervisor_select) &&
      handleCheckSigned(general_boss_select)
    let result = {}
    if (check) {
      result = { supervisor_verify_by: supervisor_select.value }
    }
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
      const url = `${StaticData.domainIp}/tsr_v1/${status === 'create' ? 'tsr11Insert' : 'tsr11Update'
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
  handleManageListOffice = () => {
    const { state } = this.data
    const { office_list, documents_distribution } = state
    let list1 = office_list || []
    let list2 = documents_distribution || []
    let office_select = Object.keys(list2).map(item => {
      let obj = list2[item] || {}
      const { officeName } = obj
      return officeName || {}
    })
    const results = list1.filter(
      ({ value: id1 }) => !office_select.some(({ value: id2 }) => id2 === id1)
    )
    return results
  }
}
export default API
