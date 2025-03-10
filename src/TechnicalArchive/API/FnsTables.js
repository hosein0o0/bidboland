import axios from 'axios'
import StaticData from '../../staticData'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import CheckDownload from '../../CheckDownload'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
class FnsTables {
  constructor (props) {
    this.data = props
  }
  defaultEmpty = () => {
    return {}
  }
  handlePushLink = (rows, nameFn) => {
    const array = Object.keys(rows).map(_value => {
      let obj = rows[_value] || {}
      let fn = this[nameFn]
      const second = fn(obj) || {}
      const merge = { ...obj, ...second }
      return merge
    })
    return array
  }
  fetchDataAPI = async (url, nameFn) => {
    const { state, handleState } = this.data
    const { token } = state
    if (token) {
      await handleState({
        loading: 'table'
      })
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(async response => {
          if (response.status === 200) {
            const { content, role } = response.data
            if (content) {
              const { rows } = content
              await handleState({
                totalLength: content.length || 0,
                row: this.handlePushLink(rows || [], nameFn || 'defaultEmpty'),
                pageNumber: content.pageNumber || 0,
                role: role
              })
            }
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
          await handleState({ loading: '' })
        })
        .catch(err => {
          handleState({ loading: '' })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  handleCCSLink = data => {
    let url
    const { CCSNo } = data
    if (handleCheckText(CCSNo)) {
      const total_url = `${StaticData.link_file}/upload/TechnicalArchive/CCS/${CCSNo}.pdf`
      const valid_url = CheckDownload(total_url)
      if (valid_url) {
        url = total_url
      }
    }
    return { url }
  }
  handleVPISLink = data => {
    let { mc_transmittal, owner_document_no, rev } = data
    let mc, url
    let baseUrl = `${StaticData.link_file}/upload/VPIS/Documents`
    if (handleCheckText(mc_transmittal)) {
      let mcUrl = `${baseUrl}/${mc_transmittal}/${mc_transmittal}.pdf`
      const checkMcUrl = CheckDownload(mcUrl)
      mc = checkMcUrl ? mcUrl : null
      if (handleCheckText(owner_document_no) && handleCheckText(rev)) {
        let nameFile = `${owner_document_no}-${rev}`
        let ownerUrl = `${baseUrl}/${mc_transmittal}/${nameFile}.pdf`
        const checkOwnerUrl = CheckDownload(ownerUrl)
        url = checkOwnerUrl ? ownerUrl : null
      }
    }
    return { mc, url }
  }
  handle3DModelLink = data => {
    const { area } = data
    const check = handleCheckText(area)
    let nameFile = check ? area.replace(' ', '-') : ''
    const baseUrl = `/upload/3DModel`
    const rar = `${nameFile}.rar`
    let url = `${baseUrl}/${rar}`
    const checkUrl = check ? CheckDownload(url) : false
    return { url: checkUrl ? url : null }
  }
  handleInstrumentLink = data => {
    const { pid_no } = data
    const check = handleCheckText(pid_no)
    let url = `/upload/TechnicalArchive/dcc/Engineering/pfd_p&id/p_and_id/${pid_no}.pdf`
    const checkUrl = check ? CheckDownload(url) : false
    return { url: checkUrl ? url : null }
  }
  handleISOLink = data => {
    let obj1 = this.handleISOLink_base(data)
    let obj2 = this.handleISOLink_native(data)
    let merge = { ...obj1, ...obj2 }
    return merge
  }
  handleISOLink_native = data => {
    const { line_type, area, iso_code, line, iso_sheet } = data
    const check =
      handleCheckText(line_type) &&
      handleCheckText(area) &&
      handleCheckText(iso_sheet) &&
      handleCheckText(line)
    if (check) {
      let array = line_type.split('_')
      let first = array[0] ? array[0].charAt(0) : ''
      let second = array[1] ? array[1].charAt(0) : ''
      let result = `${first}${second}`
      let url = `upload/Isometric/ZONE-${`${parseInt(area)}`}-${result}/NAITIVE`
      let name = line ? line.split('_')[0] : ''
      let _iso_sheet = parseInt(iso_sheet)
      let nameFile = `${name}_Sht_${_iso_sheet}`
      nameFile = nameFile.replace(/\//g, '.')
      let __array = nameFile.split('-')
      let __array2 = nameFile.split('-')
      let unit = __array[1]
      let unit2 = __array2[1]
      let _value1 = unit ? unit.toLowerCase() : ''
      let _value2 = unit2 ? unit2.toUpperCase() : ''
      __array[1] = _value1
      __array2[1] = _value2
      let nameFile1 = `${__array.join('-')}.dwg`
      let nameFile2 = `${__array2.join('-')}.dwg`
      let url1 = `/${url}/${nameFile1}`
      // url1 = `${StaticData.domainIp}/${url1}`
      let url2 = `/${url}/${nameFile2}`
      // url2 = `${StaticData.domainIp}/${url2}`
      let link
      if (CheckDownload(url1)) {
        link = url1
      } else if (CheckDownload(url2)) {
        link = url2
      }
      return { iso_code_native: iso_code, url_native: link }
    }
    return { iso_code_native: iso_code }
  }
  handleISOLink_base = data => {
    const { line_type, area, line, iso_sheet } = data
    const check =
      handleCheckText(line_type) &&
      handleCheckText(area) &&
      handleCheckText(line) &&
      handleCheckText(iso_sheet)
    if (check) {
      let array = line_type.split('_')
      let first = array[0] ? array[0].charAt(0) : ''
      let second = array[1] ? array[1].charAt(0) : ''
      let result = `${first}${second}`
      let url = `upload/Isometric/ZONE-${`${parseInt(
        area
      )}`}-${result}/ISOMETRICS`
      let name = line ? line.split('_')[0] : ''
      let _iso_sheet = parseInt(iso_sheet)
      let nameFile = `${name}_Sht_${_iso_sheet}`
      nameFile = nameFile.replace(/\//g, '.')
      let __array = nameFile.split('-')
      let __array2 = nameFile.split('-')
      let unit = __array[1]
      let unit2 = __array2[1]
      let _value1 = unit ? unit.toLowerCase() : ''
      let _value2 = unit2 ? unit2.toUpperCase() : ''
      __array[1] = _value1
      __array2[1] = _value2
      let nameFile1 = `${__array.join('-')}.PDF`
      let nameFile2 = `${__array2.join('-')}.PDF`
      let url1 = `/${url}/${nameFile1}`
      // url1 = `${StaticData.domainIp}/${url1}`
      let url2 = `/${url}/${nameFile2}`
      // url2 = `${StaticData.domainIp}/${url2}`
      let link
      if (CheckDownload(url1)) {
        link = url1
      } else if (CheckDownload(url2)) {
        link = url2
      }
      return { url: link }
    } else return { url: null }
  }
  handleLineListLink = data => {
    const { p_and_id_no } = data
    const check = handleCheckText(p_and_id_no)
    let _listUrl = []
    if (check) {
      let _txt = handleString(p_and_id_no)
      let array = _txt.split('&')
      let baseUrl = `${StaticData.link_file}/upload/TechnicalArchive/dcc/Engineering/pfd_p&id/p_and_id`
      array.forEach(nameFile => {
        if (handleCheckText(nameFile)) {
          let _url = `${baseUrl}/${nameFile.trim()}.pdf`
          const __check = CheckDownload(_url)
          _listUrl.push(__check ? _url : null)
        }
      })
    }
    return { url: _listUrl }
  }
  handlePIDLink = data => {
    const check = data.attachment[0] ? true : false
    const { p_and_id } = data
    let result
    if (check) {
      result = data.attachment[0]
    } else if (handleCheckText(p_and_id)) {
      let url = `${StaticData.link_file}/upload/TechnicalArchive/dcc/Engineering/pfd_p&id/p_and_id/${p_and_id}.pdf`
      result = CheckDownload(url) ? url : null
    }
    return { url: result }
  }
  handlePfdLink = data => {
    const attachment = data.attachment || []
    const check = attachment[0] ? true : false
    const { pfd_no, rev } = data
    let result
    if (check) result = attachment[0]
    else if (handleCheckText(pfd_no) && handleCheckText(rev)) {
      let url = `/upload/TechnicalArchive/dcc/Engineering/pfd_p&id/pfd/${pfd_no}-${rev}.pdf`
      result = CheckDownload(url) ? url : null
    }
    return { url: result }
  }
  detailLink = data => {
    let { transmitallNumber, documentNumber, revision, commentNumber } = data
    let tarnsUrl = null
    if (handleCheckText(transmitallNumber)) {
      let baseUrl = `${StaticData.link_file}/upload/TechnicalArchive/dcc/Engineering/Documents/${transmitallNumber}`
      let pdf = `${`${transmitallNumber}`}.pdf`
      let _PDF = `${`${transmitallNumber}`}.PDF`
      let trans1 = `${baseUrl}/${pdf}`
      let trans2 = `${baseUrl}/${_PDF}`
      if (CheckDownload(trans1)) tarnsUrl = trans1
      else if (CheckDownload(trans2)) tarnsUrl = trans2
    }

    let url = null
    const checkDoc =
      handleCheckText(transmitallNumber) &&
      handleCheckText(documentNumber) &&
      handleCheckText(revision)
    if (checkDoc) {
      let baseUrlDoc = `${StaticData.link_file}/upload/TechnicalArchive/dcc/Engineering/Documents/${transmitallNumber}`
      let pdfDoc = `${`${documentNumber}_${revision}`}.pdf`
      let _PDFDoc = `${`${documentNumber}_${revision}`}.PDF`
      let doc1 = `${baseUrlDoc}/${pdfDoc}`
      let doc2 = `${baseUrlDoc}/${_PDFDoc}`
      if (CheckDownload(doc1)) url = doc1
      else if (CheckDownload(doc2)) url = doc2
    }

    let commnetUrl = null
    if (handleCheckText(commentNumber)) {
      let baseUrlComment = `${StaticData.link_file}/upload/TechnicalArchive/dcc/Engineering/CommentSheet`
      let pdfComment = `${commentNumber}.pdf`
      let _PDFComment = `${commentNumber}.PDF`
      let comment1 = `${baseUrlComment}/${pdfComment}`
      let comment2 = `${baseUrlComment}/${_PDFComment}`
      if (CheckDownload(comment1)) commnetUrl = comment1
      else if (CheckDownload(comment2)) commnetUrl = comment2
    }
    return { tarnsUrl, url, commnetUrl }
  }
  handleLinkEngFinalDataBook = data => {
    const { trans_code } = data
    const check = handleCheckText(trans_code)
    const url = `/upload/Package_A-ENG_Final_Data_Book/${trans_code}.rar`
    const check_url = check ? CheckDownload(url) : false
    return { url: check_url ? url : null }
  }
  handleLinkEquipmentFinalDataBook = data => {
    const { po_number } = data
    const check = handleCheckText(po_number)
    if (check) {
      let url = `/upload/TechnicalArchive/equipmentfinalbook/${po_number}.zip`
      const checkUrl = CheckDownload(url)
      return checkUrl ? { url } : {}
    }
    return {}
  }
  handleLinkBuildFinalBooklet = data => {
    let result = {}
    const { discipline, subsection_no } = data
    const check = handleCheckText(discipline) && handleCheckText(subsection_no)
    if (check) {
      let url = `/upload/TechnicalArchive/MC_Book/${discipline}/${subsection_no}/${subsection_no}.pdf`
      const checkUrl = CheckDownload(url)
      if (checkUrl) {
        result['url'] = url
      }
    }
    return result
  }
  handleLinkBasic = data => {
    let result = null,
      tarnsUrl,
      ChecktarnsUrl = false
    const { document_no, transmittal_code, revision } = data
    if (
      handleCheckText(document_no) &&
      handleCheckText(transmittal_code) &&
      handleCheckText(revision)
    ) {
      const url1 = `${StaticData.link_file}/upload/TechnicalArchive/Basic/${document_no}.pdf`,
        check1 = CheckDownload(url1),
        url2 = `${StaticData.link_file}/upload/TechnicalArchive/Basic/${transmittal_code}/${document_no}_${revision}.pdf`,
        check2 = CheckDownload(url2)
      tarnsUrl = `${StaticData.link_file}/upload/TechnicalArchive/Basic/${transmittal_code}/${transmittal_code}.pdf`
      ChecktarnsUrl = CheckDownload(tarnsUrl)
      if (check1) result = url1
      else if (check2) result = url2
    }
    return { url: result, tarnsUrl: ChecktarnsUrl ? tarnsUrl : null }
  }
  changeRowNumberAPI = async e => {
    const { handleState, Elm, state, fetchData } = this.data
    const { contentPerPage, textSearch } = state
    let { name, value } = e.target
    handleState({
      [name]: parseInt(value)
    })
    if (name === 'contentPerPage') {
      handleState({
        page: 1
      })
      if (Elm.page) {
        Elm.page.value = 1
      }
      if (Elm.contentPerPage) {
        Elm.contentPerPage.value = parseInt(value)
      }
    } else if (name === 'page') {
      if (Elm.contentPerPage) {
        Elm.contentPerPage.value = contentPerPage
      }
      if (Elm.page) {
        Elm.page.value = parseInt(value)
      }
    }
    setTimeout(() => {
      fetchData(
        handleCheckText(textSearch) ? `searchByFields=${textSearch}` : ''
      )
    }, 100)
  }
  handleClickAPI = async status => {
    const { fetchData, handleSearch, handleState, state, Elm } = this.data
    let { page, pageNumber, search, textSearch, contentPerPage } = state
    switch (status) {
      case 'right':
        if (page > 1 && page <= pageNumber) {
          let _pageMinez = parseInt(page) - 1
          await handleState({
            page: _pageMinez,
            loading: 'table'
          })
          if (handleCheckText(search)) {
            await handleSearch(search)
          } else if (handleCheckText(textSearch)) {
            await fetchData(`searchByFields=${textSearch}`)
          } else {
            await fetchData()
          }
          setTimeout(async () => {
            if (Elm.page) {
              Elm.page.value = await _pageMinez
            }
            if (Elm.contentPerPage) {
              Elm.contentPerPage.value = await contentPerPage
            }
          }, 500)
        }
        break
      case 'left':
        if (page < pageNumber) {
          let _pagePlus = parseInt(page) + 1
          await handleState({
            page: _pagePlus,
            loading: 'table'
          })
          if (handleCheckText(search)) {
            await handleSearch(search)
          } else if (handleCheckText(textSearch)) {
            await fetchData(`searchByFields=${textSearch}`)
          } else {
            await fetchData()
          }
          setTimeout(async () => {
            if (Elm.page) {
              Elm.page.value = await _pagePlus
            }
            if (Elm.contentPerPage) {
              Elm.contentPerPage.value = await contentPerPage
            }
          }, 500)
        }
        break
      default:
        return true
    }
  }
  handleFilterAPI = name => {
    const { selected } = this.data.props
    let result = ''
    if (selected.length === 0) {
      result = ''
    } else {
      if (selected.includes(name)) {
        result = ''
      } else {
        result = 'd-none'
      }
    }
    return result
  }
  RemoveFilterAPI = async () => {
    let { Elm } = this.data
    if (Elm.page && Elm.contentPerPage) {
      Elm.page.value = await 1
      Elm.contentPerPage.value = await 25
    }
  }
  handleClickOutsideAPI = event => {
    let { Elm, state, handleState } = this.data
    let { open_header } = state
    let nameRef = `_header_${open_header}`
    const check = Elm[nameRef] && !Elm[nameRef].contains(event.target)
    if (check) {
      handleState({
        open_header: ''
      })
    }
  }
  handleClickOutsideDetailedEngAPI = event => {
    let { Elm, state, handleState } = this.data
    let headerElm = Elm[`_header_${state.open_header}`],
      actionElm = Elm[`_action_${state.selectNumber}`]
    if (headerElm && !headerElm.contains(event.target)) {
      handleState({
        open_header: '',
        pageAdvance: 1
      })
    }
    if (actionElm && !actionElm.contains(event.target)) {
      handleState({
        selectNumber: '',
        firstData: [],
        secondData: {},
        loading: '',
        secondSelectNumber: ''
      })
    }
  }
  ResetAPI = async (name, value) => {
    let { state, handleState, fetchData } = this.data
    for (let value in state) {
      if (value.includes('_header_')) {
        state[value] = await false
      }
    }
    let objState = await {
      page: 1,
      contentPerPage: 25,
      textSearch: '',
      open_header: '',
      list: [],
      row: [],
      textUrl: 'searchByFields',
      testObject: {},
      secondText: [],
      pageAdvance: 1,
      totalAdvance: 0,
      secondData: {},
      _active: '',
      search: '',
      objFiltered: {},
      _listData_: []
    }
    let merge = await { ...state, ...objState }
    if (handleCheckText(name) && handleCheckText(value)) merge[name] = value
    await handleState(merge)
    await fetchData()
  }
  _handleClickAPI = async (checkAdd, url) => {
    let { state, handleState } = this.data
    let { token } = state
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async response => {
        const { content } = response.data
        handleState({ loading: '' })
        if (response.status === 200) {
          if (content) {
            let list = [
              ...new Set(handleString(content.fields).split('__DARA__'))
            ]
            const handleList = () => {
              if (checkAdd) {
                let array = state.list ? state.list : []
                array = array.concat(list)
                return array
              } else {
                return list
              }
            }
            await handleState({
              list: handleList() || [],
              // pageAdvance: content.pageNo,
              totalAdvance: content.total || 0
            })
          }
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(async err => {
        handleState({ loading: '' })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  handleSearchAdvanceAPI = async url => {
    const { state, handleState } = this.data
    let { token } = state
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async response => {
        const { content } = response.data
        handleState({ loading: '' })
        if (response.status === 200) {
          if (content) {
            let list = [...new Set(content.fields.split('__DARA__'))]
            await handleState({
              list: list,
              totalAdvance: content.total
            })
          }
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(async err => {
        handleState({ loading: '' })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  handleActionsAPI = async data => {
    let text = ''
    let dbNameList = [],
      listValue = []
    const { handleState, fetchData } = this.data
    let testObject = this.data.state.testObject
    // let testObject = {}
    let delimiter = '__DARA__'
    for (let state in this.data.state) {
      if (state.includes(delimiter)) {
        let dbName = state.split(delimiter)[1]
        let value = state.split(delimiter)[0].split('_header_')[1]
        // testObject[dbName] = value
        if (this.data.state[state]) {
          // state = state.split(delimiter)
          // dbNameList.push(dbName)
          if (data.value === dbName) {
            listValue.push(value)
            listValue = [...new Set(listValue)]
            testObject[dbName] = listValue.join('*')
          }
        } else if (!this.data.state[state] && listValue.length === 0) {
          delete testObject[dbName]
        }
      }
    }

    handleState({ testObject: testObject, loading: '' })
    let ListText = []
    for (let txt in testObject) {
      dbNameList.push(txt)
      let _text = `${txt}=${testObject[txt]}`
      ListText.push(_text)
    }
    dbNameList = [...new Set(dbNameList)]
    // text = `${dbNameList.join(',')}&${ListText.join('&')}`
    text = `${ListText.join('|$')}`
    handleState({ textSearch: text })
    setTimeout(() => {
      if (
        Object.keys(this.data.state.testObject).length === 0 &&
        this.data.state.testObject.constructor === Object
      ) {
        handleState({ textSearch: '' })
        fetchData()
      } else {
        fetchData(`searchByFields=${this.data.state.textSearch}`)
      }
      handleState({ open_header: '', pageAdvance: 1 })
    }, 100)
  }
  GetMoreAPI = async (key, documentNumber, url) => {
    const { handleState, state } = this.data
    const { token } = state
    await handleState({
      selectNumber: key,
      firstData: [],
      documentSelected: '',
      loading: 'more',
      owner_document_no: ''
    })
    let urlFinal = `${url}=${documentNumber}`
    if (token) {
      await axios
        .get(urlFinal, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(async response => {
          handleState({ loading: '' })
          if (response.status === 200) {
            handleState({
              firstData: response.data.content,
              selectNumber: key,
              documentSelected: documentNumber,
              owner_document_noSelected: documentNumber
            })
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(async err => {
          await handleState({ selectNumber: key, loading: '' })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  GetSecondDataAPI = async (data, index, key, url) => {
    const { handleState, state } = this.data
    const { token } = state
    if (token) {
      const { revision, documentNumber } = data
      handleState({
        selectNumber: key,
        secondData: {},
        secondSelectNumber: '',
        revision: revision,
        loading: `secondmore-${index}`
      })
      const urlFinal = `${url}?documentNumber=${documentNumber}&revision=${revision}`
      await axios
        .get(urlFinal, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(async response => {
          handleState({ loading: '' })
          if (response.status === 200) {
            await handleState({
              secondData: response.data.content,
              selectNumber: key,
              secondSelectNumber: index
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
  }
  handleEditFilterAPI = () => {}
  handleLastAndAllRev = (name, value) => {
    const thisPrent = this.data.props
    thisPrent.handleState({ search: '' })
    thisPrent.loadCheck()
    this.RemoveFilterAPI()
    this.ResetAPI(name, value)
  }
  handleDelete = async (id, url) => {
    const { state, handleState, fetchData } = this.data
    const { token } = state
    if (handleCheckText(id)) {
      handleState({ loading: 'delete' })
      const total_url = `${StaticData.domainIp}/${url}/${id}`
      await axios
        .get(total_url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(async response => {
          await handleState({ loading: '' })
          if (response.status === 200) {
            await fetchData()
            await handleState({ delete_id: null })
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
  }
}
export default FnsTables
