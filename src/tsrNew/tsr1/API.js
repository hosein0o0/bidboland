import axios from 'axios'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import StaticData from '../../staticData'
import handleCheckText from '../../handleCheckText'
import StaticList from './StaticList'
// import handleString from '../../handleString'
class API {
  constructor(props) {
    this.data = props
  }
  handleCheckList = tsr1 => {
    let foreign = StaticList.foreign_attachments
    let internal = StaticList.internal_attachments
    let foreign_state = tsr1.foreign_attachments || []
    let internal_state = tsr1.internal_attachments || []
    let foreign_attachments = foreign_state.length > 0 ? foreign_state : foreign
    let internal_attachments =
      internal_state.length > 0 ? internal_state : internal
    return { foreign_attachments, internal_attachments }
  }
  ShowFetchAPI = () => {
    const { handleState, state } = this.data
    let parentState = this.data.props.state || {}
    let tsr1 = parentState.tsr1 || {}
    if (tsr1) {
      let attachObj = this.handleCheckList(tsr1)
      let merge = { ...state, ...tsr1, ...attachObj }
      merge['applicant_unit_select'] = merge['applicant_unit']
      // const { foreign_attachments } = merge
      // const { handleForeignLink } = this.data.props.API
      // merge['foreign_attachments'] = handleForeignLink(
      //   foreign_attachments || []
      // )
      handleState(merge)
    }
  }
  fetchDataAPI = url => {
    const { token } = this.data.state
    const { handleState } = this.data
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async response => {
        if (response.status === 200) {
          const { content } = await response.data
          handleState(content)
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
  CheckForeign = () => {
    const state = this.data.state || {}
    const foreign_attachments = state.foreign_attachments || []
    let i = 0
    let check = false
    while (i < foreign_attachments.length) {
      let _obj = foreign_attachments[i]
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
  CheckInternal = () => {
    let check = false
    const state = this.data.state || {}
    const internal_attachments = state.internal_attachments || []
    let i = 0
    while (i < internal_attachments.length) {
      let _obj = internal_attachments[i]
      const { degreeTitle, documentNumber } = _obj
      check = handleCheckText(degreeTitle) && handleCheckText(documentNumber)
      if (!check) {
        break
      }
      i++
    }
    return check
  }
  handleAddAttachAPI = nameState => {
    const { handleState, state } = this.data
    let obj = {}
    let check = false
    switch (nameState) {
      case 'foreign_attachments':
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
      case 'internal_attachments':
        obj = {
          documentNumber: null,
          degreeTitle: '',
          numberPages: '',
          descriptionAttachment: ''
        }
        check = this.CheckInternal()
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
    const { token, id, tsr_id } = state
    let datareg = new FormData()
    let array = state[parentState][key][nameState],
      arrayName = state[parentState][key][names]
    datareg.append('file', file)
    const url = `${StaticData.domainIp
      }/uploadFile/DocumentCenter/ProcessDocument/Tsr/Form1/${tsr_id || id}`
      axios({
      method: 'post',
      url: url,
      data: datareg,
      headers: {
        Authorization: token ? `Bearer ${token}` : null
      }
    }).then(async response => {
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
    }).finally(()=>handleState({loading : ''}))
  }
  handleUnitBossAPI = async (e, item) => {
    const { handleState, state } = await this.data
    const { name } = await e.target
    const { value } = item
    const { token } = await state
    await handleState({
      office_boss: [],
      unit_boss: [],
      [name]: item.label
    })
    const check = handleCheckText(name) && handleCheckText(token)
    if (check) {
      let url = await `${StaticData.domainIp}/tsr_v1/getUnitOfficeBoss/${value}`
      await axios
        .get(url, {
          headers: {
            Authorization: token ? `Bearer ${token}` : null
          }
        })
        .then(async response => {
          let { content } = response.data
          let { office_boss, unit_boss } = content
          handleState({
            office_boss: [office_boss],
            unit_boss: [unit_boss]
          })
          if (response.status === 200) {
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
        const { content } = response.data
        handleState({ loading: '' })
        if (response.status === 200) {
          handleState({ listData: content, loading: '' })
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
  ShowSignAPI = () => {
    let { state, handleDisabled } = this.data
    let { status, edit } = state
    let state1 = edit === '0'
    let state2 = status === 'sign' || status === 'reject' || status === 'waited'
    let parentState = this.data.props.state || {}
    let { level, select } = parentState
    level = level || 0
    select = select || 0
    let check1 = level >= select
    let ckeck2 = handleDisabled()
    let resultCheck = check1 && ckeck2
    let resultState = state1 && state2
    const check = resultCheck || resultState
    return check
  }
  handleCheckUpdate = id => {
    const { canUpdate, state } = this.data.props
    let Allow = canUpdate ? true : false
    let { page } = state
    const check = parseInt(page) === id
    const result = Allow && check
    return result
  }
}
export default API
