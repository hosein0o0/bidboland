import React, { Component } from 'react'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class NotificationContainer extends Component {
  render () {
    return (
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        newestOnTop={true}
        transition={Slide}
        rtl
        pauseOnHover={true}
      />
    )
  }
}

export default NotificationContainer
