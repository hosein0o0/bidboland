import ListTab from './ListTab'
import Internal from '../ShowTsr/Internal'
import Foreign from '../ShowTsr/Foreign'
import handleCheckText from '../../handleCheckText'
import axios from 'axios'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import StaticData from '../../staticData'
import handleString from '../../handleString'
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
      let result_list = defaultList.length > 0 ? defaultList : fixed
      // if (value.includes('foreign_attachment'))
      //   result_list = handleForeignLink(result_list)
      object[value] = result_list
    })
    return object
  }
  handleCheck = newState => {
    let object = {}
    let list = ListTab.List || []
    list.forEach(data => {
      if (data.value !== 'tech') {
        let reject_text = `${data.value}_reject_text`,
          reject_text_check = handleCheckText(newState[reject_text])
        // review_text = `${data.value}_review_text`
        // review_text_check = handleCheckText(newState[review_text])
        let result = true
        if (reject_text_check) {
          result = false
        }
        object[`${data.value}_result`] = result
      }
    })
    return object
  }
  fetchDataAPI = () => {
    const { handleState } = this.data
    let parentState = this.data.props.state || {}
    const { handleCheckBoxBoolean } = this.data.props.API
    let newState = parentState.tsr6 || {}
    let _obj = this.handleCheckList(newState)
    let merge = { ...newState, ..._obj }
    let tech_result = handleCheckBoxBoolean('tech_result')
    merge['tech_result'] = tech_result
    let tech_text = merge['tech_text']
    merge[`tech_text_${tech_result}`] = tech_text
    merge = { ...merge, ...this.handleCheck(merge) }
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
  SwitchNamePermission = () => {
    let state = this.data.state || {}
    let { tab } = state
    let obj
    switch (tab) {
      case 1:
        obj = {
          create: 'process_boss_fill_allow',
          update: 'process_boss_update_allow'
        }
        break
      case 2:
        obj = {
          create: 'general_boss_fill_allow',
          update: 'general_boss_update_allow'
        }
        break
      case 3:
        obj = {
          create: 'inspection_boss_fill_allow',
          update: 'inspection_boss_update_allow'
        }
        break
      case 4:
        obj = {
          create: 'technical_boss_fill_allow',
          update: 'technical_boss_update_allow'
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
    const { CheckAllow, state, API } = this.data.props
    const { page, select } = state
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
  handleDisabledAPI = () => {
    const canUpdate = this.handleCheckUpdate(6)
    const canCreate = this.handlCreate(6)
    const check = canUpdate || canCreate
    const result = check
    return !result
  }
  CheckForeign = nameState => {
    const state = this.data.state || {}
    const foreign_attachment = state[nameState] || []
    let i = 0
    let check = false
    while (i < foreign_attachment.length) {
      let _obj = foreign_attachment[i]
      const {
        Attachement,
        AttachementName
        // , degreeTitle
      } = _obj
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
      url: `${StaticData.domainIp}/uploadFile/DocumentCenter/ProcessDocument/Tsr/Form6/${tsr_id}`,
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
  handleDefaultResult = (e, data) => {
    const { handleState } = this.data
    let { name } = e.target
    let { value } = data
    let _name = this.handleSwitchName()
    let reject_text = `${_name}_reject_text`,
      review_text = `${_name}_review_text`
    handleState({ [name]: value, [reject_text]: '', [review_text]: '' })
  }
  DefaultList = () => {
    let name = this.handleSwitchName()
    let { state } = this.data
    const check = state[`${name}_result`]
    return [
      {
        value: `${name}_result`,
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
        disabled: this.handleDisabledAPI(),
        onchange: (e, data) => this.handleDefaultResult(e, data)
      },
      {
        access: !check,
        value: `${name}_reject_text`,
        name: 'دلایل عدم تایید',
        rtl: true,
        textArea: true,
        disabled: this.handleDisabledAPI(),
        require: true
      },
      {
        access: check,
        value: `${name}_review_text`,
        name: 'الزامات و ملاحظات',
        rtl: true,
        textArea: true,
        disabled: this.handleDisabledAPI(),
        require: true
      },
      {
        class: true,
        html: () => (
          <Foreign
            {...this.data}
            notRequire={true}
            name={`${name}_foreign_attachment`}
            check_disabled={this.handleDisabledAPI()}
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
            check_disabled={this.handleDisabledAPI()}
          />
        ),
        access: true
      }
    ]
  }
  TechList = () => {
    const { tech_result } = this.data.state
    let name = this.handleSwitchName()
    return [
      {
        value: 'tech_result',
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
        disabled: this.handleDisabledAPI(),
        onchange: (e, data) => this.TechResult(e, data)
      },
      {
        access: true,
        value: `tech_text_${tech_result ? true : false}`,
        name: tech_result ? 'الزامات و ملاحظات' : 'دلایل عدم تائید',
        rtl: true,
        textArea: true,
        disabled: this.handleDisabledAPI(),
        require: true
      },
      {
        value: 'tech_execution_time',
        name: 'زمان تائید شده جهت اجرا',
        date: true,
        rtl: true,
        objectSetState: true,
        isGregorian: false,
        disabled: this.handleDisabledAPI(),
        cantShow: !tech_result
      },
      {
        class: true,
        html: () => (
          <Foreign
            {...this.data}
            notRequire={true}
            name={`${name}_foreign_attachment`}
            check_disabled={this.handleDisabledAPI()}
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
            check_disabled={this.handleDisabledAPI()}
          />
        ),
        access: true
      }
    ]
  }
  TechResult = (e, data) => {
    const parentState = this.data.props.state || {}
    const { handleState } = this.data
    const { edit_admin } = parentState
    const checkAdmin = edit_admin === '1'
    const check = !checkAdmin
    if (check) {
      let { name } = e.target
      let { value } = data
      handleState({
        [name]: value,
        tech_text_true: '',
        tech_text_false: '',
        tech_execution_time: null
        // tech_foreign_attachment: [foreign_attachment],
        // tech_internal_attachment: [internal_attachment]
      })
    }
  }
  handleListFormAPI = () => {
    let { state } = this.data
    let { tab } = state
    let defaultList = this.DefaultList()
    let techList = this.TechList()
    switch (tab) {
      case 4:
        return techList
      default:
        return defaultList
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
  handleSwitchSubmit = () => {
    let { state } = this.data
    let tab = state.tab || 0
    switch (tab) {
      case 4:
        this.handleSubmitTech()
        break
      default:
        this.handleSubmitAPI()
        break
    }
  }
  handleSwitchEdit = () => {
    let { state } = this.data
    let tab = state.tab || 0
    switch (tab) {
      case 4:
        this.handleEditTech()
        break
      default:
        this.handleEditAPI()
        break
    }
  }
  handleSwitchUrl = name => {
    switch (name) {
      case 'tech':
        return {
          create: 'tsr_v1/tsr6Insert/technicalBoss',
          update: 'tsr_v1/tsr6Update/technicalBoss'
        }
      default:
        return {
          create: `tsr_v1/tsr6Insert/${name}Boss`,
          update: `tsr_v1/tsr6Update/${name}Boss`
        }
    }
  }
  handleItemFormData = name => {
    let { state } = this.data
    let { tsr_id } = state
    let result = {},
      result_check = state[`${name}_result`] ? true : false,
      reject_text = handleString(state[`${name}_reject_text`]),
      review_text = handleString(state[`${name}_review_text`]),
      foreign_attachment = JSON.stringify(
        state[`${name}_foreign_attachment`] || []
      ),
      internal_attachment = JSON.stringify(
        state[`${name}_internal_attachment`] || []
      )
    const check =
      handleCheckText(tsr_id) && result_check
        ? handleCheckText(state[`${name}_review_text`])
        : handleCheckText(state[`${name}_reject_text`])
    result['tsr_id'] = tsr_id
    result[`${name}_reject_text`] = reject_text
    result[`${name}_review_text`] = review_text
    result[`${name}_foreign_attachment`] = foreign_attachment
    result[`${name}_internal_attachment`] = internal_attachment
    return check ? result : {}
  }
  handleSubmitAPI = async () => {
    let { state, handleState } = this.data
    let { token } = state
    let name = await this.handleSwitchName()
    let { create } = this.handleSwitchUrl(name)
    let url = await `${StaticData.domainIp}/${create}`
    let objItem = await this.handleItemFormData(name)
    const datareg = await new FormData()
    // let a = {}
    for (let value in objItem) {
      let send = await objItem[value]
      // a[value] = await send
      await datareg.append(value, send)
    }
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
  }
  handleEditAPI = async () => {
    let { state, handleState } = this.data
    let { token } = state
    let name = await this.handleSwitchName()
    let { update } = this.handleSwitchUrl(name)
    let url = await `${StaticData.domainIp}/${update}`
    let objItem = await this.handleItemFormData(name)
    const datareg = await new FormData()
    let a = {}
    for (let value in objItem) {
      let send = await objItem[value]
      a[value] = await send
      await datareg.append(value, send)
    }
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
  }
  handleItemTechFormData = name => {
    let { state } = this.data
    let { tsr_id } = state
    let object = {},
      result = state[`${name}_result`] ? true : false,
      text = handleString(state[`${name}_text_${result}`]),
      tech_execution_time = result
        ? getCustomFormat(state[`${name}_execution_time`])
        : '',
      foreign_attachment = JSON.stringify(
        state[`${name}_foreign_attachment`] || []
      ),
      internal_attachment = JSON.stringify(
        state[`${name}_internal_attachment`] || []
      )
    const check = handleCheckText(tsr_id) && handleCheckText(text)
    object['tsr_id'] = tsr_id
    object[`${name}_result`] = result
    object[`${name}_text`] = text
    object[`${name}_execution_time`] = tech_execution_time
    object[`${name}_foreign_attachment`] = foreign_attachment
    object[`${name}_internal_attachment`] = internal_attachment
    return { check, object }
  }
  handleSubmitTech = async () => {
    let name = await this.handleSwitchName()
    const { check, object } = await this.handleItemTechFormData(name)
    const { handleState, state } = this.data
    const { token } = state
    if (check) {
      let { create } = this.handleSwitchUrl(name)
      let url = await `${StaticData.domainIp}/${create}`
      const datareg = await new FormData()
      for (let value in object) {
        let data = await object[value]
        await datareg.append(value, data)
      }
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
  handleEditTech = async () => {
    let name = await this.handleSwitchName()
    const { check, object } = await this.handleItemTechFormData(name)
    const { handleState, state } = this.data
    const { token } = state
    if (check) {
      let { update } = this.handleSwitchUrl(name)
      let url = await `${StaticData.domainIp}/${update}`
      const datareg = await new FormData()
      for (let value in object) {
        let data = await object[value]
        await datareg.append(value, data)
      }
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
    let { handleDisabled } = this.data
    let parentState = this.data.props.state || {}
    let { edit, level, select } = parentState
    let status = this.Split()
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
}
export default API
