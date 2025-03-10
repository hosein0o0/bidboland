import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import StaticData from '../../staticData'
import handleCheckText from '../../handleCheckText'
import getCustomFormat from '../../getCustomFormat'
// import handleString from '../../handleString'
import axios from 'axios'
import handleString from '../../handleString'
class API {
  constructor(props) {
    this.data = props
  }
  fetchDataAPI = async () => {
    const { handleState } = await this.data
    let parentState = this.data.props.state || {}
    const { handleCheckBoxBoolean } = this.data.props.API
    let newState = parentState.tsr4 || {}
    // let objForeign_attachment = await {
    //   documentNumber: '',
    //   degreeTitle: '',
    //   numberPages: '',
    //   descriptionAttachment: '',
    //   AttachementName: [],
    //   Attachement: []
    // },
    let objInternal_attachment = await {
      documentNumber: null,
      degreeTitle: '',
      numberPages: '',
      descriptionAttachment: ''
    }
    // const { handleForeignLink } = this.data.props.API
    // let foreign = (await newState['foreign_attachment']) || [],
    const internal = (await newState['internal_attachment']) || []
    // newState['foreign_attachment'] = handleForeignLink(
    //   foreign.length > 0 ? foreign : [objForeign_attachment]
    // )
    newState['internal_attachment'] =
      internal.length > 0 ? internal : [objInternal_attachment]
    let hazop = handleCheckBoxBoolean('hazop_review', false)
    let hse = handleCheckBoxBoolean('hse_review')
    newState['hazop_review'] = hazop
    newState['hse_review'] = hse
    // newState['Prev_hse_review'] = hse
    let name = `hse_review_msg_${hse}`
    newState[name] = await newState['hse_review_msg']
    handleState(newState)
  }
  HseReviewAPI = (e, data) => {
    const parentState = this.data.props.state || {}
    const { handleState } = this.data
    const { edit_admin } = parentState
    const checkAdmin = edit_admin === '1'
    const check = !checkAdmin
    let { name } = e.target
    let { value } = data
    if (check) {
      handleState({
        [name]: value,
        hse_review_msg_true: '',
        hse_review_msg_false: '',
        suggested_execution_time: null
      })
    }
  }
  HAZOPReviewAPI = (e, data) => {
    let { name } = e.target
    let { value } = data
    const { handleState } = this.data
    let objForeign_attachment = {
      documentNumber: '',
      degreeTitle: '',
      numberPages: '',
      descriptionAttachment: '',
      AttachementName: [],
      Attachement: []
    },
      objInternal_attachment = {
        documentNumber: null,
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: ''
      }
    handleState({
      [name]: value,
      foreign_attachment: [objForeign_attachment],
      internal_attachment: [objInternal_attachment]
    })
  }
  handleAddAttachAPI = nameState => {
    const { handleState, state } = this.data
    let obj = {}
    let check = false
    switch (nameState) {
      case 'foreign_attachment':
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
      case 'internal_attachment':
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
    const canUpdate = this.handleCheckUpdate(4)
    const canCreate = this.handlCreate(4)
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
    const canUpdate = this.handleCheckUpdate(4)
    const canCreate = this.handlCreate(4)
    const check = canUpdate || canCreate
    const result = !check
    return result || checkBox
  }
  CheckForeign = () => {
    const state = this.data.state || {}
    const foreign_attachment = state.foreign_attachment || []
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
  CheckInternal = () => {
    let check = false
    const state = this.data.state || {}
    const internal_attachment = state.internal_attachment || []
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
      url: `${StaticData.domainIp}/uploadFile/DocumentCenter/ProcessDocument/Tsr/Form4/${tsr_id}`,
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
    let { status, level, select, edit } = parentState
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
  handleCC = array => {
    const result = Object.keys(array).map(data => {
      let obj_data = array[data] || {}
      const { value } = obj_data
      return value
    })
    return result.join(',')
  }
  handleSubmitAPI = async () => {
    const { handleCheckSigned } = await this.data.props.API
    const { handleState, state } = this.data
    let {
      tsr_id,
      hse_review,
      // hse_review_msg,
      suggested_execution_time,
      hazop_review,
      foreign_attachment,
      internal_attachment,
      notification_cc,
      fire_boss_select,
      hse_technician_select,
      hse_boss_select,
      hse_review_msg_false,
      hse_review_msg_true,
      token
    } = await state
    const checkHSE = hse_review
      ? handleCheckText(hse_review_msg_true)
      : handleCheckText(hse_review_msg_false)
    const checkHazop = hazop_review ? this.CheckForeign() : true
    const checkSign =
      handleCheckSigned(hse_technician_select) &&
      handleCheckSigned(fire_boss_select) &&
      handleCheckSigned(hse_boss_select) &&
      handleCheckText(tsr_id)
    const checkFinal = checkHSE && checkSign && checkHazop
    if (checkFinal) {
      await handleState({
        loading: 'submit',
        disabled: true
      })
      let { value } = hse_technician_select
      const cc = this.handleCC(notification_cc || [])
      const url = `${StaticData.domainIp}/tsr_v1/tsr4Insert`
      let time = getCustomFormat(suggested_execution_time)
      const datareg = new FormData()
      await datareg.append('tsr_id', tsr_id)
      await datareg.append('hse_review', hse_review ? true : false)
      await datareg.append(
        'hse_review_msg',
        hse_review
          ? handleString(hse_review_msg_true)
          : handleString(hse_review_msg_false)
      )
      await datareg.append('suggested_execution_time', time)
      await datareg.append('hazop_review', hazop_review ? true : false)
      await datareg.append(
        'foreign_attachment',
        JSON.stringify(foreign_attachment)
      )
      await datareg.append(
        'internal_attachment',
        JSON.stringify(internal_attachment)
      )
      await datareg.append('notification_cc', cc)
      await datareg.append('hse_technician_verify_by', value)
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
  handleEditAPI = async () => {
    const { handleState, state } = this.data
    let {
      tsr_id,
      hse_review,
      suggested_execution_time,
      hazop_review,
      foreign_attachment,
      internal_attachment,
      hse_review_msg_true,
      hse_review_msg_false,
      token
    } = state
    const checkHazop = hazop_review ? this.CheckForeign() : true
    const checkHSE = hse_review
      ? handleCheckText(hse_review_msg_true)
      : handleCheckText(hse_review_msg_false)
    const checkID = handleCheckText(tsr_id)
    const checkFinal = checkHSE && checkID && checkHazop
    if (checkFinal) {
      await handleState({
        loading: 'submit',
        disabled: true
      })
      const url = `${StaticData.domainIp}/tsr_v1/tsr4Update`
      let time = getCustomFormat(suggested_execution_time)
      const datareg = await new FormData()
      await datareg.append('tsr_id', tsr_id)
      await datareg.append('hse_review', hse_review ? true : false)
      await datareg.append(
        'hse_review_msg',
        hse_review
          ? handleString(hse_review_msg_true)
          : handleString(hse_review_msg_false)
      )
      await datareg.append('suggested_execution_time', time)
      await datareg.append('hazop_review', hazop_review ? true : false)
      await datareg.append(
        'foreign_attachment',
        JSON.stringify(foreign_attachment)
      )
      await datareg.append(
        'internal_attachment',
        JSON.stringify(internal_attachment)
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
}
export default API
