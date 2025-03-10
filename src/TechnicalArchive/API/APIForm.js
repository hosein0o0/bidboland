import axios from 'axios'
import StaticData from '../../staticData'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
import getCustomFormat from '../../getCustomFormat'
import moment from 'moment-jalaali'
class APIForm {
  constructor(props) {
    this.data = props
  }
  handleConvertList = (objData, name) => {
    return handleCheckText(objData[name]) ? Array(objData[name]) : []
  }
  handleConvertDate = (objData, name) => {
    let result
    let date = objData[name]
    if (handleCheckText(date)) {
      let convert = moment(date)
      if (convert._isValid) {
        result = convert
      }
    }
    return result
  }
  fetchDataDeatailEng = () => {
    const url = `${StaticData.domainIp}/detailEng/projectCodeList`
    const { state, handleState } = this.data
    const { token } = state
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async response => {
        if (response.status === 200) {
          const projectCodeList = response?.data?.content || []
          handleState({ projectCodeList })
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
  handleOtherNativeLink = other_array => {
    let native = other_array.shift()
    let native_path = native.Link,
      native_pathNames = native.Name || []
    let other = other_array || [],
      other_path = [],
      other_pathNames = []
    other.forEach(data => {
      other_path = other_path.concat(data.Link)
      other_pathNames = other_pathNames.concat(data.Name)
    })
    return {
      native_path,
      native_pathNames,
      other_path: other_path,
      other_pathNames: other_pathNames
    }
  }
  fetchDataDetailEng = async id => {
    const url = `${StaticData.domainIp}/detailEng/get/${id}`
    const { state, handleState } = this.data
    const { token } = state
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async response => {
        handleState({ firstLoading: false })
        if (response.status === 200) {
          const { content } = response.data
          let objData = content[0] || {}
          objData['comment_sheet_path'] = this.handleConvertList(
            objData,
            'comment_sheet_path'
          )
          objData['document_path'] = this.handleConvertList(
            objData,
            'document_path'
          )
          objData['reply_sheet_path'] = this.handleConvertList(
            objData,
            'reply_sheet_path'
          )
          objData['transmittal_path'] = this.handleConvertList(
            objData,
            'transmittal_path'
          )
          objData['comment_sheet_date'] = this.handleConvertDate(
            objData,
            'comment_sheet_date'
          )
          objData['reply_sheet_date'] = this.handleConvertDate(
            objData,
            'reply_sheet_date'
          )
          objData['transmittal_receive_date'] = this.handleConvertDate(
            objData,
            'transmittal_receive_date'
          )
          let obj2 = this.handleOtherNativeLink(objData['other_path'] || [])
          let merge = { ...objData, ...obj2 }
          handleState(merge)
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(async err => {
        await handleState({ firstLoading: false })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
    // alert(id)
  }
  CheckField = name => {
    // `${state['documentNumber']}_${state['revision']}`
    let result = false
    switch (name) {
      case 'document_path':
        result = this.handleCheckAllField([
          'project_code',
          'documentNumber',
          'revision'
        ])
        break
      case 'transmittal_path':
        result = this.handleCheckAllField([
          'project_code',
          'documentNumber',
          'revision',
          'transmitallNumber'
        ])
        break
      case 'comment_sheet_path':
        result = this.handleCheckAllField([
          'project_code',
          'documentNumber',
          'revision',
          'comment_sheet_code'
        ])
        break
      case 'reply_sheet_path':
        result = this.handleCheckAllField([
          'project_code',
          'documentNumber',
          'revision',
          'reply_sheet_code'
        ])
        break
      case 'native_path':
        result = this.handleCheckAllField([
          'project_code',
          'documentNumber',
          'revision'
        ])
        break
      case 'other_path':
        result = this.handleCheckAllField([
          'project_code',
          'documentNumber',
          'revision'
        ])
        break
      default:
        break
    }
    return result
  }
  hanleNameFileField = name => {
    let result = ''
    const { state } = this.data
    const {
      documentNumber,
      revision,
      transmitallNumber,
      comment_sheet_code,
      reply_sheet_code
    } = state
    switch (name) {
      case 'document_path':
        result =
          handleCheckText(documentNumber) && handleCheckText(revision)
            ? `${handleString(documentNumber).trim()}_${handleString(
              revision
            ).trim()}`
            : ''
        break
      case 'transmittal_path':
        result = handleCheckText(transmitallNumber)
          ? `${handleString(transmitallNumber).trim()}`
          : ''
        break
      case 'comment_sheet_path':
        result = handleCheckText(comment_sheet_code)
          ? `${handleString(comment_sheet_code).trim()}`
          : ''
        break
      case 'reply_sheet_path':
        result = handleCheckText(reply_sheet_code)
          ? `${handleString(reply_sheet_code).trim()}`
          : ''
        break
      case 'native_path':
        result =
          handleCheckText(documentNumber) && handleCheckText(revision)
            ? `${handleString(documentNumber)}_${handleString(revision)}`
            : ''
        break
      case 'other_path':
        result = 'other_path'
        break
      default:
        break
    }
    return result
  }
  handleswitchUrl = name => {
    const { state } = this.data
    const { project_code, documentNumber, revision } = state
    switch (name) {
      case 'document_path':
        return `uploadFile/DocumentCenter/DocumentArchive/EngineeringDocument/DetailEngineering/${handleString(
          project_code
        )}/${handleString(documentNumber).replace(
          / /g,
          '-'
        )}/${handleString(revision)}/Document`
      case 'transmittal_path':
        return `uploadFile/DocumentCenter/DocumentArchive/EngineeringDocument/DetailEngineering/${handleString(
          project_code
        )}/${handleString(documentNumber).replace(
          / /g,
          '-'
        )}/${handleString(revision)}/Transmittal`
      case 'comment_sheet_path':
        return `uploadFile/DocumentCenter/DocumentArchive/EngineeringDocument/DetailEngineering/${handleString(
          project_code
        )}/${handleString(documentNumber).replace(
          / /g,
          '-'
        )}/${handleString(revision)}/CommentSheet`
      case 'reply_sheet_path':
        return `uploadFile/DocumentCenter/DocumentArchive/EngineeringDocument/DetailEngineering/${handleString(
          project_code
        )}/${handleString(documentNumber).replace(
          / /g,
          '-'
        )}/${handleString(revision)}/ReplySheet`
      case 'native_path':
        return `uploadFile/DocumentCenter/DocumentArchive/EngineeringDocument/DetailEngineering/${handleString(
          project_code
        )}/${handleString(documentNumber).replace(
          / /g,
          '-'
        )}/${handleString(revision)}/Other`
      case 'other_path':
        return `uploadFile/DocumentCenter/DocumentArchive/EngineeringDocument/DetailEngineering/${handleString(
          project_code
        )}/${handleString(documentNumber).replace(
          / /g,
          '-'
        )}/${handleString(revision)}/Other`
      default:
        return false
    }
  }
  handleFilterTypeFile = (file, accept) => {
    const state1 = accept === file.type
    const state2 = accept.includes(file.type)
    const state3 = accept === '*'
    const result = state1 || state2 || state3
    return result
  }
  handleFilterFileUpload = (accept, files) => {
    let myList = Array.from(files)
    let result = myList.filter(file => this.handleFilterTypeFile(file, accept))
    return result
  }
  ResultFile = (name, files) => {
    // const { files } = e.target
    let FileArray = Array.from(files)
    let resultFile = Object.keys(FileArray).map(item => {
      let file = FileArray[item]
      let fileName = handleString(file.name).trim()
      let arrayName = fileName.split('.') || []
      let length = arrayName.length || 0
      let format = arrayName[length - 1]
      let result_name = fileName
      if (name !== 'other_path') {
        result_name = `${handleString(name).trim()}.${handleString(format).trim()}`
      }
      const myRenamedFile = new File([file], result_name)
      return myRenamedFile
    })
    return resultFile
  }
  handleUploadDetailEng = async (files, url, stateName, listName) => {
    const { handleState } = await this.data
    await handleState({ loading: stateName })
    for (let i = 0; i < files.length; i++) {
      const myFile = files[i]
      let reader = await new FileReader()
      await reader.readAsDataURL(myFile)
      await this.GetLink(stateName, myFile, listName, files.length, i, url)
    }
  }
  handleCheckAllField = arrayField => {
    const { state } = this.data
    let i = 0
    let result = arrayField.length > 0
    while (i < arrayField.length) {
      let fieldName = handleString(arrayField[i])
      let field = state[fieldName]
      if (!handleCheckText(field)) result = false
      i++
    }
    return result
  }
  handleUploaAPI = async (e, files, names, url) => {
    await e.preventDefault()
    const { handleState } = this.data
    await handleState({ loading: files })
    const allFiles = e.target.files
    for (let i = 0; i < allFiles.length; i++) {
      const myFile = allFiles[i]
      let reader = await new FileReader()
      await reader.readAsDataURL(myFile)
      await this.GetLink(files, myFile, names, allFiles.length, i, url)
    }
  }
  GetLink = (nameState, file, names, length, i, url) => {
    let datareg = new FormData()
    const { handleState, state } = this.data
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/${url}`,
      data: datareg,
      headers: {
        Authorization: state.token ? `Bearer ${state.token}` : null
      }
    })
      .then(async response => {
        if (i + 1 === length) {
          handleState({ loading: '' })
        }
        if (response.status === 200) {
          const { content } = await response.data
          let stateFile = state[nameState] || []
          let stateNames = state[names] || []
          stateFile.push(content)
          stateNames.push(file.name)
          await handleState({
            [nameState]: stateFile,
            [names]: stateNames
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
  deleteFileAPI = async (num, files, names) => {
    const { state, handleState } = this.data
    let fileList = await state[files],
      nameList = await state[names]
    if (fileList && nameList) {
      await nameList.splice(num, 1)
      await fileList.splice(num, 1)
      await handleState({ [files]: fileList, [names]: nameList })
    }
  }
  CheckArrayValid = array => {
    let result = false
    if (typeof array === 'object') {
      result = array.length > 0
    }
    return result
  }
  checkDateFile = (code, date, path) => {
    let result = true
    if (handleCheckText(code)) {
      let dateConverted = getCustomFormat(date, true)
      result = handleCheckText(dateConverted) && path?.length > 0
    }
    return result
  }
  DetailEngCheck = () => {
    const { state } = this.data
    const {
      project_code, documentNumber, doc_description,
      discipline, revision, transmitallNumber,
      transmittal_receive_date, poi,
      poi_status, document_path, native_path,
      transmittal_path, comment_sheet_code,
      comment_sheet_date, comment_sheet_path,
      reply_sheet_code, reply_sheet_date,
      reply_sheet_path
    } = state
    let date = transmittal_receive_date
      ? getCustomFormat(transmittal_receive_date || {})
      : ''
    const check =
      this.checkDateFile(comment_sheet_code, comment_sheet_date, comment_sheet_path || []) &&
      this.checkDateFile(reply_sheet_code, reply_sheet_date, reply_sheet_path || []) &&
      handleCheckText(project_code) &&
      handleCheckText(documentNumber) &&
      handleCheckText(doc_description) &&
      handleCheckText(discipline) &&
      handleCheckText(revision) &&
      handleCheckText(transmitallNumber) &&
      handleCheckText(date) &&
      handleCheckText(poi) &&
      handleCheckText(poi_status) &&
      this.CheckArrayValid(document_path || []) &&
      this.CheckArrayValid(native_path || []) &&
      this.CheckArrayValid(transmittal_path || [])
    return check
  }
  handleSignleLink = array => {
    let result = typeof array === 'object' ? array[0] : null
    return result
  }
  handleOtherDetailEng = (other_path, other_pathNames) => {
    let result = []
    if (other_path.length === other_pathNames.length) {
      result = Object.keys(other_path).map(item => {
        return {
          Name: handleString(other_pathNames[item]),
          Link: handleString(other_path[item])
        }
      })
    }
    return result
  }
  handleMergeArray = (
    native_path,
    native_pathNames,
    other_path,
    other_pathNames
  ) => {
    let objNative = {
      Name: native_pathNames[0],
      Link: native_path[0]
    }
    let native =
      handleString(this.handleSignleLink(native_pathNames)) &&
        handleString(this.handleSignleLink(native_path))
        ? [objNative]
        : []
    let other = this.handleOtherDetailEng(other_path, other_pathNames)
    let result = native.concat(other)
    return JSON.stringify(result)
  }
  DetailEngData = () => {
    const { state } = this.data
    const {
      project_code, documentNumber, documentNumberContractor,
      doc_description, discipline, doc_type,
      revision, transmitallNumber, transmittal_receive_date,
      poi, poi_status, comment_sheet_code,
      comment_sheet_date, reply_sheet_code, reply_sheet_date,
      status, remark, document_path,
      transmittal_path, comment_sheet_path, reply_sheet_path,
      native_path, other_path, other_pathNames,
      native_pathNames,
    } = state
    return {
      project_code: handleString(project_code),
      documentNumber: handleString(documentNumber),
      documentNumberContractor: handleString(documentNumberContractor),
      doc_description: handleString(doc_description),
      discipline: handleString(discipline),
      doc_type: handleString(doc_type),
      revision: handleString(revision),
      transmitallNumber: handleString(transmitallNumber),
      transmittal_receive_date: transmittal_receive_date
        ? getCustomFormat(transmittal_receive_date, true)
        : null,
      poi: handleString(poi),
      poi_status: handleString(poi_status),
      comment_sheet_code: handleString(comment_sheet_code),
      comment_sheet_date: comment_sheet_date
        ? getCustomFormat(comment_sheet_date, true)
        : null,
      reply_sheet_code: handleString(reply_sheet_code),
      reply_sheet_date: reply_sheet_date
        ? getCustomFormat(reply_sheet_date, true)
        : null,
      status: handleString(status),
      remark: handleString(remark),
      document_path: this.handleSignleLink(document_path || []),
      transmittal_path: this.handleSignleLink(transmittal_path || []),
      comment_sheet_path: handleCheckText(comment_sheet_code) && this.handleSignleLink(comment_sheet_path || []),
      reply_sheet_path: handleCheckText(reply_sheet_code) && this.handleSignleLink(reply_sheet_path || []),
      other_path: this.handleMergeArray(
        native_path || [],
        native_pathNames || [],
        other_path || [],
        other_pathNames || []
      )
    }
  }
  handleDataandCheck = pageName => {
    let check = false,
      all_data = {}
    switch (pageName) {
      case 'detailEng':
        check = this.DetailEngCheck()
        all_data = this.DetailEngData()
        break
      default:
        break
    }
    return {
      all_data,
      check
    }
  }
  SubmitDetailEng = async url => {
    const { state, handleState } = this.data
    const { project_code, documentNumber, token } = state
    const check =
      handleCheckText(project_code) &&
      handleCheckText(documentNumber)
    if (check) {
      const datareg = await new FormData()
      await datareg.append('project_code', project_code)
      await datareg.append('documentNumber', documentNumber)
      // await datareg.append('revision', revision)
      const total_url = await `${StaticData.domainIp}/${url}`
      await handleState({ disabled: true, loading: 'submit' })
      await axios({
        method: 'post',
        url: total_url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          await handleState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              const { content } = response.data
              const array = content || []
              await handleState({
                disabled: false,
                revisionList: array,
                status_check: array.length > 0 ? 2 : 1
              })

            }, 5000)
          } else {
            await handleState({ disabled: false })
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
      // await handleState({ redirect: true })
      Notification.notify(Message.text(99), 'error')
    }
  }
  handleSubmitApi = async (pageName, url) => {
    const { all_data, check } = this.handleDataandCheck(pageName)
    const { state } = this.data
    const { token } = state
    const { handleState } = await this.data
    if (check) {
      await handleState({ loading: 'submit', disabled: true })
      const datareg = new FormData()
      for (let value in all_data) {
        let data = await all_data[value]
        await datareg.append(value, data)
      }
      await axios({
        method: 'post',
        url: `${StaticData.domainIp}/${url}`,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          await handleState({ loading: '' })
          if (response.status === 200) {
            await Notification.notify(Message.text(900), 'success')
            setTimeout(async () => {
              await handleState({ redirect: true, disabled: false })
            }, 5000)
          } else {
            await handleState({ disabled: false })
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
}
export default APIForm
