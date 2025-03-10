import axios from 'axios'
import StaticData from '../../staticData'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import CheckDownload from '../../CheckDownload'
import handleCheckText from '../../handleCheckText'
class FnsTables {
  constructor (props) {
    this.data = props
  }
  defaultEmpty = () => {
    return {}
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
              let array = []
              if (rows) {
                array = await Object.keys(rows).map(_value => {
                  let obj = rows[_value]
                  let fn = this[nameFn || 'defaultEmpty']
                  const second = fn(obj)
                  const merge = { ...obj, ...second }
                  return merge
                })
              }
              await handleState({
                totalLength: content.length || 0,
                row: array,
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
  handleLink = data => {
    const { publisher, edition, year } = data
    let _year = year ? year.split('/') : ''
    _year = _year ? _year[2] : ''
    const check =
      handleCheckText(_year) &&
      handleCheckText(publisher) &&
      handleCheckText(edition)
    let result = {
      check_link: false,
      link_download: ''
    }
    if (check) {
      switch (publisher) {
        case 'IPS':
          result = this.IPS(data)
          break
        case 'IPS - STANDARD DRAWING':
          result = this.IPS(data)
          break
        case 'ISO':
          result = this.ISO(data)
          break
        case 'ASTM':
          result = this.ASTM(data, _year)
          break
        case 'ASCE':
          result = this.ASCE(data, _year)
          break
        case 'API':
          result = this.API(data, _year)
          break
        case 'ANSI':
          result = this.ANSI(data, _year)
          break
        case 'AISC':
          result = this.AISC(data, _year)
          break
        case 'AGMA':
          result = this.AGMA(data, _year)
          break
        default:
          result = this.DefaultLink(data, _year)
          break
      }
    }
    return result
  }
  ASTM = (data, _year) => {
    const { publisher, edition } = data
    let url = `${StaticData.link_file}/upload/Standard/${publisher}`
    let nameFile = `${publisher.toUpperCase()} ${edition.toUpperCase()}.pdf`
    let link = `${url}/${nameFile}`
    let _result = {
      check_link: CheckDownload(link),
      link_download: link
    }
    return _result
  }
  ASCE = (data, _year) => {
    const { publisher, edition } = data
    let url = `${StaticData.link_file}/upload/Standard/${publisher}`
    let nameFile = `${publisher.toLowerCase()} ${edition.toUpperCase()}-${_year}.pdf`
    let link = `${url}/${nameFile}`
    let _result = {
      check_link: CheckDownload(link),
      link_download: link
    }
    return _result
  }
  API = (data, _year) => {
    const { publisher, edition } = data
    let url = `${StaticData.link_file}/upload/Standard/${publisher}`
    let nameFile = `${publisher.toUpperCase()} ${edition.toUpperCase()}_${_year}.pdf`
    let link = `${url}/${nameFile}`
    let _result = {
      check_link: CheckDownload(link),
      link_download: link
    }
    return _result
  }
  ANSI = (data, _year) => {
    const { publisher, edition } = data
    let url = `${StaticData.link_file}/upload/Standard/${publisher}`
    let nameFile = `${publisher.toUpperCase()} ${edition.toUpperCase()}-${_year}.pdf`
    let link = `${url}/${nameFile}`
    let _result = {
      check_link: CheckDownload(link),
      link_download: link
    }
    return _result
  }
  AISC = (data, _year) => {
    const { publisher, edition } = data
    let url = `${StaticData.link_file}/upload/Standard/${publisher}`
    let nameFile = `${publisher.toUpperCase()} ${edition.toUpperCase()}.pdf`
    let link = `${url}/${nameFile}`
    let _result = {
      check_link: CheckDownload(link),
      link_download: link
    }
    return _result
  }
  AGMA = (data, _year) => {
    const { publisher, edition } = data
    let url = `${StaticData.link_file}/upload/Standard/${publisher}`
    let nameFile = `${publisher.toUpperCase()} ${edition.toUpperCase()}.pdf`
    let link = `${url}/${nameFile}`
    let _result = {
      check_link: CheckDownload(link),
      link_download: link
    }
    return _result
  }
  ISO = data => {
    const { publisher, edition } = data
    let url = `${StaticData.link_file}/upload/Standard/${publisher}`
    let nameFile = `${publisher.toUpperCase()} ${edition.toUpperCase()}.pdf`
    let link = `${url}/${nameFile}`
    let _result = {
      check_link: CheckDownload(link),
      link_download: link
    }
    return _result
  }
  IPS = data => {
    const { publisher, ext } = data
    let url = `${StaticData.link_file}/upload/Standard/${publisher}`
    let nameFile = `${ext}.pdf`
    let link = `${url}/${nameFile}`
    let _result = {
      check_link: CheckDownload(link),
      link_download: link
    }
    return _result
  }
  DefaultLink = (data, _year) => {
    const { publisher, edition } = data
    let url = `${StaticData.link_file}/upload/Standard/${publisher}`
    let nameFile = `${publisher.toLowerCase()} ${edition.toLowerCase()}-${_year}.pdf`
    let link = `${url}/${nameFile}`
    let _result = {
      check_link: CheckDownload(link),
      link_download: link
    }
    return _result
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
  ResetAPI = async () => {
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
            let list = [...new Set(content.fields.split('__DARA__'))]
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
}
export default FnsTables
