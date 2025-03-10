import StaticData from '../../../staticData'
import Notification from '../../../notification/notification'
import Message from '../../../notification/Message'
import axios from 'axios'
import handleCheckText from '../../../handleCheckText'
import handleString from '../../../handleString'
class APINote {
  constructor(data) {
    this.data = data
  }
  handleUploadFile = async e => {
    const { files } = e.target
    await e.preventDefault()
    const listFiles = Array.from(files)
    listFiles.map(file => this.GetLink(file))
  }
  GetLink = file => {
    const { props, handleState, state } = this.data
    const parnetState = props.state || {}
    const { id, select, token } = parnetState
    const url = `${StaticData.domainIp}/uploadFile/DocumentCenter/ProcessDocument/Tsr/Form${select}/${id}/note`
    const datareg = new FormData()
    datareg.append('file', file)
    handleState({ loading: 'upload' })
    axios({
      method: 'post',
      url: url,
      data: datareg,
      headers: {
        Authorization: token ? `Bearer ${token}` : null
      }
    }).then(response => {
      handleState({ loading: '' })
      if (response.status === 200) {
        const { content } = response.data
        let size = this.ByteConverter(file.size, 2)
        let obj = { size, url: content, name: file.name }
        state.attachment.push(obj)
        handleState({ attachment: state.attachment })
      } else {
        Notification.notify(Message.text(response.status), 'error')
      }
    })
  }
  ByteConverter = (bytes, decimals) => {
    const K_UNIT = 1024
    const SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
    if (bytes == 0) return '0 Byte'
    let i = Math.floor(Math.log(bytes) / Math.log(K_UNIT))
    let resp =
      parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) + SIZES[i]
    return resp
  }
  deleteFileList = async (key, nameState) => {
    const { state, handleState } = await this.data
    let array = (await state[nameState]) || []
    await array.splice(key, 1)
    await handleState({ [nameState]: array })
  }
  CheckArray = array => {
    return array.length > 0
  }
  handleFilterValueArray = (array, name) => {
    const result = Object.keys(array || []).map(item => {
      let obj = array[item] || {}
      return handleString(obj[name])
    })
    return result
  }
  handleSubmit = async () => {
    const { handleState, state, props } = this.data
    const { setStateShow } = props
    const parentState = props.state || {}
    const parentAPI = props.API || {}
    const { handleSwitchid } = parentAPI
    const { token, id, select } = parentState
    const { attachment, cc, receive_to, text } = state
    const check = handleCheckText(text) && handleCheckText(receive_to?.value)
    if (check) {
      handleState({ loading: 'submit', disabled: true })
      const numPage = handleSwitchid(select)
      const attach = await this.handleFilterValueArray(attachment, 'url')
      const _cc = await this.handleFilterValueArray(cc, 'value')
      const url = `${StaticData.domainIp}/tsr_v1/insertNote/${id}/page/${numPage}`
      const datareg = await new FormData()
      await datareg.append('recieve_to', handleString(receive_to?.value))
      await datareg.append('cc', _cc?.join(','))
      await datareg.append('text', text)
      await datareg.append('attach', JSON.stringify(attach))
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
              setStateShow('list')
              handleState({ disabled: false })
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
export default APINote
