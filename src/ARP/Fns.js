import StaticData from '../staticData'
import axios from 'axios'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import handleCheckText from '../handleCheckText'
import getCustomFormat from '../getCustomFormat'
class MainFn {
  constructor (that) {
    this.that = that
  }
  handleSubmit1 = async () => {
    const { state, handleSwitch, handleState } = await this.that
    const { tabSelected, token, id } = await state
    const url = (await handleSwitch) ? handleSwitch().url1 : null
    if (url) {
      const user_id = state[`${tabSelected}_unit_supervisor`]
      const discipline = state[`${tabSelected}_discipline`]
      const check = handleCheckText(discipline) && user_id
      if (check) {
        if (handleCheckText(user_id.value)) {
          const finalUrl = await `${StaticData.domainIp}/arp/${url}`
          const datareg = await new FormData()
          await datareg.append('arp_id', id)
          await datareg.append('user_id', user_id.value)
          await datareg.append('discipline', discipline)
          await handleState({
            loading: `office-${tabSelected}`,
            disabled: true
          })
          await axios({
            method: 'post',
            url: finalUrl,
            data: datareg,
            headers: {
              Authorization: token ? `Bearer ${token}` : null
            }
          })
            .then(async response => {
              handleState({
                loading: ''
              })
              if (response.status === 200) {
                await Notification.notify(Message.text(900), 'success')
                setTimeout(async () => {
                  handleState({
                    disabled: false,
                    redirect: false
                  })
                  window.location.reload(true)
                }, 5000)
              } else {
                handleState({
                  disabled: false
                })
                Notification.notify(Message.text(response.status), 'error')
              }
            })
            .catch(err => {
              handleState({
                disabled: false,
                loading: ''
              })
              if (err.response) {
                Notification.notify(Message.text(err.response.status), 'error')
              }
            })
        } else {
          Notification.notify(Message.text(99), 'error')
        }
      } else {
        Notification.notify(Message.text(99), 'error')
      }
    }
  }
  handleSubmit2 = async () => {
    const { state, handleSwitch, handleState } = await this.that
    const { tabSelected, token, id } = await state
    const url = (await handleSwitch) ? handleSwitch().url2 : null
    if (url) {
      const user_id = state[`${tabSelected}_event_expert`]
      if (user_id) {
        if (handleCheckText(user_id.value)) {
          const finalUrl = await `${StaticData.domainIp}/arp/${url}`
          await handleState({
            loading: `supervisor-${tabSelected}`,
            disabled: true
          })
          const datareg = await new FormData()
          await datareg.append('arp_id', id)
          await datareg.append('user_id', user_id.value)
          await datareg.append('discipline', '')
          await axios({
            method: 'post',
            url: finalUrl,
            data: datareg,
            headers: {
              Authorization: token ? `Bearer ${token}` : null
            }
          })
            .then(async response => {
              await handleState({
                loading: ''
              })
              if (response.status === 200) {
                await Notification.notify(Message.text(900), 'success')
                setTimeout(async () => {
                  await handleState({
                    disabled: false,
                    redirect: false
                  })
                  window.location.reload(true)
                }, 5000)
              } else {
                handleState({
                  disabled: false
                })
                Notification.notify(Message.text(response.status), 'error')
              }
            })
            .catch(err => {
              handleState({
                disabled: false,
                loading: ''
              })
              if (err.response) {
                Notification.notify(Message.text(err.response.status), 'error')
              }
            })
        } else {
          Notification.notify(Message.text(99), 'error')
        }
      } else {
        Notification.notify(Message.text(99), 'error')
      }
    }
  }
  handleSign1 = async () => {
    const { state, handleSwitch, handleState } = await this.that
    const { tabSelected, token, id } = await state
    const url = (await handleSwitch) ? handleSwitch().sign1 : null
    if (url) {
      const verify = state[`${tabSelected}_hasAttach`]
      const report_link = verify
        ? state[`${tabSelected}_report_link`]
          ? state[`${tabSelected}_report_link`]
          : []
        : []

      const check = verify
        ? report_link
          ? report_link.length > 0
          : false
        : true
      if (check) {
        handleState({
          loading: `sing1-${tabSelected}`,
          disabled: true
        })
        const finalUrl = await `${StaticData.domainIp}/arp/${url}`
        let json = verify ? Object.assign({}, report_link) : {}
        const datareg = await new FormData()
        await datareg.append('arp_id', id)
        await datareg.append('verify', '1')
        await datareg.append('report_link', verify ? JSON.stringify(json) : '')
        await axios({
          method: 'post',
          url: finalUrl,
          data: datareg,
          headers: {
            Authorization: token ? `Bearer ${token}` : null
          }
        })
          .then(async response => {
            handleState({
              loading: ''
            })
            if (response.status === 200) {
              await Notification.notify(Message.text(900), 'success')
              setTimeout(async () => {
                handleState({
                  disabled: false,
                  redirect: false
                })
                window.location.reload(true)
              }, 5000)
            } else {
              handleState({
                disabled: false
              })
              Notification.notify(Message.text(response.status), 'error')
            }
          })
          .catch(err => {
            handleState({
              disabled: false,
              loading: ''
            })
            if (err.response) {
              Notification.notify(Message.text(err.response.status), 'error')
            }
          })
      } else {
        Notification.notify(Message.text(99), 'error')
      }
    }
  }
  handleSign2 = async () => {
    const { state, handleSwitch, handleState } = await this.that
    const { tabSelected, token, id, secretary_committee } = await state
    const url = (await handleSwitch) ? handleSwitch().sign2 : null
    if (url) {
      if (secretary_committee) {
        const { value } = secretary_committee
        if (value) {
          const finalUrl = await `${StaticData.domainIp}/arp/${url}`
          handleState({
            loading: `sing2-${tabSelected}`,
            disabled: true
          })
          const datareg = await new FormData()
          await datareg.append('arp_id', id)
          await datareg.append('user_id', value)
          await datareg.append('discipline', '')
          await axios({
            method: 'post',
            url: finalUrl,
            data: datareg,
            headers: {
              Authorization: token ? `Bearer ${token}` : null
            }
          })
            .then(async response => {
              handleState({
                loading: ''
              })
              if (response.status === 200) {
                await Notification.notify(Message.text(900), 'success')
                setTimeout(async () => {
                  handleState({
                    disabled: false,
                    redirect: false
                  })
                  window.location.reload(true)
                }, 5000)
              } else {
                handleState({
                  disabled: false
                })
                Notification.notify(Message.text(response.status), 'error')
              }
            })
            .catch(err => {
              handleState({
                disabled: false,
                loading: ''
              })
              if (err.response) {
                Notification.notify(Message.text(err.response.status), 'error')
              }
            })
        } else {
          Notification.notify(Message.text(99), 'error')
        }
      } else {
        Notification.notify(Message.text(99), 'error')
      }
    }
  }
  handleSign3 = async () => {
    const { state, handleSwitch, handleState } = await this.that
    const {
      tabSelected,
      token,
      id,
      meeting_place,
      meeting_date,
      meeting_hour
    } = await state
    const url = (await handleSwitch) ? handleSwitch().sign3 : null
    if (url) {
      const _date = meeting_date ? getCustomFormat(meeting_date, false) : null
      const check =
        handleCheckText(meeting_place) &&
        handleCheckText(meeting_hour) &&
        meeting_date !== null &&
        handleCheckText(_date)
      if (check) {
        const finalUrl = await `${StaticData.domainIp}/arp/${url}`
        const datareg = await new FormData()
        await datareg.append('arp_id', id)
        await datareg.append('meeting_place', meeting_place)
        await datareg.append('meeting_date', _date)
        await datareg.append('meeting_hour', meeting_hour)
        await handleState({
          loading: `sing3-${tabSelected}`,
          disabled: true
        })
        await axios({
          method: 'post',
          url: finalUrl,
          data: datareg,
          headers: {
            Authorization: token ? `Bearer ${token}` : null
          }
        })
          .then(async response => {
            handleState({
              loading: ''
            })
            if (response.status === 200) {
              await Notification.notify(Message.text(900), 'success')
              setTimeout(async () => {
                handleState({
                  disabled: false,
                  redirect: false
                })
                window.location.reload(true)
              }, 5000)
            } else {
              handleState({
                disabled: false
              })
              Notification.notify(Message.text(response.status), 'error')
            }
          })
          .catch(err => {
            handleState({
              disabled: false,
              loading: ''
            })
            if (err.response) {
              Notification.notify(Message.text(err.response.status), 'error')
            }
          })
      } else {
        Notification.notify(Message.text(99), 'error')
      }
    }
  }
  handleSubmit3 = async () => {
    const { state, handleSwitch, handleState } = await this.that
    const { tabSelected, token, id } = await state
    const url = (await handleSwitch) ? handleSwitch().url3 : null
    if (url) {
      let meeting_users = state[`${tabSelected}_meeting_users`]
        ? state[`${tabSelected}_meeting_users`]
        : []
      const check = meeting_users.length > 0
      if (check) {
        const finalUrl = await `${StaticData.domainIp}/arp/${url}`
        let Ids = await Object.keys(meeting_users).map(_v => {
          return meeting_users[_v].value
        })
        const datareg = await new FormData()
        await datareg.append('arp_id', id)
        await datareg.append('meeting_users', Ids.join(','))
        await handleState({
          loading: `office-${tabSelected}`,
          disabled: true
        })
        await axios({
          method: 'post',
          url: finalUrl,
          data: datareg,
          headers: {
            Authorization: token ? `Bearer ${token}` : null
          }
        })
          .then(async response => {
            handleState({
              loading: ''
            })
            if (response.status === 200) {
              await Notification.notify(Message.text(900), 'success')
              setTimeout(async () => {
                handleState({
                  disabled: false,
                  redirect: false
                })
                window.location.reload(true)
              }, 5000)
            } else {
              handleState({
                disabled: false
              })
              Notification.notify(Message.text(response.status), 'error')
            }
          })
          .catch(err => {
            handleState({
              disabled: false,
              loading: ''
            })
            if (err.response) {
              Notification.notify(Message.text(err.response.status), 'error')
            }
          })
      } else {
        Notification.notify(Message.text(99), 'error')
      }
    }
  }
}
export default MainFn
