import axios from 'axios'
import StaticData from '../../staticData'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import handleCheckText from '../../handleCheckText'
import handleString from '../../handleString'
class FetchApi {
  constructor(props) {
    this.data = props
  }
  fetchDataAPI = async url => {
    const { token } = this.data.state
    const { handleState } = this.data
    let _urlFinal = `${StaticData.domainIp}/${url}`
    handleState({ loading: 'table' })
    await axios
      .get(_urlFinal, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async response => {
        if (response.status === 200) {
          const { content } = response.data
          await handleState({
            totalLength: content.length ? content.length : 0,
            row: content.rows ? content.rows : [],
            pageNumber: content.pageNumber ? content.pageNumber : 0,
            role: response.data.role
          })
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
  _handleClickAPI = async (key, checkAdd, url) => {
    const { handleState } = this.data
    const { open_header, token, list } = await this.data.state
    if (token) {
      await handleState({
        loading: 'advance',
        list: !checkAdd ? [] : list,
        open_header: !checkAdd ? key : open_header
      })
      // let _urlFinal = `${StaticData.domainIp}/${url
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
              let _list = [...new Set(content.fields.split('__DARA__'))]
              const handleList = () => {
                if (checkAdd) {
                  let array = list ? list : []
                  array = array.concat(_list)
                  return array
                } else {
                  return _list
                }
              }
              await handleState({
                list: handleList(),
                // pageAdvance: content.pageNo,
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
  }
  handleSearchAdvanceAPI = async url => {
    const { handleState } = this.data
    const { token } = this.data.state
    let _urlFinal = `${url}`
    await axios
      .get(_urlFinal, {
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
  handleActionsData = data => {
    let text = ''
    let dbNameList = [],
      listValue = []
    const state = this.data.state
    const { handleState } = this.data
    let testObject = state.testObject
    let delimiter = '__DARA__'
    for (let _value in state) {
      if (_value.includes(delimiter)) {
        let dbName = _value.split(delimiter)[1]
        let value = _value.split(delimiter)[0].split('_header_')[1]
        if (state[_value]) {
          if (data.value === dbName) {
            listValue.push(value)
            listValue = [...new Set(listValue)]
            testObject[dbName] = listValue.join('*')
          }
        } else if (!state[_value] && listValue.length === 0) {
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
    text = `${ListText.join('|$')}`
    handleState({ textSearch: text })
    setTimeout(() => {
      if (
        Object.keys(state.testObject).length === 0 &&
        state.testObject.constructor === Object
      ) {
        handleState({ textSearch: '' })
        this.data.fetchData()
      } else {
        this.data.fetchData(`searchByFields=${text}`)
      }
      handleState({ open_header: '', pageAdvance: 1 })
    }, 100)
  }
  Reset = async () => {
    let state = this.data.state
    const { handleState } = this.data
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
    await this.data.fetchData()
  }
  handleSwitch(status, message) {
    switch (status) {
      case 'accepted':
        return {
          verified: true,
          verify_msg: ''
        }
      case 'reject':
        return {
          verified: false,
          verify_msg: handleString(message),
          reject_this_step: true
        }
      case 'comment':
        return {
          verified: false,
          verify_msg: handleString(message),
          edit_this_step: true
        }
      default:
        return {}
    }
  }
  handleVerfy = async (status, value) => {
    const { handleState, fetchData } = this.data
    let state = this.data.state || {}
    let { token, IdSelected } = await state
    // const props = this.data.props || {}
    const check = status === 'accepted' ? true : handleCheckText(value)
    if (check && handleCheckText(IdSelected)) {
      const url = `${StaticData.domainIp}/tsr_v1/verifyTsr`
      let Items = await this.handleSwitch(status, value)
      const datareg = await new FormData()
      await datareg.append('tsr_id', IdSelected)
      for (let name in Items) {
        let _value_ = Items[name]
        datareg.append(name, _value_)
      }
      handleState({
        loading: status,
        disabled: true
      })
      await axios({
        method: 'post',
        url: url,
        data: datareg,
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      })
        .then(async response => {
          if (response.status === 200) {
            Notification.notify(Message.text(930), 'success')
            setTimeout(() => {
              handleState({
                disabled: false,
                loading: '',
                IdSelected: null
              })
              fetchData()
              // if (props.handleState) {
              //   props.handleState('select', 1)
              // }
            }, 5000)
          } else {
            handleState({
              disabled: false,
              loading: '',
              IdSelected: null
            })
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(err => {
          handleState({
            disabled: false,
            loading: '',
            IdSelected: null
          })
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    } else {
      Notification.notify(Message.text(99), 'error')
    }
  }
  changeRowNumberAPI = async e => {
    const { handleState, refs, state, fetchData } = this.data
    const { contentPerPage, textSearch } = state
    let { name, value } = e.target
    handleState({
      [name]: parseInt(value)
    })
    if (name === 'contentPerPage') {
      handleState({
        page: 1
      })
      if (refs.page) {
        refs.page.value = 1
      }
      if (refs.contentPerPage) {
        refs.contentPerPage.value = parseInt(value)
      }
    } else if (name === 'page') {
      if (refs.contentPerPage) {
        refs.contentPerPage.value = contentPerPage
      }
      if (refs.page) {
        refs.page.value = parseInt(value)
      }
    }
    setTimeout(() => {
      fetchData(
        handleCheckText(textSearch) ? `searchByFields=${textSearch}` : ''
      )
    }, 100)
  }
  handleClickAPI = async status => {
    const { fetchData, handleSearch, handleState, state, refs } = this.data
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
            if (refs.page) {
              refs.page.value = await _pageMinez
            }
            if (refs.contentPerPage) {
              refs.contentPerPage.value = await contentPerPage
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
            if (refs.page) {
              refs.page.value = await _pagePlus
            }
            if (refs.contentPerPage) {
              refs.contentPerPage.value = await contentPerPage
            }
          }, 500)
        }
        break
      default:
        return true
    }
  }
  handleUndo = async id => {
    const parent = this.data.props
    const { RemoveFilter } = parent
    const check = await handleCheckText(id)
    if (check) {
      const url = await `${StaticData.domainIp}/tsr_v1/undoVerify/${id}`
      const { state, handleState } = this.data
      const { token } = state
      handleState({
        loading: 'undo'
      })
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(async response => {
          if (response.status === 200) {
            Notification.notify(Message.text(935), 'success')
            setTimeout(() => {
              handleState({
                id_undo: ''
              })
              RemoveFilter()
            }, 5000)
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
}
export default FetchApi
