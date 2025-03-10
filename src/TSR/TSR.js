import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Sidebar from '../layout/sidebar'
import Menu from '../layout/menu'
import TechnicalServiceApplication from './TechnicalServiceApplication'
// import PreliminaryReview from './PreliminaryReview'
// import ProcessTSR from './ProcessTsr'
// import HSE from './HSE'
// import GeneralEngineering from './GeneralEngineering'
// import Committee from './committee'
// import WorkOrder from './WorkOrder'
// import Inspector from './Inspector'
// import AnnouncementEndWork from './AnnouncementEndWork'
// import CheckEndWork from './CheckEndWork'
// import MapDelivery from './MapDelivery'
// import Effectiveness from './Effectiveness'
import Notification from '../notification/notification'
import Message from '../notification/Message'
import StaticData from '../staticData'
import handleCheckText from '../handleCheckText'
export default class TSR extends Component {
  constructor (props) {
    super(props)
    // handleCheckText = HandleCheckText.handleCheckText
    this.state = {
      select: 1,
      token: Cookies.get('token'),
      ListTab: [
        {
          id: 1,
          nameTab: 'صدور درخواست TSR',
          title: 'صدور درخواست توسط متقاضی'
        },
        {
          id: 2,
          nameTab: 'بررسی اولیه و انتخاب مسئول TSR',
          title: 'بررسی اولیه و انتخاب مسئول TSR و گروه کارشناسی'
        },
        {
          id: 3,
          nameTab: 'بررسی TSR توسط مهندس فرآیند',
          title: 'بررسی TSR توسط مهندس فرآیند'
        },
        {
          id: 4,
          nameTab: 'بررسی توسط اداره ایمنی',
          title: 'بررسی TSR از دیدگاه ایمنی ، سلامت و زیست محیطی (HSE)'
        },
        {
          id: 5,
          nameTab: 'بررسی TSR توسط مهندسی عمومی',
          title: 'بررسی TSR توسط مهندسی عمومی'
        },
        {
          id: 6,
          nameTab: 'کمیته TSR',
          title: 'کمیته TSR'
        },
        {
          id: 7,
          nameTab: 'دستور کار مهندسی',
          title: 'دستور کار مهندسی'
        },
        {
          id: 8,
          nameTab: 'دستور العمل بارزسی فنی',
          title: 'دستور العمل بارزسی فنی'
        },
        {
          id: 9,
          nameTab: 'اعلام پایان کار',
          title: 'اعلام پایان کار توسط مسئول اجرا'
        },
        {
          id: 10,
          nameTab: 'بررسی پایان اجرای کار',
          title: 'بررسی پایان اجرای کار'
        },
        {
          id: 11,
          nameTab: 'تحویل نقشه‌های As Built',
          title: 'تحویل نقشه‌های As Built'
        },
        {
          id: 12,
          nameTab: 'ارزیابی اثر بخشی',
          title: 'ارزیابی اثر بخشی'
        }
      ],
      listData: []
    }
  }
  handleShow = () => {
    switch (this.state.select) {
      case 1:
        return (
          <TechnicalServiceApplication
            {...this}
            canUpdate={
              this.state.status === 'update' &&
              this.Permision.handlePermision(this.state.role, 'tsr1_update')
            }
            close={this.state.status === 'close' && this.state.level === 1}
            showToCC={true}
          />
        )
      default:
        return ''
    }
  }
  hadnleTab = () => {
    let listNumber = []
    if (this.state.select === 1) {
      listNumber = [1, 2, 3, 4]
    } else if (this.state.select > 9) {
      listNumber = [9, 10, 11, 12]
    } else {
      listNumber = [
        this.state.select - 1,
        this.state.select,
        this.state.select + 1,
        this.state.select + 2
      ]
    }
    return listNumber
  }
  handleShowTab = data => {
    let filter = this.state.ListTab.filter(tab => parseInt(tab.id) === data)[0]
    return filter
  }
  handleDocumentMdl = text => {
    this.setState({ loading: 'select' })
    let url = `${StaticData.domainIp}/detailEng/searchInDocuments?documentNumber=${text}`
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      })
      .then(response => {
        this.setState({ loading: '' })
        if (response.status === 200) {
          this.setState({ listData: response.data.content })
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
  ForeignAttachments = list => {
    let check = false
    if (list) {
      let i = 0
      while (i < list.length) {
        let obj = list[i]
        // if (obj.Attachement && obj.Attachement.length > 0) {
        check =
          handleCheckText(obj.degreeTitle) &&
          obj.Attachement &&
          obj.Attachement.length > 0
        // handleCheckText(obj.documentNumber)
        // } else {
        //   check = true
        // }
        if (!check) {
          break
        }
        i++
      }
    }
    return check
  }
  Internalَttachments = list => {
    let check = false
    if (list) {
      let i = 0
      while (i < list.length) {
        let obj = list[i]
        check =
          handleCheckText(obj.documentNumber) &&
          handleCheckText(obj.degreeTitle)
        if (!check) {
          break
        }
        i++
      }
    }
    return check
  }
  SelctDocumentMdl = async (value, props) => {
    let url = await `${StaticData.domainIp}/mdl/getDocumentDetailByNumber`
    let datareg = await new FormData()
    await datareg.append('documentNumber', value)
    await axios({
      method: 'post',
      url: url,
      data: datareg,
      headers: {
        Authorization: this.state.token ? `Bearer ${this.state.token}` : null
      }
    })
      .then(async response => {
        const degreeTitle = await response.data.content.activityName
        let list = await props.state[props.nameParent]
        if (list) {
          let obj = await list[props.index]
          obj['degreeTitle'] = await degreeTitle
          await props.handleState(props.nameParent, list)
        }
        if (response.status === 200) {
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
  render () {
    if (this.state.token === undefined) {
      return <Redirect to='/Login' />
    } else
      return (
        <div className='main'>
          <div className='col-12 p-0'>
            <div className='row m-0'>
              <Sidebar
                handleState={(name, value) => this.setState({ [name]: value })}
              />
              <div
                className={`${
                  this.state._close
                    ? 'mainSideClose'
                    : 'col-xl-10 col-lg-10 p-0'
                } dashboard`}
              >
                <Menu
                  nameRole='tsr_create'
                  nameUrl={this.props.nameUrl}
                  previous={{ name: 'درخواست خدمات فنی', url: 'index-TSR' }}
                />
                <div className='w-100 row m-0 main-box-dashboard'>
                  <div className='boxes-dashboard row m-0 p-0'>
                    <div className='main-form'>
                      <div className='title-from'>
                        <h2>
                          {this.state.ListTab[this.state.select - 1].title}
                        </h2>
                      </div>
                      <div className='tab-form rtl'>
                        <div className='col-xl-11 col-lg-11 col-12 row m-0 justify-content-start'>
                          {this.hadnleTab().map((data, key) => (
                            <div
                              className={`col-xl-3 col-lg-3 col-3 mr-0 pr-3 pl-0`}
                              key={key}
                              // onClick={() => this.setState({ select: this.handleShowTab(data).id })}
                            >
                              <div
                                className={`item-tab rtl mr-0 w-100 p-0 col-12 ${
                                  this.state.select ===
                                  this.handleShowTab(data).id
                                    ? 'active IranSans_Bold'
                                    : ''
                                }`}
                              >
                                <span>
                                  <label
                                    className={`${
                                      this.state.select ===
                                      this.handleShowTab(data).id
                                        ? 'IranSans_Bold'
                                        : ''
                                    }`}
                                  >
                                    {' '}
                                    {this.handleShowTab(data).id}.{' '}
                                  </label>
                                  {this.handleShowTab(data).nameTab}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className='col-xl-8 col-lg-12 col-md-12 col-12'>
                        {this.handleShow()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
}
