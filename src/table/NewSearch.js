import Notification from '../notification/notification'
import Message from '../notification/Message'
import axios from 'axios'
class NewSearch {
  constructor (that) {
    this.that = that
  }
  _handleClick = async (key, data, scroled, url) => {
    let { columns, list, loading, textSearch, token } = this.that.state
    await this.that.handleState('loading', scroled ? loading : 'advance')
    await this.that.handleState('open_header', key)
    await this.that.handleState('list', scroled ? list : [])
    const check = (await columns[data.value]) && !scroled
    if (check && textSearch === '') {
      await this.that.handleState('list', columns[data.value].split('__DARA__'))
      await this.that.handleState('loading', '')
    } else {
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(async response => {
          await this.that.handleState('loading', '')
          if (response.status === 200) {
            let merge = [],
              count = 0,
              content = []
            if (textSearch) {
              content = await response.data.content.result
              count = response.data.content.total
              merge = await [...new Set(content)]
            } else {
              content = await response.data.content.result
              count = response.data.content.total
              merge = await list.concat(content)
              columns[data.value] = merge.join('__DARA__')
              merge = await [...new Set(merge)]
            }
            if (merge !== list) {
              await this.that.handleState('list', merge)
              await this.that.handleState('count', count)
              await this.that.handleState('columns', columns)
              await this.that.handleState('loading', '')
            }
          } else {
            Notification.notify(Message.text(response.status), 'error')
          }
        })
        .catch(async err => {
          await this.that.handleState('list', [])
          await this.that.handleState('loading', '')
          if (err.response) {
            Notification.notify(Message.text(err.response.status), 'error')
          }
        })
    }
  }
  handleSearchAdvance = async url => {
    let { token } = this.that.state
    await this.that.handleState('loading', 'advance')
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async response => {
        await this.that.handleState('list', [])
        await this.that.handleState('loading', '')
        if (response.status === 200) {
          let content = await response.data.content.result
          let uniq = await [...new Set(content)]
          await this.that.handleState('list', uniq)
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(async err => {
        await this.that.handleState('list', [])
        await this.that.handleState('loading', '')
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
}
export default NewSearch
