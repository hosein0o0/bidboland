import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import StaticData from '../staticData'
import GeneralInformation from './GeneralInformation'
import WorkshopStatus from './workshopStatus'
import ProjectActivities from './ProjectActivities'
import axios from 'axios'
// import Permision from '../permision/permision'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import Workforce from './Workforce'
import Endorsement from './Endorsement'
import handleString from '../handleString'
export default class DailyReport extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: Cookies.get('token'),
      select: 1,
      redirect: false,
      project: '',
      phase: '',
      disc: '',
      unit: '',
      doctype: '',
      serNo: '',
      revNo: '',
      contractNumber: '',
      referenceID: '',
      contractorName: '',
      projectNumber: '',
      dateSubmit: undefined,
      reportNumber: '',
      day: '',
      reportDate: undefined,
      endTime: '',
      startTime: '',
      machinery: [
        { typeCar: '', readyNumber: '', workHours: '', activityNumber: '' }
      ],
      difficulties: '',
      letterNumber: '',
      correspondence: '',
      actionable: '',
      date: undefined,
      descriptionAncident: '',
      accident: 'no',
      atmospheric: 'sunny',
      maximumTemperature: '',
      minimumTemperature: '',
      humidity: '',
      workshopStatus: 'active',
      inactiveCause: '',
      activityNumber: '',
      activityDescription: '',
      workUnit: '',
      totalWorkload: '',
      totalWorkloadYesterday: '',
      todayWork: '',
      NowWork: '',
      description: '',
      pictureFile: [],
      pictureFileName: [],
      LocationImage: [],
      location: [
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' }
      ],
      importanceRreport: '',
      lessonsLearned: '',
      keywords: [
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' },
        { value: 'test', label: 'test' }
      ],
      keywordsSelected: [],
      indirectLabor: [{ InJob: '', InNumberReady: '', InDayConsumption: '' }],
      directLabor: [{ job: '', numberReady: '', dayConsumption: '' }]
    }
  }
  componentDidMount () {
    document.title = `${StaticData.Title} -  گزارش روزانه-بخش ساخت و نصب`
  }
  fetchData = id => {
    // axios.get(`${StaticData.domainIp}/transmittal/get/${id}`,{
    //     headers: {
    //         'Authorization' : `Bearer ${this.state.token}`
    //     }
    // })
    // .then((response)=>{
    //     if(response.status === 200) {
    //         // let permision = new Permision()
    //         // if(permision.handlePermision(response.data.role , 'main_transmittal')){
    //             this.setState(response.data.content)
    //         // }
    //     }else {
    //         Notification.notify(Message.text(response.status), 'error');
    //     }
    // })
    // .catch((err)=>{
    //     if(err.response){
    //         Notification.notify(Message.text(err.response.status), 'error');
    //         if(err.response.status === 404){
    //             this.setState({back : true})
    //         }
    //     }
    // })
  }
  OnFocus = name => {
    this.setState({ foucs: name })
  }
  OnBlur = () => {
    this.setState({ foucs: '' })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: handleString(e.target.value) })
  }
  GetTime = (name, time) => {
    this.setState({ [name]: time })
  }
  handleChangeList = (e, nameList) => {
    let list = this.state[nameList]
    let name = e.target.name.split('_')[0]
    let key = parseInt(e.target.name.split('_')[1])
    let obj = list[key]
    obj[name] = handleString(e.target.value)
    this.setState({ [nameList]: list })
  }
  handleChangeRadion = (name, value) => {
    this.setState({ [name]: value })
  }
  deleteFile = (num, files, names) => {
    let data = this.state[`${files}`],
      data2 = this.state[`${names}`]
    data.splice(num, 1)
    data2.splice(num, 1)
    this.setState({ [files]: data, [names]: data2 })
  }
  handleUpload = (e, files, names) => {
    e.preventDefault()
    this.setState({ loading: files })
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[i])
      this.GetLink(files, e.target.files[i], names, e.target.files.length)
    }
  }
  GetLink = (nameState, file, names, length) => {
    let datareg = new FormData()
    datareg.append('file', file)
    axios({
      method: 'post',
      url: `${StaticData.domainIp}/uploadFile/daily-report`,
      data: datareg,
      headers: {
        Authorization: this.state.token ? `Bearer ${this.state.token}` : null
      }
    })
      .then(async response => {
        if (this.state[nameState].length === length - 1) {
          this.setState({ loading: '' })
        }
        if (response.status === 200) {
          await this.setState({
            [names]: [...this.state[names], file.name],
            [nameState]: [...this.state[nameState], response.data.content]
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
  handleShow = () => {
    if (this.state.select === 1) {
      return (
        <GeneralInformation
          {...this}
          getDate={(e, name) => this.setState({ [name]: e })}
          addData={(name, obj) =>
            this.setState({ [name]: [...this.state[name], obj] })
          }
        />
      )
    } else if (this.state.select === 2) {
      return (
        <WorkshopStatus
          {...this}
          resetStatus={name => this.setState({ [name]: '' })}
        />
      )
    } else if (this.state.select === 3) {
      return (
        <ProjectActivities
          {...this}
          getLocation={(newValue, name) => this.setState({ [name]: newValue })}
        />
      )
    } else if (this.state.select === 4) {
      return (
        <Workforce
          {...this}
          addData={(name, obj) =>
            this.setState({ [name]: [...this.state[name], obj] })
          }
        />
      )
    } else if (this.state.select === 5) {
      return <Endorsement {...this} />
    } else {
      return ''
    }
  }
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else {
      if (this.state.redirect) {
        return <Redirect to='/' />
      } else {
        if (this.state.back) {
          return <Redirect to='/404' />
        } else
          return (
            <div className='main'>
              <div className='col-12 p-0'>
                <div className='row m-0'>
                  <Sidebar
                    handleState={(name, value) =>
                      this.setState({ [name]: value })
                    }
                  />
                  <div
                    className={`${
                      this.state._close
                        ? 'mainSideClose'
                        : 'col-xl-10 col-lg-10 p-0'
                    } dashboard`}
                  >
                    <Menu nameRole='' nameUrl={this.props.nameUrl} />
                    <div className='w-100 row m-0 main-box-dashboard'>
                      <div className='boxes-dashboard row m-0 p-0'>
                        <div className='main-form'>
                          <div className='title-from'>
                            <h2>گزارش روزانه - بخش ساخت و نصب</h2>
                          </div>
                          <div className='col-12 row m-0'>
                            <div className='tab-form rtl'>
                              <div className='col-xl-11 col-lg-11 col-12 row m-0 justify-content-end rtl'>
                                <div
                                  className={`item-tab rtl ${
                                    this.state.select === 1
                                      ? 'active IranSans_Bold'
                                      : ''
                                  }`}
                                  onClick={() => this.setState({ select: 1 })}
                                >
                                  <span>
                                    <label
                                      className={`${
                                        this.state.select === 1
                                          ? 'IranSans_Bold'
                                          : ''
                                      }`}
                                    >
                                      1.
                                    </label>
                                    اطلاعات کلی
                                  </span>
                                </div>
                                <div
                                  className={`item-tab rtl ${
                                    this.state.select === 2
                                      ? 'active IranSans_Bold'
                                      : ''
                                  }`}
                                  onClick={() => this.setState({ select: 2 })}
                                >
                                  <span>
                                    <label
                                      className={`${
                                        this.state.select === 2
                                          ? 'IranSans_Bold'
                                          : ''
                                      }`}
                                    >
                                      2.
                                    </label>
                                    وضعیت کارگاه
                                  </span>
                                </div>
                                <div
                                  className={`item-tab rtl ${
                                    this.state.select === 3
                                      ? 'active IranSans_Bold'
                                      : ''
                                  }`}
                                  onClick={() => this.setState({ select: 3 })}
                                >
                                  <span>
                                    <label
                                      className={`${
                                        this.state.select === 3
                                          ? 'IranSans_Bold'
                                          : ''
                                      }`}
                                    >
                                      3.
                                    </label>
                                    فعالیت های پروژه
                                  </span>
                                </div>
                                <div
                                  className={`item-tab rtl ${
                                    this.state.select === 4
                                      ? 'active IranSans_Bold'
                                      : ''
                                  }`}
                                  onClick={() => this.setState({ select: 4 })}
                                >
                                  <span>
                                    <label
                                      className={`${
                                        this.state.select === 4
                                          ? 'IranSans_Bold'
                                          : ''
                                      }`}
                                    >
                                      4.
                                    </label>
                                    اطلاعات نیروهای کار
                                  </span>
                                </div>
                                <div
                                  className={`item-tab rtl ${
                                    this.state.select === 5
                                      ? 'active IranSans_Bold'
                                      : ''
                                  }`}
                                  onClick={() => this.setState({ select: 5 })}
                                >
                                  <span>
                                    <label
                                      className={`${
                                        this.state.select === 5
                                          ? 'IranSans_Bold'
                                          : ''
                                      }`}
                                    >
                                      5.
                                    </label>
                                    امضا
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-8 col-lg-10 col-md-12 col-12'>
                            {this.handleShow()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.popUp && this.state.pictureShow !== '' ? (
                <Sign
                  close={e => this.setState({ popUp: e, pictureShow: '' })}
                  pictureShow={this.state.pictureShow}
                />
              ) : (
                ''
              )}
            </div>
          )
      }
    }
  }
}
class Sign extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div className='backGroundPopup' onClick={() => this.props.close(false)}>
        <div className='col-xl-6 col-lg-10 col-12'>
          <img src={this.props.pictureShow} alt='sign' />
        </div>
      </div>
    )
  }
}
