import React, { Component } from 'react'
import MainFn from './Fns'
import SelectUnitManager from './SelectUnitManager'
import handleCheckText from '../handleCheckText'
import ExpertSelection from './ExpertSelection'
import AttachFile from './AttachFile'
import StaticData from '../staticData'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import axios from 'axios'
import SecretaryCommittee from './SecretaryCommittee'
import Location from './Location'
import Participants from './Participants'
import moment from 'moment-jalaali'
export default class ReportItem extends Component {
  constructor (props) {
    super(props)
    this.MainFn = new MainFn(this)
    this.state = {}
  }
  componentDidMount () {
    this.setState(this.props.state)
  }
  async componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = await nextProps
      await this.setState(this.props.state)
    }
  }
  handleSwitch = () => {
    const { tabSelected } = this.state
    let result = {
      array: []
    }
    switch (tabSelected) {
      case 'technical':
        result = {
          array: [
            { name: 'مهندسی عمومی', value: 'مهندسی عمومی' },
            { name: 'بازرسی فنی', value: 'بازرسی فنی' },
            { name: 'فرآیند', value: 'فرآیند' },
            { name: 'آزمایشگاه', value: 'آزمایشگاه' }
          ],
          url1: 'arp2Allocation/technical_unit_supervisor',
          url2: 'arp2Allocation/technical_event_expert',
          sign1: 'arp2Sign/technical_event_expert',
          sign2: 'arp2Allocation/secretary_committee',
          sign3: 'arp2Set/meeting_event',
          url3: 'arp2Set/technical_meeting_users'
        }

        break
      case 'operation':
        result = {
          array: [
            { name: 'Amine', value: 'Amine' },
            { name: 'CP', value: 'CP' },
            { name: 'NF', value: 'NF' },
            { name: 'UT', value: 'UT' }
          ],
          url1: 'arp2Allocation/operation_unit_supervisor',
          url2: 'arp2Allocation/operation_event_expert',
          sign1: 'arp2Sign/operation_event_expert',
          url3: 'arp2Set/operation_meeting_users'
        }
        break
      case 'repair':
        result = {
          array: [
            { name: 'برق', value: 'برق' },
            { name: 'ابزار دقیق', value: 'ابزار دقیق' },
            { name: 'مکانیک', value: 'مکانیک' },
            { name: 'تجهیزات حساس', value: 'تجهیزات حساس' },
            { name: 'سرویس‌های تعمیراتی', value: 'سرویس‌های تعمیراتی' },
            { name: 'Package C', value: 'Package_C' }
          ],
          url1: 'arp2Allocation/repair_unit_supervisor',
          url2: 'arp2Allocation/repair_event_expert',
          sign1: 'arp2Sign/repair_event_expert',
          url3: 'arp2Set/repair_meeting_users'
        }
        break
      case 'hse':
        result = {
          array: [{ name: 'ایمنی فرآیند', value: 'ایمنی فرآیند' }],
          url1: 'arp2Allocation/hse_unit_supervisor',
          url2: 'arp2Allocation/hse_event_expert',
          sign1: 'arp2Sign/hse_event_expert',
          url3: 'arp2Set/hse_meeting_users'
        }
        break
      default:
        break
    }
    return result
  }
  handleState = obj => {
    this.setState(obj)
    this.props.handleState(obj)
  }
  handlecheckValue = name => {
    const check = this.state.foucs === name || handleCheckText(this.state[name])
    return check
  }
  handleUpload = (e, files, names) => {
    const { tabSelected } = this.state
    e.preventDefault()
    this.setState({ loading: `${files}-${tabSelected}` })
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[i])
      this.GetLink(files, e.target.files[i], names, e.target.files.length, i)
    }
  }
  GetLink = (nameState, file, names, length, i) => {
    const { token } = this.state
    let datareg = new FormData()
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/DocumentCenter/ProcessDocument/Arp/${this.state.id}`,
      data: datareg,
      headers: {
        Authorization: token ? `Bearer ${token}` : null
      }
    })
      .then(async response => {
        if (i + 1 === length) {
          this.setState({ loading: '' })
        }
        if (response.status === 200) {
          let nameList = this.state[names] ? this.state[names] : [],
            linkList = this.state[nameState] ? this.state[nameState] : []
          nameList.push(file.name)
          linkList.push(response.data.content)
          this.setState({
            [names]: nameList,
            [nameState]: linkList
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
    let data1 = (await this.state[files]) ? this.state[files] : [],
      data2 = (await this.state[names]) ? this.state[names] : []
    await data1.splice(num, 1)
    await data2.splice(num, 1)
    await this.setState({
      files: data1,
      names: data2
    })
  }
  handleShow = num => {
    const data = this.state
    const { tabSelected } = data
    const check = data[`Show${num}_${tabSelected}`]
    return check
  }
  handleTimeOut = () => {
    const { deadline } = this.state
    const today = moment()
    const end = moment(deadline).add(1, 'day')
    const checkTimeOut = end < today
    return checkTimeOut
  }
  handleContinue = () => {
    const { tabSelected } = this.state
    const result = tabSelected === 'technical' && this.handleTimeOut()
    return result
  }
  CheckShow = () => {
    const {
      Show3_hse,
      Show3_operation,
      Show3_repair,
      Show3_technical,
      allocation_secretary_committee_allow
    } = this.state
    const result =
      Show3_hse &&
      Show3_operation &&
      Show3_repair &&
      Show3_technical &&
      allocation_secretary_committee_allow
    return result
  }
  render () {
    return (
      <div className='w-100 row mx-0'>
        <SelectUnitManager {...this} />
        {this.handleShow(1) ? <ExpertSelection {...this} /> : ''}
        {this.handleShow(2) ? <AttachFile {...this} /> : ''}
        {this.handleTimeOut() || this.CheckShow() ? (
          <SecretaryCommittee {...this} />
        ) : (
          ''
        )}
        {this.handleShow(4) ? <Location {...this} /> : ''}
        {this.handleShow(5) && this.handleShow(4) ? (
          <Participants {...this} />
        ) : (
          ''
        )}
      </div>
    )
  }
}
