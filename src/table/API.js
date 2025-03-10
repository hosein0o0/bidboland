import StaticData from '../staticData'
import OutputFilter from './OutputFilter'
import handleString from '../handleString'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import axios from 'axios'
class API {
    constructor(props) {
        this.data = props
    }
    ManageFilterParams = (data) => {
        let result = Object.keys(data).map((key) => {
            return `${key}=${data[key]}`
        })
        return result.join()
    }
    ManageDownloadFile = (nameLink) => {
        const { state, props } = this.data
        const { testObject, search, token } = state
        // const parentProps = props
        const parentState = props.state || {}
        const parentSearch = parentState.search
        let finalSearch = handleString(parentSearch || search)
        const textSearch = this.ManageFilterParams(testObject || {})
        const url = OutputFilter.handleFilter(textSearch, finalSearch, `${StaticData.domainIp}/${nameLink}`)
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': "application/octet-stream"
            }
        })
            .then(async response => {
                if (response.status === 200) {
                    window.open(`${StaticData.FrontIp}/downloadFile/${response?.data?.content}`, '_blank')
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
}
export default API