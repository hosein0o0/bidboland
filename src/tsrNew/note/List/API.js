import axios from 'axios'
import Notification from '../../../notification/notification'
import Message from '../../../notification/Message'
import StaticData from '../../../staticData'
import moment from 'moment-jalaali'
class API {
  constructor(props) {
    this.data = props
  }
  fetchData = () => {
    // console.log(this.data.state.token)
    const { state, setRow, setLoadTable, API } = this.data
    const { handleSwitchid } = API
    const { token, id, select } = state
    const numPage = handleSwitchid(select)
    setLoadTable(true)
    const url = `${StaticData.domainIp}/tsr_v1/showNote/${id}/page/${numPage}`
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async response => {
        // console.log(response)
        setLoadTable(false)
        if (response.status === 200) {
          setRow(response.data.content || [])
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        setLoadTable(false)
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  convertDate = date => {
    let dataMoment = moment(date, 'YYYY-MM-DD hh:mm:ss')
    const result = dataMoment.locale('fa').format('HH:mm - jYYYY/jMM/jDD')
    return result
  }
  ClickRow = data => {
    const { setStateShow, setDataRow } = this.data
    setDataRow(data)
    setStateShow('show')
  }
}
export default API
