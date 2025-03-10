import Notification from '../../../notification/notification'
import Message from '../../../notification/Message'
import StaticData from '../../../staticData'
import handleCheckText from '../../../handleCheckText'
import handleString from '../../../handleString'
import axios from 'axios'
import ListRecovery from '../../../tsrNew/tsr1/listRecovery'
// import StaticList from '../../../tsrNew/TSR9/StaticList'
import StaticList from '../../../tsrNew/TSR10/StaticList'
import ListTab from '../../../tsrNew/TSR7/ListTab'
import CheckDownload from '../../../CheckDownload'
import moment from 'moment-jalaali'
class API {
  constructor(props) {
    this.data = props
  }
  handleResponsible = (array) => {
    let result = []
    if (array.length === 0) result = [{ user_unit: '', value: '', user_role: '' }]
    else result = array
    return result
  }
  handleSeparation = (num, data) => {
    let name = `tsr${num}_`
    let result = {}
    for (let value in data) {
      if (value.includes(name)) {
        let final_value = value.replace(name, '')
        let _nameRebuild = final_value
        const check_tsr2 = _nameRebuild === 'responsible' || _nameRebuild === 'experts'
        if (final_value.includes('foreign_attachment')) result[_nameRebuild] = this.handleForeignLink(data[value] || [])
        else if (final_value.includes('internal_attachment')) result[_nameRebuild] = this.handleLinkInternal(data[value] || [])
        else if (check_tsr2) result[_nameRebuild] = this.handleResponsible(data[value] || [])
        else result[_nameRebuild] = data[value]
      }
    }
    let obj = { [`tsr${num}`]: result }
    return obj
  }
  handleLinkInternal = (array) => {
    let result = Object.keys(array).map(item => {
      let obj = array[item] || {}
      let url,
        _check = false
      const { transmitallNumber, documentNumber, revision } = obj
      if (handleCheckText(transmitallNumber) && handleCheckText(documentNumber) && handleCheckText(revision)) {
        let baseUrl = `${StaticData.link_file}/upload/dcc/Engineering/Documents/${handleString(transmitallNumber)}`
        let pdf = `${`${handleString(documentNumber)}_${handleString(revision)}`}.pdf`
        let _PDF = `${`${handleString(documentNumber)}_${handleString(revision)}`}.PDF`
        if (CheckDownload(`${baseUrl}/${pdf}`)) {
          url = `${baseUrl}/${pdf}`
          _check = true
        } else if (CheckDownload(`${baseUrl}/${_PDF}`)) {
          url = `${baseUrl}/${_PDF}`
          _check = true
        }
      }
      obj['check'] = _check
      obj['url'] = url
      return obj
    })
    return result
  }
  FoundSelect = (edit_form, _obj) => {
    let num = parseInt(edit_form) || 1
    let checkLarger = num > 12
    if (checkLarger) {
      let { number } = this.SplitNum(num)
      num = number
      // _obj[`tab_edit_${number}`] = tab
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
  fetchDataAPI = async () => {
    const { state, handleState } = this.data
    let { token, id } = state
    let url = `${StaticData.domainIp}/tsr_v1/get/${id}`
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async response => {
        handleState({ loading: '' })
        if (response.status === 200) {
          const { content, role } = response.data
          const { data } = content
          let _obj = {}
          let _select = this.handleSetSelect(data, _obj)
          for (let i = 1; i < 13; i++) {
            _obj = await { ..._obj, ...this.handleSeparation(i, data) }
          }
          _obj['page'] = await parseInt(data.tsr1_page)
          _obj['role'] = await role
          _obj['level'] = await _select
          _obj['tsr_no'] = await _obj.tsr1.tsr_no
          _obj['created_at_date'] = await _obj.tsr1.created_at_date
          _obj['subject'] = await _obj.tsr1.subject
          _obj['applicant_unit'] = await _obj.tsr1.applicant_unit
          _obj['firstLoading'] = false
          await handleState(_obj)
        } else {
          handleState({ firstLoading: false })
        }
      })
      .catch(err => {
        handleState({ loading: '', firstLoading: false })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  handleClassName = str => {
    let text = handleString(str)
    let p = /^[\u0600-\u06FF\s]+$/
    const check = p.test(text)
    let className = `${check ? 'rtl' : 'ltr'} text-center`
    return className
  }
  handleChekboxSelected = (value, delimiter = ' , ') => {
    let { state } = this.data
    let tsr2 = state.tsr2 || {}
    let totalText = handleString(tsr2.reject_reasons)
    let array = totalText.split(delimiter)
    const check = array.includes(value)
    return check
  }
  handleCheckboxImprovement = value => {
    let { state } = this.data
    let tsr1 = state.tsr1 || {}
    let totalText = handleString(tsr1.improvement_type)
    let array = totalText.split(' , ')
    const check = array.includes(value)
    return check
  }
  handleCheckOther = array => {
    let arrayValue = Object.keys(array).map(row => {
      let obj = array[row]
      return obj.value
    })
    let list2 = ListRecovery.list
    let filter = list2.filter(item => arrayValue.includes(item.value))
    let state1 = filter.length === 0 && array.length > 0
    let state2 = arrayValue.includes('سایر موارد')
    const { state } = this.data
    const tsr2 = state.tsr2 || {}
    const { issued_status } = tsr2
    const check1 = issued_status === '0'
    const check2 = state1 || state2
    const result = check1 && check2
    return result
  }
  DocumentaArray = (foreign, internal) => {
    const _foreign = foreign ? this.handleCheckEmptyForeign(foreign) : [],
      _internal = internal ? this.handleCheckEmptyInternal(internal) : []
    const merge = _foreign.concat(_internal)
    const result = this.handleFinalFilter(merge)
    return result
  }
  handleCheckItemFinal = (data) => {
    const { documentNumber, degreeTitle, numberPages, descriptionAttachment, Attachement, AttachementName } = data
    let list = Attachement || []
    let list_name = AttachementName || []
    const state1 = handleCheckText(documentNumber) || handleCheckText(degreeTitle) || handleCheckText(numberPages) || handleCheckText(descriptionAttachment)
    const state2 = list.length > 0 && list_name.length > 0 && list_name.length === list.length
    const result = state1 || state2
    return result
  }
  handleFinalFilter = (list) => {
    let result = list.filter(data => this.handleCheckItemFinal(data))
    if (result.length === 0) result = [{ documentNumber: '', degreeTitle: '', numberPages: '', descriptionAttachment: '' }]
    return result
  }
  handleCheckEmptyForeign = foreign => {
    let list = Object.keys(foreign).map(value => {
      foreign[value]['Attachement'] = foreign[value]['Attachement']
        ? Object.keys(foreign[value]['Attachement']).map(att => {
          return foreign[value]['Attachement'][att]
        })
        : []
      return foreign[value]
    })
    list = list.filter(
      data =>
        handleCheckText(data.documentNumber) ||
        handleCheckText(data.degreeTitle) ||
        handleCheckText(data.numberPages) ||
        handleCheckText(data.descriptionAttachment) ||
        data.Attachement.length > 0
    )
    return list
  }
  handleCheckEmptyInternal = internal => {
    let list = Object.keys(internal).map(value => {
      return internal[value]
    })
    list = list.filter(
      data =>
        handleCheckText(data.documentNumber) ||
        handleCheckText(data.degreeTitle) ||
        handleCheckText(data.numberPages) ||
        handleCheckText(data.descriptionAttachment)
    )
    return list
  }
  handleShowNameDoc = (data) => {
    const { degreeTitle, AttachementName, url } = data
    let attachName_list = AttachementName || []
    let name = attachName_list[0]
    let result = '-'
    if (handleCheckText(degreeTitle)) result = handleString(degreeTitle)
    else if (handleCheckText(name)) result = handleString(name)
    else result = handleString(url)
    return result
  }
  DocumnentShow = data => {
    const array = []
    const { degreeTitle, check, Attachement } = data
    let list_attachement = Attachement || []
    const url = list_attachement[0]
    const final_check = check && url !== '#' && handleCheckText(url)
    if (final_check) {
      array.push(
        <a
          href={`/${url}`}
          target='_blank'
          rel={`noreferrer`}
          className='link-document'
        >
          {this.handleShowNameDoc(data)}
        </a>
      )
    } else {
      array.push(<span className='value'>{handleString(degreeTitle)}</span>)
    }
    return array
  }
  UniqList = array => {
    const unique = Array.from(new Set(array.map(a => a.value))).map(value => {
      return array.find(a => a.value === value)
    })
    return unique
  }
  handleConvertDateImplemented = (list) => {
    const result = Object.keys(list).map(item => {
      let obj = list[item] || {}
      const { dateIssuanceInstructions } = obj
      let new_date = handleString(dateIssuanceInstructions)
      let array_date = new_date.split('-')
      let date = array_date[1]
      obj['dateIssuanceInstructions'] = date
      return obj
    })
    return result
  }
  handleListImplemented = (name, data) => {
    const instruction_name = `${name}_instruction`
    const list = data[instruction_name] || []
    const result = this.handleConvertDateImplemented(list)
    return result
  }
  PRItemShow = array => {
    let i = 0,
      result = false
    while (i < array.length) {
      let obj_array = array[i] || {}
      const { date, description, number } = obj_array
      result =
        handleCheckText(date) ||
        handleCheckText(description) ||
        handleCheckText(number)
      if (result) break
      i++
    }
    return result
  }
  PRCheck = (value) => {
    const { state } = this.data
    const data8 = state.tsr8 || {}
    const list = data8[`${value}_purchase_request`] || []
    const check = this.PRItemShow(list)
    return check
  }
  handleAddFollowUp = (array, name) => {
    let result = Object.keys(array).map(item => {
      let obj_item = array[item] || {}
      const { followUp } = obj_item
      const result_fl = `${followUp} - ${name}`
      obj_item.followUp = result_fl
      return obj_item
    })
    return result
  }
  handleFilterPr = array => {
    let filter = array.filter(
      value =>
        handleCheckText(value.actionDate) || handleCheckText(value.description)
    )
    if (filter.length === 0) filter = [{ description: '', followUp: '', actionDate: '', confirmation: 'false' }]
    return filter
  }
  handleMergeListProblem = () => {
    const { state } = this.data
    const data10 = state.tsr10 || {}
    const listTab = StaticList.listTab || []
    let result = []
    listTab.forEach(item => {
      let nameState = `${item.value}_executed_problems`
      let list = data10[nameState] || []
      const final_list = this.handleAddFollowUp(list, item.label)
      result = result.concat(final_list)
    })
    const final_list = this.handleFilterPr(result)
    return final_list
  }
  handleFilterCheck8 = (data) => {
    const { state } = this.data
    const parentState = state.tsr8 || {}
    const state1 = handleCheckText(parentState[`${data.value}_instruction_description`])
    const state2 = parentState[`${data.value}_is_dispatch`] === '1'
    const check = state1 || state2
    return check
  }
  handleCheckShow8 = (list) => {
    const filter1 = list.filter(data => this.handleFilterCheck8(data))
    const filter2 = list.filter((data, key) => data && key === 0)
    const final = filter1.length > 0 ? filter1 : filter2
    return final
  }
  handleCheckFilter11 = (data) => {
    const { documentNumber, title, editNumber, Attachement } = data
    const state1 = Attachement.length > 0
    const state2 = handleCheckText(documentNumber) || handleCheckText(title) | handleCheckText(editNumber)
    const result = state1 || state2
    return result
  }
  handleFilter11 = (array) => {
    let result = array.filter(data => this.handleCheckFilter11(data))
    if (result.length === 0) result = [{ attachment: [], attachementName: [], title: '', editNumber: '', documentNumber: '' }]
    return result
  }
  handleShowNameDoc11 = (link, counterLink, data) => {
    const { documentNumber, attachementName } = data
    let attachName_list = attachementName || []
    let name = attachName_list[counterLink]
    let result = '-'
    if (handleCheckText(documentNumber)) {
      result = handleString(documentNumber)
    } else if (handleCheckText(name)) {
      result = handleString(name)
    } else {
      result = handleString(link)
    }
    return result
  }
  DocumnentShow11 = (data) => {
    const { attachment, documentNumber, attachmentName } = data
    let attach_list = attachment || []
    let attach_name = attachmentName || []
    const check = attach_list.length > 0
    const array = []
    if (check) {
      array.push(
        attachment.map((link, counterLink) => (
          <a
            key={counterLink}
            href={this.handleCheckLinkFr(link, attach_name[counterLink])}
            target='_blank'
            rel={`noreferrer`}
            className='link-document'
          >
            {this.handleShowNameDoc11(link, counterLink, data)}
          </a>
        ))
      )
    } else {
      array.push(<span className='value'>{handleString(documentNumber)}</span>)
    }
    return array
  }
  FilterOffice11 = (array) => {
    let filter = array.filter(data => handleCheckText(data.officeName) || handleCheckText(data.number))
    if (filter.length === 0) filter = [{ officeName: '', number: '' }]
    return filter
  }
  handleFiltershow7 = (data) => {
    const { state } = this.data
    const dataState = state.tsr7 || {}
    let name_text = `${data.value}_instruction`
    let text = dataState[name_text]
    let firstName = `${data.value}_dispatch_firstName`
    let lastName = `${data.value}_dispatch_lastName`
    let fname = dataState[firstName]
    let lname = dataState[lastName]
    const state1 = handleCheckText(fname) && handleCheckText(lname)
    const state2 = handleCheckText(text)
    const result = state1 || state2
    return result
  }
  handlecheShow7 = () => {
    const tab_array = ListTab.List || []
    const filter1 = tab_array.filter(data => this.handleFiltershow7(data))
    const filter2 = tab_array.filter((data, key) => data && key === 0)
    const final = filter1.length > 0 ? filter1 : filter2
    return final
  }
  handleCheckLinkFr = (link, name) => {
    let result,
      final_url = '#'
    if (handleCheckText(link)) {
      const ch_full = link.includes('http://')
      if (ch_full) {
        final_url = `${link}`
      } else {
        result = `${StaticData.domainIp}/${link}`
        let link1 = result
        let array_link = result.split('/')
        let length = array_link.length
        array_link[length - 1] = name
        let link2 = array_link.join('/')
        if (CheckDownload(link1)) final_url = link1
        else if (CheckDownload(link2)) final_url = link2
      }
    }
    return final_url
  }
  handleCheckurl = (url) => {
    const state1 = handleString(url)
    const state2 = url !== '#'
    const result = state1 && state2
    return result
  }
  handleSetLink = (data) => {
    const { Attachement, AttachementName } = data
    let link = handleString(Attachement[0])
    let name = handleString(AttachementName[0])
    let url = this.handleCheckurl(data.url) ? data.url : this.handleCheckLinkFr(link, name)
    data['url'] = url
    data['check'] = true
    return data
  }
  handleForeignLink = (array) => {
    // const filter = array.filter(data => this.handleFilterForeign(data))
    const result = Object.keys(array).map((index) => this.handleSetLink(array[index] || {}))
    return result
  }
  handleSortList = array => {
    let sort = array.sort(function (a, b) {
      let result = new Date(b.date) - new Date(a.date)
      return result
    })
    return sort
  }
  handleConvert = (date) => {
    let convert = moment(date)
      .locale('fa')
      .format(' jYYYY/jMM/jDD ')
    return convert
  }
  handleEndDate = () => {
    const { state } = this.data
    const data8 = state.tsr8 || {}
    const { electrical_export_date, mechanical_export_date, protection_export_date, welding_export_date } = data8
    let list = [{ date: electrical_export_date }, { date: mechanical_export_date }, { date: protection_export_date }, { date: welding_export_date }]
    list = list.filter(time => handleCheckText(time.date))
    const sort = this.handleSortList(list) || []
    let end = sort[0] || {}
    let end_date = this.handleConvert(handleString(end.date))
    return handleString(end_date)
  }
}
export default API
