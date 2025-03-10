import StaticData from '../staticData'
import Cookies from 'js-cookie'
import axios from 'axios'
class Permision {
  constructor() {
    this.role = null
    this.project = null
    this.token = Cookies.get('token')
  }
  GetRole = (that, layout) => {
    if (this.token) {
      axios
        .get(`${StaticData.domainIp}/user/getRole`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(async response => {

          this.project = response.data.userDetail.project
          this.role = response.data.role
          if (that) {
            if (layout === 'menu') {
              if (!that.props.homeVendor) {
                this.CheckRoute(
                  response.data.role,
                  that.props.nameRole,
                  that.props.vendor
                )
              }
              that.handleResponse(response, 'response')
            } else if (layout === 'sidebar') {
              that.handleResponse(response, 'response')
            }
          }
        })
        .catch(err => {
          if (that) {
            that.handleResponse(err, 'catch')
          }
        })
    } else {
      window.location.href = '/Login'
    }
  }
  CheckRoute = (role, name, checkVendor) => {
    this.role = role
    if (role === 'vendor') {
      if (checkVendor) {
        return true
      } else {
        window.location.href = '/404'
      }
      // return false
    } else {
      if (role[name] === 1 || role === 'all' || name === 'Home' || role[name]) {
        return true
      } else {
        // window.history.back()
        return true
        // window.location.href = '/404'
      }
    }
  }
  handlePermision = (role, nameRole, checkVendor) => {
    if (role) {
      if (role === 'vendor') {
        if (checkVendor) {
          return true
        } else {
          return false
        }
      } else {
        if (role[nameRole] === 1 || role === 'all' || nameRole === 'Home' || role[nameRole]) {
          return true
        } else {
          return false
        }
      }
    } else {
      return false
    }
  }
}
export default Permision
