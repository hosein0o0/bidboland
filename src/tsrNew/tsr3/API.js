import axios from 'axios'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import StaticData from '../../staticData'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import getCustomFormat from '../../getCustomFormat'
class API {
  constructor(props) {
    this.data = props
  }
  FetchDataAPI = () => {
    let state = this.data.props.state || {}
    let newState = state.tsr3 || {}
    const { handleState } = this.data
    let internal_list = [
      {
        documentNumber: '',
        degreeTitle: '',
        numberPages: '',
        descriptionAttachment: ''
      }
    ]
    // let foreign_list = [
    //   {
    //     documentNumber: '',
    //     degreeTitle: '',
    //     numberPages: '',
    //     descriptionAttachment: '',
    //     AttachementName: [],
    //     Attachement: []
    //   }
    // ]
    let internal_state = newState['internal_attachment'] || []
    // let foreign_state = newState['foreign_attachment'] || []
    let internal = internal_state.length > 0 ? internal_state : internal_list
    // let foreign = foreign_state.length > 0 ? foreign_state : foreign_list
    let review = newState['review_result']
    newState['internal_attachment'] = internal
    // const { handleForeignLink } = this.data.props.API
    // newState['foreign_attachment'] = handleForeignLink(foreign || [])
    newState['review_result'] = handleCheckText(review) ? review : '1'
    newState['Prev_review_result'] = handleCheckText(review) ? review : '1'
    let { result } = this.DescriptionName(newState['review_result'])
    if (handleCheckText(result)) {
      newState[result] = handleString(newState['review_msg'])
    }
    handleState(newState)
  }
  DescriptionName = _review_result => {
    let state = this.data.state
    let { review_result } = state
    let result = ''
    let label = ''
    let final = _review_result || review_result
    switch (final) {
      case '1':
        result = 'review_msg_yes'
        label = 'الزامات و ریسک‌ها'
        break
      case '0':
        result = 'review_msg_no'
        label = 'دلایل عدم تایید'
        break
      default:
        result = ''
        label = ''
        break
    }
    return { result, label }
  }
  handlCreate = id => {
    const { CheckAllow, state, API } = this.data.props
    const { status, page, select } = state
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
    const check = id === page
    const result = Allow && check
    return result
  }
  handleDisabledAPIElm = () => {
    const { state } = this.data
    let parentState = this.data.props.state || {}
    const { select } = parentState
    const NameCheckbox = `checkBox_${select}`
    const checkBox = state[NameCheckbox] ? true : false
    const canUpdate = this.handleCheckUpdate(3)
    const canCreate = this.handlCreate(3)
    const check = canUpdate || canCreate
    const result = !check
    return result || checkBox
  }
  handleDisabledAPI = () => {
    const canUpdate = this.handleCheckUpdate(3)
    const canCreate = this.handlCreate(3)
    const check = canUpdate || canCreate
    const result = !check
    return result
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
      url: `${StaticData.domainIp}/uploadFile/DocumentCenter/ProcessDocument/Tsr/Form3/${tsr_id}`,
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
  handleCC = array => {
    let result = Object.keys(array).map(_data => {
      let obj_data = array[_data] || {}
      const { value } = obj_data
      return value
    })
    return result.join(',')
  }
  handleSubmitAPI = async () => {
    let url = `${StaticData.domainIp}/tsr_v1/tsr3Insert`
    let state = this.data.state || {}
    let { handleState } = this.data
    const { handleCheckSigned } = this.data.props.API
    let {
      review_result,
      tsr_id,
      foreign_attachment,
      internal_attachment,
      // supervisor_verify,
      notification_cc,
      supervisor_select,
      energy_manager_select,
      process_boss_select,
      suggest_time,
      token
    } = state
    const checkSign =
      handleCheckSigned(supervisor_select) &&
      handleCheckSigned(energy_manager_select) &&
      handleCheckSigned(process_boss_select)
    let { result } = this.DescriptionName()
    let checkDesc = review_result === '0' || review_result === '1'
    let valueDescCheck = checkDesc ? handleCheckText(state[result]) : true
    const checkFinal = valueDescCheck && checkSign
    if (checkFinal) {
      handleState({ loading: 'submit', disabled: true })
      let { value } = supervisor_select
      const cc = this.handleCC(notification_cc || [])
      let time = getCustomFormat(suggest_time)
      let valueDesc = checkDesc ? handleString(state[result]) : ''
      const datareg = new FormData()
      await datareg.append('tsr_id', tsr_id)
      await datareg.append('review_result', review_result)
      await datareg.append('review_msg', valueDesc)
      await datareg.append('suggest_time', time)
      await datareg.append(
        'foreign_attachment',
        JSON.stringify(foreign_attachment)
      )
      await datareg.append(
        'internal_attachment',
        JSON.stringify(internal_attachment)
      )
      await datareg.append('supervisor_verify_by', value)
      await datareg.append('notification_cc', cc)
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
  handleEditAPI = async () => {
    let url = `${StaticData.domainIp}/tsr_v1/tsr3Update`
    let state = this.data.state || {}
    let { handleState } = this.data
    let {
      tsr_id,
      review_result,
      // review_msg,
      suggest_time,
      foreign_attachment,
      internal_attachment,
      token
    } = state
    let { result } = this.DescriptionName()
    let checkDesc = review_result === '0' || review_result === '1'
    let valueDescCheck = checkDesc ? handleCheckText(state[result]) : true
    if (valueDescCheck) {
      let time = await getCustomFormat(suggest_time)
      let valueDesc = checkDesc ? handleString(state[result]) : ''
      await handleState({ loading: 'submit', disabled: true })
      const datareg = new FormData()
      await datareg.append('tsr_id', tsr_id)
      await datareg.append('review_result', review_result)
      await datareg.append('review_msg', valueDesc)
      await datareg.append('suggest_time', time)
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
  handleReviewAPI = (e, data) => {
    const parentState = this.data.props.state || {}
    const { Prev_review_result } = this.data.state
    const { edit_admin } = parentState
    const checkAdmin = edit_admin === '1'
    let stateAdmin = false
    if (Prev_review_result === '1' || Prev_review_result === '2') {
      stateAdmin = data.value !== '0'
    } else if (Prev_review_result === '0') {
      stateAdmin = false
    }
    const check = checkAdmin ? stateAdmin : true
    if (check) {
      let { handleState } = this.data
      let { name } = e.target
      let { value } = data
      handleState({ [name]: value, review_msg_yes: '', review_msg_no: '' })
    }
  }
}
export default API
