import React, { Component } from 'react'
// import Form from '../../Form/Form'
import axios from 'axios'
import Notification from '../../notification/notification'
import Message from '../../notification/Message'
import StaticData from '../../staticData'
import TRANSMITTERGAUGE from './Instrumentation/TRANSMITTERGAUGE'
import VALVES from './Instrumentation/VALVES'
import ANALYZER from './Instrumentation/ANALYZER'
import FG from './Instrumentation/FG'
export default class Instrumentation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      equipment_category: ''
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.setState(this.props.state)
    }
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleUpload = async (e, files, names) => {
    await e.preventDefault()
    await this.setState({ loading: files })
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = await new FileReader()
      await reader.readAsDataURL(e.target.files[i])
      await this.GetLink(
        files,
        e.target.files[i],
        names,
        e.target.files.length,
        i
      )
    }
  }
  GetLink = (nameState, file, names, length, i) => {
    let datareg = new FormData()
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/equipmentid`,
      data: datareg,
      headers: {
        Authorization: this.state.token ? `Bearer ${this.state.token}` : null
      }
    })
      .then(async response => {
        if (i + 1 === length) {
          this.setState({ loading: '' })
        }
        if (response.status === 200) {
          await this.setState({
            [nameState]: [...this.state[nameState], response.data.content],
            [names]: [...this.state[names], file.name]
          })
        } else {
          Notification.notify(Message.text(response.status), 'error')
        }
      })
      .catch(err => {
        this.setState({ loading: '' })
        if (err.response) {
          Notification.notify(Message.text(err.response.status), 'error')
        }
      })
  }
  deleteFile = async (num, files, names) => {
    let fileList = await this.state[files],
      nameList = await this.state[names]
    if (fileList && nameList) {
      await nameList.splice(num, 1)
      await fileList.splice(num, 1)
      await this.setState({ [files]: fileList, [names]: nameList })
    }
  }
  render () {
    const { equipment_category } = this.state
    switch (equipment_category) {
      case 'transmitter':
        return <TRANSMITTERGAUGE {...this} />
      case 'valves':
        return <VALVES {...this} />
      case 'analyzer':
        return <ANALYZER {...this} />
      case 'f_and_g':
        return <FG {...this} />
      default:
        return ''
    }
  }
}
