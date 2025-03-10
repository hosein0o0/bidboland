import { toast } from 'react-toastify'
class Notification {
  static toastConfig = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  }

  static notify (text, type = null) {
    switch (type) {
      case 'success':
        toast.success(text, Notification.toastConfig)
        break
      case 'error':
        toast.error(text, Notification.toastConfig)
        break
      case 'warning':
        toast.warn(text, Notification.toastConfig)
        break
      case 'info':
        toast.info(text, Notification.toastConfig)
        break
      default:
        throw Error('Notify type is not defined.')
    }
  }
}

export default Notification
