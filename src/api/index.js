import axios from 'axios'
import Cookies from 'js-cookie'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
const headers = () => {
  const token = Cookies.get('token')
  return {
    Authorization: token ? `Bearer ${token}` : null
  }
}

const fetchData = async (url, method, data) => {
  const request = await axios({
    method: method,
    url: `${StaticData.domainIp}/${url}`,
    headers: headers(),
    data: data ?? null
  })
  try {
    return onSuccess(request)
  } catch (err) {
    Notification.notify(Message.text(err?.response?.status), 'error')
  }
  return
}
const onSuccess = response => {
  return response?.data?.content
}
export const get = url => {
  return fetchData(url, 'get')
}
export const post = (url, data) => {
  return fetchData(url, 'post', data)
}
